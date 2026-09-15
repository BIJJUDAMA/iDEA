import { useRef } from "react";
import ImagePlaceholder from "../../components/ImagePlaceholder";
import { PageShell, SectionShell } from "../../components/Layout";
import SectionHeader from "../../components/SectionHeader";
import about from "../../data/about";
import useElementOnScreen from "../../hooks/useElementOnScreen";
import type { SectionNavigationProps } from "../../types/navigation";
import styles from "./AboutSection.module.css";

export default function AboutSection({ onNavigate }: SectionNavigationProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const onScreen = useElementOnScreen(headingRef);
  const revealState = onScreen ? "visible" : "hidden";

  return (
    <PageShell>
      <SectionHeader activeSection="about" onNavigate={onNavigate} />
      <SectionShell className={styles.section} aria-labelledby="about-title">
        <div className={styles.content}>
          <h1
            className={styles.title}
            id="about-title"
            ref={headingRef}
            data-reveal={revealState}
          >
            About
          </h1>
          <p className={styles.copy} data-reveal={revealState}>
            {about.content}
          </p>
        </div>
        <ImagePlaceholder
          className={styles.image}
          label="Community illustration"
        />
      </SectionShell>
    </PageShell>
  );
}
