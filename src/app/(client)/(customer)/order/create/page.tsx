"use client";

import type React from "react";

import { motion } from "motion/react";
import { useMemo, useState, useEffect, useRef } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ImageIcon,
  Flower2,
  Package,
  MapPin,
  User,
  Mail,
  Phone,
  Truck,
  CheckCircle2,
  CalendarDays,
  Clock,
  Info,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { createOrder, type CreateOrderInput } from "./actions";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import InputField from "@/components/ui/inputField";
import Image from "next/image";

const kindSchema = z.enum(["photos", "garlands"]);

const personalSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone"),
});

const addressSchema = z.object({
  street: z.string().min(3, "Street is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  postalCode: z.string().min(4, "Postal code is required"),
});

const itemsSchema = z.object({
  description: z.string().min(3, "Please describe what you’re sending"),
  quantity: z.coerce.number().int().min(1, "Min 1 item"),
  notes: z.string().optional(),
});

const shippingSchema = z.object({
  method: z.enum(["pickup", "courier", "digital"]),
  pickupDate: z.string().optional(),
  pickupSlot: z.string().optional(),
});

const formSchema = z
  .object({
    kind: kindSchema,
    personal: personalSchema,
    address: addressSchema,
    items: itemsSchema,
    photo: z.object({
      file: z
        .instanceof(File)
        .refine((file) => file.name !== "", {
          message: "Image required",
        })
        .refine((file) => file.type.startsWith("image/"), {
          message: "File must be an image",
        })
        .refine((file) => file.size < 5 * 1024 * 1024, {
          message: "File must be smaller than 5MB",
        }),
    }),
    shipping: shippingSchema,
  })
  .refine(
    (val) => {
      // If garlands + pickup, require date and slot.
      if (val.kind === "garlands" && val.shipping.method === "pickup") {
        return Boolean(val.shipping.pickupDate && val.shipping.pickupSlot);
      }
      return true;
    },
    {
      path: ["shipping", "pickupDate"],
      message: "Select a pickup date and time slot",
    }
  );

type FormValues = z.infer<typeof formSchema>;

const pickupCities = ["New York", "Brooklyn", "Jersey City", "Hoboken"];
const pickupPostalPrefixes = ["100", "101", "112", "073"];

function isPickupEligible(city: string, postalCode: string) {
  const eligibleCity = pickupCities.includes((city || "").trim());
  const eligibleZip = pickupPostalPrefixes.some((p) =>
    (postalCode || "").startsWith(p)
  );
  return eligibleCity || eligibleZip;
}

const timeSlots = ["8-10 AM", "10-12 PM", "12-2 PM", "2-4 PM", "4-6 PM"];
function getNext7Dates() {
  const dates: string[] = [];
  const now = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() + i + 1);
    dates.push(d.toISOString().slice(0, 10));
  }
  return dates;
}

export default function CreateOrderPage() {
  const search = useSearchParams();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    orderId: string;
    nextSteps: string;
  } | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const defaultKind = (
    search.get("kind") === "garlands" ? "garlands" : "photos"
  ) as "photos" | "garlands";

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      kind: defaultKind,
      personal: { firstName: "", lastName: "", email: "", phone: "" },
      address: { street: "", city: "", state: "", postalCode: "" },
      items: { description: "", quantity: 1, notes: "" },
      photo: { file: new File([], "") },
      shipping: {
        method: defaultKind === "photos" ? "digital" : "courier",
        pickupDate: "",
        pickupSlot: "",
      },
    },
    mode: "onChange",
  });
  const kind = watch("kind");
  const personal = watch("personal");
  const address = watch("address");
  const items = watch("items");
  const photo = watch("photo.file");
  const shipping = watch("shipping");

  // Auto-adjust shipping method when kind changes
  useEffect(() => {
    setValue("shipping.method", kind === "photos" ? "digital" : "courier", {
      shouldValidate: true,
    });
  }, [kind, setValue]);

  const dates = useMemo(() => getNext7Dates(), []);
  const stepTitles = [
    "What are you framing?",
    "Your details & address",
    kind === "garlands" ? "Pickup or courier" : "Collection",
    "Review & submit",
  ];

  // Navigation
  const onNext = async () => {
    if (step === 0) {
      const ok = await trigger("kind");
      if (!ok) return;
      setStep(1);
    } else if (step === 1) {
      if (kind === "photos") {
        const ok = await trigger(["personal", "address", "photo"]);
        if (!ok) return;
        setStep(3);
      } else {
        const ok = await trigger(["personal", "address", "items"]);
        if (!ok) return;
        // If photos, skip collection step
        setStep(2);
      }
    } else if (step === 2) {
      const ok = await trigger("shipping");
      if (!ok) return;
      setStep(3);
    }
  };
  const onPrev = () => {
    if (step === 3 && kind === "photos") setStep(1);
    else setStep((s) => Math.max(0, s - 1));
  };

  // Auto-detect collection based on address for garlands
  const onAutoDetect = () => {
    const eligible = isPickupEligible(address.city, address.postalCode);
    if (kind === "garlands") {
      setValue("shipping.method", eligible ? "pickup" : "courier", {
        shouldValidate: true,
      });
    }
  };

  const onPlaceOrder = async () => {
    const ok = await trigger();
    if (!ok) return;
    setSubmitting(true);
    try {
      const payload: CreateOrderInput = {
        kind,
        personal,
        address,
        items: {
          description: items.description,
          quantity: Number(items.quantity),
          notes: items.notes,
        },
        shipping,
      };
      const res = await createOrder(payload);
      setResult(res);
    } finally {
      setSubmitting(false);
    }
  };

  // Eligibility computed for UI hints
  const eligible = isPickupEligible(address.city, address.postalCode);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-24">
      <header className="mb-8">
        <nav className="flex items-center gap-2 text-sm">
          <Link href="/" className="text-[var(--color-primary)] underline">
            Home
          </Link>
          <span className="text-[var(--color-secondary)]">/</span>
          <span className="text-[var(--color-secondary)]">Create Order</span>
        </nav>
        <h1 className="text-3xl lg:text-4xl font-extrabold mt-2">
          Create your order
        </h1>
        <p className="text-[var(--color-secondary)]">
          Clear steps. No payment yet. We’ll help you choose pickup or courier
          for garlands.
        </p>
      </header>

      {/* Stepper */}
      <div
        className="z-40 bg-[var(--color-background)] py-4 mb-6 border-b border-[var(--color-border)]"
        aria-live="polite"
      >
        <div className="flex items-center gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                className={`relative overflow-hidden w-9 h-9 rounded-full bg-[var(--color-muted)] grid place-items-center text-sm font-bold transition-colors ease-linear delay-100
                ${
                  step >= i ? " text-white" : " text-[var(--color-secondary)]"
                }`}
              >
                <span className="z-10"> {i + 1}</span>
                <motion.div
                  className="absolute bg-[var(--color-primary)] transition-transform duration-400 delay-[240ms] w-24 h-24 -left-14 rounded-full border"
                  style={{
                    scaleX: step >= i ? 1 : 0,
                  }}
                />
              </div>
              {i < 3 && (
                <div
                  className={`h-1 w-12 rounded 
                     bg-[var(--color-border)]`}
                >
                  <div
                    className={`h-full bg-[var(--color-primary)] rounded transition-transform duration-400 origin-left ${
                      step > i ? "scale-x-100" : "scale-0"
                    }`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-2 text-sm text-[var(--color-secondary)]">
          {stepTitles[step]}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 card p-6">
          {/* Step 0: Kind */}
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="font-bold text-lg">What are you framing?</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <RadioCard
                  active={kind === "photos"}
                  onClick={() =>
                    setValue("kind", "photos", { shouldValidate: true })
                  }
                  icon={<ImageIcon className="w-5 h-5" />}
                  title="Photos / Prints"
                  desc="Digital upload after placing the order. No pickup needed."
                />
                <RadioCard
                  active={kind === "garlands"}
                  onClick={() =>
                    setValue("kind", "garlands", { shouldValidate: true })
                  }
                  icon={<Flower2 className="w-5 h-5" />}
                  title="Garlands / Flowers"
                  desc="We’ll collect if nearby. If you’re far, courier to our studio."
                />
              </div>

              <InfoNote>
                Choose “Garlands / Flowers” for wedding varmala, bouquets, or
                any preserved florals.
              </InfoNote>
            </div>
          )}

          {/* Step 1: Details & address */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="font-bold text-lg">Your details & address</h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field
                  label="First name"
                  error={errors.personal?.firstName?.message}
                >
                  <InputField
                    {...register("personal.firstName")}
                    placeholder="Sarah "
                    Icon={User}
                  />
                </Field>
                <Field
                  label="Last name"
                  error={errors.personal?.lastName?.message}
                >
                  <InputField
                    {...register("personal.lastName")}
                    placeholder="Lee"
                    Icon={User}
                  />
                </Field>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Email" error={errors.personal?.email?.message}>
                  <InputField
                    type="email"
                    Icon={Mail}
                    {...register("personal.email")}
                    placeholder="you@example.com"
                  />
                </Field>
                <Field label="Phone" error={errors.personal?.phone?.message}>
                  <InputField
                    {...register("personal.phone")}
                    Icon={Phone}
                    placeholder="Phone"
                  />
                </Field>
              </div>

              {kind === "garlands" && (
                <div className="space-y-4">
                  <Field
                    label="What are you sending?"
                    error={errors.items?.description?.message}
                  >
                    <InputField
                      {...register("items.description")}
                      placeholder={
                        kind === "garlands"
                          ? "Wedding garland, bouquet, loose florals…"
                          : "Number of photos, sizes, prints…"
                      }
                      Icon={Package}
                    />
                  </Field>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <Field
                      label="Quantity"
                      error={errors.items?.quantity?.message}
                    >
                      <InputField
                        type="number"
                        min={1}
                        {...register("items.quantity", { valueAsNumber: true })}
                      />
                    </Field>
                    <Field label="Notes (optional)">
                      <InputField
                        {...register("items.notes")}
                        placeholder="Any special instructions?"
                      />
                    </Field>
                  </div>
                </div>
              )}
              {kind === "photos" && (
                <Field label="Images" error={errors.photo?.file?.message}>
                  <div
                    role="region"
                    tabIndex={0}
                    aria-label="File upload drop zone"
                    className={`relative min-h-[120px] flex items-center justify-center border border-dashed rounded-lg cursor-pointer ${
                      isDragOver
                        ? "border-gray-600/40 bg-[var(--color-muted)]/20"
                        : "border-gray-600"
                    } transition-colors duration-200`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        fileInputRef.current?.click();
                      }
                    }}
                    onDragEnter={(e) => {
                      e.preventDefault();
                      setIsDragOver(true);
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      setIsDragOver(false);
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragOver(false);
                      if (
                        e.dataTransfer.files &&
                        e.dataTransfer.files.length > 0
                      ) {
                        const file = e.dataTransfer.files[0];
                        if (file && file.type.startsWith("image/")) {
                          setValue("photo.file", file, {
                            shouldValidate: true,
                          });
                          e.dataTransfer.clearData();
                        }
                      }
                    }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file && file?.type.startsWith("image/")) {
                          setValue("photo.file", file, {
                            shouldValidate: true,
                          });
                        }
                      }}
                    />
                    {photo.name ? (
                      <div className="relative">
                        <button
                          type="button"
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center z-10 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            setValue("photo.file", new File([], ""));
                          }}
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <Image
                          src={URL.createObjectURL(photo)}
                          alt="Uploaded photo"
                          width={100}
                          height={100}
                          className="rounded-lg"
                        />
                      </div>
                    ) : (
                      <div className="text-center p-6">
                        <ImageIcon className="w-8 h-8 mx-auto text-[var(--color-secondary)] mb-2" />
                        <p className="text-sm text-[var(--color-secondary)]">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-[var(--color-secondary)] mt-1">
                          PNG, JPG up to 5MB
                        </p>
                      </div>
                    )}
                  </div>
                </Field>
              )}

              <div className="space-y-4">
                <h3 className="font-semibold">Your address</h3>
                <Field label="Street" error={errors.address?.street?.message}>
                  <InputField
                    {...register("address.street")}
                    placeholder="123 7th Ave"
                    Icon={MapPin}
                  />
                </Field>
                <div className="grid sm:grid-cols-3 gap-4">
                  <Field label="City" error={errors.address?.city?.message}>
                    <InputField
                      {...register("address.city")}
                      placeholder="New York"
                    />
                  </Field>
                  <Field label="State" error={errors.address?.state?.message}>
                    <InputField
                      {...register("address.state")}
                      placeholder="NY"
                    />
                  </Field>
                  <Field
                    label="Postal code"
                    error={errors.address?.postalCode?.message}
                  >
                    <InputField
                      {...register("address.postalCode")}
                      placeholder="10001"
                    />
                  </Field>
                </div>

                {kind === "garlands" && (
                  <InfoNote>
                    We’ll check if your address is within our pickup area in the
                    next step.
                  </InfoNote>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Pickup or courier (Garlands only) */}
          {step === 2 && kind === "garlands" && (
            <div className="space-y-6">
              <h2 className="font-bold text-lg">Pickup or courier</h2>

              <div className="rounded-xl border border-[var(--color-border)] p-4 bg-[var(--color-muted)]/60">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 mt-0.5 text-[var(--color-secondary)]" />
                  <div className="text-sm">
                    <p className="font-medium">Garlands/Flowers</p>
                    <p className="text-[var(--color-secondary)]">
                      If your address is near, we collect from you. If it’s far,
                      please courier the items to our studio.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onAutoDetect}
                  className="btn btn-ghost px-4 py-2"
                >
                  Check my address
                </button>
                <div className={`tag ${eligible ? "" : ""}`}>
                  {eligible
                    ? "Pickup available at your address"
                    : "Outside pickup area • Courier required"}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <RadioCard
                  active={shipping.method === "pickup"}
                  disabled={!eligible}
                  onClick={() =>
                    eligible &&
                    setValue("shipping.method", "pickup", {
                      shouldValidate: true,
                    })
                  }
                  icon={<Truck className="w-5 h-5" />}
                  title="Pickup from your address"
                  desc={
                    eligible
                      ? "We’ll collect your garland/flowers at a selected time."
                      : "Unavailable for your address"
                  }
                />
                <RadioCard
                  active={shipping.method === "courier"}
                  onClick={() =>
                    setValue("shipping.method", "courier", {
                      shouldValidate: true,
                    })
                  }
                  icon={<Truck className="w-5 h-5" />}
                  title="Ship by courier"
                  desc="Send your garland/flowers safely to our studio with tracking."
                />
              </div>

              {shipping.method === "pickup" && (
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <CalendarDays className="w-4 h-4" /> Select date
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {dates.map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() =>
                          setValue("shipping.pickupDate", d, {
                            shouldValidate: true,
                          })
                        }
                        className={`px-3 py-2 rounded-lg border text-sm ${
                          shipping.pickupDate === d
                            ? "border-[var(--color-primary)] text-[var(--color-primary)]"
                            : "border-[var(--color-border)]"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>

                  <h3 className="font-semibold flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Time slot
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {timeSlots.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() =>
                          setValue("shipping.pickupSlot", s, {
                            shouldValidate: true,
                          })
                        }
                        className={`px-3 py-2 rounded-lg border text-sm ${
                          shipping.pickupSlot === s
                            ? "border-[var(--color-primary)] text-[var(--color-primary)]"
                            : "border-[var(--color-border)]"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  {errors.shipping?.pickupDate?.message && (
                    <p className="text-sm text-red-600">
                      {errors.shipping.pickupDate.message}
                    </p>
                  )}
                </div>
              )}

              {shipping.method === "courier" && <CourierBlock />}
            </div>
          )}

          {/* Step 2 placeholder when Photos */}
          {step === 2 && kind === "photos" && (
            <div className="space-y-4">
              <h2 className="font-bold text-lg">Collection</h2>
              <InfoNote>
                No pickup needed for photos/prints. You’ll receive an email link
                to upload your images digitally.
              </InfoNote>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="font-bold text-lg">Review</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <SummaryCard title="What you’re framing">
                  <p className="capitalize">{kind}</p>
                  {kind === "photos" ? (
                    <p className="text-[var(--color-secondary)]">
                      Digital upload after placing the order
                    </p>
                  ) : (
                    <p className="text-[var(--color-secondary)]">
                      We’ll guide you step‑by‑step
                    </p>
                  )}
                </SummaryCard>
                <SummaryCard title="Personal">
                  <p>
                    {personal.firstName} {personal.lastName}
                  </p>
                  <p className="text-[var(--color-secondary)]">
                    {personal.email} • {personal.phone}
                  </p>
                </SummaryCard>
                <SummaryCard title="Address">
                  <p>{address.street}</p>
                  <p>
                    {address.city}, {address.state} {address.postalCode}
                  </p>
                </SummaryCard>
                <SummaryCard title="Items">
                  <p>{items.description}</p>
                  <p className="text-[var(--color-secondary)]">
                    Qty: {items.quantity}
                    {items.notes ? ` • ${items.notes}` : ""}
                  </p>
                </SummaryCard>
                {kind === "garlands" ? (
                  <SummaryCard title="Collection method">
                    <p className="capitalize">{shipping.method}</p>
                    {shipping.method === "pickup" ? (
                      <p className="text-[var(--color-secondary)]">
                        {shipping.pickupDate} • {shipping.pickupSlot}
                      </p>
                    ) : (
                      <p className="text-[var(--color-secondary)]">
                        Ship with any tracked courier
                      </p>
                    )}
                  </SummaryCard>
                ) : (
                  <SummaryCard title="Collection method">
                    <p className="capitalize">Digital upload</p>
                  </SummaryCard>
                )}
              </div>
            </div>
          )}
        </section>

        <aside className="card p-6 h-fit">
          <h3 className="font-bold mb-3">Summary</h3>
          <ul className="space-y-2 text-sm text-[var(--color-secondary)] mb-4">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)]" />{" "}
              Free design consult
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)]" />{" "}
              Protected packaging
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)]" />{" "}
              Lifetime promise
            </li>
          </ul>

          {!result ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--color-secondary)]">Step</span>
                <span className="font-semibold">{step + 1} / 4</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={onPrev}
                  disabled={step === 0}
                  className="btn btn-ghost px-4 py-2 w-32 disabled:opacity-50 flex items-center gap-x-2"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                {step === 3 ? (
                  <button
                    onClick={onPlaceOrder}
                    disabled={submitting}
                    className="flex-1 py-2 border border-[var(--color-border)] rounded-lg flex items-center justify-center gap-x-2"
                  >
                    {submitting ? "Submitting…" : "Place order"}
                  </button>
                ) : (
                  <button
                    onClick={onNext}
                    className=" flex-1 py-2 border border-[var(--color-border)] rounded-lg flex items-center justify-center gap-x-2"
                  >
                    Next <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                )}
              </div>
              <p className="text-xs text-[var(--color-secondary)]">
                No payment due yet.
              </p>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-[var(--color-accent)] text-white grid place-items-center mx-auto soft-shadow">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-bold mt-3">Order placed</h4>
              <p className="text-sm text-[var(--color-secondary)]">
                ID: <span className="font-mono">{result.orderId}</span>
              </p>
              <p className="text-sm text-[var(--color-secondary)] mt-2">
                {result.nextSteps}
              </p>
              <div className="mt-4 flex gap-2 justify-center">
                <Link href="/" className="btn btn-ghost px-4 py-2">
                  Go home
                </Link>
                <Link href="/order" className="btn btn-primary px-4 py-2">
                  Start another
                </Link>
              </div>
            </div>
          )}

          {/* Helpful tips for clarity */}
          <div className="mt-6 rounded-xl border border-[var(--color-border)] p-4 bg-[var(--color-muted)]/60 text-sm">
            <div className="font-semibold mb-1">Tips for garlands/flowers</div>
            <ul className="list-disc ml-5 space-y-1 text-[var(--color-secondary)]">
              <li>Keep dry; avoid moisture before pickup/courier.</li>
              <li>Use padding to prevent crushing in transit.</li>
              <li>We’ll confirm layout before crafting.</li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="text-sm font-medium">{label}</div>
      <div className="mt-1">{children}</div>
      {error && <div className="text-sm text-red-600 mt-1">{error}</div>}
    </label>
  );
}

function WithIcon({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-secondary)]">
        {icon}
      </div>
      <div className="pl-7">{children}</div>
    </div>
  );
}

function RadioCard({
  active,
  disabled,
  onClick,
  icon,
  title,
  desc,
}: {
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`text-left p-4 rounded-xl border transition w-full
        ${
          disabled
            ? "opacity-50 cursor-not-allowed border-[var(--color-border)]"
            : active
            ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5"
            : "border-[var(--color-border)] hover:border-[var(--color-primary)]/50"
        }`}
      aria-pressed={active}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-9 h-9 rounded-lg grid place-items-center ${
            active
              ? "bg-[var(--color-primary)] text-white"
              : "bg-[var(--color-muted)] text-[var(--color-primary)]"
          }`}
        >
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="font-semibold">{title}</div>
            <div
              className={`w-5 h-5 rounded-full border grid place-items-center ${
                active
                  ? "bg-[var(--color-primary)] border-[var(--color-primary)]"
                  : "border-[var(--color-border)]"
              }`}
            >
              {active && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
            </div>
          </div>
          <div className="text-sm text-[var(--color-secondary)] mt-1">
            {desc}
          </div>
        </div>
      </div>
    </button>
  );
}

function InfoNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] p-4 bg-[var(--color-muted)]/60 text-sm flex gap-2">
      <Info className="w-4 h-4 text-[var(--color-secondary)] mt-0.5" />
      <div>{children}</div>
    </div>
  );
}

function SummaryCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] p-4">
      <div className="text-sm font-semibold mb-1">{title}</div>
      <div className="text-sm">{children}</div>
    </div>
  );
}

function CourierBlock() {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Courier instructions</h3>
      <ol className="list-decimal ml-5 space-y-2 text-[var(--color-secondary)]">
        <li>
          Keep garland/flowers dry and cushioned. Use padding around delicate
          sections.
        </li>
        <li>Ship to our studio address below with tracked delivery.</li>
        <li>Reply to your confirmation email with the tracking number.</li>
      </ol>
      <div className="rounded-xl border border-[var(--color-border)] p-4 bg-[var(--color-muted)]/60">
        <div className="font-semibold">Ship To</div>
        <div className="mt-1">MemoryFrame Studio</div>
        <div>45 Crosby St, Suite 3</div>
        <div>New York, NY 10012</div>
        <div>+1 (646) 555-0111</div>
        <div className="mt-3">
          <button
            type="button"
            onClick={() => {
              const text = `MemoryFrame Studio\n45 Crosby St, Suite 3\nNew York, NY 10012\n+1 (646) 555-0111`;
              navigator.clipboard.writeText(text).catch(() => {});
            }}
            className="btn btn-ghost px-3 py-2"
          >
            Copy address
          </button>
        </div>
      </div>
    </div>
  );
}
