import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";
import { brandAssets, editorialAssets } from "@/lib/assets";
import styles from "./BrandIntroduction.module.css";

export function BrandIntroduction() {
  return (
    <section className={styles.section} aria-labelledby="brand-intro-heading">
      <Container>
        <div className={styles.grid}>
          <Reveal>
            <div className={styles.copy}>
              <p className={styles.eyebrow}>Our story</p>
              <h2 id="brand-intro-heading" className={styles.title}>
                More Than a Taste. A Little Story in Every Moment.
              </h2>
              <p className={styles.lede}>
                {site.tagline} Amour du Goût brings together fresh bakes,
                coffee, breakfast, burgers, lunch, desserts and a warm space in{" "}
                {site.locationLabel}.
              </p>
              <ul className={styles.points}>
                <li>Fresh bakes and celebration cakes</li>
                <li>Breakfast plates and café drinks</li>
                <li>Burgers, bites, lunch and sharing platters</li>
                <li>A welcoming place with a beautiful view</li>
              </ul>
              <Button href="/about" variant="inverse">
                Read Our Story
              </Button>
            </div>
          </Reveal>

          <div className={styles.visual}>
            <Image
              src={editorialAssets.coffeeMoment}
              alt="Iced coffee and croissant on a sunlit wooden table — illustrative editorial photography"
              fill
              sizes="(max-width: 899px) 100vw, 48vw"
              className={styles.image}
            />
            <div className={styles.logoBadge}>
              <Image
                src={brandAssets.logo}
                alt={`${site.name} logo`}
                width={88}
                height={88}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
