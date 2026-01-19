import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <div className="text-2xl font-semibold">404</div>
      <div className="mt-2 text-sm text-[rgb(var(--muted))]">Page not found.</div>
      <Link
        to="/"
        className="mt-6 inline-block text-sm px-4 py-2 rounded-xl border border-[rgb(var(--border))] hover:bg-[rgb(var(--card))] transition"
      >
        Go Home
      </Link>
    </div>
  );
}
