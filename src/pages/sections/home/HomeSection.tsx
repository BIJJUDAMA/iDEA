import HeroNavigation from "../../../components/HeroNavigation";
import { PageShell, SectionShell } from "../../../components/Layout";
import type { SectionNavigationProps } from "../../../types/navigation";
import isModifiedClick from "../../../utils/isModifiedClick";
import styles from "./HomeSection.module.css";

export default function HomeSection({ onNavigate }: SectionNavigationProps) {
  return (
    <PageShell id="home" aria-labelledby="hero-title" className={styles.page}>
      <SectionShell aria-labelledby="hero-title">
        <HeroNavigation onNavigate={onNavigate} />
        <a
          className={styles.scrollCue}
          href="#about"
          aria-label="Scroll to About"
          onClick={(event) => {
            if (isModifiedClick(event)) return;
            event.preventDefault();
            onNavigate("about");
          }}
        >
          <span>scroll</span>
          <span className={styles.arrowCircle} aria-hidden="true">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </span>
        </a>
      </SectionShell>
    </PageShell>
  );
}
