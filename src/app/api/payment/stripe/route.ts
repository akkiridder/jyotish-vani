import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { PLANS } from "@/types/payment";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized", code: "UNAUTHORIZED" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { sessionId, planTier } = body;

    if (!sessionId || !planTier) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request body",
          code: "INVALID_INPUT",
        },
        { status: 400 }
      );
    }

    // Find plan
    const plan = PLANS.find((p) => p.id === planTier);
    if (!plan) {
      return NextResponse.json(
        { success: false, error: "Invalid plan", code: "INVALID_PLAN" },
        { status: 400 }
      );
    }

    // Verify session belongs to user
    const { data: session, error: sessionError } = await supabase
      .from("consultation_sessions")
      .select("*")
      .eq("id", sessionId)
      .eq("user_id", user.id)
      .single();

    if (sessionError || !session) {
      return NextResponse.json(
        {
          success: false,
          error: "Session not found",
          code: "SESSION_NOT_FOUND",
        },
        { status: 404 }
      );
    }

    // Create Stripe checkout session
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    if (!stripeSecretKey) {
      return NextResponse.json(
        {
          success: false,
          error: "Payment gateway not configured",
          code: "GATEWAY_ERROR",
        },
        { status: 500 }
      );
    }

    // Create Stripe session
    const sessionResponse = await fetch(
      "https://api.stripe.com/v1/checkout/sessions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${stripeSecretKey}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          "payment_method_types[0]": "card",
          mode: "payment",
          "success_url": `${appUrl}/consultation?session=${sessionId}&payment=success`,
          "cancel_url": `${appUrl}/consultation?session=${sessionId}&payment=cancelled`,
          "metadata[session_id]": sessionId,
          "metadata[user_id]": user.id,
          "metadata[plan_tier]": planTier,
          "line_items[0][price_data][currency]": "usd",
          "line_items[0][price_data][product_data][name]": plan.name,
          "line_items[0][price_data][unit_amount]": String(
            Math.round(plan.price * 1.2 * 100)
          ), // Convert INR to USD approximately
          "line_items[0][quantity]": "1",
        }),
      }
    );

    if (!sessionResponse.ok) {
      const errorData = await sessionResponse.json();
      throw new Error(errorData.error?.message || "Failed to create session");
    }

    const sessionData = await sessionResponse.json();

    // Save transaction record
    await supabase.from("transactions").insert({
      user_id: user.id,
      session_id: sessionId,
      amount: plan.price,
      currency: "USD",
      gateway: "stripe",
      gateway_order_id: sessionData.id,
      status: "pending",
    });

    return NextResponse.json({
      success: true,
      data: {
        sessionId: sessionData.id,
        url: sessionData.url,
        plan: {
          name: plan.name,
          price: plan.price,
          features: plan.features,
        },
      },
    });
  } catch (error) {
    console.error("Stripe session error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        code: "INTERNAL_ERROR",
      },
      { status: 500 }
    );
  }
}
