import { useRef, useState } from "react";
import { Generic, Navbar, Team } from "../subcomponents";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import useElementOnScreen from "../animations";
import faculty from "../data/faculty.json";
import { Socials } from "../components";
import {
  HR,
  ideation,
  internal_dev,
  curation,
  management,
  advisors,
} from "../data/team.js";

const TeamPage = (props) => {
  const [openTeam, setOpenTeam] = useState(null);

  const handleClick = (id) => {
    setOpenTeam((current) => (current === id ? null : id));
  };

  const ref = useRef(null);
  const onScreen = useElementOnScreen(ref);
  return (
    <>
      <Generic>
        <Navbar.TopContainer>
          <Navbar.TimelineBarLeft>
            <Navbar.Circle
              onClick={props.about}
              style={{
                backgroundColor: props.isLight
                  ? "var(--accent-violet)"
                  : "var(--accent-lime)",
              }}
            />
            <Navbar.Stick
              style={{
                border: `1px solid ${
                  props.isLight ? "var(--accent-violet)" : "var(--accent-lime)"
                }`,
              }}
            />
            <Navbar.Circle
              style={{
                backgroundColor: props.isLight
                  ? "var(--accent-violet)"
                  : "var(--accent-lime)",
              }}
              onClick={props.roadmap}
            />
            <Navbar.Stick
              style={{
                border: `1px solid ${
                  props.isLight ? "var(--accent-violet)" : "var(--accent-lime)"
                }`,
              }}
            />
            <Navbar.Circle
              $size
              style={{
                backgroundColor: props.isLight
                  ? "var(--accent-violet)"
                  : "var(--accent-lime)",
              }}
            />
            <Navbar.Stick
              ref={ref}
              style={{
                width: onScreen ? "1%" : "0",
                translate: onScreen ? "none" : "0 10rem",
                transition: "1000ms ease-in-out",
                border: `1px solid ${
                  props.isLight ? "var(--accent-violet)" : "var(--accent-lime)"
                }`,
              }}
            />
            <Navbar.Circle
              onClick={props.projects}
              style={{
                backgroundColor: props.isLight
                  ? "var(--accent-violet)"
                  : "var(--accent-lime)",
              }}
            />
            <Navbar.Stick
              style={{
                border: `1px solid ${
                  props.isLight ? "var(--accent-violet)" : "var(--accent-lime)"
                }`,
              }}
            />
            <Navbar.Circle
              onClick={props.contribute}
              style={{
                backgroundColor: props.isLight
                  ? "var(--accent-violet)"
                  : "var(--accent-lime)",
              }}
            />
            <Navbar.Stick
              style={{
                border: `1px solid ${
                  props.isLight ? "var(--accent-violet)" : "var(--accent-lime)"
                }`,
              }}
            />
            <Navbar.Circle
              onClick={props.alumni}
              style={{
                backgroundColor: props.isLight
                  ? "var(--accent-violet)"
                  : "var(--accent-lime)",
              }}
            />
            <Navbar.Stick
              style={{
                border: `1px solid ${
                  props.isLight ? "var(--accent-violet)" : "var(--accent-lime)"
                }`,
              }}
            />
          </Navbar.TimelineBarLeft>
          <Socials />
          {/* <Navbar.TopTitle>
            <AiOutlineArrowDown onClick={props.down} />
            <AiOutlineArrowUp onClick={props.up} style={{cursor: "pointer"}}/>
          </Navbar.TopTitle> */}
        </Navbar.TopContainer>
        <Team>
          <Team.TeamYears
            ref={ref}
            style={{
              opacity: onScreen ? 1 : 0,
              translate: onScreen ? "none" : "0 2rem",
              transition: "600ms ease-in-out",
            }}
          >
            2023-24
          </Team.TeamYears>
          <div style={{ alignSelf: "flex-start" }}>
            <Team.Title
              ref={ref}
              style={{
                opacity: onScreen ? 1 : 0,
                translate: onScreen ? "none" : "0 2rem",
                transition: "600ms ease-in-out",
              }}
            >
              Core Team
            </Team.Title>
            <Team.Paragraph
              ref={ref}
              style={{
                opacity: onScreen ? 1 : 0,
                translate: onScreen ? "none" : "0 2rem",
                transition: "600ms ease-in-out",
              }}
            >
              Running a student organisation is a piece of cake. If you have{" "}
              <br /> these people, that is!
            </Team.Paragraph>
          </div>
          <Team.MentorSectionContainer>
            <Team.MentorTitle>Faculty Mentors</Team.MentorTitle>
            <Team.MentorInnerContainer>
              {faculty.map((item) => {
                return (
                  <Team.MentorOuterContainer key={item.name}>
                    <Team.OtherTeamsSpecificInnerContainer key={item.name}>
                      <Team.OtherTeamsImage
                        src={item.photo}
                        alt={item.name}
                        ref={ref}
                        style={{
                          opacity: onScreen ? 1 : 0,
                          translate: onScreen ? "none" : "0 2rem",
                          transition: "600ms ease-in-out",
                          objectFit: "cover",
                        }}
                      />
                      <Team.UserInfoContainer>
                        <Team.SubTitle
                          ref={ref}
                          style={{
                            opacity: onScreen ? 1 : 0,
                            translate: onScreen ? "none" : "0 2rem",
                            transition: "600ms ease-in-out",
                          }}
                        >
                          {item.name}
                        </Team.SubTitle>
                        <Team.Designation
                          ref={ref}
                          style={{
                            opacity: onScreen ? 1 : 0,
                            translate: onScreen ? "none" : "0 2rem",
                            transition: "600ms ease-in-out",
                          }}
                        >
                          {item.designation}
                        </Team.Designation>
                      </Team.UserInfoContainer>
                    </Team.OtherTeamsSpecificInnerContainer>
                    <Team.Line />
                  </Team.MentorOuterContainer>
                );
              })}
            </Team.MentorInnerContainer>
          </Team.MentorSectionContainer>
        </Team>
        <Team.OtherTeamsContainer>
          <Team.ExpandableSectionContainer>
            <Team.ExpandableSection
              type="button"

              aria-expanded={openTeam === "0"}

              aria-controls="team-0"

              onClick={(e) => {
                e.preventDefault();
                handleClick("0");
              }}
            >
              <Team.ExpandableInnerContainer>
                ADVISORS
                {openTeam === "0" ? <BsArrowUpRight /> : <BsArrowDownRight />}
              </Team.ExpandableInnerContainer>
            </Team.ExpandableSection>
            <Team.TeamDropDownContainer $open={openTeam === "0"} id="team-0">
              {advisors.map((item) => {
                return (
                  <Team.OtherTeamsSpecificInnerContainer key={item.name}>
                    <Team.OtherTeamsImage
                      src={item.image}
                      alt={item.name}
                      ref={ref}
                      style={{
                        opacity: onScreen ? 1 : 0,
                        translate: onScreen ? "none" : "0 2rem",
                        transition: "600ms ease-in-out",
                        objectFit: "cover",
                      }}
                    />
                    <Team.UserInfoContainer>
                      <Team.SubTitle
                        ref={ref}
                        style={{
                          opacity: onScreen ? 1 : 0,
                          translate: onScreen ? "none" : "0 2rem",
                          transition: "600ms ease-in-out",
                        }}
                      >
                        {item.name}
                      </Team.SubTitle>
                      <Team.Designation
                        ref={ref}
                        style={{
                          opacity: onScreen ? 1 : 0,
                          translate: onScreen ? "none" : "0 2rem",
                          transition: "600ms ease-in-out",
                        }}
                      >
                        {item.designation}
                      </Team.Designation>
                    </Team.UserInfoContainer>
                  </Team.OtherTeamsSpecificInnerContainer>
                );
              })}
            </Team.TeamDropDownContainer>
            <Team.ExpandableSection
              type="button"

              aria-expanded={openTeam === "1"}

              aria-controls="team-1"

              onClick={(e) => {
                e.preventDefault();
                handleClick("1");
              }}
            >
              <Team.ExpandableInnerContainer>
                MANAGEMENT & OUTREACH
                {openTeam === "1" ? <BsArrowUpRight /> : <BsArrowDownRight />}
              </Team.ExpandableInnerContainer>
            </Team.ExpandableSection>
            <Team.TeamDropDownContainer $open={openTeam === "1"} id="team-1">
              {management.map((item) => {
                return (
                  <Team.OtherTeamsSpecificInnerContainer key={item.name}>
                    <Team.OtherTeamsImage
                      src={item.image}
                      alt={item.name}
                      ref={ref}
                      style={{
                        opacity: onScreen ? 1 : 0,
                        translate: onScreen ? "none" : "0 2rem",
                        transition: "600ms ease-in-out",
                        objectFit: "cover",
                      }}
                    />
                    <Team.UserInfoContainer>
                      <Team.SubTitle
                        ref={ref}
                        style={{
                          opacity: onScreen ? 1 : 0,
                          translate: onScreen ? "none" : "0 2rem",
                          transition: "600ms ease-in-out",
                        }}
                      >
                        {item.name}
                      </Team.SubTitle>
                      <Team.Designation
                        ref={ref}
                        style={{
                          opacity: onScreen ? 1 : 0,
                          translate: onScreen ? "none" : "0 2rem",
                          transition: "600ms ease-in-out",
                        }}
                      >
                        {item.designation}
                      </Team.Designation>
                    </Team.UserInfoContainer>
                  </Team.OtherTeamsSpecificInnerContainer>
                );
              })}
            </Team.TeamDropDownContainer>
            <Team.ExpandableSection
              type="button"

              aria-expanded={openTeam === "2"}

              aria-controls="team-2"

              onClick={(e) => {
                e.preventDefault();
                handleClick("2");
              }}
            >
              <Team.ExpandableInnerContainer>
                IDEATION
                {openTeam === "2" ? <BsArrowUpRight /> : <BsArrowDownRight />}
              </Team.ExpandableInnerContainer>
            </Team.ExpandableSection>
            <Team.TeamDropDownContainer $open={openTeam === "2"} id="team-2">
              {ideation.map((item) => {
                return (
                  <Team.OtherTeamsSpecificInnerContainer key={item.name}>
                    <Team.OtherTeamsImage
                      src={item.image}
                      alt={item.name}
                      ref={ref}
                      style={{
                        opacity: onScreen ? 1 : 0,
                        translate: onScreen ? "none" : "0 2rem",
                        transition: "600ms ease-in-out",
                        objectFit: "cover",
                      }}
                    />
                    <Team.UserInfoContainer>
                      <Team.SubTitle
                        ref={ref}
                        style={{
                          opacity: onScreen ? 1 : 0,
                          translate: onScreen ? "none" : "0 2rem",
                          transition: "600ms ease-in-out",
                        }}
                      >
                        {item.name}
                      </Team.SubTitle>
                      <Team.Designation
                        ref={ref}
                        style={{
                          opacity: onScreen ? 1 : 0,
                          translate: onScreen ? "none" : "0 2rem",
                          transition: "600ms ease-in-out",
                        }}
                      >
                        {item.designation}
                      </Team.Designation>
                    </Team.UserInfoContainer>
                  </Team.OtherTeamsSpecificInnerContainer>
                );
              })}
            </Team.TeamDropDownContainer>
            <Team.ExpandableSection
              type="button"

              aria-expanded={openTeam === "3"}

              aria-controls="team-3"

              onClick={(e) => {
                e.preventDefault();
                handleClick("3");
              }}
            >
              <Team.ExpandableInnerContainer>
                INTERNAL DEVELOPMENT
                {openTeam === "3" ? <BsArrowUpRight /> : <BsArrowDownRight />}
              </Team.ExpandableInnerContainer>
            </Team.ExpandableSection>
            <Team.TeamDropDownContainer $open={openTeam === "3"} id="team-3">
              {internal_dev.map((item) => {
                return (
                  <Team.OtherTeamsSpecificInnerContainer key={item.name}>
                    <Team.OtherTeamsImage
                      src={item.image}
                      alt={item.name}
                      ref={ref}
                      style={{
                        opacity: onScreen ? 1 : 0,
                        translate: onScreen ? "none" : "0 2rem",
                        transition: "600ms ease-in-out",
                        objectFit: "cover",
                      }}
                    />
                    <Team.UserInfoContainer>
                      <Team.SubTitle
                        ref={ref}
                        style={{
                          opacity: onScreen ? 1 : 0,
                          translate: onScreen ? "none" : "0 2rem",
                          transition: "600ms ease-in-out",
                        }}
                      >
                        {item.name}
                      </Team.SubTitle>
                      <Team.Designation
                        ref={ref}
                        style={{
                          opacity: onScreen ? 1 : 0,
                          translate: onScreen ? "none" : "0 2rem",
                          transition: "600ms ease-in-out",
                        }}
                      >
                        {item.designation}
                      </Team.Designation>
                    </Team.UserInfoContainer>
                  </Team.OtherTeamsSpecificInnerContainer>
                );
              })}
            </Team.TeamDropDownContainer>
            <Team.ExpandableSection
              type="button"

              aria-expanded={openTeam === "4"}

              aria-controls="team-4"

              onClick={(e) => {
                e.preventDefault();
                handleClick("4");
              }}
            >
              <Team.ExpandableInnerContainer>
                HUMAN RESOURCES
                {openTeam === "4" ? <BsArrowUpRight /> : <BsArrowDownRight />}
              </Team.ExpandableInnerContainer>
            </Team.ExpandableSection>
            <Team.TeamDropDownContainer $open={openTeam === "4"} id="team-4">
              {HR.map((item) => {
                return (
                  <Team.OtherTeamsSpecificInnerContainer key={item.name}>
                    <Team.OtherTeamsImage
                      src={item.image}
                      alt={item.name}
                      ref={ref}
                      style={{
                        opacity: onScreen ? 1 : 0,
                        translate: onScreen ? "none" : "0 2rem",
                        transition: "600ms ease-in-out",
                        objectFit: "cover",
                      }}
                    />
                    <Team.UserInfoContainer>
                      <Team.SubTitle
                        ref={ref}
                        style={{
                          opacity: onScreen ? 1 : 0,
                          translate: onScreen ? "none" : "0 2rem",
                          transition: "600ms ease-in-out",
                        }}
                      >
                        {item.name}
                      </Team.SubTitle>
                      <Team.Designation
                        ref={ref}
                        style={{
                          opacity: onScreen ? 1 : 0,
                          translate: onScreen ? "none" : "0 2rem",
                          transition: "600ms ease-in-out",
                        }}
                      >
                        {item.designation}
                      </Team.Designation>
                    </Team.UserInfoContainer>
                  </Team.OtherTeamsSpecificInnerContainer>
                );
              })}
            </Team.TeamDropDownContainer>
            <Team.ExpandableSection
              type="button"

              aria-expanded={openTeam === "5"}

              aria-controls="team-5"

              onClick={(e) => {
                e.preventDefault();
                handleClick("5");
              }}
            >
              <Team.ExpandableInnerContainer>
                CURATION
                {openTeam === "5" ? <BsArrowUpRight /> : <BsArrowDownRight />}
              </Team.ExpandableInnerContainer>
            </Team.ExpandableSection>
            <Team.TeamDropDownContainer $open={openTeam === "5"} id="team-5">
              {curation.map((item) => {
                return (
                  <Team.OtherTeamsSpecificInnerContainer key={item.name}>
                    <Team.OtherTeamsImage
                      src={item.image}
                      alt={item.name}
                      ref={ref}
                      style={{
                        opacity: onScreen ? 1 : 0,
                        translate: onScreen ? "none" : "0 2rem",
                        transition: "600ms ease-in-out",
                        objectFit: "cover",
                      }}
                    />
                    <Team.UserInfoContainer>
                      <Team.SubTitle
                        ref={ref}
                        style={{
                          opacity: onScreen ? 1 : 0,
                          translate: onScreen ? "none" : "0 2rem",
                          transition: "600ms ease-in-out",
                        }}
                      >
                        {item.name}
                      </Team.SubTitle>
                      <Team.Designation
                        ref={ref}
                        style={{
                          opacity: onScreen ? 1 : 0,
                          translate: onScreen ? "none" : "0 2rem",
                          transition: "600ms ease-in-out",
                        }}
                      >
                        {item.designation}
                      </Team.Designation>
                    </Team.UserInfoContainer>
                  </Team.OtherTeamsSpecificInnerContainer>
                );
              })}
            </Team.TeamDropDownContainer>
          </Team.ExpandableSectionContainer>
        </Team.OtherTeamsContainer>
      </Generic>
    </>
  );
};

export default TeamPage;
