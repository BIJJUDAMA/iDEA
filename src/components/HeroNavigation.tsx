import texts from "../data/texts";
import { sections, type SectionId } from "../config/sections";
import { ButtonLink } from "./Button";
import styles from "./HeroNavigation.module.css";

interface HeroNavigationProps {
  onNavigate: (section: SectionId) => void;
}

export default function HeroNavigation({ onNavigate }: HeroNavigationProps) {
  return (
    <div className={styles.heroContent}>
      <h1 className={styles.wordmark} id="hero-title">
        {texts.home.title}
      </h1>
      <p className={styles.tagline}>{texts.home.tagline}</p>
      <nav aria-label="Primary navigation">
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
                        if (
                          event.metaKey ||
                          event.ctrlKey ||
                          event.shiftKey ||
                          event.altKey
                        )
                          return;
                        event.preventDefault();
                        onNavigate(section.id);
                      }}
                    >
                      ✱ {section.label}
                    </ButtonLink>
                  </li>
                );
              }

              return (
                <li key={section.id}>
                  <ButtonLink
                    href={`#${section.id}`}
                    onClick={(event) => {
                      if (
                        event.metaKey ||
                        event.ctrlKey ||
                        event.shiftKey ||
                        event.altKey
                      )
                        return;
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
