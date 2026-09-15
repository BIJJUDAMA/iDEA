import { useRef } from "react";
import {
  AiFillGithub,
  AiOutlineInstagram,
  AiOutlineMail,
} from "react-icons/ai";
import useElementOnScreen from "../hooks/useElementOnScreen";
import styles from "./Navigation.module.css";

export default function SocialLinks() {
  const brandRef = useRef<HTMLParagraphElement>(null);
  const onScreen = useElementOnScreen(brandRef);
  const revealState = onScreen ? "visible" : "hidden";

  return (
    <div className={styles.socialPanel}>
      <p className={styles.brandName} ref={brandRef} data-reveal={revealState}>
        iDEA
      </p>
      <div className={styles.socialLinks} data-reveal={revealState}>
        <a
          className={styles.socialLink}
          href="mailto:ideatech@cb.amrita.edu"
          aria-label="Email iDEA"
        >
          <AiOutlineMail aria-hidden="true" />
        </a>
        <a
          className={styles.socialLink}
          href="https://www.instagram.com/idea_amrita/"
          target="_blank"
          rel="noreferrer"
          aria-label="iDEA on Instagram"
        >
          <AiOutlineInstagram aria-hidden="true" />
        </a>
        <a
          className={styles.socialLink}
          href="https://github.com/IDEA-Amrita"
          target="_blank"
          rel="noreferrer"
          aria-label="iDEA on GitHub"
        >
          <AiFillGithub aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
