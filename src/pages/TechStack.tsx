/** @format */

import Reveal from "../components/Reveal";
import { techStack } from "../content/tech";
import SocialLinks from "../components/SocialLinks";
import { getTechIconUrl } from "../content/techIcons";

function TechChip({ label }: { label: string }) {
  const src = getTechIconUrl(label.trim());

  return (
    <span className="inline-flex items-center gap-2 text-xs px-2 py-1 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))]">
      {src ? (
        <img
          src={src}
          alt=""
          aria-hidden="true"
          className="w-[14px] h-[14px] shrink-0"
          loading="lazy"
          onError={(e) => {
            // hide broken icons cleanly (no layout jump)
            e.currentTarget.style.display = "none";
          }}
        />
      ) : null}
      <span>{label}</span>
    </span>
  );
}

export default function TechStack() {
  return (
    <div className="space-y-10">
      <Reveal>
        <h1 className="text-2xl font-semibold">Tech Stack</h1>
        <p className="mt-2 text-sm text-[rgb(var(--muted))]">
          This is the toolkit I trust to build modern products — fast UI, clean architecture, and dependable delivery. I focus on tools that keep projects scalable, maintainable, and smooth for real users.
        </p>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-4">
        {techStack.map((g) => (
          <Reveal key={g.title}>
            <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] p-5">
              <div className="text-sm font-semibold">{g.title}</div>

              <div className="mt-3 flex flex-wrap gap-2">
                {g.items.map((i) => (
                  <TechChip key={i} label={i} />
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 shadow-soft">
        <div className="text-sm font-semibold">Find me online</div>
        <p className="mt-2 text-sm text-[rgb(var(--muted))]">
          GitHub shows my real work and folder structures.
        </p>
        <div className="mt-4">
          <SocialLinks />
        </div>
      </Reveal>
    </div>
  );
}
