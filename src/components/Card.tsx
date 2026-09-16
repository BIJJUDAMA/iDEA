import type { HTMLAttributes, PropsWithChildren } from "react";
import classNames from "../utils/classNames";
import styles from "./Card.module.css";

export default function Card({
  children,
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLElement>>) {
  return (
    <article className={classNames(styles.card, className)} {...props}>
      {children}
    </article>
  );
}
