import HeroNavigation from "../../components/HeroNavigation";
import { PageShell, SectionShell } from "../../components/Layout";
import ThemeToggle from "../../components/ThemeToggle";
import type { LandingSectionProps } from "../../types/navigation";
import styles from "./HomeSection.module.css";

export default function HomeSection({
  isLight,
  setIsLight,
  onNavigate,
}: LandingSectionProps) {
  return (
    <PageShell className={styles.page}>
      <SectionShell className={styles.section} aria-labelledby="hero-title">
        <HeroNavigation onNavigate={onNavigate} />
        <ThemeToggle
          isLight={isLight}
          onToggle={() => {
            setIsLight((current) => !current);
          }}
        />
      </SectionShell>
    </PageShell>
  );
}
