import { useRef } from "react";
import { PageShell, SectionShell } from "../../components/Layout";
import SectionHeader from "../../components/SectionHeader";
import useElementOnScreen from "../../hooks/useElementOnScreen";
import type { SectionNavigationProps } from "../../types/navigation";
import FacultyGrid from "./FacultyGrid";
import styles from "./TeamSection.module.css";
import TeamAccordion from "./TeamAccordion";

export default function TeamSection({
  onNavigate,
  activeSection = "team",
}: SectionNavigationProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const onScreen = useElementOnScreen(headingRef);
  const revealState = onScreen ? "visible" : "hidden";

  return (
    <PageShell id="team" aria-labelledby="team-title">
      <SectionHeader activeSection={activeSection} onNavigate={onNavigate} />
      <SectionShell className={styles.section} aria-labelledby="team-title">
        <p className={styles.term} data-reveal={revealState}>
          2023-24
        </p>
        <div className={styles.overview}>
          <div className={styles.intro}>
            <h2
              className={styles.title}
              id="team-title"
              ref={headingRef}
              data-reveal={revealState}
            >
              Core Team
            </h2>
            <p className={styles.description} data-reveal={revealState}>
              Running a student organisation is a piece of cake. If you have
              these people, that is!
            </p>
          </div>
          <FacultyGrid revealState={revealState} />
        </div>
        <TeamAccordion revealState={revealState} />
      </SectionShell>
    </PageShell>
  );
}
