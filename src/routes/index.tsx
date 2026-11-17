import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/site/pages";
import { pageHead } from "@/data/company";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "Mineral Sourcing & Global Trade",
      "Smart Marinetek Services Private Limited (Est. 03-03-2020) — Main source exporter of Quartz and Barytes alongside Red Chillies and Indian Rice.",
      "/",
    ),
  component: HomePage,
});
