import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CloudSun } from "lucide-react";

const signupSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    const result = signupSchema.safeParse({ name, email, password });
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) errs[err.path[0] as string] = err.message;
      });
      setFieldErrors(errs);
      return;
    }

    const res = signup(name, email, password);
    if (res.success) {
      navigate("/login");
    } else {
      setError(res.error || "Signup failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-950 via-sky-900 to-indigo-950 px-4">
      <Card className="w-full max-w-md bg-sky-900/50 backdrop-blur-lg border-sky-700/40 shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <CloudSun className="h-8 w-8 text-sky-300" />
            <span className="text-2xl font-bold text-sky-100">WeatherNow</span>
          </div>
          <CardTitle className="text-sky-50">Create Account</CardTitle>
          <CardDescription className="text-sky-300">Sign up to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sky-200">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-sky-950/50 border-sky-700/50 text-sky-50 placeholder:text-sky-500"
              />
              {fieldErrors.name && <p className="text-sm text-red-400">{fieldErrors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sky-200">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-sky-950/50 border-sky-700/50 text-sky-50 placeholder:text-sky-500"
              />
              {fieldErrors.email && <p className="text-sm text-red-400">{fieldErrors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sky-200">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-sky-950/50 border-sky-700/50 text-sky-50 placeholder:text-sky-500"
              />
              {fieldErrors.password && <p className="text-sm text-red-400">{fieldErrors.password}</p>}
            </div>
            {error && <p className="text-sm text-red-400 text-center">{error}</p>}
            <Button type="submit" className="w-full bg-sky-500 hover:bg-sky-400 text-white font-semibold transition-colors">
              Create Account
            </Button>
            <p className="text-center text-sm text-sky-300">
              Already have an account?{" "}
              <Link to="/login" className="text-sky-400 hover:text-sky-200 underline underline-offset-4">
                Sign in
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
