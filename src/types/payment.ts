export interface RazorpayOrder {
  orderId: string
  amount: number
  currency: string
  key: string
  plan: {
    name: string
    price: number
    features: string[]
  }
}

export interface StripeCheckoutSession {
  sessionId: string
  url: string
  plan: {
    name: string
    price: number
    features: string[]
  }
}

export interface PaymentPayload {
  sessionId: string
  planTier: 'quick_pass' | 'full_consult' | 'subscription'
}

export interface RazorpayWebhookEvent {
  event: 'payment.captured' | 'payment.failed'
  payload: {
    payment: {
      entity: {
        id: string
        amount: number
        status: string
        order_id: string
        method: string
      }
    }
  }
}

export interface StripeWebhookEvent {
  type: 'checkout.session.completed' | 'checkout.session.expired'
  data: {
    object: {
      id: string
      amount_total: number
      payment_status: string
      metadata: {
        session_id: string
        user_id: string
        plan_tier: string
      }
    }
  }
}

export interface PlanConfig {
  id: string
  name: string
  price: number
  currency: string
  features: string[]
  messageLimit?: number
  durationMinutes?: number
  badge?: string
}

export const PLANS: PlanConfig[] = [
  {
    id: 'quick_pass',
    name: 'Quick Query Pass',
    price: 99,
    currency: 'INR',
    features: [
      '5 additional messages',
      'Chat with Acharya Dev',
      'Basic remedies guidance',
    ],
    messageLimit: 5,
  },
  {
    id: 'full_consult',
    name: 'Full Kundli Session',
    price: 299,
    currency: 'INR',
    features: [
      '20 minutes unlimited chat',
      'Detailed chart analysis',
      'PDF chart summary',
      'Specific remedies & mantras',
      'Auspicious timing guidance',
    ],
    durationMinutes: 20,
    badge: 'Best Value',
  },
  {
    id: 'subscription',
    name: 'Monthly Cosmic Guide',
    price: 999,
    currency: 'INR',
    features: [
      'Unlimited chats with Acharya Dev',
      'Weekly transit updates',
      'Monthly horoscope report',
      'Priority response',
      'Exclusive mantras & remedies',
    ],
    durationMinutes: 43200, // 30 days in minutes
  },
]
