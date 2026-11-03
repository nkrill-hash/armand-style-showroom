import { spaces } from "../data/spaces";
import { useShowroom, type Screen } from "../state";
import { ArrowIcon, Logo, TouchButton } from "../components/primitives";

const TILES: { n: string; label: string; sub: string; screen: Screen }[] = [
  { n: "01", label: "Products", sub: "Hardware & fittings", screen: { name: "explore" } },
  { n: "02", label: "Spaces", sub: "Kitchen · Bedroom · Living · Office", screen: { name: "spaces" } },
  { n: "03", label: "Featured", sub: "New Edition 2026", screen: { name: "featured" } },
  { n: "04", label: "What We Do", sub: "Boards, cutting & edging", screen: { name: "services" } },
  { n: "05", label: "Projects", sub: "Our supply portfolio", screen: { name: "projects" } },
  { n: "06", label: "Contact", sub: "WhatsApp, call or visit", screen: { name: "contact" } },
];

export function Home() {
  const { go } = useShowroom();
  return (
    <div className="absolute inset-0 overflow-hidden bg-ink-deep">
      <img src={spaces[0]!.image.src} alt="" className="absolute inset-0 h-full w-full object-cover sr-anim-kenburns" />
      <div className="absolute inset-0 sr-scrim-left" />
      <div className="absolute inset-0 sr-scrim-bottom" />

      <div className="relative flex h-full flex-col px-[5vw] pt-[5vh]">
        <Logo className="w-[12vw] sr-anim-fade-up" />

        <div className="mt-[5vh] max-w-[56vw]">
          <h1 className="sr-display text-ivory [font-size:clamp(3.25rem,6vw,8rem)]">
            {["Build.", "Design.", "Transform."].map((w, i) => (
              <span key={w} className="block sr-anim-mask-up" style={{ animationDelay: `${250 + i * 180}ms` }}>
                {w}
              </span>
            ))}
          </h1>
          <p className="sr-lead mt-[3vh] max-w-[36vw] text-ivory/80 sr-anim-fade-up [animation-delay:850ms]">
            Melamine, super wood and granite tops — cut and edged to your sizes — plus the fittings to finish the job.
          </p>
          <TouchButton
            variant="primary"
            size="xl"
            className="mt-[4vh] sr-anim-fade-up [animation-delay:1000ms]"
            onClick={() => go({ name: "explore" })}
          >
            Explore Showroom <ArrowIcon />
          </TouchButton>
        </div>

        <nav className="mt-auto grid grid-cols-6 border-t border-line" aria-label="Showroom sections">
          {TILES.map((t, i) => (
            <button
              key={t.label}
              type="button"
              onClick={() => go(t.screen)}
              className="sr-touch group flex flex-col items-start border-r border-line px-[1.4vw] text-left last:border-r-0 hover:bg-ivory/5 py-[3.2vh] sr-anim-fade-up"
              style={{ animationDelay: `${1100 + i * 90}ms` }}
            >
              <span className="sr-label text-ember">{t.n}</span>
              <span className="sr-heading mt-[1.2vh] text-ivory">{t.label}</span>
              <span className="sr-body mt-[0.8vh] text-ash">{t.sub}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
