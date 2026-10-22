
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Reveal from "../components/Reveal";
import { projectDetailsById } from "../content/projects";

export default function ProjectDetail() {
  const { id } = useParams();
  const number = Number(id);

  const project = Number.isInteger(number)
    ? projectDetailsById[number]
    : undefined;

  if (!project) {
    return (
      <div className="container-wide interior-page">
        <h1 className="page-title">
          Project <em>not found.</em>
        </h1>

        <Link className="inline-arrow" to="/projects">
          Back to work
          <ArrowLeft size={20} />
        </Link>
      </div>
    );
  }

  return (
    <div className="container-wide interior-page case-page">
      <Reveal>
        <Link className="back-link" to="/projects">
          <ArrowLeft size={17} />
          ALL WORK
        </Link>

        <p className="eyebrow">
          SELECTED CASE STUDY / {String(number).padStart(2, "0")}
        </p>

        <h1 className="page-title">
          {project.title}
          <span className="headline-dot">.</span>
        </h1>

        <p className="page-lead">
          {project.category}
        </p>

        <div className="case-actions">
          {project.liveDemo && (
            <a
              className="button button-primary"
              href={project.liveDemo}
              target="_blank"
              rel="noreferrer"
            >
              Explore live demo
              <ArrowUpRight size={18} />
            </a>
          )}

          {project.githubRepo && (
            <a
              className="button button-outline"
              href={project.githubRepo}
              target="_blank"
              rel="noreferrer"
            >
              View source
              <ArrowUpRight size={18} />
            </a>
          )}
        </div>
      </Reveal>

      {project.uiImages[0] && (
        <Reveal className="case-hero-image">
          <img
            src={project.uiImages[0]}
            alt={`${project.title} application screenshot`}
          />
        </Reveal>
      )}

      <div className="case-story">
        <Reveal>
          <div>
            <p className="eyebrow">THE CHALLENGE</p>
            <h2>
              Where it <em>began.</em>
            </h2>
          </div>

          <p>{project.problem || project.description}</p>
        </Reveal>

        <Reveal>
          <div>
            <p className="eyebrow">THE RESPONSE</p>
            <h2>
              What we <em>built.</em>
            </h2>
          </div>

          <p>{project.description}</p>
        </Reveal>
      </div>

      {project.highlights && (
        <Reveal>
          <section className="case-highlights">
            <p className="eyebrow">WHAT MATTERS</p>

            <h2 className="section-title">
              The details <em>inside.</em>
            </h2>

            <ul>
              {project.highlights.map((feature) => (
                <li key={feature}>
                  {feature}
                </li>
              ))}
            </ul>
          </section>
        </Reveal>
      )}

      <Reveal>
        <section className="case-stack">
          <span className="eyebrow">BUILT WITH</span>

          <div className="chip-list">
            {project.techStack.map((tech) => (
              <span className="chip" key={tech}>
                {tech}
              </span>
            ))}
          </div>
        </section>
      </Reveal>

      {project.uiImages.length > 1 && (
        <section className="case-gallery">
          <Reveal>
            <p className="eyebrow">A CLOSER LOOK</p>

            <h2 className="section-title">
              A system <em>in motion.</em>
            </h2>
          </Reveal>

          <div>
            {project.uiImages.slice(1).map((src, index) => (
              <Reveal key={src}>
                <img
                  loading="lazy"
                  src={src}
                  alt={`${project.title} screen ${index + 2}`}
                />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {project.structureImages.length > 0 && (
        <section className="case-gallery">
          <Reveal>
            <p className="eyebrow">UNDER THE HOOD</p>

            <h2 className="section-title">
              The <em>architecture.</em>
            </h2>
          </Reveal>

          <div>
            {project.structureImages.map((src, index) => (
              <Reveal key={src}>
                <img
                  loading="lazy"
                  src={src}
                  alt={`${project.title} architecture visual ${index + 1}`}
                />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <Reveal>
        <div className="page-end">
          <p>
            On to the <em>next idea.</em>
          </p>

          <Link
            className="button button-primary"
            to="/projects"
          >
            More projects
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
