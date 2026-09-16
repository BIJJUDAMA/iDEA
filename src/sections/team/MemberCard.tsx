import { useState } from "react";
import { assetUrl } from "../../utils/assets";
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
  const [failed, setFailed] = useState(false);
  return (
    <div className={styles.memberCard} data-reveal={revealState}>
      {image && !failed ? (
        <img
          className={styles.avatar}
          src={assetUrl(image.replace(".webp", "-112.webp"))}
          srcSet={`${assetUrl(image.replace(".webp", "-112.webp"))} 112w, ${assetUrl(image.replace(".webp", "-224.webp"))} 224w`}
          sizes="56px"
          width={56}
          height={56}
          onError={() => {
            setFailed(true);
          }}
          alt=""
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
        <p className={styles.memberName}>{name}</p>
        <p className={styles.memberRole}>{designation}</p>
      </div>
    </div>
  );
}
