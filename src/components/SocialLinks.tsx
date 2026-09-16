import { useRef } from "react";
import {
  AiFillGithub,
  AiOutlineInstagram,
  AiOutlineMail,
} from "react-icons/ai";
import { socialLinks } from "../config/socialLinks";
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
        {socialLinks.map(({ id, label, href, external }) => {
          const Icon = {
            email: AiOutlineMail,
            instagram: AiOutlineInstagram,
            github: AiFillGithub,
          }[id];
          return (
            <a
              key={id}
              className={styles.socialLink}
              href={href}
              aria-label={label}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
            >
              <Icon aria-hidden="true" />
            </a>
          );
        })}
      </div>
    </div>
  );
}
