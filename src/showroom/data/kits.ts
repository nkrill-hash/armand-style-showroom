import boardsStock from "@/assets/tv-boards-stock.jpg";
import edging from "@/assets/tv-edging.jpg";
import granite from "@/assets/tv-granite.jpg";
import kitchen from "@/assets/project-kitchen.jpg";
import wardrobe from "@/assets/project-wardrobe.jpg";
import office from "@/assets/project-office.jpg";

/**
 * "All you need for your …" project kits shown on the TV loop.
 * Each item is either a catalogue product (by id — must have a sharp photo)
 * or a service tile with its own photo. `need` is the plain-language reason
 * the customer needs it; no specs or prices are invented here.
 */
export type KitItem =
  | { kind: "product"; productId: string; need: string; label: string }
  | { kind: "service"; title: string; need: string; label: string; image: string };

export type Kit = {
  id: string;
  room: string;
  title: string;
  intro: string;
  hero: string;
  heroCaption: string;
  items: KitItem[];
};

export const kits: Kit[] = [
  {
    id: "kitchen",
    room: "Kitchens",
    title: "All you need for your kitchen.",
    intro: "From the boards to the last handle — one list, one counter.",
    hero: kitchen,
    heroCaption: "Charcoal & walnut kitchen",
    items: [
      { kind: "service", label: "Carcass & doors", title: "Boards, cut & edged", need: "Melamine and super wood, cut to your sizes.", image: boardsStock },
      { kind: "service", label: "Worktop", title: "Granite tops", need: "Hard-wearing tops for counters and islands.", image: granite },
      { kind: "product", label: "Doors", productId: "hg838", need: "So cupboard doors close softly." },
      { kind: "product", label: "Drawers", productId: "runners", need: "So drawers glide out smoothly." },
      { kind: "product", label: "Handles", productId: "gola-c", need: "For a clean, handle-free door line." },
      { kind: "product", label: "Corner unit", productId: "carousel-wb0069", need: "Makes the deep corner cupboard usable." },
      { kind: "product", label: "Waste", productId: "enviro-bins", need: "Bins hidden inside a base unit." },
      { kind: "product", label: "Sink", productId: "maris-sink", need: "The bowl set into your worktop." },
      { kind: "product", label: "Tap", productId: "neo-mixer", need: "The mixer to finish the sink." },
    ],
  },
  {
    id: "wardrobe",
    room: "Wardrobes",
    title: "All you need for your wardrobe.",
    intro: "Build it yourself or let us assemble it — the parts are all here.",
    hero: wardrobe,
    heroCaption: "Oak walk-in wardrobe",
    items: [
      { kind: "service", label: "Carcass & shelves", title: "Boards, cut to size", need: "Melamine and super wood for sides and shelves.", image: boardsStock },
      { kind: "service", label: "Finish", title: "Edging", need: "A clean, durable finish on every cut edge.", image: edging },
      { kind: "product", label: "Doors", productId: "hg838", need: "So wardrobe doors close softly." },
      { kind: "product", label: "Drawers", productId: "runners", need: "For smooth inner drawers." },
      { kind: "product", label: "Handles", productId: "a6025", need: "Something to pull on every door." },
      { kind: "product", label: "Hanging", productId: "hook-3698", need: "For coats, bags and gowns." },
      { kind: "product", label: "Security", productId: "locks", need: "Keep a drawer or door locked." },
    ],
  },
  {
    id: "furniture",
    room: "Furniture & office",
    title: "All you need for your office.",
    intro: "Desks, storage and shelving — made from the boards on our racks.",
    hero: office,
    heroCaption: "Office reception & storage wall",
    items: [
      { kind: "service", label: "Desks & storage", title: "Boards, cut to size", need: "For desk tops, cabinets and shelving.", image: boardsStock },
      { kind: "service", label: "Finish", title: "Edging", need: "Edges that stand up to daily use.", image: edging },
      { kind: "product", label: "Doors", productId: "butt-hinges", need: "For doors and cabinet fronts." },
      { kind: "product", label: "Office doors", productId: "lever-handles", need: "Levers and locksets for room doors." },
      { kind: "product", label: "Filing", productId: "locks", need: "Lock away drawers and files." },
      { kind: "product", label: "Mobile units", productId: "castors-cpl", need: "Roll pedestals and trolleys around." },
      { kind: "product", label: "Assembly", productId: "adhesives", need: "Glues and sealants to put it together." },
    ],
  },
];
