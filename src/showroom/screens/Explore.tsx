import { categories } from "../data/categories";
import { productsInCategory } from "../data/products";
import { useShowroom } from "../state";
import { SectionHeader } from "../components/primitives";
import { ProductVisual } from "../components/ProductVisual";
import { Rail } from "../components/Rail";

export function Explore() {
  const { go } = useShowroom();
  return (
    <div className="absolute inset-0 flex flex-col bg-ink pt-[17vh]">
      <SectionHeader
        className="px-[5vw]"
        eyebrow="700+ Products in Catalogue"
        title="Explore the Range"
        lead="Hardware and fittings from the Armand Product Range 2026."
      />
      <Rail className="mt-[4vh]">
        {categories.map((c, i) => (
          <button
            key={c.id}
            type="button"
            onClick={() => go({ name: "category", id: c.id })}
            className="sr-touch group flex w-[21vw] shrink-0 snap-start flex-col text-left sr-anim-fade-up"
            style={{ animationDelay: `${200 + i * 70}ms` }}
          >
            <ProductVisual image={c.cover} className="h-[34vh] w-full rounded-3xl" padding="p-[14%]" fill />
            <div className="mt-[2.2vh] flex items-start justify-between gap-4">
              <div>
                <h2 className="sr-heading text-ivory">{c.name}</h2>
                <p className="sr-body mt-[0.6vh] text-ash">{c.short}</p>
              </div>
              <span className="sr-label shrink-0 text-ash-dim">{String(productsInCategory(c.id).length).padStart(2, "0")}</span>
            </div>
          </button>
        ))}
      </Rail>
    </div>
  );
}
