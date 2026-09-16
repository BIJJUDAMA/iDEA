import {
  AiFillGithub,
  AiOutlineInstagram,
  AiOutlineMail,
  AiOutlineEnvironment,
  AiOutlinePhone,
  AiOutlineArrowUp,
} from "react-icons/ai";
import { clubContact, type ClubContact } from "../config/clubContact";
import { socialLinks } from "../config/socialLinks";
import { ButtonLink } from "./Button";
import styles from "./Footer.module.css";

export default function Footer({
  contact = clubContact,
}: {
  contact?: ClubContact;
}) {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.brand}>
          <p className={styles.wordmark}>
            iDEA<span className={styles.brandDot}>✱</span>
          </p>
          <p className={styles.description}>
            Student community at Amrita Vishwa Vidyapeetham, Coimbatore.
          </p>
        </div>
        <div className={styles.contact}>
          <h2 className={styles.heading}>Find us</h2>
          <address className={styles.address}>
            <div className={styles.contactRow}>
              <AiOutlineEnvironment aria-hidden="true" />
              <span>
                {contact.institution}
                <br />
                {contact.location}
              </span>
            </div>
            <a className={styles.contactRow} href={`mailto:${contact.email}`}>
              <AiOutlineMail aria-hidden="true" />
              <span>{contact.email}</span>
            </a>
            {contact.phone && (
              <a
                className={styles.contactRow}
                href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
              >
                <AiOutlinePhone aria-hidden="true" />
                <span>{contact.phone}</span>
              </a>
            )}
          </address>
        </div>
        <nav className={styles.connect} aria-label="Footer social links">
          <h2 className={styles.heading}>Connect</h2>
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
          <a className={styles.joinLink} href="#contribute">
            Join the community →
          </a>
        </nav>
      </div>
      <div className={styles.bottom}>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} iDEA · Amrita Vishwa Vidyapeetham
        </p>
        <ButtonLink href="#home" aria-label="Back to top">
          Back to top <AiOutlineArrowUp aria-hidden="true" />
        </ButtonLink>
      </div>
    </footer>
  );
}
