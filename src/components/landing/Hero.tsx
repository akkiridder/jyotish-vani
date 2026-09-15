"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, Star, Shield, Clock } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Nebular Background */}
      <div className="absolute inset-0 nebular-bg">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col items-center text-center gap-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container border border-primary/30">
            <span className="text-primary">✦</span>
            <span className="text-sm text-muted-foreground">Ancient Wisdom, Modern Clarity</span>
            <span className="text-primary">✦</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground max-w-4xl leading-tight">
            Your Cosmic Guide to{" "}
            <span className="text-primary">Career</span>,{" "}
            <span className="text-primary">Marriage</span> &{" "}
            <span className="text-primary">Life</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            Experience authentic Vedic astrology consultations with Acharya Dev.
            Get personalized guidance based on your birth chart with ancient
            Parashari & Jaimini algorithms.
          </p>

          {/* Daily Quote Card */}
          <div className="w-full max-w-2xl p-6 rounded-2xl glass border border-primary/20 glow-gold">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full gradient-gold flex items-center justify-center">
                <span className="text-background text-lg">☉</span>
              </div>
              <span className="text-sm text-primary font-medium">Daily Cosmic Insight</span>
            </div>
            <p className="text-foreground font-heading text-lg italic">
              &quot;The stars incline, they do not compel. Your destiny is shaped by your
              choices, guided by the cosmos.&quot;
            </p>
            <p className="text-sm text-muted-foreground mt-2">— Vedic Wisdom</p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="/intake">
              <Button
                size="lg"
                className="gradient-gold text-background font-semibold px-8 py-6 rounded-xl text-lg shadow-lg hover:brightness-105 transition-all glow-gold"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Get Your Free Reading
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button
                variant="outline"
                size="lg"
                className="border-primary/30 text-foreground hover:bg-surface-container px-8 py-6 rounded-xl text-lg"
              >
                How It Works
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm">100% Confidential</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Star className="w-5 h-5 text-primary" />
              <span className="text-sm">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-sm">Instant Response</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-border/30">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">50K+</div>
              <div className="text-sm text-muted-foreground">Seekers Guided</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">24+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">98%</div>
              <div className="text-sm text-muted-foreground">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
