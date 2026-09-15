import { useRef, useState } from "react";
import useElementOnScreen from "../../hooks/useElementOnScreen";
import { PageViewport } from "../../components/pageStyles";
import SectionHeader from "../../components/SectionHeader";
import type { SectionId } from "../../config/sections";
import projects, { type ProjectId } from "../../data/projects";
import ProjectDetails from "./ProjectDetails";
import ProjectSelector from "./ProjectSelector";
import {
  ProjectPeriod,
  ProjectsLayout,
  ProjectWorkspace,
  ProjectYear,
} from "./styles";

interface ProjectsSectionProps {
  isLight: boolean;
  onNavigate: (section: SectionId) => void;
}

export default function ProjectsSection({
  isLight,
  onNavigate,
}: ProjectsSectionProps) {
  const [activeProjectId, setActiveProjectId] = useState<ProjectId>(
    projects[0].id,
  );
  const sectionRef = useRef<HTMLDivElement>(null);
  const onScreen = useElementOnScreen(sectionRef);
  const activeProject =
    projects.find(({ id }) => id === activeProjectId) ?? projects[0];

  return (
    <PageViewport>
      <SectionHeader
        activeSection="projects"
        isLight={isLight}
        onNavigate={onNavigate}
      />
      <ProjectsLayout
        ref={sectionRef}
        style={{
          translate: onScreen ? "none" : "0 10rem",
          opacity: onScreen ? 1 : 0,
          transition: "1000ms ease-in-out",
        }}
      >
        <ProjectPeriod>
          <ProjectYear>2023-24</ProjectYear>
        </ProjectPeriod>
        <ProjectWorkspace>
          <ProjectDetails key={activeProject.id} project={activeProject} />
          <ProjectSelector
            activeProjectId={activeProjectId}
            onSelect={setActiveProjectId}
            projects={projects}
          />
        </ProjectWorkspace>
      </ProjectsLayout>
    </PageViewport>
  );
}
