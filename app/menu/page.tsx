import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { PageIntro } from "@/components/ui/PageIntro";
import {
  DEMO_DISCLAIMER,
  demoCategories,
  demoProducts,
} from "@/content/demo-catalogue";
import { site, whatsappLink } from "@/content/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Browse Amour du Goût menu categories. Product listings are demonstration content until the official menu is confirmed.",
};

export default function MenuPage() {
  return (
    <Container>
      <PageIntro
        eyebrow="Menu"
        title="A taste of everything"
        lede="From morning croissants to celebration cakes — jump to a category below, or message us on WhatsApp to order and ask about today’s selection."
        actions={
          <>
            <Button
              href={whatsappLink(
                `Hello ${site.name}! I'd like to place an order.`,
              )}
              variant="primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Order on WhatsApp
            </Button>
            <Button href={site.contact.phoneHref} variant="secondary">
              Call {site.contact.phoneDisplay}
            </Button>
          </>
        }
        note={DEMO_DISCLAIMER}
      />

      <nav className={styles.jump} aria-label="Menu categories">
        <ul className={styles.jumpList}>
          {demoCategories.map((category) => (
            <li key={category.id}>
              <a className={styles.chip} href={`#${category.id}`}>
                {category.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.categories}>
        {demoCategories.map((category, index) => {
          const products = demoProducts.filter(
            (product) => product.categoryId === category.id,
          );
          return (
            <section
              key={category.id}
              id={category.id}
              className={styles.category}
              aria-labelledby={`${category.id}-heading`}
            >
              <div className={styles.media}>
                <Image
                  src={category.editorialImage}
                  alt=""
                  fill
                  sizes="(max-width: 767px) 100vw, 40vw"
                  className={styles.mediaImage}
                  priority={index === 0}
                />
              </div>

              <div className={styles.body}>
                <p className={styles.index}>
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 id={`${category.id}-heading`} className={styles.label}>
                  {category.label}
                </h2>
                <p className={styles.description}>{category.description}</p>

                {products.length > 0 ? (
                  <ul className={styles.products}>
                    {products.map((product) => (
                      <li key={product.id} className={styles.product}>
                        <span className={styles.productName}>
                          {product.name}
                        </span>
                        <span className={styles.productDetail}>
                          {product.description}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className={styles.empty}>
                    Full selection coming soon — ask us what’s fresh today.
                  </p>
                )}

                <Button
                  href={whatsappLink(
                    `Hello ${site.name}! I'd like to ask about your ${category.label.toLowerCase()}.`,
                  )}
                  variant="secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.ask}
                >
                  Ask about {category.label.toLowerCase()}
                </Button>
              </div>
            </section>
          );
        })}
      </div>
    </Container>
  );
}
