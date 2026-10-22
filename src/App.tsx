import { Suspense, useEffect, useState } from "react";
import { useLocation, useRoutes } from "react-router-dom";
import { routes } from "./app/routes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import A11yFab from "./components/A11yFab";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  const location = useLocation();
  const page = useRoutes(routes);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const maxScroll =
          document.documentElement.scrollHeight -
          window.innerHeight;

        const nextProgress =
          maxScroll > 0
            ? (window.scrollY / maxScroll) * 100
            : 0;

        setProgress(Math.min(100, Math.max(0, nextProgress)));
      });
    };

    update();

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(frame);

      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [location.pathname]);

  useEffect(() => {
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
    document.documentElement.style.colorScheme = "dark";

    document.body.classList.remove("light");
    document.body.classList.add("dark");
  }, []);

  return (
    <>
      <a className="skip-link" href="#content">
        Skip to content
      </a>

      <div
        className="reading-progress"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />

      <ScrollToTop />

      <Header />

      <main
        id="content"
        className="site-main"
        key={location.pathname}
      >
        <Suspense
          fallback={
            <div className="page-loading" role="status">
              Loading...
            </div>
          }
        >
          {page}
        </Suspense>
      </main>

      <Footer />

      <A11yFab />
    </>
  );
}