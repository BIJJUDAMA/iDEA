import { useRef } from "react";
import {
  Page as Generic,
  ProjectsSection as Projects,
  SectionNavigation as Navbar,
} from "../components";
import { BsArrowUpRight } from "react-icons/bs";
import useElementOnScreen from "../animations";
import { PopupButton } from "@typeform/embed-react";
import { Socials } from "../components";
import type { SectionNavigationProps } from "../types/navigation";

const ContributePage = ({ isLight, onNavigate }: SectionNavigationProps) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const onScreen = useElementOnScreen(ref);
  return (
    <>
      <Generic>
        <Navbar.TopContainer>
          <Navbar.Timeline
            activeSection="contribute"
            isLight={isLight}
            onNavigate={onNavigate}
          />
          <Socials isLight={isLight} />
        </Navbar.TopContainer>
        <Projects>
          <Projects.BlockContainer>
            <Projects.BlockInnerContainer>
              <Projects.BlockTitle
                ref={ref}
                style={{
                  opacity: onScreen ? 1 : 0,
                  translate: onScreen ? "none" : "0 2rem",
                  transition: "1000ms ease-in-out",
                }}
              >
                Submit an Exciting Project Idea
              </Projects.BlockTitle>
              <PopupButton
                style={{
                  width: "240px",
                  height: "64px",
                  color: "var(--ink)",
                  backgroundColor: "var(--accent-lime)",
                  border: "1.5px solid var(--ink)",
                  borderRadius: "999px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "2px 2px 0 var(--ink)",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                }}
                id="Csq4ijcx"
              >
                lessgo <BsArrowUpRight style={{ marginLeft: "4%" }} />
              </PopupButton>
              <Projects.Paragraph style={{ textAlign: "center" }}>
                Ready to bring your project idea to life?
                <br />
                Share it with us at iDEA!
              </Projects.Paragraph>
              <Projects.Paragraph style={{ textAlign: "center" }}>
                We're here to fuel innovation and empower talented creators like
                you.
                <br />
                Our platform provides valuable resources and support to
                transform
                <br />
                your concept into a remarkable reality.
              </Projects.Paragraph>
            </Projects.BlockInnerContainer>
            <Projects.BlockInnerContainer>
              <Projects.AngledLine />
            </Projects.BlockInnerContainer>
            <Projects.BlockInnerContainer>
              <Projects.Paragraph
                style={{ textAlign: "center", fontStyle: "bold" }}
              >
                Calling all dreamers, creators, and tech enthusiasts!
                <br /> Ready to turn your lightbulb moments into real-world
                wonders?
              </Projects.Paragraph>
              <Projects.Paragraph
                style={{ textAlign: "center", fontStyle: "bold" }}
              >
                As a member, you'll have the chance to enhance your professional
                profile
                <br /> and connect with like-minded peers
                <br /> Become a part of iDEA today!
              </Projects.Paragraph>
              <PopupButton
                style={{
                  width: "240px",
                  height: "64px",
                  color: "var(--ink)",
                  backgroundColor: "var(--accent-lime)",
                  border: "1.5px solid var(--ink)",
                  borderRadius: "999px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "2px 2px 0 var(--ink)",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                }}
                id="KS9VXRHf"
              >
                lessgo <BsArrowUpRight style={{ marginLeft: "4%" }} />
              </PopupButton>
              <Projects.BlockTitle
                ref={ref}
                style={{
                  opacity: onScreen ? 1 : 0,
                  translate: onScreen ? "none" : "0 2rem",
                  transition: "1000ms ease-in-out",
                }}
              >
                Become a Member
              </Projects.BlockTitle>
            </Projects.BlockInnerContainer>
          </Projects.BlockContainer>
        </Projects>
      </Generic>
    </>
  );
};

export default ContributePage;
