import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SHOWROOM_CONFIG } from "../config";

export function Logo({ className, tone = "light" }: { className?: string; tone?: "light" | "color" }) {
  return (
    <img
      src={tone === "light" ? SHOWROOM_CONFIG.brand.logoLight : SHOWROOM_CONFIG.brand.logo}
      alt={SHOWROOM_CONFIG.brand.fullName}
      className={cn("block h-auto select-none", className)}
      draggable={false}
    />
  );
}

export function Eyebrow({ children, className, accent = true }: { children: ReactNode; className?: string; accent?: boolean }) {
  return (
    <div className={cn("sr-eyebrow flex items-center gap-4 text-ash", className)}>
      {accent && <span className="inline-block h-[2px] w-10 bg-ember" aria-hidden />}
      <span>{children}</span>
    </div>
  );
}

export const touchButton = cva(
  "sr-touch sr-label inline-flex items-center justify-center gap-4 rounded-full whitespace-nowrap disabled:opacity-40",
  {
    variants: {
      variant: {
        primary: "bg-ivory text-ink hover:bg-bone",
        ember: "bg-ember text-ivory hover:brightness-110",
        ghost: "border border-line-strong text-ivory hover:bg-ivory/10",
        quiet: "text-ash hover:text-ivory",
        glass: "bg-ink-deep/60 text-ivory border border-line backdrop-blur-md hover:bg-ink-deep/80",
        onBone: "border border-ink-on-bone/25 text-ink-on-bone hover:bg-ink-on-bone/5",
      },
      size: {
        xl: "h-[clamp(4.5rem,7.5vh,6rem)] px-[clamp(2rem,3vw,3.5rem)]",
        lg: "h-[clamp(3.75rem,6vh,4.75rem)] px-[clamp(1.5rem,2.2vw,2.75rem)]",
        md: "h-[clamp(3.25rem,5vh,4rem)] px-[clamp(1.25rem,1.6vw,2rem)]",
        icon: "h-[clamp(3.5rem,6vh,4.75rem)] w-[clamp(3.5rem,6vh,4.75rem)]",
      },
    },
    defaultVariants: { variant: "primary", size: "lg" },
  },
);

export function TouchButton({
  className,
  variant,
  size,
  ...props
}: ComponentProps<"button"> & VariantProps<typeof touchButton>) {
  return <button type="button" className={cn(touchButton({ variant, size }), className)} {...props} />;
}

/** Tasteful, clearly-labelled placeholder for content that isn't supplied yet. */
export function Placeholder({ label, className, tone = "dark" }: { label: string; className?: string; tone?: "dark" | "bone" }) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden",
        tone === "dark" ? "bg-ink-raised text-ash-dim" : "bg-bone-deep text-ink-on-bone/50",
        className,
      )}
    >
      <svg className="absolute inset-0 h-full w-full opacity-[0.12]" aria-hidden>
        <defs>
          <pattern id="sr-ph" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="28" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#sr-ph)" />
      </svg>
      <span className="sr-eyebrow relative">{label}</span>
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  className,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("max-w-[72vw]", className)}>
      {eyebrow && <Eyebrow className="sr-anim-fade-up">{eyebrow}</Eyebrow>}
      <h1 className="sr-title mt-[2.4vh] text-ivory sr-anim-mask-up [animation-delay:80ms]">{title}</h1>
      {lead && <p className="sr-lead mt-[2.4vh] max-w-[40vw] text-ash sr-anim-fade-up [animation-delay:220ms]">{lead}</p>}
    </header>
  );
}

export function ArrowIcon({ dir = "right", className }: { dir?: "left" | "right" | "up" | "down"; className?: string }) {
  const rot = { right: 0, down: 90, left: 180, up: 270 }[dir];
  return (
    <svg viewBox="0 0 24 24" className={cn("h-[1.4em] w-[1.4em]", className)} style={{ transform: `rotate(${rot}deg)` }} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-[1.4em] w-[1.4em]", className)} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}
