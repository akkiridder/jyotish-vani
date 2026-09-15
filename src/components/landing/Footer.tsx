import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  services: [
    { label: "Career Guidance", href: "#" },
    { label: "Marriage Compatibility", href: "#" },
    { label: "Finance & Wealth", href: "#" },
    { label: "Health Insights", href: "#" },
    { label: "Dosha Analysis", href: "#" },
  ],
  company: [
    { label: "About Acharya Dev", href: "#" },
    { label: "Our Mission", href: "#" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact Us", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Refund Policy", href: "#" },
    { label: "Disclaimer", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-border/30">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="h-9 w-9 rounded-full overflow-hidden border border-primary/30 shadow-gold">
                <img
                  src="/images/acharya-dev.png"
                  alt="Acharya Dev"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-heading text-lg text-primary tracking-wide">
                  JYOTISH VANI
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Ancient Parashari & Jaimini astrological algorithms infused with
              deep contemplative consciousness for sovereign clarity.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="text-primary">✦</span>
              <span>Rigvedic Lineage Verified</span>
              <span className="text-primary">✦</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-foreground mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading text-foreground mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading text-foreground mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Jyotish Vani. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>🔒 256-bit Vedic privacy</span>
            <span>•</span>
            <span>Sacred Sanctuary Protected</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
