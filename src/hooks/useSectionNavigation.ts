import { useCallback, useEffect, useState } from "react";
import { sections, type SectionId } from "../config/sections";

function hashSection(): SectionId | undefined {
  return sections.find(({ id }) => `#${id}` === window.location.hash)?.id;
}

export default function useSectionNavigation() {
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const navigateTo = useCallback((id: SectionId, immediate = false) => {
    document.getElementById(id)?.scrollIntoView({
      block: "start",
      behavior:
        immediate ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
    });
  }, []);

  useEffect(() => {
    const update = () => {
      // The section crossing the upper third owns navigation even when expanded.
      let current: SectionId = "home";
      for (const { id } of sections) {
        const element = document.getElementById(id);
        if (
          element &&
          element.getBoundingClientRect().top <= window.innerHeight / 3
        )
          current = id;
      }
      setActiveSection(current);
      if (window.location.hash !== `#${current}`) {
        window.history.replaceState(window.history.state, "", `#${current}`);
      }
    };
    const restoreHash = () => {
      const id = hashSection();
      if (id) navigateTo(id, true);
    };
    restoreHash();
    update();
    const observer =
      typeof IntersectionObserver === "undefined"
        ? undefined
        : new IntersectionObserver(update, {
            threshold: [0, 0.25, 0.5, 0.75, 1],
          });
    for (const { id } of sections) {
      const element = document.getElementById(id);
      if (element) observer?.observe(element);
    }
    let frame = 0;
    const onScroll = () => {
      if (!frame)
        frame = window.requestAnimationFrame(() => {
          frame = 0;
          update();
        });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("hashchange", restoreHash);
    return () => {
      observer?.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("hashchange", restoreHash);
    };
  }, [navigateTo]);
  return { activeSection, navigateTo };
}
