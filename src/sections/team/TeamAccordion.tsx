import { Fragment, useState, type CSSProperties } from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { teamGroups, type TeamGroupId } from "../../data/team";
import MemberGrid from "./MemberGrid";
import {
  AccordionLabel,
  AccordionList,
  AccordionTrigger,
  TeamDirectory,
} from "./styles";

interface TeamAccordionProps {
  revealStyle: CSSProperties;
}

export default function TeamAccordion({ revealStyle }: TeamAccordionProps) {
  const [activeGroupId, setActiveGroupId] = useState<TeamGroupId | null>(null);

  return (
    <TeamDirectory>
      <AccordionList>
        {teamGroups.map((group) => {
          const isOpen = activeGroupId === group.id;
          const panelId = `team-${group.id}`;
          return (
            <Fragment key={group.id}>
              <AccordionTrigger
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => {
                  setActiveGroupId((current) =>
                    current === group.id ? null : group.id,
                  );
                }}
              >
                <AccordionLabel>
                  {group.label}
                  {isOpen ? (
                    <BsArrowUpRight aria-hidden="true" />
                  ) : (
                    <BsArrowDownRight aria-hidden="true" />
                  )}
                </AccordionLabel>
              </AccordionTrigger>
              <MemberGrid
                isOpen={isOpen}
                members={group.members}
                panelId={panelId}
                revealStyle={revealStyle}
              />
            </Fragment>
          );
        })}
      </AccordionList>
    </TeamDirectory>
  );
}
