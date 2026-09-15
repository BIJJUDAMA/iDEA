import { Fragment, type PropsWithChildren } from "react";
import { sections, type SectionId } from "../../../config/sections";
import * as navigationStyles from "./styles/section";

interface TimelineProps {
  activeSection: SectionId;
  isLight: boolean;
  onNavigate: (section: SectionId) => void;
}

function Timeline({ activeSection, isLight, onNavigate }: TimelineProps) {
  const accent = isLight ? "var(--accent-violet)" : "var(--accent-lime)";

  return (
    <navigationStyles.TimelineBarLeft aria-label="Section navigation">
      {sections.map((section, index) => {
        const isActive = section.id === activeSection;
        return (
          <Fragment key={section.id}>
            {isActive ? (
              <navigationStyles.Circle
                as="span"
                role="img"
                $size
                aria-current="page"
                aria-label={`${section.label}, current section`}
                style={{ backgroundColor: accent }}
              />
            ) : (
              <navigationStyles.Circle
                type="button"
                aria-label={`Navigate to ${section.label}`}
                onClick={() => {
                  onNavigate(section.id);
                }}
                style={{ backgroundColor: accent }}
              />
            )}
            {index < sections.length - 1 && (
              <navigationStyles.Stick style={{ borderColor: accent }} />
            )}
          </Fragment>
        );
      })}
    </navigationStyles.TimelineBarLeft>
  );
}

function SectionNavigation({ children }: PropsWithChildren) {
  return children;
}

const CompoundSectionNavigation = Object.assign(SectionNavigation, {
  TopContainer: navigationStyles.TopContainer,
  Timeline,
  SocialsTopLeft: navigationStyles.SocialsTopLeft,
  SocialsText: navigationStyles.SocialsText,
  SocialsTopLeftInnerContainer: navigationStyles.SocialsTopLeftInnerContainer,
  IconContainer: navigationStyles.IconContainer,
  LightIcon: navigationStyles.LightIcon,
  DarkIcon: navigationStyles.DarkIcon,
});

export default CompoundSectionNavigation;
