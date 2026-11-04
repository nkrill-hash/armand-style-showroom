import type { Space } from "../types";
import kitchen from "@/assets/real/kitchen-island.jpg";
import bedroom from "@/assets/space-bedroom.jpg";
import living from "@/assets/real/lounge-tv-wall.jpg";
import office from "@/assets/space-office.jpg";

/**
 * Spaces follow Armand's services (kitchens, wardrobes, furniture for the
 * home and office). Kitchen and Living use Armand's own photos (cleaned up);
 * Bedroom and Office are still AI images until real ones arrive.
 * Hotspot positions are percentages of the image.
 */
export const spaces: Space[] = [
  {
    id: "kitchen",
    name: "Kitchen",
    intro: "Kitchens designed and fitted, from boards and tops to the final handle.",
    image: { src: kitchen, alt: "Kitchen with black handle-free island, white gloss wall units and blue base cabinets", style: "photo" },
    imageIsIllustrative: false,
    serviceIds: ["kitchens", "boards", "granite", "fittings"],
    hotspots: [
      { id: "k-tap", label: "Kitchen Mixer", x: 83, y: 46, target: { type: "product", id: "neo-mixer" } },
      { id: "k-sink", label: "Sinks", x: 78, y: 54, target: { type: "product", id: "maris-sink" } },
      { id: "k-gola", label: "Handle-Free Profiles", x: 36, y: 66, target: { type: "product", id: "gola-c" } },
      { id: "k-granite", label: "Worktops", x: 50, y: 52.5, target: { type: "service", id: "granite" } },
      { id: "k-boards", label: "Boards & Edging", x: 62, y: 30, target: { type: "service", id: "boards" } },
      { id: "k-hinge", label: "Soft Close Hinges", x: 42, y: 32, target: { type: "product", id: "hg838" } },
      { id: "k-runners", label: "Drawer Runners", x: 70, y: 60, target: { type: "product", id: "runners" } },
    ],
  },
  {
    id: "bedroom",
    name: "Bedroom",
    intro: "Wardrobes cut, edged and professionally assembled.",
    image: { src: bedroom, alt: "Bedroom with full-height built-in wardrobe", style: "photo" },
    imageIsIllustrative: false,
    serviceIds: ["wardrobes", "boards", "edging"],
    hotspots: [
      { id: "b-rail", label: "Garment Storage", x: 60, y: 22, target: { type: "product", id: "garment-rack" } },
      { id: "b-drawers", label: "Drawer Runners", x: 60, y: 58, target: { type: "product", id: "runners" } },
      { id: "b-shoe", label: "Shoe Storage", x: 58, y: 66, target: { type: "product", id: "shoe-rack" } },
      { id: "b-door", label: "Door Profiles", x: 36, y: 40, target: { type: "product", id: "glass-door-profile" } },
      { id: "b-board", label: "Boards & Edging", x: 82, y: 40, target: { type: "service", id: "boards" } },
    ],
  },
  {
    id: "living",
    name: "Living",
    intro: "Furniture and interior design for the home.",
    image: { src: living, alt: "Lounge with marble-effect TV wall, oak slats, low TV unit and open shelving", style: "photo" },
    imageIsIllustrative: false,
    serviceIds: ["furniture", "boards", "cutting"],
    hotspots: [
      { id: "l-shelves", label: "Boards & Shelving", x: 30, y: 36, target: { type: "service", id: "boards" } },
      { id: "l-cutting", label: "Cut to Size", x: 46, y: 52, target: { type: "service", id: "cutting" } },
      { id: "l-edging", label: "Edging", x: 48, y: 80, target: { type: "service", id: "edging" } },
      { id: "l-runners", label: "Push-to-Open Runners", x: 70, y: 87, target: { type: "product", id: "runners" } },
    ],
  },
  {
    id: "office",
    name: "Office",
    intro: "Furniture and interior design for the office.",
    image: { src: office, alt: "Home office with built-in desk and storage", style: "photo" },
    imageIsIllustrative: false,
    serviceIds: ["furniture", "boards", "fittings"],
    hotspots: [
      { id: "o-castor", label: "Castors", x: 37.5, y: 86, target: { type: "product", id: "castors-cpl" } },
      { id: "o-handle", label: "Bar Handles", x: 40, y: 55, target: { type: "product", id: "a09" } },
      { id: "o-desk", label: "Boards & Desk Tops", x: 62, y: 50, target: { type: "service", id: "boards" } },
      { id: "o-lock", label: "Cabinet Locks", x: 78, y: 70, target: { type: "product", id: "locks" } },
    ],
  },
];

export const spaceById = (id: string) => spaces.find((s) => s.id === id);
