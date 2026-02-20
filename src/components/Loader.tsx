import { Loader2 } from "lucide-react";

const Loader = () => (
  <div className="flex flex-col items-center justify-center py-16 gap-3">
    <Loader2 className="h-10 w-10 animate-spin text-sky-300" />
    <span className="text-sky-200 text-sm">Fetching weather data…</span>
  </div>
);

export default Loader;
