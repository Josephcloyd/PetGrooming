import { PawPrint } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="pt-32 pb-24 text-center">
      <Container className="max-w-lg">
        <span className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-coral-light text-coral-dark">
          <PawPrint className="h-10 w-10" aria-hidden="true" />
        </span>
        <h1 className="text-4xl font-semibold text-navy">This page wandered off</h1>
        <p className="mt-3 text-navy-soft">We looked under the sofa and everything. Let&apos;s get you back home.</p>
        <div className="mt-8">
          <Button href="/">Back to home</Button>
        </div>
      </Container>
    </section>
  );
}
