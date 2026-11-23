/**
 * Illustrative catalogue structure for the prototype.
 * Product names and any future prices are DEMO ONLY — not the official menu.
 * Expand in Phase 3; keep `demo: true` until the owner supplies real data.
 */

export type DemoCategoryId =
  | "cakes"
  | "fresh-bakes"
  | "breakfast"
  | "burgers-and-bites"
  | "lunch"
  | "desserts"
  | "drinks";

export type DemoCategory = {
  id: DemoCategoryId;
  label: string;
  slug: string;
  description: string;
  heroImage: string;
  editorialImage: string;
};

export type DemoProduct = {
  id: string;
  categoryId: DemoCategoryId;
  name: string;
  description: string;
  image: string;
  /** Always true until official menu confirmation. */
  demo: true;
};

export const DEMO_DISCLAIMER =
  "Menu items shown here are illustrative demonstration content, not the official Amour du Goût menu.";

export const demoCategories: DemoCategory[] = [
  {
    id: "cakes",
    label: "Cakes",
    slug: "cakes",
    description: "Celebration cakes and sweet centrepieces.",
    heroImage: "/assets/hero/transparent-png/hero-strawberry-cake.webp",
    editorialImage: "/assets/editorial/editorial-celebration-cake.png",
  },
  {
    id: "fresh-bakes",
    label: "Fresh Bakes",
    slug: "fresh-bakes",
    description: "Croissants, pastries and warm bakery favourites.",
    heroImage: "/assets/hero/transparent-png/hero-croissant-main.webp",
    editorialImage: "/assets/editorial/editorial-pastry-selection.png",
  },
  {
    id: "breakfast",
    label: "Breakfast",
    slug: "breakfast",
    description: "Mornings worth slowing down for.",
    heroImage: "/assets/hero/transparent-png/hero-breakfast-platter.png",
    editorialImage: "/assets/editorial/editorial-breakfast-spread.png",
  },
  {
    id: "burgers-and-bites",
    label: "Burgers & Bites",
    slug: "burgers-and-bites",
    description: "Satisfying savoury plates and bites.",
    heroImage: "/assets/hero/transparent-png/hero-gourmet-burger.png",
    editorialImage: "/assets/editorial/editorial-gourmet-burger.png",
  },
  {
    id: "lunch",
    label: "Lunch",
    slug: "lunch",
    description: "Plated meals, salads and sharing platters.",
    heroImage: "/assets/hero/transparent-png/hero-lunch-platter.png",
    editorialImage: "/assets/editorial/editorial-lunch-platter.png",
  },
  {
    id: "desserts",
    label: "Desserts",
    slug: "desserts",
    description: "Something sweet to finish the moment.",
    heroImage: "/assets/hero/transparent-png/hero-cheesecake-slice.png",
    editorialImage: "/assets/editorial/editorial-cheesecake-dessert.png",
  },
  {
    id: "drinks",
    label: "Drinks",
    slug: "drinks",
    description: "Coffee, iced drinks and café favourites.",
    heroImage: "/assets/hero/transparent-png/hero-iced-coffee.png",
    editorialImage: "/assets/editorial/editorial-coffee-moment.png",
  },
];

/** Illustrative products for homepage featured section and later menu UI. */
export const demoProducts: DemoProduct[] = [
  {
    id: "demo-croissant",
    categoryId: "fresh-bakes",
    name: "Butter Croissant",
    description: "Golden, flaky layers with a soft centre.",
    image: "/assets/editorial/editorial-croissant-table.png",
    demo: true,
  },
  {
    id: "demo-strawberry-cake",
    categoryId: "cakes",
    name: "Strawberry Celebration Cake",
    description: "Cream, fresh fruit, and a soft celebration finish.",
    image: "/assets/editorial/editorial-celebration-cake.png",
    demo: true,
  },
  {
    id: "demo-breakfast",
    categoryId: "breakfast",
    name: "Breakfast Platter",
    description: "A generous morning plate with café comfort.",
    image: "/assets/editorial/editorial-breakfast-spread.png",
    demo: true,
  },
  {
    id: "demo-burger",
    categoryId: "burgers-and-bites",
    name: "Gourmet Burger",
    description: "Stacked, savoury, and deeply satisfying.",
    image: "/assets/editorial/editorial-gourmet-burger.png",
    demo: true,
  },
  {
    id: "demo-lunch",
    categoryId: "lunch",
    name: "Lunch Platter",
    description: "A composed plate made for midday gathering.",
    image: "/assets/editorial/editorial-lunch-platter.png",
    demo: true,
  },
  {
    id: "demo-cheesecake",
    categoryId: "desserts",
    name: "Cheesecake Slice",
    description: "Creamy dessert with a bright fruit finish.",
    image: "/assets/editorial/editorial-cheesecake-dessert.png",
    demo: true,
  },
];

export function getCategoryLabel(categoryId: DemoCategoryId) {
  return demoCategories.find((category) => category.id === categoryId)?.label ?? categoryId;
}