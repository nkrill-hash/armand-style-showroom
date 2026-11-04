import { describe, expect, it } from "vitest";
import { kits } from "@/showroom/data/kits";
import { productById } from "@/showroom/data/products";

describe("TV project kits", () => {
  it("has kitchen, wardrobe and office kits", () => {
    expect(kits.map((k) => k.id)).toEqual(["kitchen", "wardrobe", "furniture"]);
  });

  it("only uses real catalogue products with sharp photos", () => {
    for (const kit of kits) {
      for (const item of kit.items) {
        if (item.kind !== "product") continue;
        const p = productById(item.productId);
        expect(p, `${kit.id}: ${item.productId}`).toBeDefined();
        expect(p!.image?.src, `${kit.id}: ${item.productId}`).toMatch(/\/showroom\/(hd|web)\//);
      }
    }
  });
});
