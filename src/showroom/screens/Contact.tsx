import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SHOWROOM_CONFIG } from "../config";
import { buildWhatsAppLink } from "../lib/links";
import { Eyebrow } from "../components/primitives";
import { QrCode } from "../components/QrCode";

type Action = { id: string; label: string; value: string; detail?: ReactNode; qr: string; qrLabel: string };

export function Contact() {
  const { contact, whatsappGreeting } = SHOWROOM_CONFIG;
  const wa = buildWhatsAppLink(contact.whatsappNumber, whatsappGreeting);
  const actions: Action[] = [
    ...(wa ? [{ id: "wa", label: "WhatsApp", value: contact.whatsappDisplay, detail: "Quotes confirmed within 2 hours on trading days", qr: wa, qrLabel: "Scan to WhatsApp us" }] : []),
    { id: "call", label: "Call", value: contact.phoneNumbers[0].display, detail: contact.phoneNumbers[1]?.display, qr: `tel:${contact.phoneNumbers[0].tel}`, qrLabel: "Scan to call" },
    { id: "visit", label: "Visit Us", value: contact.addressLines[0], detail: contact.addressLines[1], qr: contact.mapsUrl, qrLabel: "Scan for directions" },
    { id: "web", label: "Website", value: contact.websiteDisplay, detail: contact.email, qr: contact.website, qrLabel: "Scan to visit" },
  ];
  const [activeId, setActiveId] = useState(actions[0]!.id);
  const active = actions.find((a) => a.id === activeId)!;

  return (
    <div className="absolute inset-0 grid grid-cols-[1fr_auto] gap-[4vw] bg-ink px-[5vw] pb-[13vh] pt-[16vh]">
      <div className="flex min-h-0 flex-col">
        <Eyebrow className="sr-anim-fade-up">Get in Touch</Eyebrow>
        <h1 className="sr-display mt-[2.4vh] text-ivory [font-size:clamp(2.75rem,4.6vw,6rem)]">
          <span className="block sr-anim-mask-up [animation-delay:100ms]">Ready to build</span>
          <span className="block sr-anim-mask-up [animation-delay:300ms]">something better?</span>
        </h1>

        <div className="mt-[5vh] grid grid-cols-4 gap-[1vw]" role="tablist" aria-label="Ways to contact">
          {actions.map((a, i) => {
            const on = a.id === activeId;
            return (
              <button
                key={a.id}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setActiveId(a.id)}
                className={cn(
                  "sr-touch flex min-h-[19vh] min-w-0 flex-col items-start justify-between gap-[1.6vh] rounded-3xl border p-[1.4vw] text-left sr-anim-fade-up",
                  on ? "border-ivory bg-ivory text-ink" : "border-line-strong text-ivory hover:border-ivory",
                )}
                style={{ animationDelay: `${400 + i * 80}ms` }}
              >
                <span className={cn("sr-eyebrow", on ? "text-ember" : "text-ash")}>{a.label}</span>
                <span>
                  <span className="sr-heading block break-words [font-size:clamp(1.05rem,1.3vw,1.65rem)]">{a.value}</span>
                  {a.detail && <span className={cn("sr-body mt-[0.6vh] block break-words [font-size:clamp(0.95rem,0.95vw,1.2rem)]", on ? "text-ink/70" : "text-ash")}>{a.detail}</span>}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-auto grid grid-cols-3 gap-[2vw] border-t border-line pt-[2.6vh] sr-anim-fade [animation-delay:800ms]">
          <div>
            <div className="sr-eyebrow text-ash-dim">Trading hours</div>
            {contact.hours.map((h) => (
              <div key={h.days} className="sr-body mt-[0.8vh] text-ivory">
                {h.days} <span className="text-ash">{h.time}</span>
              </div>
            ))}
          </div>
          <div>
            <div className="sr-eyebrow text-ash-dim">Payments</div>
            <div className="sr-body mt-[0.8vh] text-ivory">{contact.payments.join(" · ")}</div>
          </div>
          <div>
            <div className="sr-eyebrow text-ash-dim">Trade</div>
            <div className="sr-body mt-[0.8vh] text-ivory">Trade accounts for builders, joiners, designers and contractors.</div>
          </div>
        </div>
      </div>

      <div key={active.id} className="flex w-[22vw] flex-col justify-center sr-anim-fade-up">
        <QrCode value={active.qr} label={active.qrLabel} />
      </div>
    </div>
  );
}
