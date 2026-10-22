
import Reveal from "../components/Reveal";
import { techStack } from "../content/tech";
import TechChip from "../content/TechChip";

export default function TechStack() {
  return (
    <div className="container-wide interior-page">
      <Reveal>
        <p className="eyebrow">
          CHAPTER 04 / THE TOOLKIT
        </p>

        <h1 className="page-title">
          One mind.
          <br />
          <em>Many mediums.</em>
        </h1>

        <p className="page-lead">
          The language changes from project to project.
          The thinking behind the work stays the same:
          make it useful, elegant and dependable.
        </p>
      </Reveal>

      <div className="toolkit-grid">
        {techStack.map((group, i) => (
          <Reveal
            key={group.title}
            delay={(i % 3) * 70}
          >
            <section className="toolkit-panel">
              <span className="eyebrow">
                {String(i + 1).padStart(2, "0")}
                / DISCIPLINE
              </span>

              <h2>{group.title}</h2>

              <div className="chip-list">
                {group.items.map((item) => (
                  <TechChip
                    key={item}
                    label={item}
                  />
                ))}
              </div>
            </section>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
