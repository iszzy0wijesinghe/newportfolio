/** @format */

import { Link } from "react-router-dom";
import type { Project } from "../content/projects";
import TechChip from "../content/TechChip"; // ✅ change if your TechChip is in components

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <Link
      to={`/projects/${p.id}`}
      className="block rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] hover:bg-[rgb(var(--card))] transition p-4"
    >
      <div className="text-sm font-semibold">{p.title}</div>
      <div className="mt-1 text-sm text-[rgb(var(--muted))] line-clamp-2">
        {p.short}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {p.tech.slice(0, 3).map((t) => (
          <TechChip key={t} label={t} />
        ))}
      </div>
    </Link>
  );
}



// import { Link } from "react-router-dom";
// import type { Project } from "../content/projects";
// import TechChip from "../content/TechChip";

// export default function ProjectCard({ p }: { p: Project }) {
//   return (
//     <Link
//       to={`/projects/${p.slug}`}
//       className="block rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] hover:bg-[rgb(var(--card))] transition p-4"
//     >
//       <div className="text-sm font-semibold">{p.title}</div>
//       <div className="mt-1 text-sm text-[rgb(var(--muted))] line-clamp-2">
//         {p.short}
//       </div>

//       <div className="mt-3 flex flex-wrap gap-2">
//         {p.tech.slice(0, 3).map((t) => (
//           <TechChip key={t} label={t} />
//         ))}
//       </div>
//     </Link>
//   );
// }


