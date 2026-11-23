import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { brandAssets } from "@/lib/assets";
import styles from "./Logo.module.css";

type LogoProps = {
  compact?: boolean;
  showTagline?: boolean;
  priority?: boolean;
  tone?: "default" | "inverse";
};

export function Logo({
  compact = false,
  showTagline = true,
  priority = false,
  tone = "default",
}: LogoProps) {
  return (
    <Link
      href="/"
      className={[
        styles.link,
        compact ? styles.compact : "",
        showTagline ? styles.hideTaglineOnMobile : "",
        tone === "inverse" ? styles.inverse : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label={`${site.name} — Home`}
    >
      <span className={styles.mark}>
        <Image
          src={brandAssets.logo}
          alt=""
          width={88}
          height={88}
          priority={priority}
        />
      </span>
      {!compact ? (
        <span className={styles.wordmark}>
          <span className={styles.name}>{site.name}</span>
          {showTagline ? (
            <span className={styles.tagline}>{site.tagline}</span>
          ) : null}
        </span>
      ) : null}
    </Link>
  );
}
