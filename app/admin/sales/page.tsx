import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getStaffRole } from "@/lib/data/staff";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = { title: "Sales", robots: { index: false, follow: false } };

interface OrderRow {
  total: number;
  status: string;
  created_at: string;
}

interface OrderItemRow {
  product_name: string;
  quantity: number;
  line_total: number;
}

function startOfMonth(offset: number) {
  const d = new Date();
  d.setDate(1);
  d.setMonth(d.getMonth() + offset);
  d.setHours(0, 0, 0, 0);
  return d;
}

export default async function AdminSalesPage() {
  const role = await getStaffRole();
  if (role !== "owner") redirect("/admin");

  const supabase = await createClient();
  const [{ data: orders }, { data: items }] = await Promise.all([
    supabase.from("orders").select("total, status, created_at").returns<OrderRow[]>(),
    supabase.from("order_items").select("product_name, quantity, line_total").returns<OrderItemRow[]>(),
  ]);

  const allOrders = orders ?? [];
  const validOrders = allOrders.filter((o) => o.status !== "cancelled");
  const totalRevenue = validOrders.reduce((sum, o) => sum + Number(o.total), 0);
  const orderCount = validOrders.length;
  const avgOrderValue = orderCount > 0 ? totalRevenue / orderCount : 0;

  const thisMonthStart = startOfMonth(0);
  const lastMonthStart = startOfMonth(-1);
  const thisMonthOrders = validOrders.filter((o) => new Date(o.created_at) >= thisMonthStart);
  const lastMonthOrders = validOrders.filter(
    (o) => new Date(o.created_at) >= lastMonthStart && new Date(o.created_at) < thisMonthStart
  );
  const thisMonthRevenue = thisMonthOrders.reduce((sum, o) => sum + Number(o.total), 0);
  const lastMonthRevenue = lastMonthOrders.reduce((sum, o) => sum + Number(o.total), 0);

  const productTotals = new Map<string, { quantity: number; revenue: number }>();
  for (const item of items ?? []) {
    const entry = productTotals.get(item.product_name) ?? { quantity: 0, revenue: 0 };
    entry.quantity += item.quantity;
    entry.revenue += Number(item.line_total);
    productTotals.set(item.product_name, entry);
  }
  const topProducts = Array.from(productTotals.entries())
    .sort((a, b) => b[1].quantity - a[1].quantity)
    .slice(0, 5);

  return (
    <div>
      <p className="mb-1 text-[11px] uppercase tracking-[0.25em] text-stone-500">Owner</p>
      <h1 className="mb-8 font-serif text-3xl italic text-ink-950">Sales</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="border border-stone-200 bg-marble-50 p-6">
          <p className="text-[11px] uppercase tracking-[0.2em] text-stone-500">Total Revenue</p>
          <p className="mt-1 font-serif text-3xl italic text-ink-950">{formatPrice(totalRevenue)}</p>
        </div>
        <div className="border border-stone-200 bg-marble-50 p-6">
          <p className="text-[11px] uppercase tracking-[0.2em] text-stone-500">Orders</p>
          <p className="mt-1 font-serif text-3xl italic text-ink-950">{orderCount}</p>
        </div>
        <div className="border border-stone-200 bg-marble-50 p-6">
          <p className="text-[11px] uppercase tracking-[0.2em] text-stone-500">Avg. Order Value</p>
          <p className="mt-1 font-serif text-3xl italic text-ink-950">{formatPrice(avgOrderValue)}</p>
        </div>
      </div>

      <div className="mt-8 border border-stone-200 bg-marble-50 p-6">
        <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-stone-500">This Month vs Last Month</p>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-stone-500">This month</p>
            <p className="font-serif text-2xl italic text-ink-950">{formatPrice(thisMonthRevenue)}</p>
            <p className="text-xs text-stone-500">{thisMonthOrders.length} orders</p>
          </div>
          <div>
            <p className="text-sm text-stone-500">Last month</p>
            <p className="font-serif text-2xl italic text-ink-950">{formatPrice(lastMonthRevenue)}</p>
            <p className="text-xs text-stone-500">{lastMonthOrders.length} orders</p>
          </div>
        </div>
      </div>

      <div className="mt-8 border border-stone-200 bg-marble-50 p-6">
        <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-stone-500">Top Products by Units Sold</p>
        {topProducts.length === 0 ? (
          <p className="text-sm text-stone-500">No sales yet.</p>
        ) : (
          <ul className="space-y-3">
            {topProducts.map(([name, stats]) => (
              <li key={name} className="flex items-center justify-between text-sm">
                <span className="text-ink-950">{name}</span>
                <span className="text-stone-500">
                  {stats.quantity} sold · {formatPrice(stats.revenue)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
