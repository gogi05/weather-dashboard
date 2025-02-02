import { format } from "date-fns";

// Utility function to process the data for multiple countries or a single country
const usePrecipitationData = (data) => {
  let chartData = [];

  if (data && Object.keys(data).length > 0) {
    let timeSeries = [];
    let allPrecipitationData = [];

    if (data.time && data.precipitation_sum) {
      // Case: A single country is selected
      timeSeries = data.time;
      allPrecipitationData = [data.precipitation_sum];
    } else {
      // Case: Multiple countries are selected
      timeSeries = Object.values(data)[0].time; // Take time from any country
      allPrecipitationData = Object.values(data).map(
        (country) => country.precipitation_sum
      );
    }

    // Calculate data for each time point
    chartData = timeSeries.map((date, index) => {
      // Collect precipitation values for the current date across countries
      let precipitationForDay = allPrecipitationData
        .map((precipitation) => precipitation[index])
        .filter((precipitation) => precipitation !== null);

      // Calculate the sum and average of precipitation
      const sumOfPrecipitation = precipitationForDay.reduce(
        (sum, precipitation) => sum + precipitation,
        0
      );
      const avgPrecipitation = sumOfPrecipitation / precipitationForDay.length;

      return {
        date,
        precipitation: avgPrecipitation, // Store the average precipitation for the day
      };
    });
  }

  return chartData;
};

export default usePrecipitationData;
