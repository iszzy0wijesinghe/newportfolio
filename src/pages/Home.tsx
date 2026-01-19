import { Link } from "react-router-dom";
import { profile } from "../content/profile";
import { projects } from "../content/projects";
import ProjectCard from "../components/ProjectCard";
import TypewriterLoop from "../components/TypewriterLoop";

export default function Home() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="space-y-14">
      <section className="grid lg:grid-cols-[1.2fr_.8fr] gap-8 items-center">
        <div>
          <p className="text-sm text-[rgb(var(--muted))]">
            {profile.district} • {profile.location}
          </p>

          <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">
            <TypewriterLoop
              lines={profile.taglines}
              typeSpeedMs={44}
              deleteSpeedMs={22}
              startDelayMs={250}
              holdMs={1400}
              betweenMs={300}
            />
          </h1>

          <p className="mt-4 text-[15px] leading-6 text-[rgb(var(--muted))] max-w-xl">
            Passionate • Determined • Relentless
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={profile.resumeUrl}
              className="px-4 py-2 rounded-xl bg-[rgb(var(--fg))] text-[rgb(var(--bg))] hover:opacity-90 transition text-sm"
            >
              Download Resume
            </a>
            <Link
              to="/who-am-i"
              className="px-4 py-2 rounded-xl border border-[rgb(var(--border))] hover:bg-[rgb(var(--card))] transition text-sm"
            >
              About Me
            </Link>
            <Link
              to="/hire-me"
              className="px-4 py-2 rounded-xl border border-[rgb(var(--border))] hover:bg-[rgb(var(--card))] transition text-sm"
            >
              Hire / Freelance
            </Link>
          </div>
        </div>

        {/* If the image is in /public/me.webp */}
        <div className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] shadow-soft overflow-hidden">
          <img
            src="/me.webp"
            alt="Iszzy portrait"
            className="block w-full h-auto"
            loading="lazy"
          />
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl font-semibold">Featured Projects</h2>
          <Link
            to="/projects"
            className="text-sm text-[rgb(var(--muted))] hover:underline"
          >
            View all
          </Link>
        </div>

        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((p) => (
            <ProjectCard key={p.slug} p={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
