import styles from "./ImagePlaceholder.module.css";

export interface ImagePlaceholderProps {
  label?: string;
  aspectRatio?: "4 / 3" | "1 / 1";
  className?: string | undefined;
}

export default function ImagePlaceholder({
  label = "Image",
  aspectRatio = "4 / 3",
  className,
}: ImagePlaceholderProps) {
  const shape = aspectRatio === "1 / 1" ? styles.square : styles.landscape;
  return (
    <div
      className={[styles.placeholder, shape, className]
        .filter(Boolean)
        .join(" ")}
      role="img"
      aria-label={label}
    >
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
    </div>
  );
}
