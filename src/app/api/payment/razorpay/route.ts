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

    // Create Razorpay order
    const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!razorpayKeyId || !razorpayKeySecret) {
      return NextResponse.json(
        {
          success: false,
          error: "Payment gateway not configured",
          code: "GATEWAY_ERROR",
        },
        { status: 500 }
      );
    }

    // Create order with Razorpay API
    const authHeader = Buffer.from(
      `${razorpayKeyId}:${razorpayKeySecret}`
    ).toString("base64");

    const orderResponse = await fetch(
      "https://api.razorpay.com/v1/orders",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${authHeader}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: plan.price * 100, // Amount in paise
          currency: plan.currency,
          receipt: `session_${sessionId}`,
          notes: {
            sessionId,
            planTier,
            userId: user.id,
          },
        }),
      }
    );

    if (!orderResponse.ok) {
      const errorData = await orderResponse.json();
      throw new Error(errorData.error?.description || "Failed to create order");
    }

    const orderData = await orderResponse.json();

    // Save transaction record
    await supabase.from("transactions").insert({
      user_id: user.id,
      session_id: sessionId,
      amount: plan.price,
      currency: plan.currency,
      gateway: "razorpay",
      gateway_order_id: orderData.id,
      status: "pending",
    });

    return NextResponse.json({
      success: true,
      data: {
        orderId: orderData.id,
        amount: orderData.amount,
        currency: orderData.currency,
        key: razorpayKeyId,
        plan: {
          name: plan.name,
          price: plan.price,
          features: plan.features,
        },
      },
    });
  } catch (error) {
    console.error("Razorpay order error:", error);
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
