import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowUpRight,
  Check,
  Copy,
  LoaderCircle,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildMailtoUrl, buildWhatsAppUrl, company, products } from "@/data/company";
import { enquirySchema, submitEnquiry, type Enquiry } from "@/lib/enquiry";
import { PageHero } from "./sections";

function formatEnquiryBody(data: Enquiry, productLabel: string): string {
  return [
    `Hello ${company.shortName} Export Team,`,
    "",
    `Product: ${productLabel}`,
    data.quantity?.trim() ? `Required Quantity: ${data.quantity.trim()}` : "",
    `Name: ${data.name.trim()}`,
    `Company: ${data.company.trim()}`,
    `Country: ${data.country.trim()}`,
    `Phone / WhatsApp: ${data.phone.trim()}`,
    `Email: ${data.email.trim()}`,
    "",
    "Requirement Details:",
    data.message.trim(),
  ]
    .filter(Boolean)
    .join("\n");
}

export function ContactPage({
  selectedProduct,
}: {
  selectedProduct?: Enquiry["product"] | undefined;
}) {
  const [status, setStatus] = useState("");
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const hasEndpoint = Boolean(import.meta.env["VITE_ENQUIRY_ENDPOINT"]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Enquiry>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { ...(selectedProduct ? { product: selectedProduct } : {}), website: "" },
  });

  const values = watch();
  const selectedLabel =
    products.find((p) => p.slug === values.product)?.name ||
    (values.product === "other" ? "Other Commodities" : values.product) ||
    "Quartz / Barytes / Commodity";

  const liveSubject = `Enquiry: ${selectedLabel} — ${company.shortName}`;

  const liveMessage = [
    `Hello ${company.shortName} Export Desk,`,
    `Product: ${selectedLabel}`,
    values.quantity?.trim() ? `Quantity: ${values.quantity.trim()}` : "",
    values.name?.trim() ? `Buyer: ${values.name.trim()}` : "",
    values.company?.trim() ? `Company: ${values.company.trim()}` : "",
    values.country?.trim() ? `Country: ${values.country.trim()}` : "",
    values.phone?.trim() ? `Phone: ${values.phone.trim()}` : "",
    values.email?.trim() ? `Email: ${values.email.trim()}` : "",
    values.message?.trim() ? `Requirement: ${values.message.trim()}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const liveMailtoUrl = buildMailtoUrl(
    company.emails[0].email,
    liveSubject,
    liveMessage,
    company.emails[1].email,
  );

  const onSubmit = async (data: Enquiry) => {
    setStatus("");
    setSent(false);
    setCopied(false);

    if (hasEndpoint) {
      try {
        await submitEnquiry(data);
        setSent(true);
        setStatus("Thank you. Your enquiry has been sent to our export team.");
      } catch (e) {
        setStatus(
          e instanceof Error
            ? e.message
            : "Your enquiry could not be sent. Please contact our team.",
        );
      }
      return;
    }

    const productLabel =
      products.find((p) => p.slug === data.product)?.name ||
      (data.product === "other" ? "Other Commodities" : data.product);
    const subject = `Enquiry: ${productLabel} — ${data.company} (${data.country})`;
    const body = formatEnquiryBody(data, productLabel);
    const mailtoUrl = buildMailtoUrl(
      company.emails[0].email,
      subject,
      body,
      company.emails[1].email,
    );

    setSent(true);
    setStatus(
      `Your enquiry is ready for ${company.emails[0].email} (CC: ${company.emails[1].email}). Send using your email app below or share instantly on WhatsApp.`,
    );
    if (typeof window !== "undefined") {
      window.location.href = mailtoUrl;
    }
  };

  const handleCopySummary = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(liveMessage);
        setCopied(true);
      }
    } catch {
      setCopied(false);
    }
  };

  const fields = [
    { key: "name", label: "Full Name", type: "text", autocomplete: "name" },
    { key: "company", label: "Company Name", type: "text", autocomplete: "organization" },
    { key: "email", label: "Email Address", type: "email", autocomplete: "email" },
    { key: "phone", label: "Phone Number", type: "tel", autocomplete: "tel" },
    { key: "country", label: "Country", type: "text", autocomplete: "country-name" },
  ] as const;

  return (
    <>
      <PageHero
        eyebrow="CONTACT US"
        title="Let’s Discuss Your Requirement."
        description="Connect with our directors or export support desks regarding quartz, barytes, red chillies, Indian rice, and allied commodities."
      />
      <section className="section container contact-grid">
        <div className="contact-details">
          <span className="eyebrow">A DIRECT CONVERSATION</span>
          <h2>Your Next Sourcing Discussion Starts Here.</h2>
          <p>
            Share your product, specification and quantity requirements. Our directors coordinate
            sourcing, grading, and export logistics directly.
          </p>
          <p className="location">
            <MapPin size={17} />
            {company.location} · Est. {company.establishedShort}
          </p>

          {company.contacts.map((c) => (
            <div className="contact-person" key={c.id}>
              <h3>{c.name}</h3>
              <p className="mb-3 text-xs">{c.role}</p>
              <div className="director-actions">
                <a href={`tel:${c.tel}`}>
                  <Phone size={15} />
                  {c.phone}
                </a>
                <a
                  href={buildWhatsAppUrl(c, liveMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wa-inline-link"
                >
                  <MessageCircle size={15} />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          ))}

          <div className="contact-person contact-emails">
            <h3>Official Support &amp; Trade Emails</h3>
            <p className="mb-3 text-xs">
              Send RFQs, product specifications, or export enquiries directly to our support inbox.
            </p>
            <div className="contact-email-list">
              {company.emails.map((item) => (
                <a
                  key={item.id}
                  href={buildMailtoUrl(item.email, liveSubject, liveMessage)}
                  className="contact-email-link"
                >
                  <Mail size={15} />
                  <span>
                    <strong>{item.email}</strong>
                    <small>{item.label}</small>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <form className="enquiry-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <h2>Business Enquiry</h2>
          <p className="text-xs">
            {hasEndpoint
              ? "Tell us what your business needs and our export desk will respond promptly."
              : "Fill your details below to open a pre-addressed email to info@smartmarinetek.com & smartmarinetek@gmail.com, or send directly on WhatsApp."}
          </p>

          <div className="form-grid">
            {fields.map((f) => (
              <div className="field" key={f.key}>
                <label htmlFor={f.key}>
                  {f.label} <span aria-hidden="true">*</span>
                </label>
                <input
                  id={f.key}
                  type={f.type}
                  autoComplete={f.autocomplete}
                  maxLength={f.key === "email" ? 255 : f.key === "phone" ? 25 : 150}
                  {...register(f.key)}
                  aria-invalid={!!errors[f.key]}
                  aria-describedby={errors[f.key] ? `${f.key}-error` : undefined}
                />
                {errors[f.key] && (
                  <span className="field-error" id={`${f.key}-error`}>
                    {errors[f.key]?.message}
                  </span>
                )}
              </div>
            ))}
            <div className="field">
              <label htmlFor="product">Product Interested In *</label>
              <select
                id="product"
                {...register("product")}
                aria-invalid={!!errors.product}
                aria-describedby={errors.product ? "product-error" : undefined}
              >
                <option value="">Select a product</option>
                {products.map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {p.isMainSource ? `${p.name} (Main Source)` : p.name}
                  </option>
                ))}
                <option value="other">Other Commodities</option>
              </select>
              {errors.product && (
                <span className="field-error" id="product-error">
                  {errors.product.message}
                </span>
              )}
            </div>
            <div className="field field-full">
              <label htmlFor="quantity">
                Required Quantity <span className="text-muted-foreground">(optional)</span>
              </label>
              <input
                id="quantity"
                maxLength={100}
                placeholder="e.g. quantity and unit"
                {...register("quantity")}
              />
            </div>
            <div className="field field-full">
              <label htmlFor="message">Your Requirement *</label>
              <textarea
                id="message"
                maxLength={3000}
                {...register("message")}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message && (
                <span className="field-error" id="message-error">
                  {errors.message.message}
                </span>
              )}
            </div>
          </div>

          <div className="honeypot" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
          </div>

          {status && (
            <div className="form-status" role={sent ? "status" : "alert"}>
              <p>{status}</p>
              {sent && !hasEndpoint && (
                <div className="form-fallback-actions">
                  <Button asChild variant="outline" size="sm">
                    <a href={liveMailtoUrl}>
                      <Mail size={14} />
                      Open Email App
                    </a>
                  </Button>
                  <Button type="button" variant="outline" size="sm" onClick={handleCopySummary}>
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? "Copied Summary" : "Copy Enquiry Text"}
                  </Button>
                </div>
              )}
            </div>
          )}

          <div className="form-submit">
            <div className="enquiry-wa-actions">
              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="animate-spin" />
                    Sending…
                  </>
                ) : hasEndpoint ? (
                  <>
                    Send Enquiry
                    <ArrowUpRight />
                  </>
                ) : (
                  <>
                    Send via Email
                    <Mail size={16} />
                  </>
                )}
              </Button>
              {company.contacts.map((c) => (
                <Button key={c.id} asChild variant="outline" size="lg">
                  <a
                    href={buildWhatsAppUrl(c, liveMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle size={16} />
                    WhatsApp {c.name}
                  </a>
                </Button>
              ))}
            </div>
            <p>
              Your information is used only to respond to your business enquiry. Do not include
              sensitive personal information.
            </p>
          </div>
        </form>
      </section>
    </>
  );
}
