"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";
import type { StoryChapter as StoryChapterData } from "@/content/home-story";
import { CategoryStrip } from "./CategoryStrip";
import { FloatingCard } from "./FloatingCard";
import styles from "./StoryChapter.module.css";

type StoryChapterProps = {
  chapter: StoryChapterData;
  isOpening?: boolean;
  chapters: StoryChapterData[];
  activeIndex: number;
  onSelectChapter: (index: number) => void;
};

export function StoryChapter({
  chapter,
  isOpening = false,
  chapters,
  activeIndex,
  onSelectChapter,
}: StoryChapterProps) {
  const HeadingTag = isOpening ? "h1" : "h2";
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const root = document.documentElement;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.45) return;
        root.dataset.hero = "on";
        root.style.setProperty("--hero-bg", chapter.background);
        root.style.setProperty("--hero-glow", chapter.glow);
      },
      { threshold: [0.45, 0.7] },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [chapter.background, chapter.glow]);

  return (
    <section
      id={`chapter-${chapter.id}`}
      ref={sectionRef}
      className={styles.chapter}
      style={
        {
          "--stage-bg": chapter.background,
          "--stage-glow": chapter.glow,
        } as CSSProperties
      }
      aria-labelledby={`chapter-heading-${chapter.id}`}
    >
      <div className={styles.inner}>
        <div>
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
              {String(chapter.index).padStart(2, "0")} · {chapter.categoryLabel}
            </p>
          )}

          <HeadingTag
            id={`chapter-heading-${chapter.id}`}
            className={styles.headline}
          >
            {chapter.headline}
          </HeadingTag>
          <p className={styles.description}>{chapter.description}</p>
          <div className={styles.actions}>
            <Button href={chapter.ctaHref} variant="primary">
              {chapter.ctaLabel}
            </Button>
            <Button href="/menu" variant="secondary">
              Full Menu
            </Button>
          </div>
          <div className={styles.cards}>
            {chapter.cards.map((card) => (
              <FloatingCard key={card.title} card={card} />
            ))}
          </div>
        </div>

        <div className={styles.visual}>
          <Image
            src={chapter.heroSrc}
            alt={chapter.heroAlt}
            fill
            sizes="(max-width: 767px) 90vw, 48vw"
            className={styles.product}
            priority={isOpening}
          />
          {chapter.secondaryHeroSrc ? (
            <Image
              src={chapter.secondaryHeroSrc}
              alt={chapter.secondaryHeroAlt ?? ""}
              fill
              sizes="140px"
              className={styles.secondary}
            />
          ) : null}
        </div>

        <div className={styles.strip}>
          <CategoryStrip
            chapters={chapters}
            activeIndex={activeIndex}
            onSelect={onSelectChapter}
          />
        </div>
      </div>
    </section>
  );
}
