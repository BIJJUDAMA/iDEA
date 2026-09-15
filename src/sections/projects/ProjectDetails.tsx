import { useState } from "react";
import { BsArrowUpRight } from "react-icons/bs";
import TypeformButton from "../../components/TypeformButton";
import { formIds } from "../../config/forms";
import type { Project } from "../../types/content";
import ProjectContactActions from "./ProjectContactActions";
import ProjectMetadata from "./ProjectMetadata";
import TechnologyList from "./TechnologyList";
import { DetailsBody, DetailsCard, ProjectSummary } from "./styles";

interface ProjectDetailsProps {
  project: Project;
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  const [contactsOpen, setContactsOpen] = useState(false);

  return (
    <DetailsCard>
      <ProjectMetadata project={project} />
      <DetailsBody>
        <ProjectSummary>{project.description}</ProjectSummary>
        <TechnologyList frameworks={project.frameworks} tags={project.tags} />
        <TypeformButton formId={formIds.joinProject} variant="compact">
          ✱ Join <BsArrowUpRight aria-hidden="true" />
        </TypeformButton>
        <ProjectContactActions
          isOpen={contactsOpen}
          project={project}
          onToggle={() => {
            setContactsOpen((current) => !current);
          }}
        />
      </DetailsBody>
    </DetailsCard>
  );
}
