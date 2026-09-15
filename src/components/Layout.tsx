import type { HTMLAttributes, PropsWithChildren } from "react";
import styles from "./Layout.module.css";

export function PageShell({
  children,
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={[styles.page, className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

export function SectionShell({
  children,
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLElement>>) {
  return (
    <section
      className={[styles.section, className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </section>
  );
}
