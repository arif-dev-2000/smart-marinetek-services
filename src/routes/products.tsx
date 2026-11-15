import { createFileRoute } from "@tanstack/react-router";
import { ProductsPage } from "@/components/site/pages";
import { pageHead } from "@/data/company";
export const Route = createFileRoute("/products")({
  head: () =>
    pageHead(
      "Product Catalogue",
      "Explore quartz, barytes, rice and chillies for industrial and commercial sourcing enquiries.",
      "/products",
    ),
  component: ProductsPage,
});
