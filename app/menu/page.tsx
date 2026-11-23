import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { PageIntro } from "@/components/ui/PageIntro";
import {
  DEMO_DISCLAIMER,
  demoCategories,
} from "@/content/demo-catalogue";
import { editorialAssets, heroAssets } from "@/lib/assets";
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
        lede="Category browsing and product details will arrive in Phase 3. For now, explore the provisional category structure used across the prototype."
        actions={
          <Button href="/contact" variant="secondary">
            Enquire
          </Button>
        }
        editorialSrc={editorialAssets.pastrySelection}
        editorialAlt="Assorted pastries in natural light — prototype editorial photography"
        heroSrc={heroAssets.assortedPastries}
        heroAlt="Assorted pastries on a transparent background — prototype hero asset"
        note={DEMO_DISCLAIMER}
      />

      <section className={styles.categories} aria-labelledby="menu-categories">
        <h2 id="menu-categories" className={styles.heading}>
          Categories
        </h2>
        <ul className={styles.grid}>
          {demoCategories.map((category) => (
            <li key={category.id} className={styles.card}>
              <p className={styles.label}>{category.label}</p>
              <p className={styles.description}>{category.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
