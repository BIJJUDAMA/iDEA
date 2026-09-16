import texts from "../../../data/texts";
import { useRef } from "react";
import { PageShell, SectionShell } from "../../../components/Layout";
import SectionTitle from "../../../components/SectionTitle";
import SectionHeader from "../../../components/SectionHeader";
import useElementOnScreen from "../../../hooks/useElementOnScreen";
import type { SectionNavigationProps } from "../../../types/navigation";
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
      <SectionHeader
        sectionId="team"
        activeSection={activeSection}
        onNavigate={onNavigate}
      />
      <SectionShell className={styles.section} aria-labelledby="team-title">
        <div className={styles.overview}>
          <div className={styles.intro}>
            <SectionTitle
              sectionId="team"
              id="team-title"
              ref={headingRef}
              revealState={revealState}
            >
              {texts.team.title}
            </SectionTitle>
            <p className={styles.description} data-reveal={revealState}>
              {texts.team.description}
            </p>
          </div>
          <FacultyGrid revealState={revealState} />
        </div>
        <TeamAccordion revealState={revealState} />
      </SectionShell>
    </PageShell>
  );
}
