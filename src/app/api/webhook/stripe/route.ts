import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { session } = await req.json();
    const supabase = await createClient();

    console.log("Stripe Webhook Received:", session.id);

    // Update user payment status
    const { data: transaction } = await supabase
      .from("transactions")
      .select("user_id")
      .eq("stripe_session_id", session.id)
      .single();

    if (transaction) {
      await supabase
        .from("consultation_sessions")
        .update({ is_paid: true })
        .eq("user_id", transaction.user_id);
    }

    return NextResponse.json({ received: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
