import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Mavrikios Jewellery Boutique handles your information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      intro={`This explains how ${siteConfig.fullName} handles your information.`}
      sections={[
        {
          heading: "Information We Collect",
          body: [
            "When you place an order or contact us, we collect the details you provide — such as your name, email, phone number and delivery address — to fulfil your order or respond to your enquiry.",
          ],
        },
        {
          heading: "How We Use Your Information",
          body: [
            "We use your information to process orders, arrange delivery, respond to enquiries, and, if you opt in, to send occasional updates about new pieces and stories from the boutique.",
          ],
        },
        {
          heading: "Local Storage",
          body: [
            "Your shopping bag and wishlist are stored in your browser's local storage so they persist between visits. This information stays on your device and is not shared with us until you place an order.",
          ],
        },
        {
          heading: "Your Choices",
          body: [
            "You can ask us to update or delete your information, or unsubscribe from our newsletter, at any time by contacting us directly.",
          ],
        },
      ]}
    />
  );
}
