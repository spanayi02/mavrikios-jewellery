"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import NumberFlow from "@number-flow/react";
import { Banknote, CheckCircle2, CreditCard, Truck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ProductMedia } from "@/components/site/product-media";
import { useCartStore, useCartTotals } from "@/lib/store/cart-store";
import { formatPrice } from "@/lib/format";
import { placeOrder } from "./actions";

interface CheckoutClientProps {
  defaultEmail?: string;
  defaultFullName?: string;
}

export function CheckoutClient({ defaultEmail, defaultFullName }: CheckoutClientProps) {
  const lines = useCartStore((s) => s.lines);
  const clear = useCartStore((s) => s.clear);
  const { subtotal } = useCartTotals();
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "quickpay">("cod");
  const [orderRef, setOrderRef] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    setIsSubmitting(true);
    const result = await placeOrder({
      email: String(data.get("email")),
      phone: String(data.get("phone")),
      fullName: String(data.get("fullName")),
      address: String(data.get("address")),
      city: String(data.get("city")),
      postalCode: String(data.get("postalCode")),
      paymentMethod,
      items: lines.map((line) => ({
        productId: line.productId,
        variantId: line.variantId,
        quantity: line.quantity,
      })),
    });
    setIsSubmitting(false);

    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    setOrderRef(result.reference);
    clear();
  }

  if (orderRef) {
    return (
      <div className="container-mavrikios flex flex-col items-center py-24 text-center sm:py-32">
        <CheckCircle2 className="size-10 text-ink-950" />
        <p className="mt-6 font-serif text-3xl italic text-ink-950 sm:text-4xl">
          Thank you for your order
        </p>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-stone-600">
          Your reference is <span className="font-medium text-ink-950">{orderRef}</span>. Our
          team will contact you shortly to confirm delivery and{" "}
          {paymentMethod === "cod" ? "your Cash on Delivery payment" : "your QuickPay payment"}.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="container-mavrikios flex flex-col items-center gap-4 py-24 text-center sm:py-32">
        <p className="font-serif text-2xl italic text-ink-950">Your bag is empty</p>
        <Button asChild className="mt-2">
          <Link href="/shop">Shop the Collection</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container-mavrikios py-16 sm:py-24">
      <div className="mb-10">
        <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-stone-500">Checkout</p>
        <h1 className="font-serif text-4xl italic text-ink-950 sm:text-5xl">Checkout</h1>
        <p className="mt-3 text-sm text-stone-600">
          {defaultEmail ? `Signed in as ${defaultEmail}.` : "No account required — check out as a guest."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-14 lg:grid-cols-12">
        <div className="space-y-12 lg:col-span-7">
          <section>
            <h2 className="mb-5 text-[11px] uppercase tracking-[0.2em] text-stone-500">Contact</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required autoComplete="email" defaultValue={defaultEmail} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" type="tel" required autoComplete="tel" />
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-5 text-[11px] uppercase tracking-[0.2em] text-stone-500">Delivery Address</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" name="fullName" required autoComplete="name" defaultValue={defaultFullName} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" required autoComplete="street-address" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" required autoComplete="address-level2" defaultValue="Nicosia" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input id="postalCode" name="postalCode" required autoComplete="postal-code" />
              </div>
            </div>
            <p className="mt-3 flex items-center gap-2 text-xs text-stone-500">
              <Truck className="size-3.5" /> Free delivery across Cyprus
            </p>
          </section>

          <section>
            <h2 className="mb-5 text-[11px] uppercase tracking-[0.2em] text-stone-500">Payment Method</h2>
            <RadioGroup
              value={paymentMethod}
              onValueChange={(v) => setPaymentMethod(v as "cod" | "quickpay")}
              className="space-y-3"
            >
              <label
                htmlFor="pm-cod"
                className="flex cursor-pointer items-center gap-3 border border-stone-300 p-4 has-[[data-state=checked]]:border-ink-950"
              >
                <RadioGroupItem value="cod" id="pm-cod" />
                <Banknote className="size-4 text-ink-950" />
                <span className="flex-1 text-sm text-ink-950">Cash on Delivery</span>
              </label>
              <label
                htmlFor="pm-quickpay"
                className="flex cursor-pointer items-center gap-3 border border-stone-300 p-4 has-[[data-state=checked]]:border-ink-950"
              >
                <RadioGroupItem value="quickpay" id="pm-quickpay" />
                <CreditCard className="size-4 text-ink-950" />
                <span className="flex-1 text-sm text-ink-950">QuickPay</span>
              </label>
            </RadioGroup>
            <p className="mt-3 text-xs text-stone-500">
              Card payments are handled through our secure payment partner at the point of
              delivery confirmation.
            </p>
          </section>

          <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
            {isSubmitting ? "Placing Order…" : "Place Order"}
          </Button>
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          <div className="sticky top-28 border border-stone-200 p-6">
            <p className="mb-5 text-[11px] uppercase tracking-[0.2em] text-stone-500">Order Summary</p>
            <div className="max-h-80 space-y-4 overflow-y-auto">
              {lines.map((line) => (
                <div key={`${line.productId}-${line.variantId ?? "default"}`} className="flex gap-3">
                  <div className="relative size-16 shrink-0 overflow-hidden bg-stone-100">
                    <ProductMedia image={line.image} sizes="64px" />
                    <span className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-ink-950 text-[10px] text-marble-50">
                      {line.quantity}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-ink-950">{line.name}</p>
                    {line.variantLabel && <p className="text-xs text-stone-500">{line.variantLabel}</p>}
                  </div>
                  <span className="text-sm text-ink-950">{formatPrice(line.price * line.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 space-y-2 border-t border-stone-200 pt-4 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Delivery</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between border-t border-stone-200 pt-2 text-base font-medium text-ink-950">
                <span>Total</span>
                <span>
                  <NumberFlow value={subtotal} format={{ style: "currency", currency: "EUR", trailingZeroDisplay: "stripIfInteger" }} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
