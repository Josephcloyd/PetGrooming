"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, LoaderCircle } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { findService, services } from "@/data/services";
import { slideHorizontal } from "@/lib/animations";
import { bookingDefaults, bookingSchema, stepFields, type BookingFormValues } from "@/lib/booking/schema";
import { submitBooking, type BookingAdapter } from "@/lib/booking/submit";
import { bookingQuote, type BookingQuote } from "@/lib/pricing";
import { Button } from "@/components/ui/Button";
import { PriceSummary } from "./PriceSummary";
import { ProgressBar } from "./ProgressBar";
import { StepContact } from "./StepContact";
import { StepPetInfo } from "./StepPetInfo";
import { StepReview } from "./StepReview";
import { StepSchedule } from "./StepSchedule";
import { StepServices } from "./StepServices";
import { SuccessScreen } from "./SuccessScreen";

const STEPS = [
  { label: "Pet", title: "Tell us about your pet", component: StepPetInfo },
  { label: "Services", title: "Choose your services", component: StepServices },
  { label: "Schedule", title: "Pick a date and time", component: StepSchedule },
  { label: "Contact", title: "How can we reach you?", component: StepContact },
  { label: "Review", title: "Review and confirm", component: StepReview },
] as const;

const LAST_STEP = STEPS.length - 1;

type SubmitStatus = "idle" | "submitting" | "error";

type Confirmation = { bookingId: string; values: BookingFormValues; quote: BookingQuote };

interface BookingWizardProps {
  /** Swap in a real backend adapter (API route, Supabase) here. */
  adapter?: BookingAdapter;
}

export function BookingWizard({ adapter }: BookingWizardProps) {
  const reduceMotion = useReducedMotion();
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("service");
  const topRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const methods = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: bookingDefaults,
    mode: "onTouched",
  });
  const { control, trigger, handleSubmit, setValue, reset } = methods;

  const [[step, direction], setStep] = useState<[number, number]>([0, 0]);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);

  useEffect(() => {
    if (preselectedService && findService(preselectedService)) {
      setValue("serviceIds", [preselectedService]);
    }
  }, [preselectedService, setValue]);

  const [size, serviceIds, location, petName] = useWatch({
    control,
    name: ["size", "serviceIds", "location", "petName"],
  });
  const quote = bookingQuote({ serviceIds, size, homeService: location === "home", catalog: services });

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };

  const goNext = async () => {
    const isValid = await trigger(stepFields[step]);
    if (!isValid) return;
    setStep(([current]) => [Math.min(current + 1, LAST_STEP), 1]);
    scrollToTop();
  };

  const goBack = () => {
    setStep(([current]) => [Math.max(current - 1, 0), -1]);
    scrollToTop();
  };

  const onSubmit = async (values: BookingFormValues) => {
    setStatus("submitting");
    setSubmitError(null);
    const result = await submitBooking(
      { ...values, total: quote.total, submittedAt: new Date().toISOString() },
      adapter,
    );
    if (result.success) {
      setConfirmation({ bookingId: result.bookingId, values, quote });
      setStatus("idle");
      return;
    }
    setStatus("error");
    setSubmitError(result.error);
  };

  const handleBookAnother = () => {
    reset(bookingDefaults);
    setConfirmation(null);
    setStep([0, -1]);
  };

  /** Enter inside an input advances the step instead of submitting early. */
  const handleKeyDown = (event: KeyboardEvent<HTMLFormElement>) => {
    const target = event.target as HTMLElement;
    if (event.key !== "Enter" || target.tagName === "TEXTAREA" || target.tagName === "BUTTON") return;
    if (step === LAST_STEP) return;
    event.preventDefault();
    void goNext();
  };

  if (confirmation) {
    return (
      <SuccessScreen
        bookingId={confirmation.bookingId}
        values={confirmation.values}
        quote={confirmation.quote}
        onBookAnother={handleBookAnother}
      />
    );
  }

  const StepComponent = STEPS[step].component;
  const isSubmitting = status === "submitting";

  return (
    <FormProvider {...methods}>
      <div ref={topRef} className="scroll-mt-28 grid gap-8 lg:grid-cols-[1fr_20rem] lg:items-start">
        <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown} noValidate className="rounded-3xl bg-cream-dark/60 p-5 sm:p-8">
          <ProgressBar steps={STEPS.map((item) => item.label)} current={step} />

          <div className="relative mt-8 overflow-hidden">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={step}
                custom={direction}
                variants={reduceMotion ? undefined : slideHorizontal}
                initial="enter"
                animate="center"
                exit="exit"
                onAnimationComplete={(definition) => {
                  if (definition === "center") headingRef.current?.focus({ preventScroll: true });
                }}
              >
                <h2 ref={headingRef} tabIndex={-1} className="mb-6 text-2xl font-semibold text-navy outline-none sm:text-3xl">
                  {STEPS[step].title}
                </h2>
                <StepComponent />
              </motion.div>
            </AnimatePresence>
          </div>

          {submitError ? (
            <p role="alert" className="mt-6 rounded-2xl bg-coral-light px-4 py-3 text-sm font-medium text-coral-dark">
              {submitError}. Please try again or call us.
            </p>
          ) : null}

          <div className="mt-8 flex items-center justify-between gap-3">
            <Button variant="ghost" onClick={goBack} disabled={step === 0 || isSubmitting}>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back
            </Button>
            {step < LAST_STEP ? (
              <Button onClick={() => void goNext()}>
                Continue
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
                {isSubmitting ? "Booking…" : "Confirm booking"}
              </Button>
            )}
          </div>
        </form>

        <div className="lg:sticky lg:top-28">
          <PriceSummary quote={quote} size={size} petName={petName || undefined} />
        </div>
      </div>
    </FormProvider>
  );
}
