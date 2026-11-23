import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";
import { storyChapters } from "@/content/home-story";
import { heroAssets } from "@/lib/assets";
import { FloatingCard } from "./FloatingCard";
import styles from "./HomeHero.module.css";

const opening = storyChapters[0];

export function HomeHero() {
  return (
    <section className={styles.hero} aria-labelledby="home-hero-heading">
      <div className={styles.glow} aria-hidden />
      <div className={styles.ring} aria-hidden />

      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.brand}>
            <span className={styles.brandMark} aria-hidden />
            {site.name}
          </p>
          <p className={styles.tagline}>{site.tagline}</p>
          <h1 id="home-hero-heading" className={styles.headline}>
            Layers of Love
          </h1>
          <p className={styles.lede}>
            Freshly baked moments, crafted to make every bite feel special —
            a warm bakery and café story from Kigali.
          </p>
          <div className={styles.actions}>
            <Button href="/menu" variant="primary">
              Explore Our Menu
            </Button>
            <Button href="#storytelling" variant="secondary">
              Begin the Story
            </Button>
          </div>
          <p className={styles.cue}>
            <span className={styles.cueLine} aria-hidden />
            Scroll to taste the chapters
          </p>
        </div>

        <div className={styles.visual}>
          <div className={styles.productWrap}>
            <Image
              src={heroAssets.croissantMain}
              alt="Golden croissant with transparent background — illustrative prototype imagery"
              fill
              priority
              sizes="(max-width: 899px) 90vw, 46vw"
              className={styles.product}
            />
          </div>
          <div className={styles.cards}>
            <div className={styles.cardA}>
              <FloatingCard card={opening.cards[0]} />
            </div>
            <div className={styles.cardB}>
              <FloatingCard card={opening.cards[1]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
