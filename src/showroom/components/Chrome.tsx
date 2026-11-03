import { cn } from "@/lib/utils";
import { useShowroom, type Screen } from "../state";
import { ArrowIcon, Logo, TouchButton } from "./primitives";

const NAV: { label: string; screen: Screen }[] = [
  { label: "Products", screen: { name: "explore" } },
  { label: "Spaces", screen: { name: "spaces" } },
  { label: "Featured", screen: { name: "featured" } },
  { label: "What We Do", screen: { name: "services" } },
  { label: "Projects", screen: { name: "projects" } },
];

/** Subtle persistent showroom controls: brand mark, section switcher, back/home and enquire. */
export function Chrome() {
  const { screen, canGoBack, back, home, go, openEnquiry } = useShowroom();
  if (screen.name === "home") return null;
  const section =
    screen.name === "category" || screen.name === "product"
      ? "explore"
      : screen.name === "space"
        ? "spaces"
        : screen.name;

  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-40 flex items-start justify-between px-[3.2vw] pt-[3.2vh]">
        <button
          type="button"
          onClick={home}
          className="sr-touch pointer-events-auto"
          aria-label="Home"
          onDoubleClick={() => document.documentElement.requestFullscreen?.().catch(() => {})}
        >
          <Logo className="w-[clamp(7rem,8.5vw,11rem)]" />
        </button>
        <nav className="pointer-events-auto flex items-center gap-[0.6vw] rounded-full border border-line bg-ink-deep/55 p-[0.45vh] backdrop-blur-md" aria-label="Showroom sections">
          {NAV.map((n) => {
            const active = section === n.screen.name;
            return (
              <button
                key={n.label}
                type="button"
                onClick={() => go(n.screen)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "sr-touch sr-label rounded-full px-[1.4vw] py-[1.5vh]",
                  active ? "bg-ivory text-ink" : "text-ash hover:text-ivory",
                )}
              >
                {n.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 flex items-end justify-between px-[3.2vw] pb-[3.2vh]">
        <div className="pointer-events-auto flex gap-[0.8vw]">
          {canGoBack && (
            <TouchButton variant="glass" size="md" onClick={back} aria-label="Back">
              <ArrowIcon dir="left" /> Back
            </TouchButton>
          )}
          <TouchButton variant="glass" size="md" onClick={home} aria-label="Home">
            <HomeIcon /> Home
          </TouchButton>
        </div>
        {screen.name !== "contact" && (
          <div className="pointer-events-auto flex gap-[0.8vw]">
            <TouchButton variant="glass" size="md" onClick={() => go({ name: "contact" })}>
              Contact
            </TouchButton>
            <TouchButton variant="ember" size="md" onClick={() => openEnquiry()}>
              Enquire <ArrowIcon />
            </TouchButton>
          </div>
        )}
      </div>
    </>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[1.3em] w-[1.3em]" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1z" strokeLinejoin="round" />
    </svg>
  );
}
