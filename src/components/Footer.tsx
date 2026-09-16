import texts from "../data/texts";
import BrandStar from "./BrandStar";
import {
  AiFillGithub,
  AiOutlineInstagram,
  AiOutlineMail,
  AiOutlineEnvironment,
  AiOutlinePhone,
  AiOutlineArrowUp,
} from "react-icons/ai";
import { clubContact, type ClubContact } from "../config/clubContact";
import { sections } from "../config/sections";
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
      <section className={styles.callout} aria-labelledby="footer-callout">
        <div>
          <p className={styles.calloutKicker}>{texts.footer.kicker}</p>
          <h2 className={styles.calloutTitle} id="footer-callout">
            {texts.footer.callout}
          </h2>
        </div>
        <ButtonLink href="#contribute" variant="primary">
          <BrandStar /> {texts.footer.join}
        </ButtonLink>
      </section>
      <div className={styles.content}>
        <div className={styles.brand}>
          <p className={styles.wordmark}>
            iDEA
            <BrandStar />
          </p>
          <p className={styles.description}>{texts.footer.description}</p>
        </div>
        <nav className={styles.explore} aria-label="Footer navigation">
          <p className={styles.heading}>{texts.footer.explore}</p>
          <ul className={styles.footerNav}>
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.contact}>
          <p className={styles.heading}>{texts.footer.findUs}</p>
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
          <p className={styles.heading}>{texts.footer.connect}</p>
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
        </nav>
      </div>
      <div className={styles.bottom}>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} iDEA · Amrita Vishwa Vidyapeetham
        </p>
        <ButtonLink href="#home" aria-label={texts.footer.backToTop}>
          {texts.footer.backToTop} <AiOutlineArrowUp aria-hidden="true" />
        </ButtonLink>
      </div>
    </footer>
  );
}
