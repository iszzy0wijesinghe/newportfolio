import { useEffect, useMemo, useState } from "react";

type Props = {
  text: string;
  speedMs?: number;     // typing speed
  startDelayMs?: number;
  cursor?: boolean;
};

export default function Typewriter({
  text,
  speedMs = 45,          // slower, clean
  startDelayMs = 250,
  cursor = true,
}: Props) {
  const reduceMotion =
    typeof document !== "undefined" &&
    document.documentElement.dataset.reduceMotion === "true";

  const [i, setI] = useState(reduceMotion ? text.length : 0);

  const safeText = useMemo(() => text ?? "", [text]);

  useEffect(() => {
    if (reduceMotion) return;

    const t0 = window.setTimeout(() => {
      const id = window.setInterval(() => {
        setI((prev) => {
          if (prev >= safeText.length) {
            window.clearInterval(id);
            return prev;
          }
          return prev + 1;
        });
      }, speedMs);

      return () => window.clearInterval(id);
    }, startDelayMs);

    return () => window.clearTimeout(t0);
  }, [reduceMotion, safeText, speedMs, startDelayMs]);

  return (
    <span className="relative">
      <span>{safeText.slice(0, i)}</span>
      {cursor && !reduceMotion && i < safeText.length && (
        <span
          className="inline-block align-baseline ml-1 w-[0.6ch]"
          aria-hidden="true"
        >
          <span className="animate-pulse">|</span>
        </span>
      )}
    </span>
  );
}
