import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Wind, Thermometer, MapPin } from "lucide-react";
import type { WeatherData } from "@/services/weatherService";

const WeatherCard = ({ data }: { data: WeatherData }) => (
  <Card className="max-w-md mx-auto bg-sky-900/60 backdrop-blur-lg border-sky-700/40 text-sky-50 shadow-2xl">
    <CardHeader className="text-center pb-2">
      <div className="flex items-center justify-center gap-1 text-sky-300 text-sm mb-1">
        <MapPin className="h-4 w-4" />
        <span>{data.city}, {data.country}</span>
      </div>
      <CardTitle className="text-5xl font-extrabold tracking-tight">{data.temperature}°C</CardTitle>
      <div className="flex items-center justify-center gap-3 mt-2">
        {data.icon && <img src={data.icon} alt={data.description} className="h-12 w-12" />}
        <span className="text-lg text-sky-200 capitalize">{data.description}</span>
      </div>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-sky-700/40">
        <div className="flex flex-col items-center gap-1">
          <Droplets className="h-5 w-5 text-sky-300" />
          <span className="text-xs text-sky-400">Humidity</span>
          <span className="font-semibold">{data.humidity}%</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Wind className="h-5 w-5 text-sky-300" />
          <span className="text-xs text-sky-400">Wind</span>
          <span className="font-semibold">{data.windSpeed} km/h</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Thermometer className="h-5 w-5 text-sky-300" />
          <span className="text-xs text-sky-400">Feels Like</span>
          <span className="font-semibold">{data.feelsLike}°C</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default WeatherCard;
