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
import { attractFeaturedIds } from "../data/featured";
import { productById, products as allProducts } from "../data/products";
import { processSteps, services } from "../data/services";
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
const ALL_IMAGES = [boardsStock, cutting, edging, granite, kitchen, kitchenBefore, wardrobe, office, ...SHARP.map((p) => p.image!.src)];

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
        <span>Illustrative image</span>
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

/** Checklist whose rows slide in and tick one after another. */
function TickList({ items, start = 700, gap = 420 }: { items: string[]; start?: number; gap?: number }) {
  return (
    <ul className="border-t border-ink-on-bone/20">
      {items.map((t, i) => (
        <li key={t} className="flex items-center justify-between border-b border-ink-on-bone/20 py-[1.3vh] sr-tv-body sr-tv-slide-l" style={rise(start + i * gap)}>
          <span>{t}</span>
          <span className="grid h-[3.4vh] w-[3.4vh] place-items-center bg-ember text-ivory sr-tv-pop" style={rise(start + i * gap + 250)}>
            ✓
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ─── Scenes ─────────────────────────────────────────────────────────────── */

const OPEN_WORDS = ["Boards.", "Cutting.", "Edging.", "Fittings."];

function SceneOpen() {
  const i = useTicker(OPEN_WORDS.length, 1900, REVEAL + 500);
  return (
    <Bone className="grid grid-cols-[44fr_56fr] gap-[3vw] px-[4vw] py-[5vh]">
      <div className="flex flex-col justify-between">
        <Logo tone="color" className="w-[17vw] sr-tv-slide-l" />
        <div>
          <p className="sr-tv-tag text-ember sr-tv-rise" style={rise(200)}>
            Everything for the job
          </p>
          <div className="relative mt-[1.6vh] h-[12vh] overflow-hidden border-y border-ink-on-bone/20">
            <span key={i} className="absolute inset-y-0 left-0 flex items-center sr-tv-h1 sr-tv-word">
              {OPEN_WORDS[i]}
            </span>
          </div>
          <div className="mt-[2vh] flex gap-[0.5vw]">
            {OPEN_WORDS.map((w, n) => (
              <span key={w} className={`h-[0.6vh] w-[3vw] transition-colors duration-500 ${n === i ? "bg-ember" : "bg-ink-on-bone/15"}`} />
            ))}
          </div>
          <p className="sr-tv-body mt-[3vh] max-w-[32vw] text-ink-on-bone/75 sr-tv-rise" style={rise(500)}>
            Board supply, precision cutting, edging and hardware — on Khami Rd, Bulawayo.
          </p>
        </div>
      </div>
      <Plate src={boardsStock} caption="Board stock" move="a" />
    </Bone>
  );
}

function SceneKitchen() {
  return (
    <Bone className="grid grid-cols-[34fr_66fr] gap-[3vw] px-[4vw] py-[5vh]">
      <div className="flex flex-col justify-center">
        <Tag n="01">Kitchen design &amp; fitting</Tag>
        <h2 className="sr-tv-h1 mt-[3vh] sr-tv-rise" style={rise(200)}>
          Kitchens, designed and fitted.
        </h2>
        <p className="sr-tv-body mt-[2.4vh] text-ink-on-bone/75 sr-tv-rise" style={rise(400)}>
          From boards and tops to the final handle.
        </p>
        <div className="mt-[3.4vh]">
          <TickList items={["Boards & edging", "Granite tops", "Sinks & taps", "Hinges, runners, handles"]} />
        </div>
      </div>
      <Plate src={kitchen} caption="Charcoal & walnut kitchen, granite island" move="b" />
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
        <Tag n="02" delay={300}>
          Before &amp; after
        </Tag>
        <h2 className="sr-tv-h2 mt-[1.6vh] sr-tv-rise" style={rise(450)}>
          Bring us the empty room and your sizes.
        </h2>
      </div>
      <span className="absolute bottom-[1.4vh] right-[1.2vw] bg-ink-deep/70 px-[0.7vw] py-[0.5vh] sr-tv-tag text-ivory/70 [font-size:0.72rem]">Illustrative images</span>
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
        <Tag n="03">Precision cutting</Tag>
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
            <div className="h-full w-[0.3vw] bg-ember/80 sr-tv-saw" style={rise(800)} />
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
      <span className="absolute right-[1.2vw] top-[1.6vh] bg-ink-deep/70 px-[0.7vw] py-[0.5vh] sr-tv-tag text-ivory/70 [font-size:0.72rem]">Illustrative image</span>
    </div>
  );
}

function SceneEdging() {
  return (
    <FullPhoto
      src={edging}
      n="04"
      tag="Edging"
      move="c"
      title="A clean edge on every cut."
      text="Expert edging for a clean, durable finish on every cut edge."
      facts={["Cut", "Edged", "Ready to assemble"]}
    />
  );
}

function ProductCard({ p }: { p: Product }) {
  return (
    <div className="flex h-full w-[17vw] shrink-0 flex-col bg-ivory">
      <div className="relative min-h-0 flex-1">
        <img src={p.image?.src} alt={p.image?.alt} className="absolute inset-[7%] h-[86%] w-[86%] object-contain mix-blend-multiply" />
      </div>
      <div className="border-t border-ink-on-bone/10 px-[0.9vw] py-[1vh]">
        <p className="sr-tv-tag text-ember [font-size:0.8rem]">{p.codes?.[0] ?? p.series ?? "In stock"}</p>
        <p className="mt-[0.3vh] truncate font-body text-[clamp(0.95rem,1vw,1.3rem)] font-medium">{p.name}</p>
      </div>
    </div>
  );
}

function SceneCatalogue() {
  const count = useCountUp(700, REVEAL + 300);
  const half = Math.ceil(SHARP.length / 2);
  const rows = [SHARP.slice(0, half), SHARP.slice(half)];
  return (
    <Bone className="flex flex-col py-[4.5vh]">
      <div className="mx-[4vw] flex items-end justify-between border-b-2 border-ink-on-bone pb-[2vh]">
        <div>
          <Tag n="05">Fittings · Product Range 2026</Tag>
          <h2 className="sr-tv-h2 mt-[1.6vh] sr-tv-rise" style={rise(200)}>
            Hinges to sinks, on the shelf.
          </h2>
        </div>
        <p className="text-right">
          <span className="block sr-tv-h1 sr-tv-num text-ember">{count}+</span>
          <span className="sr-tv-tag text-ink-on-bone/60">items in the catalogue</span>
        </p>
      </div>
      <div className="mt-[2.6vh] flex min-h-0 flex-1 flex-col gap-[1.4vh] overflow-hidden sr-tv-rise" style={rise(300)}>
        {rows.map((row, r) => (
          <div key={r} className="min-h-0 flex-1">
            <div className={`flex h-full w-max gap-[0.8vw] ${r === 0 ? "sr-tv-marquee" : "sr-tv-marquee-rev"}`}>
              {[...row, ...row, ...row, ...row].map((p, i) => (
                <ProductCard key={`${p.id}-${i}`} p={p} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Bone>
  );
}

function SceneSpotlight() {
  const items = byIds(attractFeaturedIds);
  const per = SCENE_DURATION / Math.max(1, items.length);
  const i = useTicker(items.length, per, per);
  const p = items[i];
  if (!p) return null;
  const finishes = p.options?.items.map((o) => o.label).slice(0, 4) ?? [];
  return (
    <Bone className="grid grid-cols-[42fr_58fr]">
      <div key={p.id} className="flex flex-col justify-center bg-ink px-[4vw] text-ivory">
        <Tag n={`0${i + 1}/0${items.length}`} tone="ivory" delay={i === 0 ? 100 : -REVEAL}>
          New in 2026 · Catalogue p.{p.cataloguePage ?? "—"}
        </Tag>
        <h2 className="sr-tv-h2 mt-[2.4vh] sr-tv-slide-l" style={rise(i === 0 ? 200 : -REVEAL + 120)}>
          {p.name}
        </h2>
        {p.description && (
          <p className="sr-tv-body mt-[2vh] text-ivory/70 sr-tv-rise" style={rise(i === 0 ? 350 : -REVEAL + 260)}>
            {p.description}
          </p>
        )}
        <dl className="mt-[3vh] border-t border-line-strong">
          {(p.codes?.length ? [{ label: "Codes", value: p.codes.slice(0, 3).join("  ·  ") }] : [])
            .concat((p.specs ?? []).slice(0, 2))
            .map((s, n) => (
              <div key={s.label} className="flex gap-[2vw] border-b border-line-strong py-[1.3vh] sr-tv-slide-l" style={rise((i === 0 ? 450 : -REVEAL + 360) + n * 120)}>
                <dt className="w-[8vw] shrink-0 sr-tv-tag text-ivory/50">{s.label}</dt>
                <dd className="sr-tv-body sr-tv-num">{s.value}</dd>
              </div>
            ))}
        </dl>
        {finishes.length > 0 && (
          <div className="mt-[2.6vh] flex flex-wrap gap-[0.6vw]">
            {finishes.map((f, n) => (
              <span key={f} className="border border-line-strong px-[0.8vw] py-[0.6vh] sr-tv-tag text-ivory/80 sr-tv-pop" style={rise((i === 0 ? 700 : -REVEAL + 600) + n * 140)}>
                {f}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="relative overflow-hidden bg-ivory">
        <span key={`n-${p.id}`} className="absolute -right-[1vw] top-[2vh] font-display text-[30vh] font-semibold leading-none text-ink-on-bone/5 sr-tv-slide-r">
          0{i + 1}
        </span>
        <div key={`img-${p.id}`} className="absolute inset-[9%] mix-blend-multiply sr-tv-hero-in" style={rise(i === 0 ? 0 : -REVEAL)}>
          <div className="h-full w-full sr-tv-float">
            <img src={p.image?.src} alt={p.image?.alt} className="h-full w-full object-contain mix-blend-multiply" />
          </div>
        </div>
        <div className="absolute bottom-[3vh] right-[2.4vw] flex gap-[0.4vw]">
          {items.map((it, n) => (
            <span key={it.id} className="relative h-[0.6vh] w-[3.4vw] overflow-hidden bg-ink-on-bone/15">
              {n < i && <span className="absolute inset-0 bg-ember" />}
              {n === i && <span key={`f-${i}`} className="absolute inset-0 bg-ember sr-tv-fill" style={{ "--sr-tv-dur": `${per}ms` } as CSSProperties} />}
            </span>
          ))}
        </div>
      </div>
    </Bone>
  );
}

function SceneWardrobe() {
  return (
    <Bone className="grid grid-cols-[62fr_38fr] gap-[3vw] px-[4vw] py-[5vh]">
      <Plate src={wardrobe} caption="Oak walk-in wardrobe" move="a" />
      <div className="flex flex-col justify-center">
        <Tag n="06">Wardrobes</Tag>
        <h2 className="sr-tv-h1 mt-[3vh] sr-tv-rise" style={rise(200)}>
          Wardrobes, cut, edged and assembled.
        </h2>
        <p className="sr-tv-body mt-[2.4vh] text-ink-on-bone/75 sr-tv-rise" style={rise(400)}>
          Built to your room.
        </p>
        <div className="mt-[3.4vh]">
          <TickList items={["Shelving", "Hanging rails", "Drawers", "Shoe racks"]} />
        </div>
      </div>
    </Bone>
  );
}

function SceneGranite() {
  return <FullPhoto src={granite} n="07" side="right" move="b" tag="Granite" title="Granite tops." text="For kitchens, vanities and counters." facts={["Kitchens", "Vanities", "Counters"]} />;
}

function SceneServices() {
  const i = useTicker(services.length, (SCENE_DURATION - REVEAL - 600) / services.length, REVEAL + 600);
  const s = services[i]!;
  return (
    <Dark className="grid grid-cols-[48fr_52fr] gap-[4vw] px-[4vw] py-[4.5vh]">
      <div className="flex min-h-0 flex-col">
        <Tag n="08" tone="ivory">
          What we do
        </Tag>
        <h2 className="sr-tv-h2 mt-[1.6vh] sr-tv-rise" style={rise(200)}>
          Everything for the job, one counter.
        </h2>
        <ul className="mt-[3vh] grid flex-1 grid-rows-8 border-t border-line-strong">
          {services.map((sv, n) => (
            <li
              key={sv.id}
              className={`flex items-center gap-[1.4vw] border-b border-line-strong px-[1vw] transition-colors duration-500 sr-tv-slide-l ${n === i ? "bg-ember text-ink-on-bone" : ""}`}
              style={rise(300 + n * 80)}
            >
              <span className={`w-[2.4vw] sr-tv-tag ${n === i ? "text-ink-on-bone" : "text-ember"}`}>{String(n + 1).padStart(2, "0")}</span>
              <span className="font-display text-[clamp(1.2rem,1.6vw,2.1rem)] font-semibold leading-tight tracking-tight">{sv.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative flex flex-col justify-end overflow-hidden border-l border-line-strong pl-[3vw]">
        <Logo className="absolute right-0 top-0 w-[11vw] sr-tv-rise" />
        <div key={s.id}>
          <span className="block font-display text-[clamp(6rem,14vw,18rem)] font-semibold leading-none tracking-tight text-ember sr-tv-num sr-tv-slide-r">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-[2vh] sr-tv-h1 sr-tv-slide-r" style={{ animationDelay: "80ms" }}>
            {s.name}
          </h3>
          <p className="sr-tv-body mt-[2vh] max-w-[36vw] text-ivory/70 sr-tv-rise" style={{ animationDelay: "180ms" }}>
            {s.description}
          </p>
        </div>
      </div>
    </Dark>
  );
}

function SceneOffice() {
  return (
    <Bone className="grid grid-cols-[34fr_66fr] gap-[3vw] px-[4vw] py-[5vh]">
      <div className="flex flex-col justify-center">
        <Tag n="09">Furniture &amp; interiors</Tag>
        <h2 className="sr-tv-h1 mt-[3vh] sr-tv-rise" style={rise(200)}>
          For the home and the office.
        </h2>
        <p className="sr-tv-body mt-[2.4vh] text-ink-on-bone/75 sr-tv-rise" style={rise(400)}>
          Made from the boards on our racks.
        </p>
        <div className="mt-[3.4vh]">
          <TickList items={["Reception desks", "Storage walls", "Shelving", "Furniture"]} />
        </div>
      </div>
      <Plate src={office} caption="Office reception desk & storage wall" move="c" />
    </Bone>
  );
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

const SCENES: { id: string; label: string; render: () => ReactNode }[] = [
  { id: "open", label: "Armand", render: SceneOpen },
  { id: "kitchen", label: "Kitchens", render: SceneKitchen },
  { id: "before-after", label: "Before & after", render: SceneBeforeAfter },
  { id: "cutting", label: "Cutting", render: SceneCutting },
  { id: "edging", label: "Edging", render: SceneEdging },
  { id: "catalogue", label: "Fittings", render: SceneCatalogue },
  { id: "spotlight", label: "New in 2026", render: SceneSpotlight },
  { id: "wardrobe", label: "Wardrobes", render: SceneWardrobe },
  { id: "granite", label: "Granite", render: SceneGranite },
  { id: "services", label: "What we do", render: SceneServices },
  { id: "office", label: "Furniture", render: SceneOffice },
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

function Header({ index, cycle }: { index: number; cycle: number }) {
  const clock = useClock();
  const scene = SCENES[index]!;
  const key = `${scene.id}-${cycle}`;
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
            {n === index && <span key={key} className="absolute inset-0 bg-ember sr-tv-fill" style={{ "--sr-tv-dur": `${SCENE_DURATION}ms` } as CSSProperties} />}
          </span>
        ))}
      </div>
      <span className="w-[5vw] text-right sr-tv-tag sr-tv-num text-ivory/60">{clock ?? ""}</span>
      <span key={`bar-${key}`} className="absolute inset-x-0 bottom-0 h-[0.35vh] bg-ember sr-tv-fill" style={{ "--sr-tv-dur": `${SCENE_DURATION}ms` } as CSSProperties} />
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

export function TvLoop() {
  const [state, setState] = useState({ current: 0, prev: -1, cycle: 0 });

  useEffect(() => {
    const t = setTimeout(() => {
      setState((s) => {
        const next = (s.current + 1) % SCENES.length;
        return { current: next, prev: s.current, cycle: next === 0 ? s.cycle + 1 : s.cycle };
      });
    }, SCENE_DURATION);
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
    const reload = RELOAD_EVERY_HOURS > 0 ? setTimeout(() => window.location.reload(), RELOAD_EVERY_HOURS * 3600_000) : undefined;
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      if (reload) clearTimeout(reload);
      lock?.release().catch(() => {});
    };
  }, []);

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
      className="sr-root fixed inset-0 cursor-none select-none overflow-hidden bg-ink-deep font-body text-ivory"
      style={{ "--sr-speed": SHOWROOM_CONFIG.kiosk.ANIMATION_SPEED } as CSSProperties}
      onDoubleClick={toggleFullscreen}
      onContextMenu={(e) => e.preventDefault()}
      aria-label={`${brand.fullName} showroom display`}
    >
      <Header index={state.current} cycle={state.cycle} />
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
