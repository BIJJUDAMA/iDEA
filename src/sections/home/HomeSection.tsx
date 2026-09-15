import styled from "styled-components";
import HeroNavigation from "../../components/HeroNavigation";
import ThemeToggle from "../../components/ThemeToggle";
import type { LandingSectionProps } from "../../types/navigation";

const HeroSection = styled.div<{ $isLight: boolean }>`
  height: 100vh;
  width: 100%;
  background-color: ${({ $isLight }) =>
    $isLight ? "var(--bg-soft)" : "#0e0e0e"};
  color: ${({ $isLight }) => ($isLight ? "var(--ink)" : "var(--bg-soft)")};
  position: relative;
`;

export default function HomeSection({
  isLight,
  setIsLight,
  onNavigate,
}: LandingSectionProps) {
  return (
    <HeroSection $isLight={isLight}>
      <HeroNavigation onNavigate={onNavigate} />
      <ThemeToggle
        isLight={isLight}
        onToggle={() => {
          setIsLight((current) => !current);
        }}
      />
    </HeroSection>
  );
}
