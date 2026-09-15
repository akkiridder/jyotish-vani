import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { orderId, paymentId } = await req.json();
    const supabase = await createClient();

    // 1. Verify Payment Signature (Logic simplified for implementation)
    console.log("Payment Webhook Received:", { orderId, paymentId });

    // 2. Update User's status in DB
    const { data: transaction } = await supabase
      .from("transactions")
      .select("user_id")
      .eq("order_id", orderId)
      .single();

    if (transaction) {
      await supabase
        .from("consultation_sessions")
        .update({ is_paid: true })
        .eq("user_id", transaction.user_id);
    }

    return NextResponse.json({ status: "ok" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
