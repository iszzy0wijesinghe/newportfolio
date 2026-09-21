
import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { profile } from "../content/profile";
import { careerJourney, motiora, type ExperienceItem } from "../content/experience";
import { useSettings } from "../app/settings";
import Reveal from "../components/Reveal";
import SocialLinks from "../components/SocialLinks";
import "../styles/whoami-journey.css";

function CompanyLogo({
  name,
  logo,
  initials,
}: {
  name: string;
  logo: string;
  initials: string;
}) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [logo]);

  return (
    <div className="journey-logo">
      {logo && !failed ? (
        <img
          src={logo}
          alt={`${name} logo`}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}

function JourneyMilestone({
  item,
  visible,
  active,
}: {
  item: ExperienceItem;
  visible: boolean;
  active: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const detailsId = useId();

  return (
    <li
      data-journey-id={item.id}
      className={`journey-entry ${visible ? "is-visible" : ""} ${active ? "is-active" : ""}`}
    >
      <div className="journey-date">
        <span>{item.period}</span>
      </div>

      <div className="journey-node" aria-hidden="true">
        <span />
      </div>

      <article className="journey-content">
        <div className="journey-heading">
          <CompanyLogo
            name={item.company}
            logo={item.logo}
            initials={item.initials}
          />

          <div className="journey-heading-text">
            <div className="journey-heading-top">
              <h3 className="journey-role">{item.role}</h3>

              {item.featured && (
                <span className="journey-promotion">
                  Promoted from Intern
                </span>
              )}
            </div>

            <div className="journey-company">
              {item.companyUrl ? (
                <a
                  href={item.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="journey-company-link"
                >
                  {item.company}
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              ) : (
                <span>{item.company}</span>
              )}

              {item.employmentType && (
                <span className="journey-employment">
                  · {item.employmentType}
                </span>
              )}
            </div>

            <p className="journey-mobile-date">
              {item.period}
            </p>

            {item.location && (
              <p className="journey-location">
                {item.location}
              </p>
            )}
          </div>
        </div>

        <p className="journey-summary">
          {item.summary}
        </p>

        {item.bullets.length > 0 && (
          <div className="journey-details">
            <button
              type="button"
              className="journey-expand"
              aria-expanded={expanded}
              aria-controls={detailsId}
              onClick={() => setExpanded((value) => !value)}
            >
              <span>
                {expanded ? "Hide details" : "Explore this chapter"}
              </span>
              <ChevronDown
                size={16}
                className={`journey-chevron ${expanded ? "is-open" : ""}`}
                aria-hidden="true"
              />
            </button>

            <div
              id={detailsId}
              className={`journey-expandable ${expanded ? "is-open" : ""}`}
              aria-hidden={!expanded}
            >
              <div className="journey-expandable-inner">
                <ul className="journey-bullets">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>

                {item.tech && item.tech.length > 0 && (
                  <div className="journey-skills">
                    <p>Skills & Technologies</p>
                    <div>
                      {item.tech.map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </article>
    </li>
  );
}

function MyJourney() {
  const timelineRef = useRef<HTMLOListElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const [visibleIds, setVisibleIds] = useState<Set<string>>(
    () => new Set()
  );
  const [activeId, setActiveId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const { settings } = useSettings();

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const entries = Array.from(
      timeline.querySelectorAll<HTMLElement>(".journey-entry")
    );

    const reducedMotion =
      settings.reduceMotion ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      setVisibleIds(new Set(careerJourney.map((item) => item.id)));
      return;
    }

    const observer = new IntersectionObserver(
      (observedEntries) => {
        const newlyVisible = observedEntries
          .filter((entry) => entry.isIntersecting)
          .map((entry) =>
            (entry.target as HTMLElement).dataset.journeyId
          )
          .filter((id): id is string => Boolean(id));

        if (newlyVisible.length === 0) return;

        setVisibleIds((previous) => {
          const next = new Set(previous);
          newlyVisible.forEach((id) => next.add(id));
          return next;
        });

        observedEntries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    entries.forEach((entry) => observer.observe(entry));

    return () => observer.disconnect();
  }, [settings.reduceMotion]);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const entries = Array.from(
      timeline.querySelectorAll<HTMLElement>(".journey-entry")
    );

    const rail = timeline.querySelector<HTMLElement>(".journey-rail");
    if (!rail || entries.length === 0) return;

    const update = () => {
      frameRef.current = null;

      const anchor = window.innerHeight * 0.48;
      const railRect = rail.getBoundingClientRect();
      const timelineRect = timeline.getBoundingClientRect();

      const nextProgress = Math.max(
        0,
        Math.min(
          1,
          (anchor - railRect.top) / Math.max(railRect.height, 1)
        )
      );

      setProgress((previous) =>
        Math.abs(previous - nextProgress) < 0.002
          ? previous
          : nextProgress
      );

      if (
        timelineRect.top > window.innerHeight * 0.9 ||
        timelineRect.bottom < window.innerHeight * 0.1
      ) {
        setActiveId(null);
        return;
      }

      let closestId: string | null = null;
      let closestDistance = Infinity;

      entries.forEach((entry) => {
        const marker = entry.querySelector<HTMLElement>(".journey-node");
        if (!marker) return;

        const rect = marker.getBoundingClientRect();
        const distance = Math.abs(
          rect.top + rect.height / 2 - anchor
        );

        if (distance < closestDistance) {
          closestDistance = distance;
          closestId = entry.dataset.journeyId ?? null;
        }
      });

      setActiveId(closestId);
    };

    const requestUpdate = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(update);
    };

    requestUpdate();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <section id="my-journey" className="scroll-mt-24">
      <Reveal>
        <h2 className="text-xl font-semibold">My Journey</h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[rgb(var(--muted))]">
          From my first freelance design projects to developing enterprise
          applications, each chapter has shaped how I think, create, and build.
        </p>
      </Reveal>

      <ol
        ref={timelineRef}
        className="journey-timeline mt-9"
        aria-label="My professional journey"
      >
        <div className="journey-rail" aria-hidden="true">
          <span
            className="journey-rail-progress"
            style={{ height: `${progress * 100}%` }}
          />
        </div>

        {careerJourney.map((item) => (
          <JourneyMilestone
            key={item.id}
            item={item}
            visible={visibleIds.has(item.id)}
            active={activeId === item.id}
          />
        ))}
      </ol>

      <Reveal>
        <div className="journey-ending">
          <span className="journey-ending-dot" />
          <span>And the journey continues.</span>
        </div>
      </Reveal>
    </section>
  );
}

export default function WhoAmI() {
  return (
    <div className="space-y-10">
      <Reveal>
        <h1 className="text-2xl font-semibold">Who Am I</h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-[rgb(var(--muted))]">
          I’m{" "}
          <span className="font-medium text-[rgb(var(--fg))]">
            {profile.name}
          </span>
          , an{" "}
          <span className="font-medium text-[rgb(var(--fg))]">
            {profile.role}
          </span>{" "}
          at {profile.company}, based in {profile.location}.
        </p>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-[rgb(var(--muted))]">
          My professional journey began with graphic design and expanded into
          creative direction, entrepreneurship, and software engineering.
          Today, I develop enterprise applications and full-stack solutions
          while continuing to explore the intersection of technology and design.
        </p>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-[rgb(var(--muted))]">
          Following my internship at LAUGFS Holdings, I was promoted to
          Associate Software Engineer in March 2026. Alongside my professional
          career, I’m pursuing a BSc in Information Technology at SLIIT.
        </p>
      </Reveal>

      <Reveal className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 shadow-soft">
        <div className="grid items-center gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <img
            src="/me2.webp"
            alt="Isindu Wijesinghe"
            className="block h-auto w-full rounded-2xl border border-[rgb(var(--border))]"
            loading="lazy"
          />

          <div>
            <div className="text-sm font-semibold">Education</div>

            <ul className="mt-3 space-y-2 text-sm leading-6 text-[rgb(var(--muted))]">
              <li>
                •{" "}
                <span className="font-medium text-[rgb(var(--fg))]">
                  BSc in Information Technology
                </span>{" "}
                (Specializing in IT) — Sri Lanka Institute of Information
                Technology (SLIIT),{" "}
                <span className="font-medium">2023 – Present</span>
              </li>

              <li>
                •{" "}
                <span className="font-medium text-[rgb(var(--fg))]">
                  GCE Advanced Level
                </span>{" "}
                — D.S. Senanayake College (Colombo 07),{" "}
                <span className="font-medium">2022/23</span>{" "}
                <span className="block sm:inline">
                  • Subjects: Combined Maths, Chemistry, Physics
                </span>
              </li>

              <li>
                •{" "}
                <span className="font-medium text-[rgb(var(--fg))]">
                  GCE Ordinary Level
                </span>{" "}
                — Mahinda Rajapaksa College (Homagama),{" "}
                <span className="font-medium">2019</span>{" "}
                <span className="block sm:inline">
                  • 8 Distinctions + 1 Very Good pass
                </span>
              </li>
            </ul>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={profile.resumeUrl}
                className="rounded-xl bg-[rgb(var(--fg))] px-4 py-2 text-sm text-[rgb(var(--bg))] transition hover:opacity-90"
              >
                Download Resume
              </a>

              <Link
                to="/projects"
                className="rounded-xl border border-[rgb(var(--border))] px-4 py-2 text-sm transition hover:bg-[rgb(var(--bg))]"
              >
                See Projects
              </Link>
            </div>

            <div className="mt-5">
              <SocialLinks />
            </div>
          </div>
        </div>
      </Reveal>

      <MyJourney />

      <Reveal>
        <section className="border-t border-[rgb(var(--border))] pt-8">
          <h2 className="text-xl font-semibold">
            Motiora Software Solutions
          </h2>

          <div className="mt-5 flex items-start gap-4">
            <CompanyLogo
              name={motiora.name}
              logo={motiora.logo}
              initials={motiora.initials}
            />

            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold">
                {motiora.name}
              </h3>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[rgb(var(--muted))]">
                {motiora.summary}
              </p>

              {motiora.website && (
                <a
                  href={motiora.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm font-medium hover:underline"
                >
                  Visit website ↗
                </a>
              )}
            </div>
          </div>
        </section>
      </Reveal>
    </div>
  );
}