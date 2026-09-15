import type { PropsWithChildren } from "react";
import { PopupButton } from "@typeform/embed-react";
import styled, { css } from "styled-components";

type ButtonVariant = "large" | "compact";

const StyledPopupButton = styled(PopupButton)<{ $variant: ButtonVariant }>`
  color: var(--ink);
  background-color: var(--accent-lime);
  border: 1.5px solid var(--ink);
  border-radius: var(--radius-pill);
  box-shadow: var(--shadow-nb-sm);
  font-family: var(--font-sans);
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  ${({ $variant }) =>
    $variant === "large"
      ? css`
          width: 240px;
          height: 64px;
        `
      : css`
          position: absolute;
          bottom: 5%;
          left: 2%;
          width: auto;
          height: auto;
          margin-top: 5%;
          margin-left: 4px;
          padding: 10px 20px;
        `}
`;

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
    <StyledPopupButton id={formId} $variant={variant}>
      {children}
    </StyledPopupButton>
  );
}
