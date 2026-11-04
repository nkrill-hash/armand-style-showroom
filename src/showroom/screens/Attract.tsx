import { useEffect, useState, type ReactNode } from "react";
import heroBoards from "@/assets/hero-boards.jpg";
import boardFinishes from "@/assets/real/board-finishes-wall.jpg";
import { SHOWROOM_CONFIG } from "../config";
import { attractFeaturedIds } from "../data/featured";
import { productById } from "../data/products";
import { spaces } from "../data/spaces";
import { kits, type KitItem } from "../data/kits";
import type { ProductImage } from "../types";
import { Eyebrow, Logo } from "../components/primitives";
import { ProductVisual } from "../components/ProductVisual";
import { QrCode } from "../components/QrCode";

const DURATION = SHOWROOM_CONFIG.kiosk.ATTRACT_SCENE_DURATION;
const sceneDuration = (n: number) => (SCENES[n] === SceneKitchenKit ? KIT_DURATION : DURATION);

/* ─── Scenes ─────────────────────────────────────────────────────────────── */

function SceneOpening() {
  return (
    <div className="absolute inset-0 bg-ink-deep">
      <img src={heroBoards} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40 sr-anim-kenburns" />
      <div className="absolute inset-0 sr-vignette" />
      <div className="relative flex h-full flex-col items-center justify-center text-center">
        <Logo className="w-[24vw] sr-anim-fade-up" />
        <div className="sr-hairline mt-[5vh] w-[36vw] sr-anim-line [animation-delay:500ms]" />
        <h1 className="sr-display mt-[5vh] flex gap-[1.8vw] text-ivory [font-size:clamp(3rem,6.2vw,8rem)]">
          {["Build.", "Design.", "Transform."].map((w, i) => (
            <span key={w} className="sr-anim-mask-up" style={{ animationDelay: `${700 + i * 450}ms` }}>
              {w}
            </span>
          ))}
        </h1>
        <p className="sr-eyebrow mt-[4vh] text-ash sr-anim-fade [animation-delay:2200ms]">
          {SHOWROOM_CONFIG.brand.strapline}
        </p>
      </div>
    </div>
  );
}

function SceneBuiltToLast() {
  const kitchen = spaces[0]!.image.src;
  return (
    <div className="absolute inset-0 bg-ink-deep">
      <img src={kitchen} alt="" className="absolute inset-0 h-full w-full object-cover sr-anim-kenburns-rev" />
      <div className="absolute inset-0 sr-scrim-left" />
      <div className="relative flex h-full flex-col justify-center px-[7vw]">
        <Eyebrow className="sr-anim-fade-up">{SHOWROOM_CONFIG.brand.fullName}</Eyebrow>
        <h2 className="sr-display mt-[3vh] text-ivory">
          <span className="block sr-anim-mask-up [animation-delay:300ms]">Built to</span>
          <span className="block text-ember sr-anim-mask-up [animation-delay:650ms]">last.</span>
        </h2>
        <p className="sr-lead mt-[4vh] max-w-[34vw] text-ivory/85 sr-anim-fade-up [animation-delay:1100ms]">
          Precision cutting, expert edging and professional assembly.
        </p>
      </div>
    </div>
  );
}

const KITCHEN_KIT = kits.find((k) => k.id === "kitchen")!;
/** Kitchen gets longer on screen: the whole list appears at once, no cycling. */
const KIT_DURATION = 13000;

function kitImage(item: KitItem): ProductImage | null {
  if (item.kind === "service") return { src: item.image, alt: item.title, style: "photo" };
  return productById(item.productId)?.image ?? null;
}
function kitTitle(item: KitItem) {
  return item.kind === "service" ? item.title : (productById(item.productId)?.name ?? "");
}

function SceneKitchenKit() {
  const kit = KITCHEN_KIT;
  return (
    <div className="absolute inset-0 grid grid-cols-[32fr_68fr] bg-ink">
      <div className="relative flex flex-col justify-center overflow-hidden px-[5vw]">
        <img src={kit.hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30 sr-anim-kenburns" />
        <div className="absolute inset-0 sr-scrim-left" />
        <div className="relative">
          <Eyebrow className="sr-anim-fade-up">{kit.room}</Eyebrow>
          <h2 className="sr-title mt-[3vh] text-ivory">
            <span className="block sr-anim-mask-up [animation-delay:200ms]">All you need</span>
            <span className="block text-ember sr-anim-mask-up [animation-delay:500ms]">for your kitchen.</span>
          </h2>
          <p className="sr-lead mt-[3vh] text-ash sr-anim-fade-up [animation-delay:900ms]">{kit.intro}</p>
          <p className="sr-label mt-[5vh] text-ivory sr-anim-fade-up [animation-delay:2600ms]">
            WhatsApp your list · <span className="whitespace-nowrap text-ember">{SHOWROOM_CONFIG.contact.whatsappDisplay}</span>
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 grid-rows-3 gap-[1.2vw] py-[7vh] pl-[1vw] pr-[4vw] pb-[12vh]">
        {kit.items.map((item, n) => (
          <div key={n} className="flex min-h-0 flex-col sr-anim-fade-up" style={{ animationDelay: `${900 + n * 160}ms` }}>
            <ProductVisual image={kitImage(item)} eager className="min-h-0 flex-1 rounded-2xl" padding="p-[8%]" />
            <div className="mt-[1vh] flex items-baseline justify-between gap-[1vw]">
              <h3 className="truncate font-display text-[clamp(1rem,1.15vw,1.5rem)] font-semibold text-ivory">{kitTitle(item)}</h3>
              <span className="sr-label shrink-0 text-ash-dim">{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SceneSpaces() {
  return (
    <div className="absolute inset-0 flex bg-ink-deep">
      {spaces.map((s, i) => (
        <div key={s.id} className="relative flex-1 overflow-hidden border-r border-ink-deep sr-anim-reveal-x" style={{ animationDelay: `${i * 350}ms` }}>
          <img src={s.image.src} alt="" className="absolute inset-0 h-full w-full object-cover sr-anim-kenburns" style={{ animationDelay: `${i * 350}ms` }} />
          <div className="absolute inset-0 sr-scrim-bottom" />
          <div className="absolute bottom-[10vh] left-[2.4vw]">
            <span className="sr-eyebrow text-ash">0{i + 1}</span>
            <h3 className="sr-title mt-[1vh] text-ivory">{s.name}</h3>
          </div>
        </div>
      ))}
      <div className="absolute left-[3vw] top-[7vh]">
        <Eyebrow className="sr-anim-fade-up [animation-delay:1500ms]">Designed &amp; Fitted</Eyebrow>
      </div>
    </div>
  );
}

const WORDS = ["Boards", "Cutting", "Edging", "Fittings"];
function SceneWhatWeDo() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => Math.min(n + 1, WORDS.length - 1)), DURATION / (WORDS.length + 1));
    return () => clearInterval(t);
  }, []);
  return (
    <div className="absolute inset-0 bg-ink-deep">
      <figure className="absolute inset-y-0 right-0 w-[48vw] overflow-hidden sr-anim-fade [animation-delay:300ms]">
        <img src={boardFinishes} alt="Board finishes on the Armand showroom wall, Bulawayo" className="h-full w-full object-cover sr-anim-kenburns" />
        <div className="absolute inset-y-0 left-0 w-[14vw] bg-gradient-to-r from-ink-deep to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[34vh]" style={{ background: "linear-gradient(to top, color-mix(in oklab, var(--sr-ink-deep) 92%, transparent), transparent)" }} />
        <figcaption className="absolute bottom-[12vh] right-[3vw] sr-label text-ivory">
          <span className="mr-[0.6vw] inline-block h-[0.25vh] w-[2vw] -translate-y-[0.4vh] bg-ember align-middle" />
          Board finishes on our showroom wall
        </figcaption>
      </figure>
      <div className="relative flex h-full flex-col justify-center px-[7vw]">
        <Eyebrow className="sr-anim-fade-up">What We Do</Eyebrow>
        <ul className="mt-[3vh]">
          {WORDS.map((w, n) => (
            <li
              key={w}
              className={`sr-display transition-all duration-1000 ${n === i ? "text-ivory" : n < i ? "text-ash-dim/60" : "text-ash-dim/25"}`}
            >
              {w}
            </li>
          ))}
        </ul>
        <p className="sr-lead mt-[4vh] max-w-[34vw] text-ash sr-anim-fade-up [animation-delay:600ms]">
          From raw board to the final handle — everything for a finished job, under one roof.
        </p>
      </div>
    </div>
  );
}

function SceneFeatured() {
  const items = attractFeaturedIds.map(productById).filter(Boolean);
  return (
    <div className="absolute inset-0 flex flex-col bg-ink px-[6vw] pt-[9vh]">
      <div className="flex items-end justify-between">
        <div>
          <Eyebrow className="sr-anim-fade-up">New Edition 2026</Eyebrow>
          <h2 className="sr-title mt-[2vh] text-ivory sr-anim-mask-up [animation-delay:200ms]">Product Range 2026</h2>
        </div>
        <p className="sr-heading text-ash sr-anim-fade [animation-delay:800ms]">
          <span className="text-ember">700+</span> products in catalogue
        </p>
      </div>
      <div className="mt-[6vh] grid flex-1 grid-cols-3 gap-[2vw] pb-[12vh]">
        {items.map((p, i) => (
          <div key={p!.id} className="flex flex-col sr-anim-fade-up" style={{ animationDelay: `${500 + i * 300}ms` }}>
            <ProductVisual image={p!.image} eager float className="flex-1 rounded-3xl" padding="p-[14%]" />
            <div className="mt-[2.4vh] flex items-baseline justify-between">
              <h3 className="sr-heading text-ivory">{p!.name}</h3>
              {p!.codes && <span className="sr-label text-ash-dim">{p!.codes[0]}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SceneCta() {
  return (
    <div className="absolute inset-0 bg-ink-deep">
      <img src={spaces[2]!.image.src} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35 sr-anim-kenburns" />
      <div className="absolute inset-0 sr-vignette" />
      <div className="relative grid h-full grid-cols-[1fr_auto] items-center gap-[6vw] px-[7vw]">
        <div>
          <Logo className="w-[16vw] sr-anim-fade-up" />
          <h2 className="sr-display mt-[5vh] text-ivory">
            <span className="block sr-anim-mask-up [animation-delay:300ms]">Explore</span>
            <span className="block sr-anim-mask-up [animation-delay:600ms]">Armand</span>
          </h2>
          <p className="sr-lead mt-[4vh] text-ash sr-anim-fade-up [animation-delay:1000ms]">
            Touch the screen to browse products, spaces and more.
          </p>
        </div>
        <div className="w-[17vw] sr-anim-fade-up [animation-delay:1200ms]">
          <QrCode value={SHOWROOM_CONFIG.qrDestination} label={SHOWROOM_CONFIG.contact.websiteDisplay} />
        </div>
      </div>
    </div>
  );
}

const SCENES: (() => ReactNode)[] = [
  SceneOpening,
  SceneBuiltToLast,
  SceneKitchenKit,
  SceneSpaces,
  SceneWhatWeDo,
  SceneFeatured,
  SceneCta,
];

/* ─── Attract loop ───────────────────────────────────────────────────────── */

export function Attract({ onStart, tv = false }: { onStart?: () => void; tv?: boolean }) {
  const [state, setState] = useState({ current: 0, prev: -1, cycle: 0 });

  useEffect(() => {
    const t = setTimeout(() => {
      setState((s) => {
        const next = (s.current + 1) % SCENES.length;
        return { current: next, prev: s.current, cycle: next === 0 ? s.cycle + 1 : s.cycle };
      });
    }, sceneDuration(state.current));
    return () => clearTimeout(t);
  }, [state.current]);

  // Preload imagery for the upcoming scenes
  useEffect(() => {
    [heroBoards, boardFinishes, ...spaces.map((s) => s.image.src), ...KITCHEN_KIT.items.map((it) => kitImage(it)?.src ?? "")].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    if (tv || !onStart) return;
    const onKey = () => onStart();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onStart, tv]);

  const Current = SCENES[state.current]!;
  const Prev = state.prev >= 0 ? SCENES[state.prev]! : null;

  return (
    <div
      className={`absolute inset-0 z-30 overflow-hidden bg-ink-deep ${tv ? "cursor-none" : "cursor-pointer"}`}
      onPointerDown={tv ? undefined : onStart}
      role={tv ? undefined : "button"}
      aria-label={tv ? "Armand showroom display" : "Touch to explore the Armand showroom"}
    >
      {Prev && (
        <div key={`${state.prev}-${state.prev > state.current ? state.cycle - 1 : state.cycle}`} className="absolute inset-0">
          <Prev />
        </div>
      )}
      <div key={`${state.current}-${state.cycle}`} className="absolute inset-0 sr-anim-fade [animation-duration:1.4s]">
        <Current />
      </div>

      {/* progress + call to touch */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between px-[4vw] pb-[4.5vh]">
        <div className="flex gap-2">
          {SCENES.map((_, n) => (
            <span key={n} className="relative h-[3px] w-[3vw] overflow-hidden bg-line">
              {n === state.current && (
                <span
                  key={`${n}-${state.cycle}`}
                  className="absolute inset-0 bg-ivory sr-anim-progress"
                  style={{ animationDuration: `${sceneDuration(n)}ms` }}
                />
              )}
              {n < state.current && <span className="absolute inset-0 bg-ivory/60" />}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-5 text-ivory">
          <span className="relative flex h-6 w-6 items-center justify-center">
            <span className="absolute inset-0 rounded-full border-2 border-ember sr-pulse-ring" />
            <span className="h-3 w-3 rounded-full bg-ember" />
          </span>
          <span className="sr-label sr-anim-breathe">
            {tv ? `WhatsApp ${SHOWROOM_CONFIG.contact.whatsappDisplay}` : "Touch to explore"}
          </span>
        </div>
      </div>
    </div>
  );
}
