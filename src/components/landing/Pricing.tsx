"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Quick Query",
    price: "₹99",
    period: "one-time",
    description: "Perfect for quick questions and guidance",
    features: [
      "5 messages with Acharya Dev",
      "Basic chart analysis",
      "Specific remedy guidance",
      "Chat via WhatsApp",
    ],
    cta: "Start Quick Query",
    popular: false,
    href: "/intake?plan=quick_pass",
  },
  {
    name: "Full Kundli Session",
    price: "₹299",
    period: "one-time",
    description: "Complete consultation with detailed analysis",
    features: [
      "20 minutes unlimited chat",
      "Detailed birth chart analysis",
      "PDF chart summary",
      "Specific remedies & mantras",
      "Auspicious timing guidance",
      "Priority support",
    ],
    cta: "Get Full Session",
    popular: true,
    href: "/intake?plan=full_consult",
  },
  {
    name: "Monthly Cosmic Guide",
    price: "₹999",
    period: "/month",
    description: "Ongoing guidance for continuous growth",
    features: [
      "Unlimited chats with Acharya Dev",
      "Weekly transit updates",
      "Monthly horoscope report",
      "Priority response",
      "Exclusive mantras & remedies",
      "Video consultation access",
    ],
    cta: "Subscribe Now",
    popular: false,
    href: "/intake?plan=subscription",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Pricing
          </span>
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mt-2">
            Choose Your Path
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Invest in your cosmic guidance. Every plan includes a free initial
            reading to experience the power of Vedic astrology.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative bg-surface-container border-border/30 transition-all ${
                plan.popular
                  ? "border-primary/50 glow-gold scale-105"
                  : "hover:border-primary/20"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="gradient-gold text-background px-4 py-1">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardContent className="p-6 pt-8">
                {/* Plan Name */}
                <h3 className="font-heading text-xl text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-primary">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link href={plan.href} className="block">
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "gradient-gold text-background"
                        : "bg-surface-container-high text-foreground hover:bg-surface-container-highest"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Note */}
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            🔒 Secure payments via Razorpay & Stripe • 100% Confidential •
            Money-back guarantee
          </p>
        </div>
      </div>
    </section>
  );
}
