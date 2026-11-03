import { useEffect, useRef, useState, type CSSProperties } from "react";
import { SHOWROOM_CONFIG } from "./config";
import { isIdle } from "./lib/links";
import { ShowroomProvider, screenKey, useShowroom, type Screen } from "./state";
import { Chrome } from "./components/Chrome";
import { EnquirySheet } from "./components/EnquirySheet";
import { TouchButton } from "./components/primitives";
import { Attract } from "./screens/Attract";
import { Home } from "./screens/Home";
import { Explore } from "./screens/Explore";
import { Category } from "./screens/Category";
import { ProductDetail } from "./screens/ProductDetail";
import { Spaces } from "./screens/Spaces";
import { SpaceDetail } from "./screens/SpaceDetail";
import { Services } from "./screens/Services";
import { Projects } from "./screens/Projects";
import { Featured } from "./screens/Featured";
import { Contact } from "./screens/Contact";

const { IDLE_TIMEOUT, ANIMATION_SPEED } = SHOWROOM_CONFIG.kiosk;
const WARNING_MS = 10000;

function renderScreen(s: Screen) {
  switch (s.name) {
    case "home": return <Home />;
    case "explore": return <Explore />;
    case "category": return <Category id={s.id} />;
    case "product": return <ProductDetail id={s.id} />;
    case "spaces": return <Spaces />;
    case "space": return <SpaceDetail id={s.id} />;
    case "services": return <Services />;
    case "projects": return <Projects />;
    case "featured": return <Featured />;
    case "contact": return <Contact />;
  }
}

/** Returns to attract mode after IDLE_TIMEOUT, with a gentle warning first. */
function useIdleReset() {
  const { mode, reset } = useShowroom();
  const last = useRef(Date.now());
  const [warning, setWarning] = useState(false);

  useEffect(() => {
    if (mode !== "interactive") return;
    last.current = Date.now();
    const bump = () => {
      last.current = Date.now();
      setWarning(false);
    };
    const events = ["pointerdown", "keydown", "wheel", "touchstart"] as const;
    events.forEach((e) => window.addEventListener(e, bump, { passive: true, capture: true }));
    window.addEventListener("scroll", bump, { passive: true, capture: true });
    const t = setInterval(() => {
      const now = Date.now();
      if (isIdle(last.current, now, IDLE_TIMEOUT)) {
        setWarning(false);
        reset();
      } else if (isIdle(last.current, now, IDLE_TIMEOUT - WARNING_MS)) {
        setWarning(true);
      }
    }, 500);
    return () => {
      events.forEach((e) => window.removeEventListener(e, bump, { capture: true }));
      window.removeEventListener("scroll", bump, { capture: true });
      clearInterval(t);
    };
  }, [mode, reset]);

  return warning;
}

function Stage() {
  const { mode, screen, start, back, home, enquiry, canGoBack } = useShowroom();
  const warning = useIdleReset();

  // Keyboard / remote fallback
  useEffect(() => {
    if (mode !== "interactive") return;
    const onKey = (e: KeyboardEvent) => {
      if (enquiry) return;
      if ((e.key === "Escape" || e.key === "Backspace") && canGoBack) back();
      if (e.key === "Home") home();
      if (e.key.toLowerCase() === "f" && !e.metaKey && !e.ctrlKey) {
        if (document.fullscreenElement) document.exitFullscreen?.();
        else document.documentElement.requestFullscreen?.().catch(() => {});
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode, enquiry, canGoBack, back, home]);

  return (
    <>
      {mode === "interactive" && (
        <>
          <div key={screenKey(screen)} className="absolute inset-0 sr-anim-fade">
            {renderScreen(screen)}
          </div>
          <Chrome />
          <EnquirySheet />
          {warning && (
            <div className="absolute inset-x-0 top-[13vh] z-[60] flex justify-center sr-anim-fade-up">
              <div className="flex items-center gap-[1.4vw] rounded-full border border-line bg-ink-deep/85 py-[1vh] pl-[2vw] pr-[1vh] backdrop-blur-md">
                <span className="sr-label text-ivory">Still exploring?</span>
                <TouchButton variant="primary" size="md">Keep browsing</TouchButton>
              </div>
            </div>
          )}
        </>
      )}
      {mode === "attract" && <Attract onStart={start} />}
    </>
  );
}

export function Showroom() {
  useEffect(() => {
    if (import.meta.env.PROD && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  return (
    <ShowroomProvider>
      <main
        className="sr-root fixed inset-0 select-none overflow-hidden bg-ink font-body text-ivory [touch-action:manipulation]"
        style={{ "--sr-speed": ANIMATION_SPEED } as CSSProperties}
        onContextMenu={(e) => e.preventDefault()}
      >
        <Stage />
      </main>
    </ShowroomProvider>
  );
}
