import { Fragment } from "react";
import { sections, type SectionId } from "../config/sections";
import classNames from "../utils/classNames";
import styles from "./Navigation.module.css";

interface SectionNavigationProps {
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
}

export default function SectionNavigation({
  activeSection,
  onNavigate,
}: SectionNavigationProps) {
  return (
    <nav className={styles.rail} aria-label="Section navigation">
      {sections.map((section, index) => {
        const isActive = section.id === activeSection;
        return (
          <Fragment key={section.id}>
            {isActive ? (
              <span
                className={classNames(styles.dot, styles.activeDot)}
                role="img"
                aria-current="page"
                aria-label={`${section.label}, current section`}
              />
            ) : (
              <button
                className={styles.dot}
                type="button"
                aria-label={`Navigate to ${section.label}`}
                onClick={() => {
                  onNavigate(section.id);
                }}
              />
            )}
            {index < sections.length - 1 && (
              <span className={styles.connector} aria-hidden="true" />
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
