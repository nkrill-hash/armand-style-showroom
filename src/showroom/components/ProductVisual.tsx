import { cn } from "@/lib/utils";
import type { ProductImage } from "../types";
import { Placeholder } from "./primitives";

/**
 * Presents a product image consistently: cut-outs sit on a warm bone plinth
 * (multiply blend removes white backgrounds), photos fill the frame.
 */
export function ProductVisual({
  image,
  className,
  imgClassName,
  eager = false,
  float = false,
  fill = false,
  padding = "p-[8%]",
}: {
  image: ProductImage | null;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
  float?: boolean;
  /** Scale cut-outs up to fill the padded frame. */
  fill?: boolean;
  padding?: string;
}) {
  if (!image) return <Placeholder label="Product Image" tone="bone" className={className ?? ""} />;
  const isPhoto = image.style === "photo";
  // Studio shots carry their own paper backdrop, so they show as framed tiles.
  const isStudio = !isPhoto && image.src.includes("/studio/");
  return (
    <div className={cn("relative overflow-hidden bg-bone", className)}>
      {!isPhoto && (
        <div
          className="pointer-events-none absolute inset-x-[12%] bottom-[9%] h-[6%] rounded-[50%] bg-ink-on-bone/15 blur-2xl"
          aria-hidden
        />
      )}
      <div className={cn("absolute inset-0 flex items-center justify-center", !isPhoto && padding)}>
        <img
          src={image.src}
          alt={image.alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
          className={cn(
            isPhoto ? "h-full w-full object-cover" : cn("object-contain mix-blend-multiply", fill && !isStudio ? "h-full w-full" : "max-h-full max-w-full"),
            isStudio && "rounded-[1.2vw]",
            float && !isPhoto && "sr-anim-float",
            imgClassName,
          )}
        />
      </div>
    </div>
  );
}
