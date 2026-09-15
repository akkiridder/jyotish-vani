"use client";

import { UserPlus, Calendar, MessageCircle, CreditCard } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Create Account",
    description:
      "Sign up with your mobile number or Google account. Quick and secure authentication.",
  },
  {
    icon: Calendar,
    step: "02",
    title: "Enter Birth Details",
    description:
      "Provide your date, time, and place of birth for accurate chart calculation.",
  },
  {
    icon: MessageCircle,
    step: "03",
    title: "Consult Acharya Dev",
    description:
      "Get your personalized reading and ask questions about career, marriage, or life.",
  },
  {
    icon: CreditCard,
    step: "04",
    title: "Unlock Full Reading",
    description:
      "Choose a plan to access complete remedies, timelines, and detailed analysis.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            How It Works
          </span>
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mt-2">
            Your Journey to Clarity
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Four simple steps to unlock the wisdom of your birth chart and
            receive personalized Vedic guidance.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-gradient-to-r from-primary/50 to-primary/10" />
              )}

              <div className="flex flex-col items-center text-center">
                {/* Step Number */}
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-full bg-surface-container border-2 border-primary/30 flex items-center justify-center">
                    <step.icon className="w-10 h-10 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full gradient-gold flex items-center justify-center">
                    <span className="text-background text-sm font-bold">
                      {step.step}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-heading text-xl text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
