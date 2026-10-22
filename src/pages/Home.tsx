import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import "./Home.css";

gsap.registerPlugin(ScrollTrigger, Observer);

const PORTRAIT_IMAGE = "/iszzyimage.webp";

const statements = [
  {
    number: "01",
    first: "I was never interested",
    second: "in being just one thing."
  },
  {
    number: "02",
    first: "Technology taught me",
    second: "how to build."
  },
  {
    number: "03",
    first: "Design taught me",
    second: "how to make people feel."
  },
  {
    number: "04",
    first: "Business taught me",
    second: "how to think beyond."
  },
  {
    number: "05",
    first: "Curiosity taught me",
    second: "never to stop."
  }
];

const dimensions = [
  {
    number: "01",
    category: "SOFTWARE ENGINEERING",
    title: "The Engineer.",
    description:
      "I build digital products, systems, and experiences that turn complex challenges into practical solutions.",
    detail: "DEVELOPMENT / SYSTEMS / TECHNOLOGY"
  },
  {
    number: "02",
    category: "ENTREPRENEURSHIP",
    title: "The Entrepreneur.",
    description:
      "I explore opportunities, develop ideas, and work to create businesses and products with lasting purpose.",
    detail: "BUSINESS / INNOVATION / MOTIORA"
  },
  {
    number: "03",
    category: "CREATIVE DIRECTION",
    title: "The Creative.",
    description:
      "I care about how things look, feel, and communicate. Design is how I bring clarity and character to ideas.",
    detail: "DESIGN / BRANDING / VISUAL IDENTITY"
  },
  {
    number: "04",
    category: "STRATEGY & COMMUNICATION",
    title: "The Strategist.",
    description:
      "I connect technology, creativity, and business thinking to give ambitious ideas a clearer direction.",
    detail: "MARKETING / STRATEGY / COMMUNICATION"
  },
  {
    number: "05",
    category: "EDUCATION & MENTORING",
    title: "The Educator.",
    description:
      "I believe knowledge grows through sharing. Teaching and mentoring are meaningful parts of my journey.",
    detail: "ICT / LEARNING / MENTORING"
  }
];

/**
 * Controlled, discrete storytelling. Native page scrolling is suspended only
 * while a pinned chapter is active. A gesture changes ONE complete scene;
 * the document is released only at the first/last scene boundary.
 */
function createPinnedStory({
  section,
  panels,
  onChange,
  portrait
}: {
  section: HTMLElement;
  panels: HTMLElement[];
  onChange?: (index: number) => void;
  portrait?: HTMLImageElement | null;
}) {
  if (panels.length < 2) return;

  const last = panels.length - 1;
  let current = 0;
  let busy = false;
  let active = false;
  let lastMoveAt = 0;
  let gestureQuietTimer: ReturnType<typeof setTimeout> | undefined;
  let animation: gsap.core.Timeline | undefined;
  let trigger: ScrollTrigger;
  const gestureGap = 850;
  let entryFrame = 0;
  const portraitZoom = 1.018; // Restrained 1.8% camera push, never an enlarging-body effect.
  let releasing = false;
  let releaseTimer: ReturnType<typeof setTimeout> | undefined;

  gsap.set(panels, { autoAlpha: 0, y: 0, pointerEvents: "none" });
  gsap.set(panels[0], { autoAlpha: 1, pointerEvents: "auto" });
  onChange?.(0);

  const show = (next: number, immediate = false) => {
    next = gsap.utils.clamp(0, last, next);
    if (next === current && !immediate) return;
    const old = current;
    current = next;
    animation?.kill();
    gsap.killTweensOf(panels);
    gsap.set(panels, { autoAlpha: 0, y: 0, pointerEvents: "none" });
    const incoming = panels[next];
    if (immediate) {
      gsap.set(incoming, { autoAlpha: 1, pointerEvents: "auto" });
      busy = false;
    } else {
      busy = true;
      const outgoing = panels[old];
      const direction = next > old ? 1 : -1;
      gsap.set(outgoing, { autoAlpha: 1 });
      animation = gsap.timeline({ onComplete: () => { busy = false; } });
      animation.to(outgoing, {
        autoAlpha: 0, y: direction * -14, duration: 0.28, ease: "power2.in"
      });
      animation.fromTo(incoming,
        { autoAlpha: 0, y: direction * 20 },
        { autoAlpha: 1, y: 0, duration: 0.58, ease: "power3.out" },
        "+=0.04"
      );
      animation.set(incoming, { pointerEvents: "auto" });
    }
    if (portrait) gsap.to(portrait, {
      scale: 1 + (next / last) * (portraitZoom - 1),
      y: -(next / last) * 9,
      duration: 2.2, ease: "sine.inOut", overwrite: true
    });
    onChange?.(next);
  };

  const getHeader = () => parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--header-height")
  ) || 80;

  const enter = (fromBelow: boolean) => {
    if (active || releasing) return;
    active = true;
    lastMoveAt = 0;
    show(fromBelow ? last : 0, true);
    // Hold the section at the pin start before native scroll can pass it.
    // The longer pin runway protects the chapter from trackpad momentum.
    observer.enable();
    cancelAnimationFrame(entryFrame);
    entryFrame = requestAnimationFrame(() => {
      if (active && !releasing) trigger.scroll(trigger.start + 2);
    });
  };

  const leave = (direction: number) => {
    if (releasing) return;
    releasing = true;
    active = false;
    busy = false;
    observer.disable();
    animation?.progress(1);
    if (gestureQuietTimer) clearTimeout(gestureQuietTimer);
    cancelAnimationFrame(entryFrame);

    // IMPORTANT: Never disable or refresh the pin during a handoff.
    // Removing pinSpacing changes the document's geometry and caused
    // philosophy/contact to be skipped, especially in reverse scrolling.
    // Move just outside the EXISTING pin interval. The next/previous
    // ordinary section stays in its correct natural document position.
    const destination = direction > 0
      ? trigger.end + 3
      : Math.max(0, trigger.start - 3);
    window.scrollTo({ top: destination, behavior: "instant" });

    // Allow the native page to scroll after the handoff. The short guard
    // absorbs residual trackpad events without disabling ScrollTrigger.
    releaseTimer = setTimeout(() => {
      releasing = false;
      lastMoveAt = performance.now();
    }, 550);
  };

  // Emergency escape for interruptions such as tab switching or route changes.
  const onVisibilityChange = () => {
    if (document.hidden) {
      busy = false;
      animation?.progress(1);
      lastMoveAt = 0;
    }
  };
  document.addEventListener("visibilitychange", onVisibilityChange);

  const observer = Observer.create({
    target: window,
    type: "wheel,touch",
    preventDefault: true,
    tolerance: 18,
    wheelSpeed: 1,
    allowClicks: true,
    onChangeY: (self) => {
      if (!active || releasing) return;
      if (gestureQuietTimer) clearTimeout(gestureQuietTimer);
      gestureQuietTimer = setTimeout(() => { lastMoveAt = 0; }, 300);
      const now = performance.now();
      if (busy || (lastMoveAt && now - lastMoveAt < gestureGap)) return;
      const direction = self.deltaY > 0 ? 1 : -1;
      lastMoveAt = now;
      if ((direction > 0 && current === last) ||
          (direction < 0 && current === 0)) {
        leave(direction);
        return;
      }
      show(current + direction);
    }
  });
  observer.disable();

  const onEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape" && active) leave(current === last ? 1 : -1);
  };
  window.addEventListener("keydown", onEscape);

  trigger = ScrollTrigger.create({
    trigger: section,
    start: () => `top top+=${getHeader()}`,
    // A six-pixel pin runway was easy to cross in a single trackpad event.
    // Give the observer a real capture zone; scene changes stay gesture-driven.
    end: () => `+=${Math.max(480, window.innerHeight)}`,
    pin: true,
    pinSpacing: true,
    anticipatePin: 1,
    invalidateOnRefresh: true,
    onEnter: () => enter(false),
    onEnterBack: () => enter(true),
    // The observer owns the story while pinned. The trigger must never
    // forcibly re-enter after a deliberate exit.
    onLeave: () => { if (active && !releasing) trigger.scroll(trigger.end - 2); },
    onLeaveBack: () => { if (active && !releasing) trigger.scroll(trigger.start + 2); }
  });

  // Recover a chapter only when its true pin boundary is visible.
  // Do not activate while the previous chapter is being released.
  const recoverEntry = () => {
    if (active || releasing || busy) return;
    const top = section.getBoundingClientRect().top;
    if (Math.abs(top - getHeader()) <= 15) {
      enter(window.scrollY > trigger.end);
    }
  };
  window.addEventListener("scroll", recoverEntry, { passive: true });
  // Activate the first chapter on initial page load. Otherwise the first
  // wheel gesture only enters the ScrollTrigger and feels like a dead scroll.
  const activateInitialChapter = () => {
    if (active || window.scrollY > trigger.start + 4) return;
    const bounds = section.getBoundingClientRect();
    const header = parseFloat(getComputedStyle(document.documentElement)
      .getPropertyValue("--header-height")) || 80;
    if (Math.abs(bounds.top - header) < 12) enter(false);
  };
  requestAnimationFrame(activateInitialChapter);

  // Context cleanup is explicit because Observer is not a ScrollTrigger.
  return () => {
    if (gestureQuietTimer) clearTimeout(gestureQuietTimer);
    if (releaseTimer) clearTimeout(releaseTimer);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    window.removeEventListener("keydown", onEscape);
    cancelAnimationFrame(entryFrame);
    window.removeEventListener("scroll", recoverEntry);
    observer.kill();
    animation?.kill();
    trigger.kill();
  };
}

function DimensionVisual({ index }: { index: number }) {
  const lines = [
    <div className="home-code-window" key="code">
      <div className="home-code-bar"><i /><i /><i /><span>portfolio.tsx</span></div>
      <div className="home-code-lines" aria-hidden="true">
        <span><b>01</b><em>const</em> engineer = {'{'}</span>
        <span><b>02</b>  mindset: <strong>"build"</strong>,</span>
        <span><b>03</b>  focus: <strong>"solve"</strong>,</span>
        <span><b>04</b>  ideas: projects.map(</span>
        <span><b>05</b>    idea =&gt; <em>create</em>(idea)</span>
        <span><b>06</b>  )</span>
        <span><b>07</b>{'}'}; <i className="home-code-cursor" /></span>
      </div>
      <div className="home-code-status">● BUILD SUCCESSFUL <span>100%</span></div>
    </div>,
    <div className="home-venture" key="venture"><span className="home-venture-node home-venture-one">IDEA</span><span className="home-venture-connector" /><span className="home-venture-node home-venture-two">BUILD</span><span className="home-venture-connector" /><span className="home-venture-node home-venture-three">GROW</span><span className="home-venture-pulse" /></div>,
    <div className="home-creative-canvas" key="creative"><div className="home-creative-grid"/><div className="home-creative-frame"><span>FORM / FUNCTION</span><div className="home-creative-circle"/><div className="home-creative-square"/></div><div className="home-creative-cursor">✦</div></div>,
    <div className="home-strategy" key="strategy"><div className="home-strategy-axis"/><svg viewBox="0 0 360 240" fill="none" aria-hidden="true"><path d="M22 202 L92 160 L152 178 L218 100 L280 116 L340 32" stroke="white" strokeWidth="2" strokeDasharray="450" className="home-strategy-path"/><g fill="white"><circle cx="22" cy="202" r="4"/><circle cx="92" cy="160" r="4"/><circle cx="152" cy="178" r="4"/><circle cx="218" cy="100" r="4"/><circle cx="280" cy="116" r="4"/><circle cx="340" cy="32" r="5"/></g></svg><span>INSIGHT → DIRECTION → IMPACT</span></div>,
    <div className="home-educator" key="educator"><div className="home-educator-source">KNOWLEDGE</div><div className="home-educator-stem"/><div className="home-educator-branches"><span>LEARN</span><span>SHARE</span><span>GROW</span></div><div className="home-educator-caption">IDEAS MULTIPLY WHEN SHARED</div></div>
  ];
  return <div className={`home-dimension-visual home-visual-${index + 1}`} aria-hidden="true">{lines[index]}</div>;
}

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null);
  const openingRef = useRef<HTMLElement>(null);
  const dimensionsRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLImageElement>(null);
  const openingCounterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const opening = openingRef.current;
    const dimensionSection = dimensionsRef.current;

    if (!root || !opening || !dimensionSection) return;

    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches ||
      document.documentElement.dataset.reduceMotion ===
        "true";

    if (reducedMotion) {
      root.classList.add("home-reduced-motion");

      return () => {
        root.classList.remove("home-reduced-motion");
      };
    }

    const context = gsap.context(() => {
      const openingPanels = gsap.utils.toArray<HTMLElement>(
        ".home-opening-slide", opening
      );
      const dimensionPanels = gsap.utils.toArray<HTMLElement>(
        ".home-dimension-panel", dimensionSection
      );

      const destroyOpening = createPinnedStory({
        section: opening,
        panels: openingPanels,
        portrait: portraitRef.current,
        onChange: (index) => {
          if (openingCounterRef.current) {
            openingCounterRef.current.textContent =
              `${String(index + 1).padStart(2, "0")} / ${String(openingPanels.length).padStart(2, "0")}`;
          }
        }
      });

      const destroyDimensions = createPinnedStory({
        section: dimensionSection,
        panels: dimensionPanels
      });

      gsap.utils.toArray<HTMLElement>(".home-reveal", root).forEach((element) => {
        gsap.fromTo(element,
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 90%",
              once: true
            }
          }
        );
      });

      // Editorial dark-to-light reveal. Scrubbed only for the section's palette,
      // never for the controlled story scenes or their scroll locking.
      const ending = root.querySelector<HTMLElement>(".home-ending");
      if (ending) {
        gsap.fromTo(ending,
          {
            "--ending-bg": "#0d0d0d",
            "--ending-fg": "#f5f5f5",
            "--ending-muted": "#a3a3a3",
            "--ending-line": "#f5f5f5"
          },
          {
            "--ending-bg": "#f0f0ee",
            "--ending-fg": "#111111",
            "--ending-muted": "#626262",
            "--ending-line": "#111111",
            ease: "none",
            scrollTrigger: {
              trigger: ending,
              start: "top 85%",
              end: "top 18%",
              scrub: 0.75,
              invalidateOnRefresh: true
            }
          }
        );
      }

      const image = portraitRef.current;
      const refresh = () => ScrollTrigger.refresh();
      if (image && !image.complete) image.addEventListener("load", refresh, { once: true });
      requestAnimationFrame(refresh);
      return () => {
        image?.removeEventListener("load", refresh);
        destroyOpening?.();
        destroyDimensions?.();
      };
    }, root);

    return () => context.revert();
  }, []);

  return (
    <div className="isindu-home-v2" ref={rootRef}>
      <section
        className="home-opening"
        ref={openingRef}
      >
        <div className="home-opening-inner">
          <div className="home-opening-top">
            <span>ISINDU WIJESINGHE</span>
            <span>ONE MIND. MANY DIMENSIONS.</span>
          </div>

          <div className="home-opening-stage">
            <div className="home-portrait-wrap">
              <img
                ref={portraitRef}
                src={PORTRAIT_IMAGE}
                alt="Isindu Wijesinghe"
                className="home-portrait"
                loading="eager"
                fetchPriority="high"
              />

              <span className="home-portrait-side">
                BEYOND A SINGLE DEFINITION
              </span>
            </div>

            <div className="home-opening-copy">
              <div className="home-opening-slide home-hero-intro">
                <p className="home-eyebrow">
                  SOFTWARE ENGINEER / ENTREPRENEUR / CREATIVE
                </p>

                <p className="home-hello">Hello, I'm</p>

                <h1>
                  Isindu
                  <br />
                  <span>Wijesinghe.</span>
                </h1>

                <p className="home-hero-description">
                  Building at the intersection of technology,
                  creativity, and ambition.
                </p>

                <div className="home-hero-links">
                  <Link to="/who-am-i">
                    Discover my story
                    <ArrowUpRight size={16} />
                  </Link>

                  <Link to="/projects">
                    Selected work
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              {statements.map((statement) => (
                <div
                  className="home-opening-slide home-opening-quote"
                  key={statement.number}
                >
                  <span className="home-quote-number">
                    {statement.number} / 05
                  </span>

                  <h2>
                    <span className="home-story-line">
                      {statement.first}
                    </span>

                    <span className="home-story-line home-story-line-muted">
                      {statement.second}
                    </span>
                  </h2>
                </div>
              ))}

              <div className="home-opening-slide home-opening-final">
                <span className="home-quote-number">
                  THE PHILOSOPHY
                </span>

                <h2>
                  <span className="home-story-line">
                    One mind.
                  </span>

                  <span className="home-story-line home-story-line-muted">
                    Many dimensions.
                  </span>
                </h2>

                <p className="home-opening-final-description">
                  Not one title. Not one path.
                  A journey shaped by curiosity.
                </p>
              </div>
            </div>
          </div>

          <div className="home-opening-bottom">
            <span>PERSONAL PORTFOLIO / 2026</span>

            <div>
              <span ref={openingCounterRef}>01 / 07</span>
              <span>SCROLL TO EXPLORE</span>
              <ArrowDown size={15} strokeWidth={1.4} />
            </div>
          </div>
        </div>
      </section>

      <section className="home-philosophy">
        <div className="home-container">


          <div className="home-philosophy-grid">
            <div className="home-reveal">
              <p className="home-eyebrow">
                BEYOND THE EXPECTED
              </p>

              <h2>
                I don't believe
                <br />
                in choosing
                <br />
                <span>just one path.</span>
              </h2>
            </div>

            <div className="home-philosophy-copy home-reveal">
              <p>
                Engineering gives me the ability to build.
                Design gives those ideas character.
                Business gives them direction.
              </p>

              <p>
                What interests me most is what happens when
                these different disciplines come together.
              </p>

              <Link
                to="/who-am-i"
                className="home-text-link"
              >
                More about me
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        className="home-dimensions"
        ref={dimensionsRef}
      >
        <div className="home-dimensions-inner">
          <div className="home-dimensions-top">
            <span className="home-dimensions-kicker">FIVE DIMENSIONS</span>

            <span>FIVE PERSPECTIVES. ONE JOURNEY.</span>
          </div>

          <div className="home-dimensions-stage">
            {dimensions.map((dimension) => (
              <article
                className="home-dimension-panel"
                key={dimension.number}
              >
                <DimensionVisual index={dimensions.indexOf(dimension)} />
                <div className="home-dimension-content">
                  <span className="home-dimension-number">
                    {dimension.number} / 05
                  </span>

                  <p className="home-dimension-category">
                    {dimension.category}
                  </p>

                  <h2>{dimension.title}</h2>

                  <p className="home-dimension-description">
                    {dimension.description}
                  </p>

                  <span className="home-dimension-detail">
                    {dimension.detail}
                  </span>
                </div>

                <span
                  className="home-dimension-background-number"
                  aria-hidden="true"
                >
                  {dimension.number}
                </span>
              </article>
            ))}
          </div>

          <div className="home-dimensions-bottom">
            <span>ISINDU WIJESINGHE</span>
            <span>CONTINUE THE JOURNEY ↓</span>
          </div>
        </div>
      </section>

      <section className="home-ending">
        <div className="home-container">


          <div className="home-ending-content home-reveal">
            <p className="home-eyebrow">
              THE NEXT CHAPTER IS YOURS
            </p>

            <h2>
              Your next idea.
              <br />
              <span>Our next chapter.</span>
            </h2>

            <div className="home-ending-row">
              <p>
                An idea, a challenge, or an opportunity
                worth exploring? Let's start a conversation.
              </p>

              <Link
                to="/hire-me"
                className="home-ending-link"
              >
                Get in touch
                <ArrowUpRight
                  size={20}
                  strokeWidth={1.4}
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}