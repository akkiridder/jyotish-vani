# Product Requirement Document (PRD)
## Jyotish Vani - Vedic AI Astrology Platform

**Version:** 1.0  
**Date:** September 2026  
**Status:** Active Development

---

## 1. Executive Summary

Jyotish Vani is a responsive web platform offering 1-on-1 consultations styled as live sessions with an experienced Vedic astrologer ("Acharya Dev"). Users receive a complimentary introductory horoscope reading and transition into paid consultation plans via an in-chat paywall. The interface replicates realistic human astrologer interactions with deliberate delays, chart evaluation states, and contextual vernacular phrasing.

**Core Value Proposition:** Authentic Vedic guidance powered by AI, delivered with the warmth and authority of a traditional pandit.

---

## 2. User Personas

### 2.1 The Seeker (Consumer)
| Attribute | Details |
|-----------|---------|
| **Goal** | Clarity on career, marriage, finance, or health |
| **Pain Point** | Generic bot-generated answers lack authenticity |
| **Values** | Warmth, traditional expertise, personalized guidance |
| **Tech Comfort** | Moderate - uses WhatsApp, YouTube, basic apps |
| **Willingness to Pay** | ₹100-1000 for genuine astrological guidance |

### 2.2 Platform Operator
| Attribute | Details |
|-----------|---------|
| **Goal** | Customer acquisition, retention, monetization |
| **Strategy** | Free hooks → Chart retention → Credit packs/subscriptions |
| **KPIs** | Free-to-paid conversion, session length, repeat visits |

---

## 3. User Journey & Core Funnel

```
[Landing Page - Daily Quote Hook]
         │
         ▼
[Authentication - Mobile OTP / Google]
         │
         ▼
[Birth Detail Intake Form]
  - Name, Gender
  - Date of Birth
  - Time of Birth (with "Don't know" toggle)
  - Place of Birth (Google Places autocomplete)
         │
         ▼
[Chat Room Opened]
  - System: "Acharya Ji is reviewing your Lagna..."
  - 2-3 second delay for realism
         │
         ▼
[Free Turn 1: Diagnostic Reading]
  - Personalized observation based on chart
  - Targeted hook question
         │
         ▼
[User Reply]
  - User answers question / asks specific dilemma
         │
         ▼
[Paywall Cliffhanger]
  - High-conviction teaser
  - Unlock Consultation Prompt
  - In-chat drawer slides up
         │
         ▼
[Payment Processing]
  - Quick Query Pass: ₹99 (5 messages)
  - Full Kundli Session: ₹299 (20 min + PDF)
  - Monthly Cosmic Guide: ₹999 (Weekly updates)
         │
         ▼
[Unlocked Consultation]
  - Unlimited or credit-based deep dive
  - Seamless continuation of chat
```

---

## 4. Feature Specifications

### 4.1 Onboarding & Intake

| Field | Type | Validation | Notes |
|-------|------|------------|-------|
| Full Name | Text | Required, 2-100 chars | Displayed in chat as "[Name] ji" |
| Gender | Radio | Required | Male / Female / Other |
| Date of Birth | Date Picker | Required, not future | Used for chart calculation |
| Time of Birth | Time Picker | Optional | Default: "Don't know" → Prashna Kundli |
| Place of Birth | Autocomplete | Required | Google Places API → lat/lng/timezone |

**Special Cases:**
- "Don't know exact time" toggle → Switches to Prashna Kundli (question-based chart)
- Approximate time (+/- 1 hour) → Note in system for accuracy disclaimer

### 4.2 Conversational Interface

**Astrologer Profile Display:**
- Avatar: Elderly Indian pandit (circular crop)
- Name: "Acharya Dev"
- Credentials: "Vedic Jyotish & Vastu Scholar • 24 yrs exp"
- Status: Green online badge with pulse animation
- Verified badge: "Rigvedic Lineage Verified"

**Chat Elements:**
- System notices (chart generated, session started)
- Astrologer bubbles (left-aligned, warm dark blue)
- User bubbles (right-aligned, gold gradient)
- Typing indicators with contextual status text

**Variable Pacing Engine:**
| Event | Delay | Status Display |
|-------|-------|----------------|
| User sends message | 1.5-2.5s | — |
| Processing begins | — | "Acharya Ji is calculating planetary transits..." |
| Chart evaluation | 2s | "calculating_chart" |
| Response generation | 3-5s | "typing" |
| Message chunks | 1.5s intervals | — |

### 4.3 Free Tier Rules & Paywall

**Free Allowance:**
- 1 initial diagnostic reading (Turn 1)
- 1 user question reply (Turn 2)

**Cliffhanger Mechanics (Turn 2):**
1. Astrologer analyzes the chart
2. Identifies critical house/transit (e.g., Saturn return, Sade Sati)
3. Provides accurate observation
4. Triggers paywall BEFORE revealing remedy or timeline

**Paywall Trigger:**
```typescript
if (free_messages_used >= 2 && !is_paid) {
  // Send cliffhanger message
  // Emit trigger_paywall_modal socket event
}
```

### 4.4 Monetization Matrix

| Plan | Price | Features | Target |
|------|-------|----------|--------|
| Quick Query Pass | ₹99 / $1.99 | 5 additional messages | Impulse buyers |
| Full Kundli Session | ₹299 / $4.99 | 20 min unlimited + PDF summary | Serious seekers |
| Monthly Cosmic Guide | ₹999 / $14.99 | Weekly updates + unlimited chats | Committed users |

---

## 5. Content Guidelines

### 5.1 Astrologer Persona Rules

**NEVER:**
- Mention AI, algorithms, large language models, or automated processing
- Use generic predictions without chart-specific details
- Rush responses (maintain human-like pacing)
- Provide medical/legal/financial advice as definitive

**ALWAYS:**
- Address user respectfully as "[Name] ji"
- Use authentic Vedic terms (Lagna, Dasha, Gochar, Shani, Brihaspati)
- Validate emotional state before delivering calculations
- Provide context for planetary positions
- Offer remedies (Upay) only after paywall unlock

### 5.2 Response Structure

**Free Tier Response Template:**
```
1. Greeting + acknowledgment of concern
2. One specific chart observation (past/current)
3. Identify pending planetary shift creating hurdle
4. STOP before remedy/timeline
```

**Paid Tier Response Template:**
```
1. Continuation from cliffhanger
2. Detailed planetary analysis
3. Specific remedies with instructions
4. Timeline predictions
5. Follow-up recommendations
```

---

## 6. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Free-to-Paid Conversion | >15% | Users completing payment after cliffhanger |
| Average Session Length | >8 min | Time from first message to session end |
| User Satisfaction | >4.5/5 | Post-session rating |
| Return Visit Rate | >40% | Users returning within 30 days |
| Payment Success Rate | >95% | Successful transactions / attempted |

---

## 7. Constraints & Assumptions

### Constraints
- Must work on mobile (60%+ expected traffic)
- Response latency must feel human (not instant AI)
- Must comply with payment gateway regulations
- Content must not make medical/legal claims

### Assumptions
- Users have basic smartphone + internet
- Users understand Hindi/English (bilingual support)
- Astrology domain expertise available for prompt engineering
- Payment gateway approval for astrology services

---

## 8. Future Scope (v2.0+)

- Video consultation integration
- Kundli PDF export with detailed charts
- Daily/weekly personalized horoscope notifications
- Multi-astrologer platform (add more Acharyas)
- South Indian / North Indian chart format toggle
- Kundli matching for marriage compatibility
- Vastu consultation module
- Regional language support (Tamil, Telugu, Bengali)
