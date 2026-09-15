import { Fragment } from "react";
import { sections, type SectionId } from "../config/sections";
import { Button, ButtonLink } from "./Button";
import styles from "./HeroNavigation.module.css";

interface HeroNavigationProps {
  onNavigate: (section: SectionId) => void;
}

export default function HeroNavigation({ onNavigate }: HeroNavigationProps) {
  return (
    <div className={styles.heroContent}>
      <h1 className={styles.wordmark} id="hero-title">
        iDEA
      </h1>
      <p className={styles.tagline}>watch your ideas come to life.</p>
      <nav className={styles.destinations} aria-label="Primary navigation">
        {sections
          .filter(({ id }) => id !== "home")
          .map((section) => {
            if (section.id === "contribute") {
              return (
                <Fragment key={section.id}>
                  <ButtonLink
                    href="https://github.com/IDEA-Amrita"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </ButtonLink>
                  <Button
                    type="button"
                    variant="primary"
                    onClick={() => {
                      onNavigate(section.id);
                    }}
                  >
                    ✱ {section.label}
                  </Button>
                </Fragment>
              );
            }

            return (
              <Button
                key={section.id}
                type="button"
                onClick={() => {
                  onNavigate(section.id);
                }}
              >
                {section.label}
              </Button>
            );
          })}
      </nav>
    </div>
  );
}
