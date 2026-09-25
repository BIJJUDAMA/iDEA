import type { TeamMember } from "../../../types/content";
import MemberCard from "./MemberCard";
import styles from "./TeamSection.module.css";

interface MemberGridProps {
  members: readonly TeamMember[];
  columns?: number;
}

export default function MemberGrid({ members, columns }: MemberGridProps) {
  return (
    <ul
      className={styles.members}
      data-columns={columns}
      style={
        columns
          ? ({ "--grid-cols": columns } as React.CSSProperties)
          : undefined
      }
    >
      {members.map((member) => (
        <li key={member.id} className={styles.memberItem}>
          <MemberCard member={member} />
        </li>
      ))}
    </ul>
  );
}
