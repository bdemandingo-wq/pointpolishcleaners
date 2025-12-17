import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface CleanerApplicationRequest {
  name: string;
  email: string;
  phone: string;
  hasTransportation: boolean;
  hasSupplies: boolean;
  yearsExperience: number;
  hasInsurance: boolean;
  canProvideReferences: boolean;
  workAreas: string[];
  supplyPictures: string[];
}

const workAreaLabels: Record<string, string> = {
  "broward": "Broward County",
  "palm-beach": "Palm Beach County",
  "miami-dade": "Miami Dade County",
};

const handler = async (req: Request): Promise<Response> => {
  console.log("Received cleaner application notification request");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const application: CleanerApplicationRequest = await req.json();
    console.log("Processing application from:", application.name);

    const workAreasFormatted = application.workAreas
      .map((area) => workAreaLabels[area] || area)
      .join(", ");

    const supplyPicturesHtml = application.supplyPictures.length > 0
      ? `
        <div style="margin-top: 20px;">
          <h3 style="color: #333; margin-bottom: 10px;">Supply Pictures</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 10px;">
            ${application.supplyPictures.map((url) => `
              <a href="${url}" target="_blank" style="display: inline-block;">
                <img src="${url}" alt="Supply picture" style="max-width: 150px; max-height: 150px; border-radius: 8px; object-fit: cover;" />
              </a>
            `).join("")}
          </div>
        </div>
      `
      : "";

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "TIDYWISE <support@tidywisecleaning.com>",
        to: ["support@tidywisecleaning.com"],
        subject: `New Cleaner Application from ${application.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="text-align: center; padding: 25px; background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);">
              <img src="https://tidywisecleaning.com/logo-email.png" alt="TIDYWISE" style="height: 60px; width: auto;" />
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">New Cleaner Application</p>
            </div>
            
            <div style="padding: 20px; background: #f8fafc;">
              <h2 style="color: #1e40af; margin-bottom: 20px;">Application Details</h2>
              
              <div style="background: white; border-radius: 8px; padding: 20px; margin-bottom: 20px; border: 1px solid #e2e8f0;">
                <h3 style="color: #333; margin-top: 0;">Contact Information</h3>
                <p style="margin: 5px 0;"><strong>Name:</strong> ${application.name}</p>
                <p style="margin: 5px 0;"><strong>Email:</strong> ${application.email}</p>
                <p style="margin: 5px 0;"><strong>Phone:</strong> ${application.phone}</p>
              </div>
              
              <div style="background: white; border-radius: 8px; padding: 20px; margin-bottom: 20px; border: 1px solid #e2e8f0;">
                <h3 style="color: #333; margin-top: 0;">Experience & Qualifications</h3>
                <p style="margin: 5px 0;"><strong>Years of Experience:</strong> ${application.yearsExperience}</p>
                <p style="margin: 5px 0;"><strong>Has Transportation:</strong> ${application.hasTransportation ? "✅ Yes" : "❌ No"}</p>
                <p style="margin: 5px 0;"><strong>Has Own Supplies:</strong> ${application.hasSupplies ? "✅ Yes" : "❌ No"}</p>
                <p style="margin: 5px 0;"><strong>Has Insurance:</strong> ${application.hasInsurance ? "✅ Yes" : "❌ No"}</p>
                <p style="margin: 5px 0;"><strong>Can Provide References:</strong> ${application.canProvideReferences ? "✅ Yes" : "❌ No"}</p>
              </div>
              
              <div style="background: white; border-radius: 8px; padding: 20px; margin-bottom: 20px; border: 1px solid #e2e8f0;">
                <h3 style="color: #333; margin-top: 0;">Service Areas</h3>
                <p style="margin: 5px 0;">${workAreasFormatted}</p>
              </div>
              
              ${supplyPicturesHtml}
            </div>
            
            <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);">
              <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 14px;">TIDYWISE - Professional Cleaning Services</p>
            </div>
          </div>
        `,
      }),
    });

    const data = await emailResponse.json();
    console.log("Email sent successfully:", data);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-cleaner-application-notification function:", error);
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
