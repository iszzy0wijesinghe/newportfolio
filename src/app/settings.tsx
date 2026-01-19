import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Settings = {
  theme: "light" | "dark";
  hc: boolean;
  fs: number;
  reduceMotion: boolean;
};

const DEFAULTS: Settings = { theme: "dark", hc: false, fs: 16, reduceMotion: false };

type Ctx = {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
};

const SettingsContext = createContext<Ctx | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
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
    root.dataset.reduceMotion = settings.reduceMotion ? "true" : "false";
  }, [settings]);

  const value = useMemo(() => ({ settings, setSettings }), [settings]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used inside SettingsProvider");
  return ctx;
}
