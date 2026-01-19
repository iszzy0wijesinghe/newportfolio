import { type PropsWithChildren, useEffect, useRef, useState } from "react";
import clsx from "clsx";

export default function Reveal({ children, className }: PropsWithChildren<{ className?: string }>) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const reduceMotion = document.documentElement.dataset.reduceMotion === "true";
    if (reduceMotion) {
      setInView(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={clsx("reveal-base", inView && "reveal-in", className)}>
      {children}
    </div>
  );
}
