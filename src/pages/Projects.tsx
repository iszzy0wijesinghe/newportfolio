import { useMemo, useState } from "react";
import { projects } from "../content/projects";
import ProjectCard from "../components/ProjectCard";
import Reveal from "../components/Reveal";

export default function Projects() {
  const [q, setQ] = useState("");
  const [tech, setTech] = useState<string>("");

  const allTech = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.tech.forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesQuery =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.short.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query);
      const matchesTech = !tech || p.tech.includes(tech);
      return matchesQuery && matchesTech;
    });
  }, [q, tech]);

  return (
    <div className="space-y-8">
      <Reveal>
        <h1 className="text-2xl font-semibold">Projects</h1>
        <p className="mt-2 text-sm text-[rgb(var(--muted))]">
         Every project here is a small story, a problem I cared about, a solution I shaped, and a product I refined with clean UI, solid architecture, and real-world development habits. Click on any project to open a full project details (demo, repo, images, structure).
        </p>
      </Reveal>

      <Reveal className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4">
        <div className="grid md:grid-cols-2 gap-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search projects…"
            className="w-full rounded-xl border border-[rgb(var(--border))] px-3 py-2 bg-[rgb(var(--bg))] text-sm"
          />
          <select
            value={tech}
            onChange={(e) => setTech(e.target.value)}
            className="w-full rounded-xl border border-[rgb(var(--border))] px-3 py-2 bg-[rgb(var(--bg))] text-sm"
          >
            <option value="">Filter by tech (all)</option>
            {allTech.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p) => (
          <Reveal key={p.slug}>
            <ProjectCard p={p} />
          </Reveal>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-sm text-[rgb(var(--muted))]">No projects found.</div>
      )}
    </div>
  );
}
