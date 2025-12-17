import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

// Restrict CORS to specific origins
const ALLOWED_ORIGINS = [
  'https://tidywisecleaning.com',
  'https://www.tidywisecleaning.com',
  'https://ekseakjxarhjujngoklz.supabase.co',
];

// Add development origins
const DEV_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:8080',
  'http://localhost:8081',
];

function getCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get('Origin') || '';
  
  // Check if origin matches allowed origins or Lovable preview domains
  const isAllowed = ALLOWED_ORIGINS.includes(origin) || 
    DEV_ORIGINS.includes(origin) ||
    origin.includes('.lovable.app') ||
    origin.includes('.lovableproject.com');
  
  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };
}

// HTML escape function to prevent XSS in emails
function escapeHtml(text: string | null | undefined): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Server-side validation schema
const bookingSchema = z.object({
  customerName: z.string().min(2).max(100),
  customerEmail: z.string().email().max(254).refine(
    (email) => !email.includes('\n') && !email.includes('\r') && !email.includes(',') && !email.includes(';'),
    'Invalid email format'
  ),
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

type BookingRequest = z.infer<typeof bookingSchema>;

const handler = async (req: Request): Promise<Response> => {
  const corsHeaders = getCorsHeaders(req);
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rawData = await req.json();
    
    // Validate input server-side
    const parseResult = bookingSchema.safeParse(rawData);
    if (!parseResult.success) {
      console.error("Validation error:", parseResult.error.errors);
      return new Response(
        JSON.stringify({ error: "Invalid input data", details: parseResult.error.errors }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    const booking = parseResult.data;
    console.log("Received validated booking request for:", escapeHtml(booking.customerEmail));

    const addOnsList = booking.addOns.length > 0 
      ? booking.addOns.map(a => escapeHtml(a)).join(", ") 
      : "None";

    // Escape all user inputs for email
    const safeName = escapeHtml(booking.customerName);
    const safeEmail = escapeHtml(booking.customerEmail);
    const safePhone = escapeHtml(booking.customerPhone);
    const safeAddress = escapeHtml(booking.address);
    const safeBeds = escapeHtml(booking.beds);
    const safeBaths = escapeHtml(booking.baths);
    const safeServiceType = escapeHtml(booking.serviceType);
    const safeFrequency = escapeHtml(booking.frequency);
    const safeSpecialInstructions = escapeHtml(booking.specialInstructions) || "None provided";
    const safePetInfo = escapeHtml(booking.petInfo) || "No pets";
    const safePreferredDate = escapeHtml(booking.preferredDate);
    const safeTotalPrice = escapeHtml(booking.totalPrice);
    const safeSqft = booking.sqft.toLocaleString();

    // Email to business owner
    const ownerEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "TIDYWISE Cleaning <support@tidywisecleaning.com>",
        to: ["support@tidywisecleaning.com"],
        subject: `New Booking Request from ${safeName} - ${safePreferredDate}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="text-align: center; padding: 25px; background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);">
              <img src="https://tidywisecleaning.com/logo-email.png" alt="TIDYWISE" style="height: 60px; width: auto;" />
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">Professional Cleaning Services</p>
            </div>
            
            <div style="padding: 20px; background: #f8fafc;">
              <h1 style="color: #1e40af;">New Booking Request!</h1>
              <h2 style="color: #2563eb;">📅 Requested Date: ${safePreferredDate}</h2>
              
              <h2 style="color: #1e40af;">Customer Information</h2>
              <ul>
                <li><strong>Name:</strong> ${safeName}</li>
                <li><strong>Email:</strong> ${safeEmail}</li>
                <li><strong>Phone:</strong> ${safePhone}</li>
                <li><strong>Address:</strong> ${safeAddress}</li>
              </ul>
              
              <h2 style="color: #1e40af;">Property Details</h2>
              <ul>
                <li><strong>Bedrooms:</strong> ${safeBeds}</li>
                <li><strong>Bathrooms:</strong> ${safeBaths}</li>
                <li><strong>Square Footage:</strong> ${safeSqft} sq ft</li>
              </ul>
              
              <h2 style="color: #1e40af;">Service Details</h2>
              <ul>
                <li><strong>Service Type:</strong> ${safeServiceType}</li>
                <li><strong>Frequency:</strong> ${safeFrequency}</li>
                <li><strong>Add-Ons:</strong> ${addOnsList}</li>
                <li><strong>Total Price:</strong> $${safeTotalPrice}</li>
              </ul>
              
              <h2 style="color: #1e40af;">Special Instructions</h2>
              <p>${safeSpecialInstructions}</p>
              
              <h2 style="color: #1e40af;">Pet Information</h2>
              <p>${safePetInfo}</p>
            </div>
            
            <div style="text-align: center; padding: 15px; background: #1e40af; color: white; font-size: 12px;">
              © ${new Date().getFullYear()} TIDYWISE Cleaning Services
            </div>
          </div>
        `,
      }),
    });

    const ownerEmailData = await ownerEmailRes.json();
    console.log("Owner email response:", ownerEmailData);

    // Confirmation email to customer
    const customerEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "TIDYWISE Cleaning <support@tidywisecleaning.com>",
        to: [booking.customerEmail],
        subject: "Your TIDYWISE Cleaning Booking Confirmation ✅",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <div style="text-align: center; padding: 25px; background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);">
              <img src="https://tidywisecleaning.com/logo-email.png" alt="TIDYWISE" style="height: 60px; width: auto;" />
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">Professional Cleaning Services</p>
            </div>
            
            <div style="padding: 30px 20px;">
              <h1 style="color: #2563eb; margin-top: 0;">Hi ${safeName},</h1>
            
              <p>Thank you very much for booking with us. You're all set! 🎉</p>
            
            <p>Please double check the date, time, and address to make sure it's correct.</p>
            
            <p>Please allow us a 1-hour window to deal with traffic, parking, and other surprises.</p>
            
            <p>We are very excited to help you! 💛<br>
            Below, you will find additional information regarding your booking and our company.<br>
            You may refer to it at any time.</p>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            
            <h2 style="color: #2563eb;">🧼 Important Reminders</h2>
            <ul>
              <li>If you would like to add extras that are not included in your cleaning, please notify us as quickly as possible.</li>
              <li>Communicate your expectations with your cleaner when they arrive. Please do a review with the cleaner(s) prior to letting them go. They are paid by the job and will not leave until you are satisfied.</li>
              <li>Make sure the cleaner(s) has/have space to clean. Children, pets, and other adults in the way can be hazardous. Vacuum cords, cleaning products, and supplies will be in the area with the cleaner, and to mitigate accidents from happening, it is best to give them space.</li>
              <li>We recommend minimizing clutter as much as possible. The cleaners will need to have access to surfaces to clean, and if they are covered up by too much clutter, they may be inaccessible. The cleaners will work around these areas. This also helps prevent items from being knocked around and from breaking.</li>
              <li>Please be home when the cleaners finish cleaning the home. If the client is not home for the final walkthrough, they surrender the right to a reclean.</li>
            </ul>
            
            <h2 style="color: #2563eb;">💰 Pricing & Adjustments</h2>
            <p>The price quoted over the phone/computer is based on the home being accurately represented at the time of booking.</p>
            <p>At times, it is impossible for us to know if a home will require a more in-depth cleaning until the cleaner arrives on-site and is able to assess the level of cleaning needed in person.</p>
            <p>This does not happen often, but please keep in mind if the cleaner assesses the job and determines a more in-depth cleaning is needed, the cost of the job may be subject to increase.</p>
            <p><strong>This will never be done without a conversation and your consent and approval.</strong></p>
            
            <h2 style="color: #2563eb;">🚫 Cancellation & Rescheduling Policy</h2>
            <p>We enforce a 1 full business day cancellation or modification rule.</p>
            <p>If you need to cancel or change your booking, we require 1 full business day's notice.</p>
            <ul>
              <li>🕒 If you provide more than 1 full business day's notice → no fee.</li>
              <li>⚠️ If the notice given is less than 1 full business day → $50 rebooking/cancellation fee.</li>
              <li>❌ If the appointment is canceled less than 24 hours before the appointment, or we are unable to gain access to your home → you will be charged 100% of your appointment cost.</li>
              <li>💧 If there is no running water or electricity on-site when we arrive → you will be charged 100% of the appointment cost and the cleaners will not be able to complete the cleaning.</li>
            </ul>
            
            <h2 style="color: #2563eb;">🩺 Cancellation on Our End</h2>
            <p>We will always try to give a 48-hour notice.</p>
            <p>If we need to reschedule your appointment, we will always try our best to make sure it's the soonest available appointment for you.</p>
            <p>Cleaners are also subject to illness, emergencies, etc. While we try our best to avoid short-notice cancellations, at times it can happen.</p>
            <p>We will never send a cleaner that has been exposed to a contagious illness to your home.</p>
            <p>With Covid, RSV, and flu season hitting us hard at this time of year, we are doing our best to protect everyone from getting sick.</p>
            <p>We kindly ask for your patience and understanding if your appointment needs to be moved to keep you and your family safe and healthy. 💛</p>
            
            <h2 style="color: #2563eb;">💳 Payment Information</h2>
            <ul>
              <li>We collect your credit card information the day you book with us.</li>
              <li>The funds will not be withdrawn from your account until after your appointment has been completed.</li>
              <li>However, there will be a hold put on the cost of your appointment 24 hours before your booking to ensure funds are available.</li>
            </ul>
            
            <h2 style="color: #2563eb;">🌟 Satisfaction Policy</h2>
            <p>If you are not happy with the service that has been provided to you, we have a 24-hour period to notify us.</p>
            <p>If there was anything missed or not completed to your satisfaction, the cleaner(s) will return to handle any issues you may have at no additional charge, provided there has been a post-clean walkthrough completed.</p>
            <p><strong>There are no refunds for any services provided.</strong><br>
            Unmoved furniture over 20 lbs will not count (see below).</p>
            <p>The cleaners will not be moving furniture or appliances over 20 lbs for safety and insurance reasons.</p>
            <p>If you have larger furniture or appliances that need to be cleaned under or behind, please have them pulled out in preparation for the appointment.</p>
            
            <p>Please feel free to let us know if you have any questions at all.</p>
            <p>We look forward to servicing you and your home! 🏡✨</p>
            
            <hr style="border: none; border-top: 2px solid #2563eb; margin: 30px 0;">
            
            <div style="background: #f0f9ff; padding: 20px; border-radius: 10px; text-align: center;">
              <h2 style="color: #2563eb; margin-top: 0;">📱 CONFIRMATION MESSAGE</h2>
              <p style="font-size: 18px;"><strong>✅ Booking Confirmed!</strong></p>
              <p style="font-size: 18px;">📅 <strong>Requested Date:</strong> ${safePreferredDate}</p>
              <p>🧽 <strong>Service Type:</strong> ${safeServiceType}</p>
              <p>📍 <strong>Address:</strong> ${safeAddress}</p>
              <p>🏠 <strong>Property:</strong> ${safeBeds} bed, ${safeBaths} bath (${safeSqft} sq ft)</p>
              <p>🔄 <strong>Frequency:</strong> ${safeFrequency}</p>
              ${addOnsList !== "None" ? `<p>➕ <strong>Add-Ons:</strong> ${addOnsList}</p>` : ""}
              <p style="font-size: 20px; color: #2563eb;"><strong>💰 Total: $${safeTotalPrice}</strong></p>
            </div>
            
            <p style="margin-top: 20px;">Please be home to answer the door for the cleaner.</p>
            <p>The cleaner will do a final walkthrough, so please be home when the cleaner is finishing up.</p>
            <p><strong>If you are not home for the final walkthrough, you will not be eligible for any re-cleans or refunds — so it is really important to be there!</strong></p>
            
            <p style="font-size: 18px; margin-top: 30px;"><strong>Thank you for choosing TIDYWISE! 💙</strong></p>
            </div>
            
            <div style="text-align: center; padding: 15px; background: linear-gradient(135deg, #1e40af 0%, #2563eb 100%); color: white; font-size: 12px;">
              © ${new Date().getFullYear()} TIDYWISE Cleaning Services | South Florida
            </div>
          </div>
        `,
      }),
    });

    const customerEmailData = await customerEmailRes.json();
    console.log("Customer email response:", customerEmailData);

    return new Response(
      JSON.stringify({ success: true, ownerEmail: ownerEmailData, customerEmail: customerEmailData }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error sending booking confirmation:", error);
    const corsHeaders = getCorsHeaders(req);
    return new Response(
      JSON.stringify({ error: "An error occurred processing your request" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
