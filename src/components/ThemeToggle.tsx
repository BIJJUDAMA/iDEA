import { BsSun } from "react-icons/bs";
import { MdOutlineDarkMode } from "react-icons/md";
import IconButton from "./IconButton";
import { useTheme } from "../providers/themeContext";
import styles from "./Navigation.module.css";

export default function ThemeToggle() {
  const { theme, setPreference } = useTheme();
  const isLight = theme === "light";
  return (
    <IconButton
      className={styles.themeToggle}
      type="button"
      aria-label={`Switch to ${isLight ? "dark" : "light"} theme`}
      onClick={() => {
        setPreference(isLight ? "dark" : "light");
      }}
    >
      {isLight ? (
        <MdOutlineDarkMode aria-hidden="true" />
      ) : (
        <BsSun aria-hidden="true" />
      )}
    </IconButton>
  );
}
