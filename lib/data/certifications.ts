export interface Certification {
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
  type: "certification" | "achievement" | "coursework";
}

export const certifications: Certification[] = [
  {
    title: "Fundamentals of Robotics & Industrial Automation",
    issuer: "L&T EduTech (Coursera)",
    date: "Mar 2026",
    credentialId: "J6H402RZ8R3A",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/J6H402RZ8R3A",
    type: "certification",
  },
  {
    title: "Basics of Robotics",
    issuer: "Siemens (Coursera)",
    date: "Mar 2026",
    credentialId: "FQ16RTMYPVPD",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/FQ16RTMYPVPD",
    type: "certification",
  },
  {
    title: "Introduction to Digital Transformation",
    issuer: "Siemens (Coursera)",
    date: "Mar 2026",
    credentialId: "MKLLDBZP29RY",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/MKLLDBZP29RY",
    type: "certification",
  },
  {
    title: "CORE Research Internship — Agentic AI",
    issuer: "Ciconia Systems GmbH",
    date: "2026",
    type: "achievement",
  },
  {
    title: "Multi-Robot Grocery Assistant — Pepper & Temi",
    issuer: "Ostfalia University — Lab Project",
    date: "2025",
    type: "achievement",
  },
  {
    title: "Autonomous AI Agents & Multi-Agent Systems",
    issuer: "TU Clausthal — Advanced Lab",
    date: "2026",
    type: "coursework",
  },
  {
    title: "Computer Vision & Deep Learning",
    issuer: "TU Clausthal — Core Module",
    date: "2025",
    type: "coursework",
  },
  {
    title: "Real-Time Operating Systems & Embedded IoT",
    issuer: "Ostfalia University",
    date: "2025",
    type: "coursework",
  },
  {
    title: "High Distinction — Diploma in Computer Engineering",
    issuer: "Gujarat Technological University (GTU)",
    date: "2021",
    type: "achievement",
  },
];
