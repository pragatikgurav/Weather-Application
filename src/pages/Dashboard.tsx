import { useState } from "react";
import Navbar from "@/components/Navbar";
import WeatherCard from "@/components/WeatherCard";
import Loader from "@/components/Loader";
import ErrorMessage from "@/components/ErrorMessage";
import { fetchWeather, type WeatherData } from "@/services/weatherService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Dashboard = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = city.trim();
    if (!trimmed) return;

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const data = await fetchWeather(trimmed);
      setWeather(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-950 via-sky-900 to-indigo-950">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-10">
        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-8">
          <Input
            type="text"
            placeholder="Search for a city…"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 bg-sky-950/50 border-sky-700/50 text-sky-50 placeholder:text-sky-500"
          />
          <Button type="submit" className="bg-sky-500 hover:bg-sky-400 text-white px-6" disabled={loading}>
            <Search className="h-4 w-4 mr-1" />
            Search
          </Button>
        </form>

        {/* States */}
        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {weather && <WeatherCard data={weather} />}

        {!loading && !error && !weather && (
          <p className="text-center text-sky-400 mt-20 text-lg">
            Enter a city name above to check the weather 🌤
          </p>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
