import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/pages";
import { pageHead } from "@/data/company";
export const Route = createFileRoute("/privacy-policy")({
  head: () =>
    pageHead(
      "Privacy Policy",
      "Draft privacy policy for Smart Marinetek business enquiries and website information.",
      "/privacy-policy",
    ),
  component: () => <LegalPage kind="privacy" />,
});
