
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "../content/projects";

export default function ProjectCard({
  p,
  index = 0
}: {
  p: Project;
  index?: number;
}) {
  return (
    <Link
      className="project-card"
      to={`/projects/${p.id}`}
    >
      <div className="project-cover">
        {p.images[0] ? (
          <img
            src={p.images[0]}
            alt={`${p.title} interface preview`}
            loading="lazy"
          />
        ) : (
          <span className="project-fallback">
            {p.title}
          </span>
        )}

        <span className="project-open" aria-hidden="true">
          <ArrowUpRight size={23} />
        </span>
      </div>

      <div className="project-meta">
        <span>
          CASE STUDY / {String(index + 1).padStart(2, "0")}
        </span>
        <span>{p.tech.slice(0, 2).join(" · ")}</span>
      </div>

      <div className="project-heading">
        <h3>{p.title}</h3>
        <ArrowUpRight size={22} aria-hidden="true" />
      </div>

      <p>{p.short}</p>
    </Link>
  );
}
