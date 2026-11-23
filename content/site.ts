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
    mapsHref:
      "https://www.google.com/maps/search/?api=1&query=Amour+du+Go%C3%BBt+KG+628+St+Kigali",
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

/** WhatsApp deep link with an optional prefilled message. */
export function whatsappLink(message?: string) {
  if (!message) return site.contact.whatsappHref;
  return `${site.contact.whatsappHref}?text=${encodeURIComponent(message)}`;
}

export type NavItem = (typeof site.navigation)[number];
