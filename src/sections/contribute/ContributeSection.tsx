import texts from "../../data/texts";
import { useRef } from "react";
import { BsArrowUpRight } from "react-icons/bs";
import { PageShell, SectionShell } from "../../components/Layout";
import SectionHeader from "../../components/SectionHeader";
import TypeformButton from "../../components/TypeformButton";
import { formIds } from "../../config/forms";
import useElementOnScreen from "../../hooks/useElementOnScreen";
import type { SectionNavigationProps } from "../../types/navigation";
import styles from "./ContributeSection.module.css";

export default function ContributeSection({
  onNavigate,
  activeSection = "contribute",
}: SectionNavigationProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const onScreen = useElementOnScreen(headingRef);
  const revealState = onScreen ? "visible" : "hidden";

  return (
    <PageShell id="contribute" aria-labelledby="contribute-title">
      <SectionHeader activeSection={activeSection} onNavigate={onNavigate} />
      <SectionShell
        className={styles.section}
        aria-labelledby="contribute-title"
      >
        <div className={styles.actions}>
          <article className={styles.action}>
            <h2
              className={styles.heading}
              id="contribute-title"
              ref={headingRef}
              data-reveal={revealState}
            >
              {texts.contribute.propose.title}
            </h2>
            <TypeformButton
              formId={formIds.proposeProject}
              label={texts.contribute.propose.label}
            >
              {texts.contribute.buttonText}{" "}
              <BsArrowUpRight aria-hidden="true" />
            </TypeformButton>
            <p className={styles.copy}>
              {texts.contribute.propose.paragraphs[0]}
            </p>
            <p className={styles.copy}>
              {texts.contribute.propose.paragraphs[1]}
            </p>
          </article>
          <span className={styles.divider} aria-hidden="true" />
          <article className={styles.action}>
            <h2 className={styles.heading} data-reveal={revealState}>
              {texts.contribute.join.title}
            </h2>
            <p className={styles.copy}>{texts.contribute.join.paragraphs[0]}</p>
            <p className={styles.copy}>{texts.contribute.join.paragraphs[1]}</p>
            <TypeformButton
              formId={formIds.joinCommunity}
              label={texts.contribute.join.label}
            >
              {texts.contribute.buttonText}{" "}
              <BsArrowUpRight aria-hidden="true" />
            </TypeformButton>
          </article>
        </div>
      </SectionShell>
    </PageShell>
  );
}
