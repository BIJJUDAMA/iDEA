import { useEffect, useState, type RefObject } from "react";

export default function useElementOnScreen(
  ref: RefObject<Element | null>,
  rootMargin = "0px",
) {
  const [isIntersecting, setIsIntersecting] = useState(
    () =>
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(element);
    const reduceMotion = () => {
      if (media.matches) {
        setIsIntersecting(true);
        observer.disconnect();
      }
    };
    media.addEventListener("change", reduceMotion);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", reduceMotion);
    };
  }, [ref, rootMargin]);
  return isIntersecting;
}
