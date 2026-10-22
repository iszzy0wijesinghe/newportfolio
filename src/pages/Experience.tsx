
import Reveal from "../components/Reveal";
import { experience } from "../content/experience";

export default function Experience() {
  return (
    <div className="container-wide interior-page">
      <Reveal>
        <p className="eyebrow">
          CHAPTER 03 / THE JOURNEY
        </p>

        <h1 className="page-title">
          A path made of <em>curiosity.</em>
        </h1>

        <p className="page-lead">
          Design, entrepreneurship, storytelling and software
          engineering. Each chapter added a new perspective.
        </p>
      </Reveal>

      <div className="experience-list">
        {experience.map((item, i) => (
          <Reveal key={item.id}>
            <article className="experience-entry">
              <div className="experience-aside">
                <span className="eyebrow">
                  {String(i + 1).padStart(2, "0")} / EXPERIENCE
                </span>

                <span>{item.period}</span>

                {item.logo && (
                  <img
                    src={item.logo}
                    alt=""
                    loading="lazy"
                  />
                )}
              </div>

              <div className="experience-body">
                <div className="experience-heading">
                  <h2>{item.role}</h2>

                  {item.current && (
                    <span className="current-indicator">
                      CURRENT
                    </span>
                  )}
                </div>

                <p className="experience-company">
                  {item.company} · {item.location}
                </p>

                <p>{item.summary}</p>

                <details>
                  <summary>
                    Explore responsibilities
                  </summary>

                  <ul>
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </details>

                <div className="chip-list">
                  {item.tech?.slice(0, 7).map((tech) => (
                    <span key={tech} className="chip">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
