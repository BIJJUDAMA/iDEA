import { useRef } from "react";
import { Page as Generic, SectionNavigation as Navbar } from "../components";
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
          <Navbar.Timeline
            activeSection="about"
            isLight={props.isLight}
            onNavigate={props.onNavigate}
          />
          <Socials isLight={props.isLight} />
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
