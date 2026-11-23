"use client";

import {
  useCallback,
  useEffect,
  useId,
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
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [, startTransition] = useTransition();
  const sentinelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const indexRef = useRef(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const copyKey = useId();
  const active = storyChapters[activeIndex] ?? storyChapters[0];
  const isOpening = activeIndex === 0;

  const commitIndex = useCallback((next: number) => {
    const clamped = Math.max(0, Math.min(storyChapters.length - 1, next));
    setDirection(clamped >= indexRef.current ? "next" : "prev");
    indexRef.current = clamped;
    startTransition(() => setActiveIndex(clamped));
  }, []);

  useEffect(() => {
    if (!pinned) return;

    const nodes = sentinelRefs.current.filter(
      (node): node is HTMLDivElement => Boolean(node),
    );
    if (!nodes.length) return;

    const ratios = new Map<number, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = Number((entry.target as HTMLElement).dataset.index);
          ratios.set(index, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        let bestIndex = 0;
        let bestRatio = -1;
        for (const [index, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestIndex = index;
          }
        }

        if (bestIndex !== indexRef.current) commitIndex(bestIndex);
      },
      {
        threshold: [0.15, 0.35, 0.55, 0.75],
        rootMargin: "-15% 0px -15% 0px",
      },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [pinned, commitIndex]);

  useLayoutEffect(() => {
    if (!pinned) return;
    const root = document.documentElement;
    root.dataset.hero = "on";
    root.style.setProperty("--hero-bg", active.background);
    root.style.setProperty("--hero-glow", active.glow);
  }, [pinned, active.background, active.glow]);

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
  }, [pinned, active.background, active.glow]);

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

      const node = sentinelRefs.current[index];
      if (!node) return;
      node.scrollIntoView({ behavior: "smooth", block: "center" });
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
          aria-live="polite"
        >
          <div className={styles.atmosphere} aria-hidden />

          <div className={styles.layout}>
            <div className={styles.copy}>
              <div
                key={`${copyKey}-${active.id}`}
                className={[
                  styles.fadeCopy,
                  direction === "prev" ? styles.fadePrev : styles.fadeNext,
                ].join(" ")}
              >
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
                direction={direction}
                priorityFirst
              />
              <div className={styles.floatCards}>
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
                <p className={styles.hint}>
                  {activeIndex < storyChapters.length - 1
                    ? `Next · ${storyChapters[activeIndex + 1].headline}`
                    : "Continue for the menu"}
                </p>
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

      <div className={styles.sentinels} aria-hidden>
        {storyChapters.map((chapter, index) => (
          <div
            key={chapter.id}
            className={styles.sentinel}
            data-index={index}
            ref={(node) => {
              sentinelRefs.current[index] = node;
            }}
          />
        ))}
      </div>
    </section>
  );
}
