import { sections, type SectionId } from "../config/sections";
import classNames from "../utils/classNames";
import styles from "./Navigation.module.css";

interface SidebarProps {
  activeSection: SectionId;
  visible?: boolean;
  label?: string;
  onNavigate: (section: SectionId) => void;
}

export default function Sidebar({
  activeSection,
  visible = true,
  label = "Section navigation",
  onNavigate,
}: SidebarProps) {
  const currentIndex = sections.findIndex(({ id }) => id === activeSection);
  return (
    <nav
      className={classNames(styles.rail, styles.chrome)}
      aria-label={label}
      data-visible={visible}
      aria-hidden={!visible}
      inert={!visible}
    >
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
