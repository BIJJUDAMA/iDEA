import texts from "../../../data/texts";
import { useRef } from "react";
import { BsArrowUpRight } from "react-icons/bs";
import { PageShell, SectionShell } from "../../../components/Layout";
import SectionTitle from "../../../components/SectionTitle";
import TypeformButton from "../../../components/TypeformButton";
import { formIds } from "../../../config/forms";
import useElementOnScreen from "../../../hooks/useElementOnScreen";
import styles from "./ContributeSection.module.css";

export default function ContributeSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const onScreen = useElementOnScreen(headingRef);
  const revealState = onScreen ? "visible" : "hidden";

  return (
    <PageShell id="contribute" aria-labelledby="contribute-title">
      <SectionShell
        className={styles.section}
        aria-labelledby="contribute-title"
      >
        <div className={styles.actions}>
          <article className={styles.action}>
            <SectionTitle
              sectionId="contribute"
              id="contribute-title"
              ref={headingRef}
              revealState={revealState}
            >
              {texts.contribute.propose.title}
            </SectionTitle>
            <TypeformButton
              formId={formIds.proposeProject}
              label={texts.contribute.propose.label}
            >
              {texts.contribute.propose.label}{" "}
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
            <SectionTitle sectionId="contribute" revealState={revealState}>
              {texts.contribute.join.title}
            </SectionTitle>
            <p className={styles.copy}>{texts.contribute.join.paragraphs[0]}</p>
            <p className={styles.copy}>{texts.contribute.join.paragraphs[1]}</p>
            <TypeformButton
              formId={formIds.joinCommunity}
              label={texts.contribute.join.label}
            >
              {texts.contribute.join.buttonText}{" "}
              <BsArrowUpRight aria-hidden="true" />
            </TypeformButton>
          </article>
        </div>
      </SectionShell>
    </PageShell>
  );
}
