import type { TeamMember } from "../../../types/content";
import MemberCard from "./MemberCard";
import styles from "./TeamSection.module.css";

interface MemberGridProps {
  members: readonly TeamMember[];
  revealState: "hidden" | "visible";
}

export default function MemberGrid({ members, revealState }: MemberGridProps) {
  return (
    <ul className={styles.members}>
      {members.map((member) => (
        <li key={member.id}>
          <MemberCard member={member} revealState={revealState} />
        </li>
      ))}
    </ul>
  );
}
