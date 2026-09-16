import texts from "./texts";
import type { TeamGroup } from "../types/content";

export const teamGroups = [
  {
    id: "president",
    label: "PRESIDENT",
    members: [
      {
        id: "president-1",
        status: "pending",
        name: texts.team.pendingName,
        designation: "President",
      },
    ],
  },
  {
    id: "vice-president",
    label: "VICE PRESIDENTS",
    members: [
      {
        id: "vice-president-1",
        status: "pending",
        name: texts.team.pendingName,
        designation: "Vice President 1",
      },
      {
        id: "vice-president-2",
        status: "pending",
        name: texts.team.pendingName,
        designation: "Vice President 2",
      },
    ],
  },
  {
    id: "department-heads",
    label: "R&D & PR HEADS",
    members: [
      {
        id: "research-development-1",
        status: "pending",
        name: texts.team.pendingName,
        designation: "R&D Head",
      },
      {
        id: "public-relations-1",
        status: "pending",
        name: texts.team.pendingName,
        designation: "PR Head",
      },
    ],
  },
  {
    id: "administration",
    label: "SECRETARY, TREASURER & JOINT SECRETARY",
    members: [
      {
        id: "secretary-1",
        status: "pending",
        name: texts.team.pendingName,
        designation: "Secretary",
      },
      {
        id: "treasurer-1",
        status: "pending",
        name: texts.team.pendingName,
        designation: "Treasurer",
      },
      {
        id: "joint-secretary-1",
        status: "pending",
        name: texts.team.pendingName,
        designation: "Joint Secretary",
      },
    ],
  },
  {
    id: "technology",
    label: "TECH LEAD & WEB MASTER",
    members: [
      {
        id: "tech-lead-1",
        status: "pending",
        name: texts.team.pendingName,
        designation: "Tech Lead",
      },
      {
        id: "web-master-1",
        status: "pending",
        name: texts.team.pendingName,
        designation: "Web Master",
      },
    ],
  },
] as const satisfies readonly TeamGroup[];

export type TeamGroupId = (typeof teamGroups)[number]["id"];
