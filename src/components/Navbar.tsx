import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CloudSun, LogOut } from "lucide-react";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-sky-900/80 backdrop-blur-md border-b border-sky-700/40">
      <div className="flex items-center gap-2">
        <CloudSun className="h-7 w-7 text-sky-300" />
        <span className="text-xl font-bold text-sky-100 tracking-tight">WeatherNow</span>
      </div>
      <Button
        variant="ghost"
        onClick={handleLogout}
        className="text-sky-200 hover:text-white hover:bg-sky-800/60 gap-2"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </Button>
    </nav>
  );
};

export default Navbar;
