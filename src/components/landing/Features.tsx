"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Heart, Wallet, Activity, Shield, Clock } from "lucide-react";

const features = [
  {
    icon: Briefcase,
    title: "Career Guidance",
    description:
      "Navigate career transitions, promotions, and professional challenges with precise planetary timing.",
    color: "text-primary",
  },
  {
    icon: Heart,
    title: "Marriage Compatibility",
    description:
      "Find your perfect match with detailed Kundli matching and relationship compatibility analysis.",
    color: "text-pink-400",
  },
  {
    icon: Wallet,
    title: "Financial Prosperity",
    description:
      "Unlock wealth potential with Dasha analysis and auspicious timing for investments.",
    color: "text-green-400",
  },
  {
    icon: Activity,
    title: "Health Insights",
    description:
      "Understand health tendencies and preventive measures based on your birth chart.",
    color: "text-blue-400",
  },
  {
    icon: Shield,
    title: "Dosha Analysis",
    description:
      "Identify and remedies for Manglik Dosha, Sade Sati, and other planetary afflictions.",
    color: "text-orange-400",
  },
  {
    icon: Clock,
    title: "Muhurat Timing",
    description:
      "Find auspicious timing for important events like weddings, business launches, and travels.",
    color: "text-purple-400",
  },
];

export function Features() {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            What We Offer
          </span>
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mt-2">
            Comprehensive Vedic Guidance
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            From career decisions to relationship harmony, get personalized
            astrological insights for every aspect of your life.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-surface-container border-border/30 hover:border-primary/30 transition-all hover:glow-gold group"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="font-heading text-xl text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
