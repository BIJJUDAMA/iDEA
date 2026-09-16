import { type ComponentType } from "react";
import useSectionNavigation from "../../hooks/useSectionNavigation";
import IconButton from "../../components/IconButton";
import { sections, type SectionId } from "../../config/sections";
import AboutSection from "../../sections/about/AboutSection";
import ContributeSection from "../../sections/contribute/ContributeSection";
import HomeSection from "../../sections/home/HomeSection";
import ProjectsSection from "../../sections/projects/ProjectsSection";
import TeamSection from "../../sections/team/TeamSection";
import type { SectionNavigationProps } from "../../types/navigation";
import classNames from "../../utils/classNames";
import styles from "./LandingPage.module.css";

const sectionComponents: Record<
  SectionId,
  ComponentType<SectionNavigationProps>
> = {
  home: HomeSection,
  about: AboutSection,
  team: TeamSection,
  projects: ProjectsSection,
  contribute: ContributeSection,
};

export default function LandingPage() {
  const { activeSection, navigateTo } = useSectionNavigation();
  const currentPage = sections.findIndex(({ id }) => id === activeSection);
  const sharedProps = { onNavigate: navigateTo, activeSection };
  const hasNextSection = currentPage < sections.length - 1;

  return (
    <>
      <a className={styles.skipLink} href="#main-content">
        Skip to content
      </a>
      <main id="main-content" tabIndex={-1}>
        {sections.map(({ id }) => {
          const Section = sectionComponents[id];
          return <Section key={id} {...sharedProps} />;
        })}
      </main>

      <IconButton
        className={classNames(
          styles.nextSection,
          !hasNextSection && styles.nextSectionHidden,
        )}
        type="button"
        aria-label="Scroll to next section"
        aria-hidden={!hasNextSection}
        tabIndex={hasNextSection ? 0 : -1}
        onClick={() => {
          const nextSection = sections[currentPage + 1];
          if (nextSection) navigateTo(nextSection.id);
        }}
      >
        <svg
          aria-hidden="true"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </IconButton>
    </>
  );
}
