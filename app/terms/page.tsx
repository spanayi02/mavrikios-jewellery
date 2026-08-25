import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for Mavrikios Jewellery Boutique.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      intro={`These terms apply when you use the ${siteConfig.fullName} website or place an order with us.`}
      sections={[
        {
          heading: "Orders",
          body: [
            "By placing an order, you're offering to purchase a product subject to these terms. We'll confirm your order and delivery details directly.",
            "Made-to-order and bespoke pieces are confirmed with you individually before work begins.",
          ],
        },
        {
          heading: "Pricing",
          body: [
            "All prices are listed in Euro (EUR) and include applicable taxes unless stated otherwise. We reserve the right to correct pricing errors.",
          ],
        },
        {
          heading: "Product Descriptions",
          body: [
            "We describe our jewellery as accurately as possible, including material and stone where applicable. Sample product data on this site is for demonstration and will be replaced with our verified catalogue.",
          ],
        },
        {
          heading: "Contact",
          body: [`Questions about these terms can be sent to us via our contact page or by phone at ${siteConfig.phone}.`],
        },
      ]}
    />
  );
}
