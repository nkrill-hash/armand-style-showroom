import { useMemo } from "react";
import { renderSVG } from "uqr";
import { cn } from "@/lib/utils";

/** Offline QR code (generated locally, no network needed). */
export function QrCode({ value, className, label }: { value: string; className?: string; label?: string }) {
  const svg = useMemo(
    () => renderSVG(value, { ecc: "M", border: 2, pixelSize: 10, whiteColor: "#ffffff", blackColor: "#1e1d1f" }),
    [value],
  );
  return (
    <figure className={cn("flex flex-col items-center gap-[1.6vh]", className)}>
      <div
        className="aspect-square w-full overflow-hidden rounded-2xl bg-ivory p-[4%] sr-plinth-shadow [&>svg]:h-full [&>svg]:w-full"
        role="img"
        aria-label={label ? `QR code: ${label}` : "QR code"}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      {label && <figcaption className="sr-label text-center text-ash">{label}</figcaption>}
    </figure>
  );
}
