import { all } from "redux-saga/effects";
import { watchDailyWeatherDataSaga } from "./dailyDataSaga";
import { watchHourlyWeatherDataSaga } from "./hourlyDataSaga";

export default function* rootSaga() {
  yield all([watchDailyWeatherDataSaga(), watchHourlyWeatherDataSaga()]);
}
