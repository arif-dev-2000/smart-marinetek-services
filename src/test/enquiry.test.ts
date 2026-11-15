import { describe, it, expect } from "vitest";
import { enquirySchema, contactSearchSchema, submitEnquiry } from "@/lib/enquiry";
const valid = {
  name: "Buyer Name",
  company: "Industrial Buyer",
  email: "buyer@example.com",
  phone: "+91 1234567890",
  country: "India",
  product: "quartz" as const,
  quantity: "20 tonnes",
  message: "Please discuss our quartz sourcing requirement.",
  website: "",
};
describe("Business enquiry rules", () => {
  it("requires full name", () =>
    expect(enquirySchema.safeParse({ ...valid, name: "" }).success).toBe(false));
  it("requires company", () =>
    expect(enquirySchema.safeParse({ ...valid, company: "" }).success).toBe(false));
  it("requires a valid email", () =>
    expect(enquirySchema.safeParse({ ...valid, email: "invalid" }).success).toBe(false));
  it("requires phone", () =>
    expect(enquirySchema.safeParse({ ...valid, phone: "" }).success).toBe(false));
  it("requires country", () =>
    expect(enquirySchema.safeParse({ ...valid, country: "" }).success).toBe(false));
  it("requires a supported product", () =>
    expect(enquirySchema.safeParse({ ...valid, product: "unknown" }).success).toBe(false));
  it("requires message", () =>
    expect(enquirySchema.safeParse({ ...valid, message: "" }).success).toBe(false));
  it("accepts an omitted optional quantity", () => {
    const { quantity, ...data } = valid;
    expect(enquirySchema.safeParse(data).success).toBe(true);
  });
  it("retains quartz for product-specific quotes", () =>
    expect(contactSearchSchema.parse({ product: "quartz" }).product).toBe("quartz"));
  it("retains barytes for product-specific quotes", () =>
    expect(contactSearchSchema.parse({ product: "barytes" }).product).toBe("barytes"));
  it("never reports success with no endpoint", async () => {
    await expect(submitEnquiry(valid)).rejects.toThrow("not connected yet");
  });
});
