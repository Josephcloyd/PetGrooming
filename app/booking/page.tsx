import type { Metadata } from "next";
import { Suspense } from "react";
import { site } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FloatingShapes } from "@/components/decor/FloatingShapes";
import { BookingWizard } from "@/components/booking/BookingWizard";

export const metadata: Metadata = {
  title: "Book a Grooming",
  description: `Book a bath, haircut, nail trim or spa package at ${site.name} in ${site.address.city}. Pick your services, date and time in under two minutes.`,
  alternates: { canonical: "/booking" },
};

export default function BookingPage() {
  return (
    <section aria-labelledby="booking-heading" className="relative overflow-hidden pt-32 pb-20 sm:pt-36 lg:pb-28">
      <FloatingShapes className="opacity-60" />
      <Container className="relative">
        <SectionHeading
          id="booking-heading"
          eyebrow="Online booking"
          title="Let's get your pet pampered"
          highlight="pampered"
          description="Five quick steps. You'll see a running total as you go, and nothing is charged until pickup."
        />
        <div className="mt-14">
          <Suspense fallback={<p className="text-center text-navy-soft">Loading booking form…</p>}>
            <BookingWizard />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}
