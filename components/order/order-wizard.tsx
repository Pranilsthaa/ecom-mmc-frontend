"use client";

import { submitOrder, type OrderState, type Service } from "@/app/order/actions";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleCheck,
  LoaderCircle,
  Mail,
  Pencil,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { startTransition, useActionState, useEffect, useRef, useState, type ReactNode } from "react";
import ContactStep from "./contact-step";
import { FieldErrorsContext } from "./fields";

export type WizardStep = {
  title: string;
  description: string;
  content: ReactNode;
};

type SummaryGroup = { step: number; title: string; rows: { label: string; value: string }[] };

type FormControl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const initialState: OrderState = { status: "idle" };

function controlsIn(root: Element) {
  return [...root.querySelectorAll<FormControl>("input, select, textarea")];
}

/** Reads the filled-in values of every step so we can show a review screen. */
function buildSummary(fieldsets: (HTMLFieldSetElement | null)[], titles: string[]): SummaryGroup[] {
  return fieldsets.flatMap((fieldset, step) => {
    if (!fieldset) return [];
    const rows = new Map<string, string[]>();
    for (const control of controlsIn(fieldset)) {
      const label = control.dataset.label;
      if (!label || !control.value.trim()) continue;
      if (control instanceof HTMLInputElement && (control.type === "radio" || control.type === "checkbox") && !control.checked) {
        continue;
      }
      rows.set(label, [...(rows.get(label) ?? []), control.value.trim()]);
    }
    return [{ step, title: titles[step], rows: [...rows].map(([label, values]) => ({ label, value: values.join(", ") })) }];
  });
}

type OrderWizardProps = {
  service: Service;
  serviceLabel: string;
  icon: LucideIcon;
  steps: WizardStep[];
  /** What happens after they submit, shown on the success screen. */
  nextSteps: string[];
};

export default function OrderWizard({ service, serviceLabel, icon: Icon, steps: serviceSteps, nextSteps }: OrderWizardProps) {
  const [state, formAction, pending] = useActionState(submitOrder, initialState);
  const [current, setCurrent] = useState(0);
  const [summary, setSummary] = useState<SummaryGroup[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const stepRefs = useRef<(HTMLFieldSetElement | null)[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const hasNavigated = useRef(false);

  const steps: WizardStep[] = [
    ...serviceSteps,
    {
      title: "Where should we send it?",
      description: "Your contact details and delivery address.",
      content: <ContactStep />,
    },
  ];
  const reviewIndex = steps.length;
  const titles = [...steps.map((s) => s.title), "Review your order"];
  const fieldErrors = state.status === "error" ? state.fieldErrors : {};

  function goTo(index: number) {
    if (index === reviewIndex) setSummary(buildSummary(stepRefs.current, titles));
    hasNavigated.current = true;
    setCurrent(index);
  }

  /** Validates one step with the browser's built-in rules and shows the first problem. */
  function validateStep(index: number) {
    const fieldset = stepRefs.current[index];
    if (!fieldset) return true;
    const invalid = controlsIn(fieldset).find((control) => !control.checkValidity());
    if (!invalid) return true;
    if (index !== current) {
      goTo(index);
      requestAnimationFrame(() => invalid.reportValidity());
    } else {
      invalid.reportValidity();
    }
    return false;
  }

  function next() {
    if (validateStep(current)) goTo(current + 1);
  }

  // Move focus to the new step heading so keyboard and screen-reader users follow along.
  useEffect(() => {
    if (!hasNavigated.current) return;
    headingRef.current?.focus({ preventScroll: true });
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [current]);

  // When the server rejects something, jump back to the step that holds the first problem.
  useEffect(() => {
    if (state.status !== "error") return;
    const firstError = Object.keys(state.fieldErrors)[0];
    if (!firstError) return;
    const step = stepRefs.current.findIndex((fieldset) => fieldset?.querySelector(`[name="${firstError}"]`));
    if (step >= 0) goTo(step);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  if (state.status === "success") {
    return (
      <SuccessCard
        reference={state.reference}
        firstName={state.firstName}
        email={state.email}
        serviceLabel={serviceLabel}
        nextSteps={nextSteps}
      />
    );
  }

  const isReview = current === reviewIndex;
  const progress = ((current + 1) / titles.length) * 100;

  return (
    <FieldErrorsContext value={fieldErrors}>
      <form
        ref={formRef}
        noValidate
        onKeyDown={(event) => {
          // Earlier steps have no submit button, so make Enter in a text field mean "Continue".
          const target = event.target as HTMLElement;
          if (event.key !== "Enter" || isReview || target.tagName !== "INPUT") return;
          const type = (target as HTMLInputElement).type;
          if (["radio", "checkbox", "button", "submit", "file"].includes(type)) return;
          event.preventDefault();
          next();
        }}
        onSubmit={(event) => {
          event.preventDefault();
          if (!isReview) return next();
          if (steps.some((_, i) => !validateStep(i))) return;
          // Submitting manually (instead of <form action>) stops React from
          // clearing every field when the server sends back an error.
          const formData = new FormData(event.currentTarget);
          startTransition(() => formAction(formData));
        }}
        className="scroll-mt-28 overflow-hidden rounded-3xl border border-border bg-surface/80 shadow-xl backdrop-blur-sm"
      >
        <input type="hidden" name="service" value={service} />

        {/* Progress header */}
        <div className="border-b border-border bg-linear-to-r from-rose-50/80 to-amber-50/80 px-5 py-5 sm:px-8 dark:from-rose-500/10 dark:to-amber-500/5">
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="flex items-center gap-2 font-semibold text-rose-700 dark:text-rose-300">
              <Icon className="size-4" aria-hidden="true" />
              {serviceLabel}
            </span>
            <span className="text-muted" aria-live="polite">
              Step {current + 1} of {titles.length}
            </span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/80 dark:bg-white/10" aria-hidden="true">
            <motion.div
              className="h-full rounded-full bg-linear-to-r from-rose-500 to-orange-500"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
          </div>
          <ol className="mt-4 hidden gap-2 sm:flex">
            {titles.map((title, i) => (
              <li key={title} className="flex-1">
                <button
                  type="button"
                  disabled={i > current}
                  onClick={() => goTo(i)}
                  aria-current={i === current ? "step" : undefined}
                  className="flex w-full items-center gap-2 rounded-lg text-left text-xs font-medium text-muted transition-colors enabled:hover:text-rose-600 disabled:cursor-default aria-[current=step]:text-foreground dark:enabled:hover:text-rose-300"
                >
                  <span
                    className={`flex size-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                      i < current
                        ? "bg-rose-500 text-white"
                        : i === current
                          ? "bg-foreground text-background"
                          : "bg-white text-muted ring-1 ring-border dark:bg-white/10"
                    }`}
                  >
                    {i < current ? <Check className="size-3.5" strokeWidth={3} aria-hidden="true" /> : i + 1}
                  </span>
                  <span className="line-clamp-1">{title}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="px-5 py-8 sm:px-8">
          <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-bold tracking-tight outline-none sm:text-3xl">
            {titles[current]}
          </h2>
          <p className="mt-1 text-muted">
            {isReview ? "Take a quick look. You can edit anything before sending." : steps[current].description}
          </p>

          <div className="mt-8">
            {/* Every step stays mounted so nothing typed is lost; only the current one is shown. */}
            {steps.map((step, i) => (
              <fieldset
                key={step.title}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                hidden={i !== current}
                className="min-w-0"
              >
                <legend className="sr-only">{step.title}</legend>
                <motion.div
                  initial={false}
                  animate={i === current ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  {step.content}
                </motion.div>
              </fieldset>
            ))}

            {isReview && <ReviewList summary={summary} onEdit={goTo} />}
          </div>

          {state.status === "error" && (
            <p role="alert" className="mt-6 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">
              {state.message}
            </p>
          )}

          {/* Navigation */}
          <div className="mt-10 flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
            {current > 0 ? (
              <button
                type="button"
                onClick={() => goTo(current - 1)}
                className="flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-semibold text-muted transition-colors hover:bg-background hover:text-foreground"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
                Back
              </button>
            ) : (
              <span />
            )}

            {/* Distinct keys matter: if React reused one <button> and flipped its type
                mid-click, clicking "Review order" would submit the form instantly. */}
            {isReview ? (
              <button
                key="submit"
                type="submit"
                disabled={pending}
                className="flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-rose-500 to-orange-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:translate-y-0 disabled:opacity-70"
              >
                {pending ? (
                  <>
                    <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  <>
                    Place my order
                    <ArrowRight className="size-5" aria-hidden="true" />
                  </>
                )}
              </button>
            ) : (
              <button
                key="next"
                type="button"
                onClick={next}
                className="group flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-rose-500 to-orange-500 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                {current === reviewIndex - 1 ? "Review order" : "Continue"}
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </button>
            )}
          </div>
          {isReview && (
            <p className="mt-4 text-center text-sm text-muted sm:text-right">
              No payment today. We&apos;ll confirm details and pricing by email first.
            </p>
          )}
        </div>
      </form>
    </FieldErrorsContext>
  );
}

function ReviewList({ summary, onEdit }: { summary: SummaryGroup[]; onEdit: (step: number) => void }) {
  return (
    <div className="space-y-4">
      {summary.map((group) => (
        <section key={group.step} className="rounded-2xl border border-border bg-background/60 p-5">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-semibold">{group.title}</h3>
            <button
              type="button"
              onClick={() => onEdit(group.step)}
              className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-medium text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10"
            >
              <Pencil className="size-3.5" aria-hidden="true" />
              Edit
            </button>
          </div>
          {group.rows.length > 0 ? (
            <dl className="mt-3 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-[minmax(0,12rem)_1fr]">
              {group.rows.map((row) => (
                <div key={row.label} className="contents">
                  <dt className="text-muted">{row.label}</dt>
                  <dd className="font-medium wrap-break-word">{row.value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="mt-2 text-sm text-muted">Nothing added.</p>
          )}
        </section>
      ))}
    </div>
  );
}

function SuccessCard({
  reference,
  firstName,
  email,
  serviceLabel,
  nextSteps,
}: {
  reference: string;
  firstName: string;
  email: string;
  serviceLabel: string;
  nextSteps: string[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-3xl border border-border bg-surface/80 p-8 text-center shadow-xl sm:p-12"
    >
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.15 }}
        className="mx-auto flex size-16 items-center justify-center rounded-full bg-linear-to-br from-rose-500 to-orange-500 text-white shadow-lg"
      >
        <CircleCheck className="size-8" aria-hidden="true" />
      </motion.span>
      <h2 className="mt-6 text-3xl font-bold tracking-tight" role="status">
        Thank you{firstName ? `, ${firstName}` : ""}!
      </h2>
      <p className="mx-auto mt-3 max-w-md text-muted">
        Your {serviceLabel.toLowerCase()} order is in. We&apos;ll email a confirmation to{" "}
        <span className="font-medium text-foreground">{email}</span>.
      </p>
      <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-background px-4 py-2 font-mono text-sm">
        Order reference <span className="font-bold text-rose-600 dark:text-rose-400">{reference}</span>
      </p>

      <div className="mx-auto mt-10 max-w-md text-left">
        <h3 className="font-semibold">What happens next</h3>
        <ol className="mt-4 space-y-4">
          {nextSteps.map((stepText, i) => (
            <li key={stepText} className="flex gap-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-rose-100 text-sm font-bold text-rose-700 dark:bg-rose-500/20 dark:text-rose-300">
                {i + 1}
              </span>
              <span className="pt-0.5 text-sm leading-relaxed text-muted">{stepText}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/" className="rounded-2xl border border-border px-6 py-3 font-semibold transition-colors hover:bg-background">
          Back to home
        </Link>
        <a
          href="mailto:hello@memoryframe.com"
          className="flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-rose-500 to-orange-500 px-6 py-3 font-semibold text-white shadow-md"
        >
          <Mail className="size-4" aria-hidden="true" />
          Questions? Email us
        </a>
      </div>
    </motion.div>
  );
}
