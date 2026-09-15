import ImagePlaceholder from "../../components/ImagePlaceholder";
import styles from "./TeamSection.module.css";

interface MemberCardProps {
  designation: string;
  image: string | null;
  name: string;
  revealState: "hidden" | "visible";
}

export default function MemberCard({
  designation,
  image,
  name,
  revealState,
}: MemberCardProps) {
  return (
    <div className={styles.memberCard} data-reveal={revealState}>
      {image ? (
        <img
          className={styles.avatar}
          src={image}
          alt={name}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <ImagePlaceholder
          className={styles.avatarPlaceholder}
          label={`${name} profile photo unavailable`}
          aspectRatio="1 / 1"
        />
      )}
      <div className={styles.memberDetails}>
        <h3 className={styles.memberName}>{name}</h3>
        <p className={styles.memberRole}>{designation}</p>
      </div>
    </div>
  );
}
