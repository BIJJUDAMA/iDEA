import { AiOutlineMoon, AiOutlineSun } from "react-icons/ai";
import { useTheme } from "../providers/themeContext";
import styles from "./Navigation.module.css";

export default function ThemeToggle() {
  const { theme, setPreference } = useTheme();
  const nextTheme = theme === "dark" ? "light" : "dark";
  const Icon = theme === "dark" ? AiOutlineSun : AiOutlineMoon;

  return (
    <button
      type="button"
      className={styles.themeToggle}
      aria-label={`Use ${nextTheme} theme`}
      title={`Use ${nextTheme} theme`}
      onClick={() => {
        setPreference(nextTheme);
      }}
    >
      <Icon aria-hidden="true" />
    </button>
  );
}
