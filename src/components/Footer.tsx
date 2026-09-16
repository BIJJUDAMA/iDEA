import { socialLinks } from "../config/socialLinks";
import { ButtonLink } from "./Button";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div>
          <p className={styles.wordmark}>iDEA</p>
          <p className={styles.description}>
            Student community at Amrita Vishwa Vidyapeetham, Coimbatore
          </p>
        </div>
        <nav className={styles.links} aria-label="Footer social links">
          {socialLinks.map(({ id, label, href, external }) => (
            <a
              key={id}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} iDEA · Amrita Vishwa Vidyapeetham
        </p>
        <ButtonLink href="#home" aria-label="Back to top">
          Back to top ↑
        </ButtonLink>
      </div>
    </footer>
  );
}
