export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  photo: string;
}

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  image: string | null;
}

export interface TeamGroup {
  id: string;
  label: string;
  members: readonly TeamMember[];
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
