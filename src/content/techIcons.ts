/** @format */

const ICONS: Record<string, string> = {
  // Languages
  TypeScript: "https://cdn.simpleicons.org/typescript",
  JavaScript: "https://cdn.simpleicons.org/javascript",
  "C#": "https://cdn.simpleicons.org/csharp",
  SQL: "https://cdn.simpleicons.org/mysql",
  PHP: "https://cdn.simpleicons.org/php",
  Dart: "https://cdn.simpleicons.org/dart",
  Java: "https://cdn.simpleicons.org/openjdk",
  Kotlin: "https://cdn.simpleicons.org/kotlin",

  // Frameworks / Libraries
  React: "https://cdn.simpleicons.org/react",
  "React.js": "https://cdn.simpleicons.org/react",
  Vite: "https://cdn.simpleicons.org/vite",
  "ASP.NET Core": "https://cdn.simpleicons.org/dotnet",
  "EF Core": "https://cdn.simpleicons.org/dotnet",
  Laravel: "https://cdn.simpleicons.org/laravel",
  "Vue.js": "https://cdn.simpleicons.org/vuedotjs",
  WordPress: "https://cdn.simpleicons.org/wordpress",
  "Redux Toolkit": "https://cdn.simpleicons.org/redux",
  "RTK Query": "https://cdn.simpleicons.org/redux",
  "Redux Saga": "https://cdn.simpleicons.org/redux",
  "Redux Toolkit & RTK Query": "https://cdn.simpleicons.org/redux",

  // Project tech (extra)
  "Node.js": "https://cdn.simpleicons.org/nodedotjs",
  "Express.js": "https://cdn.simpleicons.org/express",
  MongoDB: "https://cdn.simpleicons.org/mongodb",
  "Mongo DB": "https://cdn.simpleicons.org/mongodb",
  "socket.io": "https://cdn.simpleicons.org/socketdotio",
  "Three.js": "https://cdn.simpleicons.org/threedotjs",
  "Tailwind.css": "https://cdn.simpleicons.org/tailwindcss",
  "Tailwind CSS": "https://cdn.simpleicons.org/tailwindcss",
  Flutter: "https://cdn.simpleicons.org/flutter",
  Lottie: "https://cdn.simpleicons.org/lottiefiles",
  Fl_chart: "https://cdn.simpleicons.org/flutter",
  SharedPreferences: "https://cdn.simpleicons.org/android",
  "Android XML": "https://cdn.simpleicons.org/android",
  "Android Studio": "https://cdn.simpleicons.org/androidstudio",
  Figma: "https://cdn.simpleicons.org/figma",
  "Adobe Photoshop": "https://cdn.simpleicons.org/adobephotoshop",
  "Adobe Illustrator": "https://cdn.simpleicons.org/adobeillustrator",
  "Framer Motion": "https://cdn.simpleicons.org/framer",

  // Databases
  "SQL Server": "https://cdn.simpleicons.org/microsoftsqlserver",
  "MS SQL Server": "https://cdn.simpleicons.org/microsoftsqlserver",
  PostgreSQL: "https://cdn.simpleicons.org/postgresql",
  MySQL: "https://cdn.simpleicons.org/mysql",

  // Tools
  Git: "https://cdn.simpleicons.org/git",
  TortoiseGit: "https://cdn.simpleicons.org/git",
  Postman: "https://cdn.simpleicons.org/postman",
  "Swagger / OpenAPI": "https://cdn.simpleicons.org/swagger",
  "VS Code": "https://cdn.simpleicons.org/visualstudiocode",
  "Visual Studio": "https://cdn.simpleicons.org/visualstudio",
  "IntelliJ IDEA": "https://cdn.simpleicons.org/intellijidea",
  "Azure DevOps": "https://cdn.simpleicons.org/azuredevops",
  DBeaver: "https://cdn.simpleicons.org/databricks",
};

const norm = (s: string) =>
  s
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[._]/g, "."); // keep dots consistent

const ALIASES: Record<string, string> = {
  "react js": "React.js",
  "react.js": "React.js",
  "node js": "Node.js",
  "node.js": "Node.js",
  "express js": "Express.js",
  "express.js": "Express.js",
  "mongo db": "Mongo DB",
  "mongodb": "MongoDB",
  "socket io": "socket.io",
  "socket.io": "socket.io",
  "three js": "Three.js",
  "three.js": "Three.js",
  "tailwind css": "Tailwind CSS",
  "tailwind.css": "Tailwind.css",
  "ms sql server": "MS SQL Server",
  "mssql server": "MS SQL Server",
};

export function getTechIconUrl(label: string): string | undefined {
  const raw = label.trim();
  if (!raw) return undefined;

  if (ICONS[raw]) return ICONS[raw];

  const key = norm(raw);
  const aliased = ALIASES[key];
  if (aliased && ICONS[aliased]) return ICONS[aliased];

  // try by normalized matching to existing keys
  const directKey = Object.keys(ICONS).find((k) => norm(k) === key);
  if (directKey) return ICONS[directKey];

  return undefined;
}



// /** @format */

// // Use SimpleIcons CDN with an explicit color so icons are visible on dark backgrounds.
// // URL format: https://cdn.simpleicons.org/<slug>/<hexColor>

// type IconMeta = { slug: string; color?: string };

// export const techIconMeta: Record<string, IconMeta> = {
//   // Languages
//   TypeScript: { slug: "typescript", color: "3178C6" },
//   JavaScript: { slug: "javascript", color: "F7DF1E" },
//   "C#": { slug: "csharp", color: "239120" },
//   SQL: { slug: "mysql", color: "4479A1" }, // generic SQL fallback
//   PHP: { slug: "php", color: "777BB4" },
//   Dart: { slug: "dart", color: "0175C2" },
//   Java: { slug: "openjdk", color: "ED8B00" },
//   Kotlin: { slug: "kotlin", color: "7F52FF" },

//   // Frameworks / libraries
//   React: { slug: "react", color: "61DAFB" },
//   Vite: { slug: "vite", color: "646CFF" },
//   "ASP.NET Core": { slug: "dotnet", color: "512BD4" },
//   "EF Core": { slug: "dotnet", color: "512BD4" },
//   Laravel: { slug: "laravel", color: "FF2D20" },
//   "Vue.js": { slug: "vuedotjs", color: "42B883" },
//   WordPress: { slug: "wordpress", color: "21759B" },
//   "Redux Toolkit": { slug: "redux", color: "764ABC" },
//   "RTK Query": { slug: "redux", color: "764ABC" },
//   "Redux Saga": { slug: "redux", color: "764ABC" },

//   // Databases
//   "SQL Server": { slug: "microsoftsqlserver", color: "CC2927" },
//   PostgreSQL: { slug: "postgresql", color: "4169E1" },
//   MongoDB: { slug: "mongodb", color: "47A248" },
//   MySQL: { slug: "mysql", color: "4479A1" },

//   // Tools
//   Git: { slug: "git", color: "F05032" },
//   TortoiseGit: { slug: "git", color: "F05032" }, // fallback
//   Postman: { slug: "postman", color: "FF6C37" },
//   "Swagger / OpenAPI": { slug: "swagger", color: "85EA2D" },
//   "VS Code": { slug: "visualstudiocode", color: "007ACC" },
//   "Visual Studio": { slug: "visualstudio", color: "5C2D91" },
//   "IntelliJ IDEA": { slug: "intellijidea", color: "000000" },
//   "Android Studio": { slug: "androidstudio", color: "3DDC84" },
//   "Azure DevOps": { slug: "azuredevops", color: "0078D7" },
//   DBeaver: { slug: "dbeaver", color: "6E56CF" }, // if this ever fails, it will just hide
// };

// const FALLBACK_COLOR_DARK = "E2E8F0"; // slate-200 (visible on dark)
// const FALLBACK_COLOR_LIGHT = "0F172A"; // slate-900 (visible on light)

// export function getTechIconUrl(label: string) {
//   const key = label.trim();
//   const meta = techIconMeta[key];
//   if (!meta) return undefined;

//   // ensure visibility if a meta doesn't have a brand color
//   const isDark =
//     typeof document !== "undefined" &&
//     document.documentElement.classList.contains("dark");

//   const color = meta.color ?? (isDark ? FALLBACK_COLOR_DARK : FALLBACK_COLOR_LIGHT);
//   return `https://cdn.simpleicons.org/${meta.slug}/${color}`;
// }
