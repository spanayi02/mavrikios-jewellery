import { Hero } from "@/components/home/hero";
import { CuratedCategories } from "@/components/home/curated-categories";
import { ProductRail } from "@/components/home/product-rail";
import { HeritageStory } from "@/components/home/heritage-story";
import { CampaignFeature } from "@/components/home/campaign-feature";
import { EngagementFeature } from "@/components/home/engagement-feature";
import { BespokeEditorial } from "@/components/home/bespoke-editorial";
import { CraftServices } from "@/components/home/craft-services";
import { ReviewsSection } from "@/components/home/reviews-section";
import { InstagramSection } from "@/components/home/instagram-section";
import { BoutiqueLocation } from "@/components/home/boutique-location";
import { getBestSellers, getNewArrivals } from "@/lib/data/products";

export default async function HomePage() {
  const [newArrivals, bestSellers] = await Promise.all([getNewArrivals(), getBestSellers()]);

  return (
    <>
      <Hero />
      <CuratedCategories />
      <ProductRail
        eyebrow="Just In"
        title="New Arrivals"
        description="The latest pieces to join the boutique, in gold, pearl and stone."
        viewAllHref="/shop?sort=newest"
        products={newArrivals}
      />
      <HeritageStory />
      <CampaignFeature />
      <EngagementFeature />
      <ProductRail
        eyebrow="Most Loved"
        title="Best Sellers"
        description="The pieces our customers return for, season after season."
        viewAllHref="/shop?filter=bestseller"
        products={bestSellers}
        tinted
      />
      <BespokeEditorial />
      <CraftServices />
      <ReviewsSection />
      <InstagramSection />
      <BoutiqueLocation />
    </>
  );
}
