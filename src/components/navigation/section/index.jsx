import { Fragment } from "react";
import { sections } from "../../../config/sections";
import {
  Circle,
  DarkIcon,
  IconContainer,
  LightIcon,
  SocialsText,
  SocialsTopLeft,
  SocialsTopLeftInnerContainer,
  Stick,
  TimelineBarLeft,
  TopContainer,
} from "./styles/section";

export default function SectionNavigation({ children }) {
  return children;
}

SectionNavigation.TopContainer = function SectionNavigationTopContainer({
  children,
  ...restProps
}) {
  return <TopContainer {...restProps}>{children}</TopContainer>;
};

SectionNavigation.Timeline = function SectionNavigationTimeline({
  activeSection,
  isLight,
  onNavigate,
}) {
  const accent = isLight ? "var(--accent-violet)" : "var(--accent-lime)";

  return (
    <TimelineBarLeft aria-label="Section navigation">
      {sections.map((section, index) => {
        const isActive = section.id === activeSection;
        return (
          <Fragment key={section.id}>
            <Circle
              as={isActive ? "span" : "button"}
              role={isActive ? "img" : undefined}
              type={isActive ? undefined : "button"}
              $size={isActive}
              aria-current={isActive ? "page" : undefined}
              aria-label={
                isActive
                  ? `${section.label}, current section`
                  : `Navigate to ${section.label}`
              }
              onClick={isActive ? undefined : () => onNavigate?.(section.id)}
              style={{ backgroundColor: accent }}
            />
            {index < sections.length - 1 && (
              <Stick style={{ borderColor: accent }} />
            )}
          </Fragment>
        );
      })}
    </TimelineBarLeft>
  );
};

SectionNavigation.SocialsTopLeft = function SocialsTopLeftContainer({
  children,
  ...restProps
}) {
  return <SocialsTopLeft {...restProps}>{children}</SocialsTopLeft>;
};

SectionNavigation.SocialsText = function SectionNavigationSocialsText({
  children,
  ...restProps
}) {
  return <SocialsText {...restProps}>{children}</SocialsText>;
};

SectionNavigation.SocialsTopLeftInnerContainer =
  function SocialsTopLeftInnerContainerComponent({ children, ...restProps }) {
    return (
      <SocialsTopLeftInnerContainer {...restProps}>
        {children}
      </SocialsTopLeftInnerContainer>
    );
  };

SectionNavigation.IconContainer = function SectionNavigationIconContainer({
  children,
  ...restProps
}) {
  return <IconContainer {...restProps}>{children}</IconContainer>;
};

SectionNavigation.LightIcon = function SectionNavigationLightIcon(restProps) {
  return <LightIcon {...restProps} />;
};

SectionNavigation.DarkIcon = function SectionNavigationDarkIcon(restProps) {
  return <DarkIcon {...restProps} />;
};
