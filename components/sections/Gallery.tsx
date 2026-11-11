import { beforeAfterPairs, galleryPhotos } from "@/data/gallery";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BeforeAfterSlider } from "@/components/gallery/BeforeAfterSlider";
import { MasonryGrid } from "@/components/gallery/MasonryGrid";

export function Gallery() {
  const featuredPair = beforeAfterPairs[0];

  return (
    <section id="gallery" aria-labelledby="gallery-heading" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <AnimatedSection>
            <SectionHeading
              id="gallery-heading"
              align="left"
              eyebrow="Before & after"
              title="Drag to see the glow-up"
              highlight="glow-up"
              description={
                featuredPair.isSample
                  ? "Slide the handle to watch a shaggy, muddy coat turn fresh and clean."
                  : `Slide the handle to compare ${featuredPair.petName} before and after a full groom.`
              }
            />
            <p className="mt-6 text-sm text-navy-soft">
              Tip: focus the handle and use the arrow keys for a precise comparison.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <BeforeAfterSlider pair={featuredPair} />
          </AnimatedSection>
        </div>

        <AnimatedSection className="mt-24">
          <SectionHeading
            eyebrow="Gallery"
            title="Fresh cuts and happy faces"
            highlight="happy faces"
            description="Hover a photo to tilt it, click to open it full size."
          />
        </AnimatedSection>
        <div className="mt-12">
          <MasonryGrid photos={galleryPhotos} />
        </div>
      </Container>
    </section>
  );
}
