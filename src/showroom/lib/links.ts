/** Builds a wa.me link. Returns null when no WhatsApp number is configured. */
export function buildWhatsAppLink(number: string, message?: string): string | null {
  const digits = number.replace(/\D/g, "");
  if (!digits) return null;
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Enquiry message for a specific product. */
export function productEnquiryMessage(productName: string, code?: string): string {
  const ref = code ? ` (${code})` : "";
  return `Hi Armand, I'd like to enquire about ${productName}${ref}. I saw it in your showroom.`;
}

/** Whether the kiosk has been idle long enough to return to attract mode. */
export function isIdle(lastInteractionAt: number, now: number, timeoutMs: number): boolean {
  return now - lastInteractionAt >= timeoutMs;
}
