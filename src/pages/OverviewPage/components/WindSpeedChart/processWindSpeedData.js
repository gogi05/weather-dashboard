// Utility function to process wind speed data for a single or multiple countries
const processWindSpeedData = (data) => {
  let chartData = [];

  if (data && Object.keys(data).length > 0) {
    let timeSeries = [];
    let allWindSpeeds = [];

    if (data.time && data.wind_speed_10m_max) {
      // Case: A single country is selected
      timeSeries = data.time;
      allWindSpeeds = [data.wind_speed_10m_max];
    } else {
      // Case: Multiple countries are selected
      timeSeries = Object.values(data)[0].time; // Take time from any country
      allWindSpeeds = Object.values(data).map(
        (country) => country.wind_speed_10m_max
      );
    }

    // Calculate data for each time point
    chartData = timeSeries.map((date, index) => {
      // Collect wind speeds for the current date across countries
      let windSpeedsForDay = allWindSpeeds
        .map((windSpeeds) => windSpeeds[index])
        .filter((speed) => speed !== null);

      // Calculate the sum and average of wind speeds
      const sumOfWindSpeeds = windSpeedsForDay.reduce(
        (sum, speed) => sum + speed,
        0
      );
      const avgWindSpeed = sumOfWindSpeeds / windSpeedsForDay.length;

      return {
        date,
        windSpeed: avgWindSpeed, // Store the average wind speed for the day
      };
    });
  }

  return chartData;
};

export default processWindSpeedData;
