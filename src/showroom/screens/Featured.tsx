import { useState } from "react";
import { cn } from "@/lib/utils";
import { featuredCollections } from "../data/featured";
import { productById } from "../data/products";
import { categoryById } from "../data/categories";
import { useShowroom } from "../state";
import { ArrowIcon, Eyebrow, TouchButton } from "../components/primitives";
import { ProductVisual } from "../components/ProductVisual";
import type { Product } from "../types";

export function Featured() {
  const { go, openEnquiry } = useShowroom();
  const [cIdx, setCIdx] = useState(0);
  const collection = featuredCollections[cIdx]!;
  const items = collection.productIds.map(productById).filter(Boolean) as Product[];
  const [heroId, setHeroId] = useState(items[0]!.id);
  const hero = items.find((p) => p.id === heroId) ?? items[0]!;

  return (
    <div className="absolute inset-0 grid grid-cols-[50fr_50fr] bg-ink">
      <div className="relative order-2 overflow-hidden">
        <ProductVisual key={hero.id} image={hero.image} eager float fill className="absolute inset-0 sr-anim-fade" padding="p-[28%_26%]" />
      </div>

      <div className="order-1 flex flex-col pb-[13vh] pl-[5vw] pr-[3.5vw] pt-[16vh]">
        <div className="flex gap-[0.8vw]" role="tablist" aria-label="Collections">
          {featuredCollections.map((c, i) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={i === cIdx}
              onClick={() => {
                setCIdx(i);
                setHeroId(c.productIds[0]!);
              }}
              className={cn("sr-touch sr-label rounded-full border px-[1.4vw] py-[1.4vh]", i === cIdx ? "border-ivory bg-ivory text-ink" : "border-line-strong text-ash")}
            >
              {c.title}
            </button>
          ))}
        </div>

        <div key={hero.id} className="mt-[5vh]">
          <Eyebrow className="sr-anim-fade-up">{collection.eyebrow}</Eyebrow>
          <h1 className="sr-title mt-[2vh] text-ivory sr-anim-mask-up">{hero.name}</h1>
          <p className="sr-label mt-[1.6vh] text-ash sr-anim-fade-up [animation-delay:150ms]">
            {categoryById(hero.categoryId)?.name}
            {hero.codes ? <span className="text-ember"> · {hero.codes[0]}</span> : null}
          </p>
          {hero.description && <p className="sr-lead mt-[2vh] max-w-[36vw] text-ash sr-anim-fade-up [animation-delay:200ms]">{hero.description}</p>}
          <div className="mt-[3.5vh] flex gap-[1vw] sr-anim-fade-up [animation-delay:260ms]">
            <TouchButton variant="primary" size="lg" onClick={() => go({ name: "product", id: hero.id })}>
              View details <ArrowIcon />
            </TouchButton>
            <TouchButton variant="ghost" size="lg" onClick={() => openEnquiry({ productId: hero.id })}>
              Enquire
            </TouchButton>
          </div>
        </div>

        <div className="mt-auto grid grid-cols-5 gap-[0.9vw]">
          {items.map((p, i) => (
            <button
              key={`${collection.id}-${p.id}`}
              type="button"
              onClick={() => setHeroId(p.id)}
              aria-pressed={p.id === hero.id}
              aria-label={p.name}
              className={cn("sr-touch overflow-hidden rounded-2xl border-2 sr-anim-fade-up", p.id === hero.id ? "border-ember" : "border-transparent")}
              style={{ animationDelay: `${300 + i * 70}ms` }}
            >
              <ProductVisual image={p.image} className="aspect-square w-full" padding="p-[14%]" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
