import type { Ref } from "react";
import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { sections, type SectionId } from "../config/sections";
import styles from "./SectionTitle.module.css";

interface SectionTitleProps {
  sectionId: SectionId;
  children: string;
  id?: string;
  ref?: Ref<HTMLHeadingElement>;
}

export default function SectionTitle({
  sectionId,
  children,
  id,
  ref,
}: SectionTitleProps) {
  const reduceMotion = useReducedMotion();
  const position =
    sections.findIndex(({ id: section }) => section === sectionId) + 1;
  return (
    <m.div
      className={styles.composition}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeOut" }}
    >
      <p className={styles.eyebrow}>
        {String(position).padStart(2, "0")} /{" "}
        {String(sections.length).padStart(2, "0")} ·{" "}
        {sections[position - 1]?.label}
      </p>
      <h2 className={styles.title} id={id} ref={ref}>
        {children}
      </h2>
    </m.div>
  );
}
