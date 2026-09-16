import texts from "../../../data/texts";
import { BsPerson } from "react-icons/bs";
import type { CommunityMember } from "../../../types/content";
import styles from "./TeamSection.module.css";

interface MemberCardProps {
  member: CommunityMember;
  revealState: "hidden" | "visible";
}

export default function MemberCard({ member, revealState }: MemberCardProps) {
  const pending = member.status === "pending";
  return (
    <div
      className={styles.memberCard}
      data-state={member.status}
      data-reveal={revealState}
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
    </div>
  );
}
