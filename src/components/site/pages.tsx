import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowUpRight,
  Gem,
  Globe2,
  Mail,
  MapPin,
  PackageCheck,
  Check,
  Phone,
  ShieldCheck,
  MessageSquare,
  MessageCircle,
  Target,
  ClipboardCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  buildMailtoUrl,
  buildWhatsAppUrl,
  company,
  companyJsonLd,
  products,
  industries,
  services,
  images,
  type Product,
} from "@/data/company";
import {
  Reveal,
  SectionHeading,
  QuoteLink,
  PageHero,
  Intro,
  CoreProducts,
  ProductCard,
  ServicesOverview,
  Process,
  QuoteCTA,
} from "./sections";

export function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(companyJsonLd) }}
      />
      <section className="hero">
        <img
          src={images.quarry}
          alt="Illustrative quartz quarry landscape with natural white mineral formations"
          width={1920}
          height={1024}
          fetchPriority="high"
        />
        <div className="image-shade" />
        <div className="container hero-content">
          <Reveal>
            <span className="eyebrow">
              INDUSTRIAL MINERAL EXPORTS · EST. {company.establishedShort}
            </span>
            <h1>
              Connecting Mineral
              <br />
              Resources to
              <br />
              <span>Global Industries.</span>
            </h1>
            <p>
              {company.name} focuses on direct sourcing and global trade with Quartz and Barytes as
              main sources, alongside Red Chillies, Indian Rice, and allied commodities.
            </p>
            <div className="hero-buttons">
              <Button asChild variant="gold" size="lg">
                <Link to="/products">
                  Explore Our Products
                  <ArrowUpRight />
                </Link>
              </Button>
              <QuoteLink variant="heroOutline" />
            </div>
          </Reveal>
        </div>
        <div className="container hero-bottom">
          <span>
            <ArrowDown size={15} />
            SCROLL TO EXPLORE
          </span>
          <span>
            <MapPin size={13} />
            ANDHRA PRADESH, INDIA
          </span>
        </div>
      </section>

      <section className="hero-badges">
        <div className="container badge-inner">
          <div>
            <Gem />
            Main Source: Quartz &amp; Barytes
          </div>
          <div>
            <Globe2 />
            Red Chillies &amp; Indian Rice
          </div>
          <div>
            <PackageCheck />
            Requirement-led Export Supply
          </div>
          <div>
            <MapPin />
            Established {company.establishedShort}, India
          </div>
        </div>
      </section>

      <Intro />
      <CoreProducts />

      <section className="section container">
        <SectionHeading
          eyebrow="SELECTED COMMODITIES"
          title="Beyond Minerals. A Considered Portfolio."
        />
        <div className="commodity-grid">
          {products.slice(2).map((p) => (
            <Reveal key={p.slug} className="commodity-card">
              <img
                src={p.image}
                alt={`Illustrative ${p.name} commodity`}
                width={1008}
                height={752}
                loading="lazy"
              />
              <div>
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <Link className="text-link" to="/products/$slug" params={{ slug: p.slug }}>
                  Explore {p.name}
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <ServicesOverview />

      <section className="section industry-section">
        <div className="container">
          <div className="section-top">
            <SectionHeading
              eyebrow="INDUSTRIES WE SERVE"
              title="Resources for the Industries That Shape Our World."
            />
            <Link className="text-link" to="/industries">
              Explore Applications
              <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="industry-grid">
            {industries.map((i) => (
              <Link className="industry-card" key={i.name} to="/industries">
                <img
                  src={i.image}
                  alt={`Illustrative ${i.name.toLowerCase()} application`}
                  width={1008}
                  height={752}
                  loading="lazy"
                />
                <div>
                  <span>{i.product.toUpperCase()}</span>
                  <h3>{i.name}</h3>
                  <ArrowUpRight size={20} />
                </div>
              </Link>
            ))}
          </div>
          <p className="note">
            Illustrative product application sectors; not claims of existing clients or
            company-owned operations.
          </p>
        </div>
      </section>

      <section className="section why-section">
        <div className="container why-grid">
          <div>
            <span className="eyebrow">WHY SMART MARINETEK</span>
            <h2>
              A Focused Approach
              <br />
              to Mineral Trade.
            </h2>
          </div>
          <div className="why-items">
            {[
              {
                icon: Target,
                title: "Product-focused sourcing",
                text: "A considered portfolio centred on quartz and barytes.",
              },
              {
                icon: ClipboardCheck,
                title: "Specification-conscious communication",
                text: "Product discussions guided by your technical requirements.",
              },
              {
                icon: ShieldCheck,
                title: "Professional trade coordination",
                text: "Clear commercial discussions and supply alignment.",
              },
              {
                icon: MessageSquare,
                title: "Customer-oriented enquiries",
                text: "A direct conversation about what your business needs.",
              },
            ].map((x) => (
              <Reveal key={x.title}>
                <x.icon size={24} strokeWidth={1.4} />
                <h3>{x.title}</h3>
                <p>{x.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Process />
      <QuoteCTA />
    </>
  );
}

export function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT US"
        title="Rooted in Resources. Built for Connection."
        description="A focused mineral sourcing and trading business based in Andhra Pradesh, India."
      />
      <Intro full />
      <section className="section product-section">
        <div className="container content-grid">
          <div>
            <span className="eyebrow">OUR COMPANY JOURNEY</span>
            <h2>
              Established in 2020.
              <br />
              Focused on What Comes Next.
            </h2>
          </div>
          <div>
            <p>
              Smart Marinetek Services Private Limited was established on {company.establishedShort}{" "}
              ({company.established}). Our business focus is mineral sourcing, trading, import and
              export, with Quartz and Barytes as main sources at the centre of the portfolio.
            </p>
            <p>
              Our approach begins with understanding the buyer’s requirements and coordinating
              product, specification and commercial discussions. Red Chillies, Indian Rice and
              allied commodities complement our core mineral focus.
            </p>
          </div>
        </div>
      </section>

      <section className="section container">
        <SectionHeading
          eyebrow="OUR DIRECTION"
          title="Purpose-led Sourcing. Clear Communication."
        />
        <div className="statement-grid">
          <div className="statement">
            <h3>Our Mission</h3>
            <p>
              To connect industrial and commercial requirements with suitable mineral and commodity
              sourcing opportunities through clear communication and considered trade coordination.
            </p>
          </div>
          <div className="statement">
            <h3>Our Vision</h3>
            <p>
              To develop lasting business relationships built on product understanding, responsible
              communication and a requirement-led approach to trade.
            </p>
          </div>
        </div>
      </section>

      <ServicesOverview />

      <section className="section container">
        <SectionHeading eyebrow="LEADERSHIP" title="A Direct Conversation with Our Team." />
        <div className="leadership-grid">
          {company.contacts.map((c) => (
            <div className="leadership-person" key={c.id}>
              <h3>{c.name}</h3>
              <span>{c.role}</span>
              <div className="director-actions">
                <Button asChild variant="outline">
                  <a href={`tel:${c.tel}`}>
                    <Phone size={15} />
                    {c.phone}
                  </a>
                </Button>
                <Button asChild variant="default">
                  <a href={buildWhatsAppUrl(c)} target="_blank" rel="noopener noreferrer">
                    <MessageCircle size={15} />
                    WhatsApp Director
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="support-desk-strip">
          <div>
            <h3>Official Support &amp; Trade Desks</h3>
            <p>
              Reach our commercial and customer support teams directly by email for quotes, COAs,
              and export documentation.
            </p>
          </div>
          <div className="support-desk-links">
            {company.emails.map((e) => (
              <Button key={e.id} asChild variant="outline">
                <a href={buildMailtoUrl(e.email, `Business Enquiry — ${company.shortName}`)}>
                  <Mail size={15} />
                  {e.email}
                </a>
              </Button>
            ))}
          </div>
        </div>
      </section>
      <QuoteCTA />
    </>
  );
}

export function ProductsPage() {
  const [category, setCategory] = useState("All Products");
  return (
    <>
      <PageHero
        eyebrow="OUR PRODUCTS"
        title="A Focused Portfolio of Essential Resources."
        description="Explore quartz and barytes for industrial applications, alongside selected agricultural commodities."
        image={images.quartz}
      />
      <section className="section container">
        <SectionHeading eyebrow="PRODUCT PORTFOLIO" title="Minerals First. Requirements Always.">
          Our core mineral portfolio is supported by selected commodity trading. Availability, forms
          and specifications are confirmed during enquiry.
        </SectionHeading>
        <div className="filters" aria-label="Product category">
          {["All Products", "Industrial Minerals", "Agricultural Commodities"].map((c) => (
            <Button
              variant="outline"
              aria-pressed={c === category}
              onClick={() => setCategory(c)}
              key={c}
            >
              {c}
            </Button>
          ))}
        </div>
        <div className="catalogue-grid">
          {products
            .filter((p) => category === "All Products" || p.category === category)
            .map((p) => (
              <ProductCard product={p} key={p.slug} />
            ))}
        </div>
      </section>
      <QuoteCTA />
    </>
  );
}

export function ProductPage({ product: p }: { product: Product }) {
  const mineral = p.category === "Industrial Minerals";
  const productEmailUrl = buildMailtoUrl(
    company.emails[0].email,
    `Enquiry: ${p.name} — ${company.shortName}`,
    `Hello ${company.shortName} Export Desk, please share specifications and quotation details for ${p.name}.`,
    company.emails[1].email,
  );

  return (
    <>
      <PageHero
        eyebrow={p.isMainSource ? `${p.name.toUpperCase()} · MAIN SOURCE` : p.name.toUpperCase()}
        title={`${p.name}. ${p.slug === "quartz" ? "A Foundation of Modern Industry." : p.slug === "barytes" ? "Density That Makes a Difference." : "Selected Commodity Trading."}`}
        description={p.description}
        image={p.image}
      />
      <section className="section container product-overview">
        <div className="product-gallery">
          <img
            src={p.image}
            alt={`Illustrative ${p.name.toLowerCase()} product`}
            width={1200}
            height={912}
          />
          <img
            src={p.image}
            alt={`${p.name} illustrative close-up`}
            width={1200}
            height={912}
            loading="lazy"
          />
          <img
            src={mineral ? images.quarry : images.shipping}
            alt="Illustrative sourcing and trade context"
            width={1200}
            height={912}
            loading="lazy"
          />
        </div>
        <div>
          <SectionHeading
            eyebrow={`ABOUT ${p.name.toUpperCase()}`}
            title={
              mineral
                ? "Understanding the Mineral. Defining the Requirement."
                : "Considered Sourcing for Commercial Requirements."
            }
          />
          <p>{p.overview}</p>
          <div className="product-cta-row">
            <QuoteLink product={p.slug} />
            {company.contacts.map((c) => (
              <Button key={c.id} asChild variant="outline" size="lg">
                <a
                  href={buildWhatsAppUrl(
                    c,
                    `Hello ${c.name} (${company.shortName}), please share specifications and export quotation details for ${p.name}.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={16} />
                  WhatsApp {c.name}
                </a>
              </Button>
            ))}
            <Button asChild variant="outline" size="lg">
              <a href={productEmailUrl}>
                <Mail size={16} />
                Email Spec Sheet Request
              </a>
            </Button>
          </div>
          <h3 className="mt-8 mb-4 text-xl">
            {mineral ? "Potential Forms" : "Available Varieties"}
          </h3>
          <div className="detail-list">
            {p.forms.map((f) => (
              <div key={f}>
                <Check size={16} />
                {f}
              </div>
            ))}
          </div>
          <p className="note">
            {mineral
              ? "Forms shown are illustrative industry forms. Actual availability is subject to confirmation."
              : "Contact our team to discuss available varieties; no specific varieties or grades are confirmed here."}
          </p>
        </div>
      </section>

      <section className="section product-section">
        <div className="container content-grid">
          <div>
            <SectionHeading
              eyebrow="TECHNICAL INFORMATION"
              title="Specifications That Start with Your Application."
            />
            <p>
              Tell us your technical requirements. Confirmed specifications and supporting
              documentation can be discussed for the proposed supply.
            </p>
            <p className="note">
              No specification values, grades or certifications are implied. All parameters require
              confirmation.
            </p>
          </div>
          <div>
            <table className="spec-table">
              <thead>
                <tr>
                  <th scope="col">Parameter</th>
                  <th scope="col">Specification</th>
                </tr>
              </thead>
              <tbody>
                {p.specs.map((s) => (
                  <tr key={s}>
                    <td>{s}</td>
                    <td>Available on Request</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section container content-grid">
        <div>
          <SectionHeading eyebrow="APPLICATIONS" title="Selected for the Right Purpose." />
          <div className="detail-list">
            {p.applications.map((a) => (
              <div key={a}>
                <Check size={16} />
                {a}
              </div>
            ))}
          </div>
        </div>
        <div>
          <SectionHeading eyebrow="PACKAGING & SUPPLY" title="Coordinated Around Your Order." />
          <p>
            Packaging options, order quantity, lead times and shipment arrangements are discussed
            against the specific product and requirement. Please include your delivery destination
            and preferred packaging when enquiring.
          </p>
          <p>
            Product availability and international shipments are subject to applicable trade
            regulations and authorisations.
          </p>
          <QuoteLink product={p.slug} />
        </div>
      </section>
      <QuoteCTA />
    </>
  );
}

export function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="OUR SERVICES"
        title="Connecting Requirements. Coordinating Trade."
        description="Product-focused sourcing and commercial coordination for mineral and selected commodity requirements."
        image={images.shipping}
      />
      <section className="section container alternating">
        {services.map((s, i) => (
          <Reveal key={s.name} className="alternating-row">
            <img
              src={[images.quarry, images.shipping, images.rice, images.shipping, images.quartz][i]}
              alt={`Illustrative ${s.name.toLowerCase()} context`}
              width={1200}
              height={912}
              loading="lazy"
            />
            <div>
              <span className="eyebrow">0{i + 1} — OUR SERVICES</span>
              <h2>{s.name}</h2>
              <p>{s.text}</p>
              <p>
                {i === 0
                  ? "A clear understanding of product form, intended use and technical requirements guides each sourcing discussion."
                  : i === 1
                    ? "Commercial terms, shipment destinations and applicable authorisations are reviewed before an international supply arrangement is confirmed."
                    : i === 2
                      ? "Available varieties, quality parameters and quantities are discussed directly, without assuming unconfirmed stock or grades."
                      : i === 3
                        ? "We coordinate with relevant supply and logistics partners. This does not imply ownership of warehouses, vessels or transport facilities."
                        : "Available testing information and relevant documentation can be reviewed where applicable. We do not claim an owned laboratory or unverified accreditation."}
              </p>
              <QuoteLink />
            </div>
          </Reveal>
        ))}
      </section>
      <Process />
      <QuoteCTA />
    </>
  );
}

export function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="INDUSTRY APPLICATIONS"
        title="Essential Resources. Wide-ranging Applications."
        description="Explore the industries where quartz, barytes and selected commodities are used."
        image={images.glass}
      />
      <section className="section container alternating">
        {industries.map((i, index) => (
          <Reveal className="alternating-row" key={i.name}>
            <img
              src={i.image}
              alt={`Illustrative ${i.name} sector`}
              width={1008}
              height={752}
              loading="lazy"
            />
            <div>
              <span className="eyebrow">
                0{index + 1} — {i.product.toUpperCase()}
              </span>
              <h2>{i.name}</h2>
              <p>{i.text}</p>
              <Button asChild variant="outline" size="lg">
                <Link to="/products/$slug" params={{ slug: i.slug }}>
                  Explore {i.product}
                  <ArrowUpRight />
                </Link>
              </Button>
            </div>
          </Reveal>
        ))}
        <p className="note">
          These are illustrative application sectors, not claims of verified customers, facilities
          or existing contracts.
        </p>
      </section>
      <QuoteCTA />
    </>
  );
}

export function QualityPage() {
  return (
    <>
      <PageHero
        eyebrow="QUALITY & SUPPLY"
        title="Clear Specifications. Considered Supply."
        description="A transparent, requirement-led approach to product information, packaging and trade coordination."
        image={images.barytes}
      />
      <section className="section container content-grid">
        <div>
          <SectionHeading
            eyebrow="SPECIFICATION-FOCUSED SOURCING"
            title="The Right Questions Come First."
          />
          <p>
            Product suitability starts with understanding the intended application. We encourage
            buyers to share required composition, particle size, form, quantity and destination
            before discussing a supply arrangement.
          </p>
          <p>
            Available test documentation can be discussed where relevant. Testing capability,
            laboratories and certifications are not represented as company-owned or approved without
            verification.
          </p>
        </div>
        <img
          src={images.quartz}
          alt="Illustrative natural mineral texture"
          width={1200}
          height={912}
          loading="lazy"
        />
      </section>

      <section className="section product-section">
        <div className="container">
          <SectionHeading
            eyebrow="SUPPLY COORDINATION"
            title="Details That Support a Clear Agreement."
          />
          <div className="statement-grid">
            {[
              {
                title: "Packaging Options",
                text: "Discuss suitable packaging formats, weights and handling requirements for the particular product. All options depend on actual supply availability.",
              },
              {
                title: "Bulk Order Coordination",
                text: "Review order quantities, delivery schedules and commercial terms with the relevant supply parties. Minimum orders and lead times are confirmed on enquiry.",
              },
              {
                title: "Product Testing Documentation",
                text: "A Certificate of Analysis or other test report may be discussed where applicable and available. Buyers should review the scope and relevance of each document.",
              },
              {
                title: "Shipment Documentation",
                text: "A Commercial Invoice, Packing List, Certificate of Origin and Bill of Lading are discussed and provided where applicable to the agreed transaction.",
              },
            ].map((s) => (
              <div className="statement" key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
          <p className="note">
            No ISO certification, API approval, laboratory accreditation or guaranteed export
            availability is claimed.
          </p>
        </div>
      </section>
      <Process />
      <QuoteCTA />
    </>
  );
}

export function LegalPage({ kind }: { kind: "privacy" | "terms" }) {
  return (
    <>
      <PageHero
        eyebrow={kind === "privacy" ? "PRIVACY POLICY" : "TERMS & CONDITIONS"}
        title={kind === "privacy" ? "Privacy Policy." : "Terms & Conditions."}
        description={`Website policies for ${company.name}.`}
        image={images.shipping}
      />
      <section className="section container legal-content">
        {(kind === "privacy"
          ? [
              {
                title: "Information You Provide",
                text: "If you contact us by telephone, WhatsApp or an enabled enquiry service, you may provide your name, company, email, phone, country and sourcing requirements. Please do not include unnecessary sensitive information.",
              },
              {
                title: "Purpose of Use",
                text: "Information provided through business enquiries is intended for reviewing requirements, responding to your request and coordinating related commercial discussions.",
              },
              {
                title: "Website and Third-party Services",
                text: "This website has no account system or database. Enquiries are coordinated directly by telephone, WhatsApp, or configured enquiry channels. WhatsApp and external font services process data under their own policies when used.",
              },
              {
                title: "Retention and Your Requests",
                text: "Contact our listed directors or email info@smartmarinetek.com or smartmarinetek@gmail.com to request access, correction or deletion of information shared during an enquiry.",
              },
            ]
          : [
              {
                title: "Website Information",
                text: "Content provides general information about our mineral and commodity sourcing portfolio and illustrative product applications.",
              },
              {
                title: "Product Availability and Specifications",
                text: "Availability, forms, grades, quantities, quality parameters and packaging are confirmed only through direct commercial discussion. Nothing on this website is a binding supply offer or guaranteed product specification.",
              },
              {
                title: "Commercial Agreements",
                text: "Any transaction is subject to separately agreed quotations, order terms, payment arrangements and applicable trade regulations. This website does not process payments or accept orders.",
              },
              {
                title: "Illustrative Images and External Links",
                text: "Images are illustrative and do not depict confirmed company stock, owned facilities or verified customers. Third-party contact services operate under their own terms.",
              },
              {
                title: "Contact Information",
                text: "Please contact our listed company directors or email info@smartmarinetek.com or smartmarinetek@gmail.com with questions regarding commercial terms or website information.",
              },
            ]
        ).map((s) => (
          <div key={s.title}>
            <h2>{s.title}</h2>
            <p>{s.text}</p>
          </div>
        ))}
        <Button asChild variant="outline">
          <Link to="/contact" search={{}}>
            Contact Our Team
            <ArrowUpRight />
          </Link>
        </Button>
      </section>
    </>
  );
}
