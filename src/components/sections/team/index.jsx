import {
  Container,
  Title,
  SubTitle,
  UserInfoContainer,
  Designation,
  OtherTeamsContainer,
  OtherTeamsSpecificInnerContainer,
  OtherTeamsImage,
  Line,
  TeamYears,
  Paragraph,
  MentorSectionContainer,
  MentorInnerContainer,
  MentorTitle,
  MentorOuterContainer,
  ExpandableSectionContainer,
  ExpandableSection,
  ExpandableInnerContainer,
  TeamDropDownContainer,
  OtherTeamsPlaceholder,
} from "./styles/team";

export default function Team({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

Team.Title = function TeamTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

Team.Paragraph = function TeamParagraph({ children, ...restProps }) {
  return <Paragraph {...restProps}>{children}</Paragraph>;
};

Team.MentorSectionContainer = function TeamMentorSectionContainer({
  children,
  ...restProps
}) {
  return (
    <MentorSectionContainer {...restProps}>{children}</MentorSectionContainer>
  );
};

Team.TeamDropDownContainer = function TeamTeamDropDownContainer({
  children,
  ...restProps
}) {
  return (
    <TeamDropDownContainer {...restProps}>{children}</TeamDropDownContainer>
  );
};

Team.MentorOuterContainer = function TeamMentorOuterContainer({
  children,
  ...restProps
}) {
  return <MentorOuterContainer {...restProps}>{children}</MentorOuterContainer>;
};

Team.MentorInnerContainer = function TeamMentorInnerContainer({
  children,
  ...restProps
}) {
  return <MentorInnerContainer {...restProps}>{children}</MentorInnerContainer>;
};

Team.MentorTitle = function TeamMentorTitle({ children, ...restProps }) {
  return <MentorTitle {...restProps}>{children}</MentorTitle>;
};

Team.ExpandableSectionContainer = function TeamExpandableSectionContainer({
  children,
  ...restProps
}) {
  return (
    <ExpandableSectionContainer {...restProps}>
      {children}
    </ExpandableSectionContainer>
  );
};

Team.ExpandableInnerContainer = function TeamExpandableInnerContainer({
  children,
  ...restProps
}) {
  return (
    <ExpandableInnerContainer {...restProps}>
      {children}
    </ExpandableInnerContainer>
  );
};

Team.ExpandableSection = function TeamExpandableSection({
  children,
  ...restProps
}) {
  return <ExpandableSection {...restProps}>{children}</ExpandableSection>;
};

Team.SubTitle = function TeamSubTitle({ children, ...restProps }) {
  return <SubTitle {...restProps}>{children}</SubTitle>;
};

Team.UserInfoContainer = function TeamUserInfoContainer({
  children,
  ...restProps
}) {
  return <UserInfoContainer {...restProps}>{children}</UserInfoContainer>;
};

Team.Designation = function TeamDesignation({ children, ...restProps }) {
  return <Designation {...restProps}>{children}</Designation>;
};

Team.OtherTeamsContainer = function TeamOtherTeamsContainer({
  children,
  ...restProps
}) {
  return <OtherTeamsContainer {...restProps}>{children}</OtherTeamsContainer>;
};

Team.OtherTeamsSpecificInnerContainer =
  function TeamOtherTeamsSpecificInnerContainer({ children, ...restProps }) {
    return (
      <OtherTeamsSpecificInnerContainer {...restProps}>
        {children}
      </OtherTeamsSpecificInnerContainer>
    );
  };

Team.OtherTeamsImage = function TeamOtherTeamsImage({
  src,
  alt = "Profile photo",
  ...restProps
}) {
  if (!src) {
    return (
      <OtherTeamsPlaceholder label={alt} aspectRatio="1 / 1" {...restProps} />
    );
  }

  return <OtherTeamsImage src={src} alt={alt} loading="lazy" {...restProps} />;
};

Team.Line = function TeamLine({ children, ...restProps }) {
  return <Line {...restProps}>{children}</Line>;
};

Team.TeamYears = function TeamTeamYears({ children, ...restProps }) {
  return <TeamYears {...restProps}>{children}</TeamYears>;
};
