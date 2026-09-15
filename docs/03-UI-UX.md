# UI/UX Design Specification
## Jyotish Vani - Visual Design System

**Version:** 1.0  
**Date:** September 2026  
**Status:** Active Development

---

## 1. Design Philosophy

**Core Principles:**
1. **Authenticity** - Traditional Vedic aesthetics with modern UI patterns
2. **Warmth** - Golden accents, soft shadows, inviting atmosphere
3. **Trust** - Professional, secure, and authoritative feel
4. **Simplicity** - Clean layouts, easy navigation, mobile-first

---

## 2. Color Palette

### Primary Colors
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Vedic Gold** | `#D4AF37` | 212, 175, 55 | Primary accent, CTAs, highlights |
| **Deep Midnight** | `#0B0D17` | 11, 13, 23 | Background primary |
| **Surface Dark** | `#151828` | 21, 24, 40 | Cards, surfaces |
| **Surface Container** | `#1D1F2A` | 29, 31, 42 | Input backgrounds |

### Secondary Colors
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Text Primary** | `#F8FAFC` | 248, 250, 252 | Main text |
| **Text Muted** | `#94A3B8` | 148, 163, 184 | Secondary text |
| **Online Green** | `#22C55E` | 34, 197, 94 | Status indicators |
| **Error Red** | `#EF4444` | 239, 68, 68 | Errors, warnings |

### Gradient Presets
```css
/* Primary CTA Gradient */
-gradient-primary {
  background: linear-gradient(135deg, #F59E0B 0%, #D4AF37 50%, #B8860B 100%);
}

/* User Message Gradient */
-gradient-user {
  background: linear-gradient(135deg, #2D2415 0%, #1A1E36 100%);
}

/* Astrologer Message Gradient */
-gradient-astrologer {
  background: linear-gradient(135deg, #1A1E36 0%, #151828 100%);
}

/* Gold Glow Effect */
-glow-gold {
  box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
}
```

---

## 3. Typography

### Font Families
```css
/* Headlines - Mystical Serif */
font-family: 'Playfair Display', serif;

/* Body & UI - Clean Sans */
font-family: 'Inter', sans-serif;
```

### Type Scale
| Name | Size | Line Height | Weight | Usage |
|------|------|-------------|--------|-------|
| `display-lg` | 48px | 56px | 600 | Hero headlines |
| `headline-lg` | 32px | 40px | 600 | Section headlines |
| `headline-md` | 24px | 32px | 500 | Card headlines |
| `headline-sm` | 20px | 28px | 500 | Sub-headlines |
| `title-lg` | 18px | 26px | 600 | Component titles |
| `title-md` | 16px | 24px | 600 | Card titles |
| `body-lg` | 16px | 26px | 400 | Body text |
| `body-md` | 15px | 24px | 400 | Chat messages |
| `body-sm` | 13px | 20px | 400 | Small body text |
| `label-lg` | 14px | 20px | 500 | Labels |
| `label-md` | 12px | 16px | 500 | Small labels |
| `label-xs` | 10px | 14px | 600 | Micro labels |

---

## 4. Spacing System

```css
/* Spacing tokens */
-space-xs: 0.25rem;   /* 4px */
-space-sm: 0.5rem;    /* 8px */
-space-md: 1rem;      /* 16px */
-space-lg: 1.5rem;    /* 24px */
-space-xl: 2.5rem;    /* 40px */

/* Layout tokens */
-margin-mobile: 1rem;
-margin: 2rem;
-gutter: 1.5rem;
-gutter-mobile: 0.75rem;
```

---

## 5. Border Radius

```css
-rounded-sm: 0.25rem;   /* 4px */
-rounded-md: 0.5rem;    /* 8px */
-rounded-lg: 0.75rem;   /* 12px */
-rounded-xl: 1rem;      /* 16px */
-rounded-2xl: 1.5rem;   /* 24px */
-rounded-full: 9999px;  /* Pills, avatars */
```

---

## 6. Shadows

```css
/* Subtle shadow */
-shadow-sm {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

/* Medium shadow */
-shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
}

/* Large shadow */
-shadow-lg {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.5);
}

/* Gold glow shadow */
-shadow-gold {
  box-shadow: 0 0 16px rgba(212, 175, 55, 0.4);
}

/* Header shadow */
-shadow-header {
  box-shadow: 0 12px 36px -4px rgba(0, 0, 0, 0.6);
}
```

---

## 7. Component Specifications

### 7.1 Navbar

```
┌─────────────────────────────────────────────────────────────────┐
│ [Logo] JYOTISH VANI [Vedic AI]    [Nav Links]    [Profile] [CTA]│
└─────────────────────────────────────────────────────────────────┘

Height: 80px (h-20)
Background: Surface Container Lowest (80% opacity)
Backdrop: Blur XL (16px)
Border: Bottom, Primary/20
Shadow: Header shadow
Position: Fixed, top-0, z-50
```

### 7.2 Landing Hero

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│           ✦ Ancient Wisdom, Modern Clarity ✦                    │
│                                                                 │
│     Your Cosmic Guide to Career, Marriage & Life                │
│                                                                 │
│     [Daily Quote Card - Gold Border, Glow]                      │
│                                                                 │
│     [CTA Button - "Get Your Free Reading"]                      │
│                                                                 │
│     ✦ Trusted by 50,000+ Seekers ✦                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

Background: Deep Midnight + Nebular gradients
Quote Card: Glassmorphic, gold border, subtle animation
CTA: Gold gradient, glow on hover
```

### 7.3 Chat Room Layout

```
┌─────────────────────────────────────────────────────────────────┐
│ HEADER: [Back] [Avatar] Acharya Dev [Verified] [Online] [Free:1]│
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ [System Notice Pill]                                            │
│ "Birth chart generated for Rajesh Sharma"                       │
│                                                                 │
│ [Kundli Snapshot Card]                                          │
│ ┌─────────────────────────────────────────┐                     │
│ │ [SVG Chart]  │  [Planetary Positions]   │                     │
│ │              │  • Venus 1st House        │                     │
│ │              │  • Saturn 10th House      │                     │
│ │              │  • Jupiter 11th House     │                     │
│ └─────────────────────────────────────────┘                     │
│                                                                 │
│ [Astrologer Bubble]                                             │
│ ┌──────────────────────────────┐                                │
│ │ Acharya Dev • 10:32 AM       │                                │
│ │ Namaste, Rajesh ji...        │                                │
│ └──────────────────────────────┘                                │
│                                                                 │
│ [User Bubble]                                                   │
│                    ┌──────────────────────────────┐             │
│                    │ 10:33 AM • Rajesh Sharma     │             │
│                    │ Thank you, Acharya ji...     │             │
│                    └──────────────────────────────┘             │
│                                                                 │
│ [Typing Indicator]                                              │
│ ┌──────────────────────────────────────────┐                    │
│ │ 🔄 Acharya Ji is analyzing...  ● ● ●    │                    │
│ └──────────────────────────────────────────┘                    │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ INPUT: [📎] [Input Field...] [🎤] [⬆️]                         │
│ [Suggested Prompts: Finances | Gemstone | Marriage | Sade Sati] │
│ 🔒 256-bit Vedic privacy                                        │
└─────────────────────────────────────────────────────────────────┘
```

### 7.4 Message Bubbles

**Astrologer Message:**
```css
.bg-surface-container-high
.text-on-surface
.rounded-2xl rounded-bl-sm
.p-4
.shadow-lg
.max-w-[85%]
```

**User Message:**
```css
.bg-gradient-to-br from-surface-container-high via-surface-container to-surface-container-low
.text-on-surface
.rounded-2xl rounded-br-sm
.p-4
.shadow-lg shadow-primary/5
.max-w-[80%]
.ml-auto
```

### 7.5 Typing Indicator

```
┌─────────────────────────────────────────┐
│ [Spinner] Acharya Ji is analyzing...  ●●●│
└─────────────────────────────────────────┘

Animation: Bounce dots with staggered delay
Colors: Primary gold dots
Background: Surface Container Low
```

### 7.6 Paywall Drawer

```
┌─────────────────────────────────────────┐ ← Slides up from bottom
│                                         │
│  Unlock Complete Reading & Remedies     │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ Quick Session                   │   │
│  │ ₹99 • 5 messages               │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ Full Kundli Report    [Best]    │   │
│  │ ₹299 • 20 min + PDF            │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ Monthly Cosmic Guide            │   │
│  │ ₹999 • Weekly updates          │   │
│  └─────────────────────────────────┘   │
│                                         │
│  [Pay Now Button - Gold Gradient]       │
│                                         │
│  🔒 100% Confidential                  │
│  ✓ Verified Vedic Astrologer           │
│                                         │
└─────────────────────────────────────────┘

Background: Chat visible but blurred (backdrop-blur-2xl)
Drawer: Rounded top corners, slide-up animation
```

### 7.7 Birth Intake Form

```
┌─────────────────────────────────────────┐
│                                         │
│  🙏 Tell Us About Yourself              │
│                                         │
│  Full Name                              │
│  ┌─────────────────────────────────┐   │
│  │ Enter your full name            │   │
│  └─────────────────────────────────┘   │
│                                         │
│  Gender                                 │
│  (●) Male  ( ) Female  ( ) Other       │
│                                         │
│  Date of Birth                          │
│  ┌─────────────────────────────────┐   │
│  │ 📅 Select date                  │   │
│  └─────────────────────────────────┘   │
│                                         │
│  Time of Birth                          │
│  ┌─────────────────────────────────┐   │
│  │ 🕐 Select time  [AM/PM]         │   │
│  └─────────────────────────────────┘   │
│  [ ] I don't know exact time            │
│                                         │
│  Place of Birth                         │
│  ┌─────────────────────────────────┐   │
│  │ 🔍 Start typing city name...    │   │
│  └─────────────────────────────────┘   │
│  [Autocomplete dropdown]                │
│                                         │
│  [Enter Consultation Room →]            │
│                                         │
└─────────────────────────────────────────┘
```

---

## 8. Animations & Transitions

### 8.1 Page Transitions
```typescript
// Framer Motion variants
const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, ease: 'easeInOut' }
};
```

### 8.2 Chat Animations
```typescript
// Message appear animation
const messageVariants = {
  initial: { opacity: 0, scale: 0.95, y: 10 },
  animate: { opacity: 1, scale: 1, y: 0 },
  transition: { duration: 0.2, ease: 'easeOut' }
};

// Typing indicator dots
const dotVariants = {
  animate: {
    y: [0, -5, 0],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      delay: i * 0.15
    }
  }
};
```

### 8.3 Hover Effects
```css
/* Button hover */
.btn-primary:hover {
  filter: brightness(1.05);
  transform: translateY(-1px);
  box-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
}

/* Card hover */
.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}
```

### 8.4 Paywall Drawer
```typescript
// Drawer slide-up animation
const drawerVariants = {
  hidden: { y: '100%' },
  visible: { y: 0 },
  transition: { type: 'spring', damping: 25, stiffness: 200 }
};
```

---

## 9. Responsive Breakpoints

```css
/* Mobile First Approach */
sm: 640px    /* Small tablets */
md: 768px    /* Tablets */
lg: 1024px   /* Small laptops */
xl: 1280px   /* Laptops */
2xl: 1536px  /* Desktops */
```

### Mobile Adjustments
- Navbar: Hamburger menu on mobile
- Chat: Full-width bubbles, smaller padding
- Forms: Stacked layout, larger inputs
- Paywall: Full-screen drawer on mobile

---

## 10. Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Color Contrast | WCAG AA compliant (4.5:1 ratio) |
| Keyboard Navigation | All interactive elements focusable |
| Screen Reader | ARIA labels on all components |
| Focus Indicators | Visible focus rings |
| Motion | Respect prefers-reduced-motion |
| Alt Text | All images have descriptive alt |

---

## 11. Dark Mode (Default)

The entire application uses a dark theme by default, matching the Vedic/mystical aesthetic. Light mode is not planned for v1.0 but can be added in future.

**Dark Mode Tokens:**
```css
--background: 222 47% 7%;      /* Deep Midnight */
--foreground: 210 40% 98%;     /* Text Primary */
--card: 222 47% 11%;           /* Surface Dark */
--primary: 43 74% 53%;         /* Vedic Gold */
--secondary: 43 74% 66%;       /* Gold Light */
```

---

## 12. Asset Requirements

| Asset | Size | Format | Notes |
|-------|------|--------|-------|
| Logo | 200x60px | SVG | Gold on transparent |
| Acharya Avatar | 400x400px | PNG | Circular crop ready |
| Background Pattern | 1920x1080px | SVG | Subtle celestial pattern |
| Icons | 24x24px | SVG/Icon | Material Symbols Outlined |
| Favicon | 32x32px | ICO/PNG | Gold symbol on dark |
