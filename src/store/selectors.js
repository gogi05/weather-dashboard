import { createSelector } from "reselect";

// Selectors
const selectWeatherState = (state) => state.weatherReducer || {};

// Memoized selector for dailyData
export const selectDailyData = createSelector(
  [selectWeatherState],
  (weatherState) => weatherState.dailyData || {}
);

// Memoized selector for dailyUnits
export const selectDailyUnits = createSelector(
  [selectWeatherState],
  (weatherState) => weatherState.dailyUnits || {}
);

// Memoized selector for loading state
export const selectIsLoading = createSelector(
  [selectWeatherState],
  (weatherState) => weatherState.isLoading
);

// Memoized selector for error state
export const selectError = createSelector(
  [selectWeatherState],
  (weatherState) => weatherState.error
);

// Memoized selector for hourlyData
export const selectHourlyData = createSelector(
  [selectWeatherState],
  (weatherState) => weatherState.hourlyData || {}
);

// Memoized selector for hourlyUnits
export const selectHourlyUnits = createSelector(
  [selectWeatherState],
  (weatherState) => weatherState.hourlyUnits || {}
);

// Memoized selector for dateRange
const selectDateRangeBase = (state) => state.weatherReducer.dateRange;

export const selectDateRange = createSelector(
  [selectDateRangeBase],
  (dateRange) => {
    if (!dateRange) {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - 14);
      return { startDate, endDate };
    }

    // Ensure we return new Date objects
    return {
      startDate: new Date(dateRange.startDate),
      endDate: new Date(dateRange.endDate),
    };
  }
);

// selectors.js
export const selectCountryFilter = (state) =>
  state.weatherReducer.countryFilter;
