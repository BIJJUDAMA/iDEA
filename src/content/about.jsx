import { useRef } from "react";
import { Page as Generic, SectionNavigation as Navbar } from "../components";
import { AiOutlineArrowUp } from "react-icons/ai";
import useElementOnScreen from "../animations";
import about from "../data/about.json";
import { Socials } from "../components";

const AboutPage = (props) => {
  const ref = useRef(null);
  const onScreen = useElementOnScreen(ref);
  return (
    <>
      <Generic>
        <Navbar.TopContainer>
          <Navbar.TimelineBarLeft>
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
              onClick={props.team}
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
          <Socials isLight={props.isLight} />
          <Navbar.TopTitle>
            {/* <AiOutlineArrowDown onClick={props.down} /> */}
            <AiOutlineArrowUp
              onClick={props.up}
              style={{ cursor: "pointer" }}
            />
          </Navbar.TopTitle>
        </Navbar.TopContainer>
        <Generic.InnerContainer>
          <Generic.Title
            ref={ref}
            style={{
              opacity: onScreen ? 1 : 0,
              translate: onScreen ? "none" : "0 2rem",
              transition: "1000ms ease-in-out",
            }}
          >
            About
          </Generic.Title>
          <Generic.ParagraphContainer>
            <Generic.Paragraph
              ref={ref}
              style={{
                opacity: onScreen ? 1 : 0,
                translate: onScreen ? "none" : "0 2rem",
                transition: "1000ms ease-in-out",
              }}
            >
              {about.content}
            </Generic.Paragraph>
          </Generic.ParagraphContainer>
        </Generic.InnerContainer>
        <Generic.Image label="Community illustration" aspectRatio="4 / 3" />
      </Generic>
    </>
  );
};

export default AboutPage;
