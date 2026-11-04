import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import boardsStock from "@/assets/tv-boards-stock.jpg";
import cutting from "@/assets/tv-cutting.jpg";
import edging from "@/assets/tv-edging.jpg";
import granite from "@/assets/tv-granite.jpg";
import kitchen from "@/assets/project-kitchen.jpg";
import kitchenBefore from "@/assets/project-kitchen-before.jpg";
import wardrobe from "@/assets/project-wardrobe.jpg";
import office from "@/assets/project-office.jpg";
import { SHOWROOM_CONFIG } from "../config";
import { productById, products as allProducts } from "../data/products";
import { processSteps } from "../data/services";
import { kits, type Kit, type KitItem } from "../data/kits";
import { buildWhatsAppLink } from "../lib/links";
import { Logo } from "../components/primitives";
import { QrCode } from "../components/QrCode";
import type { Product } from "../types";

/**
 * Hands-free marketing loop for TVs (no touch).
 * Visual direction: trade-catalogue / shop signage — a fixed charcoal
 * "broadcast frame" (header + contact strip), light paper stages, hard-edged
 * photo frames with captions, real catalogue products and codes.
 * Every scene carries continuous motion (camera moves, sequenced reveals,
 * marquees, counters) so the screen never sits still.
 * Every scene keeps the WhatsApp number and address on screen.
 * Room/workshop photos are AI concept images and carry an "Illustrative" caption.
 */

const { SCENE_DURATION, RELOAD_EVERY_HOURS } = SHOWROOM_CONFIG.tv;
const { contact, brand } = SHOWROOM_CONFIG;
const WA_LINK = buildWhatsAppLink(contact.whatsappNumber, "Hi Armand, I saw you on the showroom screen and would like a quote.") ?? contact.website;

/** Time the scene is hidden under the transition sweep before it shows. */
const REVEAL = 650;

const byIds = (ids: string[]) => ids.map(productById).filter((p): p is Product => p !== undefined);

/** Only products with sharp photos are shown on the big screen. */
const SHARP = allProducts.filter((p) => p.image && /\/showroom\/(hd|web)\//.test(p.image.src));
const ALL_IMAGES = [boardsStock, cutting, edging, granite, kitchen, kitchenBefore, wardrobe, office, ...SHARP.map((p) => p.image!.src), ...SHARP.flatMap((p) => (p.inUse ? [p.inUse.src] : []))];

/* ─── Building blocks ─────────────────────────────────────────────────────── */

const rise = (ms: number): CSSProperties => ({ animationDelay: `${ms + REVEAL}ms` });

function useTicker(count: number, every: number, startAfter = REVEAL) {
  const [i, setI] = useState(0);
  useEffect(() => {
    let t: ReturnType<typeof setInterval> | undefined;
    const s = setTimeout(() => {
      t = setInterval(() => setI((n) => (n + 1) % count), every);
    }, startAfter);
    return () => {
      clearTimeout(s);
      if (t) clearInterval(t);
    };
  }, [count, every, startAfter]);
  return i;
}

function useCountUp(target: number, delay: number, duration = 1800) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now() + delay;
    const step = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - start) / duration));
      setV(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, delay, duration]);
  return v;
}

/** Section tag, e.g. "02 — Kitchens". */
function Tag({ n, children, tone = "ink", delay = 100 }: { n?: string; children: ReactNode; tone?: "ink" | "ivory"; delay?: number }) {
  return (
    <p className={`sr-tv-tag flex items-center gap-[0.9vw] sr-tv-slide-l ${tone === "ink" ? "text-ink-on-bone/70" : "text-ivory/70"}`} style={rise(delay)}>
      {n && <span className="bg-ember px-[0.5vw] py-[0.3vh] text-ivory">{n}</span>}
      <span>{children}</span>
    </p>
  );
}

type Move = "a" | "b" | "c";
const MOVE: Record<Move, string> = { a: "sr-tv-kb-a", b: "sr-tv-kb-b", c: "sr-tv-kb-c" };

/** Hard-edged photo with a printed caption underneath and a slow camera move. */
function Plate({ src, caption, className = "", move = "a", delay = 0, children }: { src: string; caption: string; className?: string; move?: Move; delay?: number; children?: ReactNode }) {
  return (
    <figure className={`flex min-h-0 flex-col ${className}`}>
      <div className="relative min-h-0 flex-1 overflow-hidden bg-ink sr-anim-reveal-x" style={rise(delay)}>
        <img src={src} alt="" className={`absolute inset-0 h-full w-full object-cover ${MOVE[move]}`} />
        {children}
      </div>
      <figcaption className="mt-[1.2vh] flex justify-between sr-tv-tag text-ink-on-bone/55 [font-size:0.78rem]">
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}

function Bone({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`absolute inset-0 bg-bone text-ink-on-bone ${className}`}>{children}</div>;
}

function Dark({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`absolute inset-0 bg-ink text-ivory ${className}`}>{children}</div>;
}

/* ─── Scenes ─────────────────────────────────────────────────────────────── */

const OPEN_WORDS = ["Boards.", "Cutting.", "Edging.", "Fittings."];

function SceneOpen() {
  return (
    <Bone className="grid grid-cols-[44fr_56fr] gap-[3vw] px-[4vw] py-[5vh]">
      <div className="flex flex-col justify-between">
        <Logo tone="color" className="w-[17vw] sr-tv-slide-l" />
        <div>
          <p className="sr-tv-tag text-ember sr-tv-rise" style={rise(200)}>
            Everything for the job
          </p>
          <ul className="mt-[2vh] border-t border-ink-on-bone/20">
            {OPEN_WORDS.map((w, n) => (
              <li key={w} className="flex items-baseline gap-[1.2vw] border-b border-ink-on-bone/20 py-[1vh] sr-tv-slide-l" style={rise(450 + n * 380)}>
                <span className="w-[2.6vw] sr-tv-tag text-ember sr-tv-num">{String(n + 1).padStart(2, "0")}</span>
                <span className="sr-tv-h2">{w}</span>
              </li>
            ))}
          </ul>
          <p className="sr-tv-body mt-[3vh] max-w-[32vw] text-ink-on-bone/75 sr-tv-rise" style={rise(2200)}>
            Board supply, precision cutting, edging and hardware — on Khami Rd, Bulawayo.
          </p>
        </div>
      </div>
      <Plate src={boardsStock} caption="Board stock" move="a" />
    </Bone>
  );
}

/** Studio shot on the shelf, then the same part fitted in a room. */
const SHELF_TO_HOME = ["neo-mixer", "enviro-bins", "garment-rack"];
const UNVEIL_AT = 2600;
const UNVEIL_STAGGER = 700;

function SceneShelfToHome() {
  const items = byIds(SHELF_TO_HOME).filter((p) => p.image && p.inUse);
  return (
    <Bone className="flex flex-col px-[4vw] py-[4.5vh]">
      <div className="flex items-end justify-between border-b-2 border-ink-on-bone pb-[2vh]">
        <div>
          <Tag n="02">On the shelf, then in your home</Tag>
          <h2 className="sr-tv-h2 mt-[1.6vh] sr-tv-rise" style={rise(200)}>
            From our shelves to your home.
          </h2>
        </div>
        <p className="max-w-[26vw] text-right sr-tv-body text-ink-on-bone/70 sr-tv-rise" style={rise(400)}>
          Every part on our shelves, ready to fit.
        </p>
      </div>
      <div className="mt-[3vh] grid min-h-0 flex-1 grid-cols-3 gap-[2vw]">
        {items.map((p, i) => {
          const at = UNVEIL_AT + i * UNVEIL_STAGGER;
          return (
            <figure key={p.id} className="flex min-h-0 flex-col sr-tv-rise" style={rise(500 + i * 180)}>
              <div className="relative min-h-0 flex-1 overflow-hidden bg-ivory">
                <img src={p.inUse!.src} alt={p.inUse!.alt} className="absolute inset-0 h-full w-full object-cover sr-tv-kb-c" />
                <div className="absolute inset-0 bg-ivory sr-tv-unveil" style={rise(at)}>
                  <img src={p.image!.src} alt={p.image!.alt} className="absolute inset-0 h-full w-full object-contain mix-blend-multiply" />
                </div>
                <span className="absolute inset-y-0 w-[0.35vw] -translate-x-1/2 bg-ember sr-tv-unveil-bar" style={rise(at)} />
                <span className="absolute left-[1vw] top-[1.6vh] bg-ink px-[0.7vw] py-[0.4vh] sr-tv-tag text-ivory [font-size:0.75rem]">
                  <span className="sr-tv-in" style={rise(at)}>Fitted</span>
                </span>
              </div>
              <figcaption className="mt-[1.6vh] flex items-baseline justify-between gap-[1vw] border-b border-ink-on-bone/15 pb-[1.2vh]">
                <span className="font-display text-[clamp(1.2rem,1.6vw,2.1rem)] font-semibold leading-tight">{p.name}</span>
                <span className="whitespace-nowrap sr-tv-tag text-ember">{p.codes?.[0] ?? "In stock"}</span>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </Bone>
  );
}

function SceneBeforeAfter() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-ink">
      <img src={kitchenBefore} alt="" className="absolute inset-0 h-full w-full object-cover sr-tv-kb-c" />
      <div className="absolute inset-0 sr-tv-ba-clip">
        <img src={kitchen} alt="" className="absolute inset-0 h-full w-full object-cover sr-tv-kb-c" />
      </div>
      <div className="absolute inset-y-0 w-[0.35vw] -translate-x-1/2 bg-ember sr-tv-ba-handle">
        <span className="absolute left-1/2 top-1/2 grid h-[7vh] w-[7vh] -translate-x-1/2 -translate-y-1/2 place-items-center bg-ember font-display text-[3vh] font-semibold text-ivory">
          ⇆
        </span>
      </div>
      <span className="absolute right-[2vw] top-[3vh] bg-ivory px-[1vw] py-[0.9vh] sr-tv-tag text-ink-on-bone">Before · bare shell</span>
      <span className="absolute left-[2vw] top-[3vh] bg-ember px-[1vw] py-[0.9vh] sr-tv-tag text-ivory">After · fitted kitchen</span>
      <div className="absolute bottom-[4vh] left-[2vw] max-w-[36vw] bg-bone p-[2vw] text-ink-on-bone sr-tv-slide-l" style={rise(200)}>
        <Tag n="03" delay={300}>
          Before &amp; after
        </Tag>
        <h2 className="sr-tv-h2 mt-[1.6vh] sr-tv-rise" style={rise(450)}>
          Bring us the empty room and your sizes.
        </h2>
      </div>
    </div>
  );
}

/** Example cutting layout on one board (diagram, not to scale). */
const PIECES = [
  { x: 0, y: 0, w: 380, h: 300, l: "A" },
  { x: 0, y: 300, w: 380, h: 260, l: "A" },
  { x: 380, y: 0, w: 320, h: 560, l: "C" },
  { x: 700, y: 0, w: 300, h: 300, l: "D" },
  { x: 700, y: 300, w: 300, h: 260, l: "B" },
];
const CUTS = ["M380 0V560", "M700 0V560", "M0 300H380", "M700 300H1000"];
const CUT_ROWS = [
  ["A", "White melamine", "720 × 560", "×4"],
  ["B", "White melamine", "720 × 300", "×6"],
  ["C", "Oak super wood", "2000 × 600", "×2"],
  ["D", "Grey melamine", "900 × 450", "×3"],
];

function SceneCutting() {
  return (
    <Bone className="grid grid-cols-[42fr_58fr] gap-[3vw] px-[4vw] py-[5vh]">
      <Plate src={cutting} caption="Panel saw, cut to size" move="c" />
      <div className="flex min-h-0 flex-col justify-center">
        <Tag n="04">Precision cutting</Tag>
        <h2 className="sr-tv-h2 mt-[2vh] sr-tv-rise" style={rise(200)}>
          Send your sizes. We cut.
        </h2>
        <div className="relative mt-[2.6vh] self-start border-2 border-ink-on-bone bg-ivory p-[0.8vw] sr-tv-rise" style={rise(400)}>
          <svg viewBox="0 0 1000 560" className="block h-[30vh] w-auto" aria-hidden>
            {PIECES.map((p, i) => (
              <g key={i} className="sr-tv-pop" style={{ ...rise(1700 + i * 260), transformOrigin: `${p.x + p.w / 2}px ${p.y + p.h / 2}px` }}>
                <rect x={p.x + 6} y={p.y + 6} width={p.w - 12} height={p.h - 12} className="fill-ember/15" />
                <text x={p.x + p.w / 2} y={p.y + p.h / 2 + 22} textAnchor="middle" className="fill-ink-on-bone font-display text-[64px] font-semibold">
                  {p.l}
                </text>
              </g>
            ))}
            <rect x="3" y="3" width="994" height="554" pathLength={1} className="fill-none stroke-ink-on-bone sr-tv-draw [stroke-width:6]" style={rise(500)} />
            {CUTS.map((d, i) => (
              <path key={d} d={d} pathLength={1} className="fill-none stroke-ember sr-tv-draw [stroke-width:6]" style={rise(900 + i * 220)} />
            ))}
          </svg>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-full overflow-hidden">
            <div className="absolute inset-y-0 w-[0.3vw] bg-ember/80 sr-tv-saw" style={rise(800)} />
          </div>
        </div>
        <div className="mt-[1.6vh] grid grid-cols-2 gap-x-[2vw]">
          {CUT_ROWS.map((r, i) => (
            <p key={r[0]} className="flex items-baseline gap-[0.8vw] border-b border-ink-on-bone/15 py-[0.9vh] sr-tv-num sr-tv-slide-r [font-size:clamp(1rem,1.1vw,1.45rem)]" style={rise(2600 + i * 220)}>
              <span className="font-display font-semibold text-ember">{r[0]}</span>
              <span className="truncate">{r[1]}</span>
              <span className="ml-auto whitespace-nowrap font-medium">
                {r[2]} <span className="text-ink-on-bone/55">{r[3]}</span>
              </span>
            </p>
          ))}
        </div>
        <p className="sr-tv-body mt-[2vh] text-ink-on-bone/75 sr-tv-rise" style={rise(3600)}>
          WhatsApp your list to <strong className="font-semibold text-ink-on-bone">{contact.whatsappDisplay}</strong>. <span className="text-ink-on-bone/50">Example layout.</span>
        </p>
      </div>
    </Bone>
  );
}

function FullPhoto({ src, n, tag, title, text, side = "left", move = "a", facts }: { src: string; n: string; tag: string; title: string; text: string; side?: "left" | "right"; move?: Move; facts?: string[] }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-ink">
      <img src={src} alt="" className={`absolute inset-0 h-full w-full object-cover ${MOVE[move]}`} />
      <div
        className={`absolute bottom-[5vh] w-[34vw] bg-bone p-[2.4vw] text-ink-on-bone ${side === "left" ? "left-[4vw] sr-tv-slide-l" : "right-[4vw] sr-tv-slide-r"}`}
        style={rise(150)}
      >
        <span className="absolute inset-y-0 left-0 w-[0.4vw] origin-top bg-ember sr-anim-line" style={rise(500)} />
        <Tag n={n} delay={350}>
          {tag}
        </Tag>
        <h2 className="sr-tv-h2 mt-[2vh] sr-tv-rise" style={rise(500)}>
          {title}
        </h2>
        <p className="sr-tv-body mt-[1.8vh] text-ink-on-bone/75 sr-tv-rise" style={rise(700)}>
          {text}
        </p>
        {facts && (
          <div className="mt-[2.4vh] flex flex-wrap gap-[0.6vw]">
            {facts.map((f, i) => (
              <span key={f} className="border border-ink-on-bone/25 px-[0.8vw] py-[0.6vh] sr-tv-tag text-ink-on-bone/80 sr-tv-pop" style={rise(1100 + i * 260)}>
                {f}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SceneEdging() {
  return (
    <FullPhoto
      src={edging}
      n="05"
      tag="Edging"
      move="c"
      title="A clean edge on every cut."
      text="Expert edging for a clean, durable finish on every cut edge."
      facts={["Cut", "Edged", "Ready to assemble"]}
    />
  );
}

function SceneGranite() {
  return <FullPhoto src={granite} n="07" side="right" move="b" tag="Granite" title="Granite tops." text="For kitchens, vanities and counters." facts={["Kitchens", "Vanities", "Counters"]} />;
}

function SceneHowItWorks() {
  const gap = 900;
  return (
    <div className="absolute inset-0 flex flex-col bg-ember px-[4vw] py-[5vh] text-ink-on-bone">
      <p className="sr-tv-tag text-ink-on-bone/70 sr-tv-rise" style={rise(0)}>
        How it works
      </p>
      <h2 className="sr-tv-h1 mt-[2vh] max-w-[70vw] sr-tv-rise" style={rise(150)}>
        Price and delivery confirmed within 2 hours.
      </h2>
      <p className="sr-tv-tag mt-[1.6vh] text-ink-on-bone/70 sr-tv-rise" style={rise(300)}>
        On trading days
      </p>
      <div className="mt-auto">
        <div className="relative h-[0.6vh] bg-ink-on-bone/20">
          <span className="absolute inset-0 origin-left bg-ink-on-bone sr-tv-fill" style={{ "--sr-tv-dur": `${gap * processSteps.length}ms`, animationDelay: `${REVEAL + 600}ms` } as CSSProperties} />
        </div>
        <div className="grid grid-cols-4">
          {processSteps.map((s, i) => (
            <div key={s.n} className={`pr-[2vw] pt-[2.6vh] ${i > 0 ? "pl-[1.6vw]" : ""}`}>
              <span className="block font-display text-[clamp(4rem,7vw,9rem)] font-semibold leading-none tracking-tight sr-tv-pop" style={{ ...rise(600 + i * gap), transformOrigin: "left bottom" }}>
                {Number(s.n)}
              </span>
              <h3 className="mt-[1.6vh] font-display text-[clamp(1.3rem,1.7vw,2.2rem)] font-semibold sr-tv-slide-l" style={rise(750 + i * gap)}>
                {s.title}
              </h3>
              <p className="sr-tv-body mt-[0.8vh] text-ink-on-bone/80 sr-tv-rise [font-size:clamp(1rem,1.1vw,1.45rem)]" style={rise(900 + i * gap)}>
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SceneCta() {
  const chars = contact.whatsappDisplay.split("");
  return (
    <Dark className="grid grid-cols-[1fr_auto] items-center gap-[5vw] px-[5vw]">
      <div>
        <p className="sr-tv-tag text-ivory/60 sr-tv-slide-l" style={rise(0)}>
          WhatsApp your sizes for a quote
        </p>
        <p className="mt-[2vh] flex overflow-hidden whitespace-nowrap font-display text-[clamp(3rem,7.4vw,9.5rem)] font-semibold leading-none tracking-tight sr-tv-num" aria-label={contact.whatsappDisplay}>
          {chars.map((c, i) => (
            <span key={i} className="inline-block sr-tv-count" style={rise(150 + i * 45)}>
              {c === " " ? "\u00a0" : c}
            </span>
          ))}
        </p>
        <div className="mt-[3vh] h-[0.7vh] w-[12vw] origin-left bg-ember sr-anim-line" style={rise(900)} />
        <div className="mt-[5vh] grid max-w-[58vw] grid-cols-2 gap-[3vw]">
          <div className="border-t border-line-strong pt-[1.6vh] sr-tv-rise" style={rise(1100)}>
            <p className="sr-tv-tag text-ivory/50">Visit</p>
            {contact.addressLines.map((l) => (
              <p key={l} className="sr-tv-body mt-[0.8vh]">
                {l}
              </p>
            ))}
          </div>
          <div className="border-t border-line-strong pt-[1.6vh] sr-tv-rise" style={rise(1300)}>
            <p className="sr-tv-tag text-ivory/50">Open</p>
            {contact.hours.map((h) => (
              <p key={h.days} className="sr-tv-body sr-tv-num mt-[0.8vh] whitespace-nowrap">
                {h.days} <span className="text-ivory/60">{h.time}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="relative w-[19vw] sr-tv-pop" style={rise(700)}>
        <span className="absolute -inset-[1.2vw] border-2 border-ember sr-tv-ring" />
        <span className="absolute -inset-[1.2vw] border-2 border-ember sr-tv-ring [animation-delay:0.9s]" />
        <QrCode value={WA_LINK} label="Scan to WhatsApp us" />
      </div>
    </Dark>
  );
}

/* ─── "All you need for your …" kits ─────────────────────────────────────── */

/** Time the room photo is shown full-width before it docks to the left. */
const KIT_DOCK = 2400;
const KIT_STAGGER = 160;

function kitTile(item: KitItem) {
  if (item.kind === "service") return { title: item.title, code: "Service", src: item.image, cutout: false };
  const p = productById(item.productId);
  return { title: p?.name ?? "", code: p?.codes?.[0] ?? p?.series ?? "In stock", src: p?.image?.src ?? "", cutout: true };
}

function KitScene({ kit, n, duration }: { kit: Kit; n: string; duration: number }) {
  const total = kit.items.length;
  const tilesAt = KIT_DOCK + 500;
  const shown = useCountUp(total, REVEAL + tilesAt, total * KIT_STAGGER + 200);
  const cols = total + 1 > 8 ? 5 : 4;
  return (
    <Bone className="overflow-hidden">
      {/* Room photo: full screen first, then docks left as the checklist arrives. */}
      <div className="absolute inset-y-0 left-0 overflow-hidden bg-ink sr-tv-kit-dock" style={{ animationDelay: `${REVEAL + KIT_DOCK}ms` }}>
        <img src={kit.hero} alt="" className="absolute inset-0 h-full w-full object-cover sr-tv-kb-a" style={{ animationDuration: `${duration + 1000}ms` }} />
        <div className="absolute bottom-[4vh] left-[2vw] right-[2vw] max-w-[34vw] bg-bone p-[2vw] text-ink-on-bone sr-tv-slide-l" style={rise(150)}>
          <span className="absolute inset-y-0 left-0 w-[0.4vw] origin-top bg-ember sr-anim-line" style={rise(450)} />
          <Tag n={n} delay={300}>
            {kit.room}
          </Tag>
          <h2 className="sr-tv-h2 mt-[1.6vh] sr-tv-rise" style={rise(450)}>
            {kit.title}
          </h2>
          <p className="sr-tv-body mt-[1.4vh] text-ink-on-bone/75 sr-tv-rise" style={rise(650)}>
            {kit.intro}
          </p>
        </div>
      </div>

      {/* Checklist */}
      <div className="absolute inset-y-0 left-[38vw] right-[3vw] flex flex-col py-[3.6vh]">
        <div className="flex items-end justify-between border-b-2 border-ink-on-bone pb-[1.4vh] sr-tv-rise" style={rise(tilesAt - 200)}>
          <div>
            <p className="sr-tv-tag text-ember">Your {kit.id === "furniture" ? "office" : kit.id} checklist</p>
            <p className="mt-[0.6vh] sr-tv-body text-ink-on-bone/70">Everything on one list, all from one counter.</p>
          </div>
          <p className="whitespace-nowrap text-right">
            <span className="font-display text-[clamp(2rem,3vw,4rem)] font-semibold leading-none sr-tv-num">
              {String(shown).padStart(2, "0")}
              <span className="text-ink-on-bone/35">/{String(total).padStart(2, "0")}</span>
            </span>
            <span className="block sr-tv-tag text-ink-on-bone/55 [font-size:0.75rem]">on our shelves</span>
          </p>
        </div>
        <div className={`mt-[2vh] grid min-h-0 flex-1 grid-rows-2 gap-[0.8vw] ${cols === 5 ? "grid-cols-5" : "grid-cols-4"}`}>
          {kit.items.map((item, i) => {
            const t = kitTile(item);
            return (
              <div
                key={i}
                className={`relative flex min-h-0 flex-col bg-ivory transition-[box-shadow] duration-500 sr-tv-pop `}
                style={{ ...rise(tilesAt + i * KIT_STAGGER), transformOrigin: "center bottom" }}
              >
                <div className="flex items-center justify-between px-[0.7vw] pt-[1vh]">
                  <span className={`px-[0.4vw] py-[0.2vh] sr-tv-tag [font-size:0.75rem] transition-colors duration-500 bg-ink-on-bone/10 text-ink-on-bone/70`}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="sr-tv-tag text-ink-on-bone/55 [font-size:0.72rem]">{item.label}</span>
                </div>
                <div className="relative mx-[0.7vw] mt-[0.8vh] min-h-0 flex-1 overflow-hidden">
                  {t.cutout ? (
                    <img src={t.src} alt="" className={`absolute inset-[4%] h-[92%] w-[92%] object-contain mix-blend-multiply transition-transform duration-700 scale-100`} />
                  ) : (
                    <img src={t.src} alt="" className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 scale-100`} />
                  )}
                </div>
                <div className="px-[0.7vw] pb-[1vh] pt-[0.8vh]">
                  <p className="line-clamp-2 min-h-[2.5em] font-body text-[clamp(0.95rem,1vw,1.3rem)] font-semibold leading-tight">{t.title}</p>
                  <p className="mt-[0.3vh] truncate sr-tv-tag text-ember [font-size:0.72rem]">{t.code}</p>
                </div>
                <span className={`absolute right-[0.6vw] top-[4.6vh] grid h-[3vh] w-[3vh] place-items-center bg-ember text-[1.6vh] text-ivory transition-opacity duration-300 ${i < shown ? "opacity-100" : "opacity-0"}`}>✓</span>
              </div>
            );
          })}
          <div className="flex flex-col justify-between bg-ember p-[1vw] text-ink-on-bone sr-tv-pop" style={rise(tilesAt + total * KIT_STAGGER)}>
            <p className="sr-tv-tag text-ink-on-bone/70 [font-size:0.75rem]">One counter</p>
            <div>
              <p className="font-display text-[clamp(1.2rem,1.5vw,2rem)] font-semibold leading-tight">WhatsApp your list for a quote.</p>
              <p className="mt-[1vh] whitespace-nowrap font-display text-[clamp(0.85rem,0.95vw,1.3rem)] font-semibold leading-tight sr-tv-num">{contact.whatsappDisplay}</p>
            </div>
          </div>
        </div>
      </div>
    </Bone>
  );
}

const KIT_DURATION = 13000;
const kitScene = (id: string, n: string) => {
  const kit = kits.find((k) => k.id === id)!;
  return function SceneKit() {
    return <KitScene kit={kit} n={n} duration={KIT_DURATION} />;
  };
};
const SceneKitchenKit = kitScene("kitchen", "01");
const SceneWardrobeKit = kitScene("wardrobe", "06");
const SceneFurnitureKit = kitScene("furniture", "08");

const SCENES: { id: string; label: string; render: () => ReactNode; duration?: number }[] = [
  { id: "open", label: "Armand", render: SceneOpen },
  { id: "kitchen-kit", label: "Your kitchen", render: SceneKitchenKit, duration: KIT_DURATION },
  { id: "shelf-to-home", label: "Shelf to home", render: SceneShelfToHome },
  { id: "before-after", label: "Before & after", render: SceneBeforeAfter },
  { id: "cutting", label: "Cutting", render: SceneCutting },
  { id: "edging", label: "Edging", render: SceneEdging },
  { id: "wardrobe-kit", label: "Your wardrobe", render: SceneWardrobeKit, duration: KIT_DURATION },
  { id: "granite", label: "Granite", render: SceneGranite },
  { id: "furniture-kit", label: "Your office", render: SceneFurnitureKit, duration: KIT_DURATION },
  { id: "how", label: "How it works", render: SceneHowItWorks },
  { id: "cta", label: "Get a quote", render: SceneCta },
];

/* ─── Frame: header + contact strip ─────────────────────────────────────── */

function useClock() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Harare" });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const t = setInterval(tick, 15_000);
    return () => clearInterval(t);
  }, []);
  return now;
}

function TouchPrompt() {
  return (
    <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-[0.8vw] rounded-full bg-ember px-[1.4vw] py-[0.9vh] text-ink-on-bone">
      <span className="relative flex h-[1.8vh] w-[1.8vh] items-center justify-center">
        <span className="absolute inset-0 rounded-full border-2 border-ink-on-bone sr-pulse-ring" />
        <span className="h-[0.9vh] w-[0.9vh] rounded-full bg-ink-on-bone" />
      </span>
      <span className="sr-tv-tag sr-anim-breathe">Touch the screen to explore</span>
    </span>
  );
}

function Header({ index, cycle, touch }: { index: number; cycle: number; touch?: boolean }) {
  const clock = useClock();
  const scene = SCENES[index]!;
  const key = `${scene.id}-${cycle}`;
  const dur = scene.duration ?? SCENE_DURATION;
  return (
    <header className="absolute inset-x-0 top-0 z-20 flex h-[7vh] items-center gap-[2vw] bg-ink-deep px-[2vw] text-ivory">
      <Logo className="h-[4.4vh] w-auto" />
      <span className="h-[3vh] w-px bg-line-strong" />
      <span key={key} className="sr-tv-tag text-ivory/80 sr-tv-slide-l">
        {scene.label}
      </span>
      <div className="ml-auto flex h-[0.7vh] items-center gap-[0.25vw]">
        {SCENES.map((s, n) => (
          <span key={s.id} className="relative h-full w-[1.8vw] overflow-hidden bg-ivory/15">
            {n < index && <span className="absolute inset-0 bg-ivory/60" />}
            {n === index && <span key={key} className="absolute inset-0 bg-ember sr-tv-fill" style={{ "--sr-tv-dur": `${dur}ms` } as CSSProperties} />}
          </span>
        ))}
      </div>
      {touch && <TouchPrompt />}
      <span className="w-[5vw] text-right sr-tv-tag sr-tv-num text-ivory/60">{clock ?? ""}</span>
      <span key={`bar-${key}`} className="absolute inset-x-0 bottom-0 h-[0.35vh] bg-ember sr-tv-fill" style={{ "--sr-tv-dur": `${dur}ms` } as CSSProperties} />
    </header>
  );
}

function ContactStrip() {
  return (
    <footer className="absolute inset-x-0 bottom-0 z-20 flex h-[11vh] items-stretch bg-ink-deep text-ivory">
      <div className="flex items-center gap-[1.2vw] bg-ember px-[2vw] text-ink-on-bone">
        <svg viewBox="0 0 24 24" className="h-[4.6vh] w-[4.6vh] fill-current" aria-hidden>
          <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.7.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.8a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.89 9.88z" />
        </svg>
        <div>
          <p className="sr-tv-tag [font-size:0.78rem]">WhatsApp for a quote</p>
          <p className="whitespace-nowrap font-display text-[clamp(1.6rem,2.3vw,3rem)] font-semibold leading-none tracking-tight sr-tv-num">{contact.whatsappDisplay}</p>
        </div>
      </div>
      <div className="flex flex-1 items-center gap-[2.4vw] px-[2.4vw]">
        <div>
          <p className="sr-tv-tag text-ivory/45 [font-size:0.75rem]">Visit</p>
          <p className="sr-tv-body whitespace-nowrap [font-size:clamp(1rem,1.15vw,1.5rem)]">{contact.addressLines[0]}, Bulawayo</p>
        </div>
        <span className="h-[5vh] w-px bg-line-strong" />
        <div>
          <p className="sr-tv-tag text-ivory/45 [font-size:0.75rem]">Open</p>
          <p className="sr-tv-body sr-tv-num whitespace-nowrap [font-size:clamp(1rem,1.15vw,1.5rem)]">Mon–Fri 08:00–17:00 · Sat 08:00–13:00</p>
        </div>
        <span className="ml-auto sr-tv-tag text-ivory/60">{contact.websiteDisplay}</span>
      </div>
      <div className="flex items-center bg-ivory px-[0.8vh]">
        <div className="h-[9.4vh] w-[9.4vh] [&_figure]:gap-0 [&_div]:rounded-none [&_div]:shadow-none [&_div]:p-0">
          <QrCode value={WA_LINK} />
        </div>
      </div>
    </footer>
  );
}

/* ─── Loop ───────────────────────────────────────────────────────────────── */

/**
 * The hands-free loop. On /tv it runs alone; the kiosk also uses it as its
 * idle "attract" screen by passing `onStart`, so any touch opens the showroom.
 */
export function TvLoop({ onStart }: { onStart?: () => void } = {}) {
  const [state, setState] = useState({ current: 0, prev: -1, cycle: 0 });

  useEffect(() => {
    const t = setTimeout(() => {
      setState((s) => {
        const next = (s.current + 1) % SCENES.length;
        return { current: next, prev: s.current, cycle: next === 0 ? s.cycle + 1 : s.cycle };
      });
    }, SCENES[state.current]!.duration ?? SCENE_DURATION);
    return () => clearTimeout(t);
  }, [state.current]);

  useEffect(() => {
    ALL_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Keep the TV awake and refresh periodically to pick up content updates.
  useEffect(() => {
    let lock: { release: () => Promise<void> } | null = null;
    const nav = navigator as Navigator & { wakeLock?: { request: (t: "screen") => Promise<{ release: () => Promise<void> }> } };
    const request = () => nav.wakeLock?.request("screen").then((l) => (lock = l)).catch(() => {});
    request();
    const onVis = () => document.visibilityState === "visible" && request();
    document.addEventListener("visibilitychange", onVis);
    const reload = !onStart && RELOAD_EVERY_HOURS > 0 ? setTimeout(() => window.location.reload(), RELOAD_EVERY_HOURS * 3600_000) : undefined;
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      if (reload) clearTimeout(reload);
      lock?.release().catch(() => {});
    };
  }, [onStart]);

  useEffect(() => {
    if (!onStart) return;
    const onKey = () => onStart();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onStart]);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else document.documentElement.requestFullscreen?.().catch(() => {});
  };

  const scene = SCENES[state.current]!;
  const prev = state.prev >= 0 ? SCENES[state.prev]! : null;
  const Current = scene.render;
  const Prev = prev?.render;
  const sceneKey = `${scene.id}-${state.cycle}`;

  return (
    <main
      className={`sr-root fixed inset-0 select-none overflow-hidden bg-ink-deep font-body text-ivory ${onStart ? "z-30 cursor-pointer" : "cursor-none"}`}
      style={{ "--sr-speed": SHOWROOM_CONFIG.kiosk.ANIMATION_SPEED } as CSSProperties}
      onDoubleClick={onStart ? undefined : toggleFullscreen}
      onPointerDown={onStart}
      role={onStart ? "button" : undefined}
      onContextMenu={(e) => e.preventDefault()}
      aria-label={onStart ? "Touch to explore the Armand showroom" : `${brand.fullName} showroom display`}
    >
      <Header index={state.current} cycle={state.cycle} touch={!!onStart} />
      <div className="absolute inset-x-0 bottom-[11vh] top-[7vh] overflow-hidden">
        {prev && Prev && (
          <div key={`${prev.id}-${state.prev > state.current ? state.cycle - 1 : state.cycle}`} className="absolute inset-0">
            <Prev />
          </div>
        )}
        <div key={sceneKey} className={`absolute inset-0 ${prev ? "sr-tv-in" : ""}`}>
          <Current />
        </div>
        {prev && (
          <div key={`sweep-${sceneKey}`} className="pointer-events-none absolute inset-0 z-10 flex sr-tv-sweep">
            <span className="h-full flex-1 bg-ember" />
            <span className="h-full w-[3vw] bg-ink-deep" />
          </div>
        )}
      </div>
      <ContactStrip />
    </main>
  );
}
