export interface User {
  id: string
  email?: string
  phone_number?: string
  full_name: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface UserBirthDetails {
  id: string
  user_id: string
  date_of_birth: string
  time_of_birth?: string
  is_time_approximate: boolean
  place_of_birth: string
  latitude: number
  longitude: number
  timezone: string
  lagna_sign?: string
  moon_sign?: string
  sun_sign?: string
  created_at: string
}

export interface ConsultationSession {
  id: string
  user_id: string
  birth_details_id?: string
  astrologer_alias: string
  status: 'active' | 'paused_paywall' | 'completed'
  free_messages_used: number
  is_paid: boolean
  plan_tier?: 'quick_pass' | 'full_consult' | 'subscription'
  started_at: string
  ended_at?: string
  created_at: string
}

export interface ChatMessage {
  id: string
  session_id?: string
  sender_type: 'user' | 'astrologer' | 'system' | 'ai'
  content: string
  metadata?: MessageMetadata
  created_at: string
}

export interface MessageMetadata {
  pacingDelay?: number
  chunks?: string[]
  chunkIndex?: number
  isPaywallTriggered?: boolean
  teaser?: string
  ephemerisSnapshot?: object
}

export interface Transaction {
  id: string
  user_id: string
  session_id: string
  amount: number
  currency: string
  gateway: 'razorpay' | 'stripe'
  gateway_order_id?: string
  gateway_payment_id?: string
  status: 'pending' | 'success' | 'failed'
  metadata?: object
  created_at: string
  updated_at: string
}

export interface Plan {
  id: string
  name: string
  price: number
  currency: string
  features: string[]
  messageLimit?: number
  durationMinutes?: number
}
