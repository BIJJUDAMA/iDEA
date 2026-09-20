import BrandStar from "./BrandStar";
import isModifiedClick from "../utils/isModifiedClick";
import texts from "../data/texts";
import { sections, type SectionId } from "../config/sections";
import { ButtonLink } from "./Button";
import { useReducedMotion, type Variants } from "motion/react";
import * as m from "motion/react-m";
import styles from "./HeroNavigation.module.css";

interface HeroNavigationProps {
  onNavigate: (section: SectionId) => void;
}

export default function HeroNavigation({ onNavigate }: HeroNavigationProps) {
  const reduceMotion = useReducedMotion();
  const itemVariants: Variants = {
    hidden: reduceMotion ? {} : { opacity: 0.6, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.28, ease: "easeOut" },
    },
  };

  return (
    <m.div
      className={styles.heroContent}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: reduceMotion ? 0 : 0.045 },
        },
      }}
    >
      <m.p className={styles.kicker} variants={itemVariants}>
        {texts.home.kicker}
      </m.p>
      <m.span
        className={styles.brandBadge}
        aria-hidden="true"
        variants={itemVariants}
      >
        iDEA
      </m.span>
      <m.h1 className={styles.wordmark} id="hero-title" variants={itemVariants}>
        {texts.home.title}
      </m.h1>
      <m.p className={styles.tagline} variants={itemVariants}>
        {texts.home.tagline}
      </m.p>
      <m.p className={styles.description} variants={itemVariants}>
        {texts.home.description}
      </m.p>
      <m.nav
        className={styles.heroNav}
        aria-label="Primary navigation"
        variants={itemVariants}
      >
        <ul className={styles.destinations}>
          {sections
            .filter(({ id }) => id !== "home")
            .map((section) => {
              if (section.id === "contribute") {
                return (
                  <li key={section.id} className={styles.contributeLinks}>
                    <ButtonLink
                      href="https://github.com/IDEA-Amrita"
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub
                    </ButtonLink>
                    <ButtonLink
                      href={`#${section.id}`}
                      variant="primary"
                      onClick={(event) => {
                        if (isModifiedClick(event)) return;
                        event.preventDefault();
                        onNavigate(section.id);
                      }}
                    >
                      <BrandStar /> {section.label}
                    </ButtonLink>
                  </li>
                );
              }

              return (
                <li key={section.id}>
                  <ButtonLink
                    href={`#${section.id}`}
                    onClick={(event) => {
                      if (isModifiedClick(event)) return;
                      event.preventDefault();
                      onNavigate(section.id);
                    }}
                  >
                    {section.label}
                  </ButtonLink>
                </li>
              );
            })}
        </ul>
      </m.nav>
    </m.div>
  );
}
