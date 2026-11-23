import Image from "next/image";
import type { ReactNode } from "react";
import styles from "./PageIntro.module.css";

type PageIntroProps = {
  eyebrow?: string;
  title: string;
  lede: string;
  actions?: ReactNode;
  editorialSrc?: string;
  editorialAlt?: string;
  heroSrc?: string;
  heroAlt?: string;
  note?: string;
};

export function PageIntro({
  eyebrow,
  title,
  lede,
  actions,
  editorialSrc,
  editorialAlt = "",
  heroSrc,
  heroAlt = "",
  note,
}: PageIntroProps) {
  return (
    <section className={styles.section}>
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.lede}>{lede}</p>
      {actions ? <div className={styles.actions}>{actions}</div> : null}

      {(editorialSrc || heroSrc) && (
        <div className={styles.preview}>
          {editorialSrc ? (
            <figure className={styles.figure}>
              <Image
                src={editorialSrc}
                alt={editorialAlt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
                priority
              />
            </figure>
          ) : null}
          {heroSrc ? (
            <div className={styles.heroFloat}>
              <Image
                src={heroSrc}
                alt={heroAlt}
                fill
                sizes="(max-width: 768px) 90vw, 28rem"
                priority
              />
            </div>
          ) : null}
        </div>
      )}

      {note ? <p className={styles.note}>{note}</p> : null}
    </section>
  );
}
