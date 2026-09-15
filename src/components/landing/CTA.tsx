"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-20 bg-surface relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 lg:px-8 text-center">
        {/* Sacred Symbol */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-primary/50">ॐ</span>
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <span className="text-primary/50">श्री गणेशाय नमः</span>
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <span className="text-primary/50">ॐ</span>
        </div>

        {/* Heading */}
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
          Ready to Discover Your{" "}
          <span className="text-primary">Cosmic Path</span>?
        </h2>

        {/* Description */}
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Join thousands of seekers who have found clarity, purpose, and
          direction through authentic Vedic astrology guidance. Your first
          consultation is on us.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/intake">
            <Button
              size="lg"
              className="gradient-gold text-background font-semibold px-8 py-6 rounded-xl text-lg shadow-lg hover:brightness-105 transition-all glow-gold"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Get Your Free Reading
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-muted-foreground">
          <span>✓ Free initial consultation</span>
          <span>✓ No credit card required</span>
          <span>✓ 100% confidential</span>
        </div>
      </div>
    </section>
  );
}
