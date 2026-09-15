import type { CSSProperties } from "react";
import type { TeamMember } from "../../types/content";
import MemberCard from "./MemberCard";
import { MemberGridLayout } from "./styles";

interface MemberGridProps {
  isOpen: boolean;
  members: readonly TeamMember[];
  panelId: string;
  revealStyle: CSSProperties;
}

export default function MemberGrid({
  isOpen,
  members,
  panelId,
  revealStyle,
}: MemberGridProps) {
  return (
    <MemberGridLayout $open={isOpen} id={panelId}>
      {members.map((member) => (
        <MemberCard
          key={member.id}
          designation={member.designation}
          image={member.image}
          name={member.name}
          revealStyle={revealStyle}
        />
      ))}
    </MemberGridLayout>
  );
}
