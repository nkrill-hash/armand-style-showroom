import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowIcon, TouchButton } from "./primitives";

/** Horizontal, touch-scrollable rail with large previous/next controls. */
export function Rail({ children, className, controls = true }: { children: ReactNode; className?: string; controls?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const page = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.75, behavior: "smooth" });
  return (
    <div className={cn("relative", className)}>
      <div
        ref={ref}
        className="sr-no-scrollbar flex h-full scroll-px-[5vw] snap-x snap-mandatory gap-[1.6vw] overflow-x-auto overscroll-x-contain scroll-smooth px-[5vw]"
      >
        {children}
        <div className="w-[3vw] shrink-0" aria-hidden />
      </div>
      {controls && (
        <div className="absolute -top-[10vh] right-[5vw] flex gap-[0.8vw]">
          <TouchButton variant="ghost" size="icon" onClick={() => page(-1)} aria-label="Previous">
            <ArrowIcon dir="left" />
          </TouchButton>
          <TouchButton variant="ghost" size="icon" onClick={() => page(1)} aria-label="Next">
            <ArrowIcon />
          </TouchButton>
        </div>
      )}
    </div>
  );
}
