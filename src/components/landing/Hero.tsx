"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, Star, Shield, Clock, Send } from "lucide-react";
import { useRouter } from "next/navigation";

export function Hero() {
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const router = useRouter();

  const handleQuickChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setIsTyping(true);
    
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: chatInput,
          sessionId: "guest-session" 
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Show a snippet of the answer and guide them to the intake form for a full reading
        alert(`Acharya Dev says: ${data.response.substring(0, 150)}...\n\nTo receive a complete personalized reading, please provide your birth details.`);
        router.push("/intake");
      } else {
        alert("The stars are currently turbulent. Please try again in a moment.");
      }
    } catch (error) {
      console.error("Chat error:", error);
      alert("Connection error. Please check your internet.");
    } finally {
      setIsTyping(false);
      setChatInput("");
    }
  };

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 nebular-bg">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col items-center text-center gap-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container border border-primary/30">
            <span className="text-primary">✦</span>
            <span className="text-sm text-muted-foreground">Ancient Wisdom, Modern Clarity</span>
            <span className="text-primary">✦</span>
          </div>

          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground max-w-4xl leading-tight">
            Your Cosmic Guide to{" "}
            <span className="text-primary">Career</span>,{" "}
            <span className="text-primary">Marriage</span> &{" "}
            <span className="text-primary">Life</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            Experience authentic Vedic astrology consultations with Acharya Dev.
            Get personalized guidance based on your birth chart.
          </p>

          {/* QUICK CHAT WIDGET - FIX FOR TC-01 */}
          <div className="w-full max-w-xl p-1 rounded-2xl glass border border-primary/30 glow-gold shadow-2xl bg-background/50 backdrop-blur-sm">
            <form onSubmit={handleQuickChat} className="flex gap-2 p-2">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask a quick cosmic question... (e.g. How is my career?)" 
                className="flex-1 bg-transparent border-none outline-none px-4 text-foreground placeholder:text-muted-foreground text-base"
              />
              <Button 
                type="submit" 
                disabled={isTyping}
                className="gradient-gold text-background rounded-xl px-4 py-2"
              >
                {isTyping ? (
                  <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </form>
          </div>

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
