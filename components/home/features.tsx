"use client";

import { Clock, Heart, Leaf, Users, type LucideIcon } from "lucide-react";
import {
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  color: "rose" | "amber" | "orange";
  highlight: string;
};

const features: Feature[] = [
  {
    icon: Heart,
    title: "Family-Owned & Personal",
    description:
      "Sarah & Mike personally oversee every order. We're not a factory - we're a family business that cares about your memories as much as you do.",
    color: "rose",
    highlight: "Personal touch guaranteed",
  },
  {
    icon: Leaf,
    title: "Sustainable Raisin Wood",
    description:
      "Our signature raisin wood comes from responsibly managed forests. Each piece has unique grain patterns that make your frame one-of-a-kind.",
    color: "amber",
    highlight: "Eco-friendly choice",
  },
  {
    icon: Users,
    title: "Free Design Consultation",
    description:
      "Stuck on layout or sizing? Our team offers complimentary 15-minute calls to help you create the perfect arrangement for your space.",
    color: "orange",
    highlight: "Real humans, not bots",
  },
  {
    icon: Clock,
    title: "Rush Orders Available",
    description:
      "Need it fast? We offer 5-day rush service for those last-minute gifts or special occasions. Just give us a call and we'll make it happen.",
    color: "amber",
    highlight: "We've got your back",
  },
];

const COUNT = features.length;
/** Card width; the track's side padding is derived from it so the first and last cards can sit dead-center. */
const CARD_WIDTH = "min(80vw, 420px)";
const SIDE_PADDING = `calc(50% - ${CARD_WIDTH} / 2)`;

const iconColors = {
  rose: {
    idle: "bg-rose-100 text-rose-600 group-hover:bg-rose-500 group-hover:text-white dark:bg-rose-500/15 dark:text-rose-300",
    active: "bg-rose-500 text-white",
  },
  amber: {
    idle: "bg-amber-100 text-amber-600 group-hover:bg-amber-500 group-hover:text-white dark:bg-amber-500/15 dark:text-amber-300",
    active: "bg-amber-500 text-white",
  },
  orange: {
    idle: "bg-orange-100 text-orange-600 group-hover:bg-orange-500 group-hover:text-white dark:bg-orange-500/15 dark:text-orange-300",
    active: "bg-orange-500 text-white",
  },
};

function CardBody({ feature, active }: { feature: Feature; active: boolean }) {
  const Icon = feature.icon;
  return (
    <>
      <div
        className={`absolute top-5 right-5 bg-gradient-to-r from-rose-500 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-medium transition-all duration-500 ${
          active ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
        }`}
      >
        {feature.highlight}
      </div>

      <div className="space-y-6">
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors duration-500 ${
            active
              ? iconColors[feature.color].active
              : iconColors[feature.color].idle
          }`}
        >
          <Icon className="w-8 h-8" aria-hidden="true" />
        </div>

        <div className="space-y-4">
          <h3
            className={`text-2xl font-bold transition-colors duration-500 ${
              active
                ? "text-rose-600 dark:text-rose-400"
                : "text-gray-800 dark:text-gray-100"
            }`}
          >
            {feature.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {feature.description}
          </p>
        </div>
      </div>

      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br from-rose-500/5 to-orange-500/10 rounded-3xl transition-opacity duration-500 ${
          active ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}

const cardClass = (active: boolean) =>
  `group relative shrink-0 overflow-hidden rounded-3xl p-8 bg-white/70 dark:bg-surface/70 backdrop-blur-sm transition-shadow duration-500 ${
    active ? "shadow-2xl" : "shadow-lg"
  }`;

/** A card whose scale/opacity peak when it's at the center of the track. */
function ScrollCard({
  feature,
  index,
  progress,
  active,
}: {
  feature: Feature;
  index: number;
  progress: MotionValue<number>;
  active: boolean;
}) {
  const step = 1 / (COUNT - 1);
  const center = index * step;
  const range = [center - step, center, center + step];
  const scale = useTransform(progress, range, [0.88, 1.2, 0.88]);
  const opacity = useTransform(progress, range, [0.45, 1, 0.45]);

  return (
    <motion.li
      style={{ scale, opacity, width: CARD_WIDTH }}
      className={cardClass(active)}
    >
      <CardBody feature={feature} active={active} />
    </motion.li>
  );
}

export default function Features() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);

  // Decorative parallax across the whole section.
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(sectionProgress, [0, 1], ["0px", "50px"]);
  const y2 = useTransform(sectionProgress, [0, 1], ["0px", "-30px"]);

  // 0 → 1 while the stage is pinned.
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.0005,
  });

  // How far the track has to travel so the last card ends up centered.
  const distance = useMotionValue(0);
  const x = useTransform(() => -progress.get() * distance.get());

  useEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;
    const measure = () =>
      distance.set(Math.max(0, track.offsetWidth - viewport.clientWidth));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [distance, reducedMotion]);

  useMotionValueEvent(progress, "change", (v) => {
    const next = Math.min(COUNT - 1, Math.max(0, Math.round(v * (COUNT - 1))));
    setActive((prev) => (prev === next ? prev : next));
  });

  const scrollToCard = (index: number) => {
    const stage = stageRef.current;
    if (!stage) return;
    const stageTop = stage.getBoundingClientRect().top + window.scrollY;
    const pinnedLength = stage.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: stageTop + (index / (COUNT - 1)) * pinnedLength,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="features"
      className="pt-20 lg:pt-32 pb-20 lg:pb-32 relative overflow-clip"
    >
      {/* Parallax Background Elements */}
      <motion.div
        style={reducedMotion ? undefined : { y: y1 }}
        className="absolute top-20 left-10 w-32 h-32 border border-rose-200 rounded-full opacity-20"
      />
      <motion.div
        style={reducedMotion ? undefined : { y: y2 }}
        className="absolute bottom-20 right-10 w-24 h-24 border border-amber-200 rounded-lg rotate-12 opacity-20"
      />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6"
        >
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-800 dark:text-gray-100 leading-tight">
            Why Families Choose{" "}
            <span className="bg-gradient-to-r from-rose-600 dark:from-rose-400 to-orange-600 dark:to-orange-400 bg-clip-text text-transparent">
              MemoryFrame
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We&apos;re not just another frame company. We&apos;re craftspeople
            who understand that your photos deserve more than mass-produced
            frames.
          </p>
          <div className="flex justify-center items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Currently crafting 47 orders</span>
            </div>
            <span>•</span>
            <span>Est. delivery: 7-10 days</span>
          </div>
        </motion.div>
      </div>

      {reducedMotion ? (
        // Reduced motion: a plain swipeable row, no pinning or scroll-driven transforms.
        <div ref={stageRef} className="mt-16">
          <ul
            aria-label="Why families choose MemoryFrame"
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory py-6"
            style={{
              paddingInline: SIDE_PADDING,
              scrollPaddingInline: SIDE_PADDING,
            }}
          >
            {features.map((feature) => (
              <li
                key={feature.title}
                style={{ width: CARD_WIDTH }}
                className={`snap-center ${cardClass(false)}`}
              >
                <CardBody feature={feature} active={false} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        // Tall runway: the sticky stage stays pinned while vertical scroll drives the track sideways.
        <div
          ref={stageRef}
          className="relative"
          style={{ height: `${COUNT * 70}vh` }}
        >
          <div
            ref={viewportRef}
            className="sticky top-0 h-svh overflow-hidden flex flex-col justify-center gap-10 pt-20"
          >
            <motion.ul
              ref={trackRef}
              aria-label="Why families choose MemoryFrame"
              style={{ x, paddingInline: SIDE_PADDING }}
              className="flex w-max gap-6 lg:gap-8 py-6"
            >
              {features.map((feature, index) => (
                <ScrollCard
                  key={feature.title}
                  feature={feature}
                  index={index}
                  progress={progress}
                  active={index === active}
                />
              ))}
            </motion.ul>

            {/* Progress */}
            <div className="flex items-center justify-center gap-4">
              <span className="text-sm tabular-nums text-gray-500 dark:text-gray-400 w-14 text-right">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(COUNT).padStart(2, "0")}
              </span>
              <div className="flex items-center gap-2">
                {features.map((feature, index) => (
                  <button
                    key={feature.title}
                    type="button"
                    onClick={() => scrollToCard(index)}
                    aria-label={`Show ${feature.title}`}
                    aria-current={index === active ? "true" : undefined}
                    className="group/dot p-1 -m-1"
                  >
                    <span
                      className={`block h-2 rounded-full transition-all duration-500 ${
                        index === active
                          ? "w-8 bg-gradient-to-r from-rose-500 to-orange-500"
                          : "w-2 bg-gray-300 dark:bg-gray-600 group-hover/dot:bg-gray-400"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span className="w-14" aria-hidden="true" />
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16 space-y-4"
        >
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Ready to see the MemoryFrame difference?
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Start Your Custom Order
          </motion.a>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No commitment • Free consultation • 30-day guarantee
          </p>
        </motion.div>
      </div>
    </section>
  );
}
