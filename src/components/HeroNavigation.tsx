import { Fragment, type CSSProperties } from "react";
import BrandStar from "./BrandStar";
import isModifiedClick from "../utils/isModifiedClick";
import texts from "../data/texts";
import { sections, type SectionId } from "../config/sections";
import { ButtonLink } from "./Button";
import styles from "./HeroNavigation.module.css";

interface Props {
  onNavigate: (section: SectionId) => void;
  stage?: "blank" | "wordmark" | "all";
}

const TITLE_LETTERS = texts.home.title.split("");

export default function HeroNavigation({
  onNavigate,
  stage = "all",
}: Props) {
  const isBlank = stage === "blank";

  return (
    <div
      className={[styles.heroContent, isBlank && styles.heroBlank]
        .filter(Boolean)
        .join(" ")}
    >
      <p className={styles.kicker}>{texts.home.kicker}</p>
      <h1
        className={styles.wordmark}
        id="hero-title"
        aria-label={texts.home.title}
      >
        <span className={styles.typewriter} aria-hidden="true">
          {TITLE_LETTERS.map((char, index) => (
            <span
              key={index}
              className={styles.char}
              style={{ "--char-i": index } as React.CSSProperties}
            >
              {char}
            </span>
          ))}
          <span className={styles.cursor} aria-hidden="true" />
        </span>
      </h1>
      <p className={styles.tagline}>{texts.home.tagline}</p>
      <p className={styles.description}>{texts.home.description}</p>
      <nav className={styles.heroNav} aria-label="Primary navigation">
        <ul className={styles.destinations}>
          {sections
            .filter(({ id }) => id !== "home")
            .map((section, idx) => {
              if (section.id === "contribute") {
                return (
                  <Fragment key={section.id}>
                    <li style={{ "--btn-i": idx } as CSSProperties}>
                      <ButtonLink
                        href="https://github.com/IDEA-Amrita"
                        target="_blank"
                        rel="noreferrer"
                      >
                        GitHub
                      </ButtonLink>
                    </li>
                    <li style={{ "--btn-i": idx + 1 } as CSSProperties}>
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
                  </Fragment>
                );
              }

              return (
                <li
                  key={section.id}
                  style={{ "--btn-i": idx } as CSSProperties}
                >
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
      </nav>
    </div>
  );
}
