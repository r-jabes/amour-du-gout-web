import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import {
  DEMO_DISCLAIMER,
  demoProducts,
  getCategoryLabel,
} from "@/content/demo-catalogue";
import styles from "./FeaturedMenu.module.css";

export function FeaturedMenu() {
  const featured = demoProducts.slice(0, 6);

  return (
    <section className={styles.section} aria-labelledby="featured-menu-heading">
      <Container>
        <Reveal>
          <header className={styles.header}>
            <p className={styles.eyebrow}>Featured selections</p>
            <h2 id="featured-menu-heading" className={styles.title}>
              A Taste of Everything
            </h2>
            <p className={styles.lede}>
              A short preview of the bakery, café, and savoury plates that shape
              Amour du Goût — browse the full menu when you are ready.
            </p>
            <p className={styles.disclaimer}>{DEMO_DISCLAIMER}</p>
          </header>
        </Reveal>

        <div className={styles.grid}>
          {featured.map((product) => (
            <article key={product.id} className={styles.card}>
              <div className={styles.imageWrap}>
                <Image
                  src={product.image}
                  alt={`${product.name} — illustrative prototype photography`}
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  className={styles.image}
                />
              </div>
              <p className={styles.category}>
                {getCategoryLabel(product.categoryId)}
              </p>
              <h3 className={styles.name}>{product.name}</h3>
              <p className={styles.description}>{product.description}</p>
              <p className={styles.badge}>Illustrative example</p>
            </article>
          ))}
        </div>

        <div className={styles.footer}>
          <Button href="/menu" variant="primary">
            Explore Our Menu
          </Button>
        </div>
      </Container>
    </section>
  );
}
