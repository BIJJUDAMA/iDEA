import type { TeamMember } from "../../types/content";
import classNames from "../../utils/classNames";
import MemberCard from "./MemberCard";
import styles from "./TeamSection.module.css";

interface MemberGridProps {
  isOpen: boolean;
  members: readonly TeamMember[];
  panelId: string;
  revealState: "hidden" | "visible";
}

export default function MemberGrid({
  isOpen,
  members,
  panelId,
  revealState,
}: MemberGridProps) {
  return (
    <div
      className={classNames(styles.memberGrid, isOpen && styles.memberGridOpen)}
      id={panelId}
      role="region"
      aria-labelledby={`${panelId}-trigger`}
      hidden={!isOpen}
    >
      <ul className={styles.members}>
        {members.map((member) => (
          <li key={member.id}>
            <MemberCard
              designation={member.designation}
              image={member.image}
              name={member.name}
              revealState={revealState}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
