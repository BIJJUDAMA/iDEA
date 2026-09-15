import type { TeamGroup } from "../types/content";

export const teamGroups = [
  {
    id: "advisors",
    label: "ADVISORS",
    members: [
      {
        id: "nirmal-k",
        name: "Nirmal K",
        designation: "23' B.Tech CSE",
        image: "/images/team/advisors/nirmal.webp",
      },
      {
        id: "soorya-s",
        name: "Soorya S",
        designation: "23' B.Tech CSE",
        image: null,
      },
      {
        id: "ayush-barik",
        name: "Ayush Barik",
        designation: "23' B.Tech CSE",
        image: "/images/team/advisors/ayush.webp",
      },
      {
        id: "arun-joshua-thomas",
        name: "Arun Joshua Thomas",
        designation: "23' B.Tech CCE",
        image: null,
      },
    ],
  },
  {
    id: "management-outreach",
    label: "MANAGEMENT & OUTREACH",
    members: [
      {
        id: "aparna-arun",
        name: "Aparna Arun",
        designation: "4th year B.Tech CSE",
        image: "/images/team/management/aparna.webp",
      },
      {
        id: "akash-s",
        name: "Akash S",
        designation: "4th year B.Tech CSE",
        image: "/images/team/management/akash.webp",
      },
    ],
  },
  {
    id: "ideation",
    label: "IDEATION",
    members: [
      {
        id: "arjhun-s",
        name: "Arjhun S",
        designation: "4th year B.Tech CSE",
        image: "/images/team/ideation/arjun.webp",
      },
      {
        id: "dilip-parasu",
        name: "Dilip Parasu",
        designation: "3rd year B.Tech AIE",
        image: "/images/team/ideation/dilip.webp",
      },
      {
        id: "varun-sankara-narayanan",
        name: "Varun Sankara Narayanan",
        designation: "3rd year B.Tech CSE",
        image: "/images/team/ideation/varun.webp",
      },
      {
        id: "santosh-sachin",
        name: "Santosh Sachin",
        designation: "3rd year B.Tech CSE",
        image: "/images/team/ideation/sachin.webp",
      },
    ],
  },
  {
    id: "internal-development",
    label: "INTERNAL DEVELOPMENT",
    members: [
      {
        id: "aditya-krishna-mohan",
        name: "Aditya Krishna Mohan",
        designation: "3rd year B.Tech CSE",
        image: "/images/team/internal_dev/aditya.webp",
      },
      {
        id: "nitin-ravi",
        name: "Nitin Ravi",
        designation: "3rd year B.Tech CSE",
        image: "/images/team/internal_dev/nitin.webp",
      },
    ],
  },
  {
    id: "human-resources",
    label: "HUMAN RESOURCES",
    members: [
      {
        id: "shriramya-karur",
        name: "Shriramya Karur",
        designation: "4th year B.Tech ECE",
        image: "/images/team/hr/ramya.webp",
      },
      {
        id: "jaideep-penta",
        name: "Jaideep Penta",
        designation: "4th year B.Tech ECE",
        image: "/images/team/hr/jaideep.webp",
      },
      {
        id: "rahul-dutt",
        name: "Rahul Dutt",
        designation: "4th year B.Tech MEE",
        image: "/images/team/hr/rahul.webp",
      },
    ],
  },
  {
    id: "curation",
    label: "CURATION",
    members: [
      {
        id: "navami-vipith-kumar",
        name: "Navami Vipith Kumar",
        designation: "4th year MSc. DS",
        image: "/images/team/curation/navami.webp",
      },
      {
        id: "prawin-subrajith-s",
        name: "Prawin Subrajith S",
        designation: "4th year B.Tech MEE",
        image: "/images/team/curation/pravin.webp",
      },
    ],
  },
] as const satisfies readonly TeamGroup[];

export type TeamGroupId = (typeof teamGroups)[number]["id"];
