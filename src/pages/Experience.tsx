/** @format */

import Reveal from "../components/Reveal";
import { experience } from "../content/experience";
import TechChip from "../content/TechChip";

export default function Experience() {
  return (
    <div className="space-y-8">
      <Reveal>
        <h1 className="text-2xl font-semibold">Experience</h1>
        <p className="mt-2 text-sm text-[rgb(var(--muted))] max-w-2xl">
          I don’t just “work on tasks” — I ship features that feel clean, fast, and reliable. From building responsive UIs to handling real-world state, edge cases, and performance, my focus is always the same: make the product feel effortless for the user. I collaborate with teams, follow disciplined Git workflows, and deliver improvements in small, safe iterations — because great software isn’t just built, it’s refined.
        </p>
      </Reveal>

      <div className="grid gap-4">
        {experience.map((e) => (
          <Reveal key={`${e.company}-${e.role}`}>
            <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] p-5">
              <div className="flex flex-col gap-1">
                <div className="text-sm font-semibold">{e.role}</div>
                <div className="text-sm text-[rgb(var(--muted))]">
                  {e.company} • {e.period}
                </div>
                {e.location ? (
                  <div className="text-xs text-[rgb(var(--muted))]">{e.location}</div>
                ) : null}
              </div>

              <ul className="mt-4 grid gap-2 text-sm text-[rgb(var(--muted))] list-disc pl-5 leading-6">
                {e.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>

              {e.tech?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {e.tech.map((t) => (
                    <TechChip key={t} label={t} />
                  ))}
                </div>
              ) : null}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
