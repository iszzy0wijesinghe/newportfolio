
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../components/Reveal";
import StoryVisual from "../components/StoryVisual";
import { careerJourney, motiora } from "../content/experience";
import { profile } from "../content/profile";

export default function WhoAmI() {
  return (
    <div className="container-wide interior-page">
      <Reveal>
        <p className="eyebrow">CHAPTER 01 / THE PERSON</p>

        <h1 className="page-title">
          Not just a developer.
          <br />
          <em>A maker at heart.</em>
        </h1>

        <p className="page-lead">
          I’m {profile.name}, a software engineer and creative
          thinker based in Sri Lanka. My journey started in
          design, moved through storytelling, and found
          another language in code.
        </p>
      </Reveal>

      <div className="about-portrait-grid">
        <Reveal>
          <StoryVisual
            src="/story/portrait-story.webp"
            index="03"
            label="MORE THAN A JOB TITLE"
            alt="Portrait of Isindu Wijesinghe"
          />
        </Reveal>

        <Reveal className="about-essay">
          <span className="eyebrow">
            WHERE IT ALL CONNECTS
          </span>

          <h2>
            Curiosity was always <em>the through line.</em>
          </h2>

          <p>
            I started by shaping how things look and feel.
            Graphic design taught me composition, empathy
            and attention to detail. Creative direction taught
            me how to tell stories. Software engineering taught
            me to make those stories useful, robust and real.
          </p>

          <p>
            Today, as an Associate Software Engineer at LAUGFS
            Holdings, I work on enterprise applications and
            full-stack solutions. Outside that, I keep exploring
            the space between technology, creative thinking
            and independent products.
          </p>

          <Link className="inline-arrow" to="/projects">
            See what I’m building
            <ArrowUpRight size={20} />
          </Link>
        </Reveal>
      </div>

      <section className="subsection">
        <Reveal>
          <p className="eyebrow">THE ROAD SO FAR</p>

          <h2 className="section-title">
            Every chapter <em>left a mark.</em>
          </h2>
        </Reveal>

        <div className="timeline">
          {careerJourney.map((item, i) => (
            <Reveal key={item.id}>
              <div className="timeline-row">
                <span className="timeline-number">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div>
                  <span className="timeline-period">
                    {item.period}
                  </span>

                  <h3>{item.role}</h3>
                  <p>{item.company}</p>
                  <small>{item.summary}</small>
                </div>

                <span className="timeline-dot" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="subsection education-section">
        <Reveal>
          <p className="eyebrow">
            STILL LEARNING. ALWAYS.
          </p>

          <h2 className="section-title">
            Education <em>& beyond.</em>
          </h2>
        </Reveal>

        <div className="education-grid">
          <Reveal>
            <article className="simple-panel">
              <span>2023 — PRESENT</span>
              <h3>BSc in Information Technology</h3>
              <p>
                Sri Lanka Institute of Information Technology
                (SLIIT)
              </p>
            </article>
          </Reveal>

          <Reveal>
            <article className="simple-panel">
              <span>2022/23</span>
              <h3>GCE Advanced Level</h3>
              <p>
                D.S. Senanayake College — Combined Maths,
                Chemistry, Physics
              </p>
            </article>
          </Reveal>

          <Reveal>
            <article className="simple-panel">
              <span>2019</span>
              <h3>GCE Ordinary Level</h3>
              <p>
                Mahinda Rajapaksa College — 8 Distinctions
                and 1 Very Good pass
              </p>
            </article>
          </Reveal>
        </div>

        <Reveal>
          <div className="motiora-note">
            <p className="eyebrow">
              INDEPENDENT EXPLORATION
            </p>

            <h3>{motiora.name}</h3>
            <p>{motiora.summary}</p>
          </div>
        </Reveal>
      </section>

      <Reveal>
        <div className="page-end">
          <p>
            That is the beginning. <em>Not the conclusion.</em>
          </p>

          <a
            href={profile.resumeUrl}
            download
            className="button button-primary"
          >
            Download my résumé
            <ArrowUpRight size={18} />
          </a>
        </div>
      </Reveal>
    </div>
  );
}
