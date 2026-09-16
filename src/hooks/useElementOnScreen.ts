import { useEffect, useState, type RefObject } from "react";

export default function useElementOnScreen(
  ref: RefObject<Element | null>,
  rootMargin = "0px",
) {
  const [isIntersecting, setIsIntersecting] = useState(true);
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
    // Start readable for server rendering and observer-free environments.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsIntersecting(false);
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
