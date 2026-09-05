import { useRef } from "react";
import { Navbar } from "../subcomponents";
import {
  AiOutlineInstagram,
  AiFillGithub,
  AiOutlineMail,
} from "react-icons/ai";
import { SocialsText } from "../subcomponents/navbar/styles/navbar";
import useElementOnScreen from "../animations";

const Socials = ({ isLight }) => {
  const ref = useRef(null);
  const onScreen = useElementOnScreen(ref);

  const bgColor = isLight ? "var(--card-lavender)" : "#1a1a2e";
  const textColor = isLight ? "var(--accent-violet)" : "var(--accent-lime)";
  const iconColor = isLight ? "var(--ink-soft)" : "#9090a0";

  return (
    <>
      <Navbar.SocialsTopLeft style={{ backgroundColor: bgColor }}>
        <SocialsText
          ref={ref}
          style={{
            opacity: onScreen ? 1 : 0,
            translate: onScreen ? "none" : "0 1.5rem",
            transition: "600ms ease-in-out",
            color: textColor,
          }}
        >
          iDEA
        </SocialsText>
        <Navbar.SocialsTopLeftInnerContainer
          ref={ref}
          style={{
            opacity: onScreen ? 1 : 0,
            translate: onScreen ? "none" : "0 1.5rem",
            transition: "700ms ease-in-out",
          }}
        >
          <a href="mailto:ideatech@cb.amrita.edu" aria-label="Email iDEA">
            <AiOutlineMail aria-hidden="true" style={{ color: iconColor }} />
          </a>
          <a
            href="https://www.instagram.com/idea_amrita/"
            target="_blank"
            rel="noreferrer"
            aria-label="iDEA on Instagram"
          >
            <AiOutlineInstagram
              aria-hidden="true"
              style={{ color: iconColor }}
            />
          </a>
          <a
            href="https://github.com/IDEA-Amrita"
            target="_blank"
            rel="noreferrer"
            aria-label="iDEA on GitHub"
          >
            <AiFillGithub aria-hidden="true" style={{ color: iconColor }} />
          </a>
        </Navbar.SocialsTopLeftInnerContainer>
      </Navbar.SocialsTopLeft>
    </>
  );
};

export default Socials;
