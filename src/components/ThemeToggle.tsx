import { BsSun } from "react-icons/bs";
import { MdOutlineDarkMode } from "react-icons/md";
import IconButton from "./IconButton";
import styles from "./Navigation.module.css";

interface ThemeToggleProps {
  isLight: boolean;
  onToggle: () => void;
}

export default function ThemeToggle({ isLight, onToggle }: ThemeToggleProps) {
  return (
    <IconButton
      className={styles.themeToggle}
      type="button"
      aria-label={`Switch to ${isLight ? "dark" : "light"} theme`}
      onClick={onToggle}
    >
      {isLight ? (
        <MdOutlineDarkMode aria-hidden="true" />
      ) : (
        <BsSun aria-hidden="true" />
      )}
    </IconButton>
  );
}
