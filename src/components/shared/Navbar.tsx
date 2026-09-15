"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles } from "lucide-react";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-primary/20 shadow-header">
      <div className="h-20 max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 min-w-max">
          <div className="h-9 w-9 rounded-full overflow-hidden border border-primary/30 shadow-gold">
            <img
              src="/images/acharya-dev.png"
              alt="Acharya Dev"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-heading text-lg text-primary tracking-wide">
                JYOTISH VANI
              </span>
              <span className="hidden sm:inline-block text-[10px] text-primary/80 uppercase px-2 py-0.5 rounded bg-surface-container-high border border-primary/30">
                Sacred
              </span>
            </div>
            <span className="hidden md:block text-[10px] text-muted-foreground tracking-wider uppercase">
              Authentic Vedic Guidance & Kundli
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1 p-1 bg-surface-container-low/70 rounded-xl border border-border/30">
          <Link
            href="/intake"
            className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-surface-container hover:text-foreground transition-all"
          >
            Get Reading
          </Link>
          <Link
            href="/consultation"
            className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-surface-container hover:text-foreground transition-all"
          >
            Consultation
          </Link>
          <Link
            href="#pricing"
            className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-surface-container hover:text-foreground transition-all"
          >
            Pricing
          </Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Online Status */}
          <div className="hidden sm:flex items-center whitespace-nowrap gap-2 px-3 py-1.5 rounded-full bg-surface-container-low border border-border/40">
            <div className="w-2 h-2 rounded-full bg-online-green animate-pulse" />
            <span className="text-sm text-foreground">Acharya Dev</span>
            <span className="text-xs text-online-green uppercase tracking-wider font-semibold">
              (Online)
            </span>
          </div>

          {/* CTA Button */}
          <Link href="/intake">
            <Button className="gradient-gold text-background font-semibold px-4 py-2 rounded-lg text-sm shadow-md hover:brightness-105 transition-all">
              <Sparkles className="w-4 h-4 mr-2" />
              1 Free Consultation
            </Button>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="xl:hidden flex items-center justify-center w-10 h-10 rounded-full bg-surface-container hover:bg-surface-container-high text-muted-foreground hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden glass-strong border-t border-border/30">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-2">
            <Link
              href="/intake"
              className="px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-surface-container hover:text-foreground transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Reading
            </Link>
            <Link
              href="/consultation"
              className="px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-surface-container hover:text-foreground transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Consultation
            </Link>
            <Link
              href="#pricing"
              className="px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-surface-container hover:text-foreground transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
