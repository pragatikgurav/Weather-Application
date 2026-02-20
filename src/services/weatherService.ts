import axios from "axios";

const API_KEY = "dcabd3ec707ae1d77fb925e44a35ef65";

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

// List of CORS proxies to try in order
const PROXY_URLS = [
  (url: string) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
  (url: string) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
  (url: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
];

export const fetchWeather = async (city: string): Promise<WeatherData> => {
  const targetUrl = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${encodeURIComponent(city)}`;

  let lastError: any;
  for (const makeProxyUrl of PROXY_URLS) {
    try {
      const response = await axios.get(makeProxyUrl(targetUrl), { timeout: 8000 });
      const data = response.data;

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
    } catch (err: any) {
      // If it's an API-level error (city not found), throw immediately
      if (err.message && !err.message.includes("Network Error") && !err.code?.includes("ERR")) {
        throw err;
      }
      lastError = err;
    }
  }

  throw new Error("Unable to reach weather service. Please try again later.");
};
