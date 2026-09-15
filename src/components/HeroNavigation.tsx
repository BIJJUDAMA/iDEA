import { Fragment } from "react";
import styled from "styled-components";
import { sections, type SectionId } from "../config/sections";

const HeroContent = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 40px;
  box-sizing: border-box;
`;

const Wordmark = styled.h1`
  font-family: var(--font-serif);
  font-weight: 400;
  font-style: normal;
  font-size: clamp(96px, 16vw, 200px);
  letter-spacing: -0.02em;
  line-height: 1;
  margin: 0 0 20px 0;
  color: var(--accent-violet);
  text-transform: lowercase;
`;

const Tagline = styled.p`
  font-family: var(--font-mono);
  font-weight: 400;
  font-size: 13px;
  letter-spacing: 0.3em;
  color: var(--muted);
  margin: 0 0 40px 0;
  text-transform: lowercase;
`;

const DestinationList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
`;

const Destination = styled.button`
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  text-decoration: none !important;
  color: var(--ink-soft) !important;
  padding: 9px 18px;
  border: 1.5px solid var(--line);
  border-radius: var(--radius-pill);
  background: var(--bg);
  cursor: pointer;
  transition: all var(--dur-fast) var(--ease-out);

  &:hover {
    color: #5a4dff !important;
    border-color: #5a4dff;
    transform: translate(-1px, -1px);
    box-shadow: 2px 2px 0 #5a4dff;
  }

  &:active {
    transform: translate(1px, 1px);
    box-shadow: none;
  }
`;

const ContributionDestination = styled(Destination)`
  font-weight: 600;
  padding: 9px 20px;
  background-color: #c6ff3d;
  color: #0e0e0e !important;
  border-color: #0e0e0e;
  box-shadow: 2px 2px 0 #0e0e0e;
  display: inline-flex;
  align-items: center;
  gap: 6px;

  &:hover {
    box-shadow: 4px 4px 0 #0e0e0e;
  }
`;

interface HeroNavigationProps {
  onNavigate: (section: SectionId) => void;
}

export default function HeroNavigation({ onNavigate }: HeroNavigationProps) {
  return (
    <HeroContent>
      <Wordmark>iDEA</Wordmark>
      <Tagline>watch your ideas come to life.</Tagline>
      <DestinationList aria-label="Primary navigation">
        {sections
          .filter(({ id }) => id !== "home")
          .map((section) => {
            if (section.id === "contribute") {
              return (
                <Fragment key={section.id}>
                  <Destination
                    as="a"
                    href="https://github.com/IDEA-Amrita"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </Destination>
                  <ContributionDestination
                    type="button"
                    onClick={() => {
                      onNavigate(section.id);
                    }}
                  >
                    ✱ {section.label}
                  </ContributionDestination>
                </Fragment>
              );
            }

            return (
              <Destination
                key={section.id}
                type="button"
                onClick={() => {
                  onNavigate(section.id);
                }}
              >
                {section.label}
              </Destination>
            );
          })}
      </DestinationList>
    </HeroContent>
  );
}
