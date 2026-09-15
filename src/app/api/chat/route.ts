import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { generateVedicResponse, ChatHistoryItem } from "@/lib/ai/providers";

export async function POST(req: Request) {
  try {
    const { message, sessionId } = await req.json();
    const supabase = await createClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    
    let birthDetails = null;
    let userRole = "Guest";

    if (user) {
      userRole = "Registered User";
      // Use maybeSingle() instead of single() to avoid 406 error when no row exists
      const { data } = await supabase
        .from("user_birth_details")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      birthDetails = data;
    }

    let history: ChatHistoryItem[] = [];
    if (sessionId) {
      const { data: pastMessages } = await supabase
        .from("chat_messages")
        .select("sender_type, content")
        .eq("session_id", sessionId)
        .order("created_at", { ascending: false })
        .limit(6);

      if (pastMessages && pastMessages.length > 0) {
        history = pastMessages.reverse().map((m) => ({
          role: m.sender_type === "user" ? ("user" as const) : ("assistant" as const),
          content: m.content,
        }));
      }
    }

    const systemPrompt = `
      You are "Acharya Dev", a master of Vedic Astrology (Jyotish).
      USER PROFILE:
      - Role: ${userRole}
      - Name: ${birthDetails?.full_name || "Seeker"}
      - Gender: ${birthDetails?.gender || "Unknown"}
      - DOB: ${birthDetails?.dob || "Not specified"}
      - TOB: ${birthDetails?.tob || "Not specified"}
      - POB: ${birthDetails?.pob || "Not specified"} (Lat: ${birthDetails?.latitude || "N/A"}, Lng: ${birthDetails?.longitude || "N/A"})

      YOUR PERSONA:
      - Tone: Mystic, wise, compassionate, and contemplative.
      - Style: Use Vedic terminology like "Namaste", "Karmic path", "Planetary transits (Gochar)", "Mahadasha", "Brihaspati", "Shani".
      - Grounding: If birth details are provided, ground all insights in them. If they are "Not specified", politely guide the user to share their birth date, time, and place to receive a personalized reading.
      - Constraint: Never mention you are an AI or language model. Maintain the persona of a revered Vedic scholar.
    `;

    const aiResponse = await generateVedicResponse(systemPrompt, message, history);

    return NextResponse.json({ response: aiResponse });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
