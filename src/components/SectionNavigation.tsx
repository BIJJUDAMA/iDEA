import { sections, type SectionId } from "../config/sections";
import classNames from "../utils/classNames";
import styles from "./Navigation.module.css";

interface SectionNavigationProps {
  activeSection: SectionId;
  label?: string;
  onNavigate: (section: SectionId) => void;
}

export default function SectionNavigation({
  activeSection,
  label = "Section navigation",
  onNavigate,
}: SectionNavigationProps) {
  const currentIndex = sections.findIndex(({ id }) => id === activeSection);
  return (
    <nav className={styles.rail} aria-label={label}>
      <p className={styles.progress}>
        {currentIndex + 1} of {sections.length}
      </p>
      <ul className={styles.railList}>
        {sections.map((section, index) => {
          const active = index === currentIndex;
          const completed = index < currentIndex;
          return (
            <li
              className={classNames(
                styles.railItem,
                completed && styles.completedItem,
                active && styles.currentItem,
              )}
              key={section.id}
            >
              <a
                className={styles.railLink}
                href={`#${section.id}`}
                aria-current={active ? "location" : undefined}
                onClick={(event) => {
                  if (
                    event.metaKey ||
                    event.ctrlKey ||
                    event.shiftKey ||
                    event.altKey
                  )
                    return;
                  event.preventDefault();
                  onNavigate(section.id);
                }}
              >
                <span
                  className={classNames(styles.dot, active && styles.activeDot)}
                  aria-hidden="true"
                />
                <span className={styles.railLabel}>{section.label}</span>
              </a>
              {index < sections.length - 1 && (
                <span className={styles.connector} aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
