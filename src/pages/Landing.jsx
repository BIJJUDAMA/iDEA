import { useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

import { Home, About, Team, Contribute } from "../content";
import Projects from "../content/projects";

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(6px); }
`;

const ScrollCornerBtn = styled.button`
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

const TOTAL_PAGES = 5;

function Landing() {
  const [isLight, setIsLight] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const ref = useRef();

  const scroll = (to) => {
    ref.current?.scrollTo(to);
    setCurrentPage(to);
  };

  const navigation = {
    about: () => scroll(1),
    team: () => scroll(2),
    projects: () => scroll(3),
    contribute: () => scroll(4),
  };

  const sharedProps = { ...navigation, isLight, setIsLight };

  return (
    <>
      <Parallax
        pages={TOTAL_PAGES}
        ref={ref}
        className={isLight ? "light" : "dark"}
        style={{ top: "0", left: "0" }}
      >
        <ParallaxLayer offset={0} speed={2.5}>
          <Home {...sharedProps} />
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0.3}>
          <About {...sharedProps} up={() => scroll(0)} />
        </ParallaxLayer>
        <ParallaxLayer offset={2} speed={0.3}>
          <Team {...sharedProps} />
        </ParallaxLayer>
        <ParallaxLayer offset={3} speed={0.3}>
          <Projects {...sharedProps} />
        </ParallaxLayer>
        <ParallaxLayer offset={4} speed={0.3}>
          <Contribute {...sharedProps} />
        </ParallaxLayer>
      </Parallax>

      <ScrollCornerBtn
        $visible={currentPage < TOTAL_PAGES - 1}
        onClick={() => scroll(Math.min(currentPage + 1, TOTAL_PAGES - 1))}
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
