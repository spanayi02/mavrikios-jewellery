@AGENTS.md

# Mavrikios Jewellery Boutique — Project Rules

Premium e-commerce rebuild for a real jewellery boutique (Latsia, Nicosia, Cyprus, since
1967). Full brand/creative brief lives in the original build request; this file captures the
durable engineering rules for anyone (human or agent) working in this codebase afterwards.

## Design system

- Palette lives in `app/globals.css` as Tailwind v4 `@theme` tokens: `marble-*` (warm white),
  `stone-*` (cool grey), `ink-*` (near-black/navy), `silver-*`, `champagne-*` (sparing accent
  only — never the dominant color). Use these tokens, not raw hex values, in new components.
- Typography: `font-serif` (Fraunces, editorial/italic for headlines and campaign copy) +
  `font-sans` (Inter, for nav/UI/prices/buttons). Don't introduce a third family.
- Buttons are rectangular with small radius and uppercase tracked labels (see
  `components/ui/button.tsx` variants) — not SaaS pill buttons.
- `.marble-surface` / `.marble-surface-dark` (globals.css) are the only "marble" treatments —
  used sparingly as a brand signature, not behind every section.
- Motion is restrained: short entrance reveals, opacity/scale in the 0.9–1.06 range, no bounce,
  no motion for motion's sake. Respect `prefers-reduced-motion` (already handled globally).

## Placeholder imagery

- No real product photography is available yet. `components/site/placeholder-art.tsx` renders
  fine-line procedural jewellery motifs on a marble surface as a deliberate, on-brand
  placeholder — not a generic grey box.
- `types/product.ts` → `ProductImage` has an optional `src`. `components/site/product-media.tsx`
  automatically renders a real photo via `next/image` when `src` is set, falling back to
  `PlaceholderArt` otherwise. **To add real photography: just set `src` on the product's images
  — no other code changes needed.**

## Commerce architecture

- Product data: `types/product.ts` (types) + `data/products.ts` (demo catalogue — clearly
  marked as sample data, not verified Mavrikios inventory). Keep this shape when replacing with
  the real catalogue.
- Cart/wishlist/UI state: Zustand stores in `lib/store/` (`cart-store.ts`, `wishlist-store.ts`,
  `ui-store.ts`), persisted to `localStorage`. Checkout doesn't require an account — guest
  checkout still works exactly as before — but accounts now exist (see Accounts/Auth below) and,
  when signed in, an order is linked to the user.
- Checkout (`app/checkout/`, Server Action in `app/checkout/actions.ts`) validates the form,
  re-derives every line's price/name/variant from the real catalogue (`getProductById` in
  `data/products.ts` — never trust client-supplied price/name, cart state is tamperable in
  devtools), writes the order + line items to Supabase (`orders`/`order_items` tables), and shows
  a confirmation with the generated reference number. It does **not** call a payment gateway or
  send email — Cash on Delivery and QuickPay are still just the represented payment methods, not
  live charges. Wire up a real payment provider before taking this live — never fabricate a
  "payment succeeded" state beyond what's actually implemented.
- RLS on `orders`/`order_items` grants `INSERT` `to public` with `with_check (true)` (anyone can
  place an order, signed in or not). There's also a `SELECT` policy `to authenticated` scoped to
  `user_id = auth.uid()` (added once accounts existed) — verified directly against RLS (positive
  + negative test with a real `auth.users` row) that an owner sees only their own orders. Order
  review for guest orders (no `user_id`) still happens via the Supabase dashboard, not the API.
  **Never chain `.select()`/`.single()` after `.insert()` on these tables** — Postgres requires
  `INSERT ... RETURNING` to also satisfy a `SELECT` policy, and the `INSERT` policy alone won't
  cover it. Generate the order's `id` client-side (`crypto.randomUUID()`) instead and insert it
  explicitly, exactly as `placeOrder` does. (Earlier note here blamed `to anon` specifically for
  this — that was a misdiagnosis from testing while the RETURNING bug was still present; the
  `RETURNING`/`SELECT`-policy interaction is the actual, only cause. `orders`/`order_items` insert
  policies stayed `to public` since that's what's proven working in production; there was no need
  to re-test `to anon` once the real cause was fixed.)

## Accounts / Auth

- Email+password auth via Supabase Auth, using `@supabase/ssr` for Next.js App Router cookie
  handling: `lib/supabase/client.ts` (browser client, `NEXT_PUBLIC_SUPABASE_URL` /
  `NEXT_PUBLIC_SUPABASE_ANON_KEY`), `lib/supabase/server.ts` (server client reading/writing
  cookies via `next/headers` — use this, not a bare `createClient`, anywhere you need
  `auth.getUser()` on the server), `lib/supabase/session.ts` + root `proxy.ts` (refreshes the
  session cookie on every request — required by `@supabase/ssr`, don't remove). Next.js renamed
  `middleware.ts` to `proxy.ts` in this version (see `AGENTS.md`) — that's not a typo, don't
  rename it back.
- Pages: `app/account/sign-up`, `/sign-in`, `/forgot-password`, `/update-password` (landing page
  for the password-reset email link), and `/account` itself — a protected dashboard
  (`redirect("/account/sign-in")` if signed out) showing profile info and order history via
  `orders`/`order_items` (RLS-scoped automatically, no manual `user_id` filtering needed in the
  query). Server Actions for the auth flows live in `app/account/actions.ts`.
- `hooks/use-user.ts` exposes the signed-in user client-side (e.g. for the Navbar's
  account icon) via `useSyncExternalStore` fed by `onAuthStateChange` — not
  a `useEffect`/`useState` pair, consistent with `use-scrolled.ts`'s pattern elsewhere in the
  codebase.
- `orders.user_id` (nullable, `references auth.users(id) on delete set null`) is set from
  `auth.getUser()` inside `placeOrder` when the customer is signed in; guest checkouts leave it
  `null`. Deleting a user never deletes their past orders.

## Real business info vs. demo data

- `lib/site-config.ts` holds verified business info (address, phone, Instagram, hours). Hours
  are a best-effort placeholder from the one data point we had — confirm with the business
  before relying on them.
- Do not invent awards, press mentions, certifications, review counts/quotes, stone carats,
  warranties, or company/family history. `data/reviews.ts` is intentionally empty with a themed
  fallback until real reviews are supplied — see the comment in that file before adding fake
  ones.
- Sample products in `data/products.ts` use plausible names/pricing but are demo data — don't
  present them as real inventory in copy or marketing.

## Motion & component reuse

- shadcn-style primitives live in `components/ui/` (hand-written, not the shadcn CLI — the CLI
  can't reach ui.shadcn.com from this environment). Copy this pattern (Radix primitive +
  `cva` + `cn`) for any new primitive rather than installing a new UI kit.
- Don't install overlapping UI/animation libraries. Framer Motion, Radix, `@number-flow/react`,
  Zustand, `sonner`, and lucide-react are the established set.

## Responsive & accessibility

- `body`/`html` must never scroll horizontally — `html { overflow-x: hidden }` in globals.css is
  load-bearing (Chromium computes `scrollWidth` inconsistently for `overflow-x: clip` on
  `body`; don't switch it back without re-testing at 375px on every route). If you add
  something that visually bleeds past its container, test at 375px width, not just desktop.
- Buttons with variable-length labels inside a flex row need `min-w-0` on the flexible child, or
  they'll overflow instead of shrinking (see `components/commerce/purchase-panel.tsx`).
- Any full-screen overlay/sheet/dialog must sit above `AnnouncementBar` (`z-30`) and `Navbar`
  (`z-50`, sticky). Keep new fixed/sticky elements inside that ordering.
- Keep `prefers-reduced-motion`, focus-visible rings, and semantic landmarks intact when editing
  interactive components.

## SEO

- Add `alternates: { canonical: "/path" }` to every new top-level page's `metadata`.
- `app/sitemap.ts` and `app/robots.ts` are generated from route lists / `data/products.ts` —
  add new top-level static routes to `staticRoutes` in `app/sitemap.ts`.
- `app/opengraph-image.tsx` / `app/icon.tsx` generate branded OG/favicon images at build time
  (no static asset files needed) — edit those instead of adding files under `public/`.
- Structured data helpers live in `lib/structured-data.ts` (Organization, Product, Breadcrumb).

## Validation before finishing a change

Run, in order: `npx tsc --noEmit`, `npx eslint .`, `npx next build`. All three must be clean
(no disabling rules/types to force a pass). If you touch layout/spacing, take a screenshot at
375px and 1440px widths before calling it done.
