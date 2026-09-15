# Project Blueprint - Master Handover Document
## Jyotish Vani - Complete Project Guide

**Version:** 1.0  
**Date:** September 2026  
**Status:** Active Development

> **Purpose:** This document is the single source of truth for the Jyotish Vani project. Anyone joining at any point should read this first to understand everything about the project.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Quick Start Guide](#2-quick-start-guide)
3. [Architecture Overview](#3-architecture-overview)
4. [Feature Map](#4-feature-map)
5. [Development Workflow](#5-development-workflow)
6. [Team Roles & Responsibilities](#6-team-roles--responsibilities)
7. [File Structure Guide](#7-file-structure-guide)
8. [Component Inventory](#8-component-inventory)
9. [API Endpoints](#9-api-endpoints)
10. [Database Schema](#10-database-schema)
11. [Environment Setup](#11-environment-setup)
12. [Testing Strategy](#12-testing-strategy)
13. [Deployment Process](#13-deployment-process)
14. [Common Tasks](#14-common-tasks)
15. [Troubleshooting](#15-troubleshooting)
16. [Glossary](#16-glossary)

---

## 1. Project Overview

### 1.1 What is Jyotish Vani?

Jyotish Vani is a **Vedic AI Astrology Consultation Platform** that offers 1-on-1 consultations styled as live sessions with an experienced astrologer ("Acharya Dev"). The platform uses AI to generate personalized astrological readings based on users' birth charts.

### 1.2 Key Features

| Feature | Description | Status |
|---------|-------------|--------|
| Landing Page | Hero section, daily quotes, features, pricing | 🔴 To Build |
| Authentication | Mobile OTP + Google OAuth | 🔴 To Build |
| Birth Intake Form | DOB, TOB, POB with Google Places | 🔴 To Build |
| Chat Consultation Room | Real-time chat with AI astrologer | 🔴 To Build |
| Humanization Engine | Realistic delays, typing indicators | 🔴 To Build |
| Paywall System | In-chat drawer, credit tracking | 🔴 To Build |
| Payment Integration | Razorpay (India) + Stripe (International) | 🔴 To Build |
| AI Pipeline | Multi-provider LLM with fallback | 🔴 To Build |

### 1.3 User Journey

```
Landing Page → Login → Birth Form → Chat Room → Free Tier → Paywall → Payment → Paid Chat
```

---

## 2. Quick Start Guide

### 2.1 For New Developers

```bash
# 1. Clone the repository
git clone <repository-url>
cd jyotish-vani

# 2. Install dependencies
npm install

# 3. Copy environment template
cp .env.example .env.local

# 4. Fill in environment variables (see Section 11)

# 5. Start development server
npm run dev

# 6. Open browser
http://localhost:3000
```

### 2.2 Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | 18+ | Runtime |
| npm/yarn | Latest | Package manager |
| Git | Latest | Version control |
| VS Code | Latest | IDE |
| Supabase CLI | Latest | Database management |

### 2.3 VS Code Extensions

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "supabase.supabase-vscode"
  ]
}
```

---

## 3. Architecture Overview

### 3.1 Tech Stack

```
┌─────────────────────────────────────────────────────────┐
│                      FRONTEND                            │
│  Next.js 14 + TypeScript + Tailwind CSS + shadcn/ui     │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                      BACKEND                             │
│  Next.js API Routes + Supabase (Auth, DB, Realtime)     │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                     │
│  NVIDIA API (LLM) + Razorpay/Stripe (Payments)          │
│  Google Places (Maps) + Upstash Redis (Cache)           │
└─────────────────────────────────────────────────────────┘
```

### 3.2 Data Flow

```
User Input → API Route → Session Check → AI Generation → Humanization → Response
     │                                                    │
     │              ┌─────────────────────────────────────┘
     │              ▼
     │        Paywall Check → If triggered → Cliffhanger + Modal
     │
     └──▶ Database Save → Redis Cache Update → Realtime Broadcast
```

---

## 4. Feature Map

### 4.1 Landing Page (`/`)

| Component | File | Description |
|-----------|------|-------------|
| Hero | `components/landing/Hero.tsx` | Main headline, CTA, daily quote |
| Features | `components/landing/Features.tsx` | 3-card feature grid |
| HowItWorks | `components/landing/HowItWorks.tsx` | 4-step process |
| Testimonials | `components/landing/Testimonials.tsx` | User reviews carousel |
| Pricing | `components/landing/Pricing.tsx` | Plan comparison cards |
| CTA | `components/landing/CTA.tsx` | Final call-to-action |
| Footer | `components/landing/Footer.tsx` | Links, copyright |

### 4.2 Authentication (`/login`, `/signup`)

| Component | File | Description |
|-----------|------|-------------|
| LoginForm | `components/auth/LoginForm.tsx` | Email/phone + OTP |
| GoogleButton | `components/auth/GoogleButton.tsx` | OAuth button |
| OTPInput | `components/auth/OTPInput.tsx` | 6-digit OTP field |

### 4.3 Birth Intake (`/intake`)

| Component | File | Description |
|-----------|------|-------------|
| BirthForm | `components/intake/BirthForm.tsx` | Main form container |
| NameInput | `components/intake/NameInput.tsx` | Full name field |
| GenderSelect | `components/intake/GenderSelect.tsx` | Radio buttons |
| DatePicker | `components/intake/DatePicker.tsx` | Date of birth |
| TimePicker | `components/intake/TimePicker.tsx` | Time of birth |
| PlaceInput | `components/intake/PlaceInput.tsx` | Google Places autocomplete |

### 4.4 Consultation Room (`/consultation`)

| Component | File | Description |
|-----------|------|-------------|
| ChatRoom | `components/chat/ChatRoom.tsx` | Main container |
| ChatHeader | `components/chat/ChatHeader.tsx` | Astrologer profile |
| ChatCanvas | `components/chat/ChatCanvas.tsx` | Message list |
| MessageBubble | `components/chat/MessageBubble.tsx` | Individual message |
| TypingIndicator | `components/chat/TypingIndicator.tsx` | "Acharya is typing..." |
| ChatInput | `components/chat/ChatInput.tsx` | Input bar |
| QuickPrompts | `components/chat/QuickPrompts.tsx` | Suggested questions |
| KundliSnapshot | `components/chat/KundliSnapshot.tsx` | Chart preview |

### 4.5 Paywall (Modal/Drawer)

| Component | File | Description |
|-----------|------|-------------|
| PaywallDrawer | `components/paywall/PaywallDrawer.tsx` | Bottom drawer |
| PlanCard | `components/paywall/PlanCard.tsx` | Plan option card |
| PaymentForm | `components/paywall/PaymentForm.tsx` | UPI/Card input |
| TrustBadges | `components/paywall/TrustBadges.tsx` | Security badges |

---

## 5. Development Workflow

### 5.1 Git Branching Strategy

```
main (production)
├── develop (integration)
│   ├── feature/landing-page
│   ├── feature/authentication
│   ├── feature/birth-intake
│   ├── feature/chat-room
│   ├── feature/paywall
│   └── feature/payment-integration
├── bugfix/xxx
└── hotfix/xxx
```

### 5.2 Development Process

1. **Pick a task** from the task board
2. **Create a branch** from `develop`
   ```bash
   git checkout develop
   git pull
   git checkout -b feature/your-feature-name
   ```
3. **Make changes** following coding standards
4. **Test locally** with `npm run dev`
5. **Run linting** with `npm run lint`
6. **Run type check** with `npm run typecheck`
7. **Commit** with descriptive message
   ```bash
   git commit -m "feat(chat): add typing indicator animation"
   ```
8. **Push** and create Pull Request
9. **Code review** and merge

### 5.3 Commit Message Format

```
<type>(<scope>): <description>

Types: feat, fix, docs, style, refactor, test, chore
Scopes: landing, auth, intake, chat, paywall, payment, api, db
```

**Examples:**
- `feat(chat): implement message chunking`
- `fix(payment): resolve webhook signature verification`
- `docs(readme): update setup instructions`

---

## 6. Team Roles & Responsibilities

| Role | Responsibilities | Files Owned |
|------|------------------|-------------|
| **Frontend Developer** | UI components, styling, animations | `components/`, `app/`, `hooks/` |
| **Backend Developer** | API routes, database, auth | `lib/`, `app/api/`, `supabase/` |
| **AI/ML Engineer** | LLM integration, prompts, persona | `lib/ai/`, `prompts/` |
| **UI/UX Designer** | Design system, mockups, assets | `public/images/`, design files |
| **DevOps** | Deployment, CI/CD, monitoring | `.github/`, `vercel.json` |

---

## 7. File Structure Guide

### 7.1 Key Directories

```
app/                    # Next.js pages and API routes
├── (auth)/             # Auth pages (login, signup)
├── (main)/             # Main pages (landing, intake, consultation)
└── api/                # Backend API routes

components/             # Reusable React components
├── ui/                 # shadcn/ui base components
├── landing/            # Landing page components
├── intake/             # Birth form components
├── chat/               # Chat room components
├── paywall/            # Payment drawer components
└── shared/             # Shared components (navbar, footer)

lib/                    # Utility libraries
├── supabase/           # Supabase client setup
├── ai/                 # AI/LLM integration
├── payments/           # Payment gateway helpers
└── utils.ts            # General utilities

hooks/                  # Custom React hooks
types/                  # TypeScript type definitions
supabase/               # Database migrations
docs/                   # Project documentation
```

### 7.2 File Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `ChatRoom.tsx` |
| Pages | lowercase | `page.tsx` |
| API Routes | lowercase | `route.ts` |
| Hooks | camelCase with `use` | `useChat.ts` |
| Utils | camelCase | `formatDate.ts` |
| Types | PascalCase | `User.ts` |

---

## 8. Component Inventory

### 8.1 shadcn/ui Components (Pre-installed)

```bash
# Already installed
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add drawer
npx shadcn-ui@latest add card
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add separator
npx shadcn-ui@latest add toast
```

### 8.2 Custom Components to Build

| Component | Priority | Est. Hours | Dependencies |
|-----------|----------|------------|--------------|
| ChatRoom | High | 8h | shadcn/ui, framer-motion |
| MessageBubble | High | 4h | tailwind |
| TypingIndicator | High | 3h | framer-motion |
| ChatInput | High | 4h | shadcn/ui |
| PaywallDrawer | High | 6h | shadcn/ui, framer-motion |
| BirthForm | High | 6h | shadcn/ui, zod |
| PlaceInput | Medium | 4h | Google Places API |
| KundliSnapshot | Medium | 5h | SVG |
| LandingHero | Medium | 4h | tailwind |
| PricingCards | Medium | 3h | shadcn/ui |

---

## 9. API Endpoints

### 9.1 Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/callback` | Supabase auth callback | No |
| GET | `/api/auth/session` | Get current session | Yes |

### 9.2 Chat

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/chat` | Send message, get AI response | Yes |
| GET | `/api/chat/history` | Get chat history | Yes |

### 9.3 Payments

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/payment/razorpay` | Create Razorpay order | Yes |
| POST | `/api/payment/stripe` | Create Stripe session | Yes |
| POST | `/api/webhook/razorpay` | Razorpay webhook | No (verified) |
| POST | `/api/webhook/stripe` | Stripe webhook | No (verified) |

---

## 10. Database Schema

### 10.1 Tables

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `users` | User profiles | id, email, phone, name |
| `user_birth_details` | Birth chart data | user_id, dob, tob, pob, coordinates |
| `consultation_sessions` | Chat sessions | user_id, status, free_messages_used, is_paid |
| `chat_messages` | All messages | session_id, sender_type, content, metadata |
| `transactions` | Payment records | user_id, session_id, amount, gateway, status |

### 10.2 Relationships

```
users (1) ──▶ (1) user_birth_details
users (1) ──▶ (N) consultation_sessions
users (1) ──▶ (N) transactions
consultation_sessions (1) ──▶ (N) chat_messages
consultation_sessions (1) ──▶ (N) transactions
```

---

## 11. Environment Setup

### 11.1 Required API Keys

| Service | Key | Where to Get |
|---------|-----|--------------|
| Supabase | URL + Anon Key | supabase.com |
| Supabase | Service Role Key | supabase.com (Settings > API) |
| NVIDIA | API Key | build.nvidia.com |
| OpenCode | API Key | opencode.ai |
| Razorpay | Key ID + Secret | dashboard.razorpay.com |
| Stripe | Secret Key + Webhook Secret | dashboard.stripe.com |
| Google | Places API Key | console.cloud.google.com |
| Upstash | Redis URL + Token | upstash.com |

### 11.2 Environment Variables

```env
# Copy to .env.local and fill in values

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# AI/LLM
NVIDIA_API_KEY=
OPENCODE_API_KEY=
AI_PRIMARY_PROVIDER=nvidia
AI_FALLBACK_PROVIDER=opencode

# Payments
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# Google
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=

# Redis
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Jyotish Vani
```

---

## 12. Testing Strategy

### 12.1 Testing Levels

| Level | Tool | Coverage |
|-------|------|----------|
| Unit Tests | Jest + React Testing Library | Components, hooks, utils |
| Integration Tests | Jest + MSW | API routes, database queries |
| E2E Tests | Playwright | Critical user flows |
| Manual Testing | Browser | UI/UX validation |

### 12.2 Critical Test Flows

1. **Auth Flow:** Login → OTP → Session
2. **Intake Flow:** Form → Validation → Submit
3. **Chat Flow:** Send → Receive → Display
4. **Paywall Flow:** Trigger → Display → Payment
5. **Payment Flow:** Order → Checkout → Webhook → Unlock

---

## 13. Deployment Process

### 13.1 Development

```bash
# Local development
npm run dev

# With Supabase local
supabase start
npm run dev
```

### 13.2 Staging

```bash
# Push to develop branch
git push origin develop

# Vercel auto-deploys to preview URL
```

### 13.3 Production

```bash
# Merge to main
git checkout main
git merge develop
git push origin main

# Vercel auto-deploys to production URL
```

---

## 14. Common Tasks

### 14.1 Adding a New Component

```bash
# 1. Create component file
touch components/chat/NewComponent.tsx

# 2. Add types if needed
# Edit types/chat.ts

# 3. Import and use in parent
# Edit components/chat/ChatRoom.tsx
```

### 14.2 Adding a New API Route

```bash
# 1. Create route file
touch app/api/new-endpoint/route.ts

# 2. Add handler
export async function POST(request: Request) {
  // Handle request
}

# 3. Add types if needed
# Edit types/index.ts
```

### 14.3 Adding a New Database Column

```bash
# 1. Create migration file
touch supabase/migrations/002_add_column.sql

# 2. Write SQL
ALTER TABLE users ADD COLUMN new_column VARCHAR(100);

# 3. Apply migration
supabase db push
```

### 14.4 Adding a New shadcn/ui Component

```bash
npx shadcn-ui@latest add <component-name>
```

---

## 15. Troubleshooting

### 15.1 Common Issues

| Issue | Solution |
|-------|----------|
| `npm run dev` fails | Check Node.js version (18+) |
| Supabase connection error | Verify `.env.local` variables |
| API route returns 401 | Check auth middleware |
| Payment webhook fails | Verify webhook secret |
| Chat not updating | Check Supabase Realtime |

### 15.2 Debug Commands

```bash
# Check TypeScript errors
npm run typecheck

# Check linting
npm run lint

# Check Supabase connection
npx supabase status

# Reset database
npx supabase db reset
```

---

## 16. Glossary

| Term | Definition |
|------|------------|
| **Lagna** | Ascendant sign at time of birth |
| **Kundli** | Birth chart / horoscope |
| **Dasha** | Planetary period system |
| **Gochar** | Current planetary transits |
| **Nakshatra** | Lunar mansion (27 divisions) |
| **Shani** | Saturn planet |
| **Brihaspati** | Jupiter planet |
| **Rahu/Ketu** | Lunar nodes (shadow planets) |
| **Bhava** | House in birth chart |
| **Prashna** | Question-based chart (no birth time) |
| **Sade Sati** | 7.5-year Saturn transit period |
| **Upay** | Astrological remedies |

---

## Appendix A: Document Index

| Document | Location | Purpose |
|----------|----------|---------|
| PRD | `docs/01-PRD.md` | Product requirements |
| TRD | `docs/02-TRD.md` | Technical architecture |
| UI/UX | `docs/03-UI-UX.md` | Design specifications |
| Backend | `docs/04-BACKEND-SCHEMA.md` | Database design |
| Blueprint | `docs/05-BLUEPRINT.md` | This document |
| API | `docs/06-API.md` | API documentation |
| Setup | `docs/07-SETUP.md` | Environment setup |

---

## Appendix B: ASCII Art Reference

### Kundli Chart Layout
```
┌─────────────────────────────────────┐
│  12          │  1          │  2      │
│  (Pisces)    │  (Aries)   │  (Taurus)│
│              │            │         │
├──────────────┼────────────┼─────────┤
│  11          │            │  3      │
│  (Aquarius)  │   CHART    │  (Gemini)│
│              │   CENTER   │         │
├──────────────┼────────────┼─────────┤
│  10          │  7         │  4      │
│  (Capricorn) │  (Libra)   │  (Cancer)│
│              │            │         │
└─────────────────────────────────────┘
```

### Chat Bubble Layout
```
Astrologer:                    User:
┌─────────────────┐           ┌─────────────────┐
│ Message here    │           │    Message here │
└─────────────────┘           └─────────────────┘
     ◄─ Left aligned               Right aligned ─►
```

---

**Last Updated:** September 2026  
**Maintained By:** Jyotish Vani Development Team
