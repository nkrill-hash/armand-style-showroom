export type ImageStyle = "cutout" | "photo";

export interface ProductImage {
  src: string;
  alt: string;
  /** cutout = product on its own, shown on a bone plinth. photo = full-bleed. */
  style?: ImageStyle;
}

export interface ProductOption {
  /** e.g. a finish, size, or variant code */
  label: string;
  detail?: string;
  code?: string;
  image?: ProductImage;
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  subcategory?: string;
  series?: string;
  codes?: string[];
  image: ProductImage | null;
  /** Optional second photo showing the product fitted in a room. */
  inUse?: ProductImage;
  description?: string;
  specs?: { label: string; value: string }[];
  options?: { title: string; items: ProductOption[] };
  /** Page number printed in the 2026 Product Range, for staff reference. */
  cataloguePage?: number;
  source: "catalogue-2026" | "website";
}

export interface Category {
  id: string;
  name: string;
  short: string;
  description: string;
  cover: ProductImage;
  /** Catalogue sections this showroom category groups together. */
  catalogueSections: string[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
}

export interface Hotspot {
  id: string;
  label: string;
  /** Position in % of the image */
  x: number;
  y: number;
  target:
    | { type: "product"; id: string }
    | { type: "service"; id: string }
    | { type: "placeholder" };
}

export interface Space {
  id: string;
  name: string;
  intro: string;
  image: ProductImage;
  /** Generated imagery must never be presented as a real Armand project. */
  imageIsIllustrative: boolean;
  serviceIds: string[];
  hotspots: Hotspot[];
}

export interface Project {
  id: string;
  name: string;
  category: string;
  location?: string;
  description?: string;
  images: ProductImage[];
  isPlaceholder: boolean;
  /** AI-generated concept imagery — always labelled on screen, never a real job. */
  imagesAreIllustrative?: boolean;
}

export interface BeforeAfterPair {
  id: string;
  title: string;
  before: ProductImage;
  after: ProductImage;
  imagesAreIllustrative?: boolean;
}

export interface FeaturedCollection {
  id: string;
  eyebrow: string;
  title: string;
  productIds: string[];
}
