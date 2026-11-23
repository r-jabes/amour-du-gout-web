import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { PageIntro } from "@/components/ui/PageIntro";
import { site } from "@/content/site";
import { editorialAssets, heroAssets } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Our Story",
  description: `${site.tagline} Learn about Amour du Goût — a bakery and café in Kigali.`,
};

export default function AboutPage() {
  return (
    <Container>
      <PageIntro
        eyebrow="Our Story"
        title={site.tagline}
        lede="Amour du Goût brings together fresh bakes, coffee, breakfast, burgers, lunch and desserts in a warm Kigali space. A fuller editorial story will land in Phase 4 — without invented history or awards."
        actions={
          <>
            <Button href="/menu" variant="primary">
              Explore Our Menu
            </Button>
            <Button href="/contact" variant="secondary">
              Visit us
            </Button>
          </>
        }
        editorialSrc={editorialAssets.coffeeMoment}
        editorialAlt="Iced coffee and croissant on a sunlit wooden table — prototype editorial photography"
        heroSrc={heroAssets.strawberryCake}
        heroAlt="Strawberry celebration cake with transparent background — prototype hero asset"
        note="Business history and milestones will only appear once confirmed by the owner."
      />
    </Container>
  );
}
