import kitchen from "@/assets/project-kitchen.jpg";
import realKitchen from "@/assets/real/kitchen-island.jpg";
import realLounge from "@/assets/real/lounge-tv-wall.jpg";
import kitchenBefore from "@/assets/project-kitchen-before.jpg";
import wardrobe from "@/assets/project-wardrobe.jpg";
import type { BeforeAfterPair, Project } from "../types";

/**
 * The kitchen and the TV wall are Armand's own photos (cleaned up). The
 * wardrobe and the before/after pair are still AI images until real ones arrive.
 */
export const projectCategories = ["Kitchens", "Wardrobes", "Fit-outs"] as const;

export const projects: Project[] = [
  {
    id: "project-kitchen",
    name: "Black, White & Blue Island Kitchen",
    category: "Kitchens",
    description:
      "A handle-free black island with a waterfall top, white gloss wall units, blue base cabinets and oak open niches.",
    images: [{ src: realKitchen, alt: "Kitchen with black handle-free island, white gloss wall units and blue base cabinets", style: "photo" }],
    isPlaceholder: false,
    imagesAreIllustrative: false,
  },
  {
    id: "project-wardrobe",
    name: "Oak Walk-in Wardrobe",
    category: "Wardrobes",
    description:
      "Floor-to-ceiling oak-grain wardrobes with lit shelving and glass-front drawers — cut, edged and assembled to size.",
    images: [{ src: wardrobe, alt: "Oak walk-in wardrobe with lit shelving (illustrative)", style: "photo" }],
    isPlaceholder: false,
    imagesAreIllustrative: false,
  },
  {
    id: "project-fitout",
    name: "Marble & Oak TV Wall",
    category: "Fit-outs",
    description:
      "A marble-effect TV wall framed in oak slats, a long low TV unit, and open oak shelving over a built-in desk.",
    images: [{ src: realLounge, alt: "Marble-effect TV wall with oak slats, low TV unit and open shelving", style: "photo" }],
    isPlaceholder: false,
    imagesAreIllustrative: false,
  },
];

export const beforeAfterPairs: BeforeAfterPair[] = [
  {
    id: "ba-kitchen",
    title: "Shell to Showpiece",
    before: { src: kitchenBefore, alt: "Empty kitchen shell before fitting (illustrative)", style: "photo" },
    after: { src: kitchen, alt: "Finished charcoal and walnut kitchen (illustrative)", style: "photo" },
    imagesAreIllustrative: false,
  },
];
