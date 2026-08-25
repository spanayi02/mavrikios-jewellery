"use client";

import Link from "next/link";
import { Heart, Phone, Search, ShoppingBag } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/site/logo";
import { primaryNav, megaMenu } from "@/data/navigation";
import { useCartTotals, useCartStore } from "@/lib/store/cart-store";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { useUIStore } from "@/lib/store/ui-store";
import { siteConfig } from "@/lib/site-config";

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  const { totalItems } = useCartTotals();
  const wishlistCount = useWishlistStore((s) => s.ids.length);
  const cartOpen = useCartStore((s) => s.open);
  const openSearch = useUIStore((s) => s.openSearch);

  function close() {
    onOpenChange(false);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="flex w-full flex-col sm:max-w-sm">
        <SheetHeader>
          <SheetTitle asChild>
            <Link href="/" onClick={close}>
              <Logo />
            </Link>
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="flex gap-4 pb-6">
            <button
              onClick={() => {
                close();
                openSearch();
              }}
              className="flex flex-1 items-center justify-center gap-2 border border-stone-300 py-3 text-[12px] uppercase tracking-[0.1em]"
            >
              <Search className="size-4" /> Search
            </button>
            <Link
              href="/wishlist"
              onClick={close}
              className="flex flex-1 items-center justify-center gap-2 border border-stone-300 py-3 text-[12px] uppercase tracking-[0.1em]"
            >
              <Heart className="size-4" /> Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
            </Link>
          </div>

          <nav className="flex flex-col">
            {primaryNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={close}
                className="border-b border-stone-100 py-4 font-serif text-2xl text-ink-950"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-8">
            <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-stone-500">Jewellery</p>
            <div className="flex flex-wrap gap-2">
              {megaMenu.jewellery.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className="rounded-sm border border-stone-200 px-3 py-1.5 text-[12px] text-ink-950"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <Separator className="my-8" />

          <a href={siteConfig.phoneHref} className="flex items-center gap-2 text-sm text-ink-950">
            <Phone className="size-4" /> {siteConfig.phone}
          </a>
        </div>

        <button
          onClick={() => {
            close();
            cartOpen();
          }}
          className="flex items-center justify-center gap-2 border-t border-stone-200 bg-ink-950 py-4 text-[12px] font-medium uppercase tracking-[0.14em] text-marble-50"
        >
          <ShoppingBag className="size-4" /> Bag {totalItems > 0 && `(${totalItems})`}
        </button>
      </SheetContent>
    </Sheet>
  );
}
