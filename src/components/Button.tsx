import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  PropsWithChildren,
} from "react";
import classNames from "../utils/classNames";
import styles from "./Button.module.css";

type ButtonVariant = "default" | "primary";

function buttonClassName(variant: ButtonVariant, className?: string) {
  return classNames(
    styles.button,
    variant === "primary" && styles.primary,
    className,
  );
}

interface ButtonProps extends PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement>
> {
  variant?: ButtonVariant;
}

export function Button({
  children,
  className,
  variant = "default",
  ...props
}: ButtonProps) {
  return (
    <button className={buttonClassName(variant, className)} {...props}>
      {children}
    </button>
  );
}

interface ButtonLinkProps extends PropsWithChildren<
  AnchorHTMLAttributes<HTMLAnchorElement>
> {
  variant?: ButtonVariant;
}

export function ButtonLink({
  children,
  className,
  variant = "default",
  ...props
}: ButtonLinkProps) {
  return (
    <a className={buttonClassName(variant, className)} {...props}>
      {children}
    </a>
  );
}
