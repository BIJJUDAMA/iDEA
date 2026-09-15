import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import styles from "./IconButton.module.css";

interface IconButtonProps extends PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement>
> {
  "aria-label": string;
}

export default function IconButton({
  children,
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      className={[styles.button, className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
