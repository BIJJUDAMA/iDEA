import texts from "../../../data/texts";
import { BsArrowUpRight } from "react-icons/bs";
import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { PageShell, SectionShell } from "../../../components/Layout";
import SectionTitle from "../../../components/SectionTitle";
import TypeformButton from "../../../components/TypeformButton";
import { formIds } from "../../../config/forms";
import styles from "./ContributeSection.module.css";

export default function ContributeSection() {
  const reduceMotion = useReducedMotion();
  const cardMotion = {
    initial: reduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 } as const,
    transition: { duration: reduceMotion ? 0 : 0.32, ease: "easeOut" as const },
    ...(reduceMotion
      ? {}
      : {
          whileHover: {
            y: -4,
            transition: {
              type: "spring" as const,
              stiffness: 450,
              damping: 34,
            },
          },
        }),
  };

  return (
    <PageShell id="contribute" aria-labelledby="contribute-title">
      <SectionShell
        className={styles.section}
        aria-labelledby="contribute-title"
      >
        <div className={styles.actions}>
          <m.article className={styles.action} {...cardMotion}>
            <div className={styles.content}>
              <SectionTitle sectionId="contribute" id="contribute-title">
                {texts.contribute.propose.title}
              </SectionTitle>
              <p className={styles.copy}>
                {texts.contribute.propose.paragraphs[0]}
              </p>
              <p className={styles.copy}>
                {texts.contribute.propose.paragraphs[1]}
              </p>
            </div>
            <TypeformButton
              formId={formIds.proposeProject}
              label={texts.contribute.propose.label}
            >
              {texts.contribute.propose.label}{" "}
              <BsArrowUpRight aria-hidden="true" />
            </TypeformButton>
          </m.article>
          <m.article className={styles.action} {...cardMotion}>
            <div className={styles.content}>
              <SectionTitle sectionId="contribute">
                {texts.contribute.join.title}
              </SectionTitle>
              <p className={styles.copy}>
                {texts.contribute.join.paragraphs[0]}
              </p>
              <p className={styles.copy}>
                {texts.contribute.join.paragraphs[1]}
              </p>
            </div>
            <TypeformButton
              formId={formIds.joinCommunity}
              label={texts.contribute.join.label}
            >
              {texts.contribute.join.buttonText}{" "}
              <BsArrowUpRight aria-hidden="true" />
            </TypeformButton>
          </m.article>
        </div>
      </SectionShell>
    </PageShell>
  );
}
