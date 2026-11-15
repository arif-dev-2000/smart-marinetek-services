import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/site/pages";
import { pageHead } from "@/data/company";

// The home route ships no og:image, so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "Mineral Sourcing & Global Trade",
      "Smart Marinetek connects quartz, barytes and selected commodities with industrial and commercial requirements in India.",
    ),
  component: HomePage,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
