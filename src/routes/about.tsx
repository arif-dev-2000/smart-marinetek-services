import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/site/pages";
import { pageHead } from "@/data/company";
export const Route = createFileRoute("/about")({
  head: () =>
    pageHead(
      "About Us",
      "Company overview, mineral sourcing focus and trading approach of Smart Marinetek in Andhra Pradesh, India.",
      "/about",
    ),
  component: AboutPage,
});
