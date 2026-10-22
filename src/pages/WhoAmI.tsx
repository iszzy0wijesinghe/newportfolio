/** @format */

import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { careerJourney } from "../content/experience";
import { profile } from "../content/profile";
import "./WhoAmI.css";

import { getMotionSettings } from "../lib/motion";

gsap.registerPlugin(ScrollTrigger);

type Venture = {
  id: string;
  year: string;
  name: string;
  category: string;
  statement: string;
  description: string;
  logo: string;
  number: string;
};

const ventures: Venture[] = [
  {
    id: "motionarts",
    year: "2020",
    name: "MOTIONARTS LK",
    category: "DESIGN / CREATIVE DIRECTION",
    statement: "Where imagination became independence.",
    description:
      "My first independent creative venture. Founded in 2020, MOTIONARTS LK grew from a passion for design into a space for branding, visual identity, digital experiences, and creative direction.",
    logo: "/logos/motionarts.jpg",
    number: "01",
  },
  {
    id: "alohamora",
    year: "2022",
    name: "Alohamora Productions",
    category: "FILM / VISUAL STORYTELLING",
    statement: "Some stories are meant to be felt.",
    description:
      "Founded in 2022, Alohamora Productions brought my interest in storytelling into filmmaking. It became a place to explore direction, emotion, visual narratives, and the power of cinema.",
    logo: "/logos/alohamora.jpg",
    number: "02",
  },
  {
    id: "motiora",
    year: "2025",
    name: "Motiora Software Solutions",
    category: "SOFTWARE / TECHNOLOGY",
    statement: "From imagining possibilities to engineering them.",
    description:
      "Established in 2025, Motiora brings together software engineering, product thinking, and creative technology. It represents my ambition to develop useful digital solutions beyond my professional engineering role.",
    logo: "/logos/motiora.jpg",
    number: "03",
  },
  {
    id: "baura",
    year: "2026",
    name: "Baura",
    category: "FOOD / ENTREPRENEURSHIP",
    statement: "Creativity doesn't belong to one industry.",
    description:
      "Founded in 2026, Baura is my home bakery business. It represents a different kind of entrepreneurial challenge, bringing creativity, customer experience, and business thinking into the world of food.",
    logo: "/logos/baura.jpg",
    number: "04",
  },
];

const perspectives = [
  {
    number: "01",
    label: "THE BEGINNING",
    title: "Creativity taught me",
    emphasis: "to see differently.",
    description:
      "Before I wrote code, I explored ideas through design. I learned that the smallest decisions can shape how people experience something.",
  },
  {
    number: "02",
    label: "THE EVOLUTION",
    title: "Technology taught me",
    emphasis: "to make it real.",
    description:
      "Software engineering gave structure to my curiosity. It turned concepts into systems, experiments into products, and possibilities into practical solutions.",
  },
  {
    number: "03",
    label: "THE BIGGER PICTURE",
    title: "Business taught me",
    emphasis: "to think beyond.",
    description:
      "Building ventures across different industries taught me to look beyond the work itself—to understand people, opportunities, responsibility, and lasting value.",
  },
];

const education = [
  {
    period: "2023 — PRESENT",
    qualification: "BSc in Information Technology",
    institution: "Sri Lanka Institute of Information Technology (SLIIT)",
    number: "01",
  },
  {
    period: "2022 / 2023",
    qualification: "GCE Advanced Level",
    institution:
      "D.S. Senanayake College — Combined Mathematics, Chemistry and Physics",
    number: "02",
  },
  {
    period: "2019",
    qualification: "GCE Ordinary Level",
    institution:
      "Mahinda Rajapaksa College — 8 Distinctions and 1 Very Good pass",
    number: "03",
  },
];

export default function WhoAmI() {
  const pageRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineProgressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const motion = getMotionSettings();

    if (motion.reduced) return;

    const context = gsap.context(() => {
      const hero = heroRef.current;

      if (hero) {
        gsap.fromTo(
          ".who-hero-image img",
          { yPercent: -9, scale: 1.16 },
          {
            yPercent: 11,
            scale: 1.16,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          },
        );

        gsap.fromTo(
          ".who-hero-background-word",
          { yPercent: -12 },
          {
            yPercent: 35,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 1.4,
            },
          },
        );

        gsap.to(".who-hero-heading", {
          yPercent: -22,
          opacity: 0.25,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      gsap.utils
        .toArray<HTMLElement>("[data-who-reveal]")
        .forEach((element) => {
          gsap.fromTo(
            element,
            {
              autoAlpha: 0,
              y: 48,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 88%",
                once: true,
              },
            },
          );
        });

      gsap.utils.toArray<HTMLElement>(".who-perspective").forEach((element) => {
        const number = element.querySelector(".who-perspective-number");

        if (!number) return;

        gsap.fromTo(
          number,
          { x: -45, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 78%",
              once: true,
            },
          },
        );
      });

      if (timelineRef.current && timelineProgressRef.current) {
        gsap.fromTo(
          timelineProgressRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 65%",
              end: "bottom 65%",
              scrub: 0.6,
            },
          },
        );
      }

      gsap.utils.toArray<HTMLElement>(".who-timeline-item").forEach((item) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 72%",
          end: "bottom 30%",
          toggleClass: {
            targets: item,
            className: "is-active",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".who-venture").forEach((venture) => {
        const logo = venture.querySelector<HTMLElement>(".who-venture-logo");

        const year = venture.querySelector<HTMLElement>(".who-venture-year");

        const visual = venture.querySelector<HTMLElement>(
          ".who-venture-visual",
        );

        if (logo) {
          gsap.fromTo(
            logo,
            { yPercent: 18, scale: 0.9 },
            {
              yPercent: -18,
              scale: 1.06,
              ease: "none",
              scrollTrigger: {
                trigger: venture,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            },
          );
        }

        if (year) {
          gsap.fromTo(
            year,
            { yPercent: -35 },
            {
              yPercent: 35,
              ease: "none",
              scrollTrigger: {
                trigger: venture,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.8,
              },
            },
          );
        }

        if (visual) {
          gsap.fromTo(
            visual,
            { backgroundPosition: "50% 0%" },
            {
              backgroundPosition: "50% 100%",
              ease: "none",
              scrollTrigger: {
                trigger: venture,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
              },
            },
          );
        }
      });

      gsap.utils
        .toArray<HTMLElement>(".who-venture-statement")
        .forEach((statement) => {
          gsap.fromTo(
            statement,
            {
              y: 35,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: statement,
                start: "top 85%",
                once: true,
              },
            },
          );
        });
    }, page);

    return () => context.revert();
  }, []);

  return (
    <main className="who-page" ref={pageRef}>
      <section className="who-hero" ref={heroRef}>
        <div className="who-hero-image">
          <img
            src="/story/portrait-story.webp"
            alt="Portrait of Isindu Wijesinghe"
            fetchPriority="high"
          />
        </div>

        <div className="who-hero-shade" />

        <span className="who-hero-background-word" aria-hidden="true">
          BECOMING
        </span>

        <div className="who-hero-content">
          <div className="who-hero-topline">
            <span>ISINDU WIJESINGHE</span>
            <span>CHAPTER 01 / THE PERSON</span>
          </div>

          <div className="who-hero-heading">
            <p className="who-eyebrow">A STORY STILL BEING WRITTEN</p>

            <h1>
              I was never
              <br />
              building just
              <br />
              <span>a career.</span>
            </h1>

            <p className="who-hero-description">
              I was building a way of thinking.
            </p>
          </div>

          <div className="who-hero-bottom">
            <span>CREATIVITY / TECHNOLOGY / BUSINESS</span>

            <div>
              <span>SCROLL TO DISCOVER</span>
              <ArrowDown size={16} strokeWidth={1.4} />
            </div>
          </div>
        </div>
      </section>

      <section className="who-introduction">
        <div className="who-container">
          <div className="who-section-heading" data-who-reveal>
            <span className="who-section-number">01 / 06</span>
            <span className="who-section-line" />
            <span>BEYOND THE TITLE</span>
          </div>

          <div className="who-introduction-grid">
            <div data-who-reveal>
              <h2>
                Not one title.
                <br />
                <span>Not one path.</span>
              </h2>
            </div>

            <div className="who-introduction-copy" data-who-reveal>
              <p className="who-introduction-lead">
                I'm {profile.name}. A software engineer, creative thinker, and
                entrepreneur based in Sri Lanka.
              </p>

              <p>
                My journey didn't begin with a single plan. It grew from
                curiosity—from discovering how things look, how they work, and
                how they can become something meaningful.
              </p>

              <p>
                Somewhere between design, storytelling, engineering, and
                business, I realized that the most interesting ideas often exist
                between disciplines.
              </p>

              <Link to="/projects" className="who-inline-link">
                Explore what I build
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="who-mindset">
        <div className="who-container">
          <div className="who-section-heading" data-who-reveal>
            <span className="who-section-number">02 / 06</span>
            <span className="who-section-line" />
            <span>THE WAY I THINK</span>
          </div>

          <div className="who-mindset-heading" data-who-reveal>
            <p className="who-eyebrow">THREE PERSPECTIVES. ONE MINDSET.</p>

            <h2>
              Everything I learned
              <br />
              <span>changed how I see.</span>
            </h2>
          </div>

          <div className="who-perspectives">
            {perspectives.map((item) => (
              <article className="who-perspective" key={item.number}>
                <div className="who-perspective-number">{item.number}</div>

                <div className="who-perspective-content">
                  <span className="who-eyebrow" data-who-reveal>
                    {item.label}
                  </span>

                  <h3 data-who-reveal>
                    {item.title}
                    <br />
                    <span>{item.emphasis}</span>
                  </h3>

                  <p data-who-reveal>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="who-journey">
        <div className="who-container">
          <div className="who-section-heading" data-who-reveal>
            <span className="who-section-number">03 / 06</span>
            <span className="who-section-line" />
            <span>THE ROAD SO FAR</span>
          </div>

          <div className="who-journey-heading" data-who-reveal>
            <p className="who-eyebrow">A JOURNEY OF EXPLORATION</p>

            <h2>
              Every chapter
              <br />
              <span>left a mark.</span>
            </h2>

            <p>
              From my first creative projects to building enterprise software,
              each experience has shaped the way I approach the next challenge.
            </p>
          </div>

          <div className="who-timeline" ref={timelineRef}>
            <div className="who-timeline-track">
              <div
                className="who-timeline-progress"
                ref={timelineProgressRef}
              />
            </div>

            {careerJourney.map((item, index) => (
              <article
                className={`who-timeline-item ${
                  index % 2 === 0 ? "who-timeline-left" : "who-timeline-right"
                }`}
                key={item.id}>
                <div className="who-timeline-node" />

                <div className="who-timeline-card" data-who-reveal>
                  <div className="who-timeline-card-top">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span>{item.period}</span>
                  </div>

                  <div className="who-timeline-company">
                    <div className="who-timeline-company-logo">
                      <img
                        src={item.logo}
                        alt={`${item.company} logo`}
                        loading="lazy"
                      />
                    </div>

                    <div>
                      <p>{item.company}</p>
                      {item.employmentType && (
                        <span>{item.employmentType}</span>
                      )}
                    </div>
                  </div>

                  <h3>{item.role}</h3>

                  <p className="who-timeline-summary">{item.summary}</p>

                  {item.current && (
                    <span className="who-current-badge">CURRENT</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="who-legacy">
        <div className="who-container">
          <div className="who-section-heading" data-who-reveal>
            <span className="who-section-number">04 / 06</span>
            <span className="who-section-line" />
            <span>THE LEGACY I'M BUILDING</span>
          </div>

          <div className="who-legacy-intro" data-who-reveal>
            <span className="who-eyebrow">
              FOUR VENTURES. FOUR DIFFERENT WORLDS.
            </span>

            <h2>
              I didn't stop
              <br />
              at ideas.
              <br />
              <span>I started building them.</span>
            </h2>

            <div className="who-legacy-intro-bottom">
              <p>
                Design. Cinema. Technology. Food. Different industries, but the
                same curiosity to create something meaningful.
              </p>

              <span>2020 — PRESENT</span>
            </div>
          </div>
        </div>

        <div className="who-ventures">
          {ventures.map((venture, index) => (
            <article
              className={`who-venture ${
                index % 2 === 1 ? "who-venture-reverse" : ""
              }`}
              key={venture.id}>
              <div className="who-venture-visual">
                <span className="who-venture-year" aria-hidden="true">
                  {venture.year}
                </span>

                <div className="who-venture-logo">
                  <img
                    src={venture.logo}
                    alt={`${venture.name} logo`}
                    loading="lazy"
                  />
                </div>

                <div className="who-venture-visual-bottom">
                  <span>{venture.number} / 04</span>
                  <span>ESTABLISHED {venture.year}</span>
                </div>
              </div>

              <div className="who-venture-story">
                <div className="who-venture-story-inner">
                  <span className="who-eyebrow" data-who-reveal>
                    {venture.category}
                  </span>

                  <h3 data-who-reveal>{venture.name}</h3>

                  <p className="who-venture-statement">{venture.statement}</p>

                  <p className="who-venture-description" data-who-reveal>
                    {venture.description}
                  </p>

                  <div className="who-venture-story-footer">
                    <span>FOUNDED IN {venture.year}</span>
                    <span>{venture.number} — 04</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="who-education">
        <div className="who-container">
          <div className="who-section-heading" data-who-reveal>
            <span className="who-section-number">05 / 06</span>
            <span className="who-section-line" />
            <span>ALWAYS LEARNING</span>
          </div>

          <div className="who-education-heading" data-who-reveal>
            <p className="who-eyebrow">KNOWLEDGE NEVER STANDS STILL</p>

            <h2>
              Learning isn't
              <br />
              <span>a finished chapter.</span>
            </h2>
          </div>

          <div className="who-education-list">
            {education.map((item) => (
              <article
                className="who-education-item"
                key={item.number}
                data-who-reveal>
                <span className="who-education-number">{item.number}</span>

                <div>
                  <span className="who-education-period">{item.period}</span>

                  <h3>{item.qualification}</h3>
                  <p>{item.institution}</p>
                </div>

                <ArrowUpRight size={22} strokeWidth={1.2} aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="who-ending">
        <div className="who-container">
          <div className="who-section-heading" data-who-reveal>
            <span className="who-section-number">06 / 06</span>
            <span className="who-section-line" />
            <span>THE NEXT CHAPTER</span>
          </div>

          <div className="who-ending-content" data-who-reveal>
            <p className="who-eyebrow">STILL CURIOUS. STILL BUILDING.</p>

            <h2>
              This isn't
              <br />
              <span>the conclusion.</span>
            </h2>

            <p>
              There's always another idea to explore, another problem to solve,
              and another opportunity to create something meaningful.
            </p>

            <div className="who-ending-links">
              <Link to="/projects" className="who-ending-primary">
                Explore my work
                <ArrowUpRight size={19} />
              </Link>

              <a
                href={profile.resumeUrl}
                download
                className="who-ending-secondary">
                Download résumé
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
