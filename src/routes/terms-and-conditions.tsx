import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/pages";
import { pageHead } from "@/data/company";
export const Route = createFileRoute("/terms-and-conditions")({
  head: () =>
    pageHead(
      "Terms & Conditions",
      "Draft terms & conditions for Smart Marinetek business enquiries and website information.",
      "/terms-and-conditions",
    ),
  component: () => <LegalPage kind="terms" />,
});
