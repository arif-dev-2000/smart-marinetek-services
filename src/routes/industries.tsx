import { createFileRoute } from "@tanstack/react-router";
import { IndustriesPage } from "@/components/site/pages";
import { pageHead } from "@/data/company";
export const Route = createFileRoute("/industries")({
  head: () =>
    pageHead(
      "Industry Applications",
      "Quartz and barytes applications in oil and gas, glass, ceramics, engineered stone and industrial processing.",
      "/industries",
    ),
  component: IndustriesPage,
});
