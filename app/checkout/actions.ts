"use server";

import { getSupabaseServerClient } from "@/lib/supabase-server";

interface PlaceOrderItem {
  productId: string;
  name: string;
  variantLabel?: string;
  price: number;
  quantity: number;
}

export interface PlaceOrderInput {
  email: string;
  phone: string;
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod: "cod" | "quickpay";
  items: PlaceOrderItem[];
  subtotal: number;
}

export type PlaceOrderResult = { ok: true; reference: string } | { ok: false; error: string };

function generateOrderReference() {
  return `MVK-${Math.floor(100000 + Math.random() * 900000)}`;
}

export async function placeOrder(input: PlaceOrderInput): Promise<PlaceOrderResult> {
  if (input.items.length === 0) {
    return { ok: false, error: "Your bag is empty." };
  }

  const supabase = getSupabaseServerClient();
  const reference = generateOrderReference();
  // Generated here (rather than left to the DB default + RETURNING) because the public
  // insert-only RLS policy has no matching SELECT policy — Postgres requires RETURNING
  // to also satisfy a SELECT policy, which would otherwise force us to either expose
  // orders to public SELECT (a real data leak) or skip getting the id back.
  const orderId = crypto.randomUUID();

  const { error: orderError } = await supabase.from("orders").insert({
    id: orderId,
    reference,
    customer_name: input.fullName,
    customer_email: input.email,
    customer_phone: input.phone,
    shipping_address: {
      address: input.address,
      city: input.city,
      postalCode: input.postalCode,
      country: "Cyprus",
    },
    payment_method: input.paymentMethod,
    subtotal: input.subtotal,
    shipping_cost: 0,
    total: input.subtotal,
    currency: "EUR",
  });

  if (orderError) {
    console.error("Failed to create order", orderError);
    return { ok: false, error: "Something went wrong placing your order. Please try again." };
  }

  const { error: itemsError } = await supabase.from("order_items").insert(
    input.items.map((item) => ({
      order_id: orderId,
      product_id: item.productId,
      product_name: item.name,
      variant_label: item.variantLabel ?? null,
      unit_price: item.price,
      quantity: item.quantity,
      line_total: item.price * item.quantity,
    }))
  );

  if (itemsError) {
    console.error("Failed to create order items", itemsError);
    return { ok: false, error: "Something went wrong placing your order. Please try again." };
  }

  return { ok: true, reference };
}
