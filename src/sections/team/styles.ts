import styled from "styled-components";
import ImagePlaceholder from "../../components/ImagePlaceholder";

/* CORE TEAM */

export const TeamOverview = styled.div`
  height: auto;
  width: 84%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 12%;
  margin-top: 8%;

  @media (max-width: 1288px) {
    margin-top: 10%;
  }
  @media (max-width: 1000px) {
    margin-top: 12%;
  }
  @media (max-width: 820px) {
    margin-top: 16%;
  }
  @media (max-width: 654px) {
    margin-top: 24%;
    flex-direction: column;
    gap: 1.5rem;
  }
`;

export const TeamTitle = styled.h1`
  font-family: var(--font-sans);
  font-style: normal;
  font-weight: 600;
  font-size: 48px;
  color: var(--accent-violet);
  text-transform: lowercase;
  letter-spacing: -0.015em;
  cursor: pointer;

  @media (max-width: 960px) {
    font-size: 36px;
  }
  @media (max-width: 820px) {
    font-size: 32px;
  }
  @media (max-width: 654px) {
    font-size: 24px;
  }
`;

export const TeamIntro = styled.p`
  font-family: var(--font-sans);
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 1.55em;
  letter-spacing: 0.01em;
  color: var(--ink-soft);
  cursor: pointer;

  @media (max-width: 960px) {
    font-size: 15px;
  }
  @media (max-width: 820px) {
    font-size: 13px;
  }
  @media (max-width: 654px) {
    font-size: 11px;
  }
`;

export const FacultySection = styled.section`
  height: auto;
  width: 44%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 654px) {
    width: 100%;
  }
`;

export const FacultyHeading = styled.h2`
  align-self: flex-start;
  font-family: var(--font-sans);
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
  cursor: pointer;

  @media (max-width: 960px) {
    font-size: 12px;
  }
  @media (max-width: 820px) {
    font-size: 11px;
  }
  @media (max-width: 654px) {
    font-size: 10px;
  }
`;

export const FacultyMember = styled.article`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 2%;
`;

export const FacultyGridLayout = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 2%;

  &:nth-child(1) {
    margin: 0 5% 0 0;
  }

  @media (max-width: 1364px) {
    flex-direction: column;
    margin: 0 0 2% 0;
  }
`;

export const MemberDetails = styled.div`
  height: 100%;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 2%;
`;

export const MemberName = styled.h3`
  position: relative;
  left: 4%;
  margin-bottom: 0 !important;
  font-family: var(--font-sans);
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  color: var(--ink) !important;

  @media (max-width: 820px) {
    font-size: 15px;
  }
  @media (max-width: 654px) {
    font-size: 12px;
  }
  @media (max-width: 540px) {
    font-size: 10px;
  }
`;

export const MemberRole = styled.p`
  position: relative;
  left: 4%;
  margin-right: 0 !important;
  margin-bottom: 0 !important;
  font-family: var(--font-sans);
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  color: var(--muted) !important;

  @media (max-width: 820px) {
    font-size: 12px;
  }
  @media (max-width: 654px) {
    font-size: 11px;
  }
  @media (max-width: 540px) {
    font-size: 10px;
  }
`;

export const AccordionList = styled.div`
  height: 100%;
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AccordionTrigger = styled.button`
  height: 12%;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 2%;
  background-color: var(--card-cream);
  border: 1.5px solid var(--ink);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-nb-sm);
  cursor: pointer;
  margin-bottom: 0.1%;
  transition:
    transform var(--dur-fast) var(--ease-out),
    box-shadow var(--dur-fast) var(--ease-out);

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: var(--shadow-nb-md);
  }

  &:active {
    transform: translate(2px, 2px);
    box-shadow: none;
  }
`;

export const MemberGridLayout = styled.div<{ $open: boolean }>`
  height: 24%;
  width: 100%;
  display: ${(props) => (props.$open ? "grid" : "none")};
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr;
  padding-right: 0 !important;
  background-color: var(--card-lavender);
  border: 1.5px solid var(--line);
  border-radius: var(--radius-sm);

  @media (max-width: 820px) {
    height: auto;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: auto;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
  * {
    margin-left: 5%;
  }
`;

export const AvatarPlaceholder = styled(ImagePlaceholder)`
  width: 56px;
  height: 56px;
  min-height: 56px;
  padding: 0;
  margin: 0 2% 0 0;
  border-radius: 50%;

  span {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
  }

  svg {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 820px) {
    width: 44px;
    height: 44px;
    min-height: 44px;
  }
  @media (max-width: 654px) {
    width: 32px;
    height: 32px;
    min-height: 32px;
  }
  @media (max-width: 540px) {
    width: 24px;
    height: 24px;
    min-height: 24px;
  }
`;

export const AccordionLabel = styled.span`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--ink);
`;

export const TeamDirectory = styled.div`
  height: 64%;
  width: 84%;
  display: flex;
  flex-direction: column;
  margin: 5% 0 0 12% !important;

  @media (max-width: 654px) {
    margin-top: 10%;
  }
`;

export const MemberCardLayout = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const MemberDivider = styled.div`
  height: 1px;
  width: 100%;
  background-color: var(--line);
  margin: 3% 0;
`;

export const AvatarImage = styled.img`
  height: 56px;
  width: 56px;
  border-radius: 50%;
  margin: 0 2% 0 0;
  border: 1px solid var(--line);
  object-fit: cover;

  @media (max-width: 820px) {
    height: 44px;
    width: 44px;
  }
  @media (max-width: 654px) {
    height: 32px;
    width: 32px;
  }
  @media (max-width: 540px) {
    height: 24px;
    width: 24px;
  }
`;

export const TermLabel = styled.p`
  position: absolute;
  right: 5%;
  top: 5%;
  font-family: var(--font-sans);
  font-weight: 500;
  font-style: normal;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
  cursor: pointer;

  &:hover {
    color: var(--accent-violet);
  }
`;
