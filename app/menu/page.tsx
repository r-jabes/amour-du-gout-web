import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { MenuExperience } from "@/components/menu/MenuExperience";
import { countMenuItems, menuSections } from "@/content/menu-catalogue";
import { site } from "@/content/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Browse the Amour du Goût menu in Kigali — breakfast, bakery, mains, platters, salads, coffee, tea and more.",
};

export default function MenuPage() {
  return (
    <>
      <Container>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>Our Menu</p>
          <h1 className={styles.title}>Taste the full story</h1>
          <p className={styles.lede}>
            Build your order as you browse, then send everything on WhatsApp in
            one message.
            {` ${countMenuItems()} items across ${menuSections.length} sections, transcribed from the printed menus.`}
          </p>
          <div className={styles.actions}>
            <Button href={site.contact.phoneHref} variant="secondary">
              Call {site.contact.phoneDisplay}
            </Button>
          </div>
        </header>
      </Container>

      <Container>
        <MenuExperience />
      </Container>
    </>
  );
}
