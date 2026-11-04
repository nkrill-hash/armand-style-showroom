import kitchen from "@/assets/project-kitchen.jpg";
import kitchenBefore from "@/assets/project-kitchen-before.jpg";
import wardrobe from "@/assets/project-wardrobe.jpg";
import office from "@/assets/project-office.jpg";
import type { BeforeAfterPair, Project } from "../types";

/**
 * armand.co.zw: "Project gallery coming soon". Until real job photos arrive,
 * these use AI-generated concept imagery, always labelled "Illustrative".
 * To swap in a real project: replace the images, give it its real name and
 * location, and set imagesAreIllustrative: false.
 */
export const projectCategories = ["Kitchens", "Wardrobes", "Fit-outs"] as const;

export const projects: Project[] = [
  {
    id: "project-kitchen",
    name: "Charcoal & Walnut Kitchen",
    category: "Kitchens",
    description:
      "Handle-free charcoal units, walnut tall cabinets and black granite tops — the kind of kitchen built from Armand boards, cutting, edging and fittings.",
    images: [{ src: kitchen, alt: "Charcoal and walnut kitchen with granite island (illustrative)", style: "photo" }],
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
    name: "Walnut Office Reception",
    category: "Fit-outs",
    description:
      "Reception desk, slatted feature wall and storage in walnut and charcoal — furniture and interior design for the office.",
    images: [{ src: office, alt: "Walnut and charcoal office reception (illustrative)", style: "photo" }],
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
