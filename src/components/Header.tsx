
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { useSettings } from "../app/settings";
import { profile } from "../content/profile";

const links = [
  { to: "/who-am-i", label: "My story" },
  { to: "/projects", label: "Work" },
  { to: "/experience", label: "Journey" },
  { to: "/tech", label: "Toolkit" },
  { to: "/blog", label: "Journal" }
];

export default function Header() {
  const { pathname } = useLocation();
  const { settings, setSettings } = useSettings();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    addEventListener("keydown", onEscape);
    return () => removeEventListener("keydown", onEscape);
  }, []);

  return (
    <header className="site-header">
      <div className="header-inner container-wide">
        <Link className="wordmark" to="/" aria-label="Home">
          {profile.brand}
          <span className="wordmark-star">✳</span>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `nav-link ${isActive ? "is-active" : ""}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="icon-button theme-button"
            type="button"
            aria-label={`Switch to ${
              settings.theme === "dark" ? "light" : "dark"
            } mode`}
            onClick={() =>
              setSettings((s) => ({
                ...s,
                theme: s.theme === "dark" ? "light" : "dark"
              }))
            }
          >
            {settings.theme === "dark" ? (
              <Sun size={19} />
            ) : (
              <Moon size={19} />
            )}
          </button>

          <Link to="/hire-me" className="header-contact">
            Let's talk <ArrowUpRight size={16} />
          </Link>

          <button
            className="icon-button mobile-trigger"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        className={`mobile-nav ${open ? "is-open" : ""}`}
        aria-label="Mobile navigation"
        inert={!open}
      >
        {[
          ...links,
          { to: "/certificates", label: "Credentials" },
          { to: "/hire-me", label: "Contact" }
        ].map((link, i) => (
          <NavLink
            key={link.to}
            to={link.to}
            className="mobile-nav-link"
            onClick={() => setOpen(false)}
          >
            <span className="mobile-nav-number">
              0{i + 1}
            </span>

            {link.label}
            <ArrowUpRight size={20} />
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
