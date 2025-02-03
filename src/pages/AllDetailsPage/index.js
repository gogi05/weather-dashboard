import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { WEATHER_DATA_TYPES } from "../../store/constants";
import {
  selectHourlyData,
  selectIsLoading,
  selectError,
  selectCountryFilter,
  selectDateRange, // Import the selectDateRange selector from Redux
} from "../../store/selectors";
import { setCountryFilter } from "../../store/weatherActions";
import DatePicker from "../../components/DatePicker";
import CountryDropdown from "../../components/CountryDropdown";
import SmallScreenWarning from "../../components/SmallScreenWarning";
import AllDetailsPageSkeleton from "./components/AllDetailsPageSkeleton";
import AllDetailsChart from "./components/AllDetailsChart";

const DetailsPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  // Extract data from navigation state (location.state)
  const {
    dateRange: navDateRange,
    countryFilter: navCountryFilter,
    chartType,
  } = location.state || {};

  // Get the date range and country filter from Redux store or use fallback values
  const defaultDateRange = useSelector(selectDateRange); // Get dateRange from Redux
  const defaultCountryFilter = useSelector(selectCountryFilter); // Get countryFilter from Redux

  // Set initial state for dateRange and countryFilter using location state or Redux values
  const [dateRange, setDateRange] = useState(navDateRange || defaultDateRange);

  const [countryFilter, setCountryFilterState] = useState(
    navCountryFilter || defaultCountryFilter || "All Countries Selected"
  );

  const hourlyData = useSelector(selectHourlyData) || {};
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  // Fetch hourly data whenever date range or country filter changes
  useEffect(() => {
    const startDateString = dateRange.startDate.toISOString().split("T")[0];
    const endDateString = dateRange.endDate.toISOString().split("T")[0];

    dispatch({
      type: WEATHER_DATA_TYPES.FETCH_HOURLY_DATA,
      payload: {
        startDate: startDateString,
        endDate: endDateString,
        country: countryFilter,
      },
    });
  }, [dispatch, dateRange, countryFilter, chartType]);

  const handleDateRangeSelect = (newDateRange) => {
    setDateRange(newDateRange);
  };

  const handleCountryFilterChange = (newCountryFilter) => {
    setCountryFilterState(newCountryFilter);
    dispatch(setCountryFilter(newCountryFilter));
  };

  // Filterinf data for the countryDropdown selction
  const filteredHourlyData = useMemo(() => {
    if (
      !countryFilter ||
      countryFilter.toLowerCase() === "all countries selected"
    ) {
      return hourlyData;
    }

    return hourlyData[countryFilter.toLowerCase()];
  }, [hourlyData, countryFilter]);

  if (isLoading) return <AllDetailsPageSkeleton />;
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="p-6 h-full">
      <h2 className="text-xl font-roboto font-semibold mb-5">Drilldown</h2>

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
      <div className="mt-3">
        <AllDetailsChart data={filteredHourlyData} chartType={chartType} />
      </div>

      <div className="mt-10 block md:hidden">
        <SmallScreenWarning />
      </div>
    </div>
  );
};

export default DetailsPage;
