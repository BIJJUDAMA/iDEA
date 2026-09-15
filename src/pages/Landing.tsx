import { useRef, useState, type ComponentType } from "react";
import styled, { keyframes } from "styled-components";
import {
  Parallax,
  ParallaxLayer,
  type IParallax,
} from "@react-spring/parallax";

import { Home, About, Team, Contribute } from "../content";
import Projects from "../content/projects";
import { sections, type SectionId } from "../config/sections";
import type { LandingSectionProps } from "../types/navigation";

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(6px); }
`;

const ScrollCornerBtn = styled.button<{ $visible: boolean }>`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 9999;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1.5px solid var(--ink);
  background: var(--bg);
  color: var(--ink);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 3px 3px 0 var(--ink);
  opacity: ${(p) => (p.$visible ? 1 : 0)};
  pointer-events: ${(p) => (p.$visible ? "auto" : "none")};
  transition:
    opacity 300ms ease,
    background 150ms ease,
    color 150ms ease,
    transform 150ms ease,
    box-shadow 150ms ease;

  svg {
    animation: ${bounce} 1.6s ease-in-out infinite;
  }

  &:hover {
    background: var(--accent-violet);
    color: white;
    border-color: var(--accent-violet);
    transform: translate(-1px, -1px);
    box-shadow: 4px 4px 0 var(--ink);
  }

  &:active {
    transform: translate(1px, 1px);
    box-shadow: none;
  }
`;

const sectionComponents: Record<
  SectionId,
  ComponentType<LandingSectionProps>
> = {
  home: Home,
  about: About,
  team: Team,
  projects: Projects,
  contribute: Contribute,
};

function Landing() {
  const [isLight, setIsLight] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const ref = useRef<IParallax>(null);

  const navigateTo = (sectionId: SectionId) => {
    const page = sections.findIndex(({ id }) => id === sectionId);
    if (page === -1) return;

    ref.current?.scrollTo(page);
    setCurrentPage(page);
  };

  const sharedProps = { onNavigate: navigateTo, isLight, setIsLight };

  return (
    <>
      <Parallax
        pages={sections.length}
        ref={ref}
        className={isLight ? "light" : "dark"}
        style={{ top: "0", left: "0" }}
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

      <ScrollCornerBtn
        $visible={currentPage < sections.length - 1}
        onClick={() => {
          const nextSection =
            sections[Math.min(currentPage + 1, sections.length - 1)];
          if (nextSection) navigateTo(nextSection.id);
        }}
        aria-label="Scroll to next section"
      >
        <svg
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
      </ScrollCornerBtn>
    </>
  );
}

export default Landing;
