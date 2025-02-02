const fetchWeatherApi = async (url) => {
  try {
    const response = await fetch(url);

    // Check if the response is successful (status code 200)
    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    // Parse the response JSON
    const data = await response.json();

    // Return the parsed data
    return data;
  } catch (error) {
    // Log the error and return null if any error occurs
    console.error("Error fetching weather data:", error);
    throw new Error("Error fetching weather data");
  }
};

export default fetchWeatherApi;
