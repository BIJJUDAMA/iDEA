import texts from "../../data/texts";
import faculty from "../../data/faculty";
import MemberCard from "./MemberCard";
import styles from "./TeamSection.module.css";

interface FacultyGridProps {
  revealState: "hidden" | "visible";
}

export default function FacultyGrid({ revealState }: FacultyGridProps) {
  return (
    <section className={styles.facultySection} aria-labelledby="faculty-title">
      <h3 className={styles.facultyHeading} id="faculty-title">
        {texts.team.facultyTitle}
      </h3>
      <div className={styles.facultyGrid}>
        {faculty.map((member) => (
          <article className={styles.facultyMember} key={member.id}>
            <MemberCard
              designation={member.designation}
              name={member.name}
              revealState={revealState}
            />
            <div className={styles.divider} />
          </article>
        ))}
      </div>
    </section>
  );
}
