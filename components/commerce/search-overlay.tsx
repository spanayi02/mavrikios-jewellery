"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Search, X, Clock } from "lucide-react";
import { ProductMedia } from "@/components/site/product-media";
import { getAllProducts } from "@/data/products";
import { categoryLabels } from "@/lib/product-labels";
import { formatPrice } from "@/lib/format";
import { useUIStore } from "@/lib/store/ui-store";

const RECENT_KEY = "mavrikios-recent-searches";
const products = getAllProducts();

function readRecent(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(RECENT_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function SearchOverlay() {
  const isOpen = useUIStore((s) => s.isSearchOpen);
  const close = useUIStore((s) => s.closeSearch);
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<string[]>(readRecent);

  function handleOpenChange(open: boolean) {
    if (open) {
      setRecent(readRecent());
    } else {
      close();
      setQuery("");
    }
  }

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          categoryLabels[p.category].toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [query]);

  function commitSearch(term: string) {
    if (!term.trim()) return;
    const next = [term, ...recent.filter((r) => r !== term)].slice(0, 5);
    setRecent(next);
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  }

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={handleOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[70] bg-ink-950/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed inset-x-0 top-0 z-[71] flex max-h-screen w-full flex-col bg-marble-50 shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top sm:inset-x-auto sm:left-1/2 sm:top-20 sm:w-full sm:max-w-2xl sm:-translate-x-1/2 sm:border sm:border-stone-200">
          <VisuallyHidden>
            <DialogPrimitive.Title>Search products</DialogPrimitive.Title>
            <DialogPrimitive.Description>
              Search the Mavrikios catalogue by name, category or material.
            </DialogPrimitive.Description>
          </VisuallyHidden>

          <div className="flex items-center gap-3 border-b border-stone-200 px-5 py-4">
            <Search className="size-5 shrink-0 text-stone-400" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && commitSearch(query)}
              placeholder="Search rings, earrings, necklaces…"
              className="flex-1 bg-transparent text-base text-ink-950 placeholder:text-stone-400 outline-none"
            />
            <DialogPrimitive.Close aria-label="Close search" className="p-1 text-stone-500 hover:text-ink-950">
              <X className="size-5" />
            </DialogPrimitive.Close>
          </div>

          <div className="max-h-[70vh] overflow-y-auto px-5 py-4">
            {query.trim() === "" ? (
              <div>
                {recent.length > 0 && (
                  <>
                    <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-stone-500">
                      Recent Searches
                    </p>
                    <ul className="mb-2 space-y-1">
                      {recent.map((term) => (
                        <li key={term}>
                          <button
                            onClick={() => setQuery(term)}
                            className="flex w-full items-center gap-2 rounded-sm py-2 text-sm text-ink-950 hover:text-stone-600"
                          >
                            <Clock className="size-3.5 text-stone-400" /> {term}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                <p className="mb-3 mt-4 text-[11px] uppercase tracking-[0.2em] text-stone-500">
                  Popular Categories
                </p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(categoryLabels).map(([key, label]) => (
                    <Link
                      key={key}
                      href={`/shop?category=${key}`}
                      onClick={close}
                      className="rounded-sm border border-stone-200 px-3 py-1.5 text-xs text-ink-950"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : results.length === 0 ? (
              <div className="flex flex-col items-center gap-1 py-14 text-center">
                <p className="font-serif text-lg text-ink-950">No pieces found</p>
                <p className="text-sm text-stone-500">Try a different name, category or material.</p>
              </div>
            ) : (
              <ul className="divide-y divide-stone-100">
                {results.map((product) => (
                  <li key={product.id}>
                    <Link
                      href={`/products/${product.slug}`}
                      onClick={() => {
                        commitSearch(query);
                        close();
                      }}
                      className="flex items-center gap-4 py-3"
                    >
                      <div className="relative size-16 shrink-0 overflow-hidden bg-stone-100">
                        <ProductMedia image={product.images[0]} sizes="64px" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-ink-950">{product.name}</p>
                        <p className="text-xs text-stone-500">{categoryLabels[product.category]}</p>
                      </div>
                      <span className="text-sm text-ink-950">{formatPrice(product.price)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
