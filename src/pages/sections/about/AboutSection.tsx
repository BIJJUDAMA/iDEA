import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import ImagePlaceholder from "../../../components/ImagePlaceholder";
import { PageShell, SectionShell } from "../../../components/Layout";
import SectionTitle from "../../../components/SectionTitle";
import texts from "../../../data/texts";
import styles from "./AboutSection.module.css";

export default function AboutSection() {
  const reduceMotion = useReducedMotion();
  const reveal = {
    initial: reduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 } as const,
    transition: { duration: reduceMotion ? 0 : 0.3, ease: "easeOut" as const },
  };

  return (
    <PageShell id="about" aria-labelledby="about-title">
      <SectionShell className={styles.section} aria-labelledby="about-title">
        <div className={styles.content}>
          <SectionTitle sectionId="about" id="about-title">
            {texts.about.title}
          </SectionTitle>
          <m.p className={styles.copy} {...reveal}>
            {texts.about.content}
          </m.p>
          <m.ul
            className={styles.highlights}
            aria-label="What defines iDEA"
            {...reveal}
          >
            {texts.about.highlights.map((highlight, index) => (
              <li key={highlight}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {highlight}
              </li>
            ))}
          </m.ul>
        </div>
        <m.div {...reveal}>
          <ImagePlaceholder
            className={styles.image}
            label={texts.about.placeholder}
          />
        </m.div>
      </SectionShell>
    </PageShell>
  );
}
