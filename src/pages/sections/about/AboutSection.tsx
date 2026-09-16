import { useRef } from "react";
import ImagePlaceholder from "../../../components/ImagePlaceholder";
import { PageShell, SectionShell } from "../../../components/Layout";
import SectionTitle from "../../../components/SectionTitle";
import texts from "../../../data/texts";
import useElementOnScreen from "../../../hooks/useElementOnScreen";
import styles from "./AboutSection.module.css";

export default function AboutSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const onScreen = useElementOnScreen(headingRef);
  const revealState = onScreen ? "visible" : "hidden";

  return (
    <PageShell id="about" aria-labelledby="about-title">
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
