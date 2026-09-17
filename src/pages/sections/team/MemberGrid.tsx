import type { TeamMember } from "../../../types/content";
import MemberCard from "./MemberCard";
import styles from "./TeamSection.module.css";

interface MemberGridProps {
  members: readonly TeamMember[];
}

export default function MemberGrid({ members }: MemberGridProps) {
  return (
    <ul className={styles.members}>
      {members.map((member) => (
        <li key={member.id}>
          <MemberCard member={member} />
        </li>
      ))}
    </ul>
  );
}
