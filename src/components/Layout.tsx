import type { HTMLAttributes, PropsWithChildren } from "react";
import styles from "./Layout.module.css";

export function PageShell({
  children,
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLElement>>) {
  return (
    <section
      className={[styles.page, className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </section>
  );
}

export function SectionShell({
  children,
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLElement>>) {
  return (
    <div
      className={[styles.section, className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}
