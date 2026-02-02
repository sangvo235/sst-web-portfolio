"use client";

import { useTheme } from "next-themes";
import { RiSunLine, RiMoonFill } from "react-icons/ri";

export default function ThemeToggle() {
  const { theme, systemTheme, setTheme } = useTheme();
  const current = theme === "system" ? systemTheme : theme;

  return (
    <button
      onClick={() => setTheme(current === "dark" ? "light" : "dark")}
      className="bg-slate-100 dark:bg-stone-700 p-2 rounded-xl"
      aria-label="Toggle theme"
    >
      {current === "dark" ? <RiSunLine size={20} /> : <RiMoonFill size={20} />}
    </button>
  );
}
