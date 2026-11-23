import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/layout/Container";
import { demoCategories } from "@/content/demo-catalogue";
import { site } from "@/content/site";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.brandBlock}>
            <Logo tone="inverse" showTagline={false} />
            <p className={styles.intro}>
              {site.description} A warm space in {site.locationLabel}.
            </p>
          </div>

          <div>
            <h2 className={styles.heading}>Explore</h2>
            <ul className={styles.list}>
              {site.navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={styles.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={styles.heading}>Menu</h2>
            <ul className={styles.list}>
              {demoCategories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/menu#${category.id}`}
                    className={styles.link}
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={styles.heading}>Visit</h2>
            <ul className={styles.list}>
              <li>
                <a
                  href={site.contact.mapsHref}
                  className={styles.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {site.contact.addressLines.join(", ")}
                </a>
              </li>
              <li>
                <a href={site.contact.phoneHref} className={styles.link}>
                  {site.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={site.social.instagramUrl}
                  className={styles.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {site.social.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.meta}>
          <p>
            © {site.name}. All rights reserved.
          </p>
          <p className={styles.disclaimer}>
            Contact details are taken from the public Instagram profile and
            remain pending owner confirmation. Menu content in this prototype is
            demonstration-only.
          </p>
        </div>
      </Container>
    </footer>
  );
}
