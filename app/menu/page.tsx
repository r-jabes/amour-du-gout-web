import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { MenuExplorer } from "@/components/menu/MenuExplorer";
import { countMenuItems, menuSections } from "@/content/menu-catalogue";
import { site, whatsappLink } from "@/content/site";
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
            Jump between sections, search by name, or message us to order.
            This selection is transcribed from the printed Amour du Goût menus —
            {` ${countMenuItems()} clearly readable items across ${menuSections.length} sections.`}
          </p>
          <div className={styles.actions}>
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
          </div>
        </header>
      </Container>

      <Container>
        <MenuExplorer />
      </Container>
    </>
  );
}
