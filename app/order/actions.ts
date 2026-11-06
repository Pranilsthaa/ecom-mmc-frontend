"use server";

export type Service = "frame" | "flowers";

export type OrderState =
  | { status: "idle" }
  | {
      status: "error";
      message: string;
      fieldErrors: Record<string, string>;
    }
  | {
      status: "success";
      reference: string;
      service: Service;
      firstName: string;
      email: string;
    };

const COMMON_REQUIRED: Record<string, string> = {
  fullName: "Please tell us your name.",
  email: "We need an email to send your confirmation.",
  street: "Please add your street address.",
  city: "Please add your city.",
  state: "Please add your state.",
  zip: "Please add your ZIP code.",
};

const SERVICE_REQUIRED: Record<Service, Record<string, string>> = {
  frame: {
    frameSize: "Pick a frame size.",
    finish: "Pick a wood finish.",
    quantity: "How many frames would you like?",
  },
  flowers: {
    occasion: "Let us know what the flowers are from.",
    eventDate: "Add the date of your event.",
    style: "Choose a keepsake style.",
    arrival: "Tell us how your flowers will reach us.",
  },
};

const MAX_FIELD_LENGTH = 2000;

function text(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim().slice(0, MAX_FIELD_LENGTH) : "";
}

function makeReference() {
  const random = crypto.getRandomValues(new Uint32Array(1))[0].toString(36).toUpperCase();
  return `MF-${random.padStart(6, "0").slice(0, 6)}`;
}

export async function submitOrder(
  _prev: OrderState,
  formData: FormData,
): Promise<OrderState> {
  const service = text(formData, "service");
  if (service !== "frame" && service !== "flowers") {
    return {
      status: "error",
      message: "Please choose a photo frame or flower preservation first.",
      fieldErrors: {},
    };
  }

  const fieldErrors: Record<string, string> = {};
  const required = { ...SERVICE_REQUIRED[service], ...COMMON_REQUIRED };
  for (const [name, message] of Object.entries(required)) {
    if (!text(formData, name)) fieldErrors[name] = message;
  }

  const email = text(formData, "email");
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fieldErrors.email = "That email doesn't look quite right.";
  }

  if (service === "frame") {
    const quantity = Number(text(formData, "quantity"));
    if (text(formData, "quantity") && (!Number.isInteger(quantity) || quantity < 1 || quantity > 50)) {
      fieldErrors.quantity = "Choose between 1 and 50 frames.";
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "A few details need a second look.",
      fieldErrors,
    };
  }

  const order = Object.fromEntries(
    [...formData.entries()]
      .filter(([key, value]) => !key.startsWith("$ACTION") && typeof value === "string")
      .map(([key]) => [key, formData.getAll(key).map(String).join(", ")]),
  );
  const reference = makeReference();

  // TODO: persist the order (database / CRM), upload photos to storage and
  // send the confirmation email. For now we only log it on the server.
  console.info("[order] new request", reference, order);

  return {
    status: "success",
    reference,
    service,
    firstName: text(formData, "fullName").split(/\s+/)[0] ?? "",
    email,
  };
}
