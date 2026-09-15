import {
  Parallax,
  ParallaxLayer,
  type IParallax,
} from "@react-spring/parallax";
import { useRef, useState, type ComponentType } from "react";
import IconButton from "../../components/IconButton";
import { sections, type SectionId } from "../../config/sections";
import AboutSection from "../../sections/about/AboutSection";
import ContributeSection from "../../sections/contribute/ContributeSection";
import HomeSection from "../../sections/home/HomeSection";
import ProjectsSection from "../../sections/projects/ProjectsSection";
import TeamSection from "../../sections/team/TeamSection";
import type { LandingSectionProps } from "../../types/navigation";
import classNames from "../../utils/classNames";
import styles from "./LandingPage.module.css";

const sectionComponents: Record<
  SectionId,
  ComponentType<LandingSectionProps>
> = {
  home: HomeSection,
  about: AboutSection,
  team: TeamSection,
  projects: ProjectsSection,
  contribute: ContributeSection,
};

export default function LandingPage() {
  const [isLight, setIsLight] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const parallaxRef = useRef<IParallax>(null);

  const navigateTo = (sectionId: SectionId) => {
    const page = sections.findIndex(({ id }) => id === sectionId);
    if (page === -1) return;

    parallaxRef.current?.scrollTo(page);
    setCurrentPage(page);
  };

  const sharedProps = { onNavigate: navigateTo, isLight, setIsLight };
  const hasNextSection = currentPage < sections.length - 1;

  return (
    <>
      <Parallax
        pages={sections.length}
        ref={parallaxRef}
        className={classNames(isLight ? "light" : "dark", styles.parallax)}
      >
        {sections.map(({ id }, index) => {
          const Section = sectionComponents[id];
          return (
            <ParallaxLayer
              key={id}
              offset={index}
              speed={id === "home" ? 2.5 : 0.3}
            >
              <Section {...sharedProps} />
            </ParallaxLayer>
          );
        })}
      </Parallax>

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
