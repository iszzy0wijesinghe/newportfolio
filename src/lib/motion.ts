export type MotionPreference = "full" | "reduced";

export function getMotionPreference(): MotionPreference {
  if (typeof window === "undefined") {
    return "reduced";
  }

  return window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches
    ? "reduced"
    : "full";
}

export function getMotionSettings() {
  const reduced = getMotionPreference() === "reduced";

  return {
    reduced,
    entranceDuration: reduced ? 0.25 : 1.2,
    transitionDuration: reduced ? 0.15 : 0.65,
    enableParallax: !reduced,
    enableScrollScrubbing: !reduced,
    enableLargeTransforms: !reduced
  };
}