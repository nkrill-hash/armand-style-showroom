import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { categoryById } from "../data/categories";
import { productById, productsInCategory } from "../data/products";
import { useShowroom } from "../state";
import type { ProductImage } from "../types";
import { ArrowIcon, Eyebrow, TouchButton } from "../components/primitives";
import { ProductVisual } from "../components/ProductVisual";

export function ProductDetail({ id }: { id: string }) {
  const { go, openEnquiry } = useShowroom();
  const product = productById(id);
  const [activeImage, setActiveImage] = useState<ProductImage | null>(null);
  const [view, setView] = useState<"product" | "inUse">("product");
  useEffect(() => {
    setActiveImage(null);
    setView("product");
  }, [id]);
  if (!product) return null;

  const category = categoryById(product.categoryId);
  const siblings = productsInCategory(product.categoryId);
  const idx = siblings.findIndex((p) => p.id === product.id);
  const prev = siblings[(idx - 1 + siblings.length) % siblings.length]!;
  const next = siblings[(idx + 1) % siblings.length]!;
  const studio = activeImage ?? product.image;
  const showInUse = view === "inUse" && !!product.inUse;
  const image = showInUse ? product.inUse! : studio;

  return (
    <div className="absolute inset-0 grid grid-cols-[46fr_54fr] bg-ink">
      {/* Image stage */}
      <div className="relative order-2 overflow-hidden sr-anim-reveal-x">
        <ProductVisual key={image?.src} image={image} eager float={!showInUse} fill className="absolute inset-0 sr-anim-fade" padding="p-[22%_14%_14%]" />
        {product.inUse && (
          <div role="group" aria-label="Photo" className="absolute right-[3vw] top-[14vh] flex rounded-full bg-ink/85 p-[0.4vw] backdrop-blur">
            {(["product", "inUse"] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setView(v)}
                aria-pressed={view === v}
                className={cn(
                  "sr-touch sr-label rounded-full px-[1.4vw] py-[1.1vh] transition-colors",
                  view === v ? "bg-ember text-ivory" : "text-ivory/80 hover:text-ivory",
                )}
              >
                {v === "product" ? "Product" : "In use"}
              </button>
            ))}
          </div>
        )}
        {siblings.length > 1 && (
          <div className="absolute bottom-[3.2vh] left-[3vw] flex gap-[0.8vw]">
            <TouchButton variant="onBone" size="icon" onClick={() => go({ name: "product", id: prev.id })} aria-label={`Previous: ${prev.name}`}>
              <ArrowIcon dir="left" />
            </TouchButton>
            <TouchButton variant="onBone" size="icon" onClick={() => go({ name: "product", id: next.id })} aria-label={`Next: ${next.name}`}>
              <ArrowIcon />
            </TouchButton>
          </div>
        )}
      </div>

      {/* Information */}
      <div className="sr-no-scrollbar order-1 flex flex-col overflow-y-auto [mask-image:linear-gradient(to_bottom,transparent_0,transparent_11vh,black_16vh,black_86vh,transparent_92vh)] pb-[14vh] pl-[5vw] pr-[3.5vw] pt-[17vh]">
        <Eyebrow className="sr-anim-fade-up">
          {category?.name}
          {product.subcategory ? ` · ${product.subcategory}` : ""}
        </Eyebrow>
        <h1 className="sr-title mt-[2.2vh] text-ivory sr-anim-mask-up [animation-delay:120ms]">{product.name}</h1>
        {product.codes && (
          <div className="mt-[2.4vh] flex flex-wrap gap-[0.6vw] sr-anim-fade-up [animation-delay:200ms]">
            {product.codes.map((c) => (
              <span key={c} className="sr-label rounded-md border border-ember/50 px-[0.8vw] py-[0.6vh] text-ember">
                {c}
              </span>
            ))}
          </div>
        )}
        {product.description && (
          <p className="sr-lead mt-[3vh] text-ash sr-anim-fade-up [animation-delay:260ms]">{product.description}</p>
        )}

        {product.specs && product.specs.length > 0 && (
          <dl className="mt-[4vh] sr-anim-fade-up [animation-delay:320ms]">
            <dt className="sr-eyebrow text-ash-dim">Specifications</dt>
            {product.specs.map((s) => (
              <div key={s.label} className="grid grid-cols-[minmax(9vw,auto)_1fr] gap-[1.5vw] border-b border-line py-[1.6vh]">
                <span className="sr-label text-ash">{s.label}</span>
                <span className="sr-body text-ivory">{s.value}</span>
              </div>
            ))}
          </dl>
        )}

        {product.options && (
          <div className="mt-[4vh] sr-anim-fade-up [animation-delay:380ms]">
            <div className="sr-eyebrow text-ash-dim">{product.options.title}</div>
            <div className="mt-[1.6vh] flex flex-wrap gap-[0.7vw]">
              {product.options.items.map((o) => {
                const selectable = !!o.image;
                const selected = selectable && studio?.src === o.image!.src;
                return (
                  <button
                    key={o.label + (o.code ?? "")}
                    type="button"
                    disabled={!selectable}
                    onClick={() => {
                      if (o.image) {
                        setActiveImage(o.image);
                        setView("product");
                      }
                    }}
                    aria-pressed={selectable ? selected : undefined}
                    className={cn(
                      "sr-touch flex flex-col items-start rounded-xl border px-[1.1vw] py-[1.2vh] text-left disabled:cursor-default",
                      selected ? "border-ivory bg-ivory text-ink" : "border-line-strong text-ivory",
                      selectable && !selected && "hover:border-ivory",
                    )}
                  >
                    <span className="sr-label">{o.label}</span>
                    {(o.detail || o.code) && (
                      <span className={cn("sr-body mt-[0.3vh]", selected ? "text-ink/70" : "text-ash")}>
                        {[o.code, o.detail].filter(Boolean).join(" — ")}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-[5vh] flex items-center gap-[1.4vw] sr-anim-fade-up [animation-delay:440ms]">
          <TouchButton variant="ember" size="xl" onClick={() => openEnquiry({ productId: product.id })}>
            Enquire about this product <ArrowIcon />
          </TouchButton>
        </div>
        {product.cataloguePage && (
          <p className="sr-body mt-[2.4vh] text-ash-dim">Product Range 2026 · page {product.cataloguePage}</p>
        )}
      </div>
    </div>
  );
}
