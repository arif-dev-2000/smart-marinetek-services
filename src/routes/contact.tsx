import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/site/enquiry-form";
import { pageHead } from "@/data/company";
import { contactSearchSchema } from "@/lib/enquiry";
export const Route = createFileRoute("/contact")({
  validateSearch: (search) => contactSearchSchema.parse(search),
  head: () =>
    pageHead(
      "Contact & Request a Quote",
      "Discuss quartz, barytes and selected commodity requirements with the Smart Marinetek team.",
      "/contact",
    ),
  component: Contact,
});
function Contact() {
  const { product } = Route.useSearch();
  return <ContactPage key={product} selectedProduct={product} />;
}
