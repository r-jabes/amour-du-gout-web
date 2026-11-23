"use client";

import Image from "next/image";
import { useEffect, useRef, type KeyboardEvent } from "react";
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
  const stripRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const strip = stripRef.current;
    const active = strip?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!strip || !active) return;
    const left =
      active.offsetLeft - strip.clientWidth / 2 + active.clientWidth / 2;
    strip.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [activeIndex]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = chapters.length - 1;
    const keyMap: Record<string, number> = {
      ArrowRight: Math.min(last, activeIndex + 1),
      ArrowLeft: Math.max(0, activeIndex - 1),
      Home: 0,
      End: last,
    };
    const next = keyMap[event.key];
    if (next === undefined) return;
    event.preventDefault();
    onSelect(next);
    stripRef.current
      ?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
      [next]?.focus();
  };

  return (
    <div
      ref={stripRef}
      onKeyDown={onKeyDown}
      className={styles.strip}
      role="tablist"
      aria-label="Category chapters"
    >
      {chapters.map((chapter, index) => {
        const active = index === activeIndex;
        return (
          <button
            key={chapter.id}
            type="button"
            role="tab"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
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
