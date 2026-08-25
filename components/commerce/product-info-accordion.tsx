import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Product } from "@/types/product";

export function ProductInfoAccordion({ product }: { product: Product }) {
  return (
    <Accordion type="multiple" defaultValue={["description"]} className="mt-14">
      <AccordionItem value="description">
        <AccordionTrigger>Description</AccordionTrigger>
        <AccordionContent>{product.description}</AccordionContent>
      </AccordionItem>
      <AccordionItem value="details">
        <AccordionTrigger>Details</AccordionTrigger>
        <AccordionContent>
          <ul className="space-y-1.5">
            {product.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="care">
        <AccordionTrigger>Care</AccordionTrigger>
        <AccordionContent>
          <ul className="space-y-1.5">
            {product.care.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="delivery">
        <AccordionTrigger>Delivery &amp; Payment</AccordionTrigger>
        <AccordionContent>
          <p>
            Free delivery across Cyprus. Cash on Delivery and QuickPay are both available at
            checkout. Made-to-order pieces are prepared in our workshop before dispatch — we will
            confirm a timeframe when you order.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="returns">
        <AccordionTrigger>Returns</AccordionTrigger>
        <AccordionContent>
          <p>
            Unworn pieces in their original condition can be returned within 14 days of delivery.
            Made-to-order and engraved pieces are made specifically for you and are not eligible
            for return unless faulty. Visit our{" "}
            <a href="/returns" className="underline">
              returns page
            </a>{" "}
            for full details.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
