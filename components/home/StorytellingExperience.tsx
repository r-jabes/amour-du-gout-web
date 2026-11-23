"use client";

import Image from "next/image";
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
import { storyChapters } from "@/content/home-story";
import { ChapterProduct } from "./ChapterProduct";
import { ChapterProgress } from "./ChapterProgress";
import { FloatingCard } from "./FloatingCard";
import { StoryChapter } from "./StoryChapter";
import styles from "./StorytellingExperience.module.css";

const accentClass = {
  cream: styles.accentCream,
  sand: styles.accentSand,
  blush: styles.accentBlush,
  cocoa: styles.accentCocoa,
  charcoal: styles.accentCharcoal,
} as const;

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
  const inverse = active.accent === "charcoal";

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

  const scrollToChapter = useCallback((index: number) => {
    const node = sentinelRefs.current[index];
    if (!node) return;
    node.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  if (!pinned) {
    return (
      <div id="storytelling" className={styles.stacked}>
        {storyChapters.map((chapter) => (
          <StoryChapter key={chapter.id} chapter={chapter} />
        ))}
      </div>
    );
  }

  return (
    <section
      id="storytelling"
      className={styles.experience}
      style={
        {
          "--chapter-count": storyChapters.length,
        } as CSSProperties
      }
      aria-roledescription="carousel"
      aria-label="Amour du Goût storytelling chapters"
    >
      <div className={styles.sticky}>
        <div
          className={[styles.stage, accentClass[active.accent]].join(" ")}
          aria-live="polite"
        >
          <div className={styles.editorialWash} aria-hidden>
            <Image
              key={active.editorialSrc}
              src={active.editorialSrc}
              alt=""
              fill
              sizes="40vw"
            />
          </div>

          <div className={styles.copy}>
            <div className={styles.progressWrap}>
              <ChapterProgress
                chapters={storyChapters}
                activeIndex={activeIndex}
                tone={inverse ? "inverse" : "default"}
                onSelect={scrollToChapter}
              />
            </div>

            <div key={`${copyKey}-${active.id}`} className={styles.fadeCopy}>
              <p className={styles.meta}>
                {String(active.index).padStart(2, "0")} · {active.categoryLabel}
              </p>
              <h2 className={styles.headline}>{active.headline}</h2>
              <p className={styles.description}>{active.description}</p>
              <div className={styles.actions}>
                <Button href={active.ctaHref} variant="primary">
                  {active.ctaLabel}
                </Button>
                <Button
                  href="/menu"
                  variant={inverse ? "inverse" : "secondary"}
                >
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
            <div className={styles.cards}>
              <div className={styles.cardA}>
                <FloatingCard
                  card={active.cards[0]}
                  tone={inverse ? "inverse" : "default"}
                />
              </div>
              <div className={styles.cardB}>
                <FloatingCard
                  card={active.cards[1]}
                  tone={inverse ? "inverse" : "default"}
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
