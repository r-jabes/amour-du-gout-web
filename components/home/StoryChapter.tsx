import Image from "next/image";
import { Button } from "@/components/ui/Button";
import type { StoryChapter as StoryChapterData } from "@/content/home-story";
import { FloatingCard } from "./FloatingCard";
import styles from "./StoryChapter.module.css";

const accentClass: Record<StoryChapterData["accent"], string> = {
  cream: styles.accentCream,
  sand: styles.accentSand,
  blush: styles.accentBlush,
  cocoa: styles.accentCocoa,
  charcoal: styles.accentCharcoal,
};

type StoryChapterProps = {
  chapter: StoryChapterData;
};

export function StoryChapter({ chapter }: StoryChapterProps) {
  const inverse = chapter.accent === "charcoal";

  return (
    <section
      className={[styles.chapter, accentClass[chapter.accent]].join(" ")}
      aria-labelledby={`chapter-${chapter.id}`}
    >
      <div className={styles.inner}>
        <div>
          <p className={styles.meta}>
            {String(chapter.index).padStart(2, "0")} · {chapter.categoryLabel}
          </p>
          <h2 id={`chapter-${chapter.id}`} className={styles.headline}>
            {chapter.headline}
          </h2>
          <p className={styles.description}>{chapter.description}</p>
          <Button href={chapter.ctaHref} variant="primary">
            {chapter.ctaLabel}
          </Button>
          <div className={styles.cards}>
            {chapter.cards.map((card) => (
              <FloatingCard
                key={card.title}
                card={card}
                tone={inverse ? "inverse" : "default"}
              />
            ))}
          </div>
        </div>

        <div className={styles.visual}>
          <Image
            src={chapter.editorialSrc}
            alt=""
            fill
            sizes="(max-width: 767px) 100vw, 48vw"
            className={styles.editorial}
          />
          <Image
            src={chapter.heroSrc}
            alt={chapter.heroAlt}
            fill
            sizes="(max-width: 767px) 85vw, 42vw"
            className={styles.product}
          />
          {chapter.secondaryHeroSrc ? (
            <Image
              src={chapter.secondaryHeroSrc}
              alt={chapter.secondaryHeroAlt ?? ""}
              fill
              sizes="160px"
              className={styles.secondary}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
