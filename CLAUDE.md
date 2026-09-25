@AGENTS.md

# Mavrikios Jewellery Boutique — Project Rules

Premium e-commerce rebuild for a real jewellery boutique (Latsia, Nicosia, Cyprus, since
1967). Full brand/creative brief lives in the original build request; this file captures the
durable engineering rules for anyone (human or agent) working in this codebase afterwards.

## Design system

The site was redesigned (Sept 2026) after the client rejected the first look as templated. The
previous world (Fraunces + cream/gold/espresso palette, an eyebrow label above every section)
was the textbook AI default for a "luxury" brief, and the cool-moss pass that followed was
deliberately not that. The warm mixed-metal direction below was a client-directed pass on top of
the cool-moss one: a literal gold/silver feel and a warmer base, keeping structure, type, shape
lock, motion, the eyebrow ration and the em-dash ban exactly as they were. **It was approved and
merged into the default branch, so it is simply the design now** — there is no competing
direction to weigh it against, and nothing here is provisional.

The palette sits at exact client-specified hex values, and the homepage hero and category strip
were built against a client reference image: a real jewellery photo filling ~58% of the hero with
no boxed white card around it, an eyebrow, an italic-accented headline, and three horizontal
collection cards directly below. `CuratedCategories` renders that 3-card strip
(Rings/Necklaces/Bracelets) rather than the earlier 6-tile mosaic; the mosaic's other categories
(Earrings, Engagement, Gifts) are still reachable via the mega menu and `/shop`, just not
featured on the homepage strip.

- Palette lives in `app/globals.css` as Tailwind v4 `@theme` tokens: `bone-*` (warm ivory/cream
  base, bone-50 #f7f5f0), `stone-*` (warm-neutral grey, stone-500 #65615b for secondary text),
  `ink-*` (warm charcoal-espresso, ink-950 #211e1a for primary text, ink-900 #26211d for dark
  surfaces/CTAs), `silver-*` (a literal cool silver, used sparingly as the "silver" half of the
  mixed-metal accent — e.g. the `New` product badge), and `gold-*` (antique gold, the primary
  accent). Use these tokens, not raw hex values.
  **Gold has two distinct roles, don't mix them up:** `gold-600` (#5c4413, ~8.5:1 contrast on
  bone-50) is the only gold step used for small text — eyebrows, nav, badges, the `Limited`
  badge. `gold-400` (#a8834e, the client's exact "muted champagne" value, ~3.2:1 contrast) is
  reserved for large/bold elements only where WCAG's large-text threshold applies — an italic
  word inside a big serif headline (see the hero's `to stay`), hairline dividers, icons on
  hover. Never put `gold-400` on small body or label text, it fails contrast there; that mistake
  shipped once in the hero eyebrow and was caught by screenshot review, not lint, so double-check
  visually.
  Two accents, not one: gold carries the primary emphasis, silver is the deliberately-secondary
  metal note — don't let silver drift into carrying eyebrows or CTAs, that's gold's job.
- `container-boutique`'s desktop gutter is `lg:px-16` (64px, was `lg:px-12`/48px) — tightened
  per the client's "avoid oversized empty space, ~64-84px desktop padding" direction. This is
  global, every page using the container picked it up.
- Typography: `font-serif` is Cormorant Garamond (weights 400/500/600), `font-sans` is Geist.
  Headlines are set roman; italic is reserved for emphasising a phrase inside a headline (see the
  hero `<em>`), never applied to every heading. Don't introduce a third family, and don't bring
  back Fraunces or Inter.
- Theme lock: the whole site is one light theme. `.marble-surface` (warm ivory, soft brass-toned
  veining) is a tint within that theme. `.marble-surface-dark` (deep espresso-black with a warm
  gold undertone, like the inside of a ring box lined in dark velvet) is the ONE permitted dark
  "colour block" moment per page: the homepage uses it once (`CampaignFeature`), each secondary
  page at most once (its closing CTA). Never two dark sections on one page.
- Shape lock: everything is sharp (`--radius: 0`, so `rounded-sm/md/lg` all resolve to 0). The
  only round elements are floating overlay icon actions on imagery (wishlist heart, quick view,
  quick add, tile arrows) and count indicators. Don't add rounded cards, pill badges or pill
  buttons.
- Buttons are rectangular with uppercase tracked labels (see `components/ui/button.tsx`). CTA
  labels stay short enough to sit on one line at desktop. One label per intent per page.
- Eyebrow labels (the small `uppercase tracking-[0.3em]` line above a headline) are rationed:
  at most 1 per 3 sections on any page, and they are `text-gold-600`, not grey. The homepage
  carries 3 across 11 sections (Best Sellers, Bespoke, Visit the Boutique). Secondary pages get
  exactly one, inside `PageHero`. Let the headline do the work.
- No em-dashes or en-dashes anywhere user-visible (headlines, copy, meta, alt text, prices).
  Use a period, comma, colon or a plain hyphen. This is checked mechanically before shipping:
  `grep -rnE "—|–" app components lib data --include="*.tsx" --include="*.ts"` should return only
  code comments.
- No decorative watermarks (giant ghost wordmarks or years), no scroll cues, no marquees, no
  locale/time strips, no numbered "01 / 02" step labels, no captions overlaid on photos. All of
  these were removed in the redesign; don't reintroduce them.
- Motion is restrained but real: entrance reveals via `Reveal`/`RevealItem`, scroll parallax on
  imagery via `ParallaxLayer`, the cursor-reactive `LivingMarble` canvas behind the hero, press
  feedback on buttons. Opacity/scale stay in the 0.9–1.06 range, no bounce outside the checkout
  confirmation. Respect `prefers-reduced-motion` (handled globally plus `useReducedMotion` in
  `ParallaxLayer`).
- `app/template.tsx` only plays its whole-page fade+rise on client-side route changes (the "soft
  cut between pages" it exists for), never on a browser session's first paint. It used to run
  unconditionally, which meant the SSR HTML for every fresh load or hard refresh rendered `<main>`
  at `opacity:0` (confirmed directly in the raw response) and then faded the *entire* page in on
  top of Hero's own already-staggered entrance and every `Reveal` section's `whileInView` fade.
  Both layers start from the same hidden markup, so on a fast desktop they resolve together and
  go unnoticed, but on a real phone's slower hydration they visibly separated into two passes,
  which is what was being reported as pages/components "flashing" before settling. Fixed by
  skipping the fade entirely on first paint (a module-level flag, flipped from an effect, that
  only becomes true after the first client-side mount) so a fresh load's markup is just visible
  immediately; in-app navigation still gets the fade. Don't reintroduce an unconditional page-level
  fade in `template.tsx` without checking it against the section-level entrance animations it
  wraps.
- `FadeImage` (`components/site/fade-image.tsx`) checks whether the underlying `<img>` is already
  `complete` in a `useLayoutEffect`, not `useEffect` + polling alone. The polling fallback is still
  there (a cached image's `load` event can fire before React attaches `onLoad`), but it's now a
  backstop behind a synchronous pre-paint check, so an image the browser already had cached
  resolves to visible in the same frame instead of sitting hidden for a tick first.
- **Never ship markup that starts hidden and needs JS to become visible.** This is the rule the
  two bullets above are specific cases of, and it's the one that fixed the "everything flashes on
  mobile then shows correctly" report for good. Framer's `initial`/`whileInView` bake their hidden
  state into the SSR HTML, so every section using them shipped at `opacity:0` and stayed blank
  until the bundle parsed and hydrated. Desktop hides that gap; a real phone does not. Verify with
  `curl -s localhost:PORT/ | grep -c 'opacity:0'` against a production build — the homepage should
  return **0**. Two mechanisms keep it there:
  - Above-the-fold entrances (`Hero`, `PageHero`) use the `.enter-up` CSS utility with a
    `--enter-delay` custom property for stagger. CSS is render-blocking, so these run on the
    browser's first paint with no JS at all. `.enter-up` uses `animation-fill-mode: both` so a
    delayed element stays hidden *through* its delay instead of showing, hiding, then animating.
  - `Reveal`/`RevealItem` (`components/site/reveal.tsx`) are CSS + IntersectionObserver, not
    Framer. Server and first client render are always the finished visible state; only elements
    the visitor cannot see yet are armed (`.rv-armed`/`.rv-group-armed`) and transition in on
    scroll via `.rv-in`. Anything already on screen is never hidden, so it has no window in which
    to flash. Stagger is `nth-child` `transition-delay` off a `--rv-stagger` custom property
    (supports up to 8 distinct steps, then flattens), which is why `RevealItem` is a plain element
    with no animation state of its own.
  - **The on-screen decision is made inside the observer callback, not in a layout effect.** A
    layout effect runs before images contribute their height and before a phone's address bar
    settles `innerHeight`, so sections that end up far below the fold measured as on-screen and
    were skipped permanently: on mobile that read as "the scroll animations don't work at all".
    The first callback uses real `getBoundingClientRect` geometry against the viewport; later
    ones use the observer's own report.
  - The observer uses `threshold: 0` with a `-10%` bottom `rootMargin`, deliberately: a percentage
    threshold never fires for a section taller than the viewport, since that share of it can't be
    on screen at once. The margin is *not* used for the first decision, or an element sitting in
    that bottom strip at load would be reported off-screen and hidden while visible.
  - `.rv-draw` is the one opt-out from the group fade: a child carrying it starts at `scale(0)`
    and extends to full size instead of fading and sliding in, so a hairline draws itself along
    its own length. It is used for the Bespoke timeline's rule (`BespokeEditorial`), where the
    line is what makes four labels read as one sequence, and the step stagger is tuned against
    the draw so a marker lands about when the line reaches it. Both axes scale, so the same
    class serves the vertical mobile rule and the horizontal desktop one. Under reduced motion
    the block's `transform: none !important` wins and the rule is simply present, which is the
    right answer for an animation whose whole content is growth. The line is an `<li aria-hidden>`
    rather than a `<div>`: it lives inside an `<ol>`, and it is deliberately the first child so
    the `nth-child` stagger starts the steps one beat behind it.
- The `prefers-reduced-motion` block in globals.css zeroes `animation-delay`/`transition-delay` as
  well as durations. Collapsing only the duration still leaves a delayed or staggered element
  invisible for the length of its delay, which is the same blank-then-appear the mode exists to
  prevent.
- **Reduced motion softens the entrances, it does not switch them off.** The block re-declares
  `.enter-up` as a plain `reveal-fade` and strips `transform` from `.rv-armed`/`.rv-group-armed`,
  leaving a ~420ms opacity fade with no travel, scale or parallax. Those selectors carry a class
  so they outrank the universal `!important` rule above them. An earlier version had `Reveal` bail
  out of arming entirely under reduced motion, which left phones with "Reduce Motion" switched on
  (a very common setting) looking at a completely static site. The guidance is about vestibular
  triggers, which are movement and scale, not opacity: reduce the motion, keep the feedback.
- `CountBadge` (`components/site/count-badge.tsx`) drives the bag and wishlist counts in the
  navbar. It is the only lasting confirmation that an add worked, and it used to both appear and
  change value with no transition at all. It now enters on `opacity` + `scale` 0.9 to 1 over
  180ms and pulses to 1.18 on a change, deliberately skipping the pulse on the first appearance
  (the entry already covers it) and on the drop back to zero. Framer is fine here despite the
  no-JS-hidden-markup rule: both counts come from a `localStorage` store, so the server always
  renders zero and there is no server-rendered content being hidden, only a client-only element
  arriving.
- Horizontal product rails (`ProductRail`) carry **no scroll-snap**. Snap points plus an entrance
  animation plus photos completing at different moments kept giving the browser reasons to
  re-snap mid-gesture, which is what made a scrolled rail jump back to the same card on its own
  (reported twice). They use the `.rail-scroll` utility instead: free scrolling with a 3px
  hairline scrollbar in `stone-300`, which stays visible on purpose since it's the only affordance
  that the row continues past the edge. Don't reintroduce `snap-x`/`snap-start` here.

## Placeholder imagery

- `components/site/placeholder-art.tsx` renders fine-line procedural jewellery motifs on a
  marble surface as the fallback wherever a real photo is missing. It is now visible only on the
  4 demo products still without a photo and on `/404`; every editorial slot uses real photography
  from `public/images/products/` (see `data/categories.ts` and `data/navigation.ts` for the
  `image` fields).
- The boutique and workshop slots (`BoutiqueLocation`, the pair on `/our-story`) carry **pieces,
  not places**: `boutique-gold-band.jpg`, `story-woven-necklace.jpg`, `story-paired-bands.jpg`.
  No photograph of a real shopfront or bench was available and passing off a stranger's shop as
  the Latsia boutique is not an option, so those slots show the work instead and the alt text
  describes the piece rather than claiming a location. The `TODO` comments in both files still
  ask for a real boutique interior and workshop shot at 1600x1200; swap them in when the client
  supplies them. Candidate "workshop" photos on Commons were rejected on look: a washing-up
  bottle beside a kitchen bowl and red-handled pliers on a plastic ruler are worse for this brand
  than the line art they would have replaced.
- `types/product.ts` → `ProductImage` has an optional `src`. `components/site/product-media.tsx`
  automatically renders a real photo via `next/image` when `src` is set, falling back to
  `PlaceholderArt` otherwise. **To add real photography: just set `src` on the product's images
  — no other code changes needed.**
- `components/commerce/product-card.tsx`'s hover crossfade (primary photo → second angle) only
  fires when the product's second image slot also has a real `src` — a product with just one
  real photo hovers into a plain zoom instead of the placeholder art, since swapping a photo for
  line art on hover reads as broken, not a nice alternate angle.
- 12 of 16 demo products currently carry real photos as **temporary indicative placeholders**,
  not verified inventory — swap these for real Mavrikios photography before launch, same as the
  rest of the demo catalogue. The remaining 4 (Monopetra, Thalia, Eleni, Nicosia) deliberately
  still render `PlaceholderArt`; see the note on wrong photos below.
  - `aliki-solitaire-ring-1.jpg`, `orion-curb-chain-bracelet.jpg` — user-supplied.
  - `sapphire-cluster-ring.jpg`, `kite-drop-earrings.jpg`, `pearl-pendant-necklace.jpg`,
    `ruby-emerald-swirl-ring.jpg`, `mama-charm-necklace.jpg`, `aquamarine-bezel-ring.jpg` —
    user-supplied.
  - Sourced from Wikimedia Commons, all jewellery by Ann-Sophie Qvarnström photographed by
    Wikimedia user W.carter, so the whole set shares one studio look:
    `daphne-signet-ring.jpg` ("Polaris, gold ring"), `sophia-eternity-band.jpg` ("Starlight,
    white gold ring with diamonds"), `athina-kyanite-drop-earrings.jpg` ("Arabesque, gold and
    kyanite earrings"), `melina-woven-cuff-bracelet.jpg` ("Corset, silver bracelet"),
    `irini-layered-necklace.jpg` + `irini-layered-necklace-2.jpg` ("Magpie's Nest, silver
    necklace" and its side view), `kyveli-nest-pendant.jpg` ("Nest, silver pendant with
    freshwater pearl"), `calliope-fog-veil-necklace.jpg` ("Fog Veil, silver necklace with
    freshwater pearls") — all **CC BY-SA 4.0**; and `selene-pearl-drop-earrings.jpg` ("Pearl and
    silver earrings") — **CC BY 4.0**. Attribution is required for as long as these files are in
    use: photographs by W.carter, jewellery by Ann-Sophie Qvarnström, via Wikimedia Commons.
    Remove the attribution obligation and the files together when real photography replaces them.
- **A wrong photo is worse than no photo.** The demo catalogue's copy was rewritten to match what
  is actually pictured rather than the other way round, because a jeweller reads these instantly:
  Athina lost "Ruby" from its name (the photo's stone is blue), Melina became a woven cuff (the
  photo is a plain hammered cuff, not baguette-set), Kyveli became a nest pendant (no emerald in
  frame), Calliope and Ianthe were renamed to their photographs, and several products moved to
  sterling silver because that is the metal in the shot. Monopetra went the other way: it is the
  single-stone Cypriot ring the whole brand story rests on, and the only photo available showed a
  two-stone ruby-and-emerald swirl, so it went back to the brand's own `monopetra` placeholder
  motif. Renaming a demo product to fit a stand-in photo is fine; leaving a contradiction on the
  page is not. Slugs moved with the names, and nothing references `products` by foreign key, but
  `campaign-feature.tsx` pins three slugs by hand — check it after any rename.
- Each photo is used in exactly one place. The hero photo in particular must not also appear in
  the collections strip, the Instagram grid, the mega menu or a nav panel; it did, and the repeat
  was obvious. If you reassign a hero image, grep the old filename across `components/` and
  `data/` before you finish.

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
- **Catalog reads are tagged, and writes must invalidate the tag.** `catalogClient()` passes its
  own `fetch` that sets `next: { revalidate: 60, tags: [CATALOG_TAG] }`. This is load-bearing:
  supabase-js goes through global `fetch`, Next persists that in its build cache, and it will
  reuse the entry on a *later* build. A product edited in the database kept rendering its old
  name, metal and photo on prerendered pages through a full clean `next build` until this was
  added, which also meant the owner's admin edits were not reliably reaching the storefront.
  Server Actions that change catalog data call `updateTag(CATALOG_TAG)` before
  `revalidatePath("/", "layout")` — `updateTag`, not `revalidateTag`, because it expires the
  entry immediately (read-your-own-writes) where `revalidateTag` only marks it stale. Note this
  version's `revalidateTag` takes a mandatory second `profile` argument and the one-argument form
  no longer type-checks; see `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/`.
  `app/checkout/actions.ts` calls it too, after `decrement_stock`, or a sold-out piece keeps
  advertising itself as in stock. Any new write path against `products` needs the same call.
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

- `lib/site-config.ts` holds the business identity, and it holds **two** of them: `mavrikios`
  (the real boutique, verified address/phone/Instagram) and `zafiri` (an invented stand-in).
  One line, `activeProfile`, picks which the site renders, and that line is the **only**
  difference between two branches:
  - the working branch runs `zafiri`, so the build can be shown publicly while the engagement is
    unsigned. A demo carrying a real business's name, phone, address and Instagram is a claim
    about them.
  - `preview/mavrikios` runs `mavrikios`, so the real thing can be shown to the client. It exists
    to give Vercel a second branch to build a preview deployment from.

  Keep them in sync by merging the working branch **into** `preview/mavrikios` and keeping that
  branch's side of this one line. Never merge `preview/mavrikios` back the other way, or the real
  identity lands on the public build. When the engagement is signed, flip `activeProfile` on the
  working branch and delete the preview branch rather than living with the fork.
  - Everything user-visible derives from the active profile: the wordmark, page titles, every
    meta description, the footer, the OG image, the sitemap host, the LocalBusiness structured
    data, and the suburb and founding year where they appear inside sentences ("our <suburb>
    boutique", "Since <year>"). Don't hardcode the name, the suburb or the year in a component
    again — that is what made the first rename a 25-file grep.
  - The `zafiri` values are all invented and deliberately not contactable: the phone sits in an
    unallocated Cyprus range, the email uses the IANA-reserved `.example` TLD, the address is a
    made-up street in a different suburb and the coordinates are the centre of Nicosia. The
    Instagram link points at instagram.com itself rather than a `zafiri.jewellery` profile,
    because that handle may belong to a real person. Don't "fix" any of these into something
    that looks real.
  - The scrub covers what the site renders, not the repository: this file, the git history and
    the repo name still say Mavrikios, and the deployment URL may too.
  - Verified by building under each profile and scanning every route for the real name, suburb,
    year, phone, street, postcode and coordinates. Re-run that check after touching site-config.
  - Hours are a best-effort placeholder from the one data point we had, and are shared by both
    profiles — confirm them with the business before relying on them.
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
