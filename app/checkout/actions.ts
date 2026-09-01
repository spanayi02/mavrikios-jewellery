"use server";

import { getProductById } from "@/data/products";
import { createClient } from "@/lib/supabase/server";

interface PlaceOrderItem {
  productId: string;
  variantId?: string;
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
}

export type PlaceOrderResult = { ok: true; reference: string } | { ok: false; error: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REFERENCE_UNIQUE_VIOLATION = "23505";
const MAX_REFERENCE_ATTEMPTS = 5;

function generateOrderReference() {
  return `MVK-${Math.floor(100000 + Math.random() * 900000)}`;
}

interface ResolvedLine {
  productId: string;
  productName: string;
  variantLabel: string | null;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

/**
 * Re-derives each line's name/price/label from the authoritative catalogue rather than
 * trusting the client — cart state lives in localStorage and could be tampered with in
 * devtools before submitting, so nothing about what a customer owes should come from it.
 */
function resolveLines(items: PlaceOrderItem[]): ResolvedLine[] | null {
  const resolved: ResolvedLine[] = [];
  for (const item of items) {
    if (!Number.isInteger(item.quantity) || item.quantity < 1) return null;

    const product = getProductById(item.productId);
    if (!product) return null;

    let variantLabel: string | null = null;
    let priceDelta = 0;
    if (item.variantId) {
      const variant = product.variants?.find((v) => v.id === item.variantId);
      if (!variant) return null;
      variantLabel = `${product.variantLabel}: ${variant.label}`;
      priceDelta = variant.priceDelta ?? 0;
    }

    const unitPrice = product.price + priceDelta;
    resolved.push({
      productId: product.id,
      productName: product.name,
      variantLabel,
      unitPrice,
      quantity: item.quantity,
      lineTotal: unitPrice * item.quantity,
    });
  }
  return resolved;
}

export async function placeOrder(input: PlaceOrderInput): Promise<PlaceOrderResult> {
  const email = input.email.trim();
  const phone = input.phone.trim();
  const fullName = input.fullName.trim();
  const address = input.address.trim();
  const city = input.city.trim();
  const postalCode = input.postalCode.trim();

  if (!fullName || !phone || !address || !city || !postalCode) {
    return { ok: false, error: "Please fill in all required fields." };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (input.items.length === 0) {
    return { ok: false, error: "Your bag is empty." };
  }

  const lines = resolveLines(input.items);
  if (!lines) {
    return { ok: false, error: "One of the items in your bag is no longer available. Please refresh and try again." };
  }

  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Generating the id here (rather than an INSERT ... RETURNING) is deliberate — see the
  // note on RLS/RETURNING in CLAUDE.md's Commerce architecture section.
  const orderId = crypto.randomUUID();
  let reference = "";
  let orderError = null;

  for (let attempt = 0; attempt < MAX_REFERENCE_ATTEMPTS; attempt++) {
    reference = generateOrderReference();
    const { error } = await supabase.from("orders").insert({
      id: orderId,
      reference,
      user_id: user?.id ?? null,
      customer_name: fullName,
      customer_email: email,
      customer_phone: phone,
      shipping_address: { address, city, postalCode, country: "Cyprus" },
      payment_method: input.paymentMethod,
      subtotal,
      shipping_cost: 0,
      total: subtotal,
      currency: "EUR",
    });
    orderError = error;
    if (!error || error.code !== REFERENCE_UNIQUE_VIOLATION) break;
  }

  if (orderError) {
    console.error("Failed to create order", orderError);
    return { ok: false, error: "Something went wrong placing your order. Please try again." };
  }

  const { error: itemsError } = await supabase.from("order_items").insert(
    lines.map((line) => ({
      order_id: orderId,
      product_id: line.productId,
      product_name: line.productName,
      variant_label: line.variantLabel,
      unit_price: line.unitPrice,
      quantity: line.quantity,
      line_total: line.lineTotal,
    }))
  );

  if (itemsError) {
    console.error("Failed to create order items", itemsError);
    return { ok: false, error: "Something went wrong placing your order. Please try again." };
  }

  return { ok: true, reference };
}
