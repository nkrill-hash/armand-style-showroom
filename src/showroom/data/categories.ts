import type { Category } from "../types";

/** Showroom categories, grouped from the 2026 catalogue's Quick Find Index. */
export const categories: Category[] = [
  {
    id: "hinges",
    name: "Hinges",
    short: "Concealed, soft close & butt",
    description: "Concealed, sinkless and butt hinges in brass, steel and black.",
    cover: { src: "/showroom/hd/studio/butt-hinges.jpg", alt: "Butt hinges", style: "cutout" },
    catalogueSections: ["Hinges"],
  },
  {
    id: "handles",
    name: "Handles & Hooks",
    short: "Levers, arches, bars & hooks",
    description: "Cabinet handles, door levers, knobs and hooks.",
    cover: { src: "/showroom/hd/studio/lever-handles.jpg", alt: "Lever handle", style: "cutout" },
    catalogueSections: ["Handles", "Knobs", "Hooks"],
  },
  {
    id: "drawers",
    name: "Drawers & Storage",
    short: "Runners, trays & baskets",
    description: "Drawer slides, cutlery storage, baskets and crates.",
    cover: { src: "/showroom/hd/studio/runners.jpg", alt: "Drawer runners", style: "cutout" },
    catalogueSections: ["Drawer Slides", "Pine Crates & Baskets", "Kitchen Storage"],
  },
  {
    id: "kitchen",
    name: "Kitchen Systems",
    short: "Pantries, carousels & bins",
    description: "Pull-out pantries, corner solutions, wire ware and refuse bins.",
    cover: { src: "/showroom/hd/studio/carousel-wb0069.jpg", alt: "Corner carousel", style: "cutout" },
    catalogueSections: ["Kitchen Storage", "Wire Ware", "Refuse Bins"],
  },
  {
    id: "sinks",
    name: "Sinks & Taps",
    short: "Fragranite, stainless & mixers",
    description: "Fragranite and stainless steel sinks with kitchen mixers.",
    cover: { src: "/showroom/hd/studio/neo-mixer.jpg", alt: "NEO kitchen mixer", style: "cutout" },
    catalogueSections: ["Sinks & Taps"],
  },
  {
    id: "doors",
    name: "Door Systems & Profiles",
    short: "Gola & glass door profiles",
    description: "Gola handle-free profiles and aluminium glass door systems.",
    cover: { src: "/showroom/hd/studio/gola-c.jpg", alt: "Gola profile", style: "cutout" },
    catalogueSections: ["Door Systems & Alu. Profiles", "Gola Profile Handles"],
  },
  {
    id: "bedroom",
    name: "Bedroom Systems",
    short: "Wardrobe storage",
    description: "Pull-down garment racks, shoe racks and wardrobe storage.",
    cover: { src: "/showroom/hd/studio/garment-rack.jpg", alt: "Garment rack", style: "cutout" },
    catalogueSections: ["Storage Systems"],
  },
  {
    id: "legs",
    name: "Legs & Castors",
    short: "Furniture legs & castors",
    description: "Furniture legs and castors for cabinets, beds and tables.",
    cover: { src: "/showroom/hd/studio/brass-legs.jpg", alt: "Brass legs", style: "cutout" },
    catalogueSections: ["Legs", "Castors"],
  },
  {
    id: "fixings",
    name: "Locks, Tools & Adhesives",
    short: "Locks, nailers & sealants",
    description: "Cabinet locks, tools and consumables, adhesives and fillers.",
    cover: { src: "/showroom/hd/studio/locks.jpg", alt: "Cabinet lock", style: "cutout" },
    catalogueSections: ["Locks", "Tools & Consumables", "Adhesives, Fillers & Sealants"],
  },
];

export const categoryById = (id: string) => categories.find((c) => c.id === id);
