import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WEATHER_DATA_TYPES } from "../../store/constants";
import {
  selectHourlyData,
  selectIsLoading,
  selectError,
} from "../../store/selectors";
import DatePicker from "../../components/DatePicker";
import AllDetailsPageSkeleton from "./components/AllDetailsPageSkeleton";

const DetailsPage = () => {
  const dispatch = useDispatch();

  // Set the default date range (can be customized based on requirements)
  const today = new Date();
  const oneDayAgo = new Date();
  oneDayAgo.setDate(today.getDate() - 1); // Example: fetch data from yesterday

  const [dateRange, setDateRange] = useState({
    startDate: oneDayAgo,
    endDate: today,
  });

  // Fetching hourly data
  const hourlyData = useSelector(selectHourlyData);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  // Dispatching the action for fetching hourly data
  useEffect(() => {
    const startDateString = dateRange.startDate.toISOString().split("T")[0];
    const endDateString = dateRange.endDate.toISOString().split("T")[0];

    console.log("Dispatching action with payload:", {
      startDate: startDateString,
      endDate: endDateString,
    });

    dispatch({
      type: WEATHER_DATA_TYPES.FETCH_HOURLY_DATA,
      payload: {
        startDate: startDateString,
        endDate: endDateString,
      },
    });
  }, [dispatch, dateRange]);

  useEffect(() => {
    console.log("Fetched Hourly Data:", hourlyData); // Log the hourly data from the Redux store
  }, [hourlyData]);

  // Handling date range changes
  const handleDateRangeSelect = (newDateRange) => {
    setDateRange(newDateRange);
  };

  if (isLoading) {
    return <AllDetailsPageSkeleton />;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-roboto font-semibold mb-5">Hourly Details</h2>

      <DatePicker
        dateRange={dateRange}
        setDateRange={setDateRange}
        onDateRangeSelect={handleDateRangeSelect}
      />

      <div>
        <h3 className="text-lg">Hourly Data:</h3>
        <pre>{JSON.stringify(hourlyData, null, 2)}</pre> {/* For debugging */}
      </div>
    </div>
  );
};

export default DetailsPage;
