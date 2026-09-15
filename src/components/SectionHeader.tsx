import type { SectionId } from "../config/sections";
import { SectionHeaderFrame } from "./navigationStyles";
import SectionNavigation from "./SectionNavigation";
import SocialLinks from "./SocialLinks";

interface SectionHeaderProps {
  activeSection: SectionId;
  isLight: boolean;
  onNavigate: (section: SectionId) => void;
}

export default function SectionHeader({
  activeSection,
  isLight,
  onNavigate,
}: SectionHeaderProps) {
  return (
    <SectionHeaderFrame>
      <SectionNavigation
        activeSection={activeSection}
        isLight={isLight}
        onNavigate={onNavigate}
      />
      <SocialLinks isLight={isLight} />
    </SectionHeaderFrame>
  );
}
