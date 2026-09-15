"use client";

import { ASTROLOGER } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MoreVertical, Shield, Lock } from "lucide-react";
import Link from "next/link";

interface ChatHeaderProps {
  freeMessagesUsed: number;
  isPaid: boolean;
  showKundli?: boolean;
  onToggleKundli?: () => void;
}

export function ChatHeader({ freeMessagesUsed, isPaid, showKundli, onToggleKundli }: ChatHeaderProps) {
  const freeRemaining = Math.max(0, 2 - freeMessagesUsed);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-primary/20 shadow-header">
      <div className="h-20 max-w-4xl mx-auto px-4 flex items-center justify-between gap-4">
        {/* Left Side */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-container hover:bg-surface-container-high text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          {/* Avatar with Online indicator */}
          <div className="relative flex-shrink-0">
            <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-primary to-secondary shadow-gold">
              <div className="w-full h-full rounded-full overflow-hidden">
                <img
                  src="/images/acharya-dev.png"
                  alt="Acharya Dev"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-online-green rounded-full shadow-[0_0_8px_#22C55E]" />
          </div>

          {/* Info */}
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="font-heading text-lg text-primary truncate">
                {ASTROLOGER.name}
              </h1>
              {ASTROLOGER.verified && (
                <Shield className="w-4 h-4 text-primary flex-shrink-0" />
              )}
            </div>
            <p className="text-xs text-muted-foreground truncate">
              {ASTROLOGER.title} • {ASTROLOGER.experience} •{" "}
              <span className="text-online-green">Online</span>
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {onToggleKundli && (
            <button
              onClick={onToggleKundli}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                showKundli
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-surface-container hover:bg-surface-container-high text-primary border-primary/20"
              }`}
              title="Toggle Kundli Chart"
            >
              <span>🪐</span>
              <span className="hidden sm:inline font-semibold">Kundli</span>
            </button>
          )}

          {/* Free Messages Badge */}
          {!isPaid && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-high shadow-md">
              <Lock className="w-3 h-3 text-primary" />
              <span className="text-xs text-primary font-medium">
                Free: {freeRemaining} left
              </span>
            </div>
          )}

          {/* Paid Badge */}
          {isPaid && (
            <Badge className="gradient-gold text-background">
              <Shield className="w-3 h-3 mr-1" />
              Premium
            </Badge>
          )}

          <button className="flex items-center justify-center w-9 h-9 rounded-full bg-surface-container text-muted-foreground hover:text-foreground hover:bg-surface-container-high transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
