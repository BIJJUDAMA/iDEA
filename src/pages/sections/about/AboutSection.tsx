import { useRef } from "react";
import ImagePlaceholder from "../../../components/ImagePlaceholder";
import { PageShell, SectionShell } from "../../../components/Layout";
import SectionTitle from "../../../components/SectionTitle";
import SectionHeader from "../../../components/SectionHeader";
import texts from "../../../data/texts";
import useElementOnScreen from "../../../hooks/useElementOnScreen";
import type { SectionNavigationProps } from "../../../types/navigation";
import styles from "./AboutSection.module.css";

export default function AboutSection({
  onNavigate,
  activeSection = "about",
}: SectionNavigationProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const onScreen = useElementOnScreen(headingRef);
  const revealState = onScreen ? "visible" : "hidden";

  return (
    <PageShell id="about" aria-labelledby="about-title">
      <SectionHeader
        sectionId="about"
        activeSection={activeSection}
        onNavigate={onNavigate}
      />
      <SectionShell className={styles.section} aria-labelledby="about-title">
        <div className={styles.content}>
          <SectionTitle
            sectionId="about"
            id="about-title"
            ref={headingRef}
            revealState={revealState}
          >
            {texts.about.title}
          </SectionTitle>
          <p className={styles.copy} data-reveal={revealState}>
            {texts.about.content}
          </p>
        </div>
        <ImagePlaceholder
          className={styles.image}
          label={texts.about.placeholder}
        />
      </SectionShell>
    </PageShell>
  );
}
