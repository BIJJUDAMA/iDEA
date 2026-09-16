import type { SectionId } from "../config/sections";

export interface SectionNavigationProps {
  onNavigate: (section: SectionId) => void;
  activeSection?: SectionId;
}

export type LandingSectionProps = SectionNavigationProps;
