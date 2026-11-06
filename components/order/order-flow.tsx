"use client";

import { motion } from "motion/react";
import { ArrowRight, Check, Flower2, Frame, type LucideIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Service } from "@/app/order/actions";
import FlowerForm from "./flower-form";
import FrameForm from "./frame-form";

type ServiceOption = {
  id: Service;
  title: string;
  tagline: string;
  icon: LucideIcon;
  points: string[];
  accent: string;
  /** Spotlight color that follows the cursor. */
  spot: string;
};

const SERVICES: ServiceOption[] = [
  {
    id: "frame",
    title: "Photo Frame",
    tagline: "Turn a favorite photo into a handcrafted wood keepsake.",
    icon: Frame,
    points: ["Upload photos in seconds", "4 sizes · 4 wood finishes", "Ships in 7–10 days"],
    accent: "from-rose-500 to-orange-500",
    spot: "#f43f5e",
  },
  {
    id: "flowers",
    title: "Flower Preservation",
    tagline: "Keep your wedding, memorial or special-day flowers forever.",
    icon: Flower2,
    points: ["Free shipping kit for your blooms", "Pressed, resin, shadow box & more", "Lovingly crafted by hand"],
    accent: "from-amber-500 to-rose-500",
    spot: "#f59e0b",
  },
];

const spotlightFill: React.CSSProperties = {
  background:
    "radial-gradient(380px circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in srgb, var(--spot-color) 14%, transparent), transparent 70%)",
};

// Same gradient, masked so only a 2px ring along the card edge shows.
const spotlightEdge: React.CSSProperties = {
  background:
    "radial-gradient(260px circle at var(--spot-x, 50%) var(--spot-y, 50%), var(--spot-color), transparent 70%)",
  mask: "linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)",
  WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
  WebkitMaskComposite: "xor",
};

/**
 * Writes the pointer position into CSS variables on the hovered element.
 * No React state: at most one style write per animation frame, and the
 * gradients repaint only inside the card.
 */
function useSpotlight() {
  const frame = useRef(0);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  return (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    const el = event.currentTarget;
    const { clientX, clientY } = event;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      // Overlays sit inside the 2px border, so measure from the padding box.
      el.style.setProperty("--spot-x", `${clientX - rect.left - el.clientLeft}px`);
      el.style.setProperty("--spot-y", `${clientY - rect.top - el.clientTop}px`);
    });
  };
}

function isService(value: string | null): value is Service {
  return value === "frame" || value === "flowers";
}

export default function OrderFlow() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const typeParam = searchParams.get("type");
  const selected = isService(typeParam) ? typeParam : null;

  // Keep a form mounted once it's been opened, so switching back and forth never loses what was typed.
  const trackSpotlight = useSpotlight();
  const [opened, setOpened] = useState<Service[]>(selected ? [selected] : []);
  if (selected && !opened.includes(selected)) setOpened([...opened, selected]);

  function choose(service: Service) {
    router.replace(`${pathname}?type=${service}`, { scroll: false });
    requestAnimationFrame(() =>
      document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  }

  return (
    <div className="space-y-12">
      <div role="group" aria-label="What would you like to order?" className="grid gap-5 md:grid-cols-2">
        {SERVICES.map((service, i) => {
          const Icon = service.icon;
          const active = selected === service.id;
          return (
            <motion.button
              key={service.id}
              type="button"
              aria-pressed={active}
              onClick={() => choose(service.id)}
              onPointerMove={trackSpotlight}
              style={{ "--spot-color": service.spot } as React.CSSProperties}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              className={`group relative overflow-hidden rounded-3xl border-2 p-6 text-left shadow-lg transition-colors sm:p-8 ${
                active
                  ? "border-rose-500 bg-surface ring-4 ring-rose-500/15"
                  : selected
                    ? "border-border bg-surface/60 opacity-80 hover:opacity-100"
                    : "border-border bg-surface hover:border-rose-300"
              }`}
            >
              <div
                aria-hidden="true"
                className={`absolute -right-16 -top-16 size-48 rounded-full bg-linear-to-br ${service.accent} opacity-10 blur-2xl transition-opacity group-hover:opacity-20`}
              />
              {/* Cursor spotlight: a soft glow plus a lit-up edge. Only shown on hover-capable devices. */}
              <div
                aria-hidden="true"
                style={spotlightFill}
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <div
                aria-hidden="true"
                style={spotlightEdge}
                className="pointer-events-none absolute inset-0 rounded-[22px] p-0.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <div className="relative flex items-start justify-between gap-4">
                <span className={`flex size-14 items-center justify-center rounded-2xl bg-linear-to-br ${service.accent} text-white shadow-md`}>
                  <Icon className="size-7" aria-hidden="true" />
                </span>
                <span
                  aria-hidden="true"
                  className={`flex size-7 items-center justify-center rounded-full border-2 transition-colors ${
                    active ? "border-rose-500 bg-rose-500 text-white" : "border-border"
                  }`}
                >
                  {active && <Check className="size-4" strokeWidth={3} />}
                </span>
              </div>
              <h2 className="relative mt-6 text-2xl font-bold tracking-tight">{service.title}</h2>
              <p className="relative mt-2 text-muted">{service.tagline}</p>
              <ul className="relative mt-5 space-y-2 text-sm">
                {service.points.map((point) => (
                  <li key={point} className="flex items-center gap-2">
                    <Check className="size-4 shrink-0 text-rose-500" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
              <span className="relative mt-6 inline-flex items-center gap-1.5 font-semibold text-rose-600 dark:text-rose-400">
                {active ? "Selected" : selected ? "Switch to this" : "Start here"}
                {!active && <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />}
              </span>
            </motion.button>
          );
        })}
      </div>

      <div id="order-form" className="scroll-mt-28">
        {!selected && (
          <p className="text-center text-muted">
            Pick an option above to get started. It only takes about 3 minutes.
          </p>
        )}
        {opened.includes("frame") && (
          <div hidden={selected !== "frame"}>
            <FrameForm />
          </div>
        )}
        {opened.includes("flowers") && (
          <div hidden={selected !== "flowers"}>
            <FlowerForm />
          </div>
        )}
      </div>
    </div>
  );
}
