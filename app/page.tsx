import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { PageIntro } from "@/components/ui/PageIntro";
import { Reveal } from "@/components/ui/Reveal";
import { DEMO_DISCLAIMER } from "@/content/demo-catalogue";
import { site } from "@/content/site";
import { editorialAssets, heroAssets } from "@/lib/assets";

export default function HomePage() {
  return (
    <Container>
      <Reveal>
        <PageIntro
          eyebrow="Phase 1 foundation"
          title="Amour du Goût"
          lede={`${site.tagline} A premium bakery and café experience for Kigali — storytelling homepage arrives in Phase 2.`}
          actions={
            <>
              <Button href="/menu" variant="primary">
                Explore Our Menu
              </Button>
              <Button href="/about" variant="secondary">
                Our Story
              </Button>
            </>
          }
          editorialSrc={editorialAssets.croissantTable}
          editorialAlt="Golden croissant on a ceramic plate with coffee in soft morning light — prototype editorial photography"
          heroSrc={heroAssets.croissantMain}
          heroAlt="Isolated golden croissant with transparent background — prototype hero asset"
          note={DEMO_DISCLAIMER}
        />
      </Reveal>
    </Container>
  );
}
