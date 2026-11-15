import { createFileRoute } from "@tanstack/react-router";
import { ServicesPage } from "@/components/site/pages";
import { pageHead } from "@/data/company";
export const Route = createFileRoute("/services")({
  head: () =>
    pageHead(
      "Sourcing & Trade Services",
      "Mineral sourcing, commodity procurement, import export and supply coordination for business buyers.",
      "/services",
    ),
  component: ServicesPage,
});
