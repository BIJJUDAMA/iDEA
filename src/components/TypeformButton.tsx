import { PopupButton } from "@typeform/embed-react";
import type { PropsWithChildren } from "react";
import classNames from "../utils/classNames";
import styles from "./TypeformButton.module.css";

type ButtonVariant = "large" | "compact";

interface TypeformButtonProps extends PropsWithChildren {
  formId: string;
  variant?: ButtonVariant;
}

export default function TypeformButton({
  children,
  formId,
  variant = "large",
}: TypeformButtonProps) {
  return (
    <PopupButton
      className={classNames(styles.button, styles[variant])}
      id={formId}
    >
      {children}
    </PopupButton>
  );
}
