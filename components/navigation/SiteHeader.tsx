"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";
import styles from "./SiteHeader.module.css";

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Logo priority showTagline />

        <nav className={styles.nav} aria-label="Primary">
          {site.navigation.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[styles.navLink, active ? styles.navLinkActive : ""]
                  .filter(Boolean)
                  .join(" ")}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.actions}>
          <Button href="/menu" variant="primary">
            Explore Our Menu
          </Button>
        </div>

        <button
          type="button"
          className={[styles.menuToggle, open ? styles.menuToggleOpen : ""]
            .filter(Boolean)
            .join(" ")}
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
        </button>
      </Container>

      <div
        id={panelId}
        className={[styles.mobilePanel, open ? styles.mobilePanelOpen : ""]
          .filter(Boolean)
          .join(" ")}
      >
        <Container>
          <nav className={styles.mobileNav} aria-label="Mobile primary">
            {site.navigation.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    styles.mobileLink,
                    active ? styles.mobileLinkActive : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-current={active ? "page" : undefined}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className={styles.mobileCta}>
            <Button href="/menu" variant="primary" onClick={closeMenu}>
              Explore Our Menu
            </Button>
          </div>
        </Container>
      </div>
    </header>
  );
}
