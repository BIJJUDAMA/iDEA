import type { Project } from "../../types/content";
import {
  TechnologyHeading,
  TechnologyNames,
  TechnologyTag,
  TechnologyTags,
} from "./styles";

interface TechnologyListProps {
  frameworks: Project["frameworks"];
  tags: Project["tags"];
}

export default function TechnologyList({
  frameworks,
  tags,
}: TechnologyListProps) {
  return (
    <>
      {frameworks.length > 0 && (
        <TechnologyHeading>Built Using</TechnologyHeading>
      )}
      <TechnologyNames>{frameworks.join(", ")}</TechnologyNames>
      <TechnologyTags>
        {tags.map((tag) => (
          <TechnologyTag key={tag}>#{tag}</TechnologyTag>
        ))}
      </TechnologyTags>
    </>
  );
}
