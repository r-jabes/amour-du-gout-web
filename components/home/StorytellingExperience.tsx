"use client";

import {
  useCallback,
  useEffect,
  useId,
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
    const desktop = window.matchMedia("(min-width: 900px)");

    const sync = () => {
      const next = desktop.matches && !motion.matches;
      window.requestAnimationFrame(() => setPinned(next));
    };

    sync();
    motion.addEventListener("change", sync);
    desktop.addEventListener("change", sync);
    return () => {
      motion.removeEventListener("change", sync);
      desktop.removeEventListener("change", sync);
    };
  }, []);

  return pinned;
}

export function StorytellingExperience() {
  const pinned = usePinnedStoryMode();
  const [activeIndex, setActiveIndex] = useState(0);
  const [, startTransition] = useTransition();
  const sentinelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const copyKey = useId();
  const active = storyChapters[activeIndex] ?? storyChapters[0];
  const isOpening = activeIndex === 0;

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

        startTransition(() => {
          setActiveIndex((current) =>
            current === bestIndex ? current : bestIndex,
          );
        });
      },
      {
        threshold: [0.15, 0.35, 0.55, 0.75],
        rootMargin: "-15% 0px -15% 0px",
      },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
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
          <div className={styles.ring} aria-hidden />

          <div className={styles.layout}>
            <div className={styles.copy}>
              <div key={`${copyKey}-${active.id}`} className={styles.fadeCopy}>
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
              <ChapterProduct
                chapters={storyChapters}
                activeIndex={activeIndex}
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
              <CategoryStrip
                chapters={storyChapters}
                activeIndex={activeIndex}
                onSelect={goToChapter}
              />
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
