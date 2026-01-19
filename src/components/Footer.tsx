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
            <p className="mt-2 text-sm text-[rgb(var(--muted))] max-w-sm"></p>

            <div className="mt-4">
              <SocialLinks />
            </div>
          </div>

          <div className="md:text-right">
            <div className="text-sm font-semibold">Pages</div>

            <nav aria-label="Footer pages" className="mt-3">
              <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-x-4 gap-y-2 text-sm md:justify-end">
                {pages.map((p) => {
                  const active = pathname === p.to;

                  return (
                    <li key={p.to} className={active ? "font-medium" : ""}>
                      <Link
                        to={p.to}
                        aria-current={active ? "page" : undefined}
                        className={[
                          "inline-block rounded-md px-1 py-1 transition",
                          active
                            ? "text-[rgb(var(--fg))]"
                            : "text-[rgb(var(--muted))] hover:text-[rgb(var(--fg))]",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--accent),0.45)] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--bg))]",
                          "md:text-right md:w-full",
                        ].join(" ")}
                      >
                        {p.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
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
