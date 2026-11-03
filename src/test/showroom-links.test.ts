import { describe, expect, it } from "vitest";
import { buildWhatsAppLink, isIdle, productEnquiryMessage } from "@/showroom/lib/links";
import { SHOWROOM_CONFIG } from "@/showroom/config";

describe("WhatsApp enquiries", () => {
  it("uses Armand's WhatsApp line from the website", () => {
    expect(buildWhatsAppLink(SHOWROOM_CONFIG.contact.whatsappNumber)).toBe("https://wa.me/263780793585");
  });

  it("includes the product name in a product enquiry", () => {
    const link = buildWhatsAppLink("263780793585", productEnquiryMessage("NEO Kitchen Mixer", "NM0B017"));
    expect(decodeURIComponent(link!.split("?text=")[1]!)).toBe(
      "Hi Armand, I'd like to enquire about NEO Kitchen Mixer (NM0B017). I saw it in your showroom.",
    );
  });

  it("returns no link when no number is configured", () => {
    expect(buildWhatsAppLink("")).toBeNull();
  });
});

describe("idle reset", () => {
  it("returns to attract mode after 60 seconds without interaction", () => {
    expect(SHOWROOM_CONFIG.kiosk.IDLE_TIMEOUT).toBe(60000);
    expect(isIdle(0, 59999, SHOWROOM_CONFIG.kiosk.IDLE_TIMEOUT)).toBe(false);
    expect(isIdle(0, 60000, SHOWROOM_CONFIG.kiosk.IDLE_TIMEOUT)).toBe(true);
  });
});
