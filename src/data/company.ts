import quarry from "@/assets/quartz-quarry.jpg";
import quartz from "@/assets/quartz.jpg";
import barytes from "@/assets/barytes.jpg";
import rice from "@/assets/rice.jpg";
import chillies from "@/assets/chillies.jpg";
import shipping from "@/assets/shipping.jpg";
import glass from "@/assets/glass.jpg";
import oil from "@/assets/oil-gas.jpg";

export const images = { quarry, quartz, barytes, rice, chillies, shipping, glass, oil };

export const company = {
  name: "Smart Marinetek Services Private Limited",
  shortName: "SMS Pvt. Ltd.",
  location: "Andhra Pradesh, India",
  established: "03 March 2020",
  establishedShort: "03-03-2020",
  logoPath: "/sms-logo.svg",
  mainSources: ["Quartz", "Barytes"],
  additionalCommodities: ["Red Chillies", "Indian Rice"],
  emails: [
    {
      id: "official",
      label: "Corporate & Export Desk",
      email: "info@smartmarinetek.com",
    },
    {
      id: "support",
      label: "Customer Support & Operations",
      email: "smartmarinetek@gmail.com",
    },
  ],
  contacts: [
    {
      id: "shaik-nazeer-basha",
      name: "Shaik Nazeer Basha",
      role: "Director — Sourcing & Export Operations",
      phone: "+91 81217 88778",
      tel: "+918121788778",
      whatsapp: "918121788778",
    },
    {
      id: "sanjay-narotra",
      name: "Sanjay Narotra",
      role: "Director — Global Trade & Commercials",
      phone: "+91 98771 53120",
      tel: "+919877153120",
      whatsapp: "919877153120",
    },
  ],
} as const;

export type DirectorContact = (typeof company.contacts)[number];
export type SupportEmail = (typeof company.emails)[number];

export function buildWhatsAppUrl(contact: DirectorContact, message?: string): string {
  const text =
    message?.trim() ||
    `Hello ${contact.name} (${company.shortName}), I would like to discuss a mineral or commodity sourcing requirement.`;
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function buildMailtoUrl(
  email: string,
  subject?: string,
  body?: string,
  cc?: string,
): string {
  const params: string[] = [];
  if (cc?.trim()) params.push(`cc=${encodeURIComponent(cc.trim())}`);
  if (subject?.trim()) params.push(`subject=${encodeURIComponent(subject.trim())}`);
  if (body?.trim()) params.push(`body=${encodeURIComponent(body.trim())}`);
  return params.length > 0 ? `mailto:${email}?${params.join("&")}` : `mailto:${email}`;
}

export const companyJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  alternateName: company.shortName,
  foundingDate: "2020-03-03",
  email: "info@smartmarinetek.com",
  address: {
    "@type": "PostalAddress",
    addressRegion: "Andhra Pradesh",
    addressCountry: "IN",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: "+91-81217-88778",
      email: "info@smartmarinetek.com",
      availableLanguage: ["en"],
    },
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: "+91-98771-53120",
      email: "smartmarinetek@gmail.com",
      availableLanguage: ["en"],
    },
  ],
};

export const navigation = [
  { name: "Home", to: "/" },
  { name: "About Us", to: "/about" },
  { name: "Products", to: "/products" },
  { name: "Services", to: "/services" },
  { name: "Industries", to: "/industries" },
  { name: "Quality & Supply", to: "/quality-supply" },
  { name: "Contact", to: "/contact" },
] as const;

export const products = [
  {
    slug: "quartz",
    name: "Quartz",
    isMainSource: true,
    category: "Industrial Minerals",
    image: quartz,
    formula: "SiO₂",
    description:
      "A versatile silica mineral for glass, ceramics, engineered stone and industrial manufacturing.",
    overview:
      "Quartz is a naturally occurring crystalline form of silicon dioxide. Its physical and chemical properties make it a widely used raw material across a range of manufacturing processes. We coordinate enquiries around your intended application and specification requirements.",
    forms: ["Quartz Lumps", "Quartz Grits", "Quartz Powder"],
    specs: [
      "SiO₂ Content",
      "Fe₂O₃ Content",
      "Color",
      "Particle Size",
      "Mesh Size",
      "Moisture",
      "Packaging",
      "Minimum Order Quantity",
    ],
    applications: [
      "Glass manufacturing",
      "Ceramics",
      "Engineered stone",
      "Foundry applications",
      "Industrial fillers",
    ],
  },
  {
    slug: "barytes",
    name: "Barytes",
    isMainSource: true,
    category: "Industrial Minerals",
    image: barytes,
    formula: "BaSO₄",
    description:
      "A high-density mineral widely used in drilling fluids and other industrial applications.",
    overview:
      "Barytes, also known as barite, is a naturally occurring barium sulphate mineral. Its high density makes it useful as a weighting material in drilling fluids, while selected forms are used in coatings and industrial fillers. Suitability depends on the agreed specifications and application.",
    forms: ["Barytes Lumps", "Barytes Powder"],
    specs: [
      "BaSO₄ Content",
      "Specific Gravity",
      "Moisture",
      "Particle Size",
      "Iron Content",
      "Soluble Salts",
      "Color",
      "Packaging",
      "Minimum Order Quantity",
    ],
    applications: [
      "Oil and gas drilling fluids",
      "Paints and coatings",
      "Industrial fillers",
      "Selected chemical applications",
    ],
  },
  {
    slug: "rice",
    name: "Indian Rice",
    isMainSource: false,
    category: "Agricultural Commodities",
    image: rice,
    formula: "Selected commodities",
    description:
      "Indian rice sourcing and trade coordination for commercial buyers and agricultural distributors.",
    overview:
      "Our selected commodity portfolio includes Indian rice for commercial procurement enquiries. Share your required variety, grain characteristics, quantity and destination so availability and commercial terms can be discussed.",
    forms: ["Contact for Available Varieties"],
    specs: [
      "Variety",
      "Grain Length",
      "Broken Grain Percentage",
      "Moisture",
      "Foreign Matter",
      "Packaging",
      "Minimum Order Quantity",
    ],
    applications: [
      "Food processing",
      "Wholesale distribution",
      "Agricultural commodity distribution",
    ],
  },
  {
    slug: "chillies",
    name: "Red Chillies",
    isMainSource: false,
    category: "Agricultural Commodities",
    image: chillies,
    formula: "Selected commodities",
    description:
      "Selected red chilli trading for food processing, wholesale and commercial requirements.",
    overview:
      "Red chillies are part of our selected agricultural commodity offering. Enquiries are reviewed around variety, form, colour, heat profile, packaging and destination requirements. Actual varieties and availability are confirmed during discussion.",
    forms: ["Contact for Available Varieties"],
    specs: [
      "Variety",
      "Product Form",
      "Color",
      "Pungency",
      "Moisture",
      "Foreign Matter",
      "Packaging",
      "Minimum Order Quantity",
    ],
    applications: ["Food processing", "Spice manufacturing", "Wholesale distribution"],
  },
] as const;

export type Product = (typeof products)[number];

export const services = [
  {
    name: "Mineral Sourcing",
    text: "Connecting product requirements with suitable sourcing options for quartz and barytes.",
  },
  {
    name: "Import & Export Trading",
    text: "Coordinating commercial discussions and documentation for domestic and international trade.",
  },
  {
    name: "Commodity Procurement",
    text: "Requirement-led sourcing discussions for selected rice and chilli commodities.",
  },
  {
    name: "Supply & Logistics Coordination",
    text: "Aligning packaging, quantities and shipment requirements with relevant supply partners.",
  },
  {
    name: "Product Specification Coordination",
    text: "Communicating buyer specifications and discussing available supporting documentation.",
  },
];

export const industries = [
  {
    name: "Oil & Gas",
    image: oil,
    product: "Barytes",
    slug: "barytes",
    text: "Barytes is widely used as a weighting agent in drilling fluids. Density and other parameters must meet the requirements of the intended drilling application.",
  },
  {
    name: "Glass Manufacturing",
    image: glass,
    product: "Quartz",
    slug: "quartz",
    text: "Quartz is an important silica source in glass manufacturing, with chemical composition and impurity levels selected to suit the production process.",
  },
  {
    name: "Ceramics",
    image: quartz,
    product: "Quartz",
    slug: "quartz",
    text: "Silica contributes to ceramic body and glaze formulations. Particle size and composition are considered for each application.",
  },
  {
    name: "Engineered Stone",
    image: quarry,
    product: "Quartz",
    slug: "quartz",
    text: "Quartz aggregates are used in engineered stone surfaces. Size distribution, appearance and purity depend on the product formulation.",
  },
  {
    name: "Industrial Processing",
    image: barytes,
    product: "Quartz & Barytes",
    slug: "barytes",
    text: "Selected mineral forms are used in fillers, coatings and processing applications, subject to application-specific technical review.",
  },
  {
    name: "Agricultural Distribution",
    image: rice,
    product: "Rice & Chillies",
    slug: "rice",
    text: "Selected agricultural commodities support wholesale, food processing and distribution requirements, with varieties and quality parameters confirmed on enquiry.",
  },
] as const;

export const process = [
  {
    title: "Share Your Requirement",
    text: "Tell us the product, quantity, application and delivery destination.",
  },
  {
    title: "Product & Specification Review",
    text: "Discuss availability, technical requirements and supporting information.",
  },
  {
    title: "Quotation & Commercial Discussion",
    text: "Review pricing, terms, packaging and the proposed supply arrangement.",
  },
  {
    title: "Order & Supply Coordination",
    text: "Coordinate the agreed order, documentation and shipment requirements.",
  },
];

export function pageHead(title: string, description: string, path = "/") {
  const full = `${title} | ${company.shortName}`;
  const origin = (import.meta.env["VITE_SITE_URL"] || "").replace(/\/+$/, "");
  return {
    links: [{ rel: "canonical", href: `${origin}${path}` }],
    meta: [
      { title: full },
      { name: "description", content: description },
      { property: "og:title", content: full },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}
