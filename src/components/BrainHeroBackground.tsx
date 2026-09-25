import { memo, useEffect, useState } from "react";

const P = ["#5a4dff", "#059669", "#0284c7", "#e11d48"];

interface Props {
  isIntro?: boolean;
  onSync?: () => void;
  onComplete?: () => void;
}

function BrainHeroBackgroundComponent({
  isIntro = false,
  onSync,
  onComplete,
}: Props) {
  const [svg, setSvg] = useState("");
  const [col, setCol] = useState<string | null>(null);

  useEffect(() => {
    let ok = true;
    fetch("/brain.svg")
      .then((r) => r.text())
      .then((t) => {
        if (ok) setSvg(isIntro ? t.replace("<svg ", '<svg class="intro" ') : t);
      })
      .catch(() => {});
    return () => {
      ok = false;
    };
  }, [isIntro]);

  useEffect(() => {
    const done = () => {
      onSync?.();
      onComplete?.();
    };
    if (!isIntro) {
      done();
      return;
    }
    const t = setTimeout(done, 1850);
    return () => {
      clearTimeout(t);
    };
  }, [isIntro, onSync, onComplete]);

  return (
    <div
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
