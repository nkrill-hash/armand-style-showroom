import { createFileRoute } from "@tanstack/react-router";
import { Showroom } from "@/showroom/Showroom";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Armand Showroom — Build. Design. Transform." },
      {
        name: "description",
        content:
          "Interactive digital showroom for Armand Carpentry & Designs, Bulawayo — boards, cutting and fittings, the 2026 product range, spaces and contact.",
      },
      { property: "og:title", content: "Armand Showroom — Build. Design. Transform." },
      {
        property: "og:description",
        content: "Explore Armand's hinges, handles, kitchen systems, sinks and more in an interactive showroom.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#1e1d1f" },
    ],
  }),
  component: Showroom,
});
