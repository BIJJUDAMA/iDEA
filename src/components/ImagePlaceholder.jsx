import styled from "styled-components";

const Placeholder = styled.div`
  width: ${(props) => props.$width || "100%"};
  min-height: ${(props) => props.$height || "8rem"};
  aspect-ratio: ${(props) => props.$aspectRatio || "4 / 3"};
  display: grid;
  place-items: center;
  gap: 0.35rem;
  padding: 1rem;
  color: var(--muted);
  background: var(--card-grey);
  border: 1px dashed var(--muted);
  border-radius: var(--radius-md);
  text-align: center;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export default function ImagePlaceholder({
  label = "Image",
  aspectRatio = "4 / 3",
  width,
  height,
  className,
}) {
  return (
    <Placeholder
      className={className}
      role="img"
      aria-label={label}
      $aspectRatio={aspectRatio}
      $width={width}
      $height={height}
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
    </Placeholder>
  );
}
