import axios from "axios";

const API_KEY = "dcabd3ec707ae1d77fb925e44a35ef65";
const PROXY = "https://api.allorigins.win/raw?url=";

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
  // Build the full Weatherstack URL, then wrap it in the CORS proxy
  const targetUrl = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${encodeURIComponent(city)}`;
  const response = await axios.get(PROXY + encodeURIComponent(targetUrl));

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
