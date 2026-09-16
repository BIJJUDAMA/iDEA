import HeroNavigation from "../../components/HeroNavigation";
import { PageShell, SectionShell } from "../../components/Layout";
import ThemeToggle from "../../components/ThemeToggle";
import type { SectionNavigationProps } from "../../types/navigation";
import styles from "./HomeSection.module.css";

export default function HomeSection({ onNavigate }: SectionNavigationProps) {
  return (
    <PageShell id="home" aria-labelledby="hero-title" className={styles.page}>
      <SectionShell className={styles.section} aria-labelledby="hero-title">
        <HeroNavigation onNavigate={onNavigate} />
        <ThemeToggle />
      </SectionShell>
    </PageShell>
  );
}
