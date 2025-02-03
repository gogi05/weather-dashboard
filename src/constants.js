import { ReactComponent as TemperatureIcon } from "./assets/temperature.svg";
import { ReactComponent as PrecipitationIcon } from "./assets/precipitation.svg";

import { ReactComponent as WindSpeedIcon } from "./assets/windSpeed.svg";

export const LOCATIONS_LIST = [
  {
    id: "australia",
    name: "Australia",
    latitude: "-25.2744",
    longitude: "133.7751",
  },
  {
    id: "belgium",
    name: "Belgium",
    latitude: "50.8503",
    longitude: "4.3517",
  },
  {
    id: "brazil",
    name: "Brazil",
    latitude: "-14.2350",
    longitude: "-51.9253",
  },
  {
    id: "china",
    name: "China",
    latitude: "35.8617",
    longitude: "104.1954",
  },
  {
    id: "denmark",
    name: "Denmark",
    latitude: "56.2639",
    longitude: "9.5018",
  },
  {
    id: "india",
    name: "India",
    latitude: "20.5937",
    longitude: "78.9629",
  },
  {
    id: "srilanka",
    name: "Sri Lanka",
    latitude: "7.8731",
    longitude: "80.7718",
  },
  {
    id: "thailand",
    name: "Thailand",
    latitude: "15.8700",
    longitude: "100.9925",
  },
];

export const CHART_HEADING = {
  TEMPERATURE: {
    icon: <TemperatureIcon className="w-6 h-6" />,
    text: "Temperatue",
  },
  PRECIPITATION: {
    icon: <PrecipitationIcon className="w-6 h-6" />,
    text: "Precipitation",
  },
  WIND_SPEED: {
    icon: <WindSpeedIcon className="w-6 h-6" />,
    text: "Windspeed",
  },
  RELATIVE_HUMIDITY: "Relative Humidity",
  APPARENT_TEMPERATURE: "Apparent Temperature",
  SEA_LEVEL_PRESSURE: "Sea Level Pressure",
};
