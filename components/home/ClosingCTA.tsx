import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";
import { heroAssets } from "@/lib/assets";
import styles from "./ClosingCTA.module.css";

export function ClosingCTA() {
  return (
    <section className={styles.section} aria-labelledby="closing-cta-heading">
      <Container>
        <div className={styles.inner}>
          <Reveal>
            <div className={styles.copy}>
              <p className={styles.eyebrow}>Visit Amour du Goût</p>
              <h2 id="closing-cta-heading" className={styles.title}>
                Come for the Taste. Stay for the Moment.
              </h2>
              <p className={styles.lede}>
                Explore the menu, plan a celebration cake enquiry, or reach us
                in {site.locationLabel}. {site.tagline}
              </p>
              <div className={styles.actions}>
                <Button href="/menu" variant="primary">
                  Explore Our Menu
                </Button>
                <Button href="/contact" variant="secondary">
                  Contact Us
                </Button>
              </div>
            </div>
          </Reveal>

          <div className={styles.visual} aria-hidden>
            <Image
              src={heroAssets.assortedPastries}
              alt=""
              fill
              sizes="(max-width: 899px) 80vw, 36vw"
              className={styles.product}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
