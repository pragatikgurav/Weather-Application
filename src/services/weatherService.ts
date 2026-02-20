import axios from "axios";

const API_KEY = "dcabd3ec707ae1d77fb925e44a35ef65";
const BASE_URL = "http://api.weatherstack.com/current";

export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
}

export const fetchWeather = async (city: string): Promise<WeatherData> => {
  const response = await axios.get(BASE_URL, {
    params: {
      access_key: API_KEY,
      query: city,
    },
  });

  const data = response.data;

  // Weatherstack returns an error object on failure
  if (data.error) {
    throw new Error(data.error.info || "City not found. Please try another search.");
  }

  return {
    city: data.location.name,
    country: data.location.country,
    temperature: data.current.temperature,
    description: data.current.weather_descriptions?.[0] || "N/A",
    icon: data.current.weather_icons?.[0] || "",
    humidity: data.current.humidity,
    windSpeed: data.current.wind_speed,
    feelsLike: data.current.feelslike,
  };
};
