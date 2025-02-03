import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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

const OverviewPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const reduxDateRange = useSelector(selectDateRange);
  const countryFilter = useSelector(selectCountryFilter);
  const dailyData = useSelector(selectDailyData) || {};
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const dateRange = useMemo(
    () => getValidDateRange(reduxDateRange),
    [reduxDateRange]
  );

  useEffect(() => {
    dispatch({
      type: WEATHER_DATA_TYPES.FETCH_DAILY_DATA,
      payload: {
        startDate: dateRange.startDate.toISOString().split("T")[0],
        endDate: dateRange.endDate.toISOString().split("T")[0],
      },
    });
  }, [dispatch, dateRange]);

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

  const filteredData = useMemo(() => {
    return {
      temperature: filterTemperatureData(dailyData, countryFilter),
      precipitation: filterPrecipitationData(dailyData, countryFilter),
      windspeed: filterWindspeedData(dailyData, countryFilter),
    };
  }, [dailyData, countryFilter]);

  const charts = [
    {
      component: TemperatureChart,
      data: filteredData.temperature,
      type: "temperature",
    },
    {
      component: PrecipitationChart,
      data: filteredData.precipitation,
      type: "precipitation",
    },
    {
      component: WindSpeedChart,
      data: filteredData.windspeed,
      type: "windspeed",
    },
  ];

  if (isLoading) return <OverviewPageSkeleton />;
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;

  const handleChartClick = (chartType) => {
    navigate("/details", { state: { dateRange, countryFilter, chartType } });
  };

  return (
    <div className="p-6 h-full">
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
        {charts.map(({ component: ChartComponent, data, type }, index) => (
          <div
            key={index}
            className="cursor-pointer"
            onClick={() => handleChartClick(type)}
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

export default OverviewPage;
