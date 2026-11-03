import type { BeforeAfterPair, Project } from "../types";

/**
 * armand.co.zw: "Project gallery coming soon — we are putting together photos
 * of finished kitchens, wardrobes and fit-outs." Replace these placeholders
 * with real projects (set isPlaceholder: false and add images).
 */
export const projectCategories = ["Kitchens", "Wardrobes", "Fit-outs"] as const;

export const projects: Project[] = [
  {
    id: "project-kitchen",
    name: "Project Name",
    category: "Kitchens",
    location: "Location",
    description: "Project description — boards, cutting, edging and fittings supplied.",
    images: [],
    isPlaceholder: true,
  },
  {
    id: "project-wardrobe",
    name: "Project Name",
    category: "Wardrobes",
    location: "Location",
    description: "Project description — boards, cutting, edging and fittings supplied.",
    images: [],
    isPlaceholder: true,
  },
  {
    id: "project-fitout",
    name: "Project Name",
    category: "Fit-outs",
    location: "Location",
    description: "Project description — boards, cutting, edging and fittings supplied.",
    images: [],
    isPlaceholder: true,
  },
];

/** Add real before/after photo pairs here; the comparison slider is ready. */
export const beforeAfterPairs: BeforeAfterPair[] = [];
