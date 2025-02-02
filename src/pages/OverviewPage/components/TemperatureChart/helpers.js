export const processChartData = (data) => {
  let chartData = [];

  if (data && Object.keys(data).length > 0) {
    let timeSeries = [];
    let allMaxTemperatures = [];
    let allMinTemperatures = [];

    if (data.time && data.temperature_2m_max) {
      // Case: A single country is selected
      timeSeries = data.time;
      allMaxTemperatures = [data.temperature_2m_max];
      allMinTemperatures = [data.temperature_2m_min];
    } else {
      // Case: "All Countries" is selected
      timeSeries = Object.values(data)[0].time; // Take time from any country
      allMaxTemperatures = Object.values(data).map(
        (country) => country.temperature_2m_max
      );
      allMinTemperatures = Object.values(data).map(
        (country) => country.temperature_2m_min
      );
    }

    // Calculate data for each time point
    chartData = timeSeries.map((date, index) => {
      let tempsMaxForDay = allMaxTemperatures
        .map((temps) => temps[index])
        .filter((t) => t !== null);
      let tempsMinForDay = allMinTemperatures
        .map((temps) => temps[index])
        .filter((t) => t !== null);

      // Calculate the sum of max and min temperatures
      const sumOfMaxTemps = tempsMaxForDay.reduce((sum, temp) => sum + temp, 0);
      const sumOfMinTemps = tempsMinForDay.reduce((sum, temp) => sum + temp, 0);

      // Calculate the average of max, min, and overall average if more than one country is selected
      const avgMaxTemp = sumOfMaxTemps / tempsMaxForDay.length;
      const avgMinTemp = sumOfMinTemps / tempsMinForDay.length;
      const overallAvgTemp =
        (sumOfMaxTemps + sumOfMinTemps) /
        (tempsMaxForDay.length + tempsMinForDay.length);

      // Return chart data
      return {
        date,
        maxTemp: tempsMaxForDay.length === 1 ? sumOfMaxTemps : avgMaxTemp,
        minTemp: tempsMinForDay.length === 1 ? sumOfMinTemps : avgMinTemp,
        avgTemp:
          tempsMaxForDay.length === 1
            ? (sumOfMaxTemps + sumOfMinTemps) / 2
            : overallAvgTemp,
      };
    });
  }

  return chartData;
};

// This function can also format the dates if needed
export const getXAxisTicks = (chartData) => {
  const totalDataPoints = chartData.length;
  const xAxisTicks = totalDataPoints <= 10 ? totalDataPoints : 10;

  // Calculate tick positions as evenly distributed across the data
  const tickIndices = Array.from({ length: xAxisTicks }, (_, index) =>
    Math.floor((index * totalDataPoints) / xAxisTicks)
  );

  return tickIndices.map((index) => chartData[index].date);
};
