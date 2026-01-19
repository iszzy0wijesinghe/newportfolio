/** @format */

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location?: string;
  bullets: string[];
  tech?: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: "Laugfs Holdings",
    role: "Software Engineer (Intern)",
    period: "2025 — Present",
    location: "On Site | 101 Maya Ave, Colombo 00600, Sri Lanka",
    bullets: [
      "Developed and maintained production UI features with a clean, calm design system—focused on responsiveness, consistency, and accessibility.",
      "Integrated APIs and handled real-world state flows (loading, caching, errors) to keep screens fast and predictable.",
      "Improved performance by reducing bundle cost (lazy loading, component splitting) and optimizing image delivery for smoother UX.",
      "Worked with Git-based workflows and Azure DevOps boards to deliver fixes/features in small, reviewable increments.",
      "Collaborated closely with QA/peers to reproduce bugs, ship patches safely, and keep releases stable.",
    ],
    tech: [
      "React",
      "TypeScript",
      "Redux Saga",
      "Vite",
      "Azure DevOps",
      "PostgreSQL",
      "DBeaver",
      "Git",
    ],
  },
  {
    company: "Freelance / Personal Projects",
    role: "Full-Stack Developer",
    period: "2023 — Present",
    location: "Remote",
    bullets: [
      "Built full-stack projects end-to-end—clean UI, solid architecture, and real-world folder structure.",
      "Designed REST APIs and database schemas with practical validation, security basics, and maintainable code.",
      "Focused on shipping: structured tasks, consistent commits, and polished releases that feel smooth to use.",
    ],
    tech: [
      "React",
      "TypeScript",
      "Redux Toolkit",
      "RTK Query",
      "Laravel",
      "Vue.js",
      "WordPress",
      "SQL Server",
      "PostgreSQL",
      "Postman",
      "Swagger / OpenAPI",
    ],
  },
];
