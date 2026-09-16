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
              Submit an Exciting Project Idea
            </h2>
            <TypeformButton
              formId={formIds.proposeProject}
              label="Propose a project"
            >
              lessgo <BsArrowUpRight aria-hidden="true" />
            </TypeformButton>
            <p className={styles.copy}>
              Ready to bring your project idea to life? Share it with us at
              iDEA!
            </p>
            <p className={styles.copy}>
              We're here to fuel innovation and empower talented creators like
              you. Our platform provides valuable resources and support to
              transform your concept into a remarkable reality.
            </p>
          </article>
          <span className={styles.divider} aria-hidden="true" />
          <article className={styles.action}>
            <h2 className={styles.heading} data-reveal={revealState}>
              Become a Member
            </h2>
            <p className={styles.copy}>
              Calling all dreamers, creators, and tech enthusiasts! Ready to
              turn your lightbulb moments into real-world wonders?
            </p>
            <p className={styles.copy}>
              As a member, you'll have the chance to enhance your professional
              profile and connect with like-minded peers. Become a part of iDEA
              today!
            </p>
            <TypeformButton
              formId={formIds.joinCommunity}
              label="Become an iDEA member"
            >
              lessgo <BsArrowUpRight aria-hidden="true" />
            </TypeformButton>
          </article>
        </div>
      </SectionShell>
    </PageShell>
  );
}
