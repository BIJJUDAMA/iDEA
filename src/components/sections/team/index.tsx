import type { CSSProperties, ImgHTMLAttributes } from "react";
import * as teamStyles from "./styles/team";

interface TeamImageProps extends Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src"
> {
  src: string | null;
  alt?: string;
  style?: CSSProperties;
}

function TeamImage({
  src,
  alt = "Profile photo",
  className,
  style,
  ...imageProps
}: TeamImageProps) {
  if (!src) {
    return (
      <teamStyles.OtherTeamsPlaceholder
        label={alt}
        aspectRatio="1 / 1"
        className={className}
        style={style}
      />
    );
  }

  return (
    <teamStyles.OtherTeamsImage
      src={src}
      alt={alt}
      className={className}
      style={style}
      loading="lazy"
      {...imageProps}
    />
  );
}

const Team = Object.assign(teamStyles.Container, {
  Title: teamStyles.Title,
  Paragraph: teamStyles.Paragraph,
  MentorSectionContainer: teamStyles.MentorSectionContainer,
  TeamDropDownContainer: teamStyles.TeamDropDownContainer,
  MentorOuterContainer: teamStyles.MentorOuterContainer,
  MentorInnerContainer: teamStyles.MentorInnerContainer,
  MentorTitle: teamStyles.MentorTitle,
  ExpandableSectionContainer: teamStyles.ExpandableSectionContainer,
  ExpandableInnerContainer: teamStyles.ExpandableInnerContainer,
  ExpandableSection: teamStyles.ExpandableSection,
  SubTitle: teamStyles.SubTitle,
  UserInfoContainer: teamStyles.UserInfoContainer,
  Designation: teamStyles.Designation,
  OtherTeamsContainer: teamStyles.OtherTeamsContainer,
  OtherTeamsSpecificInnerContainer: teamStyles.OtherTeamsSpecificInnerContainer,
  OtherTeamsImage: TeamImage,
  Line: teamStyles.Line,
  TeamYears: teamStyles.TeamYears,
});

export default Team;
