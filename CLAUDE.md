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

- Product data lives in the `products` table in Supabase (migrated off the old static
  `data/products.ts`, which is deleted — don't recreate it). `types/product.ts` still defines
  the shared `Product` shape. `lib/data/products.ts` is the only place that reads the table —
  `getAllProducts`/`getProductBySlug`/`getProductById`/`getRelatedProducts`/`getFeaturedProducts`/
  `getBestSellers`/`getNewArrivals`/`getEngagementProducts`, all `async`, wrapped in React
  `cache()` for per-request dedup. It uses the **plain** `@supabase/supabase-js` client with the
  anon key (`catalogClient()`), not the cookie-based SSR client from `lib/supabase/server.ts` —
  catalog reads are public (RLS `to public`) and don't need the caller's session, and this keeps
  them usable from build-time contexts like `generateStaticParams`, which run with no
  request/cookies available (the cookie-based client throws there).
- Because product data is now async, several client components that used to import
  `getAllProducts()` at module scope (`SearchOverlay`, `RecentlyViewedRail`, `WishlistClient`)
  now receive `products`/`allProducts` as a prop from an async Server Component parent instead
  (root `app/layout.tsx` → `CartProvider` → `SearchOverlay`; `app/products/[slug]/page.tsx` →
  `RecentlyViewedRail`; `app/wishlist/page.tsx` → `WishlistClient`). Don't reach for a module-level
  `getAllProducts()` call in a new client component — thread the data down instead.
- Cart/wishlist/UI state: Zustand stores in `lib/store/` (`cart-store.ts`, `wishlist-store.ts`,
  `ui-store.ts`), persisted to `localStorage`. Checkout doesn't require an account — guest
  checkout still works exactly as before — but accounts now exist (see Accounts/Auth below) and,
  when signed in, an order is linked to the user.
- Checkout (`app/checkout/`, Server Action in `app/checkout/actions.ts`) validates the form,
  re-derives every line's price/name/variant from the real catalogue (`getProductById` in
  `lib/data/products.ts` — never trust client-supplied price/name, cart state is tamperable in
  devtools), writes the order + line items to Supabase (`orders`/`order_items` tables), calls the
  `decrement_stock` RPC per line (best-effort — never blocks order confirmation), and shows a
  confirmation with the generated reference number. It does **not** call a payment gateway or
  send email — Cash on Delivery and QuickPay are still just the represented payment methods, not
  live charges. Wire up a real payment provider before taking this live — never fabricate a
  "payment succeeded" state beyond what's actually implemented.
- `stock_quantity` on `products` is decremented via `public.decrement_stock(product_id, qty)`, a
  `security definer` SQL function granted to `anon`/`authenticated` — this lets guest checkout
  adjust stock for the one product it just bought without granting table-level `UPDATE` on
  `products` to customers. It also flips `availability` to `out-of-stock` when a previously
  in-stock item hits 0. Staff get real table-level `UPDATE` via RLS instead (see Admin dashboard).
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

## Admin dashboard

- `/admin/*` is a staff-only area gated by `app/admin/layout.tsx`: redirects to sign-in if
  signed out, redirects to `/` if signed in but not staff. Staff membership is the `staff` table
  (`user_id` references `auth.users`, `role` is `'owner' | 'employee'`) — being a customer with
  an account does **not** make someone staff; a row has to be added to `staff` explicitly (via
  the Supabase dashboard/SQL for now — there's no self-serve "invite" UI). `lib/data/staff.ts`'s
  `getStaffRole()` is the one place that checks this; owner-only pages (`/admin/sales`) call it
  directly and `redirect("/admin")` for non-owners rather than duplicating the role list.
- Products: `/admin/products` (list), `/admin/products/new` and `/admin/products/[id]/edit`
  (shared `components/admin/product-form.tsx`), backed by Server Actions in
  `app/admin/products/actions.ts` (`createProduct`/`updateProduct`/`deleteProduct`). Every action
  re-checks `getStaffRole()` server-side — RLS on `products` also requires staff for writes, but
  the action check gives a clean error message instead of a raw RLS failure. Writes call
  `revalidatePath("/", "layout")` so the storefront (home rails, shop grid, PDPs) reflects
  changes immediately — this is what makes "add a product and it shows up in the right category
  and in the actual store" true; there's no separate publish step.
- Orders: `/admin/orders` lists every order (staff has a dedicated `SELECT`/`UPDATE` RLS policy
  on `orders`/`order_items` — separate from the customer-scoped `user_id = auth.uid()` policy) with
  an inline status changer (`app/admin/orders/actions.ts` → `updateOrderStatus`, one of the
  existing `status` check-constraint values: `pending`/`paid`/`fulfilled`/`cancelled`).
- Sales (`/admin/sales`, owner-only): revenue/order-count/AOV and this-month-vs-last-month,
  aggregated in-memory from `orders`/`order_items` rather than a SQL view — the boutique's order
  volume doesn't need anything heavier, and it keeps the RLS surface to the two `SELECT` policies
  above instead of a bespoke reporting function.
- Not built yet, flagged rather than faked: no self-serve way to add an employee (do it directly
  in Supabase), no product photo upload (the form takes an image **path** under
  `public/images/products/`, same as everywhere else in this codebase), and no undo on delete.

## Newsletter

- `components/site/newsletter-form.tsx` calls the Server Action `subscribeToNewsletter` in
  `app/actions/newsletter.ts`, which inserts into `newsletter_subscribers` (id, email unique,
  created_at) in Supabase. RLS: `INSERT` `to public` with `with_check (true)`, no `SELECT`
  policy — same shape as `orders`, review subscribers via the Supabase dashboard. A duplicate
  email (`23505`) is treated as success, not an error, since resubscribing shouldn't fail. This
  used to be a client-only fake-success form; don't revert to that — an email capture that shows
  "you're on the list" must actually persist the email somewhere.

## Real business info vs. demo data

- `lib/site-config.ts` holds verified business info (address, phone, Instagram, hours). Hours
  are a best-effort placeholder from the one data point we had — confirm with the business
  before relying on them.
- Do not invent awards, press mentions, certifications, review counts/quotes, stone carats,
  warranties, or company/family history. `data/reviews.ts` is intentionally empty with a themed
  fallback until real reviews are supplied — see the comment in that file before adding fake
  ones.
- Sample products in the `products` table use plausible names/pricing but are demo data — don't
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
- `app/sitemap.ts` and `app/robots.ts` are generated from route lists / the `products` table —
  add new top-level static routes to `staticRoutes` in `app/sitemap.ts`.
- `app/opengraph-image.tsx` / `app/icon.tsx` generate branded OG/favicon images at build time
  (no static asset files needed) — edit those instead of adding files under `public/`.
- Structured data helpers live in `lib/structured-data.ts` (Organization, Product, Breadcrumb).

## Validation before finishing a change

Run, in order: `npx tsc --noEmit`, `npx eslint .`, `npx next build`. All three must be clean
(no disabling rules/types to force a pass). If you touch layout/spacing, take a screenshot at
375px and 1440px widths before calling it done.
