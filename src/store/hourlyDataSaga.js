import { takeLatest } from "redux-saga/effects";
import { WEATHER_DATA_TYPES, HOURLY_PARAMS } from "./constants";
import { fetchWeatherDataSaga } from "./helpers/fetchWeatherDataSaga";

// Worker saga: Fetch hourly weather data
function* fetchHourlyWeatherSaga(action) {
  yield* fetchWeatherDataSaga(action, "hourly", HOURLY_PARAMS, true);
}

// Watcher saga: Watches for FETCH_HOURLY_DATA actions
export function* watchHourlyWeatherDataSaga() {
  yield takeLatest(
    WEATHER_DATA_TYPES.FETCH_HOURLY_DATA,
    fetchHourlyWeatherSaga
  );
}
