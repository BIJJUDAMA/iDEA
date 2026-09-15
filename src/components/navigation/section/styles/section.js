import styled from "styled-components";
import { BsSun } from "react-icons/bs";
import { MdOutlineDarkMode } from "react-icons/md";

export const TopContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: auto;
  height: auto;
`;

export const SocialsTopLeft = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  background-color: ${(props) =>
    props.$backgroundColor || "var(--card-lavender)"};
  display: flex;
  align-items: center;
  flex-direction: row;
  height: auto;
  width: 24%;
  padding: 1em;
  border-right: 1.5px solid var(--ink);
  border-bottom: 1.5px solid var(--ink);
  border-bottom-right-radius: var(--radius-md);

  @media (max-width: 820px) {
    width: 60%;
    height: 10%;
  }
`;

export const SocialsText = styled.p`
  color: ${(props) => props.$mainColor || "var(--accent-violet)"};
  width: 50%;
  margin: 0;
  padding: 0;
  font-size: 32px;
  font-family: var(--font-sans);
  font-weight: 700;
  letter-spacing: -0.02em;

  @media (max-width: 820px) {
    font-size: 24px;
  }
`;

export const TimelineBarLeft = styled.nav`
  position: absolute;
  left: 4%;
  top: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20%;
  height: 100%;
  width: auto;
`;

export const Circle = styled.button`
  width: ${(props) => (props.$size ? "3rem" : "2rem")};
  height: ${(props) => (props.$size ? "3rem" : "2rem")};
  border-radius: 50%;
  padding: 0;
  background-color: ${(props) =>
    props.$backgroundColor || "var(--accent-violet)"};
  border: 1.5px solid var(--ink);
  opacity: ${(props) => (props.$size ? "1" : "0.6")};
  cursor: ${(props) => (props.$size ? "default" : "pointer")};
  transition:
    transform var(--dur-fast) var(--ease-out),
    box-shadow var(--dur-fast) var(--ease-out);

  &:is(button):hover {
    transform: translate(-1px, -1px);
    box-shadow: var(--shadow-nb-sm);
    opacity: 1;
  }

  @media (max-width: 820px) {
    width: ${(props) => (props.$size ? "3rem" : "2rem")};
    height: ${(props) => (props.$size ? "3rem" : "2rem")};
  }

  @media (max-width: 654px) {
    width: ${(props) => (props.$size ? "2rem" : "1rem")};
    height: ${(props) => (props.$size ? "2rem" : "1rem")};
  }
`;

export const Stick = styled.div`
  margin: 0;
  height: 16%;
  width: 1%;
  border-left: 1.5px solid var(--accent-violet);
  opacity: 0.4;

  @media (max-width: 820px) {
    height: 20%;
  }

  @media (max-width: 654px) {
    height: 24%;
  }
`;

export const SocialsTopLeftInnerContainer = styled.div`
  width: 50%;
  float: right;
  display: flex;
  flex-direction: row;
  margin-left: 10%;
  justify-content: space-evenly;
  align-items: center;

  * {
    font-size: 20px;
    cursor: pointer;
    color: var(--ink-soft);
    transition: color var(--dur-fast) var(--ease-out);

    &:hover {
      color: var(--accent-violet);
    }
  }
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 3%;
`;

export const LightIcon = styled(MdOutlineDarkMode)`
  width: 30px;
  height: 30px;
  cursor: pointer;
  color: var(--ink-soft);
  transition: color var(--dur-fast) var(--ease-out);

  &:hover {
    color: var(--accent-violet);
  }

  @media (max-width: 654px) {
    width: 20px;
    height: 20px;
  }
`;

export const DarkIcon = styled(BsSun)`
  width: 30px;
  height: 30px;
  cursor: pointer;
  color: var(--accent-lime);
  transition: color var(--dur-fast) var(--ease-out);

  &:hover {
    color: var(--accent-lime-deep);
  }

  @media (max-width: 654px) {
    width: 20px;
    height: 20px;
  }
`;
