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
      <ul className={styles.railList}>
        {sections.map((section, index) => {
          const isActive = section.id === activeSection;
          return (
            <li className={styles.railItem} key={section.id}>
              {isActive ? (
                <span
                  className={classNames(styles.dot, styles.activeDot)}
                  role="img"
                  aria-current="page"
                  aria-label={`${section.label}, current section`}
                />
              ) : (
                <a
                  className={styles.dot}
                  href={`#${section.id}`}
                  aria-label={`Navigate to ${section.label}`}
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
                />
              )}
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
