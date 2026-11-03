import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import boardsStock from "@/assets/tv-boards-stock.jpg";
import cutting from "@/assets/tv-cutting.jpg";
import edging from "@/assets/tv-edging.jpg";
import hardware from "@/assets/tv-hardware.jpg";
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
import { ProductVisual } from "../components/ProductVisual";
import { QrCode } from "../components/QrCode";

/**
 * Hands-free marketing loop for TVs (no touch). Every scene keeps the
 * WhatsApp number and address on screen. All photography in this loop is
 * AI-generated concept imagery and is labelled "Illustrative".
 */

const { SCENE_DURATION, RELOAD_EVERY_HOURS } = SHOWROOM_CONFIG.tv;
const { contact, brand } = SHOWROOM_CONFIG;
const WA_LINK = buildWhatsAppLink(contact.whatsappNumber, "Hi Armand, I saw you on the showroom screen and would like a quote.") ?? contact.website;

const ALL_IMAGES = [boardsStock, cutting, edging, hardware, granite, kitchen, kitchenBefore, wardrobe, office];

/* ─── Building blocks ─────────────────────────────────────────────────────── */

function Eyebrow({ children, delay = 200 }: { children: ReactNode; delay?: number }) {
  return (
    <div className="flex items-center gap-[1.2vw] sr-anim-fade-up" style={{ animationDelay: `${delay}ms` }}>
      <span className="h-[2px] w-[3.2vw] bg-ember" />
      <span className="sr-eyebrow text-ivory/80">{children}</span>
    </div>
  );
}

function Headline({ lines, accent, delay = 400 }: { lines: string[]; accent?: number; delay?: number }) {
  return (
    <h2 className="sr-tv-mega mt-[3.4vh] text-ivory">
      {lines.map((l, i) => (
        <span key={l} className="block overflow-hidden pb-[0.06em]">
          <span className={`block sr-anim-mask-up ${i === accent ? "text-ember" : ""}`} style={{ animationDelay: `${delay + i * 260}ms` }}>
            {l}
          </span>
        </span>
      ))}
    </h2>
  );
}

function Lead({ children, delay = 1300 }: { children: ReactNode; delay?: number }) {
  return (
    <p className="sr-lead mt-[4vh] max-w-[36vw] text-ivory/80 sr-anim-fade-up" style={{ animationDelay: `${delay}ms` }}>
      {children}
    </p>
  );
}

function Illustrative() {
  return (
    <span className="absolute right-[3vw] top-[5.2vh] rounded-full border border-line bg-ink-deep/50 px-[1vw] py-[0.7vh] sr-eyebrow text-ivory/60 backdrop-blur-md [font-size:0.72rem]">
      Illustrative
    </span>
  );
}

/** Full-bleed photo with slow camera move, scrim and copy block. */
function PhotoScene({
  image,
  side = "left",
  motion = "zoom",
  children,
}: {
  image: string;
  side?: "left" | "right";
  motion?: "zoom" | "pan";
  children: ReactNode;
}) {
  return (
    <div className="absolute inset-0 bg-ink-deep">
      <img src={image} alt="" className={`absolute inset-0 h-full w-full object-cover ${motion === "pan" ? "sr-tv-pan" : "sr-tv-zoom"}`} />
      <div className={`absolute inset-0 ${side === "left" ? "sr-tv-scrim" : "sr-tv-scrim-right"}`} />
      <div className={`relative flex h-full flex-col justify-center pb-[10vh] ${side === "left" ? "items-start pl-[6vw]" : "items-end pr-[6vw] text-right [&_p]:ml-auto"}`}>
        {children}
      </div>
      <Illustrative />
    </div>
  );
}

/* ─── Scenes ─────────────────────────────────────────────────────────────── */

function SceneOpen() {
  return (
    <div className="absolute inset-0 bg-ink-deep">
      <img src={boardsStock} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45 sr-tv-pan" />
      <div className="absolute inset-0 sr-vignette" />
      <div className="relative flex h-full flex-col items-center justify-center pb-[8vh] text-center">
        <Logo className="w-[26vw] sr-anim-fade-up" />
        <div className="sr-hairline mt-[5vh] w-[40vw] sr-anim-line [animation-delay:600ms]" />
        <h1 className="sr-tv-mega mt-[5vh] flex gap-[2.2vw] text-ivory [font-size:clamp(3rem,6.6vw,8.5rem)]">
          {["Build.", "Design.", "Transform."].map((w, i) => (
            <span key={w} className={`sr-anim-mask-up ${i === 2 ? "text-ember" : ""}`} style={{ animationDelay: `${900 + i * 450}ms` }}>
              {w}
            </span>
          ))}
        </h1>
        <p className="sr-eyebrow mt-[4.5vh] text-ash sr-anim-fade [animation-delay:2600ms]">{brand.strapline}</p>
      </div>
      <Illustrative />
    </div>
  );
}

function SceneKitchen() {
  return (
    <PhotoScene image={kitchen}>
      <Eyebrow>Kitchen Design &amp; Fitting</Eyebrow>
      <Headline lines={["Kitchens", "made to", "measure."]} accent={2} />
      <Lead>Designed and fitted — from boards and granite tops to the final handle.</Lead>
    </PhotoScene>
  );
}

function SceneBeforeAfter() {
  return (
    <div className="absolute inset-0 bg-ink-deep">
      <img src={kitchenBefore} alt="" className="absolute inset-0 h-full w-full object-cover sr-tv-zoom" />
      <div className="absolute inset-0 sr-tv-wipe">
        <img src={kitchen} alt="" className="absolute inset-0 h-full w-full object-cover sr-tv-zoom" />
      </div>
      <div className="absolute inset-y-0 left-0 w-[4px] -translate-x-full bg-ember shadow-[0_0_40px_6px_var(--sr-ember)] sr-tv-wipe-line" />
      <div className="absolute inset-0 sr-tv-scrim" />
      <div className="relative flex h-full flex-col justify-center pb-[10vh] pl-[6vw]">
        <Eyebrow>Before &amp; After</Eyebrow>
        <Headline lines={["From shell", "to showpiece."]} accent={1} />
        <Lead delay={1600}>Bring us your empty room and your sizes. We&apos;ll bring the boards, the cutting and the fittings.</Lead>
      </div>
      <div className="absolute bottom-[16vh] right-[4vw] flex gap-[1vw] sr-anim-fade [animation-delay:1200ms]">
        <span className="rounded-full bg-ink-deep/70 px-[1.2vw] py-[0.8vh] sr-label text-ivory/80 backdrop-blur-md">Before</span>
        <span className="rounded-full bg-ember px-[1.2vw] py-[0.8vh] sr-label text-ivory sr-anim-fade [animation-delay:5000ms]">After</span>
      </div>
      <Illustrative />
    </div>
  );
}

function SceneCutting() {
  return (
    <PhotoScene image={cutting} side="right" motion="pan">
      <Eyebrow>Precision Cutting</Eyebrow>
      <Headline lines={["Cut to", "your sizes."]} accent={1} />
      <Lead>Send your board type and measurements on WhatsApp — we cut them ready to assemble or fit.</Lead>
    </PhotoScene>
  );
}

function SceneEdging() {
  return (
    <PhotoScene image={edging}>
      <Eyebrow>Expert Edging</Eyebrow>
      <Headline lines={["Every edge.", "Perfect."]} accent={1} />
      <Lead>A clean, durable finish on every cut edge.</Lead>
    </PhotoScene>
  );
}

function SceneWardrobe() {
  return (
    <PhotoScene image={wardrobe} side="right">
      <Eyebrow>Wardrobes</Eyebrow>
      <Headline lines={["Storage,", "beautifully", "built."]} accent={2} />
      <Lead>Wardrobes cut, edged and professionally assembled.</Lead>
    </PhotoScene>
  );
}

function SceneHardware() {
  const tags = ["Hinges", "Handles", "Drawer Runners", "Locks", "Kitchen Systems", "Sinks & Taps"];
  return (
    <PhotoScene image={hardware} motion="pan">
      <Eyebrow>2026 Product Range</Eyebrow>
      <h2 className="mt-[3vh] flex items-start text-ivory">
        <span className="sr-tv-mega text-ember sr-tv-count [animation-delay:400ms] [font-size:clamp(6rem,15vw,19rem)]">700+</span>
      </h2>
      <p className="sr-title mt-[1vh] text-ivory sr-anim-fade-up [animation-delay:800ms]">fittings in our catalogue</p>
      <div className="mt-[4.4vh] flex max-w-[44vw] flex-wrap gap-[0.8vw]">
        {tags.map((t, i) => (
          <span key={t} className="rounded-full border border-line-strong bg-ink-deep/40 px-[1.3vw] py-[1vh] sr-label text-ivory/85 backdrop-blur-md sr-anim-fade-up" style={{ animationDelay: `${1200 + i * 140}ms` }}>
            {t}
          </span>
        ))}
      </div>
    </PhotoScene>
  );
}

function SceneSpotlight() {
  const items = attractFeaturedIds.map(productById).filter((p) => p !== undefined);
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % items.length), SCENE_DURATION / items.length);
    return () => clearInterval(t);
  }, [items.length]);
  const p = items[i];
  if (!p) return null;
  return (
    <div className="absolute inset-0 grid grid-cols-[46fr_54fr] bg-ink">
      <div className="relative flex flex-col justify-center pb-[10vh] pl-[6vw] pr-[3vw]">
        <Eyebrow>New Edition 2026</Eyebrow>
        <div key={p.id}>
          <h2 className="sr-tv-mega mt-[3.4vh] text-ivory sr-anim-mask-up [font-size:clamp(3rem,6vw,7.5rem)]">{p.name}</h2>
          {p.codes?.[0] && <p className="sr-heading mt-[3vh] text-ember sr-anim-fade-up [animation-delay:300ms]">{p.codes.join(" · ")}</p>}
          {p.description && <Lead delay={500}>{p.description}</Lead>}
        </div>
        <div className="mt-[5vh] flex gap-[0.6vw]">
          {items.map((it, n) => (
            <span key={it.id} className={`h-[3px] w-[3.4vw] transition-colors duration-700 ${n === i ? "bg-ember" : "bg-line-strong"}`} />
          ))}
        </div>
      </div>
      <div key={p.id} className="relative sr-anim-reveal-x">
        <ProductVisual image={p.image} eager float fill className="absolute inset-0" padding="p-[20%_18%_26%]" />
      </div>
    </div>
  );
}

function SceneGranite() {
  return (
    <PhotoScene image={granite} side="right" motion="pan">
      <Eyebrow>Granite Tops</Eyebrow>
      <Headline lines={["Set in", "stone."]} accent={1} />
      <Lead>Granite tops for kitchens, vanities and counters.</Lead>
    </PhotoScene>
  );
}

function SceneOffice() {
  return (
    <PhotoScene image={office}>
      <Eyebrow>Furniture &amp; Interiors</Eyebrow>
      <Headline lines={["Home.", "Office.", "Done."]} accent={2} />
      <Lead>Furniture and interior design for the home and office.</Lead>
    </PhotoScene>
  );
}

function SceneServices() {
  return (
    <div className="absolute inset-0 bg-ink">
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(var(--sr-ivory)_1px,transparent_1px),linear-gradient(90deg,var(--sr-ivory)_1px,transparent_1px)] [background-size:8vw_8vw]" />
      <div className="relative flex h-full flex-col px-[6vw] pb-[16vh] pt-[16vh]">
        <Eyebrow>Everything Under One Roof</Eyebrow>
        <div className="mt-[5vh] grid flex-1 grid-cols-4 grid-rows-2 border-l border-t border-line">
          {services.map((s, i) => (
            <div key={s.id} className="flex flex-col justify-between border-b border-r border-line p-[1.8vw] sr-anim-fade-up" style={{ animationDelay: `${300 + i * 140}ms` }}>
              <span className="sr-heading text-ember">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="sr-title text-ivory [font-size:clamp(1.6rem,2.5vw,3.2rem)]">{s.name}</h3>
                <p className="sr-body mt-[1.2vh] text-ash">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SceneHowItWorks() {
  return (
    <div className="absolute inset-0 bg-ink-deep">
      <img src={cutting} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25 sr-tv-zoom" />
      <div className="absolute inset-0 sr-vignette" />
      <div className="relative flex h-full flex-col justify-center px-[6vw] pb-[12vh]">
        <Eyebrow>How It Works</Eyebrow>
        <Headline lines={["Quote in", "2 hours."]} accent={1} />
        <div className="mt-[6vh] grid grid-cols-4 gap-[1.4vw]">
          {processSteps.map((s, i) => (
            <div key={s.n} className="border-t-2 border-ember pt-[2.4vh] sr-anim-fade-up" style={{ animationDelay: `${1300 + i * 260}ms` }}>
              <span className="sr-eyebrow text-ash">Step {s.n}</span>
              <h3 className="sr-heading mt-[1.4vh] text-ivory">{s.title}</h3>
              <p className="sr-body mt-[1vh] text-ash">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SceneCta() {
  return (
    <div className="absolute inset-0 bg-ember">
      <div className="absolute inset-0 opacity-25 mix-blend-multiply">
        <img src={boardsStock} alt="" className="h-full w-full object-cover sr-tv-zoom" />
      </div>
      <div className="relative grid h-full grid-cols-[1fr_auto] items-center gap-[6vw] px-[6vw]">
        <div>
          <Logo className="w-[15vw] sr-anim-fade-up" />
          <p className="sr-eyebrow mt-[5vh] text-ivory/85 sr-anim-fade-up [animation-delay:300ms]">WhatsApp your sizes for a quote</p>
          <p className="sr-tv-mega mt-[2.6vh] text-ivory sr-anim-mask-up [animation-delay:500ms] [font-size:clamp(3.5rem,7.6vw,10rem)]">{contact.whatsappDisplay}</p>
          <div className="mt-[5vh] grid max-w-[54vw] grid-cols-2 gap-[3vw] sr-anim-fade-up [animation-delay:1100ms]">
            <div>
              <p className="sr-eyebrow text-ivory/70">Visit us</p>
              {contact.addressLines.map((l) => (
                <p key={l} className="sr-heading mt-[1vh] text-ivory">{l}</p>
              ))}
            </div>
            <div>
              <p className="sr-eyebrow text-ivory/70">Open</p>
              {contact.hours.map((h) => (
                <p key={h.days} className="sr-heading mt-[1vh] text-ivory">
                  {h.days} <span className="text-ivory/70">{h.time}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="w-[19vw] sr-anim-fade-up [animation-delay:900ms] [&_figcaption]:text-ivory">
          <QrCode value={WA_LINK} label="Scan to WhatsApp us" />
        </div>
      </div>
    </div>
  );
}

const SCENES: { id: string; render: () => ReactNode; bar: boolean }[] = [
  { id: "open", render: SceneOpen, bar: true },
  { id: "kitchen", render: SceneKitchen, bar: true },
  { id: "before-after", render: SceneBeforeAfter, bar: true },
  { id: "cutting", render: SceneCutting, bar: true },
  { id: "edging", render: SceneEdging, bar: true },
  { id: "hardware", render: SceneHardware, bar: true },
  { id: "spotlight", render: SceneSpotlight, bar: true },
  { id: "wardrobe", render: SceneWardrobe, bar: true },
  { id: "granite", render: SceneGranite, bar: true },
  { id: "services", render: SceneServices, bar: true },
  { id: "office", render: SceneOffice, bar: true },
  { id: "how", render: SceneHowItWorks, bar: true },
  { id: "cta", render: SceneCta, bar: false },
];

/* ─── Persistent contact bar ─────────────────────────────────────────────── */

function ContactBar({ visible }: { visible: boolean }) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 bottom-0 z-20 transition-all duration-1000 ${visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
    >
      <div className="mx-[3vw] mb-[3vh] flex items-center gap-[2.4vw] rounded-[1.4rem] border border-line bg-ink-deep/75 py-[1.6vh] pl-[2vw] pr-[1.6vh] backdrop-blur-xl">
        <div className="flex items-center gap-[1vw]">
          <span className="flex h-[4.4vh] w-[4.4vh] items-center justify-center rounded-full bg-ember">
            <svg viewBox="0 0 24 24" className="h-[55%] w-[55%] fill-ivory" aria-hidden>
              <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.7.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.8a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.89 9.88z" />
            </svg>
          </span>
          <div>
            <p className="sr-eyebrow text-ash [font-size:0.72rem]">WhatsApp for a quote</p>
            <p className="sr-heading text-ivory">{contact.whatsappDisplay}</p>
          </div>
        </div>
        <span className="h-[5vh] w-px bg-line-strong" />
        <div>
          <p className="sr-eyebrow text-ash [font-size:0.72rem]">Visit</p>
          <p className="sr-body text-ivory">{contact.addressLines.join(", ")}</p>
        </div>
        <span className="h-[5vh] w-px bg-line-strong" />
        <div>
          <p className="sr-eyebrow text-ash [font-size:0.72rem]">Open</p>
          <p className="sr-body text-ivory">Mon–Fri 08:00–17:00 · Sat 08:00–13:00</p>
        </div>
        <div className="ml-auto flex items-center gap-[1vw]">
          <span className="sr-label text-ash">{contact.websiteDisplay}</span>
          <div className="w-[8.4vh]">
            <QrCode value={WA_LINK} />
          </div>
        </div>
      </div>
    </div>
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

  // Preload all imagery once.
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

  // Click/Enter toggles fullscreen (handy when setting up the TV).
  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else document.documentElement.requestFullscreen?.().catch(() => {});
  };

  const scene = SCENES[state.current]!;
  const prev = state.prev >= 0 ? SCENES[state.prev]! : null;

  return (
    <main
      className="sr-root fixed inset-0 cursor-none select-none overflow-hidden bg-ink-deep font-body text-ivory"
      style={{ "--sr-speed": SHOWROOM_CONFIG.kiosk.ANIMATION_SPEED } as CSSProperties}
      onDoubleClick={toggleFullscreen}
      onContextMenu={(e) => e.preventDefault()}
      aria-label={`${brand.fullName} showroom display`}
    >
      {prev && (
        <div key={`p-${prev.id}-${state.cycle}`} className="absolute inset-0">
          {prev.render()}
        </div>
      )}
      <div key={`c-${scene.id}-${state.cycle}`} className="absolute inset-0 sr-anim-fade [animation-duration:1.4s]">
        {scene.render()}
      </div>

      {/* brand mark */}
      {scene.id !== "open" && scene.id !== "cta" && (
        <div className="absolute left-[3vw] top-[4.4vh] z-20 sr-anim-fade">
          <Logo className="w-[9vw]" />
        </div>
      )}

      {/* progress */}
      <div className="absolute inset-x-[3vw] top-[2vh] z-20 flex gap-[0.4vw]">
        {SCENES.map((s, n) => (
          <span key={s.id} className="relative h-[2px] flex-1 overflow-hidden bg-line">
            {n === state.current && (
              <span key={`${n}-${state.cycle}`} className="absolute inset-0 bg-ivory/80 sr-anim-progress" style={{ animationDuration: `${SCENE_DURATION}ms` }} />
            )}
            {n < state.current && <span className="absolute inset-0 bg-ivory/40" />}
          </span>
        ))}
      </div>

      <ContactBar visible={scene.bar} />
    </main>
  );
}
