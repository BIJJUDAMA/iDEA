import type { Dispatch, SetStateAction } from "react";
import type { SectionId } from "../config/sections";

export interface SectionNavigationProps {
  isLight: boolean;
  onNavigate: (section: SectionId) => void;
}

export interface LandingSectionProps extends SectionNavigationProps {
  setIsLight: Dispatch<SetStateAction<boolean>>;
}
