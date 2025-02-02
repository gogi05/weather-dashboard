const fetchWeatherApi = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`API request failed: ${error.message}`);
  }
};

export default fetchWeatherApi;
