import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const payload = req.body; // Get the webhook payload from Eventbrite

    console.log("📩 Eventbrite Webhook Received:", JSON.stringify(payload, null, 2));

    // ✅ Handle Eventbrite Events (Save to Supabase if needed)
    if (payload.config?.action === "event.published") {
      console.log("🎉 New Event Published:", payload.api_url);
      // Example: Save to Supabase
      // const { data, error } = await supabase.from("events").insert([payload]);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Webhook Error:", error);
    res.status(500).json({ error: "Webhook processing failed" });
  }
}
