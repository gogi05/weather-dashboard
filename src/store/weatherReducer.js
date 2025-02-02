import { WEATHER_DATA_TYPES } from "./constants";
import { INITIAL_STATE } from "./constants";

const weatherReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload, dataType } = action;

  switch (type) {
    case WEATHER_DATA_TYPES.FETCH_DATA_LOADING:
      return { ...state, isLoading: true };

    case WEATHER_DATA_TYPES.FETCH_DATA_SUCCESS:
      if (dataType === "daily") {
        return {
          ...state,
          dailyData: {
            ...state.dailyData,
            ...payload.dailyData,
          },
          dailyUnits: payload.dailyUnits || state.dailyUnits,
          isLoading: false,
        };
      }
      if (dataType === "hourly") {
        return {
          ...state,
          hourlyData: {
            ...state.hourlyData,
            ...payload.hourlyData,
          },
          hourlyUnits: payload.hourlyUnits || state.hourlyUnits,
          isLoading: false,
        };
      }
      return state;

    case WEATHER_DATA_TYPES.FETCH_DATA_ERROR:
      return { ...state, error: payload, isLoading: false };

    case WEATHER_DATA_TYPES.SET_DATE_RANGE:
      return {
        ...state,
        dateRange: {
          startDate: new Date(payload.startDate),
          endDate: new Date(payload.endDate),
        },
      };
    case WEATHER_DATA_TYPES.SET_COUNTRY_FILTER:
      return {
        ...state,
        countryFilter: payload,
      };

    default:
      return state;
  }
};

export default weatherReducer;
