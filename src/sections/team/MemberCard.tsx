import ImagePlaceholder from "../../components/ImagePlaceholder";
import styles from "./TeamSection.module.css";

interface MemberCardProps {
  designation: string;
  name: string;
  revealState: "hidden" | "visible";
}

export default function MemberCard({
  designation,
  name,
  revealState,
}: MemberCardProps) {
  return (
    <div className={styles.memberCard} data-reveal={revealState}>
      <ImagePlaceholder
        className={styles.avatarPlaceholder}
        label={`${designation} photo placeholder`}
        aspectRatio="1 / 1"
      />
      <div className={styles.memberDetails}>
        <p className={styles.memberName}>{name}</p>
        <p className={styles.memberRole}>{designation}</p>
      </div>
    </div>
  );
}
