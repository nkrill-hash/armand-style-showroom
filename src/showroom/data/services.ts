import type { Service } from "../types";

/** "What We Do" — copied from armand.co.zw. */
export const services: Service[] = [
  { id: "boards", name: "Boards", description: "Melamine and super wood boards for cabinets, wardrobes, shelving and furniture." },
  { id: "cutting", name: "Cutting", description: "Precision cutting to your sizes, ready to assemble or fit." },
  { id: "edging", name: "Edging", description: "Expert edging for a clean, durable finish on every cut edge." },
  { id: "fittings", name: "Fittings", description: "Hinges, handles, drawer runners, locks and kitchen hardware." },
  { id: "kitchens", name: "Kitchen Design & Fitting", description: "Kitchens designed and fitted, from boards and tops to the final handle." },
  { id: "wardrobes", name: "Wardrobes", description: "Wardrobes cut, edged and professionally assembled." },
  { id: "furniture", name: "Furniture", description: "Furniture and interior design for the home and office." },
  { id: "granite", name: "Granite", description: "Granite tops for kitchens, vanities and counters." },
];

export const serviceById = (id: string) => services.find((s) => s.id === id);

/** How it works — from armand.co.zw */
export const processSteps = [
  { n: "01", title: "Send your sizes", text: "WhatsApp us your board type, sizes and edging." },
  { n: "02", title: "Get your quote", text: "Stock, price and delivery confirmed within 2 hours on trading days." },
  { n: "03", title: "We cut and edge", text: "Your boards are cut and edged to size, ready to assemble." },
  { n: "04", title: "Collect or delivery", text: "Collect from Khami Rd, Bulawayo, or arrange delivery." },
];
