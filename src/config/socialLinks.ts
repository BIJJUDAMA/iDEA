import { clubContact } from "./clubContact";

export const socialLinks = [
  {
    id: "email",
    label: "Email iDEA",
    href: `mailto:${clubContact.email}`,
    external: false,
  },
  {
    id: "instagram",
    label: "iDEA on Instagram",
    href: "https://www.instagram.com/idea_amrita/",
    external: true,
  },
  {
    id: "github",
    label: "iDEA on GitHub",
    href: "https://github.com/IDEA-Amrita",
    external: true,
  },
] as const;
