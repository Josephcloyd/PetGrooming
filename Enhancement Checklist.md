# Enhancement Checklist

Ideas for taking Pampered Paws from a brochure site to one that brings in real bookings. Tick items off as they ship.

## Priority 1 — Make the site take real bookings

- [ ] **Save bookings and send notifications**
  - Store every booking in a database.
  - Email the owner a new-booking notification.
  - Email the customer a confirmation.
  - Hook-in point: the submit adapter in `lib/booking/submit.ts`.
  - _Why:_ the form shows a success screen today, but nothing is saved or sent, so real requests are lost.
- [ ] **Prevent double bookings**
  - Grey out time slots that are already taken for the chosen date.
  - _Why:_ slots are a fixed list in `data/timeSlots.ts`, so two people can book the same slot.
  - _Depends on:_ saving bookings.
- [ ] **Add Messenger and Viber buttons**
  - Floating "Message us" button linking to the Facebook page and Viber.
  - _Why:_ most PH customers prefer messaging over forms or calls.

## Priority 2 — Build trust and visibility

- [ ] **Replace placeholder content** in `data/`
  - Real phone number and email (`data/site.ts`)
  - Real street address, when ready to publish (`data/site.ts`)
  - Real team photos and bios (`data/team.ts`)
  - Gallery photos of your own work (`data/gallery.ts`)
  - A real before-and-after pair of one pet, then remove `isSample` (`data/gallery.ts`)
- [ ] **Owner dashboard**: a password-protected page listing upcoming bookings.
- [ ] **Custom domain**: for example `pamperedpaws.ph` instead of the `vercel.app` address.
- [ ] **Visitor analytics**: turn on Vercel Web Analytics to see traffic sources and where people drop off in the booking flow.
- [ ] **Google Business Profile**: helps people find the studio on Google Search and Maps in Cebu.
- [ ] **Real reviews**: show them only once they exist, pulled from Google or Facebook. Never write them in by hand.

## Priority 3 — Nice to have

- [ ] **SMS reminders** the day before each appointment, through a PH SMS provider.
- [ ] **Pet profiles** so returning customers can rebook in one tap.
- [ ] **Tagalog or Cebuano** versions of the key pages.
- [ ] **Optional GCash or Maya deposits** to reduce no-shows, if they become a problem.
- [ ] **Working newsletter signup**: the footer form only shows a thank-you message today.
