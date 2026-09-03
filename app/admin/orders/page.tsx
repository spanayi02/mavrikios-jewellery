import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/format";
import { OrderStatusSelect } from "@/components/admin/order-status-select";
import type { OrderStatus } from "./actions";

export const metadata: Metadata = { title: "Orders", robots: { index: false, follow: false } };

interface OrderRow {
  id: string;
  reference: string;
  status: OrderStatus;
  customer_name: string;
  customer_email: string;
  total: number;
  payment_method: "cod" | "quickpay";
  created_at: string;
}

export default async function AdminOrdersPage() {
  const supabase = await createClient();
  const { data: orders, error } = await supabase
    .from("orders")
    .select("id, reference, status, customer_name, customer_email, total, payment_method, created_at")
    .order("created_at", { ascending: false })
    .returns<OrderRow[]>();

  if (error) console.error("Failed to load orders", error);

  return (
    <div>
      <p className="mb-1 text-[11px] uppercase tracking-[0.25em] text-stone-500">Sales</p>
      <h1 className="mb-8 font-serif text-3xl italic text-ink-950">Orders ({orders?.length ?? 0})</h1>

      {!orders || orders.length === 0 ? (
        <p className="text-sm text-stone-500">No orders yet.</p>
      ) : (
        <div className="overflow-x-auto border border-stone-200 bg-marble-50">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-stone-200 text-[11px] uppercase tracking-[0.1em] text-stone-500">
              <tr>
                <th className="px-4 py-3 font-medium">Reference</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Payment</th>
                <th className="px-4 py-3 font-medium">Total</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-stone-100 last:border-0">
                  <td className="px-4 py-3 font-medium text-ink-950">{order.reference}</td>
                  <td className="px-4 py-3">
                    <p className="text-ink-950">{order.customer_name}</p>
                    <p className="text-xs text-stone-500">{order.customer_email}</p>
                  </td>
                  <td className="px-4 py-3 text-stone-600 uppercase text-xs">{order.payment_method}</td>
                  <td className="px-4 py-3 text-ink-950">{formatPrice(Number(order.total))}</td>
                  <td className="px-4 py-3 text-stone-600">
                    {new Date(order.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-4 py-3">
                    <OrderStatusSelect orderId={order.id} status={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
