import Image from "next/image";
import type { StoryChapter } from "@/content/home-story";
import styles from "./ChapterProduct.module.css";

type ChapterProductProps = {
  chapters: StoryChapter[];
  activeIndex: number;
  direction?: "next" | "prev";
  priorityFirst?: boolean;
};

export function ChapterProduct({
  chapters,
  activeIndex,
  direction = "next",
  priorityFirst = false,
}: ChapterProductProps) {
  const active = chapters[activeIndex];

  return (
    <div className={styles.stage} aria-hidden={false}>
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
            aria-hidden={!isActive}
          >
            <Image
              src={chapter.heroSrc}
              alt={isActive ? chapter.heroAlt : ""}
              fill
              sizes="(max-width: 899px) 90vw, 48vw"
              className={styles.image}
              priority={priorityFirst && index === 0}
            />
          </div>
        );
      })}

      {active?.secondaryHeroSrc ? (
        <div
          className={[styles.product, styles.secondary, styles.active]
            .filter(Boolean)
            .join(" ")}
        >
          <Image
            src={active.secondaryHeroSrc}
            alt={active.secondaryHeroAlt ?? ""}
            fill
            sizes="180px"
            className={styles.image}
          />
        </div>
      ) : null}
    </div>
  );
}
