import { useState, useEffect } from "react";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if user is logged in on app start
  useEffect(() => {
    const savedUser = localStorage.getItem("adminUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAdmin(true);
    }
  }, []);

  const login = (username, password) => {
    // Simple authentication - in real app, this would call an API
    if (username === "admin" && password === "admin123") {
      const userData = { username, role: "admin" };
      setUser(userData);
      setIsAdmin(true);
      localStorage.setItem("adminUser", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem("adminUser");
  };

  return {
    user,
    isAdmin,
    login,
    logout,
  };
};