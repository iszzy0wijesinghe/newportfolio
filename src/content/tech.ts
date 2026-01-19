export type TechGroup = { title: string; items: string[] };

export const techStack: TechGroup[] = [
  {
    title: "Languages",
    items: ["TypeScript", "JavaScript", "C#", "SQL", "PHP", "Dart", "Java", "Kotlin"],
  },
  {
    title: "Frameworks",
    items: [
      "React",
      "Vite",
      "ASP.NET Core",
      "EF Core",
      "Laravel",
      "Vue.js",
      "WordPress",
      "Redux Toolkit", 
      "RTK Query", 
      "Redux Saga",
    ],
  },
  {
    title: "Databases",
    items: ["SQL Server", "PostgreSQL", "MongoDB", "MySQL"],
  },
  {
    title: "Tools",
    items: [
      "Git",
      "TortoiseGit",
      "Postman",
      "Swagger / OpenAPI",
      "VS Code",
      "Visual Studio",
      "IntelliJ IDEA",
      "Android Studio",
      "Azure DevOps",
      "DBeaver",
    ],
  },
];
