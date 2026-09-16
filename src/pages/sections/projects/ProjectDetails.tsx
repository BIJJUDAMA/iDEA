import { useState } from "react";
import { BsArrowUpRight } from "react-icons/bs";
import Card from "../../../components/Card";
import TypeformButton from "../../../components/TypeformButton";
import { formIds } from "../../../config/forms";
import type { Project } from "../../../types/content";
import ProjectContactActions from "./ProjectContactActions";
import ProjectMetadata from "./ProjectMetadata";
import styles from "./ProjectsSection.module.css";
import TechnologyList from "./TechnologyList";

interface ProjectDetailsProps {
  project: Project;
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  const [contactsOpen, setContactsOpen] = useState(false);

  return (
    <Card className={styles.detailsCard}>
      <ProjectMetadata project={project} />
      <div className={styles.detailsBody}>
        <p className={styles.summary}>{project.description}</p>
        <TechnologyList frameworks={project.frameworks} tags={project.tags} />
        <div className={styles.projectActions}>
          <TypeformButton
            formId={formIds.joinProject}
            label={`Join ${project.title}`}
            variant="compact"
          >
            Join this project <BsArrowUpRight aria-hidden="true" />
          </TypeformButton>
          <ProjectContactActions
            isOpen={contactsOpen}
            project={project}
            onToggle={() => {
              setContactsOpen((current) => !current);
            }}
          />
        </div>
      </div>
    </Card>
  );
}
