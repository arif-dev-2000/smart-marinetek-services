import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Gem,
  Globe2,
  PackageCheck,
  Truck,
  Check,
  ChevronRight,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { images, products, services, process, type Product } from "@/data/company";
export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.55 }}
    >
      {children}
    </motion.div>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}
export function QuoteLink({
  product,
  variant = "default",
  children = "Request a Quote",
}: {
  product?: string;
  variant?: "default" | "gold" | "heroOutline" | "outline";
  children?: ReactNode;
}) {
  return (
    <Button asChild variant={variant} size="lg">
      <Link
        to="/contact"
        search={{ product: product as "quartz" | "barytes" | "rice" | "chillies" | undefined }}
      >
        {children}
        <ArrowUpRight size={17} />
      </Link>
    </Button>
  );
}
export function PageHero({
  title,
  eyebrow,
  description,
  image = images.quarry,
}: {
  title: string;
  eyebrow: string;
  description: string;
  image?: string;
}) {
  return (
    <section className="page-hero">
      <img
        src={image}
        alt="Illustrative mineral and industrial trade photography"
        width={1920}
        height={1024}
        fetchPriority="high"
      />
      <div className="image-shade" />
      <div className="container page-hero-content">
        <div className="breadcrumbs">
          <Link to="/">Home</Link>
          <ChevronRight size={13} />
          <span>{eyebrow}</span>
        </div>
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
        </Reveal>
      </div>
    </section>
  );
}
export function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  return (
    <Reveal className={`product-card ${compact ? "compact" : ""}`}>
      <Link
        to="/products/$slug"
        params={{ slug: product.slug }}
        aria-label={`Explore ${product.name}`}
        className="product-image"
      >
        <img
          src={product.image}
          alt={`Illustrative ${product.name.toLowerCase()} product photograph`}
          width={1200}
          height={912}
          loading="lazy"
        />
        <span className="image-label">
          {product.isMainSource ? "Main Source · Industrial Minerals" : product.category}
        </span>
        <span className="circle-arrow">
          <ArrowUpRight size={21} />
        </span>
      </Link>
      <div className="product-info">
        <div className="product-title">
          <h3>{product.name}</h3>
          <span>{product.formula}</span>
        </div>
        <p>{product.description}</p>
        <Link className="text-link" to="/products/$slug" params={{ slug: product.slug }}>
          Explore {product.name}
          <ArrowRight size={16} />
        </Link>
      </div>
    </Reveal>
  );
}
export function Intro({ full = false }: { full?: boolean }) {
  return (
    <section className="section container intro-grid">
      <Reveal className="intro-images">
        <img
          className="intro-main"
          src={images.quartz}
          alt="Illustrative natural quartz crystals"
          width={1200}
          height={912}
          loading="lazy"
        />
        <img
          className="intro-small"
          src={images.barytes}
          alt="Illustrative barytes mineral texture"
          width={1200}
          height={912}
          loading="lazy"
        />
        <div className="established">
          <span>ESTABLISHED</span>
          <strong>2020</strong>
          <span>ROOTED IN INDIA</span>
        </div>
      </Reveal>
      <Reveal className="intro-copy">
        <SectionHeading
          eyebrow="ABOUT SMART MARINETEK"
          title="Built on Resources. Driven by Connections."
        />
        <p>
          Based in Andhra Pradesh, India, Smart Marinetek Services Private Limited focuses on
          connecting mineral resources with industrial and commercial requirements.
        </p>
        <p>
          Our core focus is quartz and barytes, complemented by selected agricultural commodities.
          We bring a requirement-led approach to sourcing, trading and supply coordination.
        </p>
        <div className="intro-highlights">
          {[
            "Focused mineral portfolio",
            "Specification-conscious approach",
            "Domestic & international trade",
          ].map((x) => (
            <div key={x}>
              <Check size={16} />
              {x}
            </div>
          ))}
        </div>
        {!full && (
          <Button asChild variant="outline" size="lg">
            <Link to="/about">
              Discover Our Company
              <ArrowUpRight />
            </Link>
          </Button>
        )}
      </Reveal>
    </section>
  );
}
const icons = [Gem, Globe2, PackageCheck, Truck];
export function ServicesOverview() {
  return (
    <section className="section container">
      <div className="section-top">
        <SectionHeading eyebrow="WHAT WE DO" title="Supporting Industrial Sourcing and Trade." />
        <Link className="text-link" to="/services">
          Our Services
          <ArrowUpRight size={17} />
        </Link>
      </div>
      <div className="service-grid">
        {services.slice(0, 4).map((s, i) => {
          const Icon = icons[i];
          return (
            <Reveal className="service-item" key={s.name}>
              {Icon && <Icon size={28} strokeWidth={1.4} />}
              <span className="small-number">0{i + 1}</span>
              <h3>{s.name}</h3>
              <p>{s.text}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
export function Process() {
  return (
    <section className="section container">
      <SectionHeading eyebrow="HOW WE WORK" title="From Your Requirement to a Clear Way Forward." />
      <div className="process-grid">
        {process.map((p, i) => (
          <Reveal className="process-step" key={p.title}>
            <span>0{i + 1}</span>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
export function QuoteCTA() {
  return (
    <section className="quote-band">
      <img
        src={images.shipping}
        alt="Illustrative cargo shipping and logistics"
        width={1600}
        height={912}
        loading="lazy"
      />
      <div className="image-shade" />
      <div className="container quote-content">
        <div>
          <span className="eyebrow">LET’S START A CONVERSATION</span>
          <h2>
            Looking for a Mineral
            <br className="desktop-break" /> Supply Partner?
          </h2>
          <p>Connect with our team to discuss your quartz, barytes or commodity requirements.</p>
        </div>
        <div className="quote-buttons">
          <QuoteLink variant="gold" />
          <Button asChild variant="heroOutline" size="lg">
            <Link to="/contact" search={{}}>
              Contact Us
              <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
export function CoreProducts() {
  return (
    <section className="section product-section">
      <div className="container">
        <div className="section-top">
          <SectionHeading
            eyebrow="OUR CORE PRODUCTS"
            title="Essential Minerals. Exceptional Possibilities."
          >
            <span>Resources that form the foundation of modern industry.</span>
          </SectionHeading>
          <Link className="text-link" to="/products">
            View All Products
            <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="two-grid">
          {products.slice(0, 2).map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
