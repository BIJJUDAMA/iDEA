import type { FacultyMember } from "../types/content";

const faculty = [
  {
    id: "faculty-mentor",
    name: "Name to be announced",
    designation: "Faculty Mentor",
  },
] as const satisfies readonly FacultyMember[];

export default faculty;
