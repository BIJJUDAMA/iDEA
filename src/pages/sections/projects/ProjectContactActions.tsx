import { AiFillInstagram, AiOutlineMail } from "react-icons/ai";
import { Button } from "../../../components/Button";
import type { Project } from "../../../types/content";
import classNames from "../../../utils/classNames";
import styles from "./ProjectsSection.module.css";

interface ProjectContactActionsProps {
  isOpen: boolean;
  onToggle: () => void;
  project: Project;
}

export default function ProjectContactActions({
  isOpen,
  onToggle,
  project,
}: ProjectContactActionsProps) {
  return (
    <>
      <Button
        type="button"
        aria-expanded={isOpen}
        aria-label={
          isOpen
            ? "Hide project contact options"
            : "Show project contact options"
        }
        onClick={onToggle}
      >
        {isOpen ? "Hide contacts" : "Contact team"}
      </Button>
      {isOpen && (
        <div
          className={classNames("project-contact-links", styles.contactLinks)}
        >
          <a
            className={styles.contactLink}
            href={`mailto:${project.contacts.email.address}`}
            aria-label={`Email ${project.lead.name}`}
          >
            <AiOutlineMail aria-hidden="true" />
          </a>
          <a
            className={styles.contactLink}
            href={project.contacts.instagram.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.lead.name} on Instagram`}
          >
            <AiFillInstagram aria-hidden="true" />
          </a>
        </div>
      )}
    </>
  );
}
