
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction
} from "react";

export type Settings = {
  theme: "light" | "dark";
  hc: boolean;
  fs: number;
  reduceMotion: boolean;
};

const DEFAULTS: Settings = {
  theme: "dark",
  hc: false,
  fs: 16,
  reduceMotion: false
};

type ContextType = {
  settings: Settings;
  setSettings: Dispatch<SetStateAction<Settings>>;
};

const SettingsContext = createContext<ContextType | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(() => {
    try {
      return {
        ...DEFAULTS,
        ...JSON.parse(localStorage.getItem("iszzy.settings") || "{}")
      };
    } catch {
      return DEFAULTS;
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      settings.theme === "dark"
    );
    document.documentElement.classList.toggle("hc", settings.hc);
    document.documentElement.dataset.reduceMotion = String(
      settings.reduceMotion
    );
    document.documentElement.style.setProperty(
      "--fs",
      `${settings.fs}px`
    );
    document.documentElement.style.colorScheme = settings.theme;

    localStorage.setItem("iszzy.settings", JSON.stringify(settings));
  }, [settings]);

  const value = useMemo(
    () => ({ settings, setSettings }),
    [settings]
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error("useSettings must be inside SettingsProvider");
  }

  return context;
}
