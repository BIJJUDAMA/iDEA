import type { SectionId } from "../config/sections";
import styles from "./Navigation.module.css";
import SectionNavigation from "./SectionNavigation";
import SocialLinks from "./SocialLinks";

interface SectionHeaderProps {
  activeSection: SectionId;
  sectionId: SectionId;
  onNavigate: (section: SectionId) => void;
}

export default function SectionHeader({
  activeSection,
  sectionId,
  onNavigate,
}: SectionHeaderProps) {
  return (
    <header className={styles.header}>
      <SectionNavigation
        activeSection={activeSection}
        label={`Section navigation in ${sectionId}`}
        onNavigate={onNavigate}
      />
      <SocialLinks />
    </header>
  );
}
