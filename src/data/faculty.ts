import type { FacultyMember } from "../types/content";

const faculty = [
  {
    id: "dhanya-m-d",
    name: "Dr. Dhanya M D",
    designation: "Assistant Professor, CSE",
    photo: "/images/faculty/dhanya.webp",
  },
  {
    id: "guruprakash",
    name: "Dr. Guruprakash",
    designation: "Assistant Professor, CSE",
    photo: "/images/faculty/guruprakash.webp",
  },
] as const satisfies readonly FacultyMember[];

export default faculty;
