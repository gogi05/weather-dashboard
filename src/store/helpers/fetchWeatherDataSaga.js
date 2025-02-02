import { call, put } from "redux-saga/effects";
import fetchWeatherApi from "./fetchWeatherApi";
import { WEATHER_API_BASE_URL, WEATHER_DATA_TYPES } from "../constants";
import { LOCATIONS_LIST } from "../../constants";

// Utility function to construct API URL
const getWeatherApiUrl = ({
  latitude,
  longitude,
  startDate,
  endDate,
  params,
  isHourly,
}) => {
  const dataQuery = params.join(","); // Use the passed params (daily or hourly)
  const dataType = isHourly ? "hourly" : "daily";
  return `${WEATHER_API_BASE_URL}?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}&${dataType}=${dataQuery}`;
};

// Shared worker saga to fetch weather data (daily or hourly)
export function* fetchWeatherDataSaga(
  action,
  dataType,
  params,
  isHourly = false
) {
  try {
    const { startDate, endDate } = action.payload;
    const updatedData = {}; // Temporary object to store fetched data
    let units = null; // To store the units (once per fetch)

    for (let i = 0; i < LOCATIONS_LIST.length; i++) {
      const { latitude, longitude, id } = LOCATIONS_LIST[i];

      const url = getWeatherApiUrl({
        latitude,
        longitude,
        startDate,
        endDate,
        params,
        isHourly,
      });

      yield put({ type: WEATHER_DATA_TYPES.FETCH_DATA_LOADING, countryId: id });

      const response = yield call(fetchWeatherApi, url);

      const dataKey = isHourly ? "hourly" : "daily";

      if (response?.[dataKey]) {
        updatedData[id] = response[dataKey];

        // Store units (Only once, as it's the same for all countries)
        if (!units && response[`${dataKey}_units`]) {
          units = response[`${dataKey}_units`];
        }
      } else {
        throw new Error(
          `Invalid response: No ${dataType} data received for ${id}`
        );
      }
    }

    // Dispatch success action with updated data
    yield put({
      type: WEATHER_DATA_TYPES.FETCH_DATA_SUCCESS,
      payload: {
        [`${dataType}Data`]: updatedData,
        [`${dataType}Units`]: units,
      },
      dataType, // Ensure this is matching your condition
    });
  } catch (error) {
    yield put({
      type: WEATHER_DATA_TYPES.FETCH_DATA_ERROR,
      payload: error.message,
    });
  }
}
