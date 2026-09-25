import texts from "../../../data/texts";
import { BsPerson } from "react-icons/bs";
import { AiFillGithub, AiOutlineLinkedin } from "react-icons/ai";
import type { CommunityMember } from "../../../types/content";
import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import styles from "./TeamSection.module.css";

interface MemberCardProps {
  member: CommunityMember;
  revealState?: "hidden" | "visible";
}

export default function MemberCard({ member }: MemberCardProps) {
  const reduceMotion = useReducedMotion();
  const pending = member.status === "pending";
  const photo = "photo" in member ? member.photo : undefined;
  const linkedin = "linkedin" in member ? member.linkedin : undefined;
  const github = "github" in member ? member.github : undefined;

  return (
    <m.article
      className={styles.memberCard}
      data-state={member.status}
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
    >
      <div className={styles.imageWrapper}>
        {pending || !photo ? (
          <span className={styles.pendingAvatar} aria-hidden="true">
            <BsPerson />
          </span>
        ) : (
          <img
            className={styles.memberPhoto}
            src={photo}
            alt=""
            loading="lazy"
          />
        )}
      </div>
      <div className={styles.memberDetails}>
        <p className={styles.memberName}>
          {pending ? texts.team.pendingName : member.name}
        </p>
        <p className={styles.memberRole}>{member.designation}</p>
        {(linkedin || github) && (
          <div className={styles.socialLinks}>
            {linkedin && (
              <a
                href={linkedin}
                className={styles.socialLink}
                aria-label={`${member.name}'s LinkedIn`}
                target="_blank"
                rel="noreferrer"
              >
                <AiOutlineLinkedin aria-hidden="true" />
              </a>
            )}
            {github && (
              <a
                href={github}
                className={styles.socialLink}
                aria-label={`${member.name}'s GitHub`}
                target="_blank"
                rel="noreferrer"
              >
                <AiFillGithub aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </div>
    </m.article>
  );
}
