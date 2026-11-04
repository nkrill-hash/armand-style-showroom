import { useState } from "react";
import { cn } from "@/lib/utils";
import { spaces } from "../data/spaces";
import { useShowroom } from "../state";
import { ArrowIcon, Eyebrow } from "../components/primitives";

export function Spaces() {
  const { go } = useShowroom();
  const [focus, setFocus] = useState(0);
  return (
    <div className="absolute inset-0 bg-ink-deep">
      <div className="absolute inset-0 flex">
        {spaces.map((s, i) => {
          const open = focus === i;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => (open ? go({ name: "space", id: s.id }) : setFocus(i))}
              onFocus={() => setFocus(i)}
              aria-label={open ? `Explore ${s.name}` : s.name}
              className={cn(
                "group relative h-full overflow-hidden border-r border-ink-deep text-left transition-[flex-grow] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none sr-anim-reveal-x",
                open ? "grow-[3.2]" : "grow",
              )}
              style={{ flexBasis: 0, animationDelay: `${i * 140}ms` }}
            >
              <img
                src={s.image.src}
                alt={s.image.alt}
                className={cn("absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms]", open ? "scale-100" : "scale-110")}
                draggable={false}
              />
              <div className={cn("absolute inset-0 sr-scrim-bottom transition-opacity duration-700", open ? "opacity-100" : "opacity-80")} />
              <div className={cn("absolute inset-0 bg-ink-deep transition-opacity duration-700", open ? "opacity-0" : "opacity-40")} />
              <div className="absolute bottom-[14vh] left-[2.6vw] right-[2.6vw]">
                <span className="sr-label text-ember">0{i + 1}</span>
                <h2 className={cn("mt-[1vh] text-ivory transition-all duration-700", open ? "sr-display" : "sr-heading")}>{s.name}</h2>
                <div className={cn("overflow-hidden transition-all duration-700", open ? "max-h-[30vh] opacity-100" : "max-h-0 opacity-0")}>
                  <p className="sr-lead mt-[2vh] max-w-[36vw] text-ivory/85">{s.intro}</p>
                  <span className="sr-label mt-[3vh] inline-flex items-center gap-3 rounded-full bg-ivory px-[1.6vw] py-[1.6vh] text-ink">
                    Explore the {s.name.toLowerCase()} <ArrowIcon />
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      <div className="pointer-events-none absolute left-[5vw] top-[17vh]">
        <Eyebrow className="sr-anim-fade-up">Explore Spaces</Eyebrow>
        <p className="sr-body mt-[1.4vh] text-ash sr-anim-fade [animation-delay:400ms]">Inspiration imagery</p>
      </div>
    </div>
  );
}
