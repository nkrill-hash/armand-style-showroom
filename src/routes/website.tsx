import { useEffect, useRef, useState } from "react";
import type * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import capturedCSS from "../styles/site.css?raw";

export const Route = createFileRoute("/website")({
  head: () => ({
    meta: [
      { title: "Boards, Cutting & Fittings in Bulawayo, Zimbabwe | Armand Carpentry & Designs" },
      { name: "description", content: "Armand Carpentry & Designs — melamine, super wood and granite tops, precision cutting, expert edging and professional assembly, plus hinges, handles and kitchen fittings." },
      { property: "og:title", content: "Armand Carpentry & Designs — Boards, Cutting & Fittings" },
      { property: "og:description", content: "Boards cut and edged to your sizes, plus the fittings to finish the job. Bulawayo, Zimbabwe." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  staticData: { importedDocument: { html: { "lang": "en" }, body: { "className": "has-wa-fab" } } },
  component: Index,
});

function Index() {
  useImportedLayout();
  const [menuOpen, setMenuOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  useEffect(() => {
    if (menuOpen) {
      closeRef.current?.focus();
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
    if (wasOpen.current) hamburgerRef.current?.focus();
    return undefined;
  }, [menuOpen]);
  useEffect(() => {
    wasOpen.current = menuOpen;
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);
  return (
    <>
      <style>{capturedCSS}</style>
      <a className="skip-link absolute top-[8px] [font-weight:700] [z-index:10000]" href="#main-content">Skip to main content</a>
      <ImportedNavMainNavigation menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((o) => !o)} hamburgerRef={hamburgerRef} />
      <span id="main-content" tabIndex={-1} />
      <ImportedSectionBuiltToLastPrecision />
      <div className="trust-strip items-center justify-between [overflow-x:auto] [@media(max-width:768px)]:[overflow-x:auto]">
        <div className="ts-item items-center gap-[8px] [flex-shrink:0]">
          <span className="ts-icon items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F36523" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
          <span className="ts-text whitespace-nowrap [font-family:Barlow,sans-serif] [font-weight:500] [letter-spacing:0.3px]">Zimbabwe Registered Company</span>
        </div>
        <div className="ts-divider h-[20px] [flex-shrink:0] [width:1px]" />
        <div className="ts-item items-center gap-[8px] [flex-shrink:0]">
          <span className="ts-icon items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="6" width="20" height="8" rx="1" />
              <path d="M17 14v7M7 14v7M17 3v3M7 3v3" />
            </svg>
          </span>
          <span className="ts-text whitespace-nowrap [font-family:Barlow,sans-serif] [font-weight:500] [letter-spacing:0.3px]">Trade Accounts Welcome</span>
        </div>
        <div className="ts-divider h-[20px] [flex-shrink:0] [width:1px]" />
        <div className="ts-item items-center gap-[8px] [flex-shrink:0]">
          <span className="ts-icon items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3" />
              <rect x="9" y="11" width="14" height="10" rx="1" />
              <circle cx="12" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
            </svg>
          </span>
          <span className="ts-text whitespace-nowrap [font-family:Barlow,sans-serif] [font-weight:500] [letter-spacing:0.3px]">Nationwide Delivery Available</span>
        </div>
        <div className="ts-divider h-[20px] [flex-shrink:0] [width:1px]" />
        <div className="ts-item items-center gap-[8px] [flex-shrink:0]">
          <span className="ts-icon items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
              <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
            </svg>
          </span>
          <span className="ts-text whitespace-nowrap [font-family:Barlow,sans-serif] [font-weight:500] [letter-spacing:0.3px]">Bulk Order Specialists</span>
        </div>
        <div className="ts-divider h-[20px] [flex-shrink:0] [width:1px]" />
        <div className="ts-item items-center gap-[8px] [flex-shrink:0]">
          <span className="ts-icon items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
            </svg>
          </span>
          <span className="ts-text whitespace-nowrap [font-family:Barlow,sans-serif] [font-weight:500] [letter-spacing:0.3px]">WhatsApp Order Line</span>
        </div>
      </div>
      <ImportedSectionBoardsCuttingFittings />
      <div className="cat-section [overflow-x:auto] [scrollbar-width:none]" id="catNav">
        <div className="cat-track items-stretch [gap:0px] [min-width:max-content]"><button className="cat-btn active items-center flex-col gap-[5px] [flex-shrink:0]">{"\n      "}<span className="cb-icon items-center justify-center"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg></span>{"\n      "}<span className="cb-name uppercase whitespace-nowrap [font-weight:600] [letter-spacing:1.2px]">All Products</span>{"\n      "}<span className="cb-count [letter-spacing:1px]">734</span>{"\n    "}</button><button className="cat-btn items-center flex-col gap-[5px] [flex-shrink:0]">{"\n      "}<span className="cb-icon items-center justify-center"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4" /><path d="m12 2 1.5 3-1.5 1-1.5-1zm0 20-1.5-3 1.5-1 1.5 1zM2 12l3-1.5 1 1.5-1 1.5zm20 0-3 1.5-1-1.5 1-1.5z" /></svg></span>{"\n      "}<span className="cb-name uppercase whitespace-nowrap [font-weight:600] [letter-spacing:1.2px]">Hinges</span>{"\n      "}<span className="cb-count [letter-spacing:1px]">22</span>{"\n    "}</button><button className="cat-btn items-center flex-col gap-[5px] [flex-shrink:0]">{"\n      "}<span className="cb-icon items-center justify-center"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 4h3a2 2 0 0 1 2 2v14" /><path d="M2 20h3M13 20h9M10 12v.01" /><path d="M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561z" /></svg></span>{"\n      "}<span className="cb-name uppercase whitespace-nowrap [font-weight:600] [letter-spacing:1.2px]">Handles &amp; Knobs</span>{"\n      "}<span className="cb-count [letter-spacing:1px]">105</span>{"\n    "}</button><button className="cat-btn items-center flex-col gap-[5px] [flex-shrink:0]">{"\n      "}<span className="cb-icon items-center justify-center"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><path d="M6 6h.01M6 18h.01" /></svg></span>{"\n      "}<span className="cb-name uppercase whitespace-nowrap [font-weight:600] [letter-spacing:1.2px]">Drawer Systems</span>{"\n      "}<span className="cb-count [letter-spacing:1px]">21</span>{"\n    "}</button><button className="cat-btn items-center flex-col gap-[5px] [flex-shrink:0]">{"\n      "}<span className="cb-icon items-center justify-center"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg></span>{"\n      "}<span className="cb-name uppercase whitespace-nowrap [font-weight:600] [letter-spacing:1.2px]">Locks &amp; Security</span>{"\n      "}<span className="cb-count [letter-spacing:1px]">4</span>{"\n    "}</button><button className="cat-btn items-center flex-col gap-[5px] [flex-shrink:0]">{"\n      "}<span className="cb-icon items-center justify-center"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" /><path d="M7 7h.01" /></svg></span>{"\n      "}<span className="cb-name uppercase whitespace-nowrap [font-weight:600] [letter-spacing:1.2px]">Kitchen Fittings</span>{"\n      "}<span className="cb-count [letter-spacing:1px]">1</span>{"\n    "}</button><button className="cat-btn items-center flex-col gap-[5px] [flex-shrink:0]">{"\n      "}<span className="cb-icon items-center justify-center"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" /><path d="M9 18h6M10 22h4" /></svg></span>{"\n      "}<span className="cb-name uppercase whitespace-nowrap [font-weight:600] [letter-spacing:1.2px]">Lighting Hardware</span>{"\n      "}<span className="cb-count [letter-spacing:1px]">1</span>{"\n    "}</button><button className="cat-btn items-center flex-col gap-[5px] [flex-shrink:0]">{"\n      "}<span className="cb-icon items-center justify-center"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="20" height="8" rx="1" /><path d="M17 14v7M7 14v7M17 3v3M7 3v3" /></svg></span>{"\n      "}<span className="cb-name uppercase whitespace-nowrap [font-weight:600] [letter-spacing:1.2px]">Construction</span>{"\n      "}<span className="cb-count [letter-spacing:1px]">2</span>{"\n    "}</button><button className="cat-btn items-center flex-col gap-[5px] [flex-shrink:0]">{"\n      "}<span className="cb-icon items-center justify-center"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z" /></svg></span>{"\n      "}<span className="cb-name uppercase whitespace-nowrap [font-weight:600] [letter-spacing:1.2px]">Closet Systems</span>{"\n      "}<span className="cb-count [letter-spacing:1px]">2</span>{"\n    "}</button><button className="cat-btn items-center flex-col gap-[5px] [flex-shrink:0]">{"\n      "}<span className="cb-icon items-center justify-center"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg></span>{"\n      "}<span className="cb-name uppercase whitespace-nowrap [font-weight:600] [letter-spacing:1.2px]">Tools &amp; Fixings</span>{"\n      "}<span className="cb-count [letter-spacing:1px]">34</span>{"\n    "}</button><button className="cat-btn items-center flex-col gap-[5px] [flex-shrink:0]">{"\n      "}<span className="cb-icon items-center justify-center"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="1" /><path d="M3 9h18M9 21V9" /></svg></span>{"\n      "}<span className="cb-name uppercase whitespace-nowrap [font-weight:600] [letter-spacing:1.2px]">Boards &amp; Panels</span>{"\n      "}<span className="cb-count [letter-spacing:1px]">120</span>{"\n    "}</button><button className="cat-btn items-center flex-col gap-[5px] [flex-shrink:0]">{"\n      "}<span className="cb-icon items-center justify-center"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8h18v3H3zM3 14h18" /></svg></span>{"\n      "}<span className="cb-name uppercase whitespace-nowrap [font-weight:600] [letter-spacing:1.2px]">Edging</span>{"\n      "}<span className="cb-count [letter-spacing:1px]">130</span>{"\n    "}</button></div>
      </div>
      <ImportedSectionFeaturedProducts />
      <ImportedSectionTheArmandAdvantage />
      <section className={"how-section reveal-section \x76isible"} id="how-it-works">
        <div className={"\x63ontainer max-w-[1320px]"}>
          <div className="svc-head max-w-[960px] text-center">
            <div className="eyebrow items-center gap-[12px] uppercase [font-size:12px] [font-weight:600] justify-center">How It Works</div>
            <h2 className="section-title normal-case text-balance [font-weight:800]">From Sizes to <span className="accent">Sorted</span></h2>
          </div>
          <ol className="how-grid list-none relative [counter-reset:s_0]">
            <li className="how-step">
              <span className="how-n h-[44px] place-items-center w-[44px] [font:800_18px_Saira,sans-serif]" aria-hidden="true">1</span>
              <h3 className="uppercase text-balance">Send your sizes</h3>
              <p className="text-pretty [font-size:15px] [line-height:1.65]">WhatsApp us your board type, sizes and edging, or use the quote form.</p>
            </li>
            <li className="how-step">
              <span className="how-n h-[44px] place-items-center w-[44px] [font:800_18px_Saira,sans-serif]" aria-hidden="true">2</span>
              <h3 className="uppercase text-balance">Get your quote</h3>
              <p className="text-pretty [font-size:15px] [line-height:1.65]">We confirm stock, price and delivery within 2 hours on trading days.</p>
            </li>
            <li className="how-step">
              <span className="how-n h-[44px] place-items-center w-[44px] [font:800_18px_Saira,sans-serif]" aria-hidden="true">3</span>
              <h3 className="uppercase text-balance">We cut and edge</h3>
              <p className="text-pretty [font-size:15px] [line-height:1.65]">Your boards are cut and edged to size, ready to assemble.</p>
            </li>
            <li className="how-step">
              <span className="how-n h-[44px] place-items-center w-[44px] [font:800_18px_Saira,sans-serif]" aria-hidden="true">4</span>
              <h3 className="uppercase text-balance">Collect or delivery</h3>
              <p className="text-pretty [font-size:15px] [line-height:1.65]">Collect from Khami Rd, Bulawayo, or arrange delivery.</p>
            </li>
          </ol>
        </div>
      </section>
      <ImportedSectionFrequentlyAskedQuestions />
      <div className={"\x6frder-strip items-center flex-wrap gap-[32px] justify-between [@media(max-width:768px)]:flex-col [@media(max-width:768px)]:text-center"}>
        <div className="os-left">
          <h3 className="uppercase text-balance [font-size:28px] [font-weight:900]">Ready to Order?</h3>
          <p className="max-w-[440px] text-pretty [font-size:14px]">WhatsApp us your product list or spec sheet — we'll confirm stock, pricing and delivery within 2 hours.</p>
        </div>
        <div className="os-methods flex-wrap gap-[8px] [@media(max-width:768px)]:justify-center">
          <div className="os-badge [letter-spacing:1px]">EcoCash</div>
          <div className="os-badge [letter-spacing:1px]">Paynow</div>
          <div className="os-badge [letter-spacing:1px]">EFT</div>
          <div className="os-badge [letter-spacing:1px]">Bank Transfer</div>
        </div>
        <a className="os-cta uppercase whitespace-nowrap [font-family:Saira,sans-serif] [font-size:14px] [font-weight:800] [letter-spacing:2px] [@media(max-width:768px)]:items-center [@media(max-width:768px)]:justify-center [@media(max-width:768px)]:min-h-[48px]" href="https://wa.me/263780793585" rel="noopener" target="_blank">WhatsApp Now →</a>
      </div>
      <ImportedSectionComeAndSeeThe />
      <ImportedFooter />
      <button className={"\x73croll-top items-center h-[44px] justify-center fixed w-[44px] [box-shadow:var(--shadow-md)] [font-size:18px] [line-height:1] [z-index:400]"} id="scrollTop" aria-label="Back to top">↑</button>
      <ImportedAsideSiteMenu open={menuOpen} onClose={() => setMenuOpen(false)} closeRef={closeRef} />
      <div className={`mnp-overlay fixed [inset:0px] [z-index:590] ${menuOpen ? "open visible" : "invisible"}`} onClick={() => setMenuOpen(false)} aria-hidden="true" />
      <div className="fixed invisible [backdrop-filter:blur(3px)] [inset:0px] [z-index:1098]" id="brocCartOverlay" />
      <div className="flex-col fixed will-change-transform [box-shadow:none] [height:100dvh] [overflow:hidden] [right:0px] [top:0px] [z-index:1099]" id="brocCartDrawer" role="dialog" aria-modal="true" aria-label="Shopping cart">
        <div className="bcd-hdr items-center gap-[12px] justify-between [flex-shrink:0]">
          <div className="bcd-hdr-left items-center gap-[10px] [min-width:0px]"><span className="bcd-title uppercase whitespace-nowrap [font-family:Saira,sans-serif] [font-size:17px] [font-weight:900] [letter-spacing:1.5px]">Your Cart</span><span className="bcd-badge min-w-[18px] text-center [flex-shrink:0] [font-size:11px] [font-weight:700] [letter-spacing:0.5px]" id="bcdBadge">0</span></div>
          <button className="bcd-close items-center h-[34px] justify-center min-w-[34px] w-[34px] [flex-shrink:0]" id="bcdClose" aria-label="Close cart">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="[overflow:hidden] [min-height:0px]" style={{ flex: "1 1 0%", display: "flex", flexDirection: "column" }} id="bcdBody" />
        <div className="bcd-footer [flex-shrink:0]" style={{ display: "none" }} id="bcdFooter" />
      </div>
      <a className="wa-fab items-center gap-[10px] h-[56px] uppercase [font:700_13px_Saira,sans-serif] [letter-spacing:1px] [z-index:900] [@media(max-width:640px)]:justify-center [@media(max-width:640px)]:w-[56px]" aria-label="Chat with us on WhatsApp" href="https://wa.me/263780793585?text=Hi%20Armand%2C%20I%20am%20on%20your%20website%20(Boards%2C%20Cutting%20%26%20Fittings%20in%20Bulawayo%2C%20Zimbabwe)%20and%20would%20like%20some%20help." id="waFab" rel="noopener" target="_blank">
        <svg className="flex-[0_0_24px]" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.7.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.8a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.89 9.88zM20.5 3.49A11.8 11.8 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.05 24l6.3-1.65a11.88 11.88 0 0 0 5.69 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.44-8.42z" />
        </svg>
        <span>WhatsApp</span>
      </a>
    </>
  );
}

function ImportedNavMainNavigation({ menuOpen, onToggleMenu, hamburgerRef }: { menuOpen: boolean; onToggleMenu: () => void; hamburgerRef: React.RefObject<HTMLButtonElement | null> }) {
  return (
    <nav id="mainNav" aria-label="Main navigation" data-site-import-scroll-header={"{\"desktop\":{\"added\":[\"scrolled\"],\"removed\":[],\"threshold\":648},\"mobile\":{\"added\":[\"scrolled\"],\"removed\":[],\"threshold\":633}}"}>
      <div className="nav-inner">
        <a className="nav-brand" aria-label={"Armand Carpentry & Designs Home"} href="/website">
          <img className="nav-logo-img" src="/site-assets/171c03e7247768b7.png" width="400" height="224" alt={"Armand Carpentry & Designs logo"} />
        </a>
        <ul className="nav-menu" id="navMenu" role="list">
          <li>
            <a className="nav-link" href="/products.html">Products</a>
          </li>
          <li>
            <a className="nav-link" href="/portfolio.html">Portfolio</a>
          </li>
          <li>
            <a className="nav-link" href="/trade.html">Trade</a>
          </li>
          <li>
            <a className="nav-link" href="/contact.html">Contact</a>
          </li>
          <li>
            <a className="nav-link" href="/about.html">About</a>
          </li>
          <li>
            <a className="nav-link" aria-label="Sign in or create an account" href="/account.html">Account</a>
          </li>
        </ul>
        <div className="nav-actions"><button className="nav-search-btn" id="searchToggle" aria-label="Search">{"\n        "}<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>{"\n      "}</button><a className="nav-wish" aria-label="Saved items" href="/products.html?saved=1" id="navWish" title="Saved items"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" /></svg><span className="nav-wish-n" id="navWishN" hidden>0</span></a><div className="nav-user" id="navUser"><a className="nav-acct" aria-label="Sign in or create an account" href="/account.html" id="navAcct" title="Sign in"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg></a></div><button className="nav-cart" id="cartBtn" aria-label="View cart">{"\n        "}<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
            Cart
            <span className="cart-count" style={{ background: "rgba(255, 255, 255, 0.25)" }} id="cartCount">0</span>{"\n      "}</button><a className="nav-wa" href="https://wa.me/263780793585" rel="noopener" target="_blank">{"\n        "}<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" /></svg>
            WhatsApp Us
          </a><button ref={hamburgerRef} className={`nav-hamburger${menuOpen ? " open" : ""}`} id="navHamburger" aria-label="Toggle menu" aria-controls="siteMenuPanel" aria-expanded={menuOpen} onClick={onToggleMenu}>{"\n        "}<span /><span /><span />{"\n      "}</button></div>
      </div>
      <div className="nav-search-overlay" id="searchOverlay">
        <div className="search-inner"><input className="search-input" type="text" id="searchInput" placeholder="Search products, categories, SKUs..." autoComplete="off" /><button className="search-submit" aria-label="Search">→</button></div>
        <div className="search-suggestions"><span className="ss-label">Popular searches:</span><a className="ss-tag" href="/products.html?cat=hinges">Hinges</a><a className="ss-tag" href="/products.html?cat=handles">Handles</a><a className="ss-tag" href="/products.html?cat=drawers">Soft Close</a><a className="ss-tag" href="/products.html?cat=locks">Locks</a><a className="ss-tag" href="/products.html?cat=drawers">Drawer Runners</a></div>
      </div>
    </nav>
  );
}

function ImportedSectionBuiltToLastPrecision() {
  return (
    <section className="hero relative [overflow:hidden]" id="top">
      <div className="hero-grid-bg pointer-events-none absolute [inset:0px]" />
      <div className="hero-left flex-col justify-center relative [z-index:2]">
        <div className="hero-eyebrow">
          <div className="eyebrow items-center gap-[12px] uppercase [font-size:12px] [font-weight:600]">Boards | Cutting | Fittings</div>
        </div>
        <h1 className="hero-title uppercase text-balance [font-weight:800] [@media(max-width:768px)]:[font-size:clamp(48px,15vw,72px)]"><span className="ht-line1">Built to</span><span className="ht-line2">last.</span><span className="ht-line3 max-w-[22em] normal-case [font-family:Barlow,sans-serif] [font-size:clamp(17px,1.5vw,22px)] [font-weight:400] [letter-spacing:0px] [line-height:1.35]">Precision cutting, expert edging and professional assembly</span></h1>
        <p className="hero-body max-w-[480px] text-pretty [font-size:15px]">Melamine, super wood and granite tops — cut and edged to your sizes — plus the hinges, handles, drawer systems and kitchen fittings to finish the job. Armand supplies builders, joiners, designers and homeowners across Zimbabwe.</p>
        <div className="hero-ctas flex-wrap gap-[12px] [@media(max-width:480px)]:flex-col"><a className="btn-hero-primary uppercase [font-family:Saira,sans-serif] [font-size:13px] [font-weight:700] [letter-spacing:2px] [@media(max-width:480px)]:text-center [@media(max-width:480px)]:[width:100%] [@media(max-width:768px)]:items-center [@media(max-width:768px)]:justify-center [@media(max-width:768px)]:min-h-[48px]" href="/products.html">Browse Products</a><a className="btn-hero-ghost uppercase [font-family:Saira,sans-serif] [font-size:13px] [font-weight:600] [letter-spacing:2px] [@media(max-width:480px)]:text-center [@media(max-width:480px)]:[width:100%] [@media(max-width:768px)]:items-center [@media(max-width:768px)]:justify-center [@media(max-width:768px)]:min-h-[48px]" href="/contact.html">Request a Quote</a></div>
        <div className="hero-stats max-w-[470px]">
          <div className="hs-item">
            <div className="hs-num [font-family:Saira,sans-serif] [font-size:clamp(30px,3.4vw,44px)] [font-weight:900] [line-height:1]">700<sup className="align-super [font-size:18px]">+</sup></div>
            <div className="hs-label uppercase [letter-spacing:2px]">Products in Catalogue</div>
          </div>
          <div className="hs-item">
            <div className="hs-num [font-family:Saira,sans-serif] [font-size:clamp(30px,3.4vw,44px)] [font-weight:900] [line-height:1]">6</div>
            <div className="hs-label uppercase [letter-spacing:2px]">Days Open a Week</div>
          </div>
        </div>
      </div>
      <div className="hero-right relative [z-index:1]">
        <div className="bench flex-1 place-items-center relative [container-type:size] [overflow:hidden] [@media(max-width:1024px)]:[width:100%]">
          <div className="aspect-[1/0.9] relative w-[min(94cqw,111.111cqh_-_62.2222px)]"><a className="bp bp-hinges absolute top-[6%] [left:0px] [width:40%] [z-index:3]" href="/products.html?cat=hinges">{"\n          "}<img className="[animation-delay:var(--d,0s)] [width:100%]" style={{ transform: "translateY(0px)", opacity: "1" }} src="/site-assets/559254d202ff50ac.webp" alt="Brass, stainless steel and black butt hinges" width="747" height="900" />{"\n          "}<span className="bp-tag items-center gap-x-[8px] grid-cols-[auto_1fr] absolute top-[2%] whitespace-nowrap [backdrop-filter:blur(10px)] [font-family:Barlow,sans-serif] [left:0px] [z-index:5]"><i className="h-[8px] w-[8px]" /><b className="[font-weight:600] [line-height:1.2]">Hinges</b><em className="not-italic [font-size:11px] [line-height:1.3]">Brass, steel, black</em></span>{"\n        "}</a><a className="bp bp-handles left-[56%] absolute w-[42%] [top:0px] [z-index:1]" href="/products.html?cat=handles">{"\n          "}<img className="[animation-delay:var(--d,0s)] [width:100%]" style={{ transform: "translateY(0px)", opacity: "1" }} src="/site-assets/8fadeafdb0b663e7.webp" alt="Matte black lever handle and lock rose" width="900" height="834" />{"\n          "}<span className="bp-tag items-center gap-x-[8px] grid-cols-[auto_1fr] absolute top-[2%] whitespace-nowrap [backdrop-filter:blur(10px)] [bottom:auto] [font-family:Barlow,sans-serif] [right:0px] [z-index:5]"><i className="h-[8px] w-[8px]" /><b className="[font-weight:600] [line-height:1.2]">Handles</b><em className="not-italic [font-size:11px] [line-height:1.3]">Levers and locksets</em></span>{"\n        "}</a><a className="bp bp-drawers left-[18%] absolute w-[46%] [top:50%] [z-index:4]" href="/products.html?cat=drawers">{"\n          "}<img className="[animation-delay:var(--d,0s)] [width:100%]" style={{ transform: "translateY(0px)", opacity: "1" }} src="/site-assets/f2c2cdb15999305b.webp" alt="Black ball-bearing drawer runners with fixing screws" width="900" height="900" />{"\n          "}<span className="bp-tag items-center bottom-[8%] gap-x-[8px] grid-cols-[auto_1fr] absolute right-[-4%] whitespace-nowrap [backdrop-filter:blur(10px)] [font-family:Barlow,sans-serif] [z-index:5]"><i className="h-[8px] w-[8px]" /><b className="[font-weight:600] [line-height:1.2]">Drawer runners</b><em className="not-italic [font-size:11px] [line-height:1.3]">Ball-bearing, screws included</em></span>{"\n        "}</a><a className="bp bp-locks absolute top-[34%] w-[48%] [left:50%] [z-index:2]" href="/products.html?cat=locks">{"\n          "}<img className="[animation-delay:var(--d,0s)] [width:100%]" style={{ transform: "translateY(0px)", opacity: "1" }} src="/site-assets/34538f6fb1213e9d.webp" alt="Nickel cabinet lock with two keys" width="900" height="774" />{"\n          "}<span className="bp-tag items-center gap-x-[8px] grid-cols-[auto_1fr] absolute top-[4%] whitespace-nowrap [backdrop-filter:blur(10px)] [font-family:Barlow,sans-serif] [right:0px] [z-index:5]"><i className="h-[8px] w-[8px]" /><b className="[font-weight:600] [line-height:1.2]">Locks</b><em className="not-italic [font-size:11px] [line-height:1.3]">Cabinet and drawer</em></span>{"\n        "}</a></div>
          <div className="ruler h-[28px] absolute [bottom:0px] [left:0px] [mask-image:linear-gradient(90deg,transparent_0%,rgb(0,0,0)_35%)] [right:0px]" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

function ImportedSectionBoardsCuttingFittings() {
  return (
    <section className={"services-section reveal-section \x76isible"} id="services">
      <div className={"\x63ontainer max-w-[1320px]"}>
        <div className="svc-head max-w-[960px] text-center">
          <div className="eyebrow items-center gap-[12px] uppercase [font-size:12px] [font-weight:600] justify-center">What We Do</div>
          <h2 className="section-title normal-case text-balance [font-weight:800]">Boards, Cutting <span className="accent">&amp; Fittings</span></h2>
          <p className="svc-intro text-pretty [line-height:1.6]">From raw board to the final handle — everything for a finished job, under one roof.</p>
        </div>
        <div className="svc-grid"><a className="svc-card flex-col relative" aria-label="Get a quote for Boards" href="https://wa.me/263780793585?text=Hi%20Armand%20Carpentry%20%26%20Designs%2C%20I%27d%20like%20a%20quote%20for%3A%20Boards" rel="noopener" target="_blank">{"\n        "}<span className="svc-icon items-center justify-center"><svg className="[@media(max-width:600px)]:h-[22px] [@media(max-width:600px)]:w-[22px]" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="1" /><path d="M3 9h18M9 21V9" /></svg></span>{"\n        "}<h3 className="svc-title uppercase text-balance [font-weight:800]">Boards</h3>{"\n        "}<p className="svc-text flex-1 text-pretty [line-height:1.6]">Melamine and super wood boards for cabinets, wardrobes, shelving and furniture.</p>{"\n        "}<span className="svc-link uppercase [font-family:Saira,Barlow,sans-serif] [font-weight:700] [letter-spacing:1.2px]">Get a quote <span aria-hidden="true">→</span></span>{"\n      "}</a><a className="svc-card flex-col relative" aria-label="Get a quote for Board cutting" href="https://wa.me/263780793585?text=Hi%20Armand%20Carpentry%20%26%20Designs%2C%20I%27d%20like%20a%20quote%20for%3A%20Board%20cutting" rel="noopener" target="_blank">{"\n        "}<span className="svc-icon items-center justify-center"><svg className="[@media(max-width:600px)]:h-[22px] [@media(max-width:600px)]:w-[22px]" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12" /></svg></span>{"\n        "}<h3 className="svc-title uppercase text-balance [font-weight:800]">Cutting</h3>{"\n        "}<p className="svc-text flex-1 text-pretty [line-height:1.6]">Precision cutting to your sizes, ready to assemble or fit.</p>{"\n        "}<span className="svc-link uppercase [font-family:Saira,Barlow,sans-serif] [font-weight:700] [letter-spacing:1.2px]">Get a quote <span aria-hidden="true">→</span></span>{"\n      "}</a><a className="svc-card flex-col relative" aria-label="Get a quote for Edging" href="https://wa.me/263780793585?text=Hi%20Armand%20Carpentry%20%26%20Designs%2C%20I%27d%20like%20a%20quote%20for%3A%20Edging" rel="noopener" target="_blank">{"\n        "}<span className="svc-icon items-center justify-center"><svg className="[@media(max-width:600px)]:h-[22px] [@media(max-width:600px)]:w-[22px]" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8h18v3H3zM3 14h18" /></svg></span>{"\n        "}<h3 className="svc-title uppercase text-balance [font-weight:800]">Edging</h3>{"\n        "}<p className="svc-text flex-1 text-pretty [line-height:1.6]">Expert edging for a clean, durable finish on every cut edge.</p>{"\n        "}<span className="svc-link uppercase [font-family:Saira,Barlow,sans-serif] [font-weight:700] [letter-spacing:1.2px]">Get a quote <span aria-hidden="true">→</span></span>{"\n      "}</a><a className="svc-card flex-col relative" aria-label="Get a quote for Fittings" href="https://wa.me/263780793585?text=Hi%20Armand%20Carpentry%20%26%20Designs%2C%20I%27d%20like%20a%20quote%20for%3A%20Fittings" rel="noopener" target="_blank">{"\n        "}<span className="svc-icon items-center justify-center"><svg className="[@media(max-width:600px)]:h-[22px] [@media(max-width:600px)]:w-[22px]" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" /></svg></span>{"\n        "}<h3 className="svc-title uppercase text-balance [font-weight:800]">Fittings</h3>{"\n        "}<p className="svc-text flex-1 text-pretty [line-height:1.6]">Hinges, handles, drawer runners, locks and kitchen hardware.</p>{"\n        "}<span className="svc-link uppercase [font-family:Saira,Barlow,sans-serif] [font-weight:700] [letter-spacing:1.2px]">Get a quote <span aria-hidden="true">→</span></span>{"\n      "}</a><a className="svc-card flex-col relative" aria-label="Get a quote for Kitchen design and fitting" href="https://wa.me/263780793585?text=Hi%20Armand%20Carpentry%20%26%20Designs%2C%20I%27d%20like%20a%20quote%20for%3A%20Kitchen%20design%20and%20fitting" rel="noopener" target="_blank">{"\n        "}<span className="svc-icon items-center justify-center"><svg className="[@media(max-width:600px)]:h-[22px] [@media(max-width:600px)]:w-[22px]" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg></span>{"\n        "}<h3 className="svc-title uppercase text-balance [font-weight:800]">Kitchen Design &amp; Fitting</h3>{"\n        "}<p className="svc-text flex-1 text-pretty [line-height:1.6]">Kitchens designed and fitted, from boards and tops to the final handle.</p>{"\n        "}<span className="svc-link uppercase [font-family:Saira,Barlow,sans-serif] [font-weight:700] [letter-spacing:1.2px]">Get a quote <span aria-hidden="true">→</span></span>{"\n      "}</a><a className="svc-card flex-col relative" aria-label="Get a quote for Wardrobes" href="https://wa.me/263780793585?text=Hi%20Armand%20Carpentry%20%26%20Designs%2C%20I%27d%20like%20a%20quote%20for%3A%20Wardrobes" rel="noopener" target="_blank">{"\n        "}<span className="svc-icon items-center justify-center"><svg className="[@media(max-width:600px)]:h-[22px] [@media(max-width:600px)]:w-[22px]" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="2" width="16" height="20" rx="1" /><path d="M12 2v20M9 12v1.5M15 12v1.5" /></svg></span>{"\n        "}<h3 className="svc-title uppercase text-balance [font-weight:800]">Wardrobes</h3>{"\n        "}<p className="svc-text flex-1 text-pretty [line-height:1.6]">Wardrobes cut, edged and professionally assembled.</p>{"\n        "}<span className="svc-link uppercase [font-family:Saira,Barlow,sans-serif] [font-weight:700] [letter-spacing:1.2px]">Get a quote <span aria-hidden="true">→</span></span>{"\n      "}</a><a className="svc-card flex-col relative" aria-label="Get a quote for Furniture" href="https://wa.me/263780793585?text=Hi%20Armand%20Carpentry%20%26%20Designs%2C%20I%27d%20like%20a%20quote%20for%3A%20Furniture" rel="noopener" target="_blank">{"\n        "}<span className="svc-icon items-center justify-center"><svg className="[@media(max-width:600px)]:h-[22px] [@media(max-width:600px)]:w-[22px]" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 11V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3" /><path d="M2 13a2 2 0 0 1 4 0v2h12v-2a2 2 0 0 1 4 0v5H2z" /><path d="M5 18v2M19 18v2" /></svg></span>{"\n        "}<h3 className="svc-title uppercase text-balance [font-weight:800]">Furniture</h3>{"\n        "}<p className="svc-text flex-1 text-pretty [line-height:1.6]">Furniture and interior design for the home and office.</p>{"\n        "}<span className="svc-link uppercase [font-family:Saira,Barlow,sans-serif] [font-weight:700] [letter-spacing:1.2px]">Get a quote <span aria-hidden="true">→</span></span>{"\n      "}</a><a className="svc-card flex-col relative" aria-label="Get a quote for Granite tops" href="https://wa.me/263780793585?text=Hi%20Armand%20Carpentry%20%26%20Designs%2C%20I%27d%20like%20a%20quote%20for%3A%20Granite%20tops" rel="noopener" target="_blank">{"\n        "}<span className="svc-icon items-center justify-center"><svg className="[@media(max-width:600px)]:h-[22px] [@media(max-width:600px)]:w-[22px]" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 19 9 8l4 6 3-4 5 9z" /></svg></span>{"\n        "}<h3 className="svc-title uppercase text-balance [font-weight:800]">Granite</h3>{"\n        "}<p className="svc-text flex-1 text-pretty [line-height:1.6]">Granite tops for kitchens, vanities and counters.</p>{"\n        "}<span className="svc-link uppercase [font-family:Saira,Barlow,sans-serif] [font-weight:700] [letter-spacing:1.2px]">Get a quote <span aria-hidden="true">→</span></span>{"\n      "}</a></div>
        <div className="svc-cta items-center flex-wrap justify-center [gap:14px_24px] [@media(max-width:600px)]:flex-col [@media(max-width:600px)]:text-center"><span className="svc-cta-text [font-weight:500]">Not sure what you need? Send us your sizes or a sketch.</span><a className="btn-primary uppercase [font-family:Saira,sans-serif] [font-size:13px] [font-weight:700] [letter-spacing:2px] [@media(max-width:768px)]:items-center [@media(max-width:768px)]:justify-center [@media(max-width:768px)]:min-h-[48px]" href="/contact.html">Request a Quote</a><a className="svc-call [font-size:15px] [text-underline-offset:3px]" href="tel:+263292265490">or call +263 292 265 490</a></div>
      </div>
    </section>
  );
}

function ImportedSectionFeaturedProducts() {
  return (
    <section className="products-section" id="products">
      <div className={"\x63ontainer max-w-[1320px]"}>
        <div className="products-header justify-between [@media(max-width:768px)]:flex-col [@media(max-width:768px)]:gap-[16px]">
          <div>
            <div className="eyebrow items-center gap-[12px] uppercase [font-size:12px] [font-weight:600]">Our Catalogue</div>
            <h2 className="section-title normal-case text-balance [font-weight:800]" style={{ marginTop: "16px" }}>Featured <span className="accent">Products</span></h2>
          </div>
          <div className="ph-right items-center gap-[10px]">
            <a className="view-all-btn uppercase [font-family:Saira,sans-serif] [font-size:12px] [font-weight:700] [letter-spacing:1.5px]" href="/products.html">View All Products →</a>
          </div>
        </div>
        <div className="sx min-h-[60vh] [font-family:var(--sans)] [line-height:1.5]">
          <div className={"\x67rid"} id="sxHomeGrid">
            <article className="pcard flex-col relative">
              <div className="pmedia relative"><a className="pimg aspect-square relative [overflow:hidden]" aria-label="2.5sink Cascade 90mm" href="/product.html?id=388" tabIndex={-1}><img className="lightbg [width:100%]" src="/site-assets/962fd6d8a26c9d40.png" alt="2.5sink Cascade 90mm" loading="lazy" /></a><div className="pbadges flex-wrap gap-[6px] left-[12px] absolute top-[12px] [z-index:2]" /><button className="wish items-center h-[36px] justify-center absolute right-[10px] top-[10px] w-[36px] [box-shadow:rgba(0,0,0,0.1)_0px_1px_3px] [z-index:3]" aria-label="Save 2.5sink Cascade 90mm" aria-pressed="false"><svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><path d="M12 20.5s-7.5-4.6-9.2-9.4C1.7 7.8 3.6 4.5 7 4.5c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.4 0 5.3 3.3 4.2 6.6-1.7 4.8-9.2 9.4-9.2 9.4Z" /></svg></button><button className="qv-btn bottom-[12px] h-[42px] left-[12px] absolute right-[12px] uppercase [box-shadow:rgba(0,0,0,0.14)_0px_4px_14px] [letter-spacing:0.12em] [z-index:3]">Quick view</button></div>
              <div className="pbody flex-1 flex-col gap-[6px]">
                <div className="pcat uppercase [font:600_11.5px_var(--sans)] [font-family:var(--serif)]! [font-size:11.5px]! [letter-spacing:0.12em]">Sinks</div>
                <a className="pname min-h-[2.5em] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [letter-spacing:0px] [overflow:hidden]" href="/product.html?id=388">2.5sink Cascade 90mm</a>
                <div className="pdesc [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [font-size:13.5px] [line-height:1.5] [overflow:hidden]">Kitchen sink, 90mm</div>
                <div className="pfoot gap-[10px] justify-between [@media(max-width:640px)]:flex-col [@media(max-width:640px)]:gap-[10px]">
                  <div>
                    <div className="price whitespace-nowrap [font-family:var(--serif)] [font-size:21px] [font-variant-numeric:tabular-nums] [font-weight:800] [letter-spacing:-0.01em]">USD 400.00</div>
                    <div className="stock items-center gap-[6px] [font-size:12.5px]">In stock</div>
                  </div>
                  <button className="add items-center gap-[7px] h-[42px] uppercase [flex-shrink:0] [letter-spacing:0.1em] [@media(max-width:640px)]:justify-center [@media(max-width:640px)]:[width:100%]" aria-label="Add 2.5sink Cascade 90mm to cart">
                    <span>Add</span>
                    <svg className="h-[16px] w-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </div>
                <div className="sku uppercase [font-size:11.5px] [letter-spacing:0.06em]">SKU HD-SINK-004</div>
              </div>
            </article>
            <article className="pcard flex-col relative">
              <div className="pmedia relative"><a className="pimg aspect-square relative [overflow:hidden]" aria-label="5mm Masonary Bit" href="/product.html?id=32" tabIndex={-1}><div className="ph items-center flex-col gap-[14px] justify-center absolute [inset:0px]" aria-hidden="true"><span className="ph-ico"><svg className="h-[34px] w-[34px] [stroke-width:1.1]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14 6a4 4 0 0 0-5 5L3 17l4 4 6-6a4 4 0 0 0 5-5l-3 3-3-1-1-3z" /></svg></span><span className="ph-lbl text-center uppercase [font:600_11px_var(--serif)] [letter-spacing:0.18em]">Tools &amp; Fixings</span></div></a><div className="pbadges flex-wrap gap-[6px] left-[12px] absolute top-[12px] [z-index:2]" /><button className="wish items-center h-[36px] justify-center absolute right-[10px] top-[10px] w-[36px] [box-shadow:rgba(0,0,0,0.1)_0px_1px_3px] [z-index:3]" aria-label="Save 5mm Masonary Bit" aria-pressed="false"><svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><path d="M12 20.5s-7.5-4.6-9.2-9.4C1.7 7.8 3.6 4.5 7 4.5c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.4 0 5.3 3.3 4.2 6.6-1.7 4.8-9.2 9.4-9.2 9.4Z" /></svg></button><button className="qv-btn bottom-[12px] h-[42px] left-[12px] absolute right-[12px] uppercase [box-shadow:rgba(0,0,0,0.14)_0px_4px_14px] [letter-spacing:0.12em] [z-index:3]">Quick view</button></div>
              <div className="pbody flex-1 flex-col gap-[6px]">
                <div className="pcat uppercase [font:600_11.5px_var(--sans)] [font-family:var(--serif)]! [font-size:11.5px]! [letter-spacing:0.12em]">Tools &amp; Fixings</div>
                <a className="pname min-h-[2.5em] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [letter-spacing:0px] [overflow:hidden]" href="/product.html?id=32">5mm Masonary Bit</a>
                <div className="pdesc [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [font-size:13.5px] [line-height:1.5] [overflow:hidden]">Screwdriver bit, 5mm</div>
                <div className="pfoot gap-[10px] justify-between [@media(max-width:640px)]:flex-col [@media(max-width:640px)]:gap-[10px]">
                  <div>
                    <div className="price whitespace-nowrap [font-family:var(--serif)] [font-size:21px] [font-variant-numeric:tabular-nums] [font-weight:800] [letter-spacing:-0.01em]">USD 2.00</div>
                    <div className="stock items-center gap-[6px] [font-size:12.5px]">In stock</div>
                  </div>
                  <button className="add items-center gap-[7px] h-[42px] uppercase [flex-shrink:0] [letter-spacing:0.1em] [@media(max-width:640px)]:justify-center [@media(max-width:640px)]:[width:100%]" aria-label="Add 5mm Masonary Bit to cart">
                    <span>Add</span>
                    <svg className="h-[16px] w-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </div>
                <div className="sku uppercase [font-size:11.5px] [letter-spacing:0.06em]">SKU HD-BIT-014</div>
              </div>
            </article>
            <article className="pcard flex-col relative">
              <div className="pmedia relative"><a className="pimg aspect-square relative [overflow:hidden]" aria-label="6 ring Wine holder" href="/product.html?id=473" tabIndex={-1}><img className="lightbg [width:100%]" src="/site-assets/ebeb47037b575b59.png" alt="6 ring Wine holder" loading="lazy" /></a><div className="pbadges flex-wrap gap-[6px] left-[12px] absolute top-[12px] [z-index:2]" /><button className="wish items-center h-[36px] justify-center absolute right-[10px] top-[10px] w-[36px] [box-shadow:rgba(0,0,0,0.1)_0px_1px_3px] [z-index:3]" aria-label="Save 6 ring Wine holder" aria-pressed="false"><svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><path d="M12 20.5s-7.5-4.6-9.2-9.4C1.7 7.8 3.6 4.5 7 4.5c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.4 0 5.3 3.3 4.2 6.6-1.7 4.8-9.2 9.4-9.2 9.4Z" /></svg></button><button className="qv-btn bottom-[12px] h-[42px] left-[12px] absolute right-[12px] uppercase [box-shadow:rgba(0,0,0,0.14)_0px_4px_14px] [letter-spacing:0.12em] [z-index:3]">Quick view</button></div>
              <div className="pbody flex-1 flex-col gap-[6px]">
                <div className="pcat uppercase [font:600_11.5px_var(--sans)] [font-family:var(--serif)]! [font-size:11.5px]! [letter-spacing:0.12em]">Storage</div>
                <a className="pname min-h-[2.5em] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [letter-spacing:0px] [overflow:hidden]" href="/product.html?id=473">6 ring Wine holder</a>
                <div className="pdesc [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [font-size:13.5px] [line-height:1.5] [overflow:hidden]">Wine holder</div>
                <div className="pfoot gap-[10px] justify-between [@media(max-width:640px)]:flex-col [@media(max-width:640px)]:gap-[10px]">
                  <div>
                    <div className="price whitespace-nowrap [font-family:var(--serif)] [font-size:21px] [font-variant-numeric:tabular-nums] [font-weight:800] [letter-spacing:-0.01em]">USD 15.00</div>
                    <div className="stock items-center gap-[6px] [font-size:12.5px]">In stock</div>
                  </div>
                  <button className="add items-center gap-[7px] h-[42px] uppercase [flex-shrink:0] [letter-spacing:0.1em] [@media(max-width:640px)]:justify-center [@media(max-width:640px)]:[width:100%]" aria-label="Add 6 ring Wine holder to cart">
                    <span>Add</span>
                    <svg className="h-[16px] w-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </div>
                <div className="sku uppercase [font-size:11.5px] [letter-spacing:0.06em]">SKU HD-WH-001</div>
              </div>
            </article>
            <article className="pcard flex-col relative">
              <div className="pmedia relative"><a className="pimg aspect-square relative [overflow:hidden]" aria-label="6mm Masonary Drill Bit" href="/product.html?id=26" tabIndex={-1}><div className="ph items-center flex-col gap-[14px] justify-center absolute [inset:0px]" aria-hidden="true"><span className="ph-ico"><svg className="h-[34px] w-[34px] [stroke-width:1.1]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14 6a4 4 0 0 0-5 5L3 17l4 4 6-6a4 4 0 0 0 5-5l-3 3-3-1-1-3z" /></svg></span><span className="ph-lbl text-center uppercase [font:600_11px_var(--serif)] [letter-spacing:0.18em]">Tools &amp; Fixings</span></div></a><div className="pbadges flex-wrap gap-[6px] left-[12px] absolute top-[12px] [z-index:2]" /><button className="wish items-center h-[36px] justify-center absolute right-[10px] top-[10px] w-[36px] [box-shadow:rgba(0,0,0,0.1)_0px_1px_3px] [z-index:3]" aria-label="Save 6mm Masonary Drill Bit" aria-pressed="false"><svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><path d="M12 20.5s-7.5-4.6-9.2-9.4C1.7 7.8 3.6 4.5 7 4.5c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.4 0 5.3 3.3 4.2 6.6-1.7 4.8-9.2 9.4-9.2 9.4Z" /></svg></button><button className="qv-btn bottom-[12px] h-[42px] left-[12px] absolute right-[12px] uppercase [box-shadow:rgba(0,0,0,0.14)_0px_4px_14px] [letter-spacing:0.12em] [z-index:3]">Quick view</button></div>
              <div className="pbody flex-1 flex-col gap-[6px]">
                <div className="pcat uppercase [font:600_11.5px_var(--sans)] [font-family:var(--serif)]! [font-size:11.5px]! [letter-spacing:0.12em]">Tools &amp; Fixings</div>
                <a className="pname min-h-[2.5em] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [letter-spacing:0px] [overflow:hidden]" href="/product.html?id=26">6mm Masonary Drill Bit</a>
                <div className="pdesc [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [font-size:13.5px] [line-height:1.5] [overflow:hidden]">Screwdriver bit, 6mm</div>
                <div className="pfoot gap-[10px] justify-between [@media(max-width:640px)]:flex-col [@media(max-width:640px)]:gap-[10px]">
                  <div>
                    <div className="price whitespace-nowrap [font-family:var(--serif)] [font-size:21px] [font-variant-numeric:tabular-nums] [font-weight:800] [letter-spacing:-0.01em]">USD 5.00</div>
                    <div className="stock items-center gap-[6px] [font-size:12.5px]">In stock</div>
                  </div>
                  <button className="add items-center gap-[7px] h-[42px] uppercase [flex-shrink:0] [letter-spacing:0.1em] [@media(max-width:640px)]:justify-center [@media(max-width:640px)]:[width:100%]" aria-label="Add 6mm Masonary Drill Bit to cart">
                    <span>Add</span>
                    <svg className="h-[16px] w-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </div>
                <div className="sku uppercase [font-size:11.5px] [letter-spacing:0.06em]">SKU HD-BIT-008</div>
              </div>
            </article>
            <article className="pcard flex-col relative">
              <div className="pmedia relative"><a className="pimg aspect-square relative [overflow:hidden]" aria-label="9 ring wine holder" href="/product.html?id=474" tabIndex={-1}><img className="lightbg [width:100%]" src="/site-assets/94212309926507e7.png" alt="9 ring wine holder" loading="lazy" /></a><div className="pbadges flex-wrap gap-[6px] left-[12px] absolute top-[12px] [z-index:2]" /><button className="wish items-center h-[36px] justify-center absolute right-[10px] top-[10px] w-[36px] [box-shadow:rgba(0,0,0,0.1)_0px_1px_3px] [z-index:3]" aria-label="Save 9 ring wine holder" aria-pressed="false"><svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><path d="M12 20.5s-7.5-4.6-9.2-9.4C1.7 7.8 3.6 4.5 7 4.5c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.4 0 5.3 3.3 4.2 6.6-1.7 4.8-9.2 9.4-9.2 9.4Z" /></svg></button><button className="qv-btn bottom-[12px] h-[42px] left-[12px] absolute right-[12px] uppercase [box-shadow:rgba(0,0,0,0.14)_0px_4px_14px] [letter-spacing:0.12em] [z-index:3]">Quick view</button></div>
              <div className="pbody flex-1 flex-col gap-[6px]">
                <div className="pcat uppercase [font:600_11.5px_var(--sans)] [font-family:var(--serif)]! [font-size:11.5px]! [letter-spacing:0.12em]">Storage</div>
                <a className="pname min-h-[2.5em] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [letter-spacing:0px] [overflow:hidden]" href="/product.html?id=474">9 ring wine holder</a>
                <div className="pdesc [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [font-size:13.5px] [line-height:1.5] [overflow:hidden]">Wine holder</div>
                <div className="pfoot gap-[10px] justify-between [@media(max-width:640px)]:flex-col [@media(max-width:640px)]:gap-[10px]">
                  <div>
                    <div className="price whitespace-nowrap [font-family:var(--serif)] [font-size:21px] [font-variant-numeric:tabular-nums] [font-weight:800] [letter-spacing:-0.01em]">USD 20.00</div>
                    <div className="stock items-center gap-[6px] [font-size:12.5px]">In stock</div>
                  </div>
                  <button className="add items-center gap-[7px] h-[42px] uppercase [flex-shrink:0] [letter-spacing:0.1em] [@media(max-width:640px)]:justify-center [@media(max-width:640px)]:[width:100%]" aria-label="Add 9 ring wine holder to cart">
                    <span>Add</span>
                    <svg className="h-[16px] w-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </div>
                <div className="sku uppercase [font-size:11.5px] [letter-spacing:0.06em]">SKU HD-WH-002</div>
              </div>
            </article>
            <article className="pcard flex-col relative">
              <div className="pmedia relative"><a className="pimg aspect-square relative [overflow:hidden]" aria-label="Acrylic 270ml" href="/product.html?id=1" tabIndex={-1}><div className="ph items-center flex-col gap-[14px] justify-center absolute [inset:0px]" aria-hidden="true"><span className="ph-ico"><svg className="h-[34px] w-[34px] [stroke-width:1.1]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3s6 6.2 6 10.5A6 6 0 0 1 6 13.5C6 9.2 12 3 12 3z" /><path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5" /></svg></span><span className="ph-lbl text-center uppercase [font:600_11px_var(--serif)] [letter-spacing:0.18em]">Adhesives</span></div></a><div className="pbadges flex-wrap gap-[6px] left-[12px] absolute top-[12px] [z-index:2]" /><button className="wish items-center h-[36px] justify-center absolute right-[10px] top-[10px] w-[36px] [box-shadow:rgba(0,0,0,0.1)_0px_1px_3px] [z-index:3]" aria-label="Save Acrylic 270ml" aria-pressed="false"><svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><path d="M12 20.5s-7.5-4.6-9.2-9.4C1.7 7.8 3.6 4.5 7 4.5c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.4 0 5.3 3.3 4.2 6.6-1.7 4.8-9.2 9.4-9.2 9.4Z" /></svg></button><button className="qv-btn bottom-[12px] h-[42px] left-[12px] absolute right-[12px] uppercase [box-shadow:rgba(0,0,0,0.14)_0px_4px_14px] [letter-spacing:0.12em] [z-index:3]">Quick view</button></div>
              <div className="pbody flex-1 flex-col gap-[6px]">
                <div className="pcat uppercase [font:600_11.5px_var(--sans)] [font-family:var(--serif)]! [font-size:11.5px]! [letter-spacing:0.12em]">Adhesives</div>
                <a className="pname min-h-[2.5em] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [letter-spacing:0px] [overflow:hidden]" href="/product.html?id=1">Acrylic 270ml</a>
                <div className="pdesc [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [font-size:13.5px] [line-height:1.5] [overflow:hidden]">Acrylic sealant, 270ml</div>
                <div className="pfoot gap-[10px] justify-between [@media(max-width:640px)]:flex-col [@media(max-width:640px)]:gap-[10px]">
                  <div>
                    <div className="price whitespace-nowrap [font-family:var(--serif)] [font-size:21px] [font-variant-numeric:tabular-nums] [font-weight:800] [letter-spacing:-0.01em]">USD 4.00</div>
                    <div className="stock items-center gap-[6px] [font-size:12.5px]">In stock</div>
                  </div>
                  <button className="add items-center gap-[7px] h-[42px] uppercase [flex-shrink:0] [letter-spacing:0.1em] [@media(max-width:640px)]:justify-center [@media(max-width:640px)]:[width:100%]" aria-label="Add Acrylic 270ml to cart">
                    <span>Add</span>
                    <svg className="h-[16px] w-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </div>
                <div className="sku uppercase [font-size:11.5px] [letter-spacing:0.06em]">SKU HD-ACR-001</div>
              </div>
            </article>
            <article className="pcard flex-col relative">
              <div className="pmedia relative"><a className="pimg aspect-square relative [overflow:hidden]" aria-label="Acrylic White" href="/product.html?id=403" tabIndex={-1}><img className="lightbg [width:100%]" src="/site-assets/b87a5f49e83cf4f7.png" alt="Acrylic White" loading="lazy" /></a><div className="pbadges flex-wrap gap-[6px] left-[12px] absolute top-[12px] [z-index:2]" /><button className="wish items-center h-[36px] justify-center absolute right-[10px] top-[10px] w-[36px] [box-shadow:rgba(0,0,0,0.1)_0px_1px_3px] [z-index:3]" aria-label="Save Acrylic White" aria-pressed="false"><svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><path d="M12 20.5s-7.5-4.6-9.2-9.4C1.7 7.8 3.6 4.5 7 4.5c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.4 0 5.3 3.3 4.2 6.6-1.7 4.8-9.2 9.4-9.2 9.4Z" /></svg></button><button className="qv-btn bottom-[12px] h-[42px] left-[12px] absolute right-[12px] uppercase [box-shadow:rgba(0,0,0,0.14)_0px_4px_14px] [letter-spacing:0.12em] [z-index:3]">Quick view</button></div>
              <div className="pbody flex-1 flex-col gap-[6px]">
                <div className="pcat uppercase [font:600_11.5px_var(--sans)] [font-family:var(--serif)]! [font-size:11.5px]! [letter-spacing:0.12em]">Adhesives</div>
                <a className="pname min-h-[2.5em] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [letter-spacing:0px] [overflow:hidden]" href="/product.html?id=403">Acrylic White</a>
                <div className="pdesc [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [font-size:13.5px] [line-height:1.5] [overflow:hidden]">Acrylic sealant, white</div>
                <div className="pfoot gap-[10px] justify-between [@media(max-width:640px)]:flex-col [@media(max-width:640px)]:gap-[10px]">
                  <div>
                    <div className="price whitespace-nowrap [font-family:var(--serif)] [font-size:21px] [font-variant-numeric:tabular-nums] [font-weight:800] [letter-spacing:-0.01em]">USD 2.00</div>
                    <div className="stock items-center gap-[6px] [font-size:12.5px]">In stock</div>
                  </div>
                  <button className="add items-center gap-[7px] h-[42px] uppercase [flex-shrink:0] [letter-spacing:0.1em] [@media(max-width:640px)]:justify-center [@media(max-width:640px)]:[width:100%]" aria-label="Add Acrylic White to cart">
                    <span>Add</span>
                    <svg className="h-[16px] w-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </div>
                <div className="sku uppercase [font-size:11.5px] [letter-spacing:0.06em]">SKU HD-SPE-003</div>
              </div>
            </article>
            <article className="pcard flex-col relative">
              <div className="pmedia relative"><a className="pimg aspect-square relative [overflow:hidden]" aria-label="Acrylic White - Paintable" href="/product.html?id=2" tabIndex={-1}><div className="ph items-center flex-col gap-[14px] justify-center absolute [inset:0px]" aria-hidden="true"><span className="ph-ico"><svg className="h-[34px] w-[34px] [stroke-width:1.1]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3s6 6.2 6 10.5A6 6 0 0 1 6 13.5C6 9.2 12 3 12 3z" /><path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5" /></svg></span><span className="ph-lbl text-center uppercase [font:600_11px_var(--serif)] [letter-spacing:0.18em]">Adhesives</span></div></a><div className="pbadges flex-wrap gap-[6px] left-[12px] absolute top-[12px] [z-index:2]" /><button className="wish items-center h-[36px] justify-center absolute right-[10px] top-[10px] w-[36px] [box-shadow:rgba(0,0,0,0.1)_0px_1px_3px] [z-index:3]" aria-label="Save Acrylic White - Paintable" aria-pressed="false"><svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><path d="M12 20.5s-7.5-4.6-9.2-9.4C1.7 7.8 3.6 4.5 7 4.5c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.4 0 5.3 3.3 4.2 6.6-1.7 4.8-9.2 9.4-9.2 9.4Z" /></svg></button><button className="qv-btn bottom-[12px] h-[42px] left-[12px] absolute right-[12px] uppercase [box-shadow:rgba(0,0,0,0.14)_0px_4px_14px] [letter-spacing:0.12em] [z-index:3]">Quick view</button></div>
              <div className="pbody flex-1 flex-col gap-[6px]">
                <div className="pcat uppercase [font:600_11.5px_var(--sans)] [font-family:var(--serif)]! [font-size:11.5px]! [letter-spacing:0.12em]">Adhesives</div>
                <a className="pname min-h-[2.5em] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [letter-spacing:0px] [overflow:hidden]" href="/product.html?id=2">Acrylic White - Paintable</a>
                <div className="pdesc [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [font-size:13.5px] [line-height:1.5] [overflow:hidden]">Acrylic sealant, white</div>
                <div className="pfoot gap-[10px] justify-between [@media(max-width:640px)]:flex-col [@media(max-width:640px)]:gap-[10px]">
                  <div>
                    <div className="price whitespace-nowrap [font-family:var(--serif)] [font-size:21px] [font-variant-numeric:tabular-nums] [font-weight:800] [letter-spacing:-0.01em]">USD 3.50</div>
                    <div className="stock items-center gap-[6px] [font-size:12.5px]">In stock</div>
                  </div>
                  <button className="add items-center gap-[7px] h-[42px] uppercase [flex-shrink:0] [letter-spacing:0.1em] [@media(max-width:640px)]:justify-center [@media(max-width:640px)]:[width:100%]" aria-label="Add Acrylic White - Paintable to cart">
                    <span>Add</span>
                    <svg className="h-[16px] w-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </div>
                <div className="sku uppercase [font-size:11.5px] [letter-spacing:0.06em]">SKU HD-ACR-002</div>
              </div>
            </article>
          </div>
        </div>
        <div className="products-footer-cta flex-wrap gap-[32px] justify-between [@media(max-width:768px)]:flex-col">
          <div className="pfc-text">
            <div className="eyebrow items-center gap-[12px] uppercase [font-size:12px] [font-weight:600]">Full Catalogue</div>
            <p className="max-w-[480px] text-pretty [font-size:14px] [line-height:1.7]">These are just a selection of what we stock. Contact us with your full specification list and we'll confirm availability and pricing.</p>
          </div>
          <div className="pfc-actions flex-wrap gap-[12px]"><a className="btn-primary uppercase [font-family:Saira,sans-serif] [font-size:13px] [font-weight:700] [letter-spacing:2px] [@media(max-width:768px)]:items-center [@media(max-width:768px)]:justify-center [@media(max-width:768px)]:min-h-[48px]" href="/products.html">Browse Full Catalogue →</a><a className="btn-wa items-center gap-[8px] uppercase [font-family:Saira,sans-serif] [font-size:13px] [font-weight:700] [letter-spacing:1.5px]" href="https://wa.me/263780793585" rel="noopener" target="_blank"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" /></svg> WhatsApp for Stock Check</a></div>
        </div>
      </div>
    </section>
  );
}

function ImportedSectionTheArmandAdvantage() {
  return (
    <section className={"why-section reveal-section \x76isible"}>
      <div className={"\x63ontainer max-w-[1320px]"}>
        <div className="text-center" style={{ marginBottom: "16px" }}>
          <div className="eyebrow items-center gap-[12px] uppercase [font-size:12px] [font-weight:600] justify-center">Why Choose Armand</div>
        </div>
        <h2 className="section-title normal-case text-balance [font-weight:800] text-center" style={{ marginTop: "16px" }}>The Armand <span className="accent">Advantage</span></h2>
        <div className="why-grid gap-[2px] [box-shadow:var(--sh-1)] [overflow:hidden]">
          <div className="why-card relative [overflow:hidden]">
            <div className="wc-num absolute right-[20px] top-[12px] [font-family:Saira,sans-serif] [font-size:88px] [font-weight:900] [line-height:1]">01</div>
            <span className="wc-icon items-center h-[48px] justify-center w-[48px]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
              </svg>
            </span>
            <div className="wc-title uppercase [font-family:Saira,sans-serif] [font-size:18px] [font-weight:800] [letter-spacing:0.3px]">Real, Deep Stock</div>
            <div className="wc-text [font-size:13px]">We don't list products we don't hold. Our warehouse carries meaningful stock levels so your project never stalls waiting for hardware.</div>
          </div>
          <div className="why-card relative [overflow:hidden]">
            <div className="wc-num absolute right-[20px] top-[12px] [font-family:Saira,sans-serif] [font-size:88px] [font-weight:900] [line-height:1]">02</div>
            <span className="wc-icon items-center h-[48px] justify-center w-[48px]">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </span>
            <div className="wc-title uppercase [font-family:Saira,sans-serif] [font-size:18px] [font-weight:800] [letter-spacing:0.3px]">Competitive Trade Pricing</div>
            <div className="wc-text [font-size:13px]">Volume pricing structures for trade accounts, contractors, and bulk purchasers. The more you buy, the better your unit rate.</div>
          </div>
          <div className="why-card relative [overflow:hidden]">
            <div className="wc-num absolute right-[20px] top-[12px] [font-family:Saira,sans-serif] [font-size:88px] [font-weight:900] [line-height:1]">03</div>
            <span className="wc-icon items-center h-[48px] justify-center w-[48px]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </span>
            <div className="wc-title uppercase [font-family:Saira,sans-serif] [font-size:18px] [font-weight:800] [letter-spacing:0.3px]">Fast Response</div>
            <div className="wc-text [font-size:13px]">WhatsApp us a specification list and we'll confirm availability and pricing within 2 hours during trading hours. No waiting days for a quote.</div>
          </div>
          <div className="why-card relative [overflow:hidden]">
            <div className="wc-num absolute right-[20px] top-[12px] [font-family:Saira,sans-serif] [font-size:88px] [font-weight:900] [line-height:1]">04</div>
            <span className="wc-icon items-center h-[48px] justify-center w-[48px]">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19.44 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.69c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.588-1.588c.47-.47 1.087-.706 1.704-.706s1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02z" />
              </svg>
            </span>
            <div className="wc-title uppercase [font-family:Saira,sans-serif] [font-size:18px] [font-weight:800] [letter-spacing:0.3px]">Complete Systems</div>
            <div className="wc-text [font-size:13px]">We don't just sell parts — we supply complete systems. Drawer unit, runners, handles, soft-close, installation fixings: all from one order.</div>
          </div>
          <div className="why-card relative [overflow:hidden]">
            <div className="wc-num absolute right-[20px] top-[12px] [font-family:Saira,sans-serif] [font-size:88px] [font-weight:900] [line-height:1]">05</div>
            <span className="wc-icon items-center h-[48px] justify-center w-[48px]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m11 17 2 2a1 1 0 1 0 3-3" />
                <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
                <path d="m21 3 1 11h-1M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3M3 4h8" />
              </svg>
            </span>
            <div className="wc-title uppercase [font-family:Saira,sans-serif] [font-size:18px] [font-weight:800] [letter-spacing:0.3px]">Trade Account Credit</div>
            <div className="wc-text [font-size:13px]">Qualified trade businesses can access monthly account facilities, giving you the cash-flow flexibility that project work requires.</div>
          </div>
          <div className="why-card relative [overflow:hidden]">
            <div className="wc-num absolute right-[20px] top-[12px] [font-family:Saira,sans-serif] [font-size:88px] [font-weight:900] [line-height:1]">06</div>
            <span className="wc-icon items-center h-[48px] justify-center w-[48px]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3" />
                <rect x="9" y="11" width="14" height="10" rx="1" />
                <circle cx="12" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
              </svg>
            </span>
            <div className="wc-title uppercase [font-family:Saira,sans-serif] [font-size:18px] [font-weight:800] [letter-spacing:0.3px]">Nationwide Delivery</div>
            <div className="wc-text [font-size:13px]">We deliver to construction sites and business addresses across Zimbabwe. Bulawayo, Harare, Gweru, Mutare — your location is no obstacle.</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImportedSectionFrequentlyAskedQuestions() {
  return (
    <section className={"faq-section reveal-section \x76isible"} id="faq">
      <div className={"\x63ontainer faq-wrap max-w-[860px]"}>
        <div className="svc-head max-w-[960px] text-center">
          <div className="eyebrow items-center gap-[12px] uppercase [font-size:12px] [font-weight:600] justify-center">Good to Know</div>
          <h2 className="section-title normal-case text-balance [font-weight:800]">Frequently Asked <span className="accent">Questions</span></h2>
        </div>
        <details className="faq-item">
          <summary className="gap-[16px] justify-between list-none min-h-[60px] [cursor:pointer] [letter-spacing:0.3px]">Do you cut boards to size?</summary>
          <p className="text-pretty [font-size:15px] [line-height:1.75]">Yes. We cut and edge melamine, super wood and granite tops to your sizes. Send your measurements on WhatsApp or through the quote form and we will confirm price and availability.</p>
        </details>
        <details className="faq-item">
          <summary className="gap-[16px] justify-between list-none min-h-[60px] [cursor:pointer] [letter-spacing:0.3px]">How quickly will I get a quote?</summary>
          <p className="text-pretty [font-size:15px] [line-height:1.75]">We confirm stock, pricing and delivery within 2 hours on trading days. Message us on WhatsApp for the fastest reply.</p>
        </details>
        <details className="faq-item">
          <summary className="gap-[16px] justify-between list-none min-h-[60px] [cursor:pointer] [letter-spacing:0.3px]">How can I pay?</summary>
          <p className="text-pretty [font-size:15px] [line-height:1.75]">We accept EcoCash, Paynow, EFT and bank transfer.</p>
        </details>
        <details className="faq-item">
          <summary className="gap-[16px] justify-between list-none min-h-[60px] [cursor:pointer] [letter-spacing:0.3px]">Do you deliver?</summary>
          <p className="text-pretty [font-size:15px] [line-height:1.75]">Yes, nationwide delivery is available. Tell us where you are and we will confirm the delivery options for your area.</p>
        </details>
        <details className="faq-item">
          <summary className="gap-[16px] justify-between list-none min-h-[60px] [cursor:pointer] [letter-spacing:0.3px]">Do you offer trade accounts?</summary>
          <p className="text-pretty [font-size:15px] [line-height:1.75]">Yes. Builders, joiners, designers and contractors can open a trade account for preferential pricing. See our Trade page to apply.</p>
        </details>
        <details className="faq-item">
          <summary className="gap-[16px] justify-between list-none min-h-[60px] [cursor:pointer] [letter-spacing:0.3px]">Where are you and when are you open?</summary>
          <p className="text-pretty [font-size:15px] [line-height:1.75]">We are at 2142 Khami Rd, Iversens Complex, Bulawayo. Open Monday to Friday 08:00 to 17:00 and Saturday 08:00 to 13:00.</p>
        </details>
      </div>
    </section>
  );
}

function ImportedSectionComeAndSeeThe() {
  return (
    <section className="visit-section" id="visit">
      <div className={"\x63ontainer visit-grid items-center max-w-[1320px]"}>
        <div>
          <div className="eyebrow items-center gap-[12px] uppercase [font-size:12px] [font-weight:600]">Visit our yard</div>
          <h2 className="section-title normal-case text-balance [font-weight:800]">Come and see the boards <span className="accent">for yourself</span></h2>
          <p className="visit-lead max-w-[540px] text-pretty [font-size:17px] [line-height:1.65]">Walk the yard, compare decors in your hand and have your boards cut and edged to your sizes. Not able to come in? Send us your dimensions on WhatsApp and we will quote.</p>
          <div className="visit-actions flex-wrap gap-[12px]"><a className="btn-primary uppercase [font-family:Saira,sans-serif] [font-size:13px] [font-weight:700] [letter-spacing:2px] [@media(max-width:768px)]:items-center [@media(max-width:768px)]:justify-center [@media(max-width:768px)]:min-h-[48px]" href={"https://www.google.com/maps/search/?api=1&query=2142+Khami+Rd+Iversens+Complex+Bulawayo+Zimbabwe"} rel="noopener" target="_blank">Get directions</a><a className="btn-wa items-center gap-[8px] uppercase [font-family:Saira,sans-serif] [font-size:13px] [font-weight:700] [letter-spacing:1.5px]" href="https://wa.me/263780793585?text=Hi%20Armand%2C%20I%20need%20boards%20cut.%20Sizes%20(length%20x%20width%2C%20qty)%3A%20" rel="noopener" target="_blank">WhatsApp your sizes</a></div>
        </div>
        <dl className="visit-card">
          <div>
            <dt className="uppercase [letter-spacing:1.6px]">Address</dt>
            <dd className="[font-size:16px] [line-height:1.6]">2142 Khami Rd, Iversens Complex<br />Bulawayo, Zimbabwe</dd>
          </div>
          <div>
            <dt className="uppercase [letter-spacing:1.6px]">Opening hours</dt>
            <dd className="[font-size:16px] [line-height:1.6]">Monday to Friday 08:00 – 17:00<br />Saturday 08:00 – 13:00</dd>
          </div>
          <div>
            <dt className="uppercase [letter-spacing:1.6px]">Phone &amp; WhatsApp</dt>
            <dd className="[font-size:16px] [line-height:1.6]">
              <a href="tel:+263780793585">+263 78 079 3585</a>
              <br />
              <a href="tel:+263292265490">+263 292 265 490</a>
            </dd>
          </div>
          <div>
            <dt className="uppercase [letter-spacing:1.6px]">Email</dt>
            <dd className="[font-size:16px] [line-height:1.6]">
              <a href="mailto:armandcarpentry@gmail.com">armandcarpentry@gmail.com</a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

function ImportedFooter() {
  return (
    <footer>
      <div className={"footer-main \x63ontainer max-w-[1320px]"}>
        <div>
          <div className="fm-logo-row">
            <img className="footer-logo-img [width:auto]" src="/site-assets/171c03e7247768b7.png" width="400" height="224" alt={"Armand Carpentry & Designs"} />
          </div>
          <p className="fm-tagline text-pretty [font-size:13px] [line-height:1.8]">Boards, cutting and fittings — melamine, super wood and granite tops, precision cut and edged, plus a full range of hardware and kitchen fittings. Serving trade and retail across Zimbabwe.</p>
          <div className="fm-social gap-[8px]"><a className="fms-link items-center h-[38px] justify-center w-[38px] [font-size:15px]" aria-label="WhatsApp" href="https://wa.me/263780793585" rel="noopener" target="_blank"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" /></svg></a><a className="fms-link items-center h-[38px] justify-center w-[38px] [font-size:15px]" aria-label="Email" href="mailto:armandcarpentry@gmail.com"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg></a><a className="fms-link items-center h-[38px] justify-center w-[38px] [font-size:15px]" aria-label="Call" href="tel:+263780793585"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.83a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg></a></div>
          <div className="fm-reg [letter-spacing:1px] [line-height:1.9]">
            Armand Carpentry &amp; Designs<br />
            Registered in Zimbabwe<br />
            2142 Khami Rd, Iversens Complex, Bulawayo
          </div>
        </div>
        <div>
          <div className="fm-col-title uppercase [letter-spacing:3px]">Products</div>
          <ul className="fm-links flex-col gap-[10px]">
            <li>
              <a className="[font-size:12px] [letter-spacing:0.2px]" href="/products.html?cat=boards">Boards &amp; Panels</a>
            </li>
            <li>
              <a className="[font-size:12px] [letter-spacing:0.2px]" href="/products.html?cat=edging">Edging</a>
            </li>
            <li>
              <a className="[font-size:12px] [letter-spacing:0.2px]" href="/products.html?cat=hinges">Hinges &amp; Pivot Systems</a>
            </li>
            <li>
              <a className="[font-size:12px] [letter-spacing:0.2px]" href="/products.html?cat=handles">Handles &amp; Knobs</a>
            </li>
            <li>
              <a className="[font-size:12px] [letter-spacing:0.2px]" href="/products.html?cat=drawers">Drawer Systems</a>
            </li>
            <li>
              <a className="[font-size:12px] [letter-spacing:0.2px]" href="/products.html?cat=kitchen">Kitchen Fittings</a>
            </li>
            <li>
              <a className="[font-size:12px] [letter-spacing:0.2px]" href="/products.html?cat=locks">Locks &amp; Security</a>
            </li>
            <li>
              <a className="[font-size:12px] [letter-spacing:0.2px]" href="/products.html?cat=tools">Tools &amp; Fixings</a>
            </li>
          </ul>
        </div>
        <div>
          <div className="fm-col-title uppercase [letter-spacing:3px]">Company</div>
          <ul className="fm-links flex-col gap-[10px]">
            <li>
              <a className="[font-size:12px] [letter-spacing:0.2px]" href="/about.html">About Armand</a>
            </li>
            <li>
              <a className="[font-size:12px] [letter-spacing:0.2px]" href="/portfolio.html">Supply Portfolio</a>
            </li>
            <li>
              <a className="[font-size:12px] [letter-spacing:0.2px]" href="/trade.html">Trade Accounts</a>
            </li>
            <li>
              <a className="[font-size:12px] [letter-spacing:0.2px]" href="/contact.html">Contact Us</a>
            </li>
            <li>
              <a className="[font-size:12px] [letter-spacing:0.2px]" href="mailto:armandcarpentry@gmail.com">Email Us</a>
            </li>
          </ul>
        </div>
        <div>
          <div className="fm-col-title uppercase [letter-spacing:3px]">Support</div>
          <ul className="fm-links flex-col gap-[10px]">
            <li>
              <a className="[font-size:12px] [letter-spacing:0.2px]" href="/contact.html">Get a Quote</a>
            </li>
            <li>
              <a className="[font-size:12px] [letter-spacing:0.2px]" href="/track.html">Track My Order</a>
            </li>
            <li>
              <a className="[font-size:12px] [letter-spacing:0.2px]" href="/legal.html">Shipping Policy</a>
            </li>
            <li>
              <a className="[font-size:12px] [letter-spacing:0.2px]" href="/legal.html">Returns Policy</a>
            </li>
            <li>
              <a className="[font-size:12px] [letter-spacing:0.2px]" href="/legal.html">Terms of Sale</a>
            </li>
            <li>
              <a className="[font-size:12px] [letter-spacing:0.2px]" href="/legal.html">Privacy Policy</a>
            </li>
          </ul>
        </div>
      </div>
      <div className={"footer-bottom \x63ontainer items-center flex-wrap gap-[16px] justify-between max-w-[1320px] [@media(max-width:768px)]:flex-col [@media(max-width:768px)]:text-center"}>
        <div className="fb-copy [letter-spacing:0.5px]">© 2026 Armand Carpentry &amp; Designs · Bulawayo, Zimbabwe · All Rights Reserved</div>
        <div className="fb-pay flex-wrap gap-[8px]">
          <div className="fb-pay-badge [letter-spacing:1px]">EcoCash</div>
          <div className="fb-pay-badge [letter-spacing:1px]">Paynow</div>
          <div className="fb-pay-badge [letter-spacing:1px]">EFT</div>
          <div className="fb-pay-badge [letter-spacing:1px]">Bank Transfer</div>
        </div>
      </div>
    </footer>
  );
}

function ImportedAsideSiteMenu({ open, onClose, closeRef }: { open: boolean; onClose: () => void; closeRef: React.RefObject<HTMLButtonElement | null> }) {
  return (
    <aside id="siteMenuPanel" aria-hidden={!open} className={`mobile-nav-panel flex-col fixed ${open ? "open visible" : "invisible"} w-[min(86vw,340px)] [box-shadow:rgba(0,0,0,0.35)_-12px_0px_32px] [height:100dvh] [inset:0px_0px_0px_auto] [max-height:100dvh] [overflow:hidden] [z-index:600]`} role="dialog" aria-modal="true" aria-label="Site menu">
      <div className="mnp-head items-center justify-between min-h-[64px] [flex-shrink:0]"><span className="mnp-title uppercase [font:800_13px_Saira,sans-serif] [letter-spacing:2px]">Menu</span><button ref={closeRef} onClick={onClose} className="mnp-close items-center h-[48px] justify-center static right-[16px] top-[14px] w-[48px] [font-size:32px] [line-height:1]" type="button" aria-label="Close menu">×</button></div>
      <div className="flex-1 [overflow-y:auto] [overscroll-behavior:contain]">
        <nav className="mnp-nav" aria-label="Pages"><a className="mnp-link is-current items-center gap-[12px] justify-between normal-case [box-shadow:inset_3px_0_0_var(--brand-orange)] [font:700_18px_Saira,sans-serif] [letter-spacing:0.3px]" aria-current="page" href="/website"><span>Home</span><svg className="[flex-shrink:0]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg></a><a className="mnp-link items-center gap-[12px] justify-between normal-case [font:700_18px_Saira,sans-serif] [letter-spacing:0.3px]" href="/products.html"><span>Products</span><svg className="[flex-shrink:0]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg></a><a className="mnp-link items-center gap-[12px] justify-between normal-case [font:700_18px_Saira,sans-serif] [letter-spacing:0.3px]" href="/products.html?saved=1"><span>Saved items</span><svg className="[flex-shrink:0]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg></a><a className="mnp-link items-center gap-[12px] justify-between normal-case [font:700_18px_Saira,sans-serif] [letter-spacing:0.3px]" href="/portfolio.html"><span>Portfolio</span><svg className="[flex-shrink:0]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg></a><a className="mnp-link items-center gap-[12px] justify-between normal-case [font:700_18px_Saira,sans-serif] [letter-spacing:0.3px]" href="/trade.html"><span>Trade accounts</span><svg className="[flex-shrink:0]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg></a><a className="mnp-link items-center gap-[12px] justify-between normal-case [font:700_18px_Saira,sans-serif] [letter-spacing:0.3px]" href="/contact.html"><span>Contact</span><svg className="[flex-shrink:0]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg></a><a className="mnp-link items-center gap-[12px] justify-between normal-case [font:700_18px_Saira,sans-serif] [letter-spacing:0.3px]" href="/about.html"><span>About</span><svg className="[flex-shrink:0]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg></a><a className="mnp-link items-center gap-[12px] justify-between normal-case [font:700_18px_Saira,sans-serif] [letter-spacing:0.3px]" href="/account.html"><span>Sign in / Account</span><svg className="[flex-shrink:0]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg></a></nav>
        <div className="mnp-group">
          <div className="mnp-group-label uppercase [letter-spacing:1.8px]">Shop by category</div>
          <div className="mnp-chips flex-wrap gap-[8px]"><a className="mnp-chip items-center [letter-spacing:0.3px]" href="/products.html?cat=boards">Boards</a><a className="mnp-chip items-center [letter-spacing:0.3px]" href="/products.html?cat=edging">Edging</a><a className="mnp-chip items-center [letter-spacing:0.3px]" href="/products.html?cat=hinges">Hinges</a><a className="mnp-chip items-center [letter-spacing:0.3px]" href="/products.html?cat=handles">Handles</a><a className="mnp-chip items-center [letter-spacing:0.3px]" href="/products.html?cat=drawers">Drawers</a><a className="mnp-chip items-center [letter-spacing:0.3px]" href="/products.html?cat=kitchen">Kitchen</a><a className="mnp-chip items-center [letter-spacing:0.3px]" href="/products.html?cat=locks">Locks</a><a className="mnp-chip items-center [letter-spacing:0.3px]" href="/products.html?cat=tools">Tools &amp; fixings</a></div>
        </div>
        <div className="mnp-group mnp-info">
          <div className="mnp-group-label uppercase [letter-spacing:1.8px]">Visit us</div>
          <p className="text-pretty [font-size:14px] [line-height:1.55]">2142 Khami Rd, Iversens Complex, Bulawayo</p>
          <p className="text-pretty [font-size:14px] [line-height:1.55]">Mon–Fri 08:00–17:00<br />Sat 08:00–13:00</p>
          <a className="items-center [font:600_15px_Barlow,sans-serif] [text-underline-offset:3px]" href="tel:+263780793585">+263 78 079 3585</a>
        </div>
      </div>
      <div className="mnp-actions flex-col gap-[10px] [flex-shrink:0]"><a className="mnp-wa items-center gap-[10px] justify-center uppercase [font-family:Saira,sans-serif] [font-size:14px] [font-weight:800] [letter-spacing:1.2px]" href="https://wa.me/263780793585" rel="noopener" target="_blank">{"\n          "}<svg className="[flex-shrink:0]" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{"\n            "}<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />{"\n          "}</svg>
              WhatsApp us
            </a><a className="mnp-contact items-center justify-center uppercase [font-family:Saira,sans-serif] [font-size:13px] [font-weight:700] [letter-spacing:1px]" href="/contact.html">Get a quote</a></div>
    </aside>
  );
}


function useImportedLayout() {
  useEffect(() => {
    const scrollingAreas = Array.from(document.querySelectorAll<HTMLElement>("[data-site-import-scroll-root]"));
    const scrollTop = () =>
      scrollingAreas.find(
        (node) =>
          node.clientHeight > 0 &&
          node.scrollHeight > node.clientHeight &&
          /^(auto|scroll)$/.test(getComputedStyle(node).overflowY),
      )?.scrollTop ?? window.scrollY;
    const scrollHeaders = Array.from(document.querySelectorAll<HTMLElement>("[data-site-import-scroll-header]"))
      .slice(0, 128)
      .flatMap((node) => {
        try {
          const states = JSON.parse(node.dataset["siteImportScrollHeader"] || "{}");
          if (!states || typeof states !== "object") return [];
          for (const key of ["desktop", "mobile"]) {
            const state = states[key];
            if (
              !state ||
              !Array.isArray(state.added) ||
              !Array.isArray(state.removed) ||
              state.added.length + state.removed.length > 32
            )
              delete states[key];
          }
          return [
            {
              node,
              states,
              original: new Set(node.classList),
              originalFill: node.getAttribute("fill"),
              transform: node.style.getPropertyValue("transform"),
              priority: node.style.getPropertyPriority("transform"),
            },
          ];
        } catch {
          return [];
        }
      });
    function syncScrollHeaders(reset = false) {
      for (const { node, states, original, originalFill, transform, priority } of scrollHeaders) {
        if (!reset && node.getAttribute("data-import-menu-open") === "true") continue;
        const state = states[innerWidth < 768 ? "mobile" : "desktop"];
        if ([states.desktop, states.mobile].some((entry) => entry && Object.hasOwn(entry, "fill"))) {
          if (originalFill === null) node.removeAttribute("fill");
          else node.setAttribute("fill", originalFill);
        }
        if (states.desktop?.transform || states.mobile?.transform) {
          if (transform) node.style.setProperty("transform", transform, priority);
          else node.style.removeProperty("transform");
        }
        for (const value of [states.desktop, states.mobile].filter(Boolean) as {
          added: string[];
          removed: string[];
        }[]) {
          for (const token of [...(value.added || []), ...(value.removed || [])]) {
            if (typeof token !== "string" || !token || /\s/.test(token)) continue;
            node.classList.toggle(token, original.has(token));
          }
        }
        if (reset || !state || !Number.isFinite(state.threshold) || scrollTop() < state.threshold) continue;
        let until = state.until;
        if (
          typeof state.untilAnchor === "string" &&
          /^\d$/.test(state.untilAnchor) &&
          Number.isFinite(state.untilProgress) &&
          Math.abs(state.untilProgress) <= 2
        ) {
          const anchor = document.querySelector<HTMLElement>(
            '[data-site-import-header-end="' + state.untilAnchor + '"]',
          );
          if (anchor) until = anchor.getBoundingClientRect().top + scrollTop() + innerHeight * state.untilProgress;
        }
        if (Number.isFinite(until) && scrollTop() >= until) continue;
        if (state.fill === null) node.removeAttribute("fill");
        else if (typeof state.fill === "string" && state.fill.length <= 256 && !/url\(/i.test(state.fill))
          node.setAttribute("fill", state.fill);
        if (
          typeof state.transform === "string" &&
          state.transform.length <= 128 &&
          CSS.supports("transform", state.transform)
        )
          node.style.setProperty("transform", state.transform, "important");
        for (const token of state.added || [])
          if (typeof token === "string" && token && !/\s/.test(token)) node.classList.add(token);
        for (const token of state.removed || [])
          if (typeof token === "string" && token && !/\s/.test(token)) node.classList.remove(token);
      }
    }
    const handleScroll = () => {
      syncScrollHeaders();
    };
    function resizeSummaries() {
      syncScrollHeaders();
    }
    document.addEventListener("load", handleScroll, true);
    resizeSummaries();
    const parallaxFrame = requestAnimationFrame(handleScroll);
    window.addEventListener("resize", resizeSummaries);
    document.addEventListener("scroll", handleScroll, { passive: true, capture: true });
    return () => {
      cancelAnimationFrame(parallaxFrame);
      syncScrollHeaders(true);
      document.removeEventListener("load", handleScroll, true);
      window.removeEventListener("resize", resizeSummaries);
      document.removeEventListener("scroll", handleScroll, true);
    };
  }, []);
}
