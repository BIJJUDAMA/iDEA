import { useRef } from "react";
import { BsArrowUpRight } from "react-icons/bs";
import useElementOnScreen from "../../hooks/useElementOnScreen";
import { PageViewport } from "../../components/pageStyles";
import SectionHeader from "../../components/SectionHeader";
import TypeformButton from "../../components/TypeformButton";
import { formIds } from "../../config/forms";
import type { SectionNavigationProps } from "../../types/navigation";
import {
  ActionColumn,
  ActionColumns,
  ActionHeading,
  ContributionContent,
  ResponsiveCopy,
  SectionDivider,
} from "./styles";

export default function ContributeSection({
  isLight,
  onNavigate,
}: SectionNavigationProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const onScreen = useElementOnScreen(headingRef);
  const revealStyle = {
    opacity: onScreen ? 1 : 0,
    translate: onScreen ? "none" : "0 2rem",
    transition: "1000ms ease-in-out",
  } as const;

  return (
    <PageViewport>
      <SectionHeader
        activeSection="contribute"
        isLight={isLight}
        onNavigate={onNavigate}
      />
      <ContributionContent>
        <ActionColumns>
          <ActionColumn>
            <ActionHeading ref={headingRef} style={revealStyle}>
              Submit an Exciting Project Idea
            </ActionHeading>
            <TypeformButton formId={formIds.proposeProject}>
              lessgo <BsArrowUpRight aria-hidden="true" />
            </TypeformButton>
            <ResponsiveCopy>
              Ready to bring your project idea to life? Share it with us at
              iDEA!
            </ResponsiveCopy>
            <ResponsiveCopy>
              We're here to fuel innovation and empower talented creators like
              you. Our platform provides valuable resources and support to
              transform your concept into a remarkable reality.
            </ResponsiveCopy>
          </ActionColumn>
          <SectionDivider aria-hidden="true" />
          <ActionColumn>
            <ResponsiveCopy>
              Calling all dreamers, creators, and tech enthusiasts! Ready to
              turn your lightbulb moments into real-world wonders?
            </ResponsiveCopy>
            <ResponsiveCopy>
              As a member, you'll have the chance to enhance your professional
              profile and connect with like-minded peers. Become a part of iDEA
              today!
            </ResponsiveCopy>
            <TypeformButton formId={formIds.joinCommunity}>
              lessgo <BsArrowUpRight aria-hidden="true" />
            </TypeformButton>
            <ActionHeading as="h2" style={revealStyle}>
              Become a Member
            </ActionHeading>
          </ActionColumn>
        </ActionColumns>
      </ContributionContent>
    </PageViewport>
  );
}
