import classNames from "../utils/classNames";
import styles from "./ImagePlaceholder.module.css";

export interface ImagePlaceholderProps {
  label?: string;
  variant?: "sketch" | "brand";
  glyph?: string;
  aspectRatio?: "4 / 3" | "1 / 1";
  className?: string | undefined;
}

export default function ImagePlaceholder({
  label = "Image",
  variant = "sketch",
  glyph = "iDEA",
  aspectRatio = "4 / 3",
  className,
}: ImagePlaceholderProps) {
  const shape = aspectRatio === "1 / 1" ? styles.square : styles.landscape;
  return (
    <div
      className={classNames(
        styles.placeholder,
        shape,
        variant === "brand" && styles.brand,
        className,
      )}
      role="img"
      aria-label={label}
    >
      {variant === "brand" ? (
        <span className={styles.glyph} aria-hidden="true">
          {glyph}
        </span>
      ) : (
        <>
          <svg
            aria-hidden="true"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <circle cx="9" cy="10" r="2" />
            <path d="m4 17 4-4 3 3 3-3 6 6" />
          </svg>
          <span>{label}</span>
        </>
      )}
    </div>
  );
}
