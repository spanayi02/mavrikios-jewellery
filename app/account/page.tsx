import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Package } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { SignOutButton } from "@/components/account/sign-out-button";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = {
  title: "My Account",
  robots: { index: false, follow: true },
};

interface OrderItemRow {
  id: string;
  product_name: string;
  variant_label: string | null;
  quantity: number;
  unit_price: number;
  line_total: number;
}

interface OrderRow {
  id: string;
  reference: string;
  status: string;
  total: number;
  currency: string;
  payment_method: string;
  created_at: string;
  order_items: OrderItemRow[];
}

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/account/sign-in");
  }

  const { data: orders } = await supabase
    .from("orders")
    .select("id, reference, status, total, currency, payment_method, created_at, order_items(id, product_name, variant_label, quantity, unit_price, line_total)")
    .order("created_at", { ascending: false })
    .returns<OrderRow[]>();

  const fullName = (user.user_metadata?.full_name as string | undefined) ?? user.email;

  return (
    <div className="container-mavrikios py-16 sm:py-24">
      <div className="mb-12 flex flex-col items-start justify-between gap-4 border-b border-stone-200 pb-8 sm:flex-row sm:items-end">
        <div>
          <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-stone-500">My Account</p>
          <h1 className="font-serif text-3xl italic text-ink-950 sm:text-4xl">
            Welcome, {fullName}
          </h1>
          <p className="mt-2 text-sm text-stone-600">{user.email}</p>
        </div>
        <SignOutButton />
      </div>

      <section>
        <h2 className="mb-6 text-[11px] uppercase tracking-[0.2em] text-stone-500">Order History</h2>

        {!orders || orders.length === 0 ? (
          <div className="flex flex-col items-center gap-3 border border-stone-200 py-16 text-center">
            <Package className="size-8 text-stone-400" />
            <p className="text-sm text-stone-600">You haven&rsquo;t placed any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="border border-stone-200 p-6">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-4">
                  <div>
                    <p className="font-medium text-ink-950">{order.reference}</p>
                    <p className="text-xs text-stone-500">
                      {new Date(order.created_at).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] uppercase tracking-[0.14em] text-stone-500">
                      {order.status}
                    </span>
                    <span className="font-medium text-ink-950">{formatPrice(order.total)}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  {order.order_items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-sm">
                      <div>
                        <span className="text-ink-950">{item.product_name}</span>
                        {item.variant_label && (
                          <span className="text-stone-500"> &middot; {item.variant_label}</span>
                        )}
                        <span className="text-stone-500"> &times; {item.quantity}</span>
                      </div>
                      <span className="text-stone-600">{formatPrice(item.line_total)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
