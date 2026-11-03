import { useState } from "react";
import { cn } from "@/lib/utils";
import { productById } from "../data/products";
import { serviceById } from "../data/services";
import { spaceById } from "../data/spaces";
import { useShowroom } from "../state";
import type { Hotspot } from "../types";
import { ArrowIcon, CloseIcon, Eyebrow, TouchButton } from "../components/primitives";
import { ProductVisual } from "../components/ProductVisual";

export function SpaceDetail({ id }: { id: string }) {
  const { go, openEnquiry } = useShowroom();
  const space = spaceById(id);
  const [active, setActive] = useState<Hotspot | null>(null);
  if (!space) return null;

  return (
    <div className="absolute inset-0 overflow-hidden bg-ink-deep">
      <img src={space.image.src} alt={space.image.alt} className="absolute inset-0 h-full w-full object-cover sr-anim-kenburns [animation-duration:30s]" draggable={false} />
      <div className="absolute inset-0 sr-scrim-bottom opacity-80" />

      {/* Hotspots */}
      {space.hotspots.map((h, i) => {
        const on = active?.id === h.id;
        return (
          <button
            key={h.id}
            type="button"
            onClick={() => setActive(on ? null : h)}
            aria-expanded={on}
            aria-label={h.label}
            className="sr-touch group absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 sr-anim-fade"
            style={{ left: `${h.x}%`, top: `${h.y}%`, animationDelay: `${600 + i * 120}ms` }}
          >
            <span className="relative flex h-[clamp(2.75rem,4.6vh,3.75rem)] w-[clamp(2.75rem,4.6vh,3.75rem)] items-center justify-center">
              {!on && <span className="absolute inset-0 rounded-full border-2 border-ivory/80 sr-pulse-ring" />}
              <span className={cn("flex h-full w-full items-center justify-center rounded-full border-2 transition-colors", on ? "border-ember bg-ember" : "border-ivory bg-ink-deep/40 backdrop-blur-sm")}>
                <span className={cn("h-[30%] w-[30%] rounded-full", on ? "bg-ivory" : "bg-ivory")} />
              </span>
            </span>
            <span className={cn("sr-label rounded-full px-[1vw] py-[0.9vh] transition-colors", on ? "bg-ivory text-ink" : "bg-ink-deep/70 text-ivory backdrop-blur-sm")}>
              {h.label}
            </span>
          </button>
        );
      })}

      {/* Title */}
      <div className="pointer-events-none absolute bottom-[14vh] left-[5vw] max-w-[40vw]">
        <Eyebrow className="sr-anim-fade-up">Explore Spaces</Eyebrow>
        <h1 className="sr-display mt-[2vh] text-ivory sr-anim-mask-up">{space.name}</h1>
        <p className="sr-lead mt-[2vh] text-ivory/85 sr-anim-fade-up [animation-delay:250ms]">{space.intro}</p>
        <p className="sr-body mt-[2vh] text-ash sr-anim-fade [animation-delay:500ms]">Tap a point to see the product or service.</p>
      </div>
      {space.imageIsIllustrative && (
        <span className="sr-label absolute right-[3.2vw] top-[13vh] rounded-full bg-ink-deep/60 px-[1vw] py-[0.8vh] text-ash backdrop-blur-sm">
          Illustrative image
        </span>
      )}

      {/* Detail drawer */}
      {active && <HotspotPanel key={active.id} hotspot={active} onClose={() => setActive(null)} onOpenProduct={(pid) => go({ name: "product", id: pid })} onEnquire={(pid) => openEnquiry({ productId: pid })} onServices={() => go({ name: "services" })} />}
    </div>
  );
}

function HotspotPanel({
  hotspot,
  onClose,
  onOpenProduct,
  onEnquire,
  onServices,
}: {
  hotspot: Hotspot;
  onClose: () => void;
  onOpenProduct: (id: string) => void;
  onEnquire: (id: string) => void;
  onServices: () => void;
}) {
  const t = hotspot.target;
  const product = t.type === "product" ? productById(t.id) : undefined;
  const service = t.type === "service" ? serviceById(t.id) : undefined;

  return (
    <aside className="absolute bottom-[13vh] right-[3.2vw] top-[13vh] z-20 flex w-[30vw] flex-col overflow-hidden rounded-3xl border border-line bg-ink/95 backdrop-blur-xl sr-anim-fade-up" aria-label={hotspot.label}>
      <TouchButton variant="glass" size="icon" className="absolute right-[1.2vw] top-[1.2vw] z-10" onClick={onClose} aria-label="Close">
        <CloseIcon />
      </TouchButton>
      {product ? (
        <>
          <ProductVisual image={product.image} eager className="h-[38%] w-full" padding="p-[10%]" />
          <div className="flex flex-1 flex-col p-[2.4vw]">
            <Eyebrow>{hotspot.label}</Eyebrow>
            <h2 className="sr-heading mt-[1.6vh] text-ivory">{product.name}</h2>
            {product.codes && <p className="sr-label mt-[1vh] text-ember">{product.codes.slice(0, 3).join(" · ")}</p>}
            {product.description && <p className="sr-body mt-[1.6vh] text-ash">{product.description}</p>}
            <div className="mt-auto flex flex-col gap-[1.2vh]">
              <TouchButton variant="primary" size="lg" onClick={() => onOpenProduct(product.id)}>
                View product <ArrowIcon />
              </TouchButton>
              <TouchButton variant="ghost" size="lg" onClick={() => onEnquire(product.id)}>
                Enquire
              </TouchButton>
            </div>
          </div>
        </>
      ) : service ? (
        <div className="flex flex-1 flex-col p-[2.4vw] pt-[8vh]">
          <Eyebrow>What We Do</Eyebrow>
          <h2 className="sr-title mt-[2vh] text-ivory">{service.name}</h2>
          <p className="sr-lead mt-[2vh] text-ash">{service.description}</p>
          <TouchButton variant="primary" size="lg" className="mt-auto" onClick={onServices}>
            See all services <ArrowIcon />
          </TouchButton>
        </div>
      ) : (
        <div className="flex flex-1 flex-col p-[2.4vw] pt-[8vh]">
          <Eyebrow>{hotspot.label}</Eyebrow>
          <h2 className="sr-heading mt-[2vh] text-ivory">Product details coming soon</h2>
        </div>
      )}
    </aside>
  );
}
