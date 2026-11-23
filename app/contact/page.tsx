import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { PageIntro } from "@/components/ui/PageIntro";
import { site } from "@/content/site";
import { editorialAssets, heroAssets } from "@/lib/assets";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name} in Kigali — phone, location and enquiries.`,
};

export default function ContactPage() {
  return (
    <Container>
      <PageIntro
        eyebrow="Contact"
        title="Say hello"
        lede="Reach Amour du Goût using the public contact details observed from Instagram. Opening hours and ordering policies will be added once confirmed."
        actions={
          <>
            <Button href={site.contact.phoneHref} variant="primary">
              Call {site.contact.phoneDisplay}
            </Button>
            <Button
              href={site.contact.whatsappHref}
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </Button>
          </>
        }
        editorialSrc={editorialAssets.breakfastSpread}
        editorialAlt="Breakfast spread with eggs, fruit and coffee — prototype editorial photography"
        heroSrc={heroAssets.icedCoffee}
        heroAlt="Iced coffee glass with transparent background — prototype hero asset"
        note="Phone and address remain pending owner confirmation before production use."
      />

      <section className={styles.details} aria-labelledby="contact-details">
        <h2 id="contact-details" className={styles.heading}>
          Details
        </h2>
        <dl className={styles.list}>
          <div>
            <dt>Phone</dt>
            <dd>
              <a className="text-link" href={site.contact.phoneHref}>
                {site.contact.phoneDisplay}
              </a>
            </dd>
          </div>
          <div>
            <dt>Address</dt>
            <dd>
              {site.contact.addressLines.map((line) => (
                <span key={line} className={styles.line}>
                  {line}
                </span>
              ))}
            </dd>
          </div>
          <div>
            <dt>Instagram</dt>
            <dd>
              <a
                className="text-link"
                href={site.social.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {site.social.instagramHandle}
              </a>
            </dd>
          </div>
          <div>
            <dt>Opening hours</dt>
            <dd>To be confirmed with the owner.</dd>
          </div>
        </dl>
      </section>
    </Container>
  );
}
