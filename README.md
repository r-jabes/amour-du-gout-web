# Amour du Goût — Web

Customer-facing website prototype for **Amour du Goût** (Kigali bakery & café).

Stack: **Next.js (App Router)**, **TypeScript**, **CSS Modules**, design tokens in `styles/tokens.css`.

## Prerequisites

- Node.js 20+ (Node 22/26 also fine)
- npm 10+

## Install

```bash
cd web
npm install
```

## Develop

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build & production preview

```bash
npm run build
npm start
```

## Lint

```bash
npm run lint
```

## Project layout

```text
app/            Routes and global styles
components/     Brand, navigation, layout, UI
content/        Site constants + demo catalogue
lib/            Asset path helpers, motion hooks
public/assets/  Copied brand, hero, and editorial images
styles/         Design tokens
```

## Assets

Source files live in the monorepo `../assets/` directory. Phase 1 copies the brand logo, eight transparent hero images, and eight editorial photographs into `public/assets/` **without modifying the originals**.

Filenames and extensions must match the filesystem (some heroes are `.webp`).

## Prototype boundaries

- Menu products and prices are **demonstration content** until the owner confirms the official menu.
- Contact phone/address are observed from Instagram and marked pending verification.
- Do not invent opening hours, testimonials, or business history.

- Admin / inventory / stock features are out of scope for this app phase.

## Documentation

Project docs live one level up in `../doc/`. Start with:

- `00-PROJECT-OVERVIEW.md`
- `02-BRAND-IDENTITY.md`
- `05-PRE-IMPLEMENTATION-AUDIT.md`
