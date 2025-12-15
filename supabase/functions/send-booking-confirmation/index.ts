import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BookingRequest {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  beds: string;
  baths: string;
  specialInstructions: string;
  petInfo: string;
  serviceType: string;
  sqft: number;
  frequency: string;
  addOns: string[];
  totalPrice: string;
  preferredDate: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const booking: BookingRequest = await req.json();
    console.log("Received booking request:", booking);

    const addOnsList = booking.addOns.length > 0 
      ? booking.addOns.join(", ") 
      : "None";

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
        subject: `New Booking Request from ${booking.customerName} - ${booking.preferredDate}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="text-align: center; padding: 20px; background: #2563eb;">
              <h1 style="color: white; margin: 0; font-size: 28px;">TIDYWISE</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0; font-size: 14px;">Professional Cleaning Services</p>
            </div>
            
            <div style="padding: 20px; background: #f8fafc;">
              <h1 style="color: #1e40af;">New Booking Request!</h1>
              <h2 style="color: #2563eb;">📅 Requested Date: ${booking.preferredDate}</h2>
              
              <h2 style="color: #1e40af;">Customer Information</h2>
              <ul>
                <li><strong>Name:</strong> ${booking.customerName}</li>
                <li><strong>Email:</strong> ${booking.customerEmail}</li>
                <li><strong>Phone:</strong> ${booking.customerPhone}</li>
                <li><strong>Address:</strong> ${booking.address}</li>
              </ul>
              
              <h2 style="color: #1e40af;">Property Details</h2>
              <ul>
                <li><strong>Bedrooms:</strong> ${booking.beds}</li>
                <li><strong>Bathrooms:</strong> ${booking.baths}</li>
                <li><strong>Square Footage:</strong> ${booking.sqft.toLocaleString()} sq ft</li>
              </ul>
              
              <h2 style="color: #1e40af;">Service Details</h2>
              <ul>
                <li><strong>Service Type:</strong> ${booking.serviceType}</li>
                <li><strong>Frequency:</strong> ${booking.frequency}</li>
                <li><strong>Add-Ons:</strong> ${addOnsList}</li>
                <li><strong>Total Price:</strong> $${booking.totalPrice}</li>
              </ul>
              
              <h2 style="color: #1e40af;">Special Instructions</h2>
              <p>${booking.specialInstructions || "None provided"}</p>
              
              <h2 style="color: #1e40af;">Pet Information</h2>
              <p>${booking.petInfo || "No pets"}</p>
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
              <h1 style="color: white; margin: 0; font-size: 32px; font-weight: bold;">TIDYWISE</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 14px;">Professional Cleaning Services</p>
            </div>
            
            <div style="padding: 30px 20px;">
              <h1 style="color: #2563eb; margin-top: 0;">Hi ${booking.customerName},</h1>
            
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
              <p style="font-size: 18px;">📅 <strong>Requested Date:</strong> ${booking.preferredDate}</p>
              <p>🧽 <strong>Service Type:</strong> ${booking.serviceType}</p>
              <p>📍 <strong>Address:</strong> ${booking.address}</p>
              <p>🏠 <strong>Property:</strong> ${booking.beds} bed, ${booking.baths} bath (${booking.sqft.toLocaleString()} sq ft)</p>
              <p>🔄 <strong>Frequency:</strong> ${booking.frequency}</p>
              ${addOnsList !== "None" ? `<p>➕ <strong>Add-Ons:</strong> ${addOnsList}</p>` : ""}
              <p style="font-size: 20px; color: #2563eb;"><strong>💰 Total: $${booking.totalPrice}</strong></p>
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
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
