import { memo, useEffect, useRef, useState } from "react";

const P = ["#5a4dff", "#059669", "#0284c7", "#e11d48"];

interface Props {
  onSync?: () => void;
  onComplete?: () => void;
}

function BrainHeroBackgroundComponent({ onSync, onComplete }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState("");
  const [col, setCol] = useState<string | null>(null);
  const isIntro = import.meta.env.MODE !== "test";

  useEffect(() => {
    let ok = true;
    fetch("/brain.svg")
      .then((r) => r.text())
      .then((t) => {
        if (ok) {
          setSvg(t);
        }
      })
      .catch(() => {});
    return () => {
      ok = false;
    };
  }, []);

  useEffect(() => {
    if (!isIntro) {
      onSync?.();
      onComplete?.();
      return;
    }

    const t = setTimeout(() => {
      onSync?.();
      onComplete?.();
    }, 1850);

    return () => {
      clearTimeout(t);
    };
  }, [isIntro, onSync, onComplete]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      onClick={() => {
        setCol((p) => P[(P.indexOf(p ?? "") + 1) % P.length] ?? P[0] ?? null);
      }}
      style={
        col ? ({ "--bc": col, "--bn": col } as React.CSSProperties) : undefined
      }
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

const BrainHeroBackground = memo(BrainHeroBackgroundComponent);
export default BrainHeroBackground;
