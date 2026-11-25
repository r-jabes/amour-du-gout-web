"use client";

import { useEffect } from "react";
import { formatMenuPrice } from "@/content/menu-catalogue";
import { useCart } from "@/lib/cart";
import styles from "./OrderCart.module.css";

export function OrderCart() {
  const {
    lines,
    itemCount,
    subtotal,
    isOpen,
    note,
    openCart,
    closeCart,
    setNote,
    setQuantity,
    removeItem,
    clearCart,
    checkoutHref,
  } = useCart();

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeCart]);

  const hasItems = itemCount > 0;

  return (
    <>
      <div
        className={[styles.bar, hasItems && !isOpen ? "" : styles.barHidden]
          .filter(Boolean)
          .join(" ")}
        aria-hidden={!hasItems || isOpen}
      >
        <div className={styles.barMeta}>
          <p className={styles.barCount}>
            {itemCount} item{itemCount === 1 ? "" : "s"} in order
          </p>
          <p className={styles.barTotal}>{formatMenuPrice(subtotal)}</p>
        </div>
        <button type="button" className={styles.barButton} onClick={openCart}>
          Review order
        </button>
      </div>

      <button
        type="button"
        className={[styles.overlay, isOpen ? styles.overlayOpen : ""]
          .filter(Boolean)
          .join(" ")}
        aria-label="Close order cart"
        tabIndex={isOpen ? 0 : -1}
        onClick={closeCart}
      />

      <aside
        className={[styles.drawer, isOpen ? styles.drawerOpen : ""]
          .filter(Boolean)
          .join(" ")}
        aria-hidden={!isOpen}
        inert={!isOpen ? true : undefined}
        aria-label="Your order"
      >
        <header className={styles.drawerHead}>
          <div>
            <p className={styles.drawerEyebrow}>Your order</p>
            <h2 className={styles.drawerTitle}>Ready to send</h2>
          </div>
          <button
            type="button"
            className={styles.closeButton}
            aria-label="Close"
            onClick={closeCart}
          >
            ×
          </button>
        </header>

        <div className={styles.drawerBody}>
          {!hasItems ? (
            <p className={styles.empty}>
              Your cart is empty. Add items from the menu, then send the full
              order on WhatsApp.
            </p>
          ) : (
            <>
              <ul className={styles.list}>
                {lines.map((line) => (
                  <li key={line.id} className={styles.line}>
                    <div className={styles.lineTop}>
                      <div>
                        <p className={styles.lineName}>{line.name}</p>
                        <p className={styles.lineSection}>{line.sectionLabel}</p>
                      </div>
                      <p className={styles.linePrice}>
                        {formatMenuPrice(line.price * line.quantity)}
                      </p>
                    </div>
                    <div className={styles.lineControls}>
                      <div className={styles.stepper}>
                        <button
                          type="button"
                          className={styles.stepButton}
                          aria-label={`Decrease ${line.name}`}
                          onClick={() =>
                            setQuantity(line.id, line.quantity - 1)
                          }
                        >
                          −
                        </button>
                        <span className={styles.qty}>{line.quantity}</span>
                        <button
                          type="button"
                          className={styles.stepButton}
                          aria-label={`Increase ${line.name}`}
                          onClick={() =>
                            setQuantity(line.id, line.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className={styles.remove}
                        onClick={() => removeItem(line.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <label className={styles.noteField}>
                <span className={styles.noteLabel}>Order notes</span>
                <textarea
                  className={styles.noteInput}
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder="Preferred time, dietary notes, or pickup details…"
                  rows={3}
                />
              </label>
            </>
          )}
        </div>

        <footer className={styles.drawerFoot}>
          <div className={styles.summary}>
            <span className={styles.summaryLabel}>
              {itemCount} item{itemCount === 1 ? "" : "s"}
            </span>
            <span className={styles.summaryTotal}>
              {formatMenuPrice(subtotal)}
            </span>
          </div>

          {hasItems ? (
            <a
              className={styles.checkout}
              href={checkoutHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeCart}
            >
              Send order on WhatsApp
            </a>
          ) : (
            <span className={[styles.checkout, styles.checkoutDisabled].join(" ")}>
              Send order on WhatsApp
            </span>
          )}

          {hasItems ? (
            <button type="button" className={styles.clear} onClick={clearCart}>
              Clear order
            </button>
          ) : null}

          <p className={styles.hint}>
            WhatsApp opens with your full order ready to send. Availability is
            confirmed by the café.
          </p>
        </footer>
      </aside>
    </>
  );
}
