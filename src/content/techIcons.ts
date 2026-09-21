
const DEVICON =
  "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons";

const GITHUB =
  "https://raw.githubusercontent.com/devicons/devicon/v2.16.0/icons";

const ICONS: Record<string, string> = {
  // Programming languages
  TypeScript: "typescript/typescript-original.svg",
  JavaScript: "javascript/javascript-original.svg",
  "C#": "csharp/csharp-original.svg",
  Python: "python/python-original.svg",
  PHP: "php/php-original.svg",
  Dart: "dart/dart-original.svg",
  Java: "java/java-original.svg",
  Kotlin: "kotlin/kotlin-original.svg",

  // Frontend
  React: "react/react-original.svg",
  "React.js": "react/react-original.svg",
  Vite: "vitejs/vitejs-original.svg",
  "Vue.js": "vuejs/vuejs-original.svg",
  "Tailwind CSS": "tailwindcss/tailwindcss-original.svg",
  "Redux Toolkit": "redux/redux-original.svg",
  "RTK Query": "redux/redux-original.svg",
  "Redux Saga": "redux/redux-original.svg",

  // Backend
  "ASP.NET Core": "dot-net/dot-net-original.svg",
  "ASP.NET MVC": "dot-net/dot-net-original.svg",
  "EF Core": "dot-net/dot-net-original.svg",
  "Entity Framework Core": "dot-net/dot-net-original.svg",
  Laravel: "laravel/laravel-original.svg",
  "Node.js": "nodejs/nodejs-original.svg",
  "Express.js": "express/express-original.svg",
  WordPress: "wordpress/wordpress-original.svg",

  // Databases
  "Microsoft SQL Server":
    "microsoftsqlserver/microsoftsqlserver-original.svg",
  "SQL Server":
    "microsoftsqlserver/microsoftsqlserver-original.svg",
  PostgreSQL: "postgresql/postgresql-original.svg",
  MySQL: "mysql/mysql-original.svg",
  MongoDB: "mongodb/mongodb-original.svg",
  Redis: "redis/redis-original.svg",

  // Cloud & DevOps
  AWS:
    "amazonwebservices/amazonwebservices-original-wordmark.svg",
  "Microsoft Azure": "azure/azure-original.svg",
  "Azure DevOps": "azuredevops/azuredevops-original.svg",

  // Mobile
  Flutter: "flutter/flutter-original.svg",
  "Android Studio": "androidstudio/androidstudio-original.svg",

  // Development tools
  Git: "git/git-original.svg",
  TortoiseGit: "git/git-original.svg",
  Postman: "postman/postman-original.svg",
  "Swagger / OpenAPI": "swagger/swagger-original.svg",
  "VS Code": "vscode/vscode-original.svg",
  "Visual Studio": "visualstudio/visualstudio-original.svg",
  "IntelliJ IDEA": "intellij/intellij-original.svg",
  Figma: "figma/figma-original.svg",

  // Additional project technologies
  "Socket.IO": "socketio/socketio-original.svg",
  "socket.io": "socketio/socketio-original.svg",
  "Three.js": "threejs/threejs-original.svg",
  "Framer Motion": "framermotion/framermotion-original.svg",
};

const LOCAL_ICONS: Record<string, string> = {
  // Database management tools
  HeidiSQL: "/tech-icons/heidisql.jpg",
  DBeaver: "/tech-icons/dbeaver.jpg",

  // Adobe Creative Cloud applications
  "Adobe Photoshop": "/tech-icons/adobe-photoshop.jpg",
  "Adobe Illustrator": "/tech-icons/adobe-illustrator.jpg",
  "Adobe InDesign": "/tech-icons/adobe-indesign.jpg",
  "Adobe Premiere Pro": "/tech-icons/adobe-premiere-pro.jpg",
  "Adobe After Effects": "/tech-icons/adobe-after-effects.jpg",
  "Adobe Media Encoder": "/tech-icons/adobe-media-encoder.jpg",
  "Adobe Firefly": "/tech-icons/adobe-firefly.jpg",
  "Adobe Creative Cloud": "/tech-icons/adobe-creative-cloud.jpg",
};

const ALIASES: Record<string, string> = {
  "c sharp": "C#",
  csharp: "C#",
  mssql: "Microsoft SQL Server",
  "ms sql": "Microsoft SQL Server",
  "ms sql server": "Microsoft SQL Server",
  "mssql server": "Microsoft SQL Server",
  "sql server": "Microsoft SQL Server",
  "amazon aws": "AWS",
  "amazon web services": "AWS",
  azure: "Microsoft Azure",
  azuredevops: "Azure DevOps",
  "visual studio code": "VS Code",
  vscode: "VS Code",
  "heidi sql": "HeidiSQL",
  "heidgi sql": "HeidiSQL",
  "heidgu sql": "HeidiSQL",
  "mongo db": "MongoDB",
  vue: "Vue.js",
  "react js": "React",
  "node js": "Node.js",
  "premiere pro": "Adobe Premiere Pro",
  "after effects": "Adobe After Effects",
  "media encoder": "Adobe Media Encoder",
  photoshop: "Adobe Photoshop",
  illustrator: "Adobe Illustrator",
  indesign: "Adobe InDesign",
  firefly: "Adobe Firefly",
  "creative cloud": "Adobe Creative Cloud",
};

function normalize(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export function getTechIconUrls(label: string): string[] {
  const normalized = normalize(label);

  const canonical =
    ALIASES[normalized] ??
    Object.keys({ ...ICONS, ...LOCAL_ICONS }).find(
      (key) => normalize(key) === normalized
    ) ??
    label.trim();

  const local = LOCAL_ICONS[canonical];
  if (local) return [local];

  const file = ICONS[canonical];
  if (!file) return [];

  return [
    `${DEVICON}/${file}`,
    `${GITHUB}/${file}`,
  ];
}

export function getTechIconUrl(
  label: string
): string | undefined {
  return getTechIconUrls(label)[0];
}