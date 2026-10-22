
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { profile } from "../content/profile";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-wide footer-top">
        <div>
          <span className="eyebrow">
            THE NEXT CHAPTER IS YOURS
          </span>

          <h2>
            Have a good
            <br />
            <em>problem to solve?</em>
          </h2>
        </div>

        <Link
          className="footer-orb"
          to="/hire-me"
          aria-label="Start a conversation"
        >
          <ArrowUpRight size={35} />
        </Link>
      </div>

      <div className="container-wide footer-bottom">
        <Link className="wordmark" to="/">
          {profile.brand}
          <span className="wordmark-star">✳</span>
        </Link>

        <div className="footer-links">
          <Link to="/projects">Work</Link>
          <Link to="/who-am-i">Story</Link>
          <Link to="/blog">Journal</Link>
          <Link to="/certificates">Credentials</Link>
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn ↗
          </a>
        </div>

        <small>
          © {new Date().getFullYear()} {profile.name}.
          Crafted with intention.
        </small>
      </div>
    </footer>
  );
}
