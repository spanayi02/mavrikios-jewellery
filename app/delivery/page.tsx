import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Delivery",
  description: "Delivery across Cyprus from Mavrikios Jewellery Boutique, with Cash on Delivery and QuickPay available.",
  alternates: { canonical: "/delivery" },
};

export default function DeliveryPage() {
  return (
    <LegalPage
      eyebrow="Customer Care"
      title="Delivery"
      intro="We deliver across Cyprus, with Cash on Delivery and QuickPay both available at checkout."
      sections={[
        {
          heading: "Delivery Across Cyprus",
          body: [
            "Free delivery is offered on all orders shipped within Cyprus.",
            "In-stock pieces are typically prepared for dispatch within a few working days of your order.",
          ],
        },
        {
          heading: "Made-to-Order & Bespoke Pieces",
          body: [
            "Made-to-order rings and bespoke commissions take longer, since each piece is made by hand in our workshop. We'll confirm an estimated timeframe when you place your order or commission.",
          ],
        },
        {
          heading: "Payment on Delivery",
          body: [
            "Cash on Delivery is available for orders within Cyprus, settled when your piece arrives.",
            "QuickPay is available as a secure alternative at checkout.",
          ],
        },
        {
          heading: "Questions About Your Order",
          body: ["For any question about an order in progress, contact us and we'll be happy to help."],
        },
      ]}
    />
  );
}
