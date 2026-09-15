import { useRef, useState } from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import useElementOnScreen from "../animations";
import {
  Page as Generic,
  SectionNavigation as Navbar,
  Socials,
  TeamSection as Team,
} from "../components";
import { teamGroups, type TeamGroupId } from "../data/team";
import faculty from "../data/faculty";
import type { SectionId } from "../config/sections";

interface TeamPageProps {
  isLight: boolean;
  onNavigate: (section: SectionId) => void;
}

function TeamPage({ isLight, onNavigate }: TeamPageProps) {
  const [openTeam, setOpenTeam] = useState<TeamGroupId | null>(null);
  const ref = useRef<Element | null>(null);
  const setObservedElement = (element: Element | null) => {
    ref.current = element;
  };
  const onScreen = useElementOnScreen(ref);

  const revealStyle = {
    opacity: onScreen ? 1 : 0,
    translate: onScreen ? "none" : "0 2rem",
    transition: "600ms ease-in-out",
  } as const;

  const toggleTeam = (id: TeamGroupId) => {
    setOpenTeam((current) => (current === id ? null : id));
  };

  return (
    <Generic>
      <Navbar.TopContainer>
        <Navbar.Timeline
          activeSection="team"
          isLight={isLight}
          onNavigate={onNavigate}
        />
        <Socials isLight={isLight} />
      </Navbar.TopContainer>
      <Team>
        <Team.TeamYears ref={setObservedElement} style={revealStyle}>
          2023-24
        </Team.TeamYears>
        <div style={{ alignSelf: "flex-start" }}>
          <Team.Title ref={setObservedElement} style={revealStyle}>
            Core Team
          </Team.Title>
          <Team.Paragraph ref={setObservedElement} style={revealStyle}>
            Running a student organisation is a piece of cake. If you have{" "}
            <br />
            these people, that is!
          </Team.Paragraph>
        </div>
        <Team.MentorSectionContainer>
          <Team.MentorTitle>Faculty Mentors</Team.MentorTitle>
          <Team.MentorInnerContainer>
            {faculty.map((member) => (
              <Team.MentorOuterContainer key={member.id}>
                <Team.OtherTeamsSpecificInnerContainer>
                  <Team.OtherTeamsImage
                    src={member.photo}
                    alt={member.name}
                    style={{ ...revealStyle, objectFit: "cover" }}
                  />
                  <Team.UserInfoContainer>
                    <Team.SubTitle ref={setObservedElement} style={revealStyle}>
                      {member.name}
                    </Team.SubTitle>
                    <Team.Designation
                      ref={setObservedElement}
                      style={revealStyle}
                    >
                      {member.designation}
                    </Team.Designation>
                  </Team.UserInfoContainer>
                </Team.OtherTeamsSpecificInnerContainer>
                <Team.Line />
              </Team.MentorOuterContainer>
            ))}
          </Team.MentorInnerContainer>
        </Team.MentorSectionContainer>
      </Team>
      <Team.OtherTeamsContainer>
        <Team.ExpandableSectionContainer>
          {teamGroups.map((group) => {
            const isOpen = openTeam === group.id;
            const panelId = `team-${group.id}`;
            return (
              <div key={group.id} style={{ display: "contents" }}>
                <Team.ExpandableSection
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => {
                    toggleTeam(group.id);
                  }}
                >
                  <Team.ExpandableInnerContainer>
                    {group.label}
                    {isOpen ? <BsArrowUpRight /> : <BsArrowDownRight />}
                  </Team.ExpandableInnerContainer>
                </Team.ExpandableSection>
                <Team.TeamDropDownContainer $open={isOpen} id={panelId}>
                  {group.members.map((member) => (
                    <Team.OtherTeamsSpecificInnerContainer key={member.id}>
                      <Team.OtherTeamsImage
                        src={member.image}
                        alt={member.name}
                        style={{ ...revealStyle, objectFit: "cover" }}
                      />
                      <Team.UserInfoContainer>
                        <Team.SubTitle
                          ref={setObservedElement}
                          style={revealStyle}
                        >
                          {member.name}
                        </Team.SubTitle>
                        <Team.Designation
                          ref={setObservedElement}
                          style={revealStyle}
                        >
                          {member.designation}
                        </Team.Designation>
                      </Team.UserInfoContainer>
                    </Team.OtherTeamsSpecificInnerContainer>
                  ))}
                </Team.TeamDropDownContainer>
              </div>
            );
          })}
        </Team.ExpandableSectionContainer>
      </Team.OtherTeamsContainer>
    </Generic>
  );
}

export default TeamPage;
