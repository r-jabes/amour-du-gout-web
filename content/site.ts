/**
 * Verified / observed site constants.
 * Phone and address come from the Instagram profile screenshot (doc/01).
 * Marked pending verification before production deployment.
 */

export const site = {
  name: "Amour du Goût",
  tagline: "Where Taste is a Love Story",
  locationLabel: "Kigali, Rwanda",
  description:
    "A Kigali bakery and café offering fresh bakes, cakes, breakfast, burgers, lunch, desserts and coffee.",
  contact: {
    phoneDisplay: "+250 788 231 434",
    phoneHref: "tel:+250788231434",
    whatsappHref: "https://wa.me/250788231434",
    addressLines: ["KG 628 St", "Kigali, Rwanda"],
    /** Observed from Instagram; confirm with the owner before production. */
    verificationStatus: "pending-owner-confirmation" as const,
  },
  social: {
    instagramHandle: "@amourdugout.rw",
    instagramUrl: "https://www.instagram.com/amourdugout.rw/",
  },
  navigation: [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/about", label: "Our Story" },
    { href: "/contact", label: "Contact" },
  ] as const,
} as const;

export type NavItem = (typeof site.navigation)[number];
