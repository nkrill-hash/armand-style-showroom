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
import { productById } from "../data/products";
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
 * Every scene keeps the WhatsApp number and address on screen.
 * Room/workshop photos are AI concept images and carry an "Illustrative" caption.
 */

const { SCENE_DURATION, RELOAD_EVERY_HOURS } = SHOWROOM_CONFIG.tv;
const { contact, brand } = SHOWROOM_CONFIG;
const WA_LINK = buildWhatsAppLink(contact.whatsappNumber, "Hi Armand, I saw you on the showroom screen and would like a quote.") ?? contact.website;

const ALL_IMAGES = [boardsStock, cutting, edging, granite, kitchen, kitchenBefore, wardrobe, office];

const CATALOGUE_IDS = ["hg838", "a6025", "hook-3698", "neo-mixer", "maris-sink", "gola-c", "carousel-wb0069", "runners", "castors-cpl", "enviro-bins"];

const products = (ids: string[]) => ids.map(productById).filter((p): p is Product => p !== undefined);

/* ─── Building blocks ─────────────────────────────────────────────────────── */

const rise = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

/** Section tag, e.g. "02 — Kitchens". */
function Tag({ n, children, tone = "ink", delay = 150 }: { n?: string; children: ReactNode; tone?: "ink" | "ivory"; delay?: number }) {
  return (
    <p className={`sr-tv-tag flex items-center gap-[0.9vw] sr-tv-rise ${tone === "ink" ? "text-ink-on-bone/70" : "text-ivory/70"}`} style={rise(delay)}>
      {n && <span className="bg-ember px-[0.5vw] py-[0.3vh] text-ivory">{n}</span>}
      <span>{children}</span>
    </p>
  );
}

/** Hard-edged photo with a printed caption underneath. */
function Plate({ src, caption, className = "", tone = "ink", delay = 0 }: { src: string; caption: string; className?: string; tone?: "ink" | "ivory"; delay?: number }) {
  return (
    <figure className={`flex min-h-0 flex-col ${className}`}>
      <div className="relative min-h-0 flex-1 overflow-hidden bg-ink sr-anim-reveal-x" style={rise(delay)}>
        <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover sr-tv-drift" />
      </div>
      <figcaption className={`mt-[1.2vh] flex justify-between sr-tv-tag [font-size:0.78rem] ${tone === "ink" ? "text-ink-on-bone/55" : "text-ivory/50"}`}>
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

/* ─── Scenes ─────────────────────────────────────────────────────────────── */

function SceneOpen() {
  const words = ["Boards.", "Cutting.", "Fittings."];
  return (
    <Bone className="grid grid-cols-[44fr_56fr] gap-[3vw] px-[4vw] py-[5vh]">
      <div className="flex flex-col justify-between">
        <Logo tone="color" className="w-[17vw] sr-tv-rise" />
        <div>
          {words.map((w, i) => (
            <div key={w} className="flex items-baseline gap-[1.4vw] border-t border-ink-on-bone/20 py-[1.6vh] sr-tv-rise" style={rise(400 + i * 220)}>
              <span className="sr-tv-tag text-ember">0{i + 1}</span>
              <span className="sr-tv-h1">{w}</span>
            </div>
          ))}
          <p className="sr-tv-body mt-[2.4vh] max-w-[32vw] text-ink-on-bone/75 sr-tv-rise" style={rise(1300)}>
            Board supply, precision cutting, edging and hardware — on Khami Rd, Bulawayo.
          </p>
        </div>
      </div>
      <Plate src={boardsStock} caption="Board stock" delay={200} />
    </Bone>
  );
}

function SceneKitchen() {
  return (
    <Bone className="grid grid-cols-[34fr_66fr] gap-[3vw] px-[4vw] py-[5vh]">
      <div className="flex flex-col justify-center">
        <Tag n="01">Kitchen design &amp; fitting</Tag>
        <h2 className="sr-tv-h1 mt-[3vh] sr-tv-rise" style={rise(300)}>
          Kitchens, designed and fitted.
        </h2>
        <p className="sr-tv-body mt-[3vh] text-ink-on-bone/75 sr-tv-rise" style={rise(550)}>
          From boards and tops to the final handle.
        </p>
        <ul className="mt-[4vh] border-t border-ink-on-bone/20">
          {["Boards & edging", "Granite tops", "Sinks & taps", "Hinges, runners, handles"].map((t, i) => (
            <li key={t} className="flex justify-between border-b border-ink-on-bone/20 py-[1.3vh] sr-tv-body sr-tv-rise" style={rise(800 + i * 140)}>
              <span>{t}</span>
              <span className="text-ember">✓</span>
            </li>
          ))}
        </ul>
      </div>
      <Plate src={kitchen} caption="Charcoal & walnut kitchen, granite island" delay={100} />
    </Bone>
  );
}

function SceneBeforeAfter() {
  return (
    <Dark className="flex flex-col px-[4vw] py-[4.5vh]">
      <div className="flex items-end justify-between">
        <div>
          <Tag n="02" tone="ivory">Before &amp; after</Tag>
          <h2 className="sr-tv-h2 mt-[1.6vh] sr-tv-rise" style={rise(250)}>
            Bring us the empty room and your sizes.
          </h2>
        </div>
      </div>
      <div className="mt-[3.4vh] grid min-h-0 flex-1 grid-cols-2 gap-[1.2vw]">
        {[
          { src: kitchenBefore, label: "Before", delay: 300 },
          { src: kitchen, label: "After", delay: 2200 },
        ].map((f) => (
          <figure key={f.label} className="flex min-h-0 flex-col">
            <div className="relative min-h-0 flex-1 overflow-hidden sr-anim-reveal-x" style={rise(f.delay)}>
              <img src={f.src} alt="" className="absolute inset-0 h-full w-full object-cover sr-tv-drift" />
              <span className={`absolute left-0 top-0 px-[1vw] py-[0.9vh] sr-tv-tag ${f.label === "After" ? "bg-ember text-ivory" : "bg-ivory text-ink-on-bone"}`}>{f.label}</span>
            </div>
            <figcaption className="mt-[1.2vh] flex justify-between sr-tv-tag text-ivory/50 [font-size:0.78rem]">
              <span>{f.label === "Before" ? "Bare shell" : "Fitted kitchen"}</span>
              <span>Illustrative image</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Dark>
  );
}

const CUT_ROWS = [
  ["White melamine", "720", "560", "4", "All round"],
  ["White melamine", "720", "300", "6", "1 long"],
  ["Oak super wood", "2000", "600", "2", "All round"],
  ["Grey melamine", "900", "450", "3", "Front"],
];

function SceneCutting() {
  return (
    <Bone className="grid grid-cols-[48fr_52fr] gap-[3vw] px-[4vw] py-[5vh]">
      <Plate src={cutting} caption="Panel saw, cut to size" />
      <div className="flex flex-col justify-center">
        <Tag n="03">Precision cutting</Tag>
        <h2 className="sr-tv-h1 mt-[2.6vh] sr-tv-rise" style={rise(300)}>
          Send your sizes. We cut.
        </h2>
        <div className="mt-[4vh] border-2 border-ink-on-bone bg-ivory sr-tv-rise" style={rise(600)}>
          <div className="flex items-center justify-between bg-ink-on-bone px-[1.2vw] py-[1vh] text-ivory">
            <span className="sr-tv-tag">Cutting list</span>
            <span className="sr-tv-tag text-ivory/60 [font-size:0.75rem]">Example</span>
          </div>
          <table className="w-full sr-tv-body sr-tv-num [font-size:clamp(1rem,1.15vw,1.5rem)]">
            <thead>
              <tr className="sr-tv-tag text-ink-on-bone/55 [&>th]:px-[1.2vw] [&>th]:py-[1vh] [&>th]:text-left [&>th]:font-semibold">
                <th>Board</th>
                <th>L mm</th>
                <th>W mm</th>
                <th>Qty</th>
                <th>Edge</th>
              </tr>
            </thead>
            <tbody>
              {CUT_ROWS.map((r, i) => (
                <tr key={i} className="border-t border-ink-on-bone/15 [&>td]:px-[1.2vw] [&>td]:py-[1.15vh]">
                  {r.map((c, j) => (
                    <td key={j}>
                      <span className="inline-block sr-tv-type" style={rise(1000 + i * 450 + j * 70)}>
                        {c}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="sr-tv-body mt-[2.6vh] text-ink-on-bone/75 sr-tv-rise" style={rise(3000)}>
          WhatsApp it to <strong className="font-semibold text-ink-on-bone">{contact.whatsappDisplay}</strong> — cut ready to assemble or fit.
        </p>
      </div>
    </Bone>
  );
}

function FullPhoto({ src, n, tag, title, text, side = "left" }: { src: string; n: string; tag: string; title: string; text: string; side?: "left" | "right" }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-ink">
      <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover sr-tv-drift" />
      <div
        className={`absolute bottom-[5vh] w-[34vw] bg-bone p-[2.4vw] text-ink-on-bone sr-tv-rise ${side === "left" ? "left-[4vw]" : "right-[4vw]"}`}
        style={rise(500)}
      >
        <Tag n={n} delay={700}>
          {tag}
        </Tag>
        <h2 className="sr-tv-h2 mt-[2vh] sr-tv-rise" style={rise(850)}>
          {title}
        </h2>
        <p className="sr-tv-body mt-[1.8vh] text-ink-on-bone/75 sr-tv-rise" style={rise(1050)}>
          {text}
        </p>
      </div>
      <span className="absolute right-[1.2vw] top-[1.6vh] bg-ink-deep/70 px-[0.7vw] py-[0.5vh] sr-tv-tag text-ivory/70 [font-size:0.72rem]">Illustrative image</span>
    </div>
  );
}

function SceneEdging() {
  return <FullPhoto src={edging} n="04" tag="Edging" title="A clean edge on every cut." text="Expert edging for a clean, durable finish on every cut edge." />;
}

function SceneCatalogue() {
  const items = products(CATALOGUE_IDS);
  return (
    <Bone className="flex flex-col px-[4vw] py-[4.5vh]">
      <div className="flex items-end justify-between border-b-2 border-ink-on-bone pb-[2vh]">
        <div>
          <Tag n="05">Fittings · Product Range 2026</Tag>
          <h2 className="sr-tv-h2 mt-[1.6vh] sr-tv-rise" style={rise(250)}>
            Hinges to sinks, on the shelf.
          </h2>
        </div>
        <p className="text-right sr-tv-rise" style={rise(400)}>
          <span className="block sr-tv-h1 text-ember">700+</span>
          <span className="sr-tv-tag text-ink-on-bone/60">items in the catalogue</span>
        </p>
      </div>
      <div className="mt-[2.6vh] grid min-h-0 flex-1 grid-cols-5 grid-rows-2 gap-[0.8vw]">
        {items.map((p, i) => (
          <div key={p.id} className="flex min-h-0 flex-col bg-ivory sr-tv-rise" style={rise(500 + i * 110)}>
            <div className="relative min-h-0 flex-1">
              <img src={p.image.src} alt={p.image.alt} className="absolute inset-[8%] h-[84%] w-[84%] object-contain mix-blend-multiply" />
            </div>
            <div className="border-t border-ink-on-bone/10 px-[0.9vw] py-[1.1vh]">
              <p className="sr-tv-tag text-ember [font-size:0.8rem]">{p.codes?.[0] ?? "—"}</p>
              <p className="mt-[0.3vh] truncate font-body text-[clamp(0.95rem,1vw,1.3rem)] font-medium">{p.name}</p>
            </div>
          </div>
        ))}
      </div>
    </Bone>
  );
}

function SceneSpotlight() {
  const items = products(attractFeaturedIds);
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % items.length), SCENE_DURATION / items.length);
    return () => clearInterval(t);
  }, [items.length]);
  const p = items[i];
  if (!p) return null;
  return (
    <Bone className="grid grid-cols-[42fr_58fr]">
      <div key={p.id} className="flex flex-col justify-center bg-ink px-[4vw] text-ivory">
        <Tag n={`0${i + 1}/0${items.length}`} tone="ivory">
          New in 2026 · Catalogue p.{p.cataloguePage ?? "—"}
        </Tag>
        <h2 className="sr-tv-h2 mt-[2.4vh] sr-tv-rise" style={rise(200)}>
          {p.name}
        </h2>
        {p.description && (
          <p className="sr-tv-body mt-[2vh] text-ivory/70 sr-tv-rise" style={rise(380)}>
            {p.description}
          </p>
        )}
        <dl className="mt-[3.6vh] border-t border-line-strong">
          {(p.codes?.length ? [{ label: "Codes", value: p.codes.slice(0, 3).join("  ·  ") }] : [])
            .concat((p.specs ?? []).slice(0, 3))
            .map((s, n) => (
              <div key={s.label} className="flex gap-[2vw] border-b border-line-strong py-[1.3vh] sr-tv-rise" style={rise(520 + n * 120)}>
                <dt className="w-[8vw] shrink-0 sr-tv-tag text-ivory/50">{s.label}</dt>
                <dd className="sr-tv-body sr-tv-num">{s.value}</dd>
              </div>
            ))}
        </dl>
      </div>
      <div key={`img-${p.id}`} className="relative bg-ivory sr-tv-enter">
        <img src={p.image.src} alt={p.image.alt} className="absolute inset-[10%] h-[80%] w-[80%] object-contain mix-blend-multiply" />
        <div className="absolute bottom-[3vh] right-[2.4vw] flex gap-[0.4vw]">
          {items.map((it, n) => (
            <span key={it.id} className={`h-[0.6vh] w-[2.6vw] ${n === i ? "bg-ember" : "bg-ink-on-bone/15"}`} />
          ))}
        </div>
      </div>
    </Bone>
  );
}

function SceneWardrobe() {
  return (
    <Bone className="grid grid-cols-[62fr_38fr] gap-[3vw] px-[4vw] py-[5vh]">
      <Plate src={wardrobe} caption="Oak walk-in wardrobe" delay={100} />
      <div className="flex flex-col justify-center">
        <Tag n="06">Wardrobes</Tag>
        <h2 className="sr-tv-h1 mt-[3vh] sr-tv-rise" style={rise(300)}>
          Wardrobes, cut, edged and assembled.
        </h2>
        <p className="sr-tv-body mt-[3vh] text-ink-on-bone/75 sr-tv-rise" style={rise(550)}>
          Shelving, hanging rails, drawers and shoe racks — built to your room.
        </p>
      </div>
    </Bone>
  );
}

function SceneGranite() {
  return <FullPhoto src={granite} n="07" side="right" tag="Granite" title="Granite tops." text="For kitchens, vanities and counters." />;
}

function SceneServices() {
  return (
    <Dark className="flex flex-col px-[4vw] py-[4.5vh]">
      <div className="flex items-end justify-between border-b-2 border-ivory/80 pb-[2vh]">
        <div>
          <Tag n="08" tone="ivory">What we do</Tag>
          <h2 className="sr-tv-h2 mt-[1.6vh] sr-tv-rise" style={rise(250)}>
            Everything for the job, one counter.
          </h2>
        </div>
        <Logo className="w-[11vw] sr-tv-rise" />
      </div>
      <div className="grid flex-1 grid-cols-2 gap-x-[4vw]">
        {services.map((s, i) => (
          <div key={s.id} className="flex items-center gap-[1.6vw] border-b border-line-strong sr-tv-rise" style={rise(350 + i * 110)}>
            <span className="w-[2.6vw] sr-tv-tag text-ember">{String(i + 1).padStart(2, "0")}</span>
            <span className="w-[15vw] shrink-0 font-display text-[clamp(1.4rem,1.9vw,2.5rem)] font-semibold leading-tight tracking-tight">{s.name}</span>
            <span className="sr-tv-body text-ivory/60 [font-size:clamp(1rem,1.05vw,1.4rem)]">{s.description}</span>
          </div>
        ))}
      </div>
    </Dark>
  );
}

function SceneOffice() {
  return (
    <Bone className="grid grid-cols-[34fr_66fr] gap-[3vw] px-[4vw] py-[5vh]">
      <div className="flex flex-col justify-center">
        <Tag n="09">Furniture &amp; interiors</Tag>
        <h2 className="sr-tv-h1 mt-[3vh] sr-tv-rise" style={rise(300)}>
          For the home and the office.
        </h2>
        <p className="sr-tv-body mt-[3vh] text-ink-on-bone/75 sr-tv-rise" style={rise(550)}>
          Reception desks, storage, shelving and furniture made from the boards on our racks.
        </p>
      </div>
      <Plate src={office} caption="Office reception desk & storage wall" delay={100} />
    </Bone>
  );
}

function SceneHowItWorks() {
  return (
    <div className="absolute inset-0 flex flex-col bg-ember px-[4vw] py-[5vh] text-ink-on-bone">
      <p className="sr-tv-tag text-ink-on-bone/70 sr-tv-rise">How it works</p>
      <h2 className="sr-tv-h1 mt-[2vh] max-w-[70vw] sr-tv-rise" style={rise(250)}>
        Price and delivery confirmed within 2 hours.
      </h2>
      <p className="sr-tv-tag mt-[1.6vh] text-ink-on-bone/70 sr-tv-rise" style={rise(400)}>On trading days</p>
      <div className="mt-auto grid grid-cols-4 border-t-2 border-ink-on-bone">
        {processSteps.map((s, i) => (
          <div key={s.n} className={`pr-[2vw] pt-[2.6vh] sr-tv-rise ${i > 0 ? "border-l-2 border-ink-on-bone pl-[1.6vw]" : ""}`} style={rise(700 + i * 220)}>
            <span className="block font-display text-[clamp(4rem,7vw,9rem)] font-semibold leading-none tracking-tight">{Number(s.n)}</span>
            <h3 className="mt-[1.6vh] font-display text-[clamp(1.3rem,1.7vw,2.2rem)] font-semibold">{s.title}</h3>
            <p className="sr-tv-body mt-[0.8vh] text-ink-on-bone/80 [font-size:clamp(1rem,1.1vw,1.45rem)]">{s.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SceneCta() {
  return (
    <Dark className="grid grid-cols-[1fr_auto] items-center gap-[5vw] px-[5vw]">
      <div>
        <p className="sr-tv-tag text-ivory/60 sr-tv-rise">WhatsApp your sizes for a quote</p>
        <p className="mt-[2vh] whitespace-nowrap font-display text-[clamp(3rem,7.4vw,9.5rem)] font-semibold leading-none tracking-tight sr-tv-num sr-tv-rise" style={rise(200)}>
          {contact.whatsappDisplay}
        </p>
        <div className="mt-[3vh] h-[0.7vh] w-[12vw] bg-ember sr-anim-line" style={rise(500)} />
        <div className="mt-[5vh] grid max-w-[58vw] grid-cols-2 gap-[3vw] sr-tv-rise" style={rise(700)}>
          <div className="border-t border-line-strong pt-[1.6vh]">
            <p className="sr-tv-tag text-ivory/50">Visit</p>
            {contact.addressLines.map((l) => (
              <p key={l} className="sr-tv-body mt-[0.8vh]">
                {l}
              </p>
            ))}
          </div>
          <div className="border-t border-line-strong pt-[1.6vh]">
            <p className="sr-tv-tag text-ivory/50">Open</p>
            {contact.hours.map((h) => (
              <p key={h.days} className="sr-tv-body sr-tv-num mt-[0.8vh] whitespace-nowrap">
                {h.days} <span className="text-ivory/60">{h.time}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="w-[19vw] sr-tv-rise" style={rise(900)}>
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
  return (
    <header className="absolute inset-x-0 top-0 z-20 flex h-[7vh] items-center gap-[2vw] bg-ink-deep px-[2vw] text-ivory">
      <Logo className="h-[4.4vh] w-auto" />
      <span className="h-[3vh] w-px bg-line-strong" />
      <span key={`${scene.id}-${cycle}`} className="sr-tv-tag text-ivory/80 sr-tv-rise">
        {scene.label}
      </span>
      {/* ruler-style progress */}
      <div className="ml-auto flex h-[2.2vh] items-end gap-[0.25vw]">
        {SCENES.map((s, n) => (
          <span key={s.id} className="relative h-full w-[1.6vw] overflow-hidden">
            <span className={`absolute inset-x-0 bottom-0 ${n === index ? "h-full bg-ember" : n < index ? "h-[45%] bg-ivory/60" : "h-[45%] bg-ivory/15"}`} />
          </span>
        ))}
      </div>
      <span className="w-[5vw] text-right sr-tv-tag sr-tv-num text-ivory/60">{clock ?? ""}</span>
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
        <div key={`${scene.id}-${state.cycle}`} className="absolute inset-0 sr-tv-enter">
          <Current />
        </div>
      </div>
      <ContactStrip />
    </main>
  );
}
