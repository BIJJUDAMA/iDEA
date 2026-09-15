import styled from "styled-components";
import ImagePlaceholder from "./ImagePlaceholder";

export const PageViewport = styled.div`
  height: 100vh;
  width: auto;
  overflow: hidden auto;
`;

export const PrimaryContent = styled.div`
  height: 80%;
  width: 40%;
  margin-left: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 654px) {
    width: 82%;
    margin-left: 14%;
  }
`;

export const SectionTitle = styled.h1`
  align-self: flex-start;
  padding: 0 10%;
  font-family: var(--font-sans);
  font-style: normal;
  font-weight: 600;
  font-size: 64px;
  color: var(--accent-violet);
  text-transform: lowercase;
  letter-spacing: -0.015em;
  line-height: 1.05;
  cursor: pointer;

  @media (max-width: 820px) {
    font-size: 48px;
  }

  @media (max-width: 654px) {
    font-size: 36px;
  }
`;

export const FeatureImage = styled(ImagePlaceholder)`
  position: absolute;
  right: 0;
  bottom: 0;
  top: 0;
  height: 100%;
  width: 40%;
  object-fit: cover;
  object-position: center;
  border-radius: var(--radius-lg) 0 0 var(--radius-lg);

  @media (max-width: 654px) {
    display: none;
  }
`;

export const CopyColumn = styled.div`
  width: 80%;
  text-align: justify;
  height: auto;
`;

export const BodyCopy = styled.p`
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 18px;
  line-height: 1.6em;
  letter-spacing: 0.01em;
  color: var(--ink-soft);

  @media (max-width: 960px) {
    font-size: 16px;
  }

  @media (max-width: 820px) {
    font-size: 15px;
  }

  @media (max-width: 654px) {
    font-size: 13px;
  }
`;
