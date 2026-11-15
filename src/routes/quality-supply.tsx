import { createFileRoute } from "@tanstack/react-router";
import { QualityPage } from "@/components/site/pages";
import { pageHead } from "@/data/company";
export const Route = createFileRoute("/quality-supply")({
  head: () =>
    pageHead(
      "Quality & Supply",
      "Specification-focused product discussions, packaging options and relevant trade documentation.",
      "/quality-supply",
    ),
  component: QualityPage,
});
