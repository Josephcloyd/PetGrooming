# Pampered Paws — Pet Grooming Website

A modern, responsive marketing site for a pet grooming business, built with Next.js (App Router), TypeScript, Tailwind CSS v4 and [Motion](https://motion.dev) (`motion/react`). It ships a single-page home with smooth-scroll sections and a separate multi-step `/booking` page validated with react-hook-form + zod.

## Quick start

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. The booking page lives at `/booking`.

Other scripts:

| Command | What it does |
|---|---|
| `npm run build` / `npm start` | Production build and server |
| `npm run lint` | ESLint (Next core-web-vitals + TypeScript) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest unit + component tests (jsdom) |
| `npm run test:coverage` | Same, with V8 coverage report |
| `npm run test:e2e` | Playwright end-to-end tests (run `npx playwright install chromium` once first) |

## Where to edit things

### Business name, city, contact details
[`data/site.ts`](data/site.ts) is the single source of truth. Change `name`, `headline`, `address`, `phone`, `email`, `hours`, `social`, `url` and the hero image here. The navbar, hero, contact section, footer, page metadata, Open Graph tags and LocalBusiness JSON-LD all read from it.

### Content
Everything is a typed array under [`data/`](data/):

| File | Section |
|---|---|
| `services.ts` | Service cards and booking services (name, description, starting price, duration, icon) |
| `pricing.ts` | Packages and the Small / Medium / Large options |
| `steps.ts` | How-it-works timeline |
| `gallery.ts` | Before/after pair and masonry photos |
| `team.ts` | Groomer cards |
| `faqs.ts` | Accordion |
| `timeSlots.ts` | Booking time slots and location options |
| `navigation.ts` | Navbar and footer links |

Types live in `data/types.ts`. Icons come from `lucide-react`.

### Colors, fonts, shadows
All brand tokens are defined once in the `@theme` block of [`app/globals.css`](app/globals.css). Tailwind v4 generates utilities from them automatically, so `--color-coral` becomes `bg-coral`, `text-coral`, `ring-coral`, etc.

| Token | Default | Used for |
|---|---|---|
| `--color-cream` | `#FFF8F0` | Page background |
| `--color-coral` | `#F4846A` | Primary buttons, highlights |
| `--color-navy` | `#1F2A44` | Headings, body text, dark sections |
| `--color-sunny` | `#FFD166` | Badges and playful accents |
| `--color-mint`, `--color-sky` | pastels | Icon tiles, decorations |

Fonts are loaded in `app/layout.tsx` with `next/font/google` (Fredoka for headings, DM Sans for body). Swap the imports there and update `--font-display` / `--font-sans` in `globals.css`.

### Pricing rules
`lib/pricing.ts` holds the size multipliers for individual services (`SIZE_MULTIPLIER`) and the home-service travel fee (`HOME_SERVICE_FEE`). Package prices are explicit per size in `data/pricing.ts`.

### Images
Placeholder photos are Unsplash URLs. To use your own, drop files into `public/` and change the `src` values in `data/`. If you keep remote images, make sure the host is listed in `images.remotePatterns` in `next.config.ts`.

### Animations
Shared variants and transitions are in [`lib/animations.ts`](lib/animations.ts); CSS keyframes (foam, shimmer) live in the `@theme` block of `app/globals.css`. Every animated component checks `useReducedMotion()` and the root layout wraps the app in `MotionConfig reducedMotion="user"`, so users with "reduce motion" enabled get instant or static versions.

Signature "bath time" animations and where they live:

| Effect | Component |
|---|---|
| Suds cover the hero photo, then pop to reveal it | `components/decor/FoamReveal.tsx` |
| Soap bubbles trail the mouse across the hero | `components/decor/BubbleCursor.tsx` |
| Hero photo frame slowly morphs between blob shapes | `components/sections/Hero.tsx` |
| Headline words drop in with a bouncy "splash" | `wordReveal` in `lib/animations.ts` |
| Hand-drawn squiggle underlines draw on scroll | `components/ui/Squiggle.tsx` |
| Rotating circular sticker | `components/decor/SpinningBadge.tsx` |
| Bubbles rise through service cards on hover | `components/cards/ServiceCard.tsx` |
| Paw prints stamp along the timeline as you scroll | `components/sections/HowItWorks.tsx` |
| Odometer-style rolling prices and a pup that grows with size | `components/ui/RollingPrice.tsx`, `components/sections/Pricing.tsx` |
| Sloshing water-line dividers between sections | `components/decor/WaveDivider.tsx` |
| 3D tilt with glare on gallery photos | `components/gallery/TiltFrame.tsx` |
| Polaroid team cards that straighten on hover | `components/cards/TeamCard.tsx` |
| Map pin drops in with ripples | `components/sections/MapCard.tsx` |
| Menu floods in as a growing circle | `components/layout/MobileDrawer.tsx` |
| Footer wordmark letters rise and hop | `components/layout/Wordmark.tsx` |

### No made-up social proof
The site deliberately ships without testimonials, star ratings or "X happy pets" counters, and the LocalBusiness JSON-LD has no `aggregateRating`. Add real reviews only once you have them, ideally pulled from a review platform.

The before/after slider ships as a labelled **illustrative sample**. The "after" is a stock pug photo (`public/images/before-after/pug-after.jpg`). The "before" is the same photo with overgrown fur and mud painted on by `scripts/make-pug-before.mjs`. Re-run it from the project root to regenerate:

```bash
node scripts/make-pug-before.mjs public/images/before-after/pug-after.jpg public/images/before-after/pug-before.jpg
```

To show a real result, put two photos of the same pet in `beforeAfterPairs` in `data/gallery.ts` and remove `isSample: true`. The "Illustrative sample" tag then disappears automatically.

## Connecting the booking form to a backend

The form is front-end only. Submission goes through an adapter in [`lib/booking/submit.ts`](lib/booking/submit.ts):

```ts
export const localAdapter: BookingAdapter = async (payload) => { /* resolves locally */ };
```

Write a new adapter that POSTs to an API route or inserts into Supabase, then either change the default in `submitBooking` or pass it in: `<BookingWizard adapter={supabaseAdapter} />`. The payload is the validated form (`BookingFormValues`) plus `total` and `submittedAt`. The zod schema in `lib/booking/schema.ts` can be reused server-side to validate the request body.

## Project structure

```
app/                 routes, layout, metadata, sitemap, robots
components/
  layout/            Navbar, mobile drawer, footer, newsletter, wordmark
  sections/          Hero, Services, HowItWorks, Pricing, Gallery, Team, Faq, Contact, MapCard
  cards/             ServiceCard, PricingCard, TeamCard
  gallery/           BeforeAfterSlider, MasonryGrid, TiltFrame, Lightbox
  booking/           BookingWizard, step components, ProgressBar, PriceSummary, SuccessScreen
  ui/                Button, Container, SectionHeading, Squiggle, AnimatedSection, Badge, RollingPrice
  decor/             FloatingShapes, FoamReveal, BubbleCursor, WaveDivider, SpinningBadge, SocialIcons
data/                typed content arrays
lib/                 animations, pricing, booking schema/schedule/submit, JSON-LD
hooks/               useScrolled, useFocusTrap, useLockBodyScroll, useAvailableDates
e2e/                 Playwright specs
```

## Accessibility and SEO notes

- Semantic landmarks, skip link, visible focus rings, keyboard-operable menu, accordion, lightbox, size toggle and before/after slider.
- `prefers-reduced-motion` respected throughout.
- Metadata, Open Graph and Twitter cards in `app/layout.tsx`; LocalBusiness JSON-LD generated from `data/site.ts`; `sitemap.xml` and `robots.txt` via the App Router metadata routes.
- Hero image is `priority`; all other images are lazy-loaded with fixed aspect ratios to avoid layout shift.
