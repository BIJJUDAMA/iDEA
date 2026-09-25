import texts from "./texts";
import type { TeamGroup } from "../types/content";

export const teamGroups = [
  {
    id: "president",
    label: "PRESIDENT",
    columns: 1,
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
    columns: 2,
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
    id: "technology",
    label: "TECH LEAD, R&D HEAD & WEBMASTERS",
    columns: 2,
    members: [
      {
        id: "tech-lead-1",
        status: "pending",
        name: texts.team.pendingName,
        designation: "Tech Lead",
      },
      {
        id: "research-development-1",
        status: "pending",
        name: texts.team.pendingName,
        designation: "R&D Head",
      },
      {
        id: "web-master-1",
        status: "pending",
        name: texts.team.pendingName,
        designation: "Web Master 1",
      },
      {
        id: "web-master-2",
        status: "pending",
        name: texts.team.pendingName,
        designation: "Web Master 2",
      },
    ],
  },
  {
    id: "administration",
    label: "SECRETARY, JOINT SECRETARY & TREASURER",
    columns: 3,
    members: [
      {
        id: "secretary-1",
        status: "pending",
        name: texts.team.pendingName,
        designation: "Secretary",
      },
      {
        id: "joint-secretary-1",
        status: "pending",
        name: texts.team.pendingName,
        designation: "Joint Secretary",
      },
      {
        id: "treasurer-1",
        status: "pending",
        name: texts.team.pendingName,
        designation: "Treasurer",
      },
    ],
  },
] as const satisfies readonly TeamGroup[];

export type TeamGroupId = (typeof teamGroups)[number]["id"];
