import { takeLatest } from "redux-saga/effects";
import { WEATHER_DATA_TYPES, DAILY_PARAMS } from "./constants";
import { fetchWeatherDataSaga } from "./helpers/fetchWeatherDataSaga";

// Worker saga: Fetch daily weather data
function* fetchDailyWeatherSaga(action) {
  yield* fetchWeatherDataSaga(action, "daily", DAILY_PARAMS);
}

// Watcher saga: Watches for FETCH_DAILY_DATA actions
export function* watchDailyWeatherDataSaga() {
  yield takeLatest(WEATHER_DATA_TYPES.FETCH_DAILY_DATA, fetchDailyWeatherSaga);
}
