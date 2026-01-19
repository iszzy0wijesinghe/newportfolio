import Reveal from "../components/Reveal";
import { certificates } from "../content/certificates";

export default function Certificates() {
  return (
    <div className="space-y-8">
      <Reveal>
        <h1 className="text-2xl font-semibold">Certificates & Badges</h1>
        <p className="mt-2 text-sm text-[rgb(var(--muted))]">
          These certificates reflect the work I’ve put into mastering real tools and real concepts — not just completing courses. Each badge represents focused learning, consistent practice, and proof that I can pick up skills fast and apply them to real projects.
        </p>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {certificates.map((c) => (
          <Reveal key={`${c.title}-${c.year}`}>
            <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] p-4 hover:bg-[rgb(var(--card))] transition">
              {c.image && (
                <div className="relative w-full h-40 rounded-xl border border-[rgb(var(--border))] overflow-hidden bg-[rgb(var(--card))]">
                  {/* blurred fill background (no gaps visually) */}
                  <img
                    src={c.image}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover blur-md scale-110 opacity-40"
                    loading="lazy"
                  />

                  {/* actual certificate (full image visible) */}
                  <img
                    src={c.image}
                    alt={c.title}
                    className="relative w-full h-full object-contain p-2"
                    loading="lazy"
                  />
                </div>
              )}

              <div className="mt-3 text-sm font-semibold">{c.title}</div>
              <div className="mt-1 text-sm text-[rgb(var(--muted))]">
                {c.issuer} • {c.year}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {c.proofUrl && (
                  <a
                    href={c.proofUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm px-3 py-2 rounded-xl border border-[rgb(var(--border))] hover:bg-[rgb(var(--card))] transition"
                  >
                    Proof
                  </a>
                )}
                {c.badgeUrl && (
                  <a
                    href={c.badgeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm px-3 py-2 rounded-xl border border-[rgb(var(--border))] hover:bg-[rgb(var(--card))] transition"
                  >
                    Badge
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
