/** @format */

import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import "./Home.css";

import { getMotionSettings } from "../lib/motion";

gsap.registerPlugin(ScrollTrigger, Observer);

const PORTRAIT_IMAGES = [
  "/iszzyimage.webp",
  "/iszzydecission.webp",
  "/iszzymic.webp",
];

function getPortraitIndex(scene: number) {
  if (scene <= 2) return 0;
  if (scene <= 4) return 1;
  return 2;
}

const statements = [
  {
    number: "01",
    first: "I was never interested",
    second: "in being just one thing.",
  },
  {
    number: "02",
    first: "Technology taught me",
    second: "how to build.",
  },
  {
    number: "03",
    first: "Design taught me",
    second: "how to make people feel.",
  },
  {
    number: "04",
    first: "Business taught me",
    second: "how to think beyond.",
  },
  {
    number: "05",
    first: "Curiosity taught me",
    second: "never to stop.",
  },
];

const dimensions = [
  {
    number: "01",
    category: "SOFTWARE ENGINEERING",
    title: "The Engineer.",
    description:
      "I build digital products, systems, and experiences that turn complex challenges into practical solutions.",
    detail: "DEVELOPMENT / SYSTEMS / TECHNOLOGY",
  },
  {
    number: "02",
    category: "ENTREPRENEURSHIP",
    title: "The Entrepreneur.",
    description:
      "I explore opportunities, develop ideas, and work to create businesses and products with lasting purpose.",
    detail: "BUSINESS / INNOVATION / MOTIORA",
  },
  {
    number: "03",
    category: "CREATIVE DIRECTION",
    title: "The Creative.",
    description:
      "I care about how things look, feel, and communicate. Design is how I bring clarity and character to ideas.",
    detail: "DESIGN / BRANDING / VISUAL IDENTITY",
  },
  {
    number: "04",
    category: "STRATEGY & COMMUNICATION",
    title: "The Strategist.",
    description:
      "I connect technology, creativity, and business thinking to give ambitious ideas a clearer direction.",
    detail: "MARKETING / STRATEGY / COMMUNICATION",
  },
  {
    number: "05",
    category: "EDUCATION & MENTORING",
    title: "The Educator.",
    description:
      "I believe knowledge grows through sharing. Teaching and mentoring are meaningful parts of my journey.",
    detail: "ICT / LEARNING / MENTORING",
  },
];

type PinnedStoryOptions = {
  section: HTMLElement;
  panels: HTMLElement[];
  onChange?: (index: number) => void;
  portraits?: (HTMLImageElement | null)[];
};

function createPinnedStory({
  section,
  panels,
  onChange,
  portraits,
}: PinnedStoryOptions) {
  if (panels.length < 2) return;

  const last = panels.length - 1;

  let current = 0;
  let busy = false;
  let active = false;
  let releasing = false;
  let lastMoveAt = 0;
  let activePortraitIndex = 0;

  let releaseTimer: ReturnType<typeof setTimeout> | undefined;
  let animation: gsap.core.Timeline | undefined;
  let trigger: ScrollTrigger;
  let entryFrame = 0;

  const isTouchDevice = window.matchMedia(
    "(hover: none) and (pointer: coarse)",
  ).matches;

  const gestureGap = isTouchDevice ? 450 : 650;
  const portraitZoom = 1.018;

  const portraitElements = (portraits ?? []).filter(
    (image): image is HTMLImageElement => image !== null,
  );

  gsap.set(panels, {
    autoAlpha: 0,
    y: 0,
    pointerEvents: "none",
  });

  gsap.set(panels[0], {
    autoAlpha: 1,
    pointerEvents: "auto",
  });

  if (portraitElements.length) {
    gsap.set(portraitElements, {
      autoAlpha: 0,
      scale: 1,
      y: 0,
    });

    gsap.set(portraitElements[0], {
      autoAlpha: 1,
    });
  }

  onChange?.(0);

  const animatePortrait = (scene: number, immediate = false) => {
    if (!portraitElements.length) return;

    const nextPortraitIndex = getPortraitIndex(scene);
    const previousPortrait = portraitElements[activePortraitIndex];
    const nextPortrait = portraitElements[nextPortraitIndex];

    if (!nextPortrait) return;

    const progress = scene / last;
    const targetScale = 1 + progress * (portraitZoom - 1);
    const targetY = -progress * 9;

    if (immediate) {
      gsap.killTweensOf(portraitElements);

      gsap.set(portraitElements, {
        autoAlpha: 0,
        scale: 1,
        y: 0,
      });

      gsap.set(nextPortrait, {
        autoAlpha: 1,
        scale: targetScale,
        y: targetY,
      });

      activePortraitIndex = nextPortraitIndex;
      return;
    }

    if (nextPortraitIndex !== activePortraitIndex) {
      gsap.killTweensOf(portraitElements);

      if (previousPortrait) {
        gsap.to(previousPortrait, {
          autoAlpha: 0,
          scale: 1.012,
          y: -5,
          duration: 0.7,
          ease: "power2.inOut",
          overwrite: true,
        });
      }

      gsap.fromTo(
        nextPortrait,
        {
          autoAlpha: 0,
          scale: 1.025,
          y: 12,
        },
        {
          autoAlpha: 1,
          scale: targetScale,
          y: targetY,
          duration: 0.9,
          ease: "power2.out",
          overwrite: true,
        },
      );

      activePortraitIndex = nextPortraitIndex;
    } else {
      gsap.to(nextPortrait, {
        scale: targetScale,
        y: targetY,
        duration: 1.4,
        ease: "sine.inOut",
        overwrite: true,
      });
    }
  };

  const show = (next: number, immediate = false) => {
    next = gsap.utils.clamp(0, last, next);

    if (next === current && !immediate) return;

    const old = current;
    current = next;

    animation?.kill();
    gsap.killTweensOf(panels);

    if (immediate) {
      gsap.set(panels, {
        autoAlpha: 0,
        y: 0,
        pointerEvents: "none",
      });

      gsap.set(panels[next], {
        autoAlpha: 1,
        pointerEvents: "auto",
      });

      busy = false;
    } else {
      busy = true;

      const outgoing = panels[old];
      const incoming = panels[next];
      const direction = next > old ? 1 : -1;

      gsap.set(panels, {
        autoAlpha: 0,
        y: 0,
        pointerEvents: "none",
      });

      gsap.set(outgoing, {
        autoAlpha: 1,
        y: 0,
      });

      gsap.set(incoming, {
        autoAlpha: 0,
        y: direction * 18,
      });

      animation = gsap.timeline({
        onComplete: () => {
          busy = false;
        },
      });

      animation.to(outgoing, {
        autoAlpha: 0,
        y: direction * -12,
        duration: 0.22,
        ease: "power2.in",
      });

      animation.to(
        incoming,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          ease: "power3.out",
        },
        "+=0.02",
      );

      animation.set(incoming, {
        pointerEvents: "auto",
      });
    }

    animatePortrait(next, immediate);
    onChange?.(next);
  };

  const getHeader = () => {
    return (
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--header-height",
        ),
      ) || 80
    );
  };

  const enter = (fromBelow: boolean) => {
    if (active || releasing) return;

    active = true;
    lastMoveAt = 0;

    show(fromBelow ? last : 0, true);

    observer.enable();

    cancelAnimationFrame(entryFrame);

    entryFrame = requestAnimationFrame(() => {
      if (active && !releasing) {
        trigger.scroll(trigger.start + 2);
      }
    });
  };

  const leave = (direction: number) => {
    if (releasing) return;

    releasing = true;
    active = false;
    busy = false;

    observer.disable();

    animation?.progress(1);

    cancelAnimationFrame(entryFrame);

    const destination =
      direction > 0 ? trigger.end + 3 : Math.max(0, trigger.start - 3);

    window.scrollTo({
      top: destination,
      behavior: "instant",
    });

    releaseTimer = setTimeout(() => {
      releasing = false;
      lastMoveAt = performance.now();
    }, 450);
  };

  const navigate = (direction: number) => {
    if (!active || releasing || busy) return;

    const now = performance.now();

    if (lastMoveAt && now - lastMoveAt < gestureGap) {
      return;
    }

    lastMoveAt = now;

    if (
      (direction > 0 && current === last) ||
      (direction < 0 && current === 0)
    ) {
      leave(direction);
      return;
    }

    show(current + direction);
  };

  const observer = Observer.create({
    target: window,
    type: "wheel,touch",
    preventDefault: true,
    tolerance: isTouchDevice ? 24 : 18,
    wheelSpeed: 1,
    allowClicks: true,

    onChangeY: (self) => {
      if (!active || releasing) return;

      const eventType = self.event?.type ?? "";

      const isTouchEvent = eventType.startsWith("touch");

      /*
       * Desktop:
       * Wheel down -> next
       * Wheel up   -> previous
       *
       * Mobile:
       * Finger swipe up   -> next
       * Finger swipe down -> previous
       */

      const direction = isTouchEvent
        ? -Math.sign(self.deltaY)
        : Math.sign(self.deltaY);

      if (direction === 0) return;

      navigate(direction);
    },
  });

  observer.disable();

  const onEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape" && active) {
      leave(current === last ? 1 : -1);
    }
  };

  window.addEventListener("keydown", onEscape);

  const onVisibilityChange = () => {
    if (document.hidden) {
      busy = false;
      animation?.progress(1);
      lastMoveAt = 0;
    }
  };

  document.addEventListener("visibilitychange", onVisibilityChange);

  trigger = ScrollTrigger.create({
    trigger: section,

    start: () => `top top+=${getHeader()}`,

    end: () => `+=${Math.max(480, window.innerHeight)}`,

    pin: true,
    pinSpacing: true,
    anticipatePin: 1,
    invalidateOnRefresh: true,

    onEnter: () => enter(false),
    onEnterBack: () => enter(true),

    onLeave: () => {
      if (active && !releasing) {
        trigger.scroll(trigger.end - 2);
      }
    },

    onLeaveBack: () => {
      if (active && !releasing) {
        trigger.scroll(trigger.start + 2);
      }
    },
  });

  const recoverEntry = () => {
    if (active || releasing || busy) return;

    const top = section.getBoundingClientRect().top;

    if (Math.abs(top - getHeader()) <= 15) {
      enter(window.scrollY > trigger.end);
    }
  };

  window.addEventListener("scroll", recoverEntry, { passive: true });

  const activateInitialChapter = () => {
    if (active || window.scrollY > trigger.start + 4) {
      return;
    }

    const bounds = section.getBoundingClientRect();

    if (Math.abs(bounds.top - getHeader()) < 12) {
      enter(false);
    }
  };

  requestAnimationFrame(activateInitialChapter);

  return () => {
    if (releaseTimer) {
      clearTimeout(releaseTimer);
    }

    document.removeEventListener("visibilitychange", onVisibilityChange);

    window.removeEventListener("keydown", onEscape);

    window.removeEventListener("scroll", recoverEntry);

    cancelAnimationFrame(entryFrame);

    observer.kill();
    animation?.kill();
    trigger.kill();
  };
}

function DimensionVisual({ index }: { index: number }) {
  const lines = [
    <div className="home-code-window" key="code">
      <div className="home-code-bar">
        <i />
        <i />
        <i />
        <span>portfolio.tsx</span>
      </div>

      <div className="home-code-lines" aria-hidden="true">
        <span>
          <b>01</b>
          <em>const</em> engineer = {"{"}
        </span>

        <span>
          <b>02</b> mindset: <strong>"build"</strong>,
        </span>

        <span>
          <b>03</b> focus: <strong>"solve"</strong>,
        </span>

        <span>
          <b>04</b> ideas: projects.map(
        </span>

        <span>
          <b>05</b> idea =&gt; <em>create</em>(idea)
        </span>

        <span>
          <b>06</b> )
        </span>

        <span>
          <b>07</b>
          {"}"}; <i className="home-code-cursor" />
        </span>
      </div>

      <div className="home-code-status">
        ● BUILD SUCCESSFUL <span>100%</span>
      </div>
    </div>,

    <div className="home-venture" key="venture">
      <span className="home-venture-node home-venture-one">IDEA</span>

      <span className="home-venture-connector" />

      <span className="home-venture-node home-venture-two">BUILD</span>

      <span className="home-venture-connector" />

      <span className="home-venture-node home-venture-three">GROW</span>

      <span className="home-venture-pulse" />
    </div>,

    <div className="home-creative-canvas" key="creative">
      <div className="home-creative-grid" />

      <div className="home-creative-frame">
        <span>FORM / FUNCTION</span>
        <div className="home-creative-circle" />
        <div className="home-creative-square" />
      </div>

      <div className="home-creative-cursor">✦</div>
    </div>,

    <div className="home-strategy" key="strategy">
      <div className="home-strategy-axis" />

      <svg viewBox="0 0 360 240" fill="none" aria-hidden="true">
        <path
          d="M22 202 L92 160 L152 178 L218 100 L280 116 L340 32"
          stroke="white"
          strokeWidth="2"
          strokeDasharray="450"
          className="home-strategy-path"
        />

        <g fill="white">
          <circle cx="22" cy="202" r="4" />
          <circle cx="92" cy="160" r="4" />
          <circle cx="152" cy="178" r="4" />
          <circle cx="218" cy="100" r="4" />
          <circle cx="280" cy="116" r="4" />
          <circle cx="340" cy="32" r="5" />
        </g>
      </svg>

      <span>INSIGHT → DIRECTION → IMPACT</span>
    </div>,

    <div className="home-educator" key="educator">
      <div className="home-educator-source">KNOWLEDGE</div>

      <div className="home-educator-stem" />

      <div className="home-educator-branches">
        <span>LEARN</span>
        <span>SHARE</span>
        <span>GROW</span>
      </div>

      <div className="home-educator-caption">IDEAS MULTIPLY WHEN SHARED</div>
    </div>,
  ];

  return (
    <div
      className={`home-dimension-visual home-visual-${index + 1}`}
      aria-hidden="true">
      {lines[index]}
    </div>
  );
}

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null);
  const openingRef = useRef<HTMLElement>(null);
  const dimensionsRef = useRef<HTMLElement>(null);

  const portraitRefs = useRef<(HTMLImageElement | null)[]>([]);

  const openingCounterRef = useRef<HTMLSpanElement>(null);

  const entrancePlayedRef = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    const opening = openingRef.current;
    const dimensionSection = dimensionsRef.current;

    if (!root || !opening || !dimensionSection) {
      return;
    }

    const motion = getMotionSettings();

    root.classList.toggle("home-reduced-motion", motion.reduced);

    if (motion.reduced) {
      return () => {
        root.classList.remove("home-reduced-motion");
      };
    }

    const context = gsap.context(() => {
      const playEntrance = () => {
        if (entrancePlayedRef.current) return;

        entrancePlayedRef.current = true;

        const portrait = root.querySelector<HTMLElement>(
          ".home-portrait-stack",
        );

        const intro = root.querySelector<HTMLElement>(".home-hero-intro");

        const top = root.querySelector<HTMLElement>(".home-opening-top");

        const bottom = root.querySelector<HTMLElement>(".home-opening-bottom");

        if (!intro) return;

        const eyebrow = intro.querySelector(".home-eyebrow");
        const hello = intro.querySelector(".home-hello");
        const title = intro.querySelector("h1");
        const description = intro.querySelector(".home-hero-description");
        const links = intro.querySelector(".home-hero-links");

        const timeline = gsap.timeline({
          defaults: {
            ease: "power3.out",
          },
        });

        if (portrait) {
          timeline.fromTo(
            portrait,
            {
              autoAlpha: 0,
              scale: 1.075,
            },
            {
              autoAlpha: 1,
              scale: 1,
              duration: 1.5,
            },
            0,
          );
        }

        if (top) {
          timeline.fromTo(
            top,
            {
              autoAlpha: 0,
              y: -12,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
            },
            0.25,
          );
        }

        if (eyebrow) {
          timeline.fromTo(
            eyebrow,
            {
              autoAlpha: 0,
              y: 12,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.65,
            },
            0.35,
          );
        }

        if (hello) {
          timeline.fromTo(
            hello,
            {
              autoAlpha: 0,
              y: 20,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.75,
            },
            0.45,
          );
        }

        if (title) {
          timeline.fromTo(
            title,
            {
              autoAlpha: 0,
              y: 50,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 1.05,
            },
            0.55,
          );
        }

        if (description) {
          timeline.fromTo(
            description,
            {
              autoAlpha: 0,
              y: 20,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
            },
            0.95,
          );
        }

        if (links) {
          timeline.fromTo(
            links,
            {
              autoAlpha: 0,
              y: 15,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.75,
            },
            1.1,
          );
        }

        if (bottom) {
          timeline.fromTo(
            bottom,
            {
              autoAlpha: 0,
              y: 10,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
            },
            1.2,
          );
        }
      };

      const openingPanels = gsap.utils.toArray<HTMLElement>(
        ".home-opening-slide",
        opening,
      );

      const dimensionPanels = gsap.utils.toArray<HTMLElement>(
        ".home-dimension-panel",
        dimensionSection,
      );

      const destroyOpening = createPinnedStory({
        section: opening,
        panels: openingPanels,
        portraits: portraitRefs.current,

        onChange: (index) => {
          if (openingCounterRef.current) {
            openingCounterRef.current.textContent = `${String(index + 1).padStart(2, "0")} / ${String(openingPanels.length).padStart(2, "0")}`;
          }
        },
      });

      const shouldPlayEntrance = window.scrollY < window.innerHeight * 0.5;

      if (shouldPlayEntrance) {
        requestAnimationFrame(() => {
          playEntrance();
        });
      }

      const destroyDimensions = createPinnedStory({
        section: dimensionSection,
        panels: dimensionPanels,
      });

      gsap.utils
        .toArray<HTMLElement>(".home-reveal", root)
        .forEach((element) => {
          gsap.fromTo(
            element,
            {
              autoAlpha: 0,
              y: 18,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",

              scrollTrigger: {
                trigger: element,
                start: "top 90%",
                once: true,
              },
            },
          );
        });

      const ending = root.querySelector<HTMLElement>(".home-ending");

      if (ending) {
        gsap.fromTo(
          ending,
          {
            "--ending-bg": "#0d0d0d",
            "--ending-fg": "#f5f5f5",
            "--ending-muted": "#a3a3a3",
            "--ending-line": "#f5f5f5",
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
              invalidateOnRefresh: true,
            },
          },
        );
      }

      const images = portraitRefs.current.filter(
        (image): image is HTMLImageElement => image !== null,
      );

      const refresh = () => {
        ScrollTrigger.refresh();
      };

      images.forEach((image) => {
        if (!image.complete) {
          image.addEventListener("load", refresh, { once: true });
        }
      });

      requestAnimationFrame(refresh);

      return () => {
        images.forEach((image) => {
          image.removeEventListener("load", refresh);
        });

        destroyOpening?.();
        destroyDimensions?.();
      };
    }, root);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <div className="isindu-home-v2" ref={rootRef}>
      <section className="home-opening" ref={openingRef}>
        <div className="home-opening-inner">
          <div className="home-opening-top">
            <span>ISINDU WIJESINGHE</span>

            <span>ONE MIND. MANY DIMENSIONS.</span>
          </div>

          <div className="home-opening-stage">
            <div className="home-portrait-wrap">
              <div className="home-portrait-stack">
                {PORTRAIT_IMAGES.map((image, index) => (
                  <img
                    key={image}
                    ref={(element) => {
                      portraitRefs.current[index] = element;
                    }}
                    src={image}
                    alt={index === 0 ? "Isindu Wijesinghe" : ""}
                    aria-hidden={index !== 0}
                    className="home-portrait home-portrait-layer"
                    loading="eager"
                    fetchPriority={index === 0 ? "high" : "auto"}
                    draggable={false}
                  />
                ))}
              </div>

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
                  Building at the intersection of technology, creativity, and
                  ambition.
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
                  key={statement.number}>
                  <span className="home-quote-number">
                    {statement.number} / 05
                  </span>

                  <h2>
                    <span className="home-story-line">{statement.first}</span>

                    <span className="home-story-line home-story-line-muted">
                      {statement.second}
                    </span>
                  </h2>
                </div>
              ))}

              <div className="home-opening-slide home-opening-final">
                <span className="home-quote-number">THE PHILOSOPHY</span>

                <h2>
                  <span className="home-story-line">One mind.</span>

                  <span className="home-story-line home-story-line-muted">
                    Many dimensions.
                  </span>
                </h2>

                <p className="home-opening-final-description">
                  Not one title. Not one path. A journey shaped by curiosity.
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
              <p className="home-eyebrow">BEYOND THE EXPECTED</p>

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
                Engineering gives me the ability to build. Design gives those
                ideas character. Business gives them direction.
              </p>

              <p>
                What interests me most is what happens when these different
                disciplines come together.
              </p>

              <Link to="/who-am-i" className="home-text-link">
                More about me
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="home-dimensions" ref={dimensionsRef}>
        <div className="home-dimensions-inner">
          <div className="home-dimensions-top">
            <span className="home-dimensions-kicker">FIVE DIMENSIONS</span>

            <span>FIVE PERSPECTIVES. ONE JOURNEY.</span>
          </div>

          <div className="home-dimensions-stage">
            {dimensions.map((dimension, index) => (
              <article className="home-dimension-panel" key={dimension.number}>
                <DimensionVisual index={index} />

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
                  aria-hidden="true">
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
            <p className="home-eyebrow">THE NEXT CHAPTER IS YOURS</p>

            <h2>
              Your next idea.
              <br />
              <span>Our next chapter.</span>
            </h2>

            <div className="home-ending-row">
              <p>
                An idea, a challenge, or an opportunity worth exploring? Let's
                start a conversation.
              </p>

              <Link to="/hire-me" className="home-ending-link">
                Get in touch
                <ArrowUpRight size={20} strokeWidth={1.4} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
