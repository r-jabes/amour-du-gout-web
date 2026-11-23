import { BrandIntroduction } from "@/components/home/BrandIntroduction";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { FeaturedMenu } from "@/components/home/FeaturedMenu";
import { HomeHero } from "@/components/home/HomeHero";
import { StorytellingExperience } from "@/components/home/StorytellingExperience";
import { site } from "@/content/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: `${site.name} | Where Taste is a Love Story`,
  },
  description: site.description,
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <StorytellingExperience />
      <FeaturedMenu />
      <BrandIntroduction />
      <ClosingCTA />
    </>
  );
}
