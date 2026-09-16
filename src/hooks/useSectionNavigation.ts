import { useCallback, useEffect, useState } from "react";
import { sections, type SectionId } from "../config/sections";

function hashSection(): SectionId | undefined {
  return sections.find(({ id }) => `#${id}` === window.location.hash)?.id;
}

export default function useSectionNavigation() {
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const navigateTo = useCallback((id: SectionId, immediate = false) => {
    if (!immediate) {
      const heading = document
        .getElementById(id)
        ?.querySelector<HTMLElement>("h1, h2");
      if (heading) {
        heading.tabIndex = -1;
        heading.focus({ preventScroll: true });
      }
    }
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
    const chromeHeight = () => {
      const navbar = document.querySelector<HTMLElement>("[data-navbar]");
      const rail = document.querySelector<HTMLElement>(
        'nav[aria-label="Section navigation"]',
      );
      const mobileRailHeight =
        rail && getComputedStyle(rail).position === "static"
          ? rail.offsetHeight
          : 0;
      return (navbar?.offsetHeight ?? 0) + mobileRailHeight;
    };
    const readingLine = () =>
      Math.max(window.innerHeight / 3, chromeHeight() + 1);
    const update = () => {
      // The section crossing the upper third owns navigation even when expanded.
      let current: SectionId = "home";
      for (const { id } of sections) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= readingLine())
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
    let observer: IntersectionObserver | undefined;
    const observeSections = () => {
      observer?.disconnect();
      if (typeof IntersectionObserver === "undefined") return;
      const topInset = chromeHeight();
      const bottomInset = Math.max(
        0,
        Math.floor(window.innerHeight - readingLine()),
      );
      // Observe the reading band below the navbar and compact mobile rail.
      observer = new IntersectionObserver(update, {
        rootMargin: `-${String(topInset)}px 0px -${String(bottomInset)}px 0px`,
        threshold: 0,
      });
      for (const { id } of sections) {
        const element = document.getElementById(id);
        if (element) observer.observe(element);
      }
    };
    const hero = document.getElementById("home");
    const updateHeroVisibility = () => {
      if (hero) setIsPastHero(hero.getBoundingClientRect().bottom <= 0);
    };
    const heroObserver =
      hero && typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(updateHeroVisibility, { threshold: 0 })
        : undefined;
    if (hero) heroObserver?.observe(hero);
    if (!heroObserver) updateHeroVisibility();
    observeSections();
    const onResize = () => {
      observeSections();
      update();
      updateHeroVisibility();
    };
    let frame = 0;
    let directionOrigin = window.scrollY;
    const onScroll = () => {
      if (!frame)
        frame = window.requestAnimationFrame(() => {
          frame = 0;
          const distance = window.scrollY - directionOrigin;
          if (Math.abs(distance) >= 8) {
            setIsScrollingDown(distance > 0);
            directionOrigin = window.scrollY;
          }
          update();
          updateHeroVisibility();
        });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("hashchange", restoreHash);
    return () => {
      observer?.disconnect();
      heroObserver?.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("hashchange", restoreHash);
    };
  }, [navigateTo]);
  return {
    activeSection,
    navigateTo,
    isPastHero,
    isNavbarVisible: isPastHero && !isScrollingDown,
  };
}
