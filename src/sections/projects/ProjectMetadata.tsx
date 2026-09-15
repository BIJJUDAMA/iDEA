import type { Project } from "../../types/content";
import {
  MetadataCopy,
  ProjectLead,
  ProjectMetadataLayout,
  ProjectPreview,
  ProjectTimeline,
  ProjectTitle,
} from "./styles";

function formatMonth(value: `${number}-${number}`) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}-01T00:00:00Z`));
}

function formatTimeline(project: Project) {
  const { timeline } = project;
  const end =
    timeline.status === "ongoing" ? "Present" : formatMonth(timeline.completed);
  return `${formatMonth(timeline.started)} - ${end}`;
}

interface ProjectMetadataProps {
  project: Project;
}

export default function ProjectMetadata({ project }: ProjectMetadataProps) {
  return (
    <ProjectMetadataLayout>
      <ProjectPreview label={`${project.title} preview`} aspectRatio="4 / 3" />
      <MetadataCopy>
        <ProjectTitle>{project.title}</ProjectTitle>
        <ProjectLead>
          {project.lead.name}, {project.lead.yearAndDepartment}
        </ProjectLead>
        <ProjectTimeline>{formatTimeline(project)}</ProjectTimeline>
      </MetadataCopy>
    </ProjectMetadataLayout>
  );
}
