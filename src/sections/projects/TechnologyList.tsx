import type { Project } from "../../types/content";
import styles from "./ProjectsSection.module.css";

interface TechnologyListProps {
  frameworks: Project["frameworks"];
  tags: Project["tags"];
}

export default function TechnologyList({
  frameworks,
  tags,
}: TechnologyListProps) {
  return (
    <>
      {frameworks.length > 0 && (
        <h3 className={styles.technologyHeading}>Built Using</h3>
      )}
      <p className={styles.technologyNames}>{frameworks.join(", ")}</p>
      <div className={styles.tags}>
        {tags.map((tag) => (
          <span className={styles.tag} key={tag}>
            #{tag}
          </span>
        ))}
      </div>
    </>
  );
}
