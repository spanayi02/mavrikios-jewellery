import Link from "next/link";
import type { Metadata } from "next";
import { Package, Receipt, AlertTriangle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getStaffRole } from "@/lib/data/staff";

export const metadata: Metadata = { title: "Dashboard", robots: { index: false, follow: false } };

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const role = await getStaffRole();

  const [{ count: productCount }, { count: pendingOrderCount }, { data: lowStock }] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase
      .from("products")
      .select("id, name, stock_quantity")
      .eq("availability", "in-stock")
      .lte("stock_quantity", 3)
      .order("stock_quantity", { ascending: true }),
  ]);

  return (
    <div>
      <p className="mb-1 text-[11px] uppercase tracking-[0.25em] text-stone-500">Overview</p>
      <h1 className="mb-8 font-serif text-3xl italic text-ink-950">Welcome back</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link
          href="/admin/products"
          className="flex items-center justify-between border border-stone-200 bg-marble-50 p-6 transition-colors hover:border-ink-950"
        >
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-stone-500">Products</p>
            <p className="mt-1 font-serif text-3xl italic text-ink-950">{productCount ?? 0}</p>
          </div>
          <Package className="size-6 text-stone-400" />
        </Link>
        <Link
          href="/admin/orders"
          className="flex items-center justify-between border border-stone-200 bg-marble-50 p-6 transition-colors hover:border-ink-950"
        >
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-stone-500">Pending Orders</p>
            <p className="mt-1 font-serif text-3xl italic text-ink-950">{pendingOrderCount ?? 0}</p>
          </div>
          <Receipt className="size-6 text-stone-400" />
        </Link>
      </div>

      {lowStock && lowStock.length > 0 && (
        <div className="mt-8 border border-champagne-300 bg-champagne-100/40 p-6">
          <p className="mb-3 flex items-center gap-2 text-sm font-medium text-ink-950">
            <AlertTriangle className="size-4 text-champagne-600" /> Low Stock
          </p>
          <ul className="space-y-1.5">
            {lowStock.map((p) => (
              <li key={p.id} className="flex items-center justify-between text-sm">
                <Link href={`/admin/products/${p.id}/edit`} className="text-ink-950 hover:underline">
                  {p.name}
                </Link>
                <span className="text-stone-500">{p.stock_quantity} left</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {role === "owner" && (
        <p className="mt-8 text-sm text-stone-500">
          Full revenue and order trends are on the{" "}
          <Link href="/admin/sales" className="text-ink-950 underline">
            Sales
          </Link>{" "}
          page.
        </p>
      )}
    </div>
  );
}
