import texts from "./texts";
import type { FacultyMember } from "../types/content";

const faculty = [
  {
    id: "faculty-mentor",
    name: texts.team.pendingName,
    designation: "Faculty Mentor",
  },
] as const satisfies readonly FacultyMember[];

export default faculty;
