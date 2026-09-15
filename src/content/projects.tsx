import { useRef, useState } from "react";
import { BsArrowUpRight } from "react-icons/bs";
import {
  AiFillInstagram,
  AiOutlineArrowUp,
  AiOutlineDoubleLeft,
  AiOutlineMail,
} from "react-icons/ai";
import { PopupButton } from "@typeform/embed-react";
import useElementOnScreen from "../animations";
import {
  Page as Generic,
  ProjectsSection as Projects,
  SectionNavigation as Navbar,
  Socials,
  TeamSection as Team,
} from "../components";
import projects, { type ProjectId } from "../data/projects";
import type { SectionId } from "../config/sections";
import type { ProjectTimeline } from "../types/content";

interface ProjectsPageProps {
  isLight: boolean;
  onNavigate: (section: SectionId) => void;
}

function formatMonth(value: `${number}-${number}`) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}-01T00:00:00Z`));
}

function formatTimeline(timeline: ProjectTimeline) {
  const end =
    timeline.status === "ongoing" ? "Present" : formatMonth(timeline.completed);
  return `${formatMonth(timeline.started)} - ${end}`;
}

function ProjectsPage({ isLight, onNavigate }: ProjectsPageProps) {
  const [activeProjectId, setActiveProjectId] =
    useState<ProjectId>("scheduler");
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLElement | null>(null);
  const onScreen = useElementOnScreen(ref);
  const activeProject =
    projects.find(({ id }) => id === activeProjectId) ?? projects[0];

  return (
    <Generic>
      <Navbar.TopContainer>
        <Navbar.Timeline
          activeSection="projects"
          isLight={isLight}
          onNavigate={onNavigate}
        />
        <Socials isLight={isLight} />
      </Navbar.TopContainer>
      <Projects
        style={{
          translate: onScreen ? "none" : "0 10rem",
          opacity: onScreen ? 1 : 0,
          transition: "1000ms ease-in-out",
        }}
      >
        <Projects.TimeLineContainer>
          <Team.TeamYears>2023-24</Team.TeamYears>
        </Projects.TimeLineContainer>
        <Projects.ProjectsContentContainer>
          <Projects.DescriptionContainer>
            <Projects.DescriptionHeader>
              <Projects.DescriptionHeaderImage
                label={`${activeProject.title} preview`}
                aspectRatio="4 / 3"
              />
              <Projects.DescriptionHeaderContent>
                <Projects.DescriptionTitle>
                  {activeProject.title}
                </Projects.DescriptionTitle>
                <Projects.ContributorName>
                  {`${activeProject.lead.name}, ${activeProject.lead.yearAndDepartment}`}
                </Projects.ContributorName>
                <Projects.Date>
                  {formatTimeline(activeProject.timeline)}
                </Projects.Date>
              </Projects.DescriptionHeaderContent>
            </Projects.DescriptionHeader>
            <Projects.DescriptionContent>
              <Projects.ProjectDescription>
                {activeProject.description}
              </Projects.ProjectDescription>
              {activeProject.frameworks.length > 0 && (
                <Projects.BuiltUsing>Built Using</Projects.BuiltUsing>
              )}
              <Projects.ProjectFrameworks>
                {activeProject.frameworks.join(", ")}
              </Projects.ProjectFrameworks>
              <Projects.TagBubbleContainer>
                {activeProject.tags.map((tag) => (
                  <Projects.TagBubble key={tag}>#{tag}</Projects.TagBubble>
                ))}
              </Projects.TagBubbleContainer>
              <PopupButton
                style={{
                  position: "absolute",
                  bottom: "5%",
                  left: "2%",
                  width: "auto",
                  height: "auto",
                  marginTop: "5%",
                  marginLeft: "4px",
                  padding: "10px 20px",
                  color: "var(--ink)",
                  backgroundColor: "var(--accent-lime)",
                  border: "1.5px solid var(--ink)",
                  borderRadius: "999px",
                  boxShadow: "2px 2px 0 var(--ink)",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
                id="BEDaiz9s"
              >
                ✱ Join <BsArrowUpRight />
              </PopupButton>
              <Projects.BlockButton
                type="button"
                aria-expanded={isOpen}
                aria-label="Show project contact options"
                onClick={() => {
                  setIsOpen((current) => !current);
                }}
              >
                <AiOutlineDoubleLeft
                  aria-hidden="true"
                  style={{
                    transition: "300ms ease-in-out",
                    transform: isOpen ? "rotate(-180deg)" : "rotate(0)",
                  }}
                />
              </Projects.BlockButton>
              {isOpen && (
                <div className="project-contact-links">
                  <a
                    href={`mailto:${activeProject.contacts.email.address}`}
                    aria-label={`Email ${activeProject.lead.name}`}
                  >
                    <AiOutlineMail aria-hidden="true" />
                  </a>
                  <a
                    href={activeProject.contacts.instagram.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${activeProject.lead.name} on Instagram`}
                  >
                    <AiFillInstagram aria-hidden="true" />
                  </a>
                </div>
              )}
            </Projects.DescriptionContent>
          </Projects.DescriptionContainer>
          <Projects.ProjectListContainer>
            <Projects.Title>Projects</Projects.Title>
            <Projects.SubTitle>
              The bread and butter of iDEA. Find more about our current and past
              projects.
            </Projects.SubTitle>
            <Projects.ListContainer>
              {projects.map((project) => {
                const isActive = project.id === activeProjectId;
                return (
                  <Projects.ListItem
                    key={project.id}
                    type="button"
                    onClick={() => {
                      setActiveProjectId(project.id);
                    }}
                  >
                    <Projects.ListItemArrowContainer
                      $color={isActive ? "var(--accent-violet)" : undefined}
                    >
                      <AiOutlineArrowUp
                        style={{
                          transition: "300ms ease-in-out",
                          transform: isActive
                            ? "rotate(135deg)"
                            : "rotate(-45deg)",
                          color: isActive ? "#fff" : "var(--ink-soft)",
                        }}
                      />
                    </Projects.ListItemArrowContainer>
                    <Projects.ListItemTitle
                      $color={
                        isActive ? "var(--accent-violet)" : "var(--ink-soft)"
                      }
                      style={{
                        opacity: isActive ? "1" : "0.55",
                        transition: "opacity 300ms ease-in-out",
                      }}
                    >
                      {project.title}
                    </Projects.ListItemTitle>
                  </Projects.ListItem>
                );
              })}
            </Projects.ListContainer>
          </Projects.ProjectListContainer>
        </Projects.ProjectsContentContainer>
      </Projects>
    </Generic>
  );
}

export default ProjectsPage;
