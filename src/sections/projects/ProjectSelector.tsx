import { AiOutlineArrowUp } from "react-icons/ai";
import type projectRecords from "../../data/projects";
import type { ProjectId } from "../../data/projects";
import {
  ProjectList,
  ProjectOption,
  ProjectOptionIcon,
  ProjectOptionTitle,
  SectionDescription,
  SectionTitle,
  SelectorPanel,
} from "./styles";

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
    <SelectorPanel>
      <SectionTitle>Projects</SectionTitle>
      <SectionDescription>
        The bread and butter of iDEA. Find more about our current and past
        projects.
      </SectionDescription>
      <ProjectList>
        {projects.map((project) => {
          const isSelected = project.id === activeProjectId;
          return (
            <ProjectOption
              key={project.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => {
                onSelect(project.id);
              }}
            >
              <ProjectOptionIcon
                $color={isSelected ? "var(--accent-violet)" : undefined}
              >
                <AiOutlineArrowUp
                  aria-hidden="true"
                  style={{
                    transition: "300ms ease-in-out",
                    transform: isSelected ? "rotate(135deg)" : "rotate(-45deg)",
                    color: isSelected ? "#fff" : "var(--ink-soft)",
                  }}
                />
              </ProjectOptionIcon>
              <ProjectOptionTitle
                $color={isSelected ? "var(--accent-violet)" : "var(--ink-soft)"}
                style={{
                  opacity: isSelected ? "1" : "0.55",
                  transition: "opacity 300ms ease-in-out",
                }}
              >
                {project.title}
              </ProjectOptionTitle>
            </ProjectOption>
          );
        })}
      </ProjectList>
    </SelectorPanel>
  );
}
