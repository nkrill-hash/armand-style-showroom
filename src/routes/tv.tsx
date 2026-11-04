import { createFileRoute } from "@tanstack/react-router";
import { Attract } from "@/showroom/screens/Attract";

function TvPage() {
  return (
    <div className="fixed inset-0">
      <Attract tv />
    </div>
  );
}

export const Route = createFileRoute("/tv")({
  head: () => ({
    meta: [
      { title: "Armand Showroom TV — Boards, Cutting & Fittings" },
      {
        name: "description",
        content:
          "Hands-free showroom display for Armand Carpentry & Designs, Bulawayo — kitchens, wardrobes, cutting, edging, fittings and granite.",
      },
      { property: "og:title", content: "Armand Showroom TV — Boards, Cutting & Fittings" },
      { property: "og:description", content: "The Armand marketing loop for in-store and window TVs." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#1e1d1f" },
    ],
  }),
  component: TvPage,
});
