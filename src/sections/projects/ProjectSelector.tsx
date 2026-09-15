import { AiOutlineArrowUp } from "react-icons/ai";
import type projectRecords from "../../data/projects";
import type { ProjectId } from "../../data/projects";
import classNames from "../../utils/classNames";
import styles from "./ProjectsSection.module.css";

interface ProjectSelectorProps {
  activeProjectId: ProjectId;
  onSelect: (projectId: ProjectId) => void;
  projects: typeof projectRecords;
}

export default function ProjectSelector({
  activeProjectId,
  onSelect,
  projects,
}: ProjectSelectorProps) {
  return (
    <aside className={styles.selector}>
      <h1 className={styles.sectionTitle} id="projects-title">
        Projects
      </h1>
      <p className={styles.sectionDescription}>
        The bread and butter of iDEA. Find more about our current and past
        projects.
      </p>
      <div className={styles.projectList}>
        {projects.map((project) => {
          const isSelected = project.id === activeProjectId;
          return (
            <button
              className={classNames(
                styles.projectOption,
                isSelected && styles.selected,
              )}
              key={project.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => {
                onSelect(project.id);
              }}
            >
              <span className={styles.optionIcon}>
                <AiOutlineArrowUp aria-hidden="true" />
              </span>
              <span className={styles.optionTitle}>{project.title}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
