import type { Space } from "../types";
import kitchen from "@/assets/space-kitchen.jpg";
import bedroom from "@/assets/space-bedroom.jpg";
import living from "@/assets/space-living.jpg";
import office from "@/assets/space-office.jpg";

/**
 * Spaces follow Armand's services (kitchens, wardrobes, furniture for the
 * home and office). Images are illustrative inspiration, not Armand projects —
 * swap in real project photography when available and set imageIsIllustrative
 * to false. Hotspot positions are percentages of the image.
 */
export const spaces: Space[] = [
  {
    id: "kitchen",
    name: "Kitchen",
    intro: "Kitchens designed and fitted, from boards and tops to the final handle.",
    image: { src: kitchen, alt: "Dark modern kitchen with handle-free cabinetry", style: "photo" },
    imageIsIllustrative: false,
    serviceIds: ["kitchens", "boards", "granite", "fittings"],
    hotspots: [
      { id: "k-tap", label: "Kitchen Mixer", x: 75.5, y: 41, target: { type: "product", id: "neo-mixer" } },
      { id: "k-sink", label: "Sinks", x: 71, y: 52.5, target: { type: "product", id: "maris-sink" } },
      { id: "k-gola", label: "Handle-Free Profiles", x: 62, y: 66, target: { type: "product", id: "gola-c" } },
      { id: "k-granite", label: "Granite Tops", x: 34, y: 54, target: { type: "service", id: "granite" } },
      { id: "k-boards", label: "Boards & Edging", x: 64, y: 18, target: { type: "service", id: "boards" } },
      { id: "k-hinge", label: "Soft Close Hinges", x: 46, y: 36, target: { type: "product", id: "hg838" } },
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
    image: { src: living, alt: "Living room with low storage unit on brass legs", style: "photo" },
    imageIsIllustrative: false,
    serviceIds: ["furniture", "boards", "cutting"],
    hotspots: [
      { id: "l-legs", label: "Furniture Legs", x: 51, y: 79, target: { type: "product", id: "brass-legs" } },
      { id: "l-runners", label: "Push-to-Open Runners", x: 64, y: 66, target: { type: "product", id: "runners" } },
      { id: "l-shelves", label: "Boards & Shelving", x: 34, y: 34, target: { type: "service", id: "boards" } },
      { id: "l-cutting", label: "Cut to Size", x: 79, y: 66, target: { type: "service", id: "cutting" } },
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
