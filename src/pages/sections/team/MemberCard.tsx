import texts from "../../../data/texts";
import { BsPerson } from "react-icons/bs";
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
  return (
    <m.div
      className={styles.memberCard}
      data-state={member.status}
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
    >
      {pending ? (
        <span className={styles.pendingAvatar} aria-hidden="true">
          <BsPerson />
        </span>
      ) : (
        <img
          className={styles.memberPhoto}
          src={member.photo}
          alt=""
          width="56"
          height="56"
          loading="lazy"
        />
      )}
      <div className={styles.memberDetails}>
        <p className={styles.memberName}>
          {pending ? texts.team.pendingName : member.name}
        </p>
        <p className={styles.memberRole}>{member.designation}</p>
      </div>
    </m.div>
  );
}
