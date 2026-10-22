
import Reveal from "../components/Reveal";
import { certificates } from "../content/certificates";
import { ArrowUpRight } from "lucide-react";

export default function Certificates() {
  return (
    <div className="container-wide interior-page">
      <Reveal>
        <p className="eyebrow">
          CHAPTER 05 / THE PROOF OF PRACTICE
        </p>

        <h1 className="page-title">
          Learning is <em>never finished.</em>
        </h1>

        <p className="page-lead">
          A record of deliberate practice—technical skills,
          certifications, and the habit of staying curious.
        </p>
      </Reveal>

      <div className="credentials-grid">
        {certificates.map((c, i) => (
          <Reveal
            key={`${c.title}-${i}`}
            delay={(i % 3) * 65}
          >
            <article className="credential-card">
              {c.image ? (
                <div className="credential-image">
                  <img
                    src={c.image}
                    alt={`${c.title} certificate`}
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="credential-image credential-placeholder">
                  CERTIFICATE / {String(i + 1).padStart(2, "0")}
                </div>
              )}

              <div className="credential-copy">
                <span className="eyebrow">
                  {c.issuer} / {c.year}
                </span>

                <h2>{c.title}</h2>

                {(c.proofUrl || c.badgeUrl) && (
                  <a
                    className="inline-arrow"
                    href={c.proofUrl || c.badgeUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View credential
                    <ArrowUpRight size={18} />
                  </a>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
