import { editorialAssets, heroAssets } from "@/lib/assets";
import type { DemoCategoryId } from "@/content/demo-catalogue";

export type StoryAccent = "cream" | "sand" | "blush" | "charcoal" | "cocoa";

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
  headline: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  heroSrc: string;
  heroAlt: string;
  heroOrientation: "landscape" | "portrait";
  secondaryHeroSrc?: string;
  secondaryHeroAlt?: string;
  editorialSrc: string;
  editorialAlt: string;
  accent: StoryAccent;
  cards: FloatingCardContent[];
};

export const storyChapters: StoryChapter[] = [
  {
    id: "layers-of-love",
    index: 1,
    categoryId: "fresh-bakes",
    categoryLabel: "Fresh Bakes",
    headline: "Layers of Love",
    description:
      "Golden folds, quiet warmth, and the kind of bakery moment that slows the day.",
    ctaLabel: "Explore Fresh Bakes",
    ctaHref: "/menu",
    heroSrc: heroAssets.croissantMain,
    heroAlt: "Golden croissant with transparent background — illustrative prototype imagery",
    heroOrientation: "landscape",
    editorialSrc: editorialAssets.croissantTable,
    editorialAlt: "Croissant on a ceramic plate with coffee — illustrative editorial photography",
    accent: "cream",
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
    headline: "Made for Celebrations",
    description:
      "Fruit, cream, and soft celebration energy — cakes that make a table feel complete.",
    ctaLabel: "Browse Cakes",
    ctaHref: "/menu",
    heroSrc: heroAssets.strawberryCake,
    heroAlt: "Strawberry celebration cake with transparent background — illustrative prototype imagery",
    heroOrientation: "landscape",
    editorialSrc: editorialAssets.celebrationCake,
    editorialAlt: "Celebration cake with strawberries — illustrative editorial photography",
    accent: "blush",
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
    headline: "Fresh From the Oven",
    description:
      "Pastries with colour, texture, and that irresistible just-baked glow.",
    ctaLabel: "See Fresh Bakes",
    ctaHref: "/menu",
    heroSrc: heroAssets.assortedPastries,
    heroAlt: "Assorted pastries with transparent background — illustrative prototype imagery",
    heroOrientation: "landscape",
    editorialSrc: editorialAssets.pastrySelection,
    editorialAlt: "Assorted pastries in natural light — illustrative editorial photography",
    accent: "sand",
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
    headline: "A Beautiful Way to Begin",
    description:
      "Plates meant for unhurried mornings — eggs, toast, fruit, and café comfort.",
    ctaLabel: "Discover Breakfast",
    ctaHref: "/menu",
    heroSrc: heroAssets.breakfastPlatter,
    heroAlt: "Breakfast platter with transparent background — illustrative prototype imagery",
    heroOrientation: "landscape",
    editorialSrc: editorialAssets.breakfastSpread,
    editorialAlt: "Breakfast spread with eggs and fruit — illustrative editorial photography",
    accent: "cream",
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
    headline: "Something Worth Craving",
    description:
      "Stacked, savoury, and deeply satisfying — food for when appetite takes the lead.",
    ctaLabel: "View Burgers & Bites",
    ctaHref: "/menu",
    heroSrc: heroAssets.gourmetBurger,
    heroAlt: "Gourmet burger with transparent background — illustrative prototype imagery",
    heroOrientation: "landscape",
    editorialSrc: editorialAssets.gourmetBurger,
    editorialAlt: "Gourmet burger with fries — illustrative editorial photography",
    accent: "cocoa",
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
    headline: "Gather Around the Table",
    description:
      "Generous plates and sharing energy — lunch that invites people closer.",
    ctaLabel: "Explore Lunch",
    ctaHref: "/menu",
    heroSrc: heroAssets.lunchPlatter,
    heroAlt: "Lunch platter with transparent background — illustrative prototype imagery",
    heroOrientation: "landscape",
    editorialSrc: editorialAssets.lunchPlatter,
    editorialAlt: "Lunch platter with sandwich and fries — illustrative editorial photography",
    accent: "sand",
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
    headline: "A Little Something Sweet",
    description:
      "Soft dessert finishes and chilled café pours — the last note worth lingering on.",
    ctaLabel: "Find Desserts & Drinks",
    ctaHref: "/menu",
    heroSrc: heroAssets.cheesecakeSlice,
    heroAlt: "Cheesecake slice with transparent background — illustrative prototype imagery",
    heroOrientation: "landscape",
    secondaryHeroSrc: heroAssets.icedCoffee,
    secondaryHeroAlt:
      "Iced coffee with transparent background — illustrative prototype imagery",
    editorialSrc: editorialAssets.coffeeMoment,
    editorialAlt: "Iced coffee and croissant on a wooden table — illustrative editorial photography",
    accent: "charcoal",
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
