import { useEffect, useRef } from "react";
import { SHOWROOM_CONFIG } from "../config";
import { productById } from "../data/products";
import { buildWhatsAppLink, productEnquiryMessage } from "../lib/links";
import { useShowroom } from "../state";
import { CloseIcon, Eyebrow, TouchButton } from "./primitives";
import { ProductVisual } from "./ProductVisual";
import { QrCode } from "./QrCode";

/** Full-screen enquiry overlay: scan to WhatsApp (prefilled), or call/visit. */
export function EnquirySheet() {
  const { enquiry, closeEnquiry } = useShowroom();
  const closeRef = useRef<HTMLButtonElement>(null);
  const product = enquiry?.productId ? productById(enquiry.productId) : undefined;
  const { contact } = SHOWROOM_CONFIG;

  useEffect(() => {
    if (!enquiry) return;
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeEnquiry();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      prev?.focus?.();
    };
  }, [enquiry, closeEnquiry]);

  if (!enquiry) return null;

  const message = product
    ? productEnquiryMessage(product.name, product.codes?.[0])
    : SHOWROOM_CONFIG.whatsappGreeting;
  const wa = buildWhatsAppLink(contact.whatsappNumber, message);
  const qrValue = wa ?? SHOWROOM_CONFIG.qrDestination;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-ink-deep/80 backdrop-blur-xl sr-anim-fade" role="dialog" aria-modal="true" aria-label="Enquire">
      <button type="button" className="absolute inset-0 cursor-default" onClick={closeEnquiry} aria-label="Close enquiry" tabIndex={-1} />
      <div className="relative grid w-[82vw] grid-cols-[1fr_auto] gap-[4vw] rounded-[2rem] border border-line bg-ink p-[4vw] sr-anim-fade-up">
        <TouchButton ref={closeRef} variant="ghost" size="icon" className="absolute right-[2vw] top-[2vw]" onClick={closeEnquiry} aria-label="Close">
          <CloseIcon />
        </TouchButton>

        <div className="flex flex-col">
          <Eyebrow>{product ? "Enquire about this product" : "Talk to Armand"}</Eyebrow>
          <h2 className="sr-title mt-[2vh] text-ivory">{product ? product.name : "How can we help?"}</h2>
          {product?.codes && (
            <p className="sr-label mt-[1.6vh] text-ember">Code {product.codes.join(" · ")}</p>
          )}
          <p className="sr-lead mt-[3vh] max-w-[38vw] text-ash">
            {wa
              ? "Scan with your phone camera to open WhatsApp — your message is ready to send."
              : "Scan to visit our website."}
          </p>

          <div className="mt-auto grid grid-cols-2 gap-[2vw] pt-[5vh]">
            <div>
              <div className="sr-eyebrow text-ash-dim">Call</div>
              {contact.phoneNumbers.map((p) => (
                <div key={p.tel} className="sr-heading mt-[1vh] text-ivory">{p.display}</div>
              ))}
            </div>
            <div>
              <div className="sr-eyebrow text-ash-dim">Visit</div>
              {contact.addressLines.map((l) => (
                <div key={l} className="sr-body mt-[1vh] text-ivory">{l}</div>
              ))}
              <div className="sr-body mt-[1vh] text-ash">Mon–Fri 08:00–17:00 · Sat 08:00–13:00</div>
            </div>
          </div>
        </div>

        <div className="flex w-[24vw] flex-col gap-[3vh]">
          {product && (
            <ProductVisual image={product.image} className="aspect-[16/10] w-full rounded-2xl" padding="p-[10%]" />
          )}
          <QrCode value={qrValue} label={wa ? `WhatsApp ${contact.whatsappDisplay}` : contact.websiteDisplay} className={product ? "w-[16vw] self-center" : "w-full"} />
        </div>
      </div>
    </div>
  );
}
