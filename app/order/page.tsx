import OrderFlow from "@/components/order/order-flow";
import { Clock, Heart, ShieldCheck, Truck } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Start Your Order | MemoryFrame",
  description:
    "Order a handcrafted photo frame or preserve your wedding, memorial or special-occasion flowers. It only takes a few minutes.",
  alternates: { canonical: "/order" },
};

const reassurances = [
  { icon: ShieldCheck, label: "No payment today" },
  { icon: Clock, label: "Reply within 1 business day" },
  { icon: Truck, label: "Free shipping nationwide" },
];

function PickerSkeleton() {
  return (
    <div className="grid gap-5 md:grid-cols-2" aria-hidden="true">
      {[0, 1].map((i) => (
        <div key={i} className="h-80 animate-pulse rounded-3xl border-2 border-border bg-surface" />
      ))}
    </div>
  );
}

export default function OrderPage() {
  return (
    <main id="main-content" tabIndex={-1} className="relative overflow-hidden outline-none">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] bg-linear-to-b from-rose-100/60 via-amber-50/40 to-transparent dark:from-rose-500/10 dark:via-amber-500/5" />

      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:py-20">
        <header className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-rose-200/60 bg-white/70 px-4 py-2 text-sm font-medium text-rose-700 shadow-sm backdrop-blur-sm dark:border-rose-500/20 dark:bg-surface/70 dark:text-rose-300">
            <Heart className="size-4" aria-hidden="true" />
            Let&apos;s preserve something special
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            What would you like to{" "}
            <span className="bg-linear-to-r from-rose-600 via-orange-500 to-amber-500 bg-clip-text text-transparent dark:from-rose-400">
              keep forever?
            </span>
          </h1>
          <p className="mt-4 text-lg text-muted">
            Choose an option and we&apos;ll guide you through a few quick questions. You can change anything before you send it.
          </p>
          <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted">
            {reassurances.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon className="size-4 text-rose-500" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </header>

        <div className="mt-12">
          <Suspense fallback={<PickerSkeleton />}>
            <OrderFlow />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
