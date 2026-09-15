import { useEffect, useState, type RefObject } from "react";

export default function useElementOnScreen(
  ref: RefObject<Element | null>,
  rootMargin = "0px",
) {
  const [isIntersecting, setIsIntersecting] = useState(true);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin },
    );
    const element = ref.current;
    if (element) {
      observer.observe(element);
    }
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [ref, rootMargin]);
  return isIntersecting;
}
