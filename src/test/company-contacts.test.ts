import { describe, expect, it } from "vitest";
import { buildMailtoUrl, buildWhatsAppUrl, company, companyJsonLd, products } from "@/data/company";

describe("Smart Marinetek company profile, support emails & WhatsApp director links", () => {
  it("exposes approved company details, logo path, support emails and director contacts", () => {
    expect(company.name).toBe("Smart Marinetek Services Private Limited");
    expect(company.shortName).toBe("SMS Pvt. Ltd.");
    expect(company.established).toBe("03 March 2020");
    expect(company.establishedShort).toBe("03-03-2020");
    expect(company.location).toBe("Andhra Pradesh, India");
    expect(company.logoPath).toBe("/sms-logo.svg");
    expect(company.mainSources).toEqual(["Quartz", "Barytes"]);
    expect(company.contacts).toHaveLength(2);
    expect(company.emails).toHaveLength(2);

    const [shaik, sanjay] = company.contacts;
    expect(shaik.name).toBe("Shaik Nazeer Basha");
    expect(shaik.role).toContain("Director");
    expect(shaik.tel).toBe("+918121788778");
    expect(shaik.whatsapp).toBe("918121788778");

    expect(sanjay.name).toBe("Sanjay Narotra");
    expect(sanjay.role).toContain("Director");
    expect(sanjay.tel).toBe("+919877153120");
    expect(sanjay.whatsapp).toBe("919877153120");

    expect(company.emails.map((e) => e.email)).toEqual([
      "info@smartmarinetek.com",
      "smartmarinetek@gmail.com",
    ]);
    expect(companyJsonLd["@type"]).toBe("Organization");
  });

  it("marks Quartz and Barytes as main sources and retains chillies and rice slugs", () => {
    const bySlug = Object.fromEntries(products.map((p) => [p.slug, p]));
    expect(bySlug["quartz"]?.isMainSource).toBe(true);
    expect(bySlug["barytes"]?.isMainSource).toBe(true);
    expect(bySlug["rice"]?.isMainSource).toBe(false);
    expect(bySlug["chillies"]?.isMainSource).toBe(false);
  });

  it("builds valid wa.me and mailto URLs with %20 encoding", () => {
    const [shaik, sanjay] = company.contacts;
    const shaikUrl = buildWhatsAppUrl(shaik);
    const sanjayUrl = buildWhatsAppUrl(sanjay, "Request quote for 200 MT Quartz");

    expect(shaikUrl.startsWith("https://wa.me/918121788778?text=")).toBe(true);
    expect(sanjayUrl).toBe(
      "https://wa.me/919877153120?text=Request%20quote%20for%20200%20MT%20Quartz",
    );

    const mailUrl = buildMailtoUrl(
      "info@smartmarinetek.com",
      "Quartz Quote",
      "Need 500 MT",
      "smartmarinetek@gmail.com",
    );
    expect(mailUrl).toBe(
      "mailto:info@smartmarinetek.com?cc=smartmarinetek%40gmail.com&subject=Quartz%20Quote&body=Need%20500%20MT",
    );
    expect(mailUrl).not.toContain("+");
  });

  it("excludes all invoice-derived private fields across company and product metadata", () => {
    const dump = JSON.stringify({ company, companyJsonLd, products });
    for (const forbidden of [
      "37ABDCS5239A1ZJ",
      "ABDCS5239A",
      "Kotamitta",
      "Mansoor Nagar",
      "063126900000023",
      "YESB0000631",
      "Donghai",
      "Jiangsu",
      "Shandong",
      "13869900567",
    ]) {
      expect(dump).not.toContain(forbidden);
    }
  });
});
