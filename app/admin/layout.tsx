import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Package, Receipt, LineChart, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getStaffRole } from "@/lib/data/staff";
import { SignOutButton } from "@/components/account/sign-out-button";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, ownerOnly: false },
  { href: "/admin/products", label: "Products", icon: Package, ownerOnly: false },
  { href: "/admin/orders", label: "Orders", icon: Receipt, ownerOnly: false },
  { href: "/admin/sales", label: "Sales", icon: LineChart, ownerOnly: true },
];

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/account/sign-in?next=/admin");

  const role = await getStaffRole();
  if (!role) redirect("/");

  return (
    <div className="grid min-h-screen grid-cols-1 bg-marble-100 lg:grid-cols-[240px_1fr]">
      <aside className="hidden border-r border-stone-200 bg-marble-50 lg:flex lg:flex-col">
        <div className="border-b border-stone-200 px-6 py-6">
          <p className="font-serif text-xl italic text-ink-950">Mavrikios</p>
          <p className="mt-0.5 text-[11px] uppercase tracking-[0.2em] text-stone-500">
            {role === "owner" ? "Owner" : "Staff"} Dashboard
          </p>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-6">
          {navItems
            .filter((item) => !item.ownerOnly || role === "owner")
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-ink-950 hover:bg-marble-100"
              >
                <item.icon className="size-4 text-stone-500" />
                {item.label}
              </Link>
            ))}
        </nav>
        <div className="space-y-2 border-t border-stone-200 px-3 py-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-stone-600 hover:bg-marble-100"
          >
            <ExternalLink className="size-4 text-stone-500" />
            View Site
          </Link>
          <div className="px-3">
            <SignOutButton />
          </div>
        </div>
      </aside>

      <div className="flex flex-col">
        <header className="flex items-center justify-between border-b border-stone-200 bg-marble-50 px-5 py-4 lg:hidden">
          <p className="font-serif text-lg italic text-ink-950">Mavrikios Dashboard</p>
        </header>
        <nav className="flex gap-1 overflow-x-auto border-b border-stone-200 bg-marble-50 px-4 py-2 lg:hidden">
          {navItems
            .filter((item) => !item.ownerOnly || role === "owner")
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="shrink-0 rounded-sm px-3 py-2 text-xs uppercase tracking-[0.08em] text-ink-950 hover:bg-marble-100"
              >
                {item.label}
              </Link>
            ))}
        </nav>
        <main className="flex-1 p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
