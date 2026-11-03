import { useEffect, useState, type ReactNode } from "react";
import heroBoards from "@/assets/hero-boards.jpg";
import { SHOWROOM_CONFIG } from "../config";
import { attractFeaturedIds } from "../data/featured";
import { productById } from "../data/products";
import { spaces } from "../data/spaces";
import { Eyebrow, Logo } from "../components/primitives";
import { ProductVisual } from "../components/ProductVisual";
import { QrCode } from "../components/QrCode";

const DURATION = SHOWROOM_CONFIG.kiosk.ATTRACT_SCENE_DURATION;

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

const PRODUCT_REEL = [
  { label: "Hinges", sub: "Brass, steel, black", src: "/showroom/web/butt-hinges.webp" },
  { label: "Handles", sub: "Levers and locksets", src: "/showroom/web/lever-handle.webp" },
  { label: "Drawer Runners", sub: "Ball-bearing, screws included", src: "/showroom/web/drawer-runners.webp" },
  { label: "Locks", sub: "Cabinet and drawer", src: "/showroom/web/cabinet-lock.webp" },
];

function SceneProducts() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % PRODUCT_REEL.length), DURATION / PRODUCT_REEL.length);
    return () => clearInterval(t);
  }, []);
  const item = PRODUCT_REEL[i]!;
  return (
    <div className="absolute inset-0 grid grid-cols-[42fr_58fr] bg-ink">
      <div className="flex flex-col justify-center px-[6vw]">
        <Eyebrow className="sr-anim-fade-up">Fittings</Eyebrow>
        <div key={item.label} className="mt-[3vh]">
          <h2 className="sr-display text-ivory sr-anim-mask-up">{item.label}</h2>
          <p className="sr-lead mt-[3vh] text-ash sr-anim-fade-up [animation-delay:250ms]">{item.sub}</p>
        </div>
        <div className="mt-[6vh] flex gap-3">
          {PRODUCT_REEL.map((p, n) => (
            <span key={p.label} className={n === i ? "h-[3px] w-14 bg-ember" : "h-[3px] w-14 bg-line-strong"} />
          ))}
        </div>
      </div>
      <div key={item.src} className="relative sr-anim-reveal-x">
        <ProductVisual image={{ src: item.src, alt: item.label, style: "cutout" }} eager className="absolute inset-0" padding="p-[12%]" imgClassName="sr-anim-kenburns" />
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
      <img src={heroBoards} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70 sr-anim-kenburns-rev" />
      <div className="absolute inset-0 sr-scrim-left" />
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
      <img src={spaces[1]!.image.src} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35 sr-anim-kenburns" />
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
  SceneProducts,
  SceneSpaces,
  SceneWhatWeDo,
  SceneFeatured,
  SceneCta,
];

/* ─── Attract loop ───────────────────────────────────────────────────────── */

export function Attract({ onStart }: { onStart: () => void }) {
  const [state, setState] = useState({ current: 0, prev: -1, cycle: 0 });

  useEffect(() => {
    const t = setTimeout(() => {
      setState((s) => {
        const next = (s.current + 1) % SCENES.length;
        return { current: next, prev: s.current, cycle: next === 0 ? s.cycle + 1 : s.cycle };
      });
    }, DURATION);
    return () => clearTimeout(t);
  }, [state.current]);

  // Preload imagery for the upcoming scenes
  useEffect(() => {
    [heroBoards, ...spaces.map((s) => s.image.src), ...PRODUCT_REEL.map((p) => p.src)].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const onKey = () => onStart();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onStart]);

  const Current = SCENES[state.current]!;
  const Prev = state.prev >= 0 ? SCENES[state.prev]! : null;

  return (
    <div
      className="absolute inset-0 z-30 cursor-pointer overflow-hidden bg-ink-deep"
      onPointerDown={onStart}
      role="button"
      aria-label="Touch to explore the Armand showroom"
    >
      {Prev && (
        <div key={`p-${state.prev}-${state.cycle}`} className="absolute inset-0">
          <Prev />
        </div>
      )}
      <div key={`c-${state.current}-${state.cycle}`} className="absolute inset-0 sr-anim-fade [animation-duration:1.4s]">
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
                  style={{ animationDuration: `${DURATION}ms` }}
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
          <span className="sr-label sr-anim-breathe">Touch to explore</span>
        </div>
      </div>
    </div>
  );
}
