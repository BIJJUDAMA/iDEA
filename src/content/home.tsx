import styled from "styled-components";
import type { MouseEvent } from "react";

import { Navbar, SectionNavigation as Nav } from "../components";
import type { LandingSectionProps } from "../types/navigation";

const Container = styled.div<{ $isLight: boolean }>`
  height: 100vh;
  width: 100%;
  background-color: ${({ $isLight }) =>
    $isLight ? "var(--bg-soft)" : "#0e0e0e"};
  color: ${({ $isLight }) => ($isLight ? "var(--ink)" : "var(--bg-soft)")};
  position: relative;
`;

const Home = ({ isLight, setIsLight, onNavigate }: LandingSectionProps) => {
  const handleClick = (event: MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    setIsLight((current) => !current);
  };

  return (
    <>
      <Container $isLight={isLight}>
        <Navbar onNavigate={onNavigate} />
        <Nav.IconContainer
          style={{
            position: "absolute",
            top: "20px",
            right: "24px",
            margin: 0,
          }}
        >
          {isLight ? (
            <Nav.LightIcon onClick={handleClick} />
          ) : (
            <Nav.DarkIcon onClick={handleClick} />
          )}
        </Nav.IconContainer>
      </Container>
    </>
  );
};

export default Home;
