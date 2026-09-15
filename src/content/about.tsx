import { useRef } from "react";
import { Page as Generic, SectionNavigation as Navbar } from "../components";
import useElementOnScreen from "../animations";
import about from "../data/about";
import { Socials } from "../components";
import type { SectionNavigationProps } from "../types/navigation";

const AboutPage = ({ isLight, onNavigate }: SectionNavigationProps) => {
  const ref = useRef<Element | null>(null);
  const setObservedElement = (element: Element | null) => {
    ref.current = element;
  };
  const onScreen = useElementOnScreen(ref);
  return (
    <>
      <Generic>
        <Navbar.TopContainer>
          <Navbar.Timeline
            activeSection="about"
            isLight={isLight}
            onNavigate={onNavigate}
          />
          <Socials isLight={isLight} />
        </Navbar.TopContainer>
        <Generic.InnerContainer>
          <Generic.Title
            ref={setObservedElement}
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
              ref={setObservedElement}
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
