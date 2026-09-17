import texts from "../data/texts";
import BrandStar from "./BrandStar";
import { AiOutlineArrowUp } from "react-icons/ai";
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
          <ul className={styles.footerList}>
            {sections.map((section) => (
              <li key={section.id}>
                <a className={styles.footerLink} href={`#${section.id}`}>
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.contact}>
          <p className={styles.heading}>{texts.footer.findUs}</p>
          <address className={styles.address}>
            <ul className={styles.footerList}>
              <li>
                <p className={styles.contactText}>
                  {contact.institution}
                  <br />
                  {contact.location}
                </p>
              </li>
              <li>
                <a
                  className={styles.footerLink}
                  href={`mailto:${contact.email}`}
                >
                  {contact.email}
                </a>
              </li>
              {contact.phone && (
                <li>
                  <a
                    className={styles.footerLink}
                    href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
                  >
                    {contact.phone}
                  </a>
                </li>
              )}
            </ul>
          </address>
        </div>
        <nav className={styles.connect} aria-label="Footer social links">
          <p className={styles.heading}>{texts.footer.connect}</p>
          <ul className={styles.footerList}>
            {socialLinks
              .filter(({ id }) => id !== "email")
              .map(({ id, label, href, external }) => (
                <li key={id}>
                  <a
                    className={styles.footerLink}
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                  >
                    {label} <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
          </ul>
        </nav>
      </div>
      <div className={styles.bottom}>
        <a
          className={styles.backToTop}
          href="#home"
          aria-label={texts.footer.backToTop}
        >
          {texts.footer.backToTop} <AiOutlineArrowUp aria-hidden="true" />
        </a>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} iDEA · Amrita Vishwa Vidyapeetham
        </p>
      </div>
    </footer>
  );
}
