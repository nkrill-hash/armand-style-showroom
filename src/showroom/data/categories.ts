import type { Category } from "../types";

/** Showroom categories, grouped from the 2026 catalogue's Quick Find Index. */
export const categories: Category[] = [
  {
    id: "hinges",
    name: "Hinges",
    short: "Concealed, soft close & butt",
    description: "Concealed, sinkless and butt hinges in brass, steel and black.",
    cover: { src: "/showroom/web/butt-hinges.webp", alt: "Butt hinges", style: "cutout" },
    catalogueSections: ["Hinges"],
  },
  {
    id: "handles",
    name: "Handles & Hooks",
    short: "Levers, arches, bars & hooks",
    description: "Cabinet handles, door levers, knobs and hooks.",
    cover: { src: "/showroom/web/lever-handle.webp", alt: "Lever handle", style: "cutout" },
    catalogueSections: ["Handles", "Knobs", "Hooks"],
  },
  {
    id: "drawers",
    name: "Drawers & Storage",
    short: "Runners, trays & baskets",
    description: "Drawer slides, cutlery storage, baskets and crates.",
    cover: { src: "/showroom/web/drawer-runners.webp", alt: "Drawer runners", style: "cutout" },
    catalogueSections: ["Drawer Slides", "Pine Crates & Baskets", "Kitchen Storage"],
  },
  {
    id: "kitchen",
    name: "Kitchen Systems",
    short: "Pantries, carousels & bins",
    description: "Pull-out pantries, corner solutions, wire ware and refuse bins.",
    cover: { src: "/showroom/products/carousel-wb0069.webp", alt: "Corner carousel", style: "cutout" },
    catalogueSections: ["Kitchen Storage", "Wire Ware", "Refuse Bins"],
  },
  {
    id: "sinks",
    name: "Sinks & Taps",
    short: "Fragranite, stainless & mixers",
    description: "Fragranite and stainless steel sinks with kitchen mixers.",
    cover: { src: "/showroom/products/tap-neo-brass.webp", alt: "NEO kitchen mixer", style: "cutout" },
    catalogueSections: ["Sinks & Taps"],
  },
  {
    id: "doors",
    name: "Door Systems & Profiles",
    short: "Gola & glass door profiles",
    description: "Gola handle-free profiles and aluminium glass door systems.",
    cover: { src: "/showroom/products/gola-c-profile.webp", alt: "Gola profile", style: "cutout" },
    catalogueSections: ["Door Systems & Alu. Profiles", "Gola Profile Handles"],
  },
  {
    id: "bedroom",
    name: "Bedroom Systems",
    short: "Wardrobe storage",
    description: "Pull-down garment racks, shoe racks and wardrobe storage.",
    cover: { src: "/showroom/products/garment-rack-3621.webp", alt: "Garment rack", style: "photo" },
    catalogueSections: ["Storage Systems"],
  },
  {
    id: "legs",
    name: "Legs & Castors",
    short: "Furniture legs & castors",
    description: "Furniture legs and castors for cabinets, beds and tables.",
    cover: { src: "/showroom/products/legs-brass-tube.webp", alt: "Brass legs", style: "cutout" },
    catalogueSections: ["Legs", "Castors"],
  },
  {
    id: "fixings",
    name: "Locks, Tools & Adhesives",
    short: "Locks, nailers & sealants",
    description: "Cabinet locks, tools and consumables, adhesives and fillers.",
    cover: { src: "/showroom/web/cabinet-lock.webp", alt: "Cabinet lock", style: "cutout" },
    catalogueSections: ["Locks", "Tools & Consumables", "Adhesives, Fillers & Sealants"],
  },
];

export const categoryById = (id: string) => categories.find((c) => c.id === id);
