import type { CSSProperties } from "react";
import {
  AvatarImage,
  AvatarPlaceholder,
  MemberCardLayout,
  MemberDetails,
  MemberName,
  MemberRole,
} from "./styles";

interface MemberCardProps {
  designation: string;
  image: string | null;
  name: string;
  revealStyle: CSSProperties;
}

export default function MemberCard({
  designation,
  image,
  name,
  revealStyle,
}: MemberCardProps) {
  return (
    <MemberCardLayout>
      {image ? (
        <AvatarImage
          src={image}
          alt={name}
          style={revealStyle}
          loading="lazy"
        />
      ) : (
        <AvatarPlaceholder
          label={`${name} profile photo unavailable`}
          aspectRatio="1 / 1"
          style={revealStyle}
        />
      )}
      <MemberDetails>
        <MemberName style={revealStyle}>{name}</MemberName>
        <MemberRole style={revealStyle}>{designation}</MemberRole>
      </MemberDetails>
    </MemberCardLayout>
  );
}
