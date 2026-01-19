import type { JSX } from "react";
import { profile } from "../content/profile";
import { Github, Linkedin, Mail, Copy } from "lucide-react";

type Item = { label: string; href: string; icon: JSX.Element };

const email = (profile.socials.email || "").trim();
const mailto = `mailto:${encodeURIComponent(email)}`;
const gmailCompose = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;

export default function SocialLinks() {
  const items: Item[] = [
    { label: "GitHub", href: profile.socials.github.trim(), icon: <Github size={16} /> },
    { label: "LinkedIn", href: profile.socials.linkedin.trim(), icon: <Linkedin size={16} /> },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {/* normal external links */}
      {items.map((i) => (
        <a
          key={i.label}
          href={i.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-[rgb(var(--border))] px-3 py-2 text-sm hover:bg-[rgb(var(--card))] transition"
          aria-label={i.label}
        >
          {i.icon}
          <span className="text-[13px]">{i.label}</span>
        </a>
      ))}

      {/* Email: mailto + fallback */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();

          // try mailto first
          window.location.href = mailto;

          // fallback to Gmail compose if mailto is not handled
          setTimeout(() => {
            window.open(gmailCompose, "_blank", "noopener,noreferrer");
          }, 350);
        }}
        className="inline-flex items-center gap-2 rounded-xl border border-[rgb(var(--border))] px-3 py-2 text-sm hover:bg-[rgb(var(--card))] transition"
        aria-label="Email"
      >
        <Mail size={16} />
        <span className="text-[13px]">Email</span>
      </button>

    </div>
  );
}
