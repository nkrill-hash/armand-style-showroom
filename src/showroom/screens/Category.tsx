import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { categoryById } from "../data/categories";
import { productsInCategory } from "../data/products";
import { useShowroom } from "../state";
import { Eyebrow } from "../components/primitives";
import { ProductVisual } from "../components/ProductVisual";
import { Rail } from "../components/Rail";

export function Category({ id }: { id: string }) {
  const { go } = useShowroom();
  const category = categoryById(id);
  const all = productsInCategory(id);
  const subs = useMemo(() => Array.from(new Set(all.map((p) => p.subcategory).filter(Boolean))) as string[], [all]);
  const [filter, setFilter] = useState<string | null>(null);
  const list = filter ? all.filter((p) => p.subcategory === filter) : all;

  if (!category) return null;

  return (
    <div className="absolute inset-0 flex flex-col bg-ink pt-[17vh]">
      <div className="flex items-end justify-between px-[5vw]">
        <div className="max-w-[50vw]">
          <Eyebrow className="sr-anim-fade-up">{category.catalogueSections.join(" · ")}</Eyebrow>
          <h1 className="sr-title mt-[2.2vh] text-ivory sr-anim-mask-up">{category.name}</h1>
        </div>
      </div>

      {subs.length > 1 && (
        <div className="mt-[3vh] flex gap-[0.8vw] px-[5vw] sr-anim-fade-up [animation-delay:300ms]" role="group" aria-label="Filter">
          {[null, ...subs].map((s) => (
            <button
              key={s ?? "all"}
              type="button"
              onClick={() => setFilter(s)}
              aria-pressed={filter === s}
              className={cn(
                "sr-touch sr-label rounded-full border px-[1.4vw] py-[1.4vh]",
                filter === s ? "border-ivory bg-ivory text-ink" : "border-line-strong text-ash",
              )}
            >
              {s ?? "All"}
            </button>
          ))}
        </div>
      )}

      <Rail key={filter ?? "all"} className="mt-[5vh]" controls={list.length > 3}>
        {list.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => go({ name: "product", id: p.id })}
            className="sr-touch group flex w-[23vw] shrink-0 snap-start flex-col text-left sr-anim-fade-up"
            style={{ animationDelay: `${150 + i * 80}ms` }}
          >
            <ProductVisual image={p.image} className="h-[28vh] w-full rounded-3xl" padding="p-[13%]" fill />
            <div className="mt-[2vh]">
              {p.subcategory && <div className="sr-eyebrow text-ash-dim">{p.subcategory}</div>}
              <h2 className="sr-heading mt-[0.8vh] text-ivory [font-size:clamp(1.3rem,1.75vw,2.25rem)]">{p.name}</h2>
              {p.codes && <p className="sr-label mt-[0.8vh] text-ember">{p.codes.slice(0, 3).join(" · ")}{p.codes.length > 3 ? " …" : ""}</p>}
            </div>
          </button>
        ))}
      </Rail>
    </div>
  );
}
