import styled from "styled-components";

export const ContributionContent = styled.div`
  height: 100%;
  margin-left: 10%;
  display: flex;
  flex-direction: column;
  overflow: hidden auto;

  * {
    box-sizing: border-box;
  }
`;

export const ActionColumns = styled.div`
  margin-top: 8%;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

export const ActionColumn = styled.article`
  height: auto;
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

export const ActionHeading = styled.h1`
  font-family: var(--font-sans);
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  color: var(--accent-violet);
  text-transform: lowercase;
  letter-spacing: -0.01em;
  cursor: pointer;

  @media (max-width: 1340px) {
    font-size: 26px;
  }
  @media (max-width: 1028px) {
    font-size: 24px;
  }
  @media (max-width: 900px) {
    font-size: 20px;
  }
  @media (max-width: 820px) {
    font-size: 18px;
  }
  @media (max-width: 654px) {
    font-size: 14px;
  }
`;

export const ResponsiveCopy = styled.p`
  max-width: 34rem;
  padding-inline: 1rem;
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 16px;
  line-height: 1.7em;
  text-align: center;
  letter-spacing: 0.01em;
  color: var(--ink-soft);

  @media (max-width: 1340px) {
    max-width: 28rem;
    font-size: 14px;
  }
  @media (max-width: 1076px) {
    max-width: 22rem;
    font-size: 13px;
  }
  @media (max-width: 654px) {
    max-width: 14rem;
    font-size: 12px;
  }

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

export const SectionDivider = styled.div`
  height: 80%;
  width: 1.5px;
  align-self: center;
  background-color: var(--accent-violet);
  opacity: 0.25;
  margin: 3% 0;
  transform: rotate(12deg);
`;
