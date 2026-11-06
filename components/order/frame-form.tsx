"use client";

import { Frame, Gift, ImagePlus, Info, Sun, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ChoiceGroup, TextAreaField, TextField, Tip } from "./fields";
import OrderWizard from "./order-wizard";

const MAX_PHOTOS = 10;

type Photo = { id: string; file: File; url: string };

function PhotoUploader() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const photosRef = useRef(photos);
  useEffect(() => {
    photosRef.current = photos;
  }, [photos]);

  // Free the preview URLs when the form goes away.
  useEffect(() => () => photosRef.current.forEach((p) => URL.revokeObjectURL(p.url)), []);

  function addFiles(files: FileList | null) {
    if (!files) return;
    const images = [...files].filter((f) => f.type.startsWith("image/"));
    setPhotos((prev) =>
      [
        ...prev,
        ...images.map((file) => ({ id: crypto.randomUUID(), file, url: URL.createObjectURL(file) })),
      ].slice(0, MAX_PHOTOS),
    );
  }

  function remove(id: string) {
    setPhotos((prev) => {
      const photo = prev.find((p) => p.id === id);
      if (photo) URL.revokeObjectURL(photo.url);
      return prev.filter((p) => p.id !== id);
    });
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold">Upload your photos</p>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          addFiles(e.dataTransfer.files);
        }}
        className={`flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
          dragging
            ? "border-rose-500 bg-rose-50 dark:bg-rose-500/10"
            : "border-border bg-background/60 hover:border-rose-300 hover:bg-rose-50/40 dark:hover:bg-rose-500/5"
        }`}
      >
        <span className="flex size-14 items-center justify-center rounded-2xl bg-linear-to-br from-rose-500 to-orange-500 text-white shadow-md">
          <ImagePlus className="size-7" aria-hidden="true" />
        </span>
        <span className="font-semibold">
          Drag photos here or <span className="text-rose-600 underline underline-offset-4 dark:text-rose-400">browse</span>
        </span>
        <span className="text-sm text-muted">JPG, PNG or HEIC · up to {MAX_PHOTOS} photos</span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="sr-only"
        tabIndex={-1}
        aria-label="Upload photos"
        onChange={(e) => {
          addFiles(e.currentTarget.files);
          e.currentTarget.value = "";
        }}
      />

      {photos.length > 0 && (
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-5">
          {photos.map((photo) => (
            <li key={photo.id} className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-background">
              {/* eslint-disable-next-line @next/next/no-img-element -- local blob preview */}
              <img src={photo.url} alt={photo.file.name} className="size-full object-cover" />
              <button
                type="button"
                onClick={() => remove(photo.id)}
                aria-label={`Remove ${photo.file.name}`}
                className="absolute right-1.5 top-1.5 flex size-7 items-center justify-center rounded-full bg-black/60 text-white opacity-100 transition-opacity hover:bg-black/80 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Photo files are not sent yet (no storage hooked up); we pass their names so the order is complete. */}
      <input type="hidden" name="photos" data-label="Photos" value={photos.map((p) => p.file.name).join(", ")} />
      <p className="text-sm text-muted" aria-live="polite">
        {photos.length > 0
          ? `${photos.length} photo${photos.length > 1 ? "s" : ""} ready.`
          : "No photos handy? No problem. You can email them to us after ordering."}
      </p>
    </div>
  );
}

function GiftOptions() {
  const [isGift, setIsGift] = useState(false);
  return (
    <div className="space-y-4">
      <ChoiceGroup
        name="gift"
        legend="Is this a gift?"
        type="checkbox"
        options={[
          {
            value: "Gift wrap + hide prices",
            label: "Yes, wrap it up",
            description: "Free gift wrapping and no prices on the packing slip.",
            icon: Gift,
          },
        ]}
        onValueChange={(_, checked) => setIsGift(checked)}
      />
      {isGift && (
        <TextAreaField name="giftMessage" label="Gift message" placeholder="Happy anniversary! Love, Sam" maxLength={250} />
      )}
    </div>
  );
}

export default function FrameForm() {
  return (
    <OrderWizard
      service="frame"
      serviceLabel="Photo Frame"
      icon={Frame}
      nextSteps={[
        "We review your photos and check they'll print beautifully at your chosen size.",
        "You get a digital proof and final price by email within 1 business day.",
        "Once you approve, we handcraft your frame and ship it free in 7–10 days.",
      ]}
      steps={[
        {
          title: "Your photos",
          description: "Share the memory you'd like framed.",
          content: (
            <>
              <PhotoUploader />
              <TextAreaField
                name="photoStory"
                label="Tell us about the photo"
                hint="Helps us get the colors and crop just right."
                placeholder="Our wedding day in 2019, the one by the lake…"
              />
            </>
          ),
        },
        {
          title: "Design your frame",
          description: "Pick the size and finish. You can't go wrong.",
          content: (
            <>
              <ChoiceGroup
                name="frameSize"
                legend="Frame size"
                required
                columns={4}
                defaultValue="8 × 10 in"
                options={[
                  { value: "5 × 7 in", label: "5 × 7", description: "Desk & shelf" },
                  { value: "8 × 10 in", label: "8 × 10", description: "Most loved", badge: "Popular" },
                  { value: "11 × 14 in", label: "11 × 14", description: "Statement" },
                  { value: "16 × 20 in", label: "16 × 20", description: "Wall hero" },
                ]}
              />
              <ChoiceGroup
                name="finish"
                legend="Wood finish"
                required
                defaultValue="Natural Oak"
                options={[
                  { value: "Natural Oak", label: "Natural Oak", description: "Light and warm", swatch: "linear-gradient(135deg,#e6c79c,#c9a06b)" },
                  { value: "Rich Walnut", label: "Rich Walnut", description: "Deep, classic brown", swatch: "linear-gradient(135deg,#7a4e2d,#4e2f1a)" },
                  { value: "Ebony", label: "Ebony", description: "Bold and modern", swatch: "linear-gradient(135deg,#3a3a3a,#111)" },
                  { value: "Whitewash", label: "Whitewash", description: "Soft farmhouse feel", swatch: "linear-gradient(135deg,#f5f1ea,#ddd5c8)" },
                ]}
              />
              <ChoiceGroup
                name="mat"
                legend="Mat border"
                hint="A mat adds breathing room around your photo."
                columns={4}
                defaultValue="White mat"
                options={[
                  { value: "No mat", label: "None" },
                  { value: "White mat", label: "White" },
                  { value: "Cream mat", label: "Cream" },
                  { value: "Black mat", label: "Black" },
                ]}
              />
              <ChoiceGroup
                name="glass"
                legend="Glass"
                defaultValue="Standard glass"
                options={[
                  { value: "Standard glass", label: "Standard", description: "Clear and crisp" },
                  { value: "UV-protective museum glass", label: "Museum glass", description: "Stops fading in sunny rooms", icon: Sun },
                ]}
              />
              <div className="grid gap-5 sm:grid-cols-[10rem_1fr]">
                <TextField name="quantity" label="How many?" type="number" min={1} max={50} defaultValue={1} inputMode="numeric" required />
                <TextField
                  name="engraving"
                  label="Engraving"
                  maxLength={40}
                  placeholder="The Millers · Est. 2019"
                  hint="Up to 40 characters, engraved on a small plate."
                />
              </div>
              <GiftOptions />
              <Tip icon={Info}>Not sure? Stick with the defaults. We&apos;ll send a proof before anything is made.</Tip>
            </>
          ),
        },
      ]}
    />
  );
}
