export const WEATHER_DATA_TYPES = {
  FETCH_DATA_LOADING: "FETCH_DATA_LOADING",
  FETCH_DATA_SUCCESS: "FETCH_DATA_SUCCESS",
  FETCH_DATA_ERROR: "FETCH_DATA_ERROR",
  FETCH_DAILY_DATA: "FETCH_DAILY_DATA",
  FETCH_HOURLY_DATA: "FETCH_HOURLY_DATA",
  SET_DATE_RANGE: "SET_DATE_RANGE",
  SET_COUNTRY_FILTER: "SET_COUNTRY_FILTER",
};

const getInitialDateRange = () => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 7);

  return {
    startDate,
    endDate,
  };
};

export const INITIAL_STATE = {
  isLoading: false,
  dailyData: {},
  hourlyData: {},
  dailyUnits: {},
  hourlyUnits: {},
  error: null,
  dateRange: {
    startDate: getInitialDateRange(),
    endDate: new Date(),
  },
  countryFilter: "All Countries Selected",
};

export const WEATHER_API_BASE_URL =
  "https://archive-api.open-meteo.com/v1/archive";

export const DAILY_PARAMS = [
  "temperature_2m_max",
  "temperature_2m_min",
  "wind_speed_10m_max",
  "precipitation_sum",
];

export const HOURLY_PARAMS = [
  "temperature_2m",
  "relative_humidity_2m",
  "apparent_temperature",
  "precipitation",
  "pressure_msl",
  "wind_speed_10m",
];
