import Image from "next/image";
import type { StoryChapter } from "@/content/home-story";
import styles from "./CategoryStrip.module.css";

type CategoryStripProps = {
  chapters: StoryChapter[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function CategoryStrip({
  chapters,
  activeIndex,
  onSelect,
}: CategoryStripProps) {
  return (
    <div className={styles.strip} role="tablist" aria-label="Category chapters">
      {chapters.map((chapter, index) => {
        const active = index === activeIndex;
        return (
          <button
            key={chapter.id}
            type="button"
            role="tab"
            aria-selected={active}
            className={[styles.card, active ? styles.active : ""]
              .filter(Boolean)
              .join(" ")}
            onClick={() => onSelect(index)}
          >
            <span className={styles.thumb}>
              <Image
                src={chapter.heroSrc}
                alt=""
                fill
                sizes="72px"
              />
            </span>
            <span className={styles.label}>{chapter.navLabel}</span>
          </button>
        );
      })}
    </div>
  );
}
