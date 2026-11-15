import { z } from "zod";
export const productValues = ["quartz", "barytes", "rice", "chillies", "other"] as const;
export const contactSearchSchema = z.object({
  product: z.enum(productValues).optional().catch(undefined),
});
export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(100),
  company: z.string().trim().min(2, "Please enter your company name.").max(150),
  email: z.string().trim().email("Please enter a valid email address.").max(255),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number.")
    .max(25)
    .regex(/^[+\d\s().-]+$/, "Please enter a valid phone number."),
  country: z.string().trim().min(2, "Please enter your country.").max(100),
  product: z.enum(productValues, { errorMap: () => ({ message: "Please choose a product." }) }),
  quantity: z.string().trim().max(100).optional(),
  message: z
    .string()
    .trim()
    .min(10, "Please provide at least 10 characters about your requirement.")
    .max(3000),
  website: z.string().max(0),
});
export type Enquiry = z.infer<typeof enquirySchema>;
export async function submitEnquiry(input: Enquiry) {
  const data = enquirySchema.parse(input);
  const endpoint = import.meta.env["VITE_ENQUIRY_ENDPOINT"];
  if (!endpoint)
    throw new Error(
      "Online enquiries are not connected yet. Please contact our team by phone or WhatsApp.",
    );
  const url = new URL(endpoint);
  if (url.protocol !== "https:")
    throw new Error("The enquiry service is unavailable. Please contact our team directly.");
  const response = await fetch(url.toString(), {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok)
    throw new Error(
      "Your enquiry could not be sent. Please try again or contact our team directly.",
    );
}
