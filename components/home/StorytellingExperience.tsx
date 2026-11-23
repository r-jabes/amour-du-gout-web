"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useTransition,
  type CSSProperties,
} from "react";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";
import { storyChapters } from "@/content/home-story";
import { CategoryStrip } from "./CategoryStrip";
import { ChapterProduct } from "./ChapterProduct";
import { FloatingCard } from "./FloatingCard";
import { StoryChapter } from "./StoryChapter";
import styles from "./StorytellingExperience.module.css";

/** Blend two #rrggbb colours; t = 0 → a, t = 1 → b. */
function mixHex(a: string, b: string, t: number) {
  const pa = parseInt(a.slice(1), 16);
  const pb = parseInt(b.slice(1), 16);
  const channel = (shift: number) => {
    const ca = (pa >> shift) & 255;
    const cb = (pb >> shift) & 255;
    return Math.round(ca + (cb - ca) * t);
  };
  return `rgb(${channel(16)} ${channel(8)} ${channel(0)})`;
}

function usePinnedStoryMode() {
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      window.requestAnimationFrame(() => setPinned(!motion.matches));
    };

    sync();
    motion.addEventListener("change", sync);
    return () => motion.removeEventListener("change", sync);
  }, []);

  return pinned;
}

export function StorytellingExperience() {
  const pinned = usePinnedStoryMode();
  const [activeIndex, setActiveIndex] = useState(0);
  const [, startTransition] = useTransition();
  const indexRef = useRef(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const active = storyChapters[activeIndex] ?? storyChapters[0];
  const isOpening = activeIndex === 0;

  const commitIndex = useCallback((next: number) => {
    const clamped = Math.max(0, Math.min(storyChapters.length - 1, next));
    indexRef.current = clamped;
    startTransition(() => setActiveIndex(clamped));
  }, []);

  /**
   * Scroll-linked progress. Publishes CSS variables on the section so the
   * product reel, copy and cards move continuously with the scrollbar
   * (no React re-render per frame):
   *   --story-progress  0 → chapters-1, fractional between chapters
   *   --local           -0.5 → 0.5, position relative to the nearest chapter
   */
  useEffect(() => {
    if (!pinned) return;
    const node = sectionRef.current;
    if (!node) return;

    const last = storyChapters.length - 1;
    const root = document.documentElement;
    let frame = 0;
    let lastBg = "";

    const update = () => {
      frame = 0;
      const total = node.offsetHeight - window.innerHeight;
      const scrolled = Math.min(
        Math.max(-node.getBoundingClientRect().top, 0),
        Math.max(total, 0),
      );
      const progress = total > 0 ? (scrolled / total) * last : 0;
      const nearest = Math.round(progress);
      node.style.setProperty("--story-progress", progress.toFixed(4));
      node.style.setProperty("--local", (progress - nearest).toFixed(4));

      // Blend the stage colour between neighbouring chapters so the header
      // and hero (which both read --hero-bg from <html>) change in lockstep.
      const from = Math.floor(progress);
      const to = Math.min(from + 1, last);
      const t = progress - from;
      const bg = mixHex(
        storyChapters[from].background,
        storyChapters[to].background,
        t,
      );
      if (bg !== lastBg) {
        lastBg = bg;
        root.style.setProperty("--hero-bg", bg);
        root.style.setProperty(
          "--hero-glow",
          mixHex(storyChapters[from].glow, storyChapters[to].glow, t),
        );
      }
      if (nearest !== indexRef.current) commitIndex(nearest);
    };

    /*
     * Touch paging. Continuous scroll-linking feels great with a wheel or
     * trackpad, but on a phone native momentum leaves the story between
     * chapters and any "wait until it settles, then snap" approach pauses
     * visibly. So inside the hero we drive vertical swipes ourselves:
     * the stage tracks the finger 1:1, and on release we immediately glide
     * to the next/previous chapter based on swipe velocity and distance.
     * Horizontal swipes (thumbnail strip), taps, and swipes that leave the
     * hero fall through to native scrolling.
     */
    const touchDevice = window.matchMedia("(pointer: coarse)");
    const FLICK_VELOCITY = 0.3; // px/ms; faster than this = intent to page
    const DEAD_ZONE = 0.12; // slow drags shorter than this return
    const SETTLE_MS = 90; // fallback snap after native (non-gesture) scrolls
    let settled = 0;
    let touching = false;
    let driving = false;
    let idle = 0;
    let anim = 0;

    type Gesture = {
      startX: number;
      startY: number;
      startScroll: number;
      heroTop: number;
      total: number;
      axis: "pending" | "story" | "native";
      samples: Array<{ y: number; t: number }>;
    };
    let gesture: Gesture | null = null;

    const geometry = () => {
      const rect = node.getBoundingClientRect();
      const total = node.offsetHeight - window.innerHeight;
      return {
        total,
        scrolled: -rect.top,
        heroTop: window.scrollY + rect.top,
      };
    };

    const progressNow = () => {
      const { total, scrolled } = geometry();
      if (total <= 0) return 0;
      return (Math.min(Math.max(scrolled, 0), total) / total) * last;
    };

    const cancelAnim = () => {
      if (anim) window.cancelAnimationFrame(anim);
      anim = 0;
      driving = false;
    };

    const glideTo = (index: number) => {
      cancelAnim();
      const target = Math.max(0, Math.min(last, index));
      settled = target;
      const { total, heroTop } = geometry();
      const from = window.scrollY;
      const to = heroTop + (target / last) * total;
      const distance = to - from;
      if (Math.abs(distance) < 1) return;
      const duration = Math.min(560, Math.max(260, Math.abs(distance) * 0.55));
      const start = performance.now();
      driving = true;
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
        window.scrollTo({ top: from + distance * eased, behavior: "instant" });
        if (t < 1) {
          anim = window.requestAnimationFrame(step);
        } else {
          anim = 0;
          driving = false;
        }
      };
      anim = window.requestAnimationFrame(step);
    };

    // Fallback for scrolls we did not drive (e.g. momentum carrying the user
    // back up into the hero from the content below).
    const snap = () => {
      idle = 0;
      if (!touchDevice.matches || touching || driving) return;
      const { total, scrolled } = geometry();
      if (total <= 0 || scrolled <= 0 || scrolled >= total) {
        settled = scrolled >= total ? last : 0;
        return;
      }
      const progress = progressNow();
      const nearest = Math.round(progress);
      if (Math.abs(progress - nearest) < 0.01) {
        settled = nearest;
        return;
      }
      const delta = progress - settled;
      glideTo(
        Math.abs(delta) < DEAD_ZONE
          ? settled
          : delta > 0
            ? Math.ceil(progress)
            : Math.floor(progress),
      );
    };

    const queueSnap = () => {
      window.clearTimeout(idle);
      if (driving || touching) return;
      idle = window.setTimeout(snap, SETTLE_MS);
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
      queueSnap();
    };

    const onTouchStart = (event: TouchEvent) => {
      touching = true;
      window.clearTimeout(idle);
      gesture = null;
      if (!touchDevice.matches || event.touches.length !== 1) return;
      const { total, scrolled, heroTop } = geometry();
      if (total <= 0 || scrolled < -1 || scrolled > total + 1) return;
      // Interrupting a glide: pick up from wherever the stage is now.
      cancelAnim();
      const touch = event.touches[0];
      gesture = {
        startX: touch.clientX,
        startY: touch.clientY,
        startScroll: window.scrollY,
        heroTop,
        total,
        axis: "pending",
        samples: [{ y: touch.clientY, t: event.timeStamp }],
      };
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!gesture || gesture.axis === "native") return;
      const touch = event.touches[0];
      const dx = gesture.startX - touch.clientX;
      const dy = gesture.startY - touch.clientY; // > 0 = scrolling down

      if (gesture.axis === "pending") {
        if (Math.max(Math.abs(dx), Math.abs(dy)) < 6) return;
        const scrolled = gesture.startScroll - gesture.heroTop;
        const leavingBottom = dy > 0 && scrolled >= gesture.total - 1;
        const leavingTop = dy < 0 && scrolled <= 1;
        gesture.axis =
          Math.abs(dx) > Math.abs(dy) || leavingBottom || leavingTop
            ? "native"
            : "story";
        if (gesture.axis === "native") return;
      }

      event.preventDefault();
      const top = Math.min(
        gesture.heroTop + gesture.total,
        Math.max(gesture.heroTop, gesture.startScroll + dy),
      );
      window.scrollTo({ top, behavior: "instant" });
      gesture.samples.push({ y: touch.clientY, t: event.timeStamp });
      if (gesture.samples.length > 6) gesture.samples.shift();
    };

    const onTouchEnd = (event: TouchEvent) => {
      touching = false;
      const ended = gesture;
      gesture = null;
      if (ended?.axis === "story") {
        // Velocity over the last few samples, px/ms; > 0 = scrolling down.
        const first = ended.samples[0];
        const lastSample = ended.samples[ended.samples.length - 1];
        const dt = Math.max(1, event.timeStamp - first.t);
        const stale = event.timeStamp - lastSample.t > 120; // finger paused
        const velocity = stale ? 0 : (first.y - lastSample.y) / dt;
        const progress = progressNow();
        const offset = progress - settled;
        const direction =
          Math.abs(velocity) > FLICK_VELOCITY
            ? Math.sign(velocity)
            : Math.abs(offset) > DEAD_ZONE
              ? Math.sign(offset)
              : 0;
        glideTo(
          direction > 0
            ? Math.max(settled + 1, Math.round(progress))
            : direction < 0
              ? Math.min(settled - 1, Math.round(progress))
              : settled,
        );
        return;
      }
      queueSnap();
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    // Non-passive so a vertical story swipe can suppress native momentum.
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      cancelAnim();
      window.clearTimeout(idle);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pinned, commitIndex]);

  useLayoutEffect(() => {
    if (!pinned) return;
    document.documentElement.dataset.hero = "on";
  }, [pinned]);

  useEffect(() => {
    const root = document.documentElement;
    if (!pinned) return;

    const node = sectionRef.current;
    if (!node) {
      return () => {
        delete root.dataset.hero;
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) root.dataset.hero = "on";
        else delete root.dataset.hero;
      },
      { threshold: 0.12 },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      delete root.dataset.hero;
    };
  }, [pinned]);

  const goToChapter = useCallback(
    (index: number) => {
      if (!pinned) {
        const id = storyChapters[index]?.id;
        if (!id) return;
        document
          .getElementById(`chapter-${id}`)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      const node = sectionRef.current;
      if (!node) return;
      const total = node.offsetHeight - window.innerHeight;
      const top =
        window.scrollY +
        node.getBoundingClientRect().top +
        (index / (storyChapters.length - 1)) * total;
      window.scrollTo({ top, behavior: "smooth" });
    },
    [pinned],
  );

  if (!pinned) {
    return (
      <div id="home-hero" className={styles.stacked}>
        {storyChapters.map((chapter, index) => (
          <StoryChapter
            key={chapter.id}
            chapter={chapter}
            isOpening={index === 0}
            chapters={storyChapters}
            activeIndex={index}
            onSelectChapter={goToChapter}
          />
        ))}
      </div>
    );
  }

  const HeadingTag = isOpening ? "h1" : "h2";

  return (
    <section
      id="home-hero"
      ref={sectionRef}
      className={styles.experience}
      style={
        {
          "--chapter-count": storyChapters.length,
        } as CSSProperties
      }
      aria-roledescription="carousel"
      aria-label="Amour du Goût immersive menu story"
    >
      <div className={styles.sticky}>
        <div
          className={styles.stage}
          style={
            {
              "--stage-bg": active.background,
              "--stage-glow": active.glow,
            } as CSSProperties
          }
        >
          <div className={styles.atmosphere} aria-hidden />

          <div className={styles.layout}>
            <div className={styles.copy} aria-live="polite">
              <div className={styles.scrollCopy}>
                {isOpening ? (
                  <>
                    <p className={styles.brand}>
                      <span className={styles.brandMark} aria-hidden />
                      {site.name}
                    </p>
                    <p className={styles.tagline}>{site.tagline}</p>
                  </>
                ) : (
                  <p className={styles.meta}>
                    {String(active.index).padStart(2, "0")} ·{" "}
                    {active.categoryLabel}
                  </p>
                )}

                <HeadingTag
                  id={isOpening ? "home-hero-heading" : undefined}
                  className={styles.headline}
                >
                  {active.headline}
                </HeadingTag>
                <p className={styles.description}>{active.description}</p>
                <div className={styles.actions}>
                  <Button href={active.ctaHref} variant="primary">
                    {active.ctaLabel}
                  </Button>
                  <Button href="/menu" variant="secondary">
                    Full Menu
                  </Button>
                </div>
              </div>
            </div>

            <div className={styles.visualColumn}>
              <div className={styles.bloom} aria-hidden />
              <div className={styles.floor} aria-hidden />
              <ChapterProduct
                chapters={storyChapters}
                activeIndex={activeIndex}
                priorityFirst
              />
              <div className={`${styles.floatCards} ${styles.scrollCopy}`}>
                <div className={styles.cardA}>
                  <FloatingCard card={active.cards[0]} />
                </div>
                <div className={styles.cardB}>
                  <FloatingCard card={active.cards[1]} />
                </div>
              </div>
            </div>

            <div className={styles.stripWrap}>
              <div className={styles.dock}>
                <div className={styles.dockHeader}>
                  <p className={styles.hint}>
                    <span className={styles.step}>
                      {activeIndex + 1}/{storyChapters.length}
                    </span>
                    {activeIndex < storyChapters.length - 1
                      ? `Next · ${storyChapters[activeIndex + 1].headline}`
                      : "Keep scrolling for highlights"}
                  </p>
                  <a className={styles.skip} href="#featured-menu">
                    Skip intro
                    <span aria-hidden>↓</span>
                  </a>
                </div>
                <div className={styles.progress} aria-hidden>
                  <span className={styles.progressBar} />
                </div>
                <CategoryStrip
                  chapters={storyChapters}
                  activeIndex={activeIndex}
                  onSelect={goToChapter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
