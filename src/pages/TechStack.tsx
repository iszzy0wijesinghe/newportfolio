
import Reveal from "../components/Reveal";
import SocialLinks from "../components/SocialLinks";
import TechChip from "../content/TechChip";
import { techStack } from "../content/tech";

export default function TechStack() {
  return (
    <div className="space-y-10">
      <Reveal>
        <h1 className="text-2xl font-semibold">Tech Stack</h1>

        <p className="mt-2 text-sm text-[rgb(var(--muted))]">
          The languages, frameworks, databases, cloud platforms,
          development tools, and creative applications I work with
          across enterprise applications, personal projects,
          and ongoing technical learning.
        </p>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-2">
        {techStack.map((group) => (
          <Reveal key={group.title}>
            <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] p-5">
              <div className="text-sm font-semibold">
                {group.title}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <TechChip
                    key={item}
                    label={item}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 shadow-soft">
        <div className="text-sm font-semibold">
          Find me online
        </div>

        <p className="mt-2 text-sm text-[rgb(var(--muted))]">
          Explore my projects, source code, and professional work.
        </p>

        <div className="mt-4">
          <SocialLinks />
        </div>
      </Reveal>
    </div>
  );
}