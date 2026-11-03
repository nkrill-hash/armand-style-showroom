import type { FeaturedCollection } from "../types";

/** Curated collections shown in Featured and in attract mode. */
export const featuredCollections: FeaturedCollection[] = [
  {
    id: "kitchen-edit",
    eyebrow: "New Edition 2026",
    title: "The Kitchen Edit",
    productIds: ["neo-mixer", "maris-sink", "gola-c", "pantry-j012", "carousel-wb0069"],
  },
  {
    id: "finishing-touches",
    eyebrow: "Finishing Touches",
    title: "Brass, Black & Steel",
    productIds: ["hook-3698", "brass-legs", "a6025", "hg868", "lever-handles"],
  },
];

/** Products shown in the attract-mode featured scene. */
export const attractFeaturedIds = ["neo-mixer", "maris-sink", "hook-3698"];
