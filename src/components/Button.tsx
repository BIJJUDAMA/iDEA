import type { PropsWithChildren } from "react";
import { useReducedMotion, type HTMLMotionProps } from "motion/react";
import * as m from "motion/react-m";
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

type ButtonProps = PropsWithChildren<HTMLMotionProps<"button">> & {
  variant?: ButtonVariant;
};

export function Button({
  children,
  className,
  variant = "default",
  ...props
}: ButtonProps) {
  const reduceMotion = useReducedMotion();
  return (
    <m.button
      className={buttonClassName(variant, className)}
      {...(reduceMotion
        ? {}
        : {
            whileHover: { y: -1 },
            whileTap: { scale: 0.98, y: 1 },
          })}
      transition={{ type: "spring", stiffness: 500, damping: 32 }}
      {...props}
    >
      {children}
    </m.button>
  );
}

type ButtonLinkProps = PropsWithChildren<HTMLMotionProps<"a">> & {
  variant?: ButtonVariant;
};

export function ButtonLink({
  children,
  className,
  variant = "default",
  ...props
}: ButtonLinkProps) {
  const reduceMotion = useReducedMotion();
  return (
    <m.a
      className={buttonClassName(variant, className)}
      {...(reduceMotion
        ? {}
        : {
            whileHover: { y: -1 },
            whileTap: { scale: 0.98, y: 1 },
          })}
      transition={{ type: "spring", stiffness: 500, damping: 32 }}
      {...props}
    >
      {children}
    </m.a>
  );
}
