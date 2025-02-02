// Generic filter data logic
const filterData = (data, countryFilter, ...valueKeys) => {
  if (!data) return {};

  // If a single country is selected
  if (countryFilter !== "All Countries Selected") {
    const countryKey = countryFilter.toLowerCase();

    if (data[countryKey]) {
      let result = { time: data[countryKey].time || [] };
      valueKeys.forEach((key) => {
        result[key] = data[countryKey][key] || [];
      });
      return result;
    }
    return {};
  }

  // If all countries are selected, return filtered data for all countries
  const filteredData = {};
  Object.keys(data).forEach((country) => {
    filteredData[country] = { time: data[country].time || [] };
    valueKeys.forEach((key) => {
      filteredData[country][key] = data[country][key] || [];
    });
  });

  return filteredData;
};

// Helper function to filter temperature chart data (max & min)
export const filterTemperatureData = (data, countryFilter) => {
  return filterData(
    data,
    countryFilter,
    "temperature_2m_max",
    "temperature_2m_min"
  );
};

// Helper function to filter precipitation chart data
export const filterPrecipitationData = (data, countryFilter) => {
  return filterData(data, countryFilter, "precipitation_sum");
};

// Helper function to filter wind speed chart data
export const filterWindspeedData = (data, countryFilter) => {
  return filterData(data, countryFilter, "wind_speed_10m_max");
};
