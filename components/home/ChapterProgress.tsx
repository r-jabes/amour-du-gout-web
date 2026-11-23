import type { StoryChapter } from "@/content/home-story";
import styles from "./ChapterProgress.module.css";

type ChapterProgressProps = {
  chapters: StoryChapter[];
  activeIndex: number;
  tone?: "default" | "inverse";
  onSelect?: (index: number) => void;
};

export function ChapterProgress({
  chapters,
  activeIndex,
  tone = "default",
  onSelect,
}: ChapterProgressProps) {
  return (
    <div
      className={[styles.progress, tone === "inverse" ? styles.inverse : ""]
        .filter(Boolean)
        .join(" ")}
      role="tablist"
      aria-label="Story chapters"
    >
      {chapters.map((chapter, index) => {
        const active = index === activeIndex;
        return (
          <button
            key={chapter.id}
            type="button"
            role="tab"
            aria-selected={active}
            className={[styles.item, active ? styles.active : ""]
              .filter(Boolean)
              .join(" ")}
            onClick={() => onSelect?.(index)}
          >
            <span className={styles.dot} aria-hidden />
            <span className={styles.label}>
              {String(chapter.index).padStart(2, "0")} {chapter.categoryLabel}
            </span>
          </button>
        );
      })}
    </div>
  );
}
