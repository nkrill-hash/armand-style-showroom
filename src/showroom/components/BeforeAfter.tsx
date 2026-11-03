import { useCallback, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { cn } from "@/lib/utils";
import type { ProductImage } from "../types";
import { Placeholder } from "./primitives";

/** Draggable before/after comparison. Works with touch, mouse and arrow keys. */
export function BeforeAfter({
  before,
  after,
  className,
}: {
  before: ProductImage | null;
  after: ProductImage | null;
  className?: string;
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  const onDown = (e: PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    update(e.clientX);
  };
  const onMove = (e: PointerEvent) => dragging.current && update(e.clientX);
  const onUp = () => (dragging.current = false);
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
    if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
  };

  const layer = (img: ProductImage | null, label: string) =>
    img ? (
      <img src={img.src} alt={img.alt} className="absolute inset-0 h-full w-full object-cover" draggable={false} />
    ) : (
      <Placeholder label={label} className="absolute inset-0" />
    );

  return (
    <div
      ref={ref}
      className={cn("relative touch-none select-none overflow-hidden rounded-2xl", className)}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
      {layer(after, "After Image")}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {layer(before, "Before Image")}
      </div>
      <span className="sr-label absolute left-[2vw] top-[2vh] rounded-full bg-ink-deep/70 px-5 py-2 text-ivory">Before</span>
      <span className="sr-label absolute right-[2vw] top-[2vh] rounded-full bg-ink-deep/70 px-5 py-2 text-ivory">After</span>
      <div className="absolute inset-y-0 w-[2px] bg-ivory" style={{ left: `${pos}%` }}>
        <div
          role="slider"
          tabIndex={0}
          aria-label="Compare before and after"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onKeyDown={onKey}
          className="sr-touch absolute left-1/2 top-1/2 flex h-[clamp(4rem,7vh,5.5rem)] w-[clamp(4rem,7vh,5.5rem)] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ivory text-ink sr-plinth-shadow"
        >
          <svg viewBox="0 0 24 24" className="h-1/2 w-1/2" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
