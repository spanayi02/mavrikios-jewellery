import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Returns",
  description: "How returns and exchanges work at Mavrikios Jewellery Boutique.",
  alternates: { canonical: "/returns" },
};

export default function ReturnsPage() {
  return (
    <LegalPage
      eyebrow="Customer Care"
      title="Returns"
      intro="We want you to be happy with your piece. Here's how returns work."
      sections={[
        {
          heading: "Standard Pieces",
          body: [
            "Unworn jewellery in its original condition and packaging can be returned within 14 days of delivery for a refund or exchange.",
          ],
        },
        {
          heading: "Made-to-Order, Engraved & Bespoke Pieces",
          body: [
            "Because these pieces are made specifically for you, they are not eligible for return or exchange unless the item is faulty.",
          ],
        },
        {
          heading: "How to Start a Return",
          body: [
            "Contact us with your order details and reason for return before sending anything back — we'll confirm the next steps with you directly.",
          ],
        },
        {
          heading: "Faulty Items",
          body: [
            "If a piece arrives damaged or faulty, let us know as soon as possible so we can put it right, including for made-to-order and bespoke commissions.",
          ],
        },
      ]}
    />
  );
}
