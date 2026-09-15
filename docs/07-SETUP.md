# Environment Setup Guide
## Jyotish Vani - Development Setup

**Version:** 1.0  
**Date:** September 2026

---

## 1. Prerequisites

### 1.1 Required Software

| Software | Version | Download |
|----------|---------|----------|
| Node.js | 18.17+ | [nodejs.org](https://nodejs.org) |
| npm | 9+ | Included with Node.js |
| Git | Latest | [git-scm.com](https://git-scm.com) |
| VS Code | Latest | [code.visualstudio.com](https://code.visualstudio.com) |

### 1.2 Verify Installation

```bash
# Check Node.js version
node --version
# Expected: v18.17.0 or higher

# Check npm version
npm --version
# Expected: 9.0.0 or higher

# Check Git version
git --version
# Expected: git version 2.x.x
```

---

## 2. VS Code Setup

### 2.1 Recommended Extensions

Install these extensions for the best development experience:

```
1. Tailwind CSS IntelliSense (bradlc.vscode-tailwindcss)
2. Prettier - Code formatter (esbenp.prettier-vscode)
3. ESLint (dbaeumer.vscode-eslint)
4. TypeScript Vue Plugin (Volar) (vue.volar)
5. Supabase (supabase.supabase-vscode)
6. Auto Rename Tag (formulahendry.auto-rename-tag)
7. Path Intellisense (christian-kohler.path-intellisense)
```

### 2.2 VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.emmetCompletions": true,
  "typescript.preferences.importModuleSpecifier": "non-relative"
}
```

---

## 3. Project Setup

### 3.1 Clone Repository

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd jyotish-vani
```

### 3.2 Install Dependencies

```bash
# Install npm packages
npm install

# Verify installation
npm run dev
```

### 3.3 Environment Variables

```bash
# Copy environment template
cp .env.example .env.local
```

Edit `.env.local` with your API keys (see Section 4).

---

## 4. API Keys Setup

### 4.1 Supabase (Required)

**Create Account:**
1. Go to [supabase.com](https://supabase.com)
2. Sign up with GitHub or email
3. Create a new project

**Get Keys:**
1. Go to Project Settings > API
2. Copy these values:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` → `SUPABASE_SERVICE_ROLE_KEY`

**Enable Auth Providers:**
1. Go to Authentication > Providers
2. Enable Email/Phone (for OTP)
3. Enable Google (for OAuth)
4. Add redirect URLs:
   - `http://localhost:3000/auth/callback`
   - `https://your-domain.com/auth/callback`

---

### 4.2 NVIDIA API (Required for AI)

**Create Account:**
1. Go to [build.nvidia.com](https://build.nvidia.com)
2. Sign up for free
3. Go to API Keys section

**Get Key:**
1. Generate new API key
2. Copy to `NVIDIA_API_KEY`

**Free Tier Limits:**
- 1000 API calls/day
- Rate limit: 10 requests/minute

---

### 4.3 OpenCode (Fallback AI)

**Create Account:**
1. Go to [opencode.ai](https://opencode.ai)
2. Sign up for free
3. Go to API settings

**Get Key:**
1. Generate API key
2. Copy to `OPENCODE_API_KEY`

---

### 4.4 Razorpay (India Payments)

**Create Account:**
1. Go to [dashboard.razorpay.com](https://dashboard.razorpay.com)
2. Sign up and complete KYC

**Get Test Keys:**
1. Go to Settings > API Keys
2. Click "Generate Test Key"
3. Copy:
   - `Key ID` → `RAZORPAY_KEY_ID`
   - `Key Secret` → `RAZORPAY_KEY_SECRET`

**Setup Webhook:**
1. Go to Settings > Webhooks
2. Add webhook URL: `https://your-domain.com/api/webhook/razorpay`
3. Select events: `payment.captured`, `payment.failed`
4. Copy webhook secret → Not needed (signature verification uses key secret)

---

### 4.5 Stripe (International Payments)

**Create Account:**
1. Go to [dashboard.stripe.com](https://dashboard.stripe.com)
2. Sign up and activate account

**Get Test Keys:**
1. Go to Developers > API Keys
2. Copy:
   - `Secret key` → `STRIPE_SECRET_KEY`
   - `Publishable key` → `STRIPE_PUBLISHABLE_KEY`

**Setup Webhook:**
1. Go to Developers > Webhooks
2. Click "Add endpoint"
3. URL: `https://your-domain.com/api/webhook/stripe`
4. Select events: `checkout.session.completed`, `checkout.session.expired`
5. Copy `Webhook signing secret` → `STRIPE_WEBHOOK_SECRET`

---

### 4.6 Google Places API (Location Autocomplete)

**Create Project:**
1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create new project or select existing

**Enable API:**
1. Go to APIs & Services > Library
2. Search for "Places API"
3. Click Enable

**Get Key:**
1. Go to APIs & Services > Credentials
2. Click "Create Credentials" > API Key
3. Copy to `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY`
4. Restrict key to Places API only

---

### 4.7 Upstash Redis (Caching)

**Create Account:**
1. Go to [upstash.com](https://upstash.com)
2. Sign up with GitHub

**Create Database:**
1. Click "Create Database"
2. Select region closest to your users
3. Copy:
   - `REST URL` → `UPSTASH_REDIS_REST_URL`
   - `REST Token` → `UPSTASH_REDIS_REST_TOKEN`

---

## 5. Database Setup

### 5.1 Supabase Migration

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref <your-project-ref>

# Push database migrations
supabase db push
```

### 5.2 Seed Data (Optional)

```bash
# Run seed script
supabase db seed
```

---

## 6. Development Server

### 6.1 Start Development

```bash
# Start Next.js dev server
npm run dev

# Server runs at http://localhost:3000
```

### 6.2 Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server

# Linting & Type Checking
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript compiler

# Testing
npm run test         # Run unit tests
npm run test:e2e     # Run E2E tests
```

---

## 7. Testing Setup

### 7.1 Test Environment Variables

Create `.env.test`:

```env
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=test-anon-key
SUPABASE_SERVICE_ROLE_KEY=test-service-key
```

### 7.2 Run Tests

```bash
# Unit tests
npm run test

# Watch mode
npm run test:watch

# E2E tests
npm run test:e2e
```

---

## 8. Common Issues & Solutions

### 8.1 Port Already in Use

```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process
taskkill /PID <process-id> /F
```

### 8.2 Node Version Error

```bash
# Use nvm to switch Node versions
nvm install 18.17
nvm use 18.17
```

### 8.3 Supabase Connection Error

```bash
# Verify environment variables
cat .env.local

# Check Supabase project status
supabase status
```

### 8.4 TypeScript Errors

```bash
# Clear TypeScript cache
rm -rf node_modules/.cache
npm run typecheck
```

### 8.5 ESLint Errors

```bash
# Auto-fix linting issues
npm run lint -- --fix
```

---

## 9. Production Deployment

### 9.1 Vercel Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### 9.2 Environment Variables on Vercel

1. Go to Vercel dashboard
2. Select your project
3. Go to Settings > Environment Variables
4. Add all variables from `.env.local`

### 9.3 Custom Domain

1. Go to Vercel dashboard > Settings > Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Enable SSL (automatic)

---

## 10. Team Onboarding Checklist

- [ ] Clone repository
- [ ] Install Node.js 18+
- [ ] Install VS Code + extensions
- [ ] Run `npm install`
- [ ] Copy `.env.example` to `.env.local`
- [ ] Get Supabase project URL + keys
- [ ] Get NVIDIA API key
- [ ] Get Razorpay test keys
- [ ] Get Stripe test keys
- [ ] Get Google Places API key
- [ ] Get Upstash Redis credentials
- [ ] Fill in all environment variables
- [ ] Run `npm run dev` successfully
- [ ] Access app at `http://localhost:3000`
- [ ] Read Project Blueprint (`docs/05-BLUEPRINT.md`)
- [ ] Complete first task from task board
