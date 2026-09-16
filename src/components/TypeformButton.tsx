import {
  useEffect,
  useId,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import type { Widget } from "@typeform/embed";
import classNames from "../utils/classNames";
import styles from "./TypeformButton.module.css";

interface TypeformButtonProps extends PropsWithChildren {
  formId: string;
  label: string;
  variant?: "large" | "compact";
}

export default function TypeformButton({
  children,
  formId,
  label,
  variant = "large",
}: TypeformButtonProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("Loading form…");

  useEffect(() => {
    if (!open || !container.current) return;
    const target = container.current;
    let cancelled = false;
    let widget: Widget | undefined;
    const timer = window.setTimeout(() => {
      setStatus(
        "The form is taking longer than expected. You can open it directly using the link below.",
      );
    }, 10000);
    void import("../utils/loadTypeform")
      .then(({ createWidget }) => {
        if (cancelled) return;
        widget = createWidget(formId, {
          container: target,
          inlineOnMobile: true,
          autoFocus: false,
          iframeProps: { title: label },
          onReady: () => {
            if (cancelled) return;
            window.clearTimeout(timer);
            setStatus(
              "Form ready. Use Tab to enter the form, or open it directly below.",
            );
          },
        });
      })
      .catch(() => {
        window.clearTimeout(timer);
        if (!cancelled)
          setStatus(
            "The embedded form could not load. Please use the direct link below.",
          );
      });
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      widget?.unmount();
    };
  }, [open, formId, label]);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        aria-label={label}
        aria-haspopup="dialog"
        className={classNames(styles.button, styles[variant])}
        onClick={() => {
          setStatus("Loading form…");
          dialog.current?.showModal();
          setOpen(true);
        }}
      >
        {children}
      </button>
      <dialog
        ref={dialog}
        className={styles.dialog}
        aria-labelledby={titleId}
        onClose={() => {
          setOpen(false);
          trigger.current?.focus({ preventScroll: true });
        }}
      >
        <div className={styles.dialogHeader}>
          <h2 id={titleId}>{label}</h2>
          <button
            type="button"
            className={styles.close}
            aria-label={`Close ${label} form`}
            onClick={() => {
              dialog.current?.close();
            }}
          >
            Close
          </button>
        </div>
        <p role="status">{status}</p>
        <a
          href={`https://form.typeform.com/to/${formId}`}
          target="_blank"
          rel="noreferrer"
        >
          Open {label} form directly (new tab)
        </a>
        {open && <div ref={container} className={styles.embed} />}
      </dialog>
    </>
  );
}
