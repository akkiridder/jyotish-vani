"use client";

import { useState, useCallback } from "react";
import { PlanConfig } from "@/types/payment";

interface UsePaymentOptions {
  sessionId: string;
}

interface UsePaymentReturn {
  isLoading: boolean;
  error: string | null;
  createRazorpayOrder: (plan: PlanConfig) => Promise<void>;
  createStripeSession: (plan: PlanConfig) => Promise<void>;
  clearError: () => void;
}

export function usePayment({
  sessionId,
}: UsePaymentOptions): UsePaymentReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createRazorpayOrder = useCallback(
    async (plan: PlanConfig) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/payment/razorpay", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sessionId,
            planTier: plan.id,
          }),
        });

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || "Failed to create order");
        }

        // Initialize Razorpay checkout
        const options = {
          key: data.data.key,
          amount: data.data.amount,
          currency: data.data.currency,
          name: "Jyotish Vani",
          description: plan.name,
          order_id: data.data.orderId,
          handler: function (response: Record<string, unknown>) {
            // Payment successful
            console.log("Payment successful:", response);
            window.location.reload();
          },
          prefill: {
            name: "",
            email: "",
            contact: "",
          },
          theme: {
            color: "#D4AF37",
          },
        };

        // @ts-expect-error - Razorpay is loaded via script tag
        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to create order";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [sessionId]
  );

  const createStripeSession = useCallback(
    async (plan: PlanConfig) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/payment/stripe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sessionId,
            planTier: plan.id,
          }),
        });

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || "Failed to create session");
        }

        // Redirect to Stripe checkout
        window.location.href = data.data.url;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to create session";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [sessionId]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    createRazorpayOrder,
    createStripeSession,
    clearError,
  };
}
