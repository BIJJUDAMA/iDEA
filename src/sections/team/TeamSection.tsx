import { useRef } from "react";
import useElementOnScreen from "../../hooks/useElementOnScreen";
import { PageViewport } from "../../components/pageStyles";
import SectionHeader from "../../components/SectionHeader";
import type { SectionNavigationProps } from "../../types/navigation";
import FacultyGrid from "./FacultyGrid";
import TeamAccordion from "./TeamAccordion";
import { TeamIntro, TeamOverview, TeamTitle, TermLabel } from "./styles";

export default function TeamSection({
  isLight,
  onNavigate,
}: SectionNavigationProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const onScreen = useElementOnScreen(sectionRef);
  const revealStyle = {
    opacity: onScreen ? 1 : 0,
    translate: onScreen ? "none" : "0 2rem",
    transition: "600ms ease-in-out",
  } as const;

  return (
    <PageViewport>
      <SectionHeader
        activeSection="team"
        isLight={isLight}
        onNavigate={onNavigate}
      />
      <TeamOverview ref={sectionRef}>
        <TermLabel style={revealStyle}>2023-24</TermLabel>
        <div style={{ alignSelf: "flex-start" }}>
          <TeamTitle style={revealStyle}>Core Team</TeamTitle>
          <TeamIntro style={revealStyle}>
            Running a student organisation is a piece of cake. If you have{" "}
            <br />
            these people, that is!
          </TeamIntro>
        </div>
        <FacultyGrid revealStyle={revealStyle} />
      </TeamOverview>
      <TeamAccordion revealStyle={revealStyle} />
    </PageViewport>
  );
}
