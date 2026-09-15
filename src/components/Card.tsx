import type { HTMLAttributes, PropsWithChildren } from "react";
import styles from "./Card.module.css";

export default function Card({
  children,
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLElement>>) {
  return (
    <article
      className={[styles.card, className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </article>
  );
}
