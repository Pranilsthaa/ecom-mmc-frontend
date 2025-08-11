"use server"

export type CreateOrderInput = {
  kind: "photos" | "garlands"
  personal: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
  address: {
    street: string
    city: string
    state: string
    postalCode: string
  }
  items: {
    description: string
    quantity: number
    notes?: string
  }
  shipping: {
    // For photos we’ll set 'digital'. For garlands we use 'pickup' | 'courier'.
    method: "pickup" | "courier" | "digital"
    pickupDate?: string
    pickupSlot?: string
  }
}

export async function createOrder(data: CreateOrderInput) {
  await new Promise((r) => setTimeout(r, 800))
  const id = Math.random().toString(36).slice(2, 10).toUpperCase()
  return {
    success: true,
    orderId: `MF-${id}`,
    nextSteps:
      data.kind === "photos"
        ? "Upload your photos from the link in your email. We’ll begin layout once we receive them."
        : data.shipping.method === "pickup"
          ? "We’ll arrive at your selected time slot to collect your garland/flowers."
          : "Please ship your garland/flowers to our studio with tracked delivery.",
  }
}
