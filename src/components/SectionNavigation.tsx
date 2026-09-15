import { Fragment } from "react";
import { sections, type SectionId } from "../config/sections";
import { RailConnector, SectionDot, SectionRail } from "./navigationStyles";

interface SectionNavigationProps {
  activeSection: SectionId;
  isLight: boolean;
  onNavigate: (section: SectionId) => void;
}

export default function SectionNavigation({
  activeSection,
  isLight,
  onNavigate,
}: SectionNavigationProps) {
  const accent = isLight ? "var(--accent-violet)" : "var(--accent-lime)";

  return (
    <SectionRail aria-label="Section navigation">
      {sections.map((section, index) => {
        const isActive = section.id === activeSection;
        return (
          <Fragment key={section.id}>
            <SectionDot
              as={isActive ? "span" : "button"}
              type={isActive ? undefined : "button"}
              role={isActive ? "img" : undefined}
              $size={isActive}
              aria-current={isActive ? "page" : undefined}
              aria-label={
                isActive
                  ? `${section.label}, current section`
                  : `Navigate to ${section.label}`
              }
              onClick={
                isActive
                  ? undefined
                  : () => {
                      onNavigate(section.id);
                    }
              }
              style={{ backgroundColor: accent }}
            />
            {index < sections.length - 1 && (
              <RailConnector style={{ borderColor: accent }} />
            )}
          </Fragment>
        );
      })}
    </SectionRail>
  );
}
