import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => { success: boolean; error?: string };
  signup: (name: string, email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Restore auth state from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("weathernow_auth");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("weathernow_auth");
      }
    }
  }, []);

  const signup = (name: string, email: string, password: string) => {
    const existing = localStorage.getItem("weathernow_users");
    const users: Record<string, { name: string; email: string; password: string }> = existing
      ? JSON.parse(existing)
      : {};

    if (users[email]) {
      return { success: false, error: "An account with this email already exists." };
    }

    users[email] = { name, email, password };
    localStorage.setItem("weathernow_users", JSON.stringify(users));
    return { success: true };
  };

  const login = (email: string, password: string) => {
    const existing = localStorage.getItem("weathernow_users");
    if (!existing) {
      return { success: false, error: "No account found. Please sign up first." };
    }

    const users = JSON.parse(existing);
    const found = users[email];

    if (!found || found.password !== password) {
      return { success: false, error: "Invalid email or password." };
    }

    const userData: User = { name: found.name, email: found.email };
    setUser(userData);
    localStorage.setItem("weathernow_auth", JSON.stringify(userData));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("weathernow_auth");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
