import { useRef } from "react";
import useElementOnScreen from "../../hooks/useElementOnScreen";
import SectionHeader from "../../components/SectionHeader";
import {
  BodyCopy,
  CopyColumn,
  FeatureImage,
  PageViewport,
  PrimaryContent,
  SectionTitle,
} from "../../components/pageStyles";
import about from "../../data/about";
import type { SectionNavigationProps } from "../../types/navigation";

export default function AboutSection({
  isLight,
  onNavigate,
}: SectionNavigationProps) {
  const observedElement = useRef<HTMLHeadingElement>(null);
  const onScreen = useElementOnScreen(observedElement);
  const revealStyle = {
    opacity: onScreen ? 1 : 0,
    translate: onScreen ? "none" : "0 2rem",
    transition: "1000ms ease-in-out",
  } as const;

  return (
    <PageViewport>
      <SectionHeader
        activeSection="about"
        isLight={isLight}
        onNavigate={onNavigate}
      />
      <PrimaryContent>
        <SectionTitle ref={observedElement} style={revealStyle}>
          About
        </SectionTitle>
        <CopyColumn>
          <BodyCopy style={revealStyle}>{about.content}</BodyCopy>
        </CopyColumn>
      </PrimaryContent>
      <FeatureImage label="Community illustration" aspectRatio="4 / 3" />
    </PageViewport>
  );
}
