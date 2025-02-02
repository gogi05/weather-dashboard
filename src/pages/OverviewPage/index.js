import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { WEATHER_DATA_TYPES } from "../../store/constants";
import {
  selectDailyData,
  selectIsLoading,
  selectError,
  selectDateRange,
  selectCountryFilter,
} from "../../store/selectors";
import { setDateRange, setCountryFilter } from "../../store/weatherActions";
import DatePicker from "../../components/DatePicker";
import CountryDropdown from "../../components/CountryDropdown";
import TemperatureChart from "./components/TemperatureChart";
import PrecipitationChart from "./components/PrecipitationChart";
import WindSpeedChart from "./components/WindSpeedChart";
import SmallScreenWarning from "../../components/SmallScreenWarning";
import OverviewPageSkeleton from "./components/OverviewPageSkeleton";
import {
  filterTemperatureData,
  filterPrecipitationData,
  filterWindspeedData,
} from "./helpers";

// Default Date Range Helper
const getValidDateRange = (reduxDateRange) => {
  const startDate = reduxDateRange?.startDate
    ? new Date(reduxDateRange.startDate)
    : null;
  const endDate = reduxDateRange?.endDate
    ? new Date(reduxDateRange.endDate)
    : null;

  return startDate && endDate && !isNaN(startDate) && !isNaN(endDate)
    ? { startDate, endDate }
    : {
        startDate: new Date(new Date().setDate(new Date().getDate() - 14)),
        endDate: new Date(),
      };
};

const OverViewPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook for navigation

  // Selectors
  const reduxDateRange = useSelector(selectDateRange);
  const countryFilter = useSelector(selectCountryFilter);
  const dailyData = useSelector(selectDailyData) || {};
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  // Validated Date Range
  const dateRange = useMemo(
    () => getValidDateRange(reduxDateRange),
    [reduxDateRange]
  );

  // Fetch data when date range changes
  useEffect(() => {
    dispatch({
      type: WEATHER_DATA_TYPES.FETCH_DAILY_DATA,
      payload: {
        startDate: dateRange.startDate.toISOString().split("T")[0],
        endDate: dateRange.endDate.toISOString().split("T")[0],
      },
    });
  }, [dispatch, dateRange]);

  // Handlers
  const handleDateRangeSelect = (newDateRange) => {
    if (newDateRange?.startDate && newDateRange?.endDate) {
      dispatch(
        setDateRange({
          startDate: new Date(newDateRange.startDate),
          endDate: new Date(newDateRange.endDate),
        })
      );
    }
  };

  const handleCountryFilterChange = (newCountryFilter) =>
    dispatch(setCountryFilter(newCountryFilter));

  // Dynamic Filtering
  const filteredData = useMemo(() => {
    const filters = {
      temperature: filterTemperatureData,
      precipitation: filterPrecipitationData,
      windspeed: filterWindspeedData,
    };

    return Object.fromEntries(
      Object.entries(filters).map(([key, filterFn]) => [
        key,
        filterFn(dailyData, countryFilter),
      ])
    );
  }, [dailyData, countryFilter]);

  // Chart Configs
  const charts = [
    { component: TemperatureChart, data: filteredData.temperature },
    { component: PrecipitationChart, data: filteredData.precipitation },
    { component: WindSpeedChart, data: filteredData.windspeed },
  ];

  if (isLoading) return <OverviewPageSkeleton />;
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;

  const handleChartClick = () => {
    navigate("/details"); // Navigate to the details page when chart is clicked
  };

  return (
    <div className="p-6 bg-lightGrey h-full">
      <h2 className="text-xl font-roboto font-semibold mb-5">Overview</h2>
      <div className="flex gap-2">
        <DatePicker
          dateRange={dateRange}
          onDateRangeSelect={handleDateRangeSelect}
        />
        <CountryDropdown
          countryFilter={countryFilter}
          setCountryFilter={handleCountryFilterChange}
        />
      </div>

      <div className="mt-3 hidden md:grid lg:grid-cols-2 gap-4">
        {charts.map(({ component: ChartComponent, data }, index) => (
          <div
            key={index}
            className="cursor-pointer"
            onClick={handleChartClick} // Trigger navigation on click
          >
            <ChartComponent data={data} />
          </div>
        ))}
      </div>
      <div className="mt-10 block md:hidden">
        <SmallScreenWarning />
      </div>
    </div>
  );
};

export default OverViewPage;
