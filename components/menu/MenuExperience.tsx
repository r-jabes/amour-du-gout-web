"use client";

import { OrderCart } from "@/components/cart/OrderCart";
import { MenuExplorer } from "@/components/menu/MenuExplorer";
import { CartProvider } from "@/lib/cart";

export function MenuExperience() {
  return (
    <CartProvider>
      <MenuExplorer />
      <OrderCart />
    </CartProvider>
  );
}
