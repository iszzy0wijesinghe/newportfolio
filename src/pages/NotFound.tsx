
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-wide interior-page error-page">
      <p className="eyebrow">404 / A DIFFERENT PATH</p>

      <h1 className="page-title">
        Not every road
        <br />
        <em>leads somewhere.</em>
      </h1>

      <Link
        className="button button-primary"
        to="/"
      >
        Back to the beginning
        <ArrowUpRight size={18} />
      </Link>
    </div>
  );
}
