# Technical Requirement Document (TRD)
## Jyotish Vani - Technical Architecture

**Version:** 1.0  
**Date:** September 2026  
**Status:** Active Development

---

## 1. Tech Stack Overview

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js 14 (App Router) | Full-stack React framework |
| **Language** | TypeScript | Type safety, developer experience |
| **Styling** | Tailwind CSS | Utility-first CSS |
| **UI Components** | shadcn/ui | Pre-built accessible components |
| **Animations** | Framer Motion | Chat animations, page transitions |
| **Auth** | Supabase Auth | OTP, Google OAuth |
| **Database** | Supabase PostgreSQL | Primary data store |
| **Realtime** | Supabase Realtime | Live chat updates |
| **Cache** | Upstash Redis | Session state, rate limiting |
| **AI/LLM** | NVIDIA API + OpenCode | Multi-provider AI pipeline |
| **Payments** | Razorpay + Stripe | Dual payment gateway |
| **Search** | Google Places API | Location autocomplete |
| **Hosting** | Vercel | Frontend deployment |
| **File Storage** | Supabase Storage | PDF reports, images |

---

## 2. Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │  Next.js App │  │  Framer     │  │  Supabase Client SDK    │ │
│  │  (React)     │  │  Motion     │  │  (Auth + Realtime)      │ │
│  └──────┬──────┘  └──────┬──────┘  └───────────┬─────────────┘ │
│         │                │                      │               │
└─────────┼────────────────┼──────────────────────┼───────────────┘
          │                │                      │
          ▼                ▼                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                     NEXT.JS SERVER (API Routes)                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │  Auth API    │  │  Chat API   │  │  Payment API            │ │
│  │  /api/auth   │  │  /api/chat  │  │  /api/payment/*         │ │
│  └──────┬──────┘  └──────┬──────┘  └───────────┬─────────────┘ │
│         │                │                      │               │
│         ▼                ▼                      ▼               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │  Supabase   │  │  AI Pipeline│  │  Payment Webhooks       │ │
│  │  Server SDK │  │  (LLM)      │  │  (Razorpay/Stripe)      │ │
│  └──────┬──────┘  └──────┬──────┘  └───────────┬─────────────┘ │
└─────────┼────────────────┼──────────────────────┼───────────────┘
          │                │                      │
          ▼                ▼                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                      EXTERNAL SERVICES                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │  Supabase   │  │  NVIDIA API │  │  Razorpay / Stripe      │ │
│  │  Cloud      │  │  + OpenCode │  │  Gateways               │ │
│  │  (Postgres  │  │  (LLM)      │  │  (Payments)             │ │
│  │  + Auth     │  │             │  │                         │ │
│  │  + Realtime)│  │             │  │                         │ │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Project Structure

```
jyotish-vani/
├── app/                            # Next.js App Router
│   ├── (auth)/                     # Auth route group (no layout)
│   │   ├── login/
│   │   │   └── page.tsx            # Login page
│   │   ├── signup/
│   │   │   └── page.tsx            # Signup page
│   │   └── callback/
│   │       └── route.ts            # OAuth callback handler
│   │
│   ├── (main)/                     # Main layout group
│   │   ├── layout.tsx              # Main layout with navbar
│   │   ├── page.tsx                # Landing page
│   │   ├── intake/
│   │   │   └── page.tsx            # Birth detail intake form
│   │   └── consultation/
│   │       └── page.tsx            # Chat consultation room
│   │
│   ├── api/                        # API Routes
│   │   ├── auth/
│   │   │   └── callback/
│   │   │       └── route.ts        # Supabase auth callback
│   │   ├── chat/
│   │   │   └── route.ts            # Chat message handler
│   │   ├── payment/
│   │   │   ├── razorpay/
│   │   │   │   └── route.ts        # Create Razorpay order
│   │   │   └── stripe/
│   │   │       └── route.ts        # Create Stripe session
│   │   └── webhook/
│   │       ├── razorpay/
│   │       │   └── route.ts        # Razorpay webhook
│   │       └── stripe/
│   │           └── route.ts        # Stripe webhook
│   │
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Global styles
│   └── not-found.tsx               # 404 page
│
├── components/                     # React Components
│   ├── ui/                         # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   ├── drawer.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── avatar.tsx
│   │   └── ... (other shadcn components)
│   │
│   ├── landing/                    # Landing page components
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Pricing.tsx
│   │   ├── CTA.tsx
│   │   └── Footer.tsx
│   │
│   ├── intake/                     # Intake form components
│   │   ├── BirthForm.tsx
│   │   ├── TimeOfBirth.tsx
│   │   ├── PlaceOfBirth.tsx
│   │   └── FormStep.tsx
│   │
│   ├── chat/                       # Consultation room components
│   │   ├── ChatRoom.tsx            # Main chat container
│   │   ├── ChatHeader.tsx          # Astrologer profile header
│   │   ├── ChatCanvas.tsx          # Message list container
│   │   ├── MessageBubble.tsx       # Individual message
│   │   ├── TypingIndicator.tsx     # Acharya typing animation
│   │   ├── ChatInput.tsx           # Input bar with actions
│   │   ├── QuickPrompts.tsx        # Suggested question chips
│   │   ├── SystemNotice.tsx        # System notification pills
│   │   └── KundliSnapshot.tsx      # Chart preview card
│   │
│   ├── paywall/                    # Paywall components
│   │   ├── PaywallDrawer.tsx       # Bottom drawer container
│   │   ├── PlanCard.tsx            # Individual plan option
│   │   ├── PaymentForm.tsx         # UPI/Card input
│   │   └── TrustBadges.tsx         # Security badges
│   │
│   └── shared/                     # Shared components
│       ├── Navbar.tsx
│       ├── MobileMenu.tsx
│       ├── LoadingSpinner.tsx
│       └── ErrorBoundary.tsx
│
├── lib/                            # Utility libraries
│   ├── supabase/
│   │   ├── client.ts               # Browser Supabase client
│   │   ├── server.ts               # Server Supabase client
│   │   └── middleware.ts           # Auth middleware
│   │
│   ├── ai/
│   │   ├── providers.ts            # Multi-provider LLM abstraction
│   │   ├── persona.ts              # Acharya Dev system prompt
│   │   ├── pacer.ts                # Humanization engine
│   │   └── prompts/
│   │       ├── system.ts           # System persona prompt
│   │       ├── free-tier.ts        # Free tier response rules
│   │       └── paid-tier.ts        # Paid tier response rules
│   │
│   ├── payments/
│   │   ├── razorpay.ts             # Razorpay helper functions
│   │   ├── stripe.ts               # Stripe helper functions
│   │   └── webhooks.ts             # Webhook verification
│   │
│   ├── utils.ts                    # General utilities
│   ├── constants.ts                # App constants
│   └── validations.ts              # Zod schemas
│
├── hooks/                          # React hooks
│   ├── use-chat.ts                 # Chat state management
│   ├── use-payment.ts              # Payment flow logic
│   ├── use-auth.ts                 # Authentication state
│   ├── use-realtime.ts             # Supabase realtime subscription
│   └── use-intake.ts               # Form state management
│
├── types/                          # TypeScript types
│   ├── index.ts                    # General types
│   ├── chat.ts                     # Chat-related types
│   ├── user.ts                     # User-related types
│   ├── payment.ts                  # Payment-related types
│   └── astro.ts                    # Astrology-related types
│
├── supabase/
│   ├── migrations/                 # Database migrations
│   │   └── 001_initial_schema.sql
│   └── seed.sql                    # Seed data
│
├── public/                         # Static assets
│   ├── images/
│   │   ├── logo.svg
│   │   ├── acharya-avatar.png
│   │   └── ...
│   └── fonts/
│
├── docs/                           # Project documentation
│   ├── 01-PRD.md
│   ├── 02-TRD.md
│   ├── 03-UI-UX.md
│   ├── 04-BACKEND-SCHEMA.md
│   ├── 05-BLUEPRINT.md
│   ├── 06-API.md
│   └── 07-SETUP.md
│
├── .env.local                      # Environment variables
├── .env.example                    # Environment template
├── next.config.ts                  # Next.js config
├── tailwind.config.ts              # Tailwind config
├── tsconfig.json                   # TypeScript config
├── package.json                    # Dependencies
└── README.md                       # Project readme
```

---

## 4. Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# AI/LLM Providers
NVIDIA_API_KEY=your_nvidia_api_key
OPENCODE_API_KEY=your_opencode_api_key
AI_PRIMARY_PROVIDER=nvidia
AI_FALLBACK_PROVIDER=opencode

# Payment Gateways
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Google Places
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=your_google_places_key

# Redis (Upstash)
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Jyotish Vani
```

---

## 5. API Endpoints

### 5.1 Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/callback` | Supabase auth callback |
| GET | `/api/auth/session` | Get current session |

### 5.2 Chat

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/chat` | Send message, get AI response |
| GET | `/api/chat/history` | Get chat history for session |

### 5.3 Payments

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/payment/razorpay` | Create Razorpay order |
| POST | `/api/payment/stripe` | Create Stripe checkout session |
| POST | `/api/webhook/razorpay` | Razorpay webhook handler |
| POST | `/api/webhook/stripe` | Stripe webhook handler |

---

## 6. Key Implementation Details

### 6.1 Multi-Provider AI Abstraction

```typescript
// lib/ai/providers.ts
interface AIProvider {
  name: string;
  chat(messages: Message[]): Promise<string>;
}

class NVIDIAProvider implements AIProvider {
  name = 'nvidia';
  async chat(messages: Message[]): Promise<string> {
    // NVIDIA API call
  }
}

class OpenCodeProvider implements AIProvider {
  name = 'opencode';
  async chat(messages: Message[]): Promise<string> {
    // OpenCode free tier API call
  }
}

class AIOrchestrator {
  private providers: AIProvider[];
  private currentIndex = 0;

  async generateResponse(messages: Message[]): Promise<string> {
    for (let i = 0; i < this.providers.length; i++) {
      try {
        return await this.providers[this.currentIndex].chat(messages);
      } catch (error) {
        this.currentIndex = (this.currentIndex + 1) % this.providers.length;
      }
    }
    throw new Error('All AI providers failed');
  }
}
```

### 6.2 Humanization Pacing Engine

```typescript
// lib/ai/pacer.ts
interface PacingConfig {
  initialDelay: [1500, 2500];  // ms range
  calculatingDuration: 2000;
  typingDuration: [3000, 5000];
  chunkInterval: 1500;
}

class HumanizationPacer {
  async paceResponse(response: string): Promise<ChunkedResponse> {
    // 1. Initial delay
    await this.delay(randomBetween(config.initialDelay));
    
    // 2. Emit "calculating_chart" status
    this.emitStatus('calculating_chart');
    await this.delay(config.calculatingDuration);
    
    // 3. Emit "typing" status
    this.emitStatus('typing');
    await this.delay(randomBetween(config.typingDuration));
    
    // 4. Split into chunks
    const chunks = this.splitIntoChunks(response);
    
    // 5. Send chunks with intervals
    for (const chunk of chunks) {
      this.emitMessage(chunk);
      await this.delay(config.chunkInterval);
    }
  }
}
```

### 6.3 Paywall Gatekeeper

```typescript
// lib/ai/paywall.ts
async function handleUserMessage(sessionId: string, message: string) {
  const session = await getSession(sessionId);
  session.free_messages_used++;

  if (session.free_messages_used >= 2 && !session.is_paid) {
    // Generate cliffhanger response
    const response = await generateCliffhangerResponse(session);
    
    // Emit paywall trigger
    emitToUser(session.user_id, 'trigger_paywall_modal', {
      teaser: response,
      plans: getAvailablePlans()
    });
    
    return;
  }

  // Normal response flow
  const response = await generateResponse(session, message);
  emitToUser(session.user_id, 'message_chunk', response);
}
```

---

## 7. Security Considerations

| Area | Implementation |
|------|----------------|
| Authentication | Supabase Auth with JWT |
| Authorization | Row Level Security (RLS) on all tables |
| API Routes | Server-side validation, rate limiting |
| Payments | Webhook signature verification |
| Data Encryption | TLS in transit, Supabase encryption at rest |
| Input Sanitization | Zod schemas for all inputs |
| Rate Limiting | Redis-based rate limiting per user |

---

## 8. Performance Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| First Contentful Paint | <1.5s | SSR + Edge caching |
| Largest Contentful Paint | <2.5s | Image optimization, lazy loading |
| Time to Interactive | <3s | Code splitting, dynamic imports |
| Chat Message Latency | <100ms | WebSocket, optimistic updates |
| AI Response Latency | 5-8s | Humanized pacing (intentional) |

---

## 9. Deployment Strategy

### Development
- Local Next.js dev server
- Supabase local docker (optional)
- Test payment keys

### Staging
- Vercel preview deployments
- Supabase staging project
- Payment gateway sandbox

### Production
- Vercel production deployment
- Supabase production project
- Live payment keys
- Custom domain + SSL

---

## 10. Monitoring & Logging

| Tool | Purpose |
|------|---------|
| Vercel Analytics | Performance metrics |
| Supabase Dashboard | Database, auth, realtime |
| Sentry | Error tracking |
| Custom Logs | Chat sessions, payment events |
