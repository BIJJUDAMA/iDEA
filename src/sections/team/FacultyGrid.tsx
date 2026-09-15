import type { CSSProperties } from "react";
import faculty from "../../data/faculty";
import MemberCard from "./MemberCard";
import {
  FacultyGridLayout,
  FacultyHeading,
  FacultyMember,
  FacultySection,
  MemberDivider,
} from "./styles";

interface FacultyGridProps {
  revealStyle: CSSProperties;
}

export default function FacultyGrid({ revealStyle }: FacultyGridProps) {
  return (
    <FacultySection aria-labelledby="faculty-heading">
      <FacultyHeading id="faculty-heading">Faculty Mentors</FacultyHeading>
      <FacultyGridLayout>
        {faculty.map((member) => (
          <FacultyMember key={member.id}>
            <MemberCard
              designation={member.designation}
              image={member.photo}
              name={member.name}
              revealStyle={revealStyle}
            />
            <MemberDivider />
          </FacultyMember>
        ))}
      </FacultyGridLayout>
    </FacultySection>
  );
}
