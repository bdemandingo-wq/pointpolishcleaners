import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const OPENPHONE_API_KEY = Deno.env.get("OPENPHONE_API_KEY");
const OPENPHONE_PHONE_NUMBER_ID = "PNr7XukuaV";
const NOTIFY_PHONE_NUMBER = "+15615718725";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface SmsNotificationRequest {
  type: "booking" | "cleaner_application" | "contact";
  data: Record<string, unknown>;
}

function formatBookingSms(data: Record<string, unknown>): string {
  return `📋 NEW BOOKING
👤 ${data.customerName}
📞 ${data.customerPhone}
📧 ${data.customerEmail}
📍 ${data.address}
🧽 ${data.serviceType} (${data.frequency})
🏠 ${data.beds}bd/${data.baths}ba • ${data.sqft} sqft
📅 ${data.preferredDate}
💰 $${data.totalPrice}`;
}

function formatApplicationSms(data: Record<string, unknown>): string {
  const workAreas = (data.workAreas as string[])?.join(", ") || "N/A";
  return `🧹 NEW CLEANER APPLICATION
👤 ${data.name}
📞 ${data.phone}
📧 ${data.email}
📅 ${data.yearsExperience}yr exp
🚗 Transport: ${data.hasTransportation ? "✅" : "❌"}
🧴 Supplies: ${data.hasSupplies ? "✅" : "❌"}
🛡️ Insurance: ${data.hasInsurance ? "✅" : "❌"}
📍 Areas: ${workAreas}`;
}

function formatContactSms(data: Record<string, unknown>): string {
  return `💼 COMMERCIAL INQUIRY
👤 ${data.name}
📧 ${data.email}
💬 ${data.message}`;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!OPENPHONE_API_KEY) {
      throw new Error("OPENPHONE_API_KEY is not configured");
    }

    const { type, data }: SmsNotificationRequest = await req.json();
    console.log("Sending SMS notification for:", type);

    let message: string;
    switch (type) {
      case "booking":
        message = formatBookingSms(data);
        break;
      case "cleaner_application":
        message = formatApplicationSms(data);
        break;
      case "contact":
        message = formatContactSms(data);
        break;
      default:
        throw new Error(`Unknown notification type: ${type}`);
    }

    const response = await fetch("https://api.openphone.com/v1/messages", {
      method: "POST",
      headers: {
        "Authorization": OPENPHONE_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: message,
        from: OPENPHONE_PHONE_NUMBER_ID,
        to: [NOTIFY_PHONE_NUMBER],
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error("OpenPhone API error:", response.status, responseData);
      throw new Error(`OpenPhone API error [${response.status}]: ${JSON.stringify(responseData)}`);
    }

    console.log("SMS sent successfully:", responseData);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending SMS notification:", error);
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
