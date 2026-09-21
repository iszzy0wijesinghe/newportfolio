
export type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  period: string;
  startedAt: string;
  employmentType?: string;
  location?: string;
  summary: string;
  bullets: string[];
  tech?: string[];
  logo: string;
  initials: string;
  companyUrl?: string;
  current?: boolean;
  featured?: boolean;
};

export const experience: ExperienceItem[] = [
  {
    id: "laugfs-associate",
    company: "LAUGFS Holdings",
    role: "Associate Software Engineer",
    period: "Mar 2026 — Present",
    startedAt: "2026-03-01",
    employmentType: "Full-time",
    location: "Colombo, Sri Lanka · On-site",
    logo: "/logos/laugfs.jpg",
    initials: "LH",
    current: true,
    featured: true,
    companyUrl: "https://www.linkedin.com/company/3837363/",
    summary:
      "Promoted to Associate Software Engineer following my internship at LAUGFS Holdings. Currently developing enterprise applications and full-stack solutions across multiple business domains.",
    bullets: [
      "Promoted in recognition of strong performance, dedication, and continuous contribution during my internship.",
      "Developing and maintaining scalable enterprise applications across multiple business domains.",
      "Building full-stack solutions using ASP.NET Core, React, and modern state management tools.",
      "Enhancing Retail Management Systems (RMS) and enterprise web platforms with improved performance and usability.",
      "Developing REST APIs with clean architecture, structured validation, and optimized performance.",
      "Managing SQL Server databases, including schema design, migrations, and query optimization.",
      "Implementing secure authentication and role-based access control.",
      "Contributing to reporting dashboards with dynamic filtering and real-time data insights.",
      "Performing debugging, testing, and performance tuning across applications.",
      "Collaborating in Agile environments and following SDLC best practices.",
      "Continuously improving code quality, maintainability, and scalability.",
    ],
    tech: [
      "ASP.NET Core",
      "C#",
      "React",
      "SQL Server",
      "REST APIs",
      "Entity Framework Core",
      "Redux Toolkit",
      "RTK Query",
      "JWT",
      "Agile",
    ],
  },
  {
    id: "laugfs-intern",
    company: "LAUGFS Holdings",
    role: "Software Engineer Intern",
    period: "Sep 2025 — Mar 2026",
    startedAt: "2025-09-01",
    employmentType: "Internship",
    location: "Colombo, Sri Lanka · On-site",
    logo: "/logos/laugfs.jpg",
    initials: "LH",
    companyUrl: "https://www.linkedin.com/company/3837363/",
    summary:
      "Completed my internship in the IT Department of LAUGFS Holdings, gaining hands-on experience in enterprise systems, full-stack development, APIs, and database management.",
    bullets: [
      "Completed a six-month software engineering internship in the IT Department.",
      "Contributed to the Customer & Order Management System using ASP.NET Core MVC, Entity Framework Core, and SQL Server.",
      "Participated in Retail Management System (RMS) development using ASP.NET Core Web API, React, Vite, and RTK Query.",
      "Assisted in developing SFA reporting modules using Laravel and Vue with dynamic filters.",
      "Developed and tested REST APIs with DTO-based responses, validation, and structured error handling.",
      "Supported database design, schema updates, and data migrations.",
      "Conducted integration testing and debugging using Postman and Insomnia.",
      "Contributed to corporate website maintenance, bug fixing, recovery, and security improvements.",
      "Worked on Performance Management System (PMS) bug fixes and Year-End workflow improvements.",
      "Followed SDLC practices from requirements analysis through release support.",
      "Implemented authentication and role-based access control using JWT and session-based systems.",
    ],
    tech: [
      "ASP.NET Core",
      "ASP.NET MVC",
      "C#",
      "Entity Framework Core",
      "SQL Server",
      "React",
      "Vite",
      "Redux Toolkit",
      "RTK Query",
      "Laravel",
      "Vue.js",
      "Postman",
      "Insomnia",
      "JWT",
    ],
  },
  {
    id: "designcrowd",
    company: "DesignCrowd",
    role: "Freelance Graphic Designer",
    period: "Dec 2023 — Jun 2024",
    startedAt: "2023-12-01",
    employmentType: "Freelance",
    location: "Remote",
    logo: "/logos/designcrowd.jpg",
    initials: "DC",
    summary:
      "Expanded my international freelancing experience by delivering creative graphic design solutions to clients through DesignCrowd.",
    bullets: [
      "Delivered graphic design solutions to international clients.",
      "Developed creative concepts and visual designs according to client requirements.",
      "Improved my skills through diverse creative projects and design challenges.",
    ],
    tech: [
      "Graphic Design",
      "Logo Design",
      "Flyer Design",
      "Branding",
      "Adobe Photoshop",
    ],
  },
  {
    id: "alohamora",
    company: "Alohamora Productions",
    role: "Founder & Director",
    period: "Oct 2022 — Dec 2024",
    startedAt: "2022-10-01",
    employmentType: "Self-employed",
    location: "Colombo, Sri Lanka · On-site",
    logo: "/logos/alohamora.jpg",
    initials: "AP",
    summary:
      "Founded Alohamora, a creative short-film production team driven by storytelling, emotion, and cinematic visual experiences.",
    bullets: [
      "Founded Alohamora Productions in 2022 as a creative short-film production team.",
      "Led concept development, scripting, direction, and post-production.",
      "Focused on thought-provoking short films exploring modern themes with cinematic quality.",
      "Combined creative direction with technical execution to bring original storytelling ideas to life.",
    ],
    tech: [
      "Film Production",
      "Film Direction",
      "Film Editing",
      "Storytelling",
      "Scriptwriting",
      "Creative Direction",
      "Post-production",
    ],
  },
  {
    id: "motionarts",
    company: "MOTIONARTS LK",
    role: "Founder & Lead Graphic Designer",
    period: "Mar 2020 — Present",
    startedAt: "2020-03-01",
    employmentType: "Full-time",
    location: "Colombo, Sri Lanka · On-site",
    logo: "/logos/motionarts.jpg",
    initials: "ML",
    current: true,
    summary:
      "Founded MOTIONARTS LK with a vision to deliver bold, modern, and impactful visual solutions through branding, digital design, UI/UX, and motion graphics.",
    bullets: [
      "Founded MOTIONARTS LK in March 2020.",
      "Led the company's creative direction and development.",
      "Specialized in branding, digital design, UI/UX, and motion graphics.",
      "Managed creative projects from initial concepts through final delivery.",
      "Focused on innovation, precision, and client satisfaction.",
      "Worked on creative solutions for clients in Sri Lanka and beyond.",
    ],
    tech: [
      "Graphic Design",
      "Branding",
      "UI/UX",
      "Motion Graphics",
      "Creative Direction",
      "Business Ownership",
      "Leadership",
      "Adobe Photoshop",
    ],
  },
  {
    id: "fiverr",
    company: "Fiverr",
    role: "Freelance Graphic Designer",
    period: "Dec 2019 — Jul 2022",
    startedAt: "2019-12-01",
    employmentType: "Freelance",
    location: "Remote",
    logo: "/logos/fiverr.jpg",
    initials: "F",
    summary:
      "Started my professional creative journey as a freelance graphic designer, working with international clients and developing my foundations in digital design.",
    bullets: [
      "Started my graphic design journey through Fiverr.",
      "Delivered graphic design solutions to international clients.",
      "Developed practical skills in logo design, Adobe Photoshop, and digital design.",
      "Built experience understanding client requirements and delivering creative solutions.",
    ],
    tech: [
      "Graphic Design",
      "Logo Design",
      "Adobe Photoshop",
      "Digital Design",
      "Client Communication",
    ],
  },
];

export const careerJourney = [...experience].sort((a, b) =>
  a.startedAt.localeCompare(b.startedAt)
);

export const motiora = {
  name: "Motiora Software Solutions",
  logo: "/logos/motiora.jpg",
  initials: "MS",
  website: "",
  summary:
    "Our software solutions venture brings together software engineering, product thinking, and creative technology. It represents my continued interest in turning ideas into practical digital solutions beyond my professional engineering role.",
};