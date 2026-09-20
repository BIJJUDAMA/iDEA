import isModifiedClick from "../utils/isModifiedClick";
import { sections, type SectionId } from "../config/sections";
import classNames from "../utils/classNames";
import { useReducedMotion, type Variants } from "motion/react";
import * as m from "motion/react-m";
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
  const reduceMotion = useReducedMotion();
  const currentIndex = sections.findIndex(({ id }) => id === activeSection);
  const itemVariants: Variants = {
    hidden: reduceMotion ? {} : { opacity: 0, x: -8 },
    visible: { opacity: 1, x: 0 },
  };
  return (
    <m.nav
      className={classNames(styles.rail, styles.chrome)}
      aria-label={label}
      data-visible={visible}
      aria-hidden={!visible}
      inert={!visible}
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
      variants={{
        hidden: reduceMotion ? {} : { opacity: 0, y: -8 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: reduceMotion ? 0 : 0.2,
            ease: "easeOut",
            staggerChildren: reduceMotion ? 0 : 0.035,
          },
        },
      }}
    >
      <p className={styles.progress}>
        {currentIndex + 1} of {sections.length}
      </p>
      <ul className={styles.railList}>
        {sections.map((section, index) => {
          const active = index === currentIndex;
          const completed = index < currentIndex;
          return (
            <m.li
              className={classNames(
                styles.railItem,
                completed && styles.completedItem,
                active && styles.currentItem,
              )}
              key={section.id}
              variants={itemVariants}
              transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
            >
              <m.a
                className={styles.railLink}
                href={`#${section.id}`}
                aria-current={active ? "location" : undefined}
                onClick={(event) => {
                  if (isModifiedClick(event)) return;
                  event.preventDefault();
                  onNavigate(section.id);
                }}
                {...(reduceMotion ? {} : { whileHover: { x: 4 } })}
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              >
                <span
                  className={classNames(styles.dot, active && styles.activeDot)}
                  aria-hidden="true"
                />
                <span className={styles.railLabel}>{section.label}</span>
              </m.a>
              {index < sections.length - 1 && (
                <span className={styles.connector} aria-hidden="true" />
              )}
            </m.li>
          );
        })}
      </ul>
    </m.nav>
  );
}
