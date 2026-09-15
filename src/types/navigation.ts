import type { Dispatch, SetStateAction } from "react";
import type { SectionId } from "../config/sections";

export interface SectionNavigationProps {
  onNavigate: (section: SectionId) => void;
}

export interface LandingSectionProps extends SectionNavigationProps {
  isLight: boolean;
  setIsLight: Dispatch<SetStateAction<boolean>>;
}
