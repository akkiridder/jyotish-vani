import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jyotish Vani - Vedic Astrology Consultation",
  description: "Ancient Parashari & Jaimini astrological wisdom infused with deep contemplative consciousness for sovereign clarity. Get personalized Vedic astrology readings from Acharya Dev.",
  keywords: ["vedic astrology", "jyotish", "kundli", "horoscope", "astrology consultation", "acharya dev"],
  openGraph: {
    title: "Jyotish Vani - Vedic Astrology Consultation",
    description: "Ancient Parashari & Jaimini astrological wisdom infused with deep contemplative consciousness for sovereign clarity.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script src="https://checkout.razorpay.com/v1/checkout.js" async />
      </head>
      <body className="min-h-screen bg-background font-body text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
