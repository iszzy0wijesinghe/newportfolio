import { Suspense, useEffect, useMemo, useState } from "react";
import { useRoutes } from "react-router-dom";
import { routes } from "./app/routes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import A11yFab from "./components/A11yFab";

type Settings = { theme: "light" | "dark"; hc: boolean; fs: number; reduceMotion: boolean };

const DEFAULTS: Settings = { theme: "dark", hc: false, fs: 16, reduceMotion: false };

export default function App() {
  const element = useRoutes(routes);

  const [settings, setSettings] = useState<Settings>(() => {
    const raw = localStorage.getItem("iszzy.settings");
    return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : DEFAULTS;
  });

  useEffect(() => {
    localStorage.setItem("iszzy.settings", JSON.stringify(settings));
    const root = document.documentElement;

    root.classList.toggle("dark", settings.theme === "dark");
    root.classList.toggle("hc", settings.hc);
    root.style.setProperty("--fs", `${settings.fs}px`);

    // reduce-motion hint for CSS / future animations
    root.dataset.reduceMotion = settings.reduceMotion ? "true" : "false";
  }, [settings]);

  const ctx = useMemo(() => ({ settings, setSettings }), [settings]);
  // simple context without React Context to keep it minimal:
  (window as any).__ISZZY_SETTINGS__ = ctx;

  return (
    <>
      <a className="skip-link" href="#content">Skip to content</a>

      <Header />
      <main id="content" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <Suspense fallback={<div className="text-sm text-[rgb(var(--muted))]">Loading…</div>}>
          {element}
        </Suspense>
      </main>
      <Footer />

      <A11yFab />
    </>
  );
}
