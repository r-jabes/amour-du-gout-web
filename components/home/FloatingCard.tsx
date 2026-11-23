import type { FloatingCardContent } from "@/content/home-story";
import styles from "./FloatingCard.module.css";

type FloatingCardProps = {
  card: FloatingCardContent;
  tone?: "default" | "inverse";
  className?: string;
};

export function FloatingCard({
  card,
  tone = "default",
  className,
}: FloatingCardProps) {
  return (
    <aside
      className={[
        styles.card,
        tone === "inverse" ? styles.inverse : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <p className={styles.label}>{card.label}</p>
      <p className={styles.title}>{card.title}</p>
      <p className={styles.detail}>{card.detail}</p>
    </aside>
  );
}
