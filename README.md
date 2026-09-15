# 🛕 Jyotish Vani

**Vedic AI Astrology Consultation Platform**

> Ancient Parashari & Jaimini astrological algorithms infused with deep contemplative consciousness for sovereign clarity.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Documentation](#documentation)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Overview

Jyotish Vani is a responsive web platform offering 1-on-1 consultations styled as live sessions with an experienced Vedic astrologer ("Acharya Dev"). Users receive a complimentary introductory horoscope reading and transition into paid consultation plans via an in-chat paywall.

### Key Highlights

- **Authentic Vedic Experience** - Traditional astrology with modern UI
- **AI-Powered Consultations** - Multi-provider LLM with human-like pacing
- **Seamless Monetization** - In-chat paywall with Razorpay + Stripe
- **Mobile-First Design** - Responsive across all devices

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔐 **Authentication** | Mobile OTP + Google OAuth via Supabase |
| 📊 **Birth Chart Intake** | DOB, TOB, POB with Google Places autocomplete |
| 💬 **Live Chat Room** | Real-time consultation with typing indicators |
| 🤖 **AI Astrologer** | Multi-provider LLM (NVIDIA + OpenCode fallback) |
| ⏱️ **Humanization Engine** | Realistic delays, chunked responses |
| 💳 **Payment Gateway** | Razorpay (India) + Stripe (International) |
| 🔒 **In-Chat Paywall** | Bottom drawer with plan options |
| 📱 **Mobile Optimized** | PWA-ready, responsive design |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS + shadcn/ui |
| **Animations** | Framer Motion |
| **Auth + DB** | Supabase |
| **AI/LLM** | NVIDIA API + OpenCode |
| **Payments** | Razorpay + Stripe |
| **Cache** | Upstash Redis |
| **Hosting** | Vercel |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd jyotish-vani

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Fill in your API keys (see docs/07-SETUP.md)

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📚 Documentation

| Document | Description | Link |
|----------|-------------|------|
| **PRD** | Product Requirement Document | [01-PRD.md](docs/01-PRD.md) |
| **TRD** | Technical Requirement Document | [02-TRD.md](docs/02-TRD.md) |
| **UI/UX** | Design Specifications | [03-UI-UX.md](docs/03-UI-UX.md) |
| **Backend** | Database Schema | [04-BACKEND-SCHEMA.md](docs/04-BACKEND-SCHEMA.md) |
| **Blueprint** | **Master Handover Doc** | [05-BLUEPRINT.md](docs/05-BLUEPRINT.md) |
| **API** | API Documentation | [06-API.md](docs/06-API.md) |
| **Setup** | Environment Setup Guide | [07-SETUP.md](docs/07-SETUP.md) |

> **New to the project?** Start with [05-BLUEPRINT.md](docs/05-BLUEPRINT.md)

---

## 📁 Project Structure

```
jyotish-vani/
├── app/                    # Next.js pages & API routes
│   ├── (auth)/             # Auth pages
│   ├── (main)/             # Main pages
│   └── api/                # Backend APIs
├── components/             # React components
│   ├── ui/                 # shadcn/ui
│   ├── landing/            # Landing page
│   ├── intake/             # Birth form
│   ├── chat/               # Chat room
│   └── paywall/            # Payment drawer
├── lib/                    # Utilities
│   ├── supabase/           # Supabase client
│   ├── ai/                 # AI pipeline
│   └── payments/           # Payment helpers
├── hooks/                  # React hooks
├── types/                  # TypeScript types
├── supabase/               # Database migrations
├── docs/                   # Documentation
└── public/                 # Static assets
```

---

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript check

# Testing
npm run test         # Run unit tests
npm run test:e2e     # Run E2E tests
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

See [05-BLUEPRINT.md](docs/05-BLUEPRINT.md) for detailed workflow.

---

## 🔐 Environment Variables

See [07-SETUP.md](docs/07-SETUP.md) for complete environment setup.

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NVIDIA_API_KEY`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`

---

## 📄 License

This project is proprietary software. All rights reserved.

---

## 🙏 Acknowledgments

- Built with ❤️ for seekers of Vedic wisdom
- Powered by ancient Parashari & Jaimini traditions
- "Saturn delays, but never denies"

---

**Need help?** Read the [Blueprint](docs/05-BLUEPRINT.md) or check the [Setup Guide](docs/07-SETUP.md).
