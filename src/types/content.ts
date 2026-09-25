export type CommunityMember =
  | { id: string; status: "pending"; name: string; designation: string }
  | {
      id: string;
      status: "filled";
      name: string;
      designation: string;
      photo: string;
    };

export type FacultyMember = CommunityMember;
export type TeamMember = CommunityMember;

export interface TeamGroup {
  id: string;
  label: string;
  members: readonly TeamMember[];
  columns?: number;
}

export interface EmailContact {
  type: "email";
  address: string;
}

export interface WebContact {
  type: "web";
  url: `https://${string}`;
}

export interface ExternalContacts {
  email: EmailContact;
  instagram: WebContact;
}

export type ProjectTimeline =
  | {
      started: `${number}-${number}`;
      status: "ongoing";
    }
  | {
      started: `${number}-${number}`;
      status: "completed";
      completed: `${number}-${number}`;
    };

export interface Project {
  id: string;
  title: string;
  lead: {
    name: string;
    yearAndDepartment: string;
  };
  timeline: ProjectTimeline;
  description: string;
  frameworks: readonly string[];
  tags: readonly string[];
  contacts: ExternalContacts;
}
