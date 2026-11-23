import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { PageIntro } from "@/components/ui/PageIntro";
import { site, whatsappLink } from "@/content/site";
import { editorialAssets } from "@/lib/assets";
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
        lede="Questions, orders or a celebration cake in mind? The quickest way to reach us is a call or a WhatsApp message."
        actions={
          <>
            <Button href={site.contact.phoneHref} variant="primary">
              Call {site.contact.phoneDisplay}
            </Button>
            <Button
              href={whatsappLink(`Hello ${site.name}!`)}
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
            <dt>WhatsApp</dt>
            <dd>
              <a
                className="text-link"
                href={whatsappLink(`Hello ${site.name}!`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Message us
              </a>
            </dd>
          </div>
          <div>
            <dt>Address</dt>
            <dd>
              <address className={styles.address}>
                {site.contact.addressLines.map((line) => (
                  <span key={line} className={styles.line}>
                    {line}
                  </span>
                ))}
              </address>
              <a
                className={`text-link ${styles.directions}`}
                href={site.contact.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get directions
              </a>
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
            <dd>
              Coming soon —{" "}
              <a className="text-link" href={site.contact.phoneHref}>
                call ahead
              </a>{" "}
              to check we’re open.
            </dd>
          </div>
        </dl>
      </section>
    </Container>
  );
}
