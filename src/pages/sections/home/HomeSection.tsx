import HeroNavigation from "../../../components/HeroNavigation";
import { PageShell, SectionShell } from "../../../components/Layout";
import type { SectionNavigationProps } from "../../../types/navigation";
import styles from "./HomeSection.module.css";

export default function HomeSection({ onNavigate }: SectionNavigationProps) {
  return (
    <PageShell id="home" aria-labelledby="hero-title" className={styles.page}>
      <SectionShell aria-labelledby="hero-title">
        <HeroNavigation onNavigate={onNavigate} />
        <div className={styles.scrollCue} aria-hidden="true">
          <span>scroll</span>
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </SectionShell>
    </PageShell>
  );
}
