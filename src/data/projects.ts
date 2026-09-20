import type { Project } from "../types/content";

const projects = [
  {
    id: "scheduler",
    title: "Scheduler",
    lead: { name: "Nirmal K", yearAndDepartment: "4th Year CSE" },
    timeline: { started: "2023-06", status: "ongoing" },
    description:
      "The meeting scheduler application for the university aims to streamline the process of scheduling meetings between faculty members and students. The application will have two interfaces: one for the faculty to import their timetable and view their free slots, and another for students to request meetings with faculty members based on their availability. The faculty members will have the option to accept or reject the meeting requests, and the application will provide a method of communication between the faculty and students for further coordination.",
    frameworks: ["Flutter", "Node.js", "ExpressJS", "MongoDB"],
    tags: [
      "App Development",
      "MicrosoftGraphAPI",
      "WebAPI",
      "BackendDevelopment",
    ],
    contacts: {
      email: { type: "email", address: "nirmalkarthikeyan1503@gmail.com" },
      instagram: {
        type: "web",
        url: "https://www.instagram.com/homenum_.revelio/",
      },
    },
  },
  {
    id: "project-allocation-system",
    title: "Project Allocation System",
    lead: { name: "iDEA", yearAndDepartment: "CSE" },
    timeline: { started: "2024-06", status: "ongoing" },
    description:
      "Assigning student members to work on projects or research papers, for iDEA with efficient mapping based on skillset, experience level, and peer group in an impartial way. There is a need for an algorithmic solution to automate the assignment process and ensure fair and effective project allocations.",
    frameworks: ["Python", "Java"],
    tags: [
      "AlgorithmDesign",
      "ObjectOrientedProgramming",
      "DataStructures",
      "DBMS",
    ],
    contacts: {
      email: { type: "email", address: "ideatech@cb.amrita.edu" },
      instagram: {
        type: "web",
        url: "https://www.instagram.com/idea_amrita/",
      },
    },
  },
  {
    id: "supply-blocks",
    title: "SupplyBlocks",
    lead: { name: "Arjhun S", yearAndDepartment: "3rd Year CSE" },
    timeline: { started: "2023-06", status: "ongoing" },
    description:
      "The SupplyBlocks project aims to develop a Blockchain based solution where small / irregular producers of goods can list their products to buyers in their vicinity / buyers in places they travel to, and sell their produce without having to employ a middleman. The project aims to streamline resource management and improve accessibility within the community.",
    frameworks: ["Flutter", "Node.js", "Solidity"],
    tags: ["BlockchainDevelopment", "AppDevelopment", "SmartContracts"],
    contacts: {
      email: { type: "email", address: "arjunsreedar26@gmail.com" },
      instagram: {
        type: "web",
        url: "https://www.instagram.com/arjjuuun/",
      },
    },
  },
] as const satisfies readonly [Project, ...Project[]];

export type ProjectId = (typeof projects)[number]["id"];

export default projects;
