import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const ADMIN_EMAILS = ["support@pointpolishcleaners.com", "quentinstepney4@gmail.com"];
const FROM_EMAIL = "Point Polish Cleaners <support@pointpolishcleaners.com>";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const bookingSchema = z.object({
  customerName: z.string().min(2).max(100),
  customerEmail: z.string().email().max(254),
  customerPhone: z.string().max(20),
  address: z.string().min(5).max(500),
  beds: z.string().max(10),
  baths: z.string().max(10),
  sqft: z.number().positive().max(50000),
  frequency: z.string().max(50),
  serviceType: z.string().max(100),
  addOns: z.array(z.string().max(100)).max(20),
  totalPrice: z.string().max(20),
  preferredDate: z.string().max(50),
  specialInstructions: z.string().max(2000).optional().nullable(),
  petInfo: z.string().max(500).optional().nullable(),
});

async function sendEmail(to: string, subject: string, html: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({ from: FROM_EMAIL, to: [to], subject, html }),
  });
  const text = await res.text();
  if (!res.ok) {
    console.error(`Resend error [${res.status}] for ${to}:`, text);
    throw new Error(`Resend ${res.status}: ${text}`);
  }
  console.log(`Email sent to ${to}`);
  return text;
}

function customerHtml(b: z.infer<typeof bookingSchema>) {
  const addOns = b.addOns.length > 0 ? b.addOns.join(", ") : "None";
  return `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a;">
    <div style="background:#0C8A9E;padding:24px;text-align:center;">
      <h1 style="color:#fff;margin:0;font-family:Georgia,serif;">Booking Confirmed ✨</h1>
    </div>
    <div style="padding:24px;background:#FAFAF9;">
      <p>Hi ${b.customerName},</p>
      <p>Thank you for booking with <strong>Point Polish Cleaners</strong>! We've received your request and will contact you within <strong>15 minutes</strong> to confirm your appointment time.</p>
      <h3 style="color:#0C8A9E;border-bottom:2px solid #0C8A9E;padding-bottom:6px;">Booking Details</h3>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:6px 0;"><strong>Date:</strong></td><td>${b.preferredDate}</td></tr>
        <tr><td style="padding:6px 0;"><strong>Service:</strong></td><td>${b.serviceType}</td></tr>
        <tr><td style="padding:6px 0;"><strong>Frequency:</strong></td><td>${b.frequency}</td></tr>
        <tr><td style="padding:6px 0;"><strong>Address:</strong></td><td>${b.address}</td></tr>
        <tr><td style="padding:6px 0;"><strong>Property:</strong></td><td>${b.beds} bed, ${b.baths} bath (${b.sqft.toLocaleString()} sq ft)</td></tr>
        <tr><td style="padding:6px 0;"><strong>Add-ons:</strong></td><td>${addOns}</td></tr>
        <tr><td style="padding:6px 0;font-size:18px;"><strong>Total:</strong></td><td style="font-size:18px;color:#0C8A9E;"><strong>$${b.totalPrice}</strong></td></tr>
      </table>
      <p style="margin-top:24px;">Questions? Call us at <a href="tel:+19045139002" style="color:#0C8A9E;">(904) 513-9002</a>.</p>
      <p>— The Point Polish Cleaners Team</p>
    </div>
  </div>`;
}

function adminHtml(b: z.infer<typeof bookingSchema>) {
  const addOns = b.addOns.length > 0 ? b.addOns.join(", ") : "None";
  return `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a;">
    <h2 style="color:#0C8A9E;">🧽 New Website Booking</h2>
    <table style="width:100%;border-collapse:collapse;">
      <tr><td><strong>Customer:</strong></td><td>${b.customerName}</td></tr>
      <tr><td><strong>Phone:</strong></td><td>${b.customerPhone}</td></tr>
      <tr><td><strong>Email:</strong></td><td>${b.customerEmail}</td></tr>
      <tr><td><strong>Date:</strong></td><td>${b.preferredDate}</td></tr>
      <tr><td><strong>Service:</strong></td><td>${b.serviceType}</td></tr>
      <tr><td><strong>Frequency:</strong></td><td>${b.frequency}</td></tr>
      <tr><td><strong>Address:</strong></td><td>${b.address}</td></tr>
      <tr><td><strong>Property:</strong></td><td>${b.beds} bed, ${b.baths} bath (${b.sqft.toLocaleString()} sq ft)</td></tr>
      <tr><td><strong>Add-ons:</strong></td><td>${addOns}</td></tr>
      <tr><td><strong>Total:</strong></td><td><strong>$${b.totalPrice}</strong></td></tr>
      ${b.specialInstructions ? `<tr><td><strong>Notes:</strong></td><td>${b.specialInstructions}</td></tr>` : ""}
      ${b.petInfo ? `<tr><td><strong>Pets:</strong></td><td>${b.petInfo}</td></tr>` : ""}
    </table>
  </div>`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not configured");

    const rawData = await req.json();
    const parseResult = bookingSchema.safeParse(rawData);
    if (!parseResult.success) {
      console.error("Validation error:", parseResult.error.errors);
      return new Response(
        JSON.stringify({ error: "Invalid input data", details: parseResult.error.flatten().fieldErrors }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const booking = parseResult.data;

    // Send customer + admin emails (don't fail one if the other fails)
    const results = await Promise.allSettled([
      sendEmail(booking.customerEmail, "Your Point Polish Cleaners booking is confirmed ✨", customerHtml(booking)),
      ...ADMIN_EMAILS.map((adminEmail) =>
        sendEmail(adminEmail, `New booking: ${booking.customerName} — ${booking.preferredDate}`, adminHtml(booking))
      ),
    ]);

    const customerOk = results[0].status === "fulfilled";
    const adminOk = results.slice(1).some((r) => r.status === "fulfilled");

    return new Response(
      JSON.stringify({ success: customerOk || adminOk, customerEmailSent: customerOk, adminEmailSent: adminOk }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Booking confirmation error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
