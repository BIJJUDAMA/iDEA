import {
  AiFillGithub,
  AiOutlineInstagram,
  AiOutlineMail,
} from "react-icons/ai";
import { socialLinks } from "../config/socialLinks";
import styles from "./Navigation.module.css";

export default function SocialLinks() {
  return (
    <div className={styles.socialPanel}>
      <a className={styles.brandName} href="#home" aria-label="iDEA home">
        iDEA
      </a>
      <div className={styles.socialLinks}>
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
