import type { SectionId } from "../config/sections";
import styles from "./Navigation.module.css";
import SectionNavigation from "./SectionNavigation";
import SocialLinks from "./SocialLinks";

interface SectionHeaderProps {
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
}

export default function SectionHeader({
  activeSection,
  onNavigate,
}: SectionHeaderProps) {
  return (
    <header className={styles.header}>
      <SectionNavigation
        activeSection={activeSection}
        onNavigate={onNavigate}
      />
      <SocialLinks />
    </header>
  );
}
