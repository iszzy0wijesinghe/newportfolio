
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail
} from "lucide-react";
import Reveal from "../components/Reveal";
import StoryVisual from "../components/StoryVisual";
import { profile } from "../content/profile";

export default function HireMe() {
  return (
    <div className="container-wide interior-page">
      <Reveal>
        <p className="eyebrow">
          THE NEXT CHAPTER / START HERE
        </p>

        <h1 className="page-title">
          Your challenge.
          <br />
          <em>Our next story.</em>
        </h1>

        <p className="page-lead">
          A product idea, an ambitious problem or a
          project that deserves better? Tell me about it.
        </p>
      </Reveal>

      <div className="contact-grid">
        <Reveal>
          <form
            className="contact-form"
            action="https://formspree.io/f/mreeqjrn"
            method="POST"
          >
            <label htmlFor="contact-name">
              YOUR NAME
            </label>

            <input
              id="contact-name"
              name="name"
              autoComplete="name"
              placeholder="How should I call you?"
              required
            />

            <label htmlFor="contact-email">
              YOUR EMAIL
            </label>

            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
            />

            <label htmlFor="contact-message">
              THE IDEA / CHALLENGE
            </label>

            <textarea
              id="contact-message"
              name="message"
              rows={5}
              placeholder="A little about what you have in mind…"
              required
              minLength={10}
            />

            <input
              type="hidden"
              name="_subject"
              value="New portfolio inquiry"
            />

            <button
              className="button button-primary"
              type="submit"
            >
              Send the first message
              <ArrowUpRight size={19} />
            </button>

            <p className="form-footnote">
              This form is handled by Formspree.
              Please avoid sharing sensitive information.
            </p>
          </form>
        </Reveal>

        <div className="contact-aside">
          <Reveal>
            <StoryVisual
              src="/story/portrait-contact.webp"
              index="04"
              label="LET'S MAKE SOMETHING MEANINGFUL"
              alt="Isindu at work"
            />
          </Reveal>

          <Reveal>
            <div className="contact-social">
              <span className="eyebrow">
                OTHER WAYS TO CONNECT
              </span>

              <a href={`mailto:${profile.socials.email}`}>
                <Mail size={18} />
                {profile.socials.email}
              </a>

              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
              >
                <Github size={18} />
                GitHub
                <ArrowUpRight size={16} />
              </a>

              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin size={18} />
                LinkedIn
                <ArrowUpRight size={16} />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
