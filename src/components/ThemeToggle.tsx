import styled from "styled-components";
import { DarkModeIcon, LightModeIcon, ThemeControl } from "./navigationStyles";

const ToggleButton = styled.button`
  all: unset;
  display: flex;
`;

interface ThemeToggleProps {
  isLight: boolean;
  onToggle: () => void;
}

export default function ThemeToggle({ isLight, onToggle }: ThemeToggleProps) {
  return (
    <ThemeControl
      style={{ position: "absolute", top: "20px", right: "24px", margin: 0 }}
    >
      <ToggleButton
        type="button"
        aria-label={`Switch to ${isLight ? "dark" : "light"} theme`}
        onClick={onToggle}
      >
        {isLight ? <DarkModeIcon /> : <LightModeIcon />}
      </ToggleButton>
    </ThemeControl>
  );
}
