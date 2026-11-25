"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import {
  countMenuItems,
  formatMenuPrice,
  MENU_NOTE,
  menuSections,
  type MenuSection,
} from "@/content/menu-catalogue";
import { site, whatsappLink } from "@/content/site";
import styles from "./MenuExplorer.module.css";

function filterSections(query: string): MenuSection[] {
  const q = query.trim().toLowerCase();
  if (!q) return menuSections;

  return menuSections
    .map((section) => {
      const items = section.items.filter((item) => {
        const haystack = `${item.name} ${item.description ?? ""} ${section.label}`.toLowerCase();
        return haystack.includes(q);
      });
      return { ...section, items };
    })
    .filter((section) => section.items.length > 0);
}

export function MenuExplorer() {
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState(menuSections[0]?.id ?? "");
  const [, startTransition] = useTransition();
  const railRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const visibleSections = useMemo(() => filterSections(query), [query]);
  const visibleCount = visibleSections.reduce(
    (total, section) => total + section.items.length,
    0,
  );
  const totalCount = countMenuItems();
  const searching = query.trim().length > 0;

  useEffect(() => {
    if (searching) return;

    const nodes = visibleSections
      .map((section) => sectionRefs.current[section.id])
      .filter((node): node is HTMLElement => Boolean(node));
    if (!nodes.length) return;

    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio);
        }
        let bestId = "";
        let bestRatio = -1;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }
        if (bestId && bestRatio > 0.12) {
          startTransition(() => setActiveId(bestId));
        }
      },
      {
        rootMargin: "-30% 0px -45% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [visibleSections, searching]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const chip = rail.querySelector<HTMLElement>(`[data-section="${activeId}"]`);
    if (!chip) return;
    const left = chip.offsetLeft - rail.clientWidth / 2 + chip.clientWidth / 2;
    rail.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [activeId]);

  const jumpTo = (id: string) => {
    setActiveId(id);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className={styles.explorer}>
      <div className={styles.toolbar}>
        <div className={styles.searchRow}>
          <label className={styles.search}>
            <span className="sr-only">Search the menu</span>
            <span className={styles.searchIcon} aria-hidden />
            <input
              className={styles.searchInput}
              type="search"
              value={query}
              onChange={(event) => {
                const next = event.target.value;
                startTransition(() => setQuery(next));
              }}
              placeholder="Search croissants, burgers, coffee…"
              autoComplete="off"
            />
          </label>
          <p className={styles.meta} aria-live="polite">
            {searching
              ? `${visibleCount} match${visibleCount === 1 ? "" : "es"}`
              : `${totalCount} items · ${menuSections.length} sections`}
          </p>
        </div>

        {!searching ? (
          <div
            ref={railRef}
            className={styles.rail}
            role="tablist"
            aria-label="Menu sections"
          >
            {menuSections.map((section) => (
              <button
                key={section.id}
                type="button"
                role="tab"
                data-section={section.id}
                aria-selected={activeId === section.id}
                className={[
                  styles.chip,
                  activeId === section.id ? styles.chipActive : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => jumpTo(section.id)}
              >
                {section.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {visibleSections.length === 0 ? (
        <p className={styles.empty}>
          No items match “{query.trim()}”. Try another word, or clear the search.
        </p>
      ) : (
        <div className={styles.layout}>
          {visibleSections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              ref={(node) => {
                sectionRefs.current[section.id] = node;
              }}
              className={styles.section}
              aria-labelledby={`${section.id}-heading`}
            >
              <header className={styles.sectionHead}>
                <p className={styles.count}>
                  {section.items.length} item{section.items.length === 1 ? "" : "s"}
                </p>
                <h2 id={`${section.id}-heading`} className={styles.sectionLabel}>
                  {section.label}
                </h2>
                <p className={styles.sectionCopy}>{section.description}</p>
              </header>

              <ul className={styles.list}>
                {section.items.map((item) => (
                  <li key={item.id} className={styles.item}>
                    <div className={styles.itemTop}>
                      <h3 className={styles.name}>{item.name}</h3>
                      <p className={styles.price}>{formatMenuPrice(item.price)}</p>
                    </div>
                    {item.description ? (
                      <p className={styles.description}>{item.description}</p>
                    ) : null}
                    <div className={styles.itemActions}>
                      <a
                        className={styles.askLink}
                        href={whatsappLink(
                          `Hello ${site.name}! I'd like to order: ${item.name} (${formatMenuPrice(item.price)}).`,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Order on WhatsApp
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}

      <p className={styles.note}>{MENU_NOTE}</p>
    </div>
  );
}
