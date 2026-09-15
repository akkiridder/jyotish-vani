"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Sharma",
    location: "Mumbai",
    rating: 5,
    text: "Acharya Dev's reading was incredibly accurate. He predicted my promotion within 2 months, and it happened exactly as he said. The remedies he suggested really worked!",
    avatar: "RS",
  },
  {
    name: "Priya Patel",
    location: "Delhi",
    rating: 5,
    text: "I was confused about my marriage prospects. The Kundli matching analysis was detailed and helped me understand compatibility better. Highly recommended!",
    avatar: "PP",
  },
  {
    name: "Amit Kumar",
    location: "Bangalore",
    rating: 5,
    text: "The career guidance I received was spot-on. Acharya Dev understood my professional challenges and provided practical remedies that brought real changes.",
    avatar: "AK",
  },
  {
    name: "Sneha Reddy",
    location: "Hyderabad",
    rating: 5,
    text: "I was skeptical at first, but the accuracy of the predictions amazed me. The Sade Sati analysis explained many things happening in my life.",
    avatar: "SR",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Testimonials
          </span>
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mt-2">
            Stories of Transformation
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Hear from seekers who found clarity and guidance through Jyotish
            Vani.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-surface-container border-border/30 hover:border-primary/20 transition-all"
            >
              <CardContent className="p-6">
                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-primary/30 mb-4" />

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-primary fill-primary"
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-foreground leading-relaxed mb-6">
                  &quot;{testimonial.text}&quot;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center">
                    <span className="text-background text-sm font-bold">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <div className="text-foreground font-medium">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
