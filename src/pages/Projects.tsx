
import { useMemo, useState } from "react";
import Reveal from "../components/Reveal";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../content/projects";

export default function Projects() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    "React",
    "ASP.NET",
    "Node",
    "Mongo"
  ];

  const filtered = useMemo(
    () =>
      projects.filter((p) => {
        const haystack = [
          p.title,
          p.short,
          p.description,
          p.tech.join(" ")
        ].join(" ").toLowerCase();

        const selected =
          category === "All" ||
          haystack.includes(category.toLowerCase());

        return (
          selected &&
          haystack.includes(query.toLowerCase().trim())
        );
      }),
    [query, category]
  );

  return (
    <div className="container-wide interior-page">
      <Reveal>
        <p className="eyebrow">CHAPTER 02 / THE WORK</p>

        <h1 className="page-title">
          Ideas become <em>interfaces.</em>
          <br />
          Interfaces become impact.
        </h1>

        <p className="page-lead">
          A growing collection of products, systems,
          experiments and carefully considered details.
        </p>
      </Reveal>

      <div className="work-filter">
        <div
          className="filter-tabs"
          role="group"
          aria-label="Filter projects by technology"
        >
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={
                category === item ? "is-active" : ""
              }
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <label className="search-label">
          <span className="sr-only">Search projects</span>

          <input
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
            placeholder="Search work…"
          />
        </label>
      </div>

      <div className="work-grid">
        {filtered.map((p, i) => (
          <Reveal
            key={p.id}
            delay={(i % 2) * 70}
          >
            <ProjectCard p={p} index={i} />
          </Reveal>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="empty-state">
          No matching work. Try another search or category.
        </p>
      )}
    </div>
  );
}
