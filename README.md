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
| `--color-coral` | `#F4846A` | Button and badge fills, always with navy text |
| `--color-coral-dark` | `#B8492A` | Coral text, links and the focus ring |
| `--color-navy` | `#1F2A44` | Headings, body text, dark sections |
| `--color-sunny` | `#FFD166` | Accents, button hover, squiggles |
| `--color-lagoon` | `#6CC4D4` | The one water blue: bubbles, waves, tints |

**Contrast rule:** never put white text on `coral`, because it measures only 2.5:1. Use navy text on coral (5.7:1), or `coral-dark` for coral-coloured text on light backgrounds (5.2:1 on white, 4.9:1 on cream). Both pass WCAG AA.

Fonts are loaded in `app/layout.tsx` with `next/font/google` (Fredoka for headings, DM Sans for body). Swap the imports there and update `--font-display` / `--font-sans` in `globals.css`.

### Pricing rules
`lib/pricing.ts` holds the size multipliers for individual services (`SIZE_MULTIPLIER`) and the home-service travel fee (`HOME_SERVICE_FEE`). Package prices are explicit per size in `data/pricing.ts`.

### Images
Placeholder photos are Unsplash URLs. To use your own, drop files into `public/` and change the `src` values in `data/`. If you keep remote images, make sure the host is listed in `images.remotePatterns` in `next.config.ts`.

### Animations
Shared variants and transitions are in [`lib/animations.ts`](lib/animations.ts); CSS keyframes (foam, paw stamp) live in the `@theme` block of `app/globals.css`. Every animated component checks `useReducedMotion()` and the root layout wraps the app in `MotionConfig reducedMotion="user"`, so users with "reduce motion" enabled get instant or static versions.

Motion is deliberately kept to a few signature effects, plus small touches that respond to what the visitor does. Avoid adding always-on ambient animation; the page already has enough.

| Effect | Component |
|---|---|
| **Signature:** suds cover the hero photo, then pop to reveal it | `components/decor/FoamReveal.tsx` |
| **Signature:** paw prints stamp along the timeline as you scroll | `components/sections/HowItWorks.tsx` |
| **Signature:** odometer-style rolling prices, and a pup that grows with the chosen size | `components/ui/RollingPrice.tsx`, `components/sections/Pricing.tsx` |
| Hero "Book a Grooming" button morphs into the booking form (React `<ViewTransition>`) | `lib/transitions.ts`, `components/sections/Hero.tsx`, `components/booking/BookingWizard.tsx` |
| Service cards expand into a detail panel | `components/cards/ServiceCard.tsx`, `components/cards/ServiceDetail.tsx` |
| Gallery photos slide into place when filtering dogs or cats | `components/gallery/GalleryGrid.tsx` |
| Booking pet buddy swaps dog and cat and grows with size | `components/booking/PetBuddy.tsx` |
| Paw stamps onto ticked service checkboxes | `components/booking/fields.tsx` |
| The booked pet gets a little bath on the success screen | `components/booking/SuccessScreen.tsx` |
| Headline words drop in with a bouncy "splash", plus a squiggle underline in the hero and pricing headings | `wordReveal` in `lib/animations.ts`, `components/ui/Squiggle.tsx` |
| Buttons squish softly when pressed | `tapScale` in `lib/animations.ts` |
| Water-line dividers, only where the background changes colour | `components/decor/WaveDivider.tsx` |
| Polaroid team cards straighten on hover | `components/cards/TeamCard.tsx` |
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
  cards/             ServiceCard, ServiceDetail, PricingCard, TeamCard
  gallery/           BeforeAfterSlider, GalleryGrid, Lightbox
  booking/           BookingWizard, step components, ProgressBar, PriceSummary, SuccessScreen
  ui/                Button, Container, SectionHeading, Squiggle, AnimatedSection, Badge, RollingPrice
  decor/             FloatingShapes, FoamReveal, WaveDivider, SpinningBadge, SocialIcons
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
