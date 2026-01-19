import { Link, useLocation } from "react-router-dom";
import { profile } from "../content/profile";
import SocialLinks from "./SocialLinks";

const pages = [
  { label: "Who Am I", to: "/who-am-i" },
  { label: "Projects", to: "/projects" },
  { label: "Certificates", to: "/certificates" },
  { label: "Experience", to: "/experience" },
  { label: "Tech", to: "/tech" },
  { label: "Hire Me", to: "/hire-me" },
];

export default function Footer() {
  const { pathname } = useLocation();

  return (
    <footer className="border-t border-[rgb(var(--border))]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-8 md:grid-cols-[1.2fr_.8fr] items-start">
          <div>
            <div className="font-semibold tracking-tight">{profile.brand}</div>
            <p className="mt-2 text-sm text-[rgb(var(--muted))] max-w-sm">
              Minimal, fast, job-ready portfolio. Built to feel smooth on any
              device.
            </p>

            <div className="mt-4">
              <SocialLinks />
            </div>
          </div>

          <div className="md:text-right">
            <div className="text-sm font-semibold">Pages</div>

            <nav aria-label="Footer pages" className="mt-3">
              <div className="overflow-x-auto scrollbar-none">
                <ul className="flex items-center flex-nowrap whitespace-nowrap text-sm">
                  {pages.map((p, idx) => {
                    const active = pathname === p.to;

                    return (
                      <li key={p.to} className="flex items-center">
                        <Link
                          to={p.to}
                          aria-current={active ? "page" : undefined}
                          className={[
                            "transition",
                            active
                              ? "text-[rgb(var(--fg))]"
                              : "text-[rgb(var(--muted))] hover:text-[rgb(var(--fg))]",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--accent),0.45)] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--bg))] rounded-md px-1",
                          ].join(" ")}
                        >
                          {p.label}
                        </Link>

                        {idx < pages.length - 1 && (
                          <span
                            aria-hidden="true"
                            className="mx-2 text-[rgb(var(--border))]"
                          >
                            |
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </nav>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between text-xs text-[rgb(var(--muted))]">
          <div>
            © {new Date().getFullYear()} {profile.brand}
          </div>
          <div>All Rights Reserved</div>
        </div>
      </div>
    </footer>
  );
}
