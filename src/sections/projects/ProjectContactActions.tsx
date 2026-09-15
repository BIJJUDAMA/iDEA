import {
  AiFillInstagram,
  AiOutlineDoubleLeft,
  AiOutlineMail,
} from "react-icons/ai";
import type { Project } from "../../types/content";
import { ContactToggle } from "./styles";

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
      <ContactToggle
        type="button"
        aria-expanded={isOpen}
        aria-label="Show project contact options"
        onClick={onToggle}
      >
        <AiOutlineDoubleLeft
          aria-hidden="true"
          style={{
            transition: "300ms ease-in-out",
            transform: isOpen ? "rotate(-180deg)" : "rotate(0)",
          }}
        />
      </ContactToggle>
      {isOpen && (
        <div className="project-contact-links">
          <a
            href={`mailto:${project.contacts.email.address}`}
            aria-label={`Email ${project.lead.name}`}
          >
            <AiOutlineMail aria-hidden="true" />
          </a>
          <a
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
