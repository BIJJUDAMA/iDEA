import { useRef, useState } from "react";
import { PageShell, SectionShell } from "../../components/Layout";
import SectionHeader from "../../components/SectionHeader";
import type { SectionId } from "../../config/sections";
import projects, { type ProjectId } from "../../data/projects";
import useElementOnScreen from "../../hooks/useElementOnScreen";
import ProjectDetails from "./ProjectDetails";
import ProjectSelector from "./ProjectSelector";
import styles from "./ProjectsSection.module.css";

interface ProjectsSectionProps {
  onNavigate: (section: SectionId) => void;
}

export default function ProjectsSection({ onNavigate }: ProjectsSectionProps) {
  const [activeProjectId, setActiveProjectId] = useState<ProjectId>(
    projects[0].id,
  );
  const sectionRef = useRef<HTMLDivElement>(null);
  const onScreen = useElementOnScreen(sectionRef);
  const activeProject =
    projects.find(({ id }) => id === activeProjectId) ?? projects[0];

  return (
    <PageShell>
      <SectionHeader activeSection="projects" onNavigate={onNavigate} />
      <SectionShell className={styles.section} aria-labelledby="projects-title">
        <div
          className={styles.layout}
          ref={sectionRef}
          data-reveal={onScreen ? "visible" : "hidden"}
          data-reveal-distance="far"
        >
          <div className={styles.period}>
            <p className={styles.year}>2023-24</p>
          </div>
          <div className={styles.workspace}>
            <ProjectDetails key={activeProject.id} project={activeProject} />
            <ProjectSelector
              activeProjectId={activeProjectId}
              onSelect={setActiveProjectId}
              projects={projects}
            />
          </div>
        </div>
      </SectionShell>
    </PageShell>
  );
}
