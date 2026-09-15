"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { CheckCircle2 } from "lucide-react";
import { PLANS, PlanConfig } from "@/types/payment";

interface PaywallDrawerProps {
  trigger: React.ReactNode;
  sessionId?: string;
  onPaymentSuccess: () => void;
}

export function PaywallDrawer({ trigger, sessionId, onPaymentSuccess }: PaywallDrawerProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async (plan: PlanConfig) => {
    setLoading(true);
    try {
      if (!sessionId) {
        throw new Error("Active consultation session not found. Please refresh the page.");
      }

      const res = await fetch("/api/payment/razorpay", {
        method: "POST",
        body: JSON.stringify({ sessionId, planTier: plan.id }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      
      if (!data.success) {
        throw new Error(data.error || "Failed to initiate payment");
      }

      // Check if Razorpay Checkout script is loaded
      // @ts-expect-error window.Razorpay is loaded via script tag in layout
      if (typeof window !== "undefined" && window.Razorpay) {
        const options = {
          key: data.data.key,
          amount: data.data.amount,
          currency: data.data.currency,
          name: "Jyotish Vani",
          description: plan.name,
          order_id: data.data.orderId,
          handler: function (response: Record<string, unknown>) {
            console.log("Payment successful:", response);
            onPaymentSuccess();
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

        // @ts-expect-error window.Razorpay is loaded via script tag in layout
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        console.warn("Razorpay script not available, applying simulation mode.");
        onPaymentSuccess();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Payment failed. Please try again.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer>
      <DrawerTrigger render={trigger as React.ReactElement} />
      <DrawerContent>
        <div className="mx-auto w-full max-w-md max-h-[85vh] overflow-y-auto">
          <DrawerHeader className="text-center">
            <DrawerTitle className="text-2xl font-bold font-heading">Continue Your Journey</DrawerTitle>
            <DrawerDescription>
              Your introductory reading is complete. Unlock deep cosmic insights with Acharya Dev.
            </DrawerDescription>
          </DrawerHeader>
          
          <div className="p-4 space-y-3">
            {PLANS.map((plan) => (
              <Card 
                key={plan.id} 
                className={`relative overflow-hidden border transition-all ${
                  plan.badge 
                    ? "border-primary shadow-gold bg-primary/5" 
                    : "border-border/60 bg-card hover:border-primary/40"
                }`}
              >
                {plan.badge && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-bl-lg uppercase tracking-wider">
                    {plan.badge}
                  </div>
                )}
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-base">{plan.name}</h3>
                    <span className="text-lg font-black text-primary">₹{plan.price}</span>
                  </div>
                  <ul className="space-y-1.5 mb-4">
                    {plan.features.map((f, i) => (
                      <li key={i} className="text-xs flex items-center gap-2 text-muted-foreground">
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-600 shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full text-sm font-semibold" 
                    onClick={() => handlePayment(plan)} 
                    disabled={loading}
                  >
                    {loading ? "Processing..." : `Unlock for ₹${plan.price}`}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <DrawerFooter className="pt-0">
            <DrawerClose render={<Button variant="outline">Maybe Later</Button>} />
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default PaywallDrawer;
