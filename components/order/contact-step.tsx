"use client";

import { Mail, MessageSquare, Phone, ShieldCheck } from "lucide-react";
import { ChoiceGroup, TextAreaField, TextField, Tip } from "./fields";

export default function ContactStep() {
  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField name="fullName" label="Full name" autoComplete="name" placeholder="Jane Doe" required />
        <TextField name="email" label="Email" type="email" autoComplete="email" inputMode="email" placeholder="jane@example.com" required />
        <TextField
          name="phone"
          label="Phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="(555) 123-4567"
          hint="Only used if we have a question about your order."
        />
      </div>

      <ChoiceGroup
        name="contactPreference"
        legend="Best way to reach you"
        columns={3}
        defaultValue="Email"
        options={[
          { value: "Email", label: "Email", icon: Mail },
          { value: "Phone call", label: "Phone call", icon: Phone },
          { value: "Text message", label: "Text", icon: MessageSquare },
        ]}
      />

      <div className="space-y-5">
        <h3 className="text-lg font-semibold">Delivery address</h3>
        <TextField name="street" label="Street address" autoComplete="address-line1" placeholder="123 Maple Street" required />
        <TextField name="apartment" label="Apartment, suite, etc." autoComplete="address-line2" />
        <div className="grid gap-5 sm:grid-cols-[2fr_1fr_1fr]">
          <TextField name="city" label="City" autoComplete="address-level2" required />
          <TextField name="state" label="State" autoComplete="address-level1" placeholder="CA" required />
          <TextField name="zip" label="ZIP code" autoComplete="postal-code" inputMode="numeric" pattern="[0-9]{5}(-[0-9]{4})?" placeholder="90210" required />
        </div>
      </div>

      <TextAreaField
        name="notes"
        label="Anything else we should know?"
        placeholder="Deadlines, special requests, the story behind it… we love hearing it."
      />

      <Tip icon={ShieldCheck}>
        Free shipping nationwide. Your details are only used for this order. We never share them.
      </Tip>
    </>
  );
}
