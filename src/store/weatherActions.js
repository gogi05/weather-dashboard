import { WEATHER_DATA_TYPES } from "./constants";

export const setDateRange = (dateRange) => ({
  type: WEATHER_DATA_TYPES.SET_DATE_RANGE,
  payload: dateRange,
});

export const setCountryFilter = (countryFilter = "All Countries Selected") => ({
  type: WEATHER_DATA_TYPES.SET_COUNTRY_FILTER,
  payload: countryFilter,
});
