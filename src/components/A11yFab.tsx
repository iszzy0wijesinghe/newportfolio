import { Contrast, Minus, Moon, Plus, Sun, Waves } from "lucide-react";
import { useState } from "react";
import { useSettings } from "../app/settings";

function btnBase(active: boolean) {
  return [
    "flex-1 rounded-xl border px-3 py-2 text-sm transition",
    "border-[rgb(var(--border))]",
    active
      ? "bg-[rgb(var(--card))] ring-2 ring-[rgb(var(--accent))]"
      : "hover:bg-[rgb(var(--card))]",
  ].join(" ");
}

export default function A11yFab() {
  const [open, setOpen] = useState(false);
  const { settings, setSettings } = useSettings();

  const update = (next: Partial<typeof settings>) => {
    setSettings((prev) => ({ ...prev, ...next }));
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <button
        onClick={() => setOpen((v) => !v)}
        className="rounded-2xl shadow-soft border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-4 py-3 text-sm"
        aria-expanded={open}
        aria-label="Accessibility settings"
      >
        Accessibility Options
      </button>

      {open && (
        <div className="mt-2 w-[360px] max-w-[92vw] rounded-2xl shadow-soft border border-[rgb(var(--border))] bg-[rgb(var(--bg))] p-3">
          <div className="text-xs text-[rgb(var(--muted))] mb-2">
            Accessibility
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3">
            {/* Theme */}
            <button
              className={btnBase(false)}
              onClick={() =>
                update({ theme: settings.theme === "dark" ? "light" : "dark" })
              }
              aria-label="Toggle theme"
              title="Theme"
            >
              <div className="flex items-center justify-center gap-2">
                {settings.theme === "dark" ? (
                  <Sun size={16} />
                ) : (
                  <Moon size={16} />
                )}
                <span className="text-xs">Theme</span>
              </div>
            </button>

            {/* Contrast */}
            <button
              className={btnBase(settings.hc)}
              onClick={() => update({ hc: !settings.hc })}
              aria-label="Toggle high contrast"
              title="High contrast"
            >
              <div className="flex items-center justify-center gap-2">
                <Contrast
                  size={16}
                  className={settings.hc ? "text-[rgb(var(--accent))]" : ""}
                />
                <span className="text-xs">
                  {settings.hc ? "Contrast: ON" : "Contrast: OFF"}
                </span>
              </div>
            </button>

            {/* Reduce Motion (span across both columns) */}
            <button
              className={btnBase(settings.reduceMotion) + " col-span-2"}
              onClick={() => update({ reduceMotion: !settings.reduceMotion })}
              aria-label="Toggle reduce motion"
              title="Reduce motion"
            >
              <div className="flex items-center justify-center gap-2">
                <Waves
                  size={16}
                  className={
                    settings.reduceMotion ? "text-[rgb(var(--accent))]" : ""
                  }
                />
                <span className="text-xs">
                  {settings.reduceMotion
                    ? "Motion: OFF (Calm mode)"
                    : "Motion: ON (Animated)"}
                </span>
              </div>
            </button>
          </div>

          {/* Font size */}
          <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-3">
            <div className="flex items-center justify-between">
              <div className="text-xs text-[rgb(var(--muted))]">Font size</div>
              <div className="text-xs">
                <span className="text-[rgb(var(--muted))]">Current:</span>{" "}
                <span className="font-medium text-[rgb(var(--fg))]">
                  {settings.fs}px
                </span>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between gap-2">
              <button
                className="rounded-xl border border-[rgb(var(--border))] px-3 py-2 hover:bg-[rgb(var(--bg))] transition"
                onClick={() => update({ fs: Math.max(14, settings.fs - 2) })}
                aria-label="Decrease font size"
              >
                <Minus size={16} />
              </button>

              <div className="text-xs text-[rgb(var(--muted))]">
                Use this if text feels small
              </div>

              <button
                className="rounded-xl border border-[rgb(var(--border))] px-3 py-2 hover:bg-[rgb(var(--bg))] transition"
                onClick={() => update({ fs: Math.min(22, settings.fs + 2) })}
                aria-label="Increase font size"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <button
            className="mt-3 w-full rounded-xl border border-[rgb(var(--border))] px-3 py-2 text-sm hover:bg-[rgb(var(--card))] transition"
            onClick={() =>
              update({ theme: "dark", hc: false, fs: 16, reduceMotion: false })
            }
          >
            Reset to default
          </button>

          <div className="mt-2 text-[11px] text-[rgb(var(--muted))]">
            Contrast and Motion show their state clearly (ON/OFF).
          </div>
        </div>
      )}
    </div>
  );
}

// import { Contrast, Minus, Moon, Plus, Sun, Waves } from "lucide-react";
// import { useEffect, useState } from "react";

// type Settings = { theme: "light" | "dark"; hc: boolean; fs: number; reduceMotion: boolean };

// function getCtx(): { settings: Settings; setSettings: (s: Settings) => void } {
//   return (window as any).__ISZZY_SETTINGS__;
// }

// export default function A11yFab() {
//   const [open, setOpen] = useState(false);
//   const [settings, setLocal] = useState<Settings>(() => getCtx()?.settings);

//   useEffect(() => {
//     const t = setInterval(() => setLocal(getCtx()?.settings), 250);
//     return () => clearInterval(t);
//   }, []);

//   if (!settings) return null;

//   const update = (next: Partial<Settings>) => {
//     const ctx = getCtx();
//     ctx?.setSettings({ ...ctx.settings, ...next });
//     setLocal({ ...settings, ...next });
//   };

//   return (
//     <div className="fixed bottom-5 right-5 z-50">
//       <button
//         onClick={() => setOpen(v => !v)}
//         className="rounded-2xl shadow-soft border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-4 py-3 text-sm"
//         aria-expanded={open}
//         aria-label="Accessibility settings"
//       >
//         Accessibility Options
//       </button>

//       {open && (
//         <div className="mt-2 w-56 rounded-2xl shadow-soft border border-[rgb(var(--border))] bg-[rgb(var(--bg))] p-3">
//           <div className="text-xs text-[rgb(var(--muted))] mb-2">Accessibility</div>

//           <div className="flex items-center justify-between gap-2 mb-2">
//             <button
//               className="flex-1 rounded-xl border border-[rgb(var(--border))] px-3 py-2 text-sm hover:bg-[rgb(var(--card))]"
//               onClick={() => update({ theme: settings.theme === "dark" ? "light" : "dark" })}
//               aria-label="Toggle theme"
//             >
//               {settings.theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
//             </button>
//             <button
//               className="flex-1 rounded-xl border border-[rgb(var(--border))] px-3 py-2 text-sm hover:bg-[rgb(var(--card))]"
//               onClick={() => update({ hc: !settings.hc })}
//               aria-label="Toggle high contrast"
//               title="High contrast"
//             >
//               <Contrast size={16} />
//             </button>
//             <button
//               className="flex-1 rounded-xl border border-[rgb(var(--border))] px-3 py-2 text-sm hover:bg-[rgb(var(--card))]"
//               onClick={() => update({ reduceMotion: !settings.reduceMotion })}
//               aria-label="Toggle reduce motion"
//               title="Reduce motion"
//             >
//               <Waves size={16} />
//             </button>
//           </div>

//           <div className="flex items-center justify-between gap-2">
//             <button
//               className="rounded-xl border border-[rgb(var(--border))] px-3 py-2 hover:bg-[rgb(var(--card))]"
//               onClick={() => update({ fs: Math.max(14, settings.fs - 2) })}
//               aria-label="Decrease font size"
//             >
//               <Minus size={16} />
//             </button>
//             <div className="text-xs text-[rgb(var(--muted))]">Font: {settings.fs}px</div>
//             <button
//               className="rounded-xl border border-[rgb(var(--border))] px-3 py-2 hover:bg-[rgb(var(--card))]"
//               onClick={() => update({ fs: Math.min(22, settings.fs + 2) })}
//               aria-label="Increase font size"
//             >
//               <Plus size={16} />
//             </button>
//           </div>

//           <div className="mt-2 text-[11px] text-[rgb(var(--muted))]">
//             Use any comfortable settings for better accessibility.
//             We respect your choices!
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
