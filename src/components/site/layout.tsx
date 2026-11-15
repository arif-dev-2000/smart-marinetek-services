import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Menu,
  X,
  ChevronDown,
  ArrowUpRight,
  Mail,
  MessageCircle,
  MapPin,
  Phone,
  MoveUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildMailtoUrl, buildWhatsAppUrl, company, navigation, products } from "@/data/company";
import { QuoteLink } from "./sections";

export function Logo() {
  return (
    <Link to="/" className="brand" aria-label="Smart Marinetek home">
      <img
        src={company.logoPath}
        alt={`${company.name} logo`}
        width={132}
        height={55}
        className="brand-logo-img"
      />
      <span>
        <strong>SMART MARINETEK</strong>
        <small>SERVICES PVT. LTD. · EST. {company.establishedShort}</small>
      </span>
    </Link>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const primaryContact = company.contacts[0];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setMobile(false);
    setDropdown(false);
  }, [pathname]);

  return (
    <header className={`site-header ${scrolled || mobile ? "solid" : ""}`}>
      <div className="container header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((n) =>
            n.name === "Products" ? (
              <div
                className="nav-dropdown"
                key={n.to}
                onMouseEnter={() => setDropdown(true)}
                onMouseLeave={() => setDropdown(false)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget)) setDropdown(false);
                }}
              >
                <Button
                  variant="nav"
                  onClick={() => setDropdown(!dropdown)}
                  aria-expanded={dropdown}
                  aria-controls="product-menu"
                >
                  Products
                  <ChevronDown size={12} />
                </Button>
                {dropdown && (
                  <div className="dropdown-panel" id="product-menu">
                    <Link to="/products">All Products</Link>
                    {products.map((p) => (
                      <Link key={p.slug} to="/products/$slug" params={{ slug: p.slug }}>
                        {p.name}
                        <ArrowUpRight size={14} />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={n.to} to={n.to} search={{}} className={pathname === n.to ? "active" : ""}>
                {n.name}
              </Link>
            ),
          )}
        </nav>

        <div className="header-quote">
          <a
            href={buildWhatsAppUrl(primaryContact)}
            target="_blank"
            rel="noopener noreferrer"
            className="header-wa-link"
            aria-label={`Chat on WhatsApp with ${primaryContact.name}`}
          >
            <MessageCircle size={14} />
            <span>WhatsApp</span>
          </a>
          <QuoteLink variant="gold" />
        </div>

        <Button
          className="mobile-menu-button"
          variant="nav"
          size="icon"
          aria-label={mobile ? "Close navigation" : "Open navigation"}
          aria-expanded={mobile}
          onClick={() => setMobile(!mobile)}
        >
          {mobile ? <X /> : <Menu />}
        </Button>
      </div>

      {mobile && (
        <nav className="mobile-nav container" aria-label="Mobile navigation">
          {navigation.map((n) => (
            <Link to={n.to} search={{}} key={n.to}>
              {n.name}
              <ArrowUpRight size={17} />
            </Link>
          ))}
          <div className="mobile-products">
            {products.map((p) => (
              <Link key={p.slug} to="/products/$slug" params={{ slug: p.slug }}>
                {p.name}
              </Link>
            ))}
          </div>
          <div className="mobile-directors">
            {company.contacts.map((c) => (
              <div key={c.id} className="mobile-director-row">
                <span>{c.name}</span>
                <div className="mobile-director-links">
                  <a href={`tel:${c.tel}`} aria-label={`Call ${c.name}`}>
                    <Phone size={13} />
                    {c.phone}
                  </a>
                  <a
                    href={buildWhatsAppUrl(c)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mobile-wa-pill"
                    aria-label={`WhatsApp ${c.name}`}
                  >
                    <MessageCircle size={13} />
                    WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="mobile-emails">
            {company.emails.map((e) => (
              <a
                key={e.id}
                href={buildMailtoUrl(e.email, `Business Enquiry — ${company.shortName}`)}
              >
                <Mail size={13} />
                {e.email}
              </a>
            ))}
          </div>
          <QuoteLink variant="gold" />
        </nav>
      )}
    </header>
  );
}

function WhatsAppDirectorsDesk() {
  const [open, setOpen] = useState(false);
  const deskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onOutside = (e: MouseEvent) => {
      if (deskRef.current && !deskRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onOutside);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onOutside);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  return (
    <div className="wa-desk-container" ref={deskRef}>
      {open && (
        <div
          id="wa-directors-desk"
          className="wa-desk-popover"
          role="dialog"
          aria-label="Direct Director Contacts"
        >
          <div className="wa-desk-header">
            <div>
              <strong>Direct Export Desk</strong>
              <span>
                {company.shortName} · Est. {company.establishedShort}
              </span>
            </div>
            <button
              type="button"
              className="wa-desk-close"
              onClick={() => setOpen(false)}
              aria-label="Close WhatsApp contact desk"
            >
              <X size={16} />
            </button>
          </div>

          <div className="wa-desk-list">
            {company.contacts.map((c) => (
              <div key={c.id} className="wa-desk-card">
                <div className="wa-desk-person">
                  <strong>{c.name}</strong>
                  <span>{c.role}</span>
                </div>
                <div className="wa-desk-actions">
                  <a href={`tel:${c.tel}`} className="wa-desk-call">
                    <Phone size={13} />
                    {c.phone}
                  </a>
                  <a
                    href={buildWhatsAppUrl(c)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="wa-desk-chat"
                  >
                    <MessageCircle size={13} />
                    WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="wa-desk-emails">
            <span>Official Support Emails</span>
            {company.emails.map((e) => (
              <a key={e.id} href={buildMailtoUrl(e.email, `Export Enquiry — ${company.shortName}`)}>
                <Mail size={13} />
                {e.email}
              </a>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        className="whatsapp-button"
        aria-expanded={open}
        aria-controls="wa-directors-desk"
        aria-label="WhatsApp Smart Marinetek Directors"
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? <X size={22} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}

export function Footer() {
  return (
    <>
      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <Logo />
            <p>
              Main source supplier and exporter of Quartz and Barytes, alongside Red Chillies,
              Indian Rice, and allied commodities.
            </p>
            <span className="location">
              <MapPin size={15} />
              {company.location} · Est. {company.establishedShort} ({company.established})
            </span>
          </div>
          <div>
            <h3>Explore</h3>
            {navigation.slice(1).map((n) => (
              <Link key={n.to} to={n.to} search={{}}>
                {n.name}
              </Link>
            ))}
          </div>
          <div>
            <h3>Our Products</h3>
            {products.map((p) => (
              <Link key={p.slug} to="/products/$slug" params={{ slug: p.slug }}>
                {p.name}
              </Link>
            ))}
            <Link to="/services">Sourcing &amp; Trade</Link>
          </div>
          <div className="footer-contact">
            <h3>Let’s Connect</h3>
            {company.contacts.map((c) => (
              <div key={c.id}>
                <span>{c.name}</span>
                <small className="footer-role">{c.role}</small>
                <a href={`tel:${c.tel}`}>
                  <Phone size={13} />
                  {c.phone}
                </a>
                <a
                  href={buildWhatsAppUrl(c)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-wa-link"
                >
                  <MessageCircle size={13} />
                  WhatsApp Direct
                </a>
              </div>
            ))}
            <div className="footer-emails">
              <span>Support &amp; Trade Emails</span>
              {company.emails.map((e) => (
                <a
                  key={e.id}
                  href={buildMailtoUrl(e.email, `Export Enquiry — ${company.shortName}`)}
                >
                  <Mail size={13} />
                  {e.email}
                </a>
              ))}
            </div>
            <Link to="/contact" search={{}} className="text-link">
              Make an Enquiry
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </span>
          <div>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-and-conditions">Terms &amp; Conditions</Link>
            <Button
              variant="nav"
              size="icon"
              aria-label="Back to top"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                    ? "instant"
                    : "smooth",
                })
              }
            >
              <MoveUp size={16} />
            </Button>
          </div>
        </div>
      </footer>
      <WhatsAppDirectorsDesk />
    </>
  );
}
