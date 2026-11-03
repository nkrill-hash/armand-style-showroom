/**
 * Showroom configuration. Edit values here to update brand, contact details
 * and kiosk behaviour without touching any screen components.
 * All contact details below come from armand.co.zw and the 2026 Product Range.
 */
export const SHOWROOM_CONFIG = {
  brand: {
    name: "Armand",
    fullName: "Armand Carpentry & Designs",
    tagline: "Build. Design. Transform.",
    strapline: "Boards | Cutting | Fittings",
    logoLight: "/showroom/logo-light.png", // for dark backgrounds
    logo: "/showroom/logo.png", // full-colour, for light backgrounds
    /** Reference only — the live values are the design tokens in src/styles.css */
    colors: { charcoal: "#1e1d1f", orange: "#F36523" },
  },
  contact: {
    /** International format, digits only. Set to "" to hide WhatsApp actions. */
    whatsappNumber: "263780793585",
    whatsappDisplay: "+263 78 079 3585",
    phoneNumbers: [
      { label: "Office", display: "+263 292 265 490", tel: "+263292265490" },
      { label: "Mobile & WhatsApp", display: "+263 78 079 3585", tel: "+263780793585" },
    ],
    email: "armandcarpentry@gmail.com",
    addressLines: ["2142 Khami Rd, Iversens Complex", "Bulawayo, Zimbabwe"],
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=2142+Khami+Rd+Iversens+Complex+Bulawayo+Zimbabwe",
    hours: [
      { days: "Monday – Friday", time: "08:00 – 17:00" },
      { days: "Saturday", time: "08:00 – 13:00" },
    ],
    website: "https://armand.co.zw",
    websiteDisplay: "armand.co.zw",
    payments: ["EcoCash", "Paynow", "EFT", "Bank Transfer"],
  },
  /** Where the generic "Scan to explore" QR code points. */
  qrDestination: "https://armand.co.zw",
  /** Default WhatsApp greeting for general enquiries. */
  whatsappGreeting: "Hi Armand, I'm at your showroom and would like some help.",
  kiosk: {
    /** No interaction for this long (ms) returns the screen to attract mode. */
    IDLE_TIMEOUT: 60000,
    /** Duration of each attract-mode scene (ms). */
    ATTRACT_SCENE_DURATION: 8000,
    /** Global animation speed multiplier (1 = normal, 0.8 = slower, 1.2 = faster). */
    ANIMATION_SPEED: 1,
  },
  tv: {
    /** How long each scene of the marketing-TV loop (/tv) stays on screen (ms). */
    SCENE_DURATION: 9000,
    /** Reload the TV page every N hours so screens pick up content updates. 0 = never. */
    RELOAD_EVERY_HOURS: 6,
  },
} as const;

export type ShowroomConfig = typeof SHOWROOM_CONFIG;
