"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { Heart, Menu, Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";
import { MegaMenu } from "@/components/site/mega-menu";
import { MobileNav } from "@/components/site/mobile-nav";
import { primaryNav } from "@/data/navigation";
import { useCartTotals, useCartStore } from "@/lib/store/cart-store";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { useUIStore } from "@/lib/store/ui-store";
import { useScrolledPast } from "@/hooks/use-scrolled";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const transparentOnTop = pathname === "/";
  const scrolledPast = useScrolledPast(64);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { totalItems } = useCartTotals();
  const wishlistCount = useWishlistStore((s) => s.ids.length);
  const cartOpen = useCartStore((s) => s.open);
  const openSearch = useUIStore((s) => s.openSearch);

  const isTransparent = transparentOnTop && !scrolledPast && openMenu === null;

  function handleEnter(label: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  }
  function handleLeave() {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-500",
        isTransparent ? "bg-transparent" : "border-b border-stone-200 bg-marble-50/95 backdrop-blur-md"
      )}
      onMouseLeave={handleLeave}
    >
      <div className="container-mavrikios flex h-20 items-center justify-between">
        <Link href="/" aria-label="Mavrikios home" className="shrink-0">
          <Logo tone={isTransparent ? "marble" : "ink"} />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {primaryNav.map((item) => (
            <div key={item.label} onMouseEnter={() => item.label === "Shop" && handleEnter(item.label)}>
              <Link
                href={item.href}
                className={cn(
                  "veil-underline text-[13px] font-medium uppercase tracking-[0.12em] transition-colors",
                  isTransparent ? "text-marble-50" : "text-ink-950"
                )}
              >
                {item.label}
              </Link>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search"
            onClick={openSearch}
            className={cn("hidden sm:inline-flex", isTransparent && "text-marble-50 hover:bg-white/10 hover:text-marble-50")}
          >
            <Search className="size-[18px]" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Wishlist, ${wishlistCount} items`}
            asChild
            className={cn("relative hidden sm:inline-flex", isTransparent && "text-marble-50 hover:bg-white/10 hover:text-marble-50")}
          >
            <Link href="/wishlist">
              <Heart className="size-[18px]" />
              {wishlistCount > 0 && (
                <span className="absolute right-1 top-1 flex size-3.5 items-center justify-center rounded-full bg-champagne-500 text-[9px] font-medium text-ink-950">
                  {wishlistCount}
                </span>
              )}
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Bag, ${totalItems} items`}
            onClick={cartOpen}
            className={cn("relative", isTransparent && "text-marble-50 hover:bg-white/10 hover:text-marble-50")}
          >
            <ShoppingBag className="size-[18px]" />
            {totalItems > 0 && (
              <span className="absolute right-1 top-1 flex size-3.5 items-center justify-center rounded-full bg-champagne-500 text-[9px] font-medium text-ink-950">
                {totalItems}
              </span>
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className={cn("lg:hidden", isTransparent && "text-marble-50 hover:bg-white/10 hover:text-marble-50")}
          >
            <Menu className="size-[20px]" />
          </Button>
        </div>
      </div>

      <AnimatePresence>{openMenu === "Shop" && <MegaMenu onNavigate={() => setOpenMenu(null)} />}</AnimatePresence>

      <MobileNav open={mobileOpen} onOpenChange={setMobileOpen} />
    </header>
  );
}
