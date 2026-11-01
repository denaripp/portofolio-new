"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "black" | "white";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isBlack: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "black",
  toggleTheme: () => {},
  isBlack: true,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("black");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio_theme") as Theme | null;
    if (saved === "black" || saved === "white") {
      setTheme(saved);
      applyTheme(saved);
    } else {
      applyTheme("black");
    }
    setMounted(true);
  }, []);

  const applyTheme = (t: Theme) => {
    const root = document.documentElement;
    if (t === "white") {
      root.classList.remove("dark");
      root.classList.add("light");
      root.setAttribute("data-theme", "white");
    } else {
      root.classList.remove("light");
      root.classList.add("dark");
      root.setAttribute("data-theme", "black");
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => {
      const next: Theme = prev === "black" ? "white" : "black";
      localStorage.setItem("portfolio_theme", next);
      applyTheme(next);
      return next;
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: mounted ? theme : "black",
        toggleTheme,
        isBlack: mounted ? theme === "black" : true,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
