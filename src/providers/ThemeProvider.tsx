import {
  useEffect,
  useLayoutEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { ThemeContext, type ThemePreference } from "./themeContext";

function savedPreference(): ThemePreference {
  try {
    const saved = window.localStorage.getItem("idea-theme");
    if (saved === "light" || saved === "dark" || saved === "system")
      return saved;
  } catch {
    /* Storage may be unavailable in private or embedded contexts. */
  }
  return "system";
}

export default function ThemeProvider({ children }: PropsWithChildren) {
  const [preference, setPreferenceState] = useState(savedPreference);
  const [systemDark, setSystemDark] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches,
  );
  const theme =
    preference === "system" ? (systemDark ? "dark" : "light") : preference;

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => {
      setSystemDark(media.matches);
    };
    media.addEventListener("change", update);
    return () => {
      media.removeEventListener("change", update);
    };
  }, []);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const setPreference = (next: ThemePreference) => {
    setPreferenceState(next);
    try {
      window.localStorage.setItem("idea-theme", next);
    } catch {
      /* Keep the in-memory selection. */
    }
  };

  return (
    <ThemeContext.Provider value={{ preference, theme, setPreference }}>
      {children}
    </ThemeContext.Provider>
  );
}
