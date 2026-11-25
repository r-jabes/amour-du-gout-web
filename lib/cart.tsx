"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { formatMenuPrice } from "@/content/menu-catalogue";
import { site, whatsappLink } from "@/content/site";

export type CartLine = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  sectionLabel: string;
};

type CartSnapshot = {
  lines: CartLine[];
  note: string;
};

type CartContextValue = {
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  isOpen: boolean;
  note: string;
  openCart: () => void;
  closeCart: () => void;
  setNote: (note: string) => void;
  addItem: (item: Omit<CartLine, "quantity">, quantity?: number) => void;
  setQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getQuantity: (id: string) => number;
  checkoutHref: string;
};

const STORAGE_KEY = "adg-order-cart-v1";
const EMPTY_SNAPSHOT: CartSnapshot = { lines: [], note: "" };
const CartContext = createContext<CartContextValue | null>(null);

let memorySnapshot: CartSnapshot = EMPTY_SNAPSHOT;
let hasLoaded = false;
const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) listener();
}

function isCartLine(value: unknown): value is CartLine {
  if (!value || typeof value !== "object") return false;
  const line = value as Partial<CartLine>;
  return (
    typeof line.id === "string" &&
    typeof line.name === "string" &&
    typeof line.price === "number" &&
    typeof line.quantity === "number" &&
    line.quantity > 0 &&
    typeof line.sectionLabel === "string"
  );
}

function parseSnapshot(raw: string | null): CartSnapshot {
  if (!raw) return EMPTY_SNAPSHOT;
  try {
    const parsed = JSON.parse(raw) as Partial<CartSnapshot>;
    const lines = Array.isArray(parsed.lines)
      ? parsed.lines.filter(isCartLine)
      : [];
    if (lines.length === 0 && !parsed.note) return EMPTY_SNAPSHOT;
    return {
      lines,
      note: typeof parsed.note === "string" ? parsed.note : "",
    };
  } catch {
    return EMPTY_SNAPSHOT;
  }
}

function ensureLoaded() {
  if (hasLoaded || typeof window === "undefined") return;
  memorySnapshot = parseSnapshot(window.localStorage.getItem(STORAGE_KEY));
  hasLoaded = true;
}

function getSnapshot(): CartSnapshot {
  ensureLoaded();
  return memorySnapshot;
}

function writeSnapshot(next: CartSnapshot) {
  const normalized =
    next.lines.length === 0 && !next.note.trim() ? EMPTY_SNAPSHOT : next;
  memorySnapshot = normalized;
  hasLoaded = true;
  if (typeof window !== "undefined") {
    if (normalized === EMPTY_SNAPSHOT) {
      window.localStorage.removeItem(STORAGE_KEY);
    } else {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    }
  }
  emitChange();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  ensureLoaded();

  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    memorySnapshot = parseSnapshot(event.newValue);
    hasLoaded = true;
    emitChange();
  };

  if (typeof window !== "undefined") {
    window.addEventListener("storage", onStorage);
  }

  return () => {
    listeners.delete(listener);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", onStorage);
    }
  };
}

function getServerSnapshot(): CartSnapshot {
  return EMPTY_SNAPSHOT;
}

export function formatOrderMessage(lines: CartLine[], note: string) {
  const itemCount = lines.reduce((total, line) => total + line.quantity, 0);
  const subtotal = lines.reduce(
    (total, line) => total + line.price * line.quantity,
    0,
  );

  const body = lines
    .map((line, index) => {
      const lineTotal = formatMenuPrice(line.price * line.quantity);
      return `${index + 1}. ${line.name} × ${line.quantity}\n   ${line.sectionLabel} · ${lineTotal}`;
    })
    .join("\n");

  const noteBlock = note.trim()
    ? `\n\nNotes:\n${note.trim()}`
    : "\n\nNotes: (optional)";

  return [
    `Hello ${site.name}!`,
    "",
    "I would like to place an order:",
    "",
    body,
    "",
    `Items: ${itemCount}`,
    `Total: ${formatMenuPrice(subtotal)}`,
    noteBlock,
    "",
    "Please confirm availability. Thank you!",
  ].join("\n");
}

export function CartProvider({ children }: { children: ReactNode }) {
  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback(
    (item: Omit<CartLine, "quantity">, quantity = 1) => {
      const current = getSnapshot();
      const existing = current.lines.find((line) => line.id === item.id);
      const lines = existing
        ? current.lines.map((line) =>
            line.id === item.id
              ? { ...line, quantity: line.quantity + quantity }
              : line,
          )
        : [...current.lines, { ...item, quantity }];
      writeSnapshot({ ...current, lines });
    },
    [],
  );

  const setQuantity = useCallback((id: string, quantity: number) => {
    const current = getSnapshot();
    const lines =
      quantity <= 0
        ? current.lines.filter((line) => line.id !== id)
        : current.lines.map((line) =>
            line.id === id ? { ...line, quantity } : line,
          );
    writeSnapshot({ ...current, lines });
  }, []);

  const removeItem = useCallback((id: string) => {
    const current = getSnapshot();
    writeSnapshot({
      ...current,
      lines: current.lines.filter((line) => line.id !== id),
    });
  }, []);

  const clearCart = useCallback(() => {
    writeSnapshot(EMPTY_SNAPSHOT);
  }, []);

  const setNote = useCallback((note: string) => {
    const current = getSnapshot();
    writeSnapshot({ ...current, note });
  }, []);

  const getQuantity = useCallback(
    (id: string) =>
      snapshot.lines.find((line) => line.id === id)?.quantity ?? 0,
    [snapshot.lines],
  );

  const itemCount = useMemo(
    () => snapshot.lines.reduce((total, line) => total + line.quantity, 0),
    [snapshot.lines],
  );

  const subtotal = useMemo(
    () =>
      snapshot.lines.reduce(
        (total, line) => total + line.price * line.quantity,
        0,
      ),
    [snapshot.lines],
  );

  const checkoutHref = useMemo(
    () => whatsappLink(formatOrderMessage(snapshot.lines, snapshot.note)),
    [snapshot.lines, snapshot.note],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      lines: snapshot.lines,
      itemCount,
      subtotal,
      isOpen,
      note: snapshot.note,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      setNote,
      addItem,
      setQuantity,
      removeItem,
      clearCart,
      getQuantity,
      checkoutHref,
    }),
    [
      snapshot.lines,
      snapshot.note,
      itemCount,
      subtotal,
      isOpen,
      setNote,
      addItem,
      setQuantity,
      removeItem,
      clearCart,
      getQuantity,
      checkoutHref,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
