import heroBoards from "@/assets/hero-boards.jpg";
import { processSteps, services } from "../data/services";
import { Eyebrow } from "../components/primitives";

export function Services() {
  return (
    <div className="absolute inset-0 grid grid-cols-[40fr_60fr] bg-ink">
      <div className="relative overflow-hidden">
        <img src={heroBoards} alt="Stacked melamine boards with edge banding" className="absolute inset-0 h-full w-full object-cover sr-anim-kenburns [animation-duration:28s]" />
        <div className="absolute inset-0 sr-scrim-bottom" />
        <div className="absolute bottom-[17vh] left-[5vw] right-[3vw]">
          <Eyebrow className="sr-anim-fade-up">What We Do</Eyebrow>
          <h1 className="sr-title mt-[2vh] text-ivory sr-anim-mask-up">
            Boards, Cutting <br />&amp; Fittings
          </h1>
          <p className="sr-lead mt-[2vh] text-ivory/85 sr-anim-fade-up [animation-delay:200ms]">
            From raw board to the final handle — everything for a finished job, under one roof.
          </p>
        </div>
      </div>

      <div className="flex flex-col px-[3.6vw] pb-[13vh] pt-[16vh]">
        <div className="grid flex-1 grid-cols-2 grid-rows-4 border-t border-line">
          {services.map((s, i) => (
            <div key={s.id} className="flex flex-col justify-center border-b border-line pr-[2vw] odd:border-r odd:pr-[2vw] even:pl-[2vw] sr-anim-fade-up" style={{ animationDelay: `${150 + i * 70}ms` }}>
              <div className="flex items-baseline gap-[1vw]">
                <span className="sr-label text-ember">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="sr-heading text-ivory">{s.name}</h2>
              </div>
              <p className="sr-body mt-[0.8vh] text-ash">{s.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-[3vh] grid grid-cols-4 gap-[1.4vw] sr-anim-fade-up [animation-delay:800ms]">
          {processSteps.map((p) => (
            <div key={p.n} className="rounded-2xl bg-ink-raised p-[1.2vw]">
              <span className="sr-label text-ash-dim">Step {p.n}</span>
              <div className="sr-label mt-[0.8vh] text-ivory">{p.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
