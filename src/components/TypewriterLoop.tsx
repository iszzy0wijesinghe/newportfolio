import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  lines: string[];
  typeSpeedMs?: number;
  deleteSpeedMs?: number;
  startDelayMs?: number;
  holdMs?: number;
  betweenMs?: number;
  className?: string;
};

export default function TypewriterLoop({
  lines,
  typeSpeedMs = 44,
  deleteSpeedMs = 22,
  startDelayMs = 250,
  holdMs = 1400,
  betweenMs = 300,
  className,
}: Props) {
  const safeLines = useMemo(
    () => (lines ?? []).map((s) => (s ?? "").trim()).filter(Boolean),
    [lines]
  );

  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<
    "init" | "typing" | "hold" | "deleting" | "between"
  >("init");

  // ✅ two timers: startTimer for initial delay, stepTimer for typing loop
  const startTimer = useRef<number | null>(null);
  const stepTimer = useRef<number | null>(null);

  const clearStart = () => {
    if (startTimer.current) window.clearTimeout(startTimer.current);
    startTimer.current = null;
  };

  const clearStep = () => {
    if (stepTimer.current) window.clearTimeout(stepTimer.current);
    stepTimer.current = null;
  };

  // Start
  useEffect(() => {
    clearStart();
    clearStep();

    if (!safeLines.length) return;

    setIndex(0);
    setText("");
    setPhase("init");

    startTimer.current = window.setTimeout(() => {
      setPhase("typing");
    }, startDelayMs);

    return () => {
      clearStart();
      clearStep();
    };
  }, [safeLines, startDelayMs]);

  // Loop
  useEffect(() => {
    clearStep();
    if (!safeLines.length) return;
    if (phase === "init") return; // ✅ do NOT cancel the startTimer anymore

    const full = safeLines[index % safeLines.length];

    if (phase === "typing") {
      if (text === full) {
        stepTimer.current = window.setTimeout(() => setPhase("hold"), holdMs);
        return clearStep;
      }

      stepTimer.current = window.setTimeout(() => {
        setText(full.slice(0, text.length + 1));
      }, typeSpeedMs);

      return clearStep;
    }

    if (phase === "hold") {
      stepTimer.current = window.setTimeout(() => setPhase("deleting"), holdMs);
      return clearStep;
    }

    if (phase === "deleting") {
      if (text.length === 0) {
        stepTimer.current = window.setTimeout(() => setPhase("between"), betweenMs);
        return clearStep;
      }

      stepTimer.current = window.setTimeout(() => {
        setText((t) => t.slice(0, -1));
      }, deleteSpeedMs);

      return clearStep;
    }

    if (phase === "between") {
      stepTimer.current = window.setTimeout(() => {
        setIndex((i) => i + 1);
        setPhase("typing");
      }, betweenMs);

      return clearStep;
    }

    return clearStep;
  }, [
    safeLines,
    index,
    text,
    phase,
    typeSpeedMs,
    deleteSpeedMs,
    holdMs,
    betweenMs,
  ]);

  if (!safeLines.length) return null;

  return (
    <span className={className}>
      {text}
      <span aria-hidden className="inline-block w-[1ch] text-[rgb(var(--muted))]">
        |
      </span>
    </span>
  );
}