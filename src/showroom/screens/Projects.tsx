import { useState } from "react";
import { cn } from "@/lib/utils";
import { beforeAfterPairs, projectCategories, projects } from "../data/projects";
import type { Project } from "../types";
import { BeforeAfter } from "../components/BeforeAfter";
import { ArrowIcon, CloseIcon, Eyebrow, Placeholder, TouchButton } from "../components/primitives";
import { useShowroom } from "../state";

export function Projects() {
  const { openEnquiry } = useShowroom();
  const [filter, setFilter] = useState<string | null>(null);
  const [open, setOpen] = useState<Project | null>(null);
  const list = filter ? projects.filter((p) => p.category === filter) : projects;
  const pair = beforeAfterPairs[0];

  return (
    <div className="absolute inset-0 flex flex-col bg-ink px-[5vw] pb-[13vh] pt-[16vh]">
      <div className="flex items-end justify-between gap-[4vw]">
        <div className="max-w-[46vw]">
          <Eyebrow className="sr-anim-fade-up">Supply Portfolio</Eyebrow>
          <h1 className="sr-title mt-[2vh] text-ivory sr-anim-mask-up">Projects We&apos;ve Supplied</h1>
          <p className="sr-lead mt-[2vh] text-ash sr-anim-fade-up [animation-delay:200ms]">
            Kitchens, wardrobes and fit-outs made with Armand boards and fittings. Concept imagery shown while our project gallery is being photographed.
          </p>
        </div>
        <div className="flex gap-[0.8vw] sr-anim-fade-up [animation-delay:300ms]">
          {[null, ...projectCategories].map((c) => (
            <button
              key={c ?? "all"}
              type="button"
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
              className={cn("sr-touch sr-label rounded-full border px-[1.4vw] py-[1.4vh]", filter === c ? "border-ivory bg-ivory text-ink" : "border-line-strong text-ash")}
            >
              {c ?? "All"}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-[4vh] grid min-h-0 flex-1 grid-cols-[1fr_1fr_1fr_1.25fr] gap-[1.4vw]">
        {list.map((p, i) => (
          <button key={p.id} type="button" onClick={() => setOpen(p)} className="sr-touch group flex min-h-0 flex-col text-left sr-anim-fade-up" style={{ animationDelay: `${200 + i * 90}ms` }}>
            {p.images[0] ? (
              <div className="relative min-h-0 w-full flex-1 overflow-hidden rounded-3xl">
                <img src={p.images[0].src} alt={p.images[0].alt} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-active:scale-[1.03]" />
                {p.imagesAreIllustrative && <IllustrativeTag />}
              </div>
            ) : (
              <Placeholder label="Project Image" className="min-h-0 w-full flex-1 rounded-3xl" />
            )}
            <div className="mt-[2vh]">
              <div className="sr-eyebrow text-ember">{p.category}</div>
              <h2 className="sr-heading mt-[0.8vh] text-ivory">{p.name}</h2>
            </div>
          </button>
        ))}
        <div className="flex min-h-0 flex-col sr-anim-fade-up [animation-delay:500ms]">
          <div className="relative min-h-0 w-full flex-1">
            <BeforeAfter before={pair?.before ?? null} after={pair?.after ?? null} className="h-full w-full" />
            {pair?.imagesAreIllustrative && <IllustrativeTag className="bottom-[1.6vh] top-auto" />}
          </div>
          <div className="mt-[2vh]">
            <div className="sr-eyebrow text-ash-dim">Before / After</div>
            <h2 className="sr-heading mt-[0.8vh] text-ivory">{pair?.title ?? "Transformation"}</h2>
          </div>
        </div>
      </div>

      {open && (
        <div className="absolute inset-0 z-30 flex bg-ink-deep/85 backdrop-blur-xl sr-anim-fade" role="dialog" aria-modal="true" aria-label={open.name}>
          <div className="m-auto grid h-[72vh] w-[86vw] grid-cols-[60fr_40fr] overflow-hidden rounded-[2rem] border border-line bg-ink sr-anim-fade-up">
            <div className="grid grid-cols-2 grid-rows-2 gap-2 p-2">
              {(open.images.length ? open.images : [null, null, null]).slice(0, 3).map((img, n) =>
                img ? (
                  <img key={n} src={img.src} alt={img.alt} className={cn("h-full w-full rounded-2xl object-cover", n === 0 && "col-span-2 row-span-2")} />
                ) : (
                  <Placeholder key={n} label="Project Image" className={cn("rounded-2xl", n === 0 && "row-span-2")} />
                ),
              )}
            </div>
            <div className="relative flex flex-col p-[3vw]">
              <TouchButton variant="ghost" size="icon" className="absolute right-[1.6vw] top-[1.6vw]" onClick={() => setOpen(null)} aria-label="Close" autoFocus>
                <CloseIcon />
              </TouchButton>
              <Eyebrow>{open.category}</Eyebrow>
              <h2 className="sr-title mt-[2vh] text-ivory">{open.name}</h2>
              {open.location && <p className="sr-label mt-[1.6vh] text-ash">{open.location}</p>}
              {open.description && <p className="sr-lead mt-[3vh] text-ash">{open.description}</p>}
              {open.imagesAreIllustrative && <p className="sr-label mt-[3vh] text-ash-dim">Illustrative concept imagery</p>}
              <TouchButton variant="ember" size="lg" className="mt-auto self-start" onClick={() => { setOpen(null); openEnquiry(); }}>
                Start your project <ArrowIcon />
              </TouchButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function IllustrativeTag({ className }: { className?: string }) {
  return (
    <span className={cn("pointer-events-none absolute left-[1vw] top-[1.6vh] rounded-full bg-ink-deep/70 px-[0.9vw] py-[0.6vh] sr-eyebrow text-ivory/80 backdrop-blur-md [font-size:0.7rem]", className)}>
      Illustrative
    </span>
  );
}
