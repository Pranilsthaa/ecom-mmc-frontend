"use client";

import {
  Box,
  CalendarDays,
  Clock,
  Flower2,
  Frame,
  Gem,
  Heart,
  Leaf,
  Package,
  Sparkles,
  Store,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { ChoiceGroup, TextAreaField, TextField, Tip } from "./fields";
import OrderWizard from "./order-wizard";

const DAY = 24 * 60 * 60 * 1000;

/** Friendly guidance based on how fresh the flowers are. */
function FreshnessTip({ eventDate }: { eventDate: string }) {
  if (!eventDate) {
    return (
      <Tip icon={Clock}>
        <strong>Timing matters.</strong> Flowers preserve best when they reach us within 3–5 days of your event, so
        order before the big day if you can.
      </Tip>
    );
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Math.round((new Date(`${eventDate}T00:00`).getTime() - today.getTime()) / DAY);

  if (days > 0) {
    return (
      <Tip icon={CalendarDays}>
        Perfect, you&apos;re ahead of time! We&apos;ll ship your free preservation kit so it arrives before your event.
      </Tip>
    );
  }
  if (days >= -5) {
    return (
      <Tip icon={Sparkles}>
        Great timing. Keep the flowers in cool water away from sunlight, and we&apos;ll send shipping instructions right away.
      </Tip>
    );
  }
  return (
    <Tip icon={Clock} tone="warn">
      Flowers older than about 5 days may have started to wilt. We&apos;ll still do our very best. Mention their
      condition in the notes and we&apos;ll be in touch.
    </Tip>
  );
}

function EventDetails() {
  const [eventDate, setEventDate] = useState("");
  return (
    <>
      <ChoiceGroup
        name="occasion"
        legend="What are the flowers from?"
        required
        options={[
          { value: "Wedding bouquet", label: "Wedding", description: "Bridal or bridesmaid bouquets", icon: Heart },
          { value: "Memorial / funeral", label: "Memorial", description: "Honoring someone you love", icon: Leaf },
          { value: "Anniversary / special occasion", label: "Special occasion", description: "Anniversary, prom, graduation…", icon: Gem },
          { value: "Other", label: "Something else", description: "Every bloom has a story", icon: Flower2 },
        ]}
      />
      <div className="space-y-4">
        <TextField
          name="eventDate"
          label="Date of your event"
          type="date"
          required
          value={eventDate}
          onChange={(e) => setEventDate(e.currentTarget.value)}
          className="sm:max-w-xs"
        />
        <FreshnessTip eventDate={eventDate} />
      </div>
      <ChoiceGroup
        name="arrangementSize"
        legend="How big is the arrangement?"
        columns={4}
        defaultValue="Medium"
        options={[
          { value: "Small", label: "Small", description: "Boutonniere, corsage" },
          { value: "Medium", label: "Medium", description: "Bridesmaid bouquet" },
          { value: "Large", label: "Large", description: "Bridal bouquet" },
          { value: "Multiple arrangements", label: "Several", description: "More than one piece" },
        ]}
      />
      <TextAreaField
        name="flowerDescription"
        label="Tell us about your flowers"
        hint="Types and colors help us plan, but don't worry if you're not sure."
        placeholder="Blush peonies, white roses, eucalyptus…"
      />
    </>
  );
}

export default function FlowerForm() {
  return (
    <OrderWizard
      service="flowers"
      serviceLabel="Flower Preservation"
      icon={Flower2}
      nextSteps={[
        "We email you within 1 business day with your quote and flower-care tips.",
        "Your flowers come to us via the method you picked. Shipping kits are free.",
        "We send a design preview, then gently preserve and craft your keepsake (usually 6–10 weeks).",
      ]}
      steps={[
        {
          title: "Your flowers",
          description: "Tell us a little about your blooms and the moment behind them.",
          content: <EventDetails />,
        },
        {
          title: "Choose your keepsake",
          description: "How would you like to remember them?",
          content: (
            <>
              <ChoiceGroup
                name="style"
                legend="Keepsake style"
                required
                options={[
                  { value: "Pressed flower frame", label: "Pressed & framed", description: "Flat, delicate art in a wood frame", icon: Frame, badge: "Popular" },
                  { value: "Resin block", label: "Resin keepsake", description: "Crystal-clear block, perfect for a shelf", icon: Gem },
                  { value: "3D shadow box", label: "Shadow box", description: "Dried blooms kept in full 3D shape", icon: Box },
                  { value: "Glass dome", label: "Glass dome", description: "A preserved mini bouquet under glass", icon: Sparkles },
                ]}
              />
              <ChoiceGroup
                name="extras"
                legend="Add something special"
                type="checkbox"
                hint="Pick as many as you like."
                options={[
                  { value: "Include a photo", label: "Include a photo", description: "We'll set a favorite photo alongside the flowers" },
                  { value: "Include invitation or card", label: "Invitation or card", description: "Preserve a wedding invite, program or note" },
                  { value: "Keep the ribbon / wrap", label: "Ribbon or wrap", description: "Keep the original bouquet wrapping" },
                  { value: "Name & date engraving", label: "Name & date", description: "A small engraved plate" },
                ]}
              />
              <ChoiceGroup
                name="arrival"
                legend="How will your flowers get to us?"
                required
                defaultValue="Ship with free kit"
                options={[
                  { value: "Ship with free kit", label: "Ship them", description: "We send a free, prepaid kit with instructions", icon: Package },
                  { value: "Drop off at studio", label: "Drop off", description: "Bring them to our studio in person", icon: Store },
                  { value: "Local pickup", label: "Local pickup", description: "We collect them (local area only)", icon: Truck },
                ]}
              />
            </>
          ),
        },
      ]}
    />
  );
}
