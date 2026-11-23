"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { demoCategories } from "@/content/demo-catalogue";
import { site, whatsappLink } from "@/content/site";
import styles from "./SiteHeader.module.css";

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const cx = (...classes: Array<string | false | undefined>) =>
  classes.filter(Boolean).join(" ");

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const wasOpen = useRef(false);
  const navRef = useRef<HTMLElement | null>(null);
  const pillRef = useRef<HTMLSpanElement | null>(null);
  const ghostRef = useRef<HTMLSpanElement | null>(null);
  // Href the user just clicked: the pill slides there immediately instead of
  // waiting for the route change to commit.
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  // Close the menu whenever the route changes.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
    setPendingHref(null);
  }

  const activeHref =
    pendingHref ??
    site.navigation.find((item) => isActivePath(pathname, item.href))?.href ??
    null;

  // Desktop nav: one highlight pill that slides between links.
  useLayoutEffect(() => {
    const nav = navRef.current;
    const pill = pillRef.current;
    if (!nav || !pill) return;

    const place = () => {
      const link = activeHref
        ? nav.querySelector<HTMLElement>(`[data-href="${activeHref}"]`)
        : null;
      if (!link) {
        pill.style.opacity = "0";
        return;
      }
      pill.style.opacity = "1";
      pill.style.setProperty("--x", `${link.offsetLeft}px`);
      pill.style.setProperty("--w", `${link.offsetWidth}px`);
      // Enable transitions only after the first placement so the pill
      // doesn't fly in from the left on page load.
      requestAnimationFrame(() => pill.setAttribute("data-ready", ""));
    };

    place();
    // Re-measure if widths change (web fonts loading, resize).
    const observer = new ResizeObserver(place);
    observer.observe(nav);
    return () => observer.disconnect();
  }, [activeHref]);

  const showGhost = (link: HTMLElement) => {
    const ghost = ghostRef.current;
    if (!ghost) return;
    const visible = ghost.hasAttribute("data-visible");
    // Appear in place on first hover, then slide between links.
    if (!visible) ghost.removeAttribute("data-ready");
    ghost.style.setProperty("--x", `${link.offsetLeft}px`);
    ghost.style.setProperty("--w", `${link.offsetWidth}px`);
    ghost.setAttribute("data-visible", "");
    if (!visible) requestAnimationFrame(() => ghost.setAttribute("data-ready", ""));
  };
  const hideGhost = () => ghostRef.current?.removeAttribute("data-visible");

  // While open: lock page scroll, make the page behind inert (keeps keyboard
  // and screen-reader focus inside the menu), close on Escape, and close if
  // the viewport grows to desktop width where the overlay is hidden.
  useEffect(() => {
    if (!open) return;
    const behind = [
      document.getElementById("main-content"),
      document.querySelector<HTMLElement>("body > footer"),
    ].filter((node): node is HTMLElement => Boolean(node));
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    behind.forEach((node) => node.setAttribute("inert", ""));

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 900px)");
    const onChange = () => desktop.matches && setOpen(false);
    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onChange);

    return () => {
      document.body.style.overflow = overflow;
      behind.forEach((node) => node.removeAttribute("inert"));
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onChange);
    };
  }, [open]);

  // Move focus into the menu on open; return it to the toggle on close.
  useEffect(() => {
    if (open) {
      firstLinkRef.current?.focus({ preventScroll: true });
    } else if (wasOpen.current) {
      toggleRef.current?.focus({ preventScroll: true });
    }
    wasOpen.current = open;
  }, [open]);

  const closeMenu = () => setOpen(false);
  const onMenuPage = isActivePath(pathname, "/menu");
  const orderHref = whatsappLink(
    `Hello ${site.name}! I'd like to place an order.`,
  );

  return (
    <header className={cx(styles.header, open && styles.headerOpen)}>
      <Container className={styles.inner}>
        <Logo priority showTagline tone={open ? "inverse" : "default"} />

        <nav
          ref={navRef}
          className={styles.nav}
          aria-label="Primary"
          onMouseLeave={hideGhost}
        >
          <span ref={ghostRef} className={styles.navGhost} aria-hidden />
          <span ref={pillRef} className={styles.navPill} aria-hidden />
          {site.navigation.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                data-href={item.href}
                className={cx(
                  styles.navLink,
                  item.href === activeHref && styles.navLinkActive,
                )}
                aria-current={active ? "page" : undefined}
                onMouseEnter={(event) => showGhost(event.currentTarget)}
                onFocus={(event) => showGhost(event.currentTarget)}
                onBlur={hideGhost}
                onClick={() => setPendingHref(item.href)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.actions}>
          {onMenuPage ? (
            <Button
              href={orderHref}
              variant="primary"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cta}
            >
              Order on WhatsApp
              <span className={styles.ctaArrow} aria-hidden>
                ↗
              </span>
            </Button>
          ) : (
            <Button href="/menu" variant="primary" className={styles.cta}>
              Explore Our Menu
              <span className={styles.ctaArrow} aria-hidden>
                →
              </span>
            </Button>
          )}
        </div>

        <button
          ref={toggleRef}
          type="button"
          className={cx(styles.menuToggle, open && styles.menuToggleOpen)}
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className={styles.toggleText} aria-hidden>
            {open ? "Close" : "Menu"}
          </span>
          <span className={styles.toggleIcon} aria-hidden>
            <span />
            <span />
          </span>
        </button>
      </Container>

      <div
        id={panelId}
        className={cx(styles.overlay, open && styles.overlayOpen)}
        inert={!open}
        aria-hidden={!open}
      >
        <div className={styles.overlayGlow} aria-hidden />
        <div className={styles.overlayInner}>
          <nav aria-label="Mobile primary">
            <ol className={styles.menuList}>
              {site.navigation.map((item, index) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <li
                    key={item.href}
                    className={styles.menuItem}
                    style={{ "--d": index } as CSSProperties}
                  >
                    <Link
                      ref={index === 0 ? firstLinkRef : undefined}
                      href={item.href}
                      className={cx(
                        styles.menuLink,
                        active && styles.menuLinkActive,
                      )}
                      aria-current={active ? "page" : undefined}
                      onClick={closeMenu}
                    >
                      <span className={styles.menuIndex}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className={styles.menuLabel}>{item.label}</span>
                      <span className={styles.menuArrow} aria-hidden>
                        →
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </nav>

          <div
            className={cx(styles.reveal, styles.categories)}
            style={{ "--d": site.navigation.length } as CSSProperties}
          >
            <p className={styles.sectionLabel}>Jump to the menu</p>
            <ul className={styles.categoryRow}>
              {demoCategories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/menu#${category.id}`}
                    className={styles.categoryCard}
                    onClick={closeMenu}
                  >
                    <span className={styles.categoryThumb}>
                      <Image
                        src={category.heroImage}
                        alt=""
                        fill
                        sizes="64px"
                      />
                    </span>
                    <span className={styles.categoryName}>
                      {category.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={cx(styles.reveal, styles.menuActions)}
            style={{ "--d": site.navigation.length + 1 } as CSSProperties}
          >
            <Button href="/menu" variant="primary" onClick={closeMenu}>
              Explore Our Menu
            </Button>
            <div className={styles.quickActions}>
              <a className={styles.quick} href={site.contact.phoneHref}>
                Call us
              </a>
              <a
                className={styles.quick}
                href={orderHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </div>
          </div>

          <div
            className={cx(styles.reveal, styles.menuMeta)}
            style={{ "--d": site.navigation.length + 2 } as CSSProperties}
          >
            <a
              href={site.contact.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              {site.contact.addressLines.join(", ")}
            </a>
            <a
              href={site.social.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {site.social.instagramHandle}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
