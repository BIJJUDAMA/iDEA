import { useState } from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { teamGroups, type TeamGroupId } from "../../data/team";
import MemberGrid from "./MemberGrid";
import styles from "./TeamSection.module.css";

interface TeamAccordionProps {
  revealState: "hidden" | "visible";
}

export default function TeamAccordion({ revealState }: TeamAccordionProps) {
  const [activeGroupId, setActiveGroupId] = useState<TeamGroupId | null>(null);

  return (
    <div className={styles.directory}>
      <ul className={styles.accordionList}>
        {teamGroups.map((group) => {
          const isOpen = activeGroupId === group.id;
          const panelId = `team-${group.id}`;
          return (
            <li key={group.id}>
              <h3>
                <button
                  className={styles.accordionTrigger}
                  type="button"
                  id={`${panelId}-trigger`}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => {
                    setActiveGroupId((current) =>
                      current === group.id ? null : group.id,
                    );
                  }}
                >
                  <span className={styles.accordionLabel}>
                    {group.label}
                    {isOpen ? (
                      <BsArrowUpRight aria-hidden="true" />
                    ) : (
                      <BsArrowDownRight aria-hidden="true" />
                    )}
                  </span>
                </button>
              </h3>
              <MemberGrid
                isOpen={isOpen}
                members={group.members}
                panelId={panelId}
                revealState={revealState}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
