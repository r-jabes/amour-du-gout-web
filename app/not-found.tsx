import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { PageIntro } from "@/components/ui/PageIntro";

export default function NotFound() {
  return (
    <Container>
      <PageIntro
        eyebrow="404"
        title="This page wandered off"
        lede="We couldn’t find what you were looking for — but there’s plenty of good things on the menu."
        actions={
          <>
            <Button href="/menu" variant="primary">
              Explore Our Menu
            </Button>
            <Button href="/" variant="secondary">
              Back to home
            </Button>
          </>
        }
      />
    </Container>
  );
}
