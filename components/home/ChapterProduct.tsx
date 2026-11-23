import Image from "next/image";
import type { CSSProperties } from "react";
import type { StoryChapter } from "@/content/home-story";
import styles from "./ChapterProduct.module.css";

type ChapterProductProps = {
  chapters: StoryChapter[];
  activeIndex: number;
  priorityFirst?: boolean;
};

/**
 * A vertical reel of chapter products. Each item is positioned from its
 * distance to `--story-progress` (set by StorytellingExperience on scroll),
 * so products travel upward with the scrollbar rather than swapping in place.
 */
export function ChapterProduct({
  chapters,
  activeIndex,
  priorityFirst = false,
}: ChapterProductProps) {
  return (
    <div className={styles.stage}>
      {chapters.map((chapter, index) => {
        const isActive = index === activeIndex;
        return (
          <div
            key={chapter.id}
            className={[
              styles.product,
              chapter.heroOrientation === "portrait" ? styles.portrait : "",
              isActive ? styles.active : "",
            ]
              .filter(Boolean)
              .join(" ")}
            style={{ "--i": index } as CSSProperties}
            aria-hidden={!isActive}
          >
            <Image
              src={chapter.heroSrc}
              alt={isActive ? chapter.heroAlt : ""}
              fill
              sizes="(max-width: 899px) 90vw, 48vw"
              className={styles.image}
              priority={priorityFirst && index <= 1}
            />
            {chapter.secondaryHeroSrc ? (
              <div className={styles.secondary}>
                <Image
                  src={chapter.secondaryHeroSrc}
                  alt={isActive ? (chapter.secondaryHeroAlt ?? "") : ""}
                  fill
                  sizes="180px"
                  className={styles.image}
                />
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
