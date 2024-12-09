// src/api/weatherApi.ts
const API_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = '2560825c94e5c3d7a6331383767b16f3';

export const fetchWeatherByCity = async (city: string) => {
  try {
    const response = await fetch(`${API_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
     
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchHourlyForecast = async (city: string) => {
  try {
    const response = await fetch(`${API_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`);
    if (!response.ok) {
      throw new Error('Failed to fetch forecast data');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
