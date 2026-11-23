import { heroAssets } from "@/lib/assets";
import type { DemoCategoryId } from "@/content/demo-catalogue";

export type FloatingCardContent = {
  label: string;
  title: string;
  detail: string;
};

export type StoryChapter = {
  id: string;
  index: number;
  categoryId: DemoCategoryId | "desserts-drinks";
  categoryLabel: string;
  /** Short label for the bottom category strip */
  navLabel: string;
  headline: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  heroSrc: string;
  heroAlt: string;
  heroOrientation: "landscape" | "portrait";
  secondaryHeroSrc?: string;
  secondaryHeroAlt?: string;
  /** Full-bleed stage colour — monochromatic field behind the product */
  background: string;
  /** Softer centre glow for the radial studio wash */
  glow: string;
  textTone: "dark" | "light";
  cards: FloatingCardContent[];
};

export const storyChapters: StoryChapter[] = [
  {
    id: "layers-of-love",
    index: 1,
    categoryId: "fresh-bakes",
    categoryLabel: "Fresh Bakes",
    navLabel: "Croissant",
    headline: "Layers of Love",
    description:
      "Freshly baked moments, crafted to make every bite feel special — a warm bakery and café story from Kigali.",
    ctaLabel: "Explore Our Menu",
    ctaHref: "/menu",
    heroSrc: heroAssets.croissantMain,
    heroAlt:
      "Golden croissant with transparent background — illustrative prototype imagery",
    heroOrientation: "landscape",
    background: "#E9D5C0",
    glow: "#F7EADF",
    textTone: "dark",
    cards: [
      {
        label: "Illustrative",
        title: "Butter Croissant",
        detail: "Flaky layers, soft centre",
      },
      {
        label: "Café",
        title: "Morning Pairing",
        detail: "Best with a warm cup",
      },
    ],
  },
  {
    id: "cakes",
    index: 2,
    categoryId: "cakes",
    categoryLabel: "Cakes",
    navLabel: "Cakes",
    headline: "Made for Celebrations",
    description:
      "Fruit, cream, and soft celebration energy — cakes that make a table feel complete.",
    ctaLabel: "Browse Cakes",
    ctaHref: "/menu",
    heroSrc: heroAssets.strawberryCake,
    heroAlt:
      "Strawberry celebration cake with transparent background — illustrative prototype imagery",
    heroOrientation: "landscape",
    background: "#E4B8B4",
    glow: "#F3D9D5",
    textTone: "dark",
    cards: [
      {
        label: "Illustrative",
        title: "Strawberry Cake",
        detail: "Cream, fruit, soft finish",
      },
      {
        label: "Occasion",
        title: "Custom Moments",
        detail: "Ask us about celebrations",
      },
    ],
  },
  {
    id: "fresh-bakes",
    index: 3,
    categoryId: "fresh-bakes",
    categoryLabel: "Fresh Bakes",
    navLabel: "Pastries",
    headline: "Fresh From the Oven",
    description:
      "Pastries with colour, texture, and that irresistible just-baked glow.",
    ctaLabel: "See Fresh Bakes",
    ctaHref: "/menu",
    heroSrc: heroAssets.assortedPastries,
    heroAlt:
      "Assorted pastries with transparent background — illustrative prototype imagery",
    heroOrientation: "landscape",
    background: "#E7C9A4",
    glow: "#F5E2CB",
    textTone: "dark",
    cards: [
      {
        label: "Illustrative",
        title: "Pastry Selection",
        detail: "Sweet and golden favourites",
      },
      {
        label: "Bakes",
        title: "Daily Warmth",
        detail: "Freshly presented bites",
      },
    ],
  },
  {
    id: "breakfast",
    index: 4,
    categoryId: "breakfast",
    categoryLabel: "Breakfast",
    navLabel: "Breakfast",
    headline: "A Beautiful Way to Begin",
    description:
      "Plates meant for unhurried mornings — eggs, toast, fruit, and café comfort.",
    ctaLabel: "Discover Breakfast",
    ctaHref: "/menu",
    heroSrc: heroAssets.breakfastPlatter,
    heroAlt:
      "Breakfast platter with transparent background — illustrative prototype imagery",
    heroOrientation: "landscape",
    background: "#E6D4A8",
    glow: "#F4EBD0",
    textTone: "dark",
    cards: [
      {
        label: "Illustrative",
        title: "Breakfast Platter",
        detail: "A full morning plate",
      },
      {
        label: "Pairing",
        title: "Coffee Side",
        detail: "Start soft, stay warm",
      },
    ],
  },
  {
    id: "burgers",
    index: 5,
    categoryId: "burgers-and-bites",
    categoryLabel: "Burgers & Bites",
    navLabel: "Burgers",
    headline: "Something Worth Craving",
    description:
      "Stacked, savoury, and deeply satisfying — food for when appetite takes the lead.",
    ctaLabel: "View Burgers & Bites",
    ctaHref: "/menu",
    heroSrc: heroAssets.gourmetBurger,
    heroAlt:
      "Gourmet burger with transparent background — illustrative prototype imagery",
    heroOrientation: "landscape",
    background: "#C9A88A",
    glow: "#E2CDB8",
    textTone: "dark",
    cards: [
      {
        label: "Illustrative",
        title: "Gourmet Burger",
        detail: "Rich layers, crisp edges",
      },
      {
        label: "Bites",
        title: "Savoury Sides",
        detail: "Made for sharing",
      },
    ],
  },
  {
    id: "lunch",
    index: 6,
    categoryId: "lunch",
    categoryLabel: "Lunch",
    navLabel: "Lunch",
    headline: "Gather Around the Table",
    description:
      "Generous plates and sharing energy — lunch that invites people closer.",
    ctaLabel: "Explore Lunch",
    ctaHref: "/menu",
    heroSrc: heroAssets.lunchPlatter,
    heroAlt:
      "Lunch platter with transparent background — illustrative prototype imagery",
    heroOrientation: "landscape",
    background: "#D2C2A8",
    glow: "#E8DDCC",
    textTone: "dark",
    cards: [
      {
        label: "Illustrative",
        title: "Lunch Platter",
        detail: "Sandwich, salad, fries",
      },
      {
        label: "Share",
        title: "Table Moments",
        detail: "Built for gathering",
      },
    ],
  },
  {
    id: "desserts-drinks",
    index: 7,
    categoryId: "desserts-drinks",
    categoryLabel: "Desserts & Drinks",
    navLabel: "Sweets",
    headline: "A Little Something Sweet",
    description:
      "Soft dessert finishes and chilled café pours — the last note worth lingering on.",
    ctaLabel: "Find Desserts & Drinks",
    ctaHref: "/menu",
    heroSrc: heroAssets.cheesecakeSlice,
    heroAlt:
      "Cheesecake slice with transparent background — illustrative prototype imagery",
    heroOrientation: "landscape",
    secondaryHeroSrc: heroAssets.icedCoffee,
    secondaryHeroAlt:
      "Iced coffee with transparent background — illustrative prototype imagery",
    background: "#B89A92",
    glow: "#D4BDB7",
    textTone: "dark",
    cards: [
      {
        label: "Illustrative",
        title: "Cheesecake",
        detail: "Creamy, bright, finished",
      },
      {
        label: "Drinks",
        title: "Iced Coffee",
        detail: "Cool, layered, inviting",
      },
    ],
  },
];
