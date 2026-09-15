# Backend Schema & Architecture
## Jyotish Vani - Database Design

**Version:** 1.0  
**Date:** September 2026  
**Status:** Active Development

---

## 1. Database Overview

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Primary Database | Supabase PostgreSQL | User data, sessions, messages |
| Cache | Upstash Redis | Session state, rate limiting |
| Realtime | Supabase Realtime | Live chat updates |
| Storage | Supabase Storage | PDF reports, images |

---

## 2. Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                          USERS                                   │
├─────────────────────────────────────────────────────────────────┤
│ id (UUID, PK)                                                   │
│ email (VARCHAR, UNIQUE)                                         │
│ phone_number (VARCHAR, UNIQUE)                                  │
│ full_name (VARCHAR)                                             │
│ avatar_url (VARCHAR)                                            │
│ created_at (TIMESTAMP)                                          │
│ updated_at (TIMESTAMP)                                          │
└───────────────┬─────────────────────────────────────────────────┘
                │
                │ 1:1
                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    USER_BIRTH_DETAILS                            │
├─────────────────────────────────────────────────────────────────┤
│ id (UUID, PK)                                                   │
│ user_id (UUID, FK → users.id)                                   │
│ date_of_birth (DATE)                                            │
│ time_of_birth (TIME, NULLABLE)                                  │
│ is_time_approximate (BOOLEAN)                                   │
│ place_of_birth (VARCHAR)                                        │
│ latitude (DECIMAL)                                              │
│ longitude (DECIMAL)                                              │
│ timezone (VARCHAR)                                              │
│ lagna_sign (VARCHAR, NULLABLE)                                  │
│ moon_sign (VARCHAR, NULLABLE)                                   │
│ sun_sign (VARCHAR, NULLABLE)                                    │
│ created_at (TIMESTAMP)                                          │
└───────────────┬─────────────────────────────────────────────────┘
                │
                │ 1:N
                ▼
┌─────────────────────────────────────────────────────────────────┐
│                 CONSULTATION_SESSIONS                            │
├─────────────────────────────────────────────────────────────────┤
│ id (UUID, PK)                                                   │
│ user_id (UUID, FK → users.id)                                   │
│ birth_details_id (UUID, FK → user_birth_details.id)             │
│ astrologer_alias (VARCHAR, DEFAULT 'Acharya Dev')               │
│ status (VARCHAR: 'active', 'paused_paywall', 'completed')       │
│ free_messages_used (INT, DEFAULT 0)                             │
│ is_paid (BOOLEAN, DEFAULT FALSE)                                │
│ plan_tier (VARCHAR, NULLABLE)                                   │
│ started_at (TIMESTAMP)                                          │
│ ended_at (TIMESTAMP, NULLABLE)                                  │
│ created_at (TIMESTAMP)                                          │
└───────────────┬─────────────────────────────────────────────────┘
                │
                │ 1:N
                ▼
┌─────────────────────────────────────────────────────────────────┐
│                     CHAT_MESSAGES                                │
├─────────────────────────────────────────────────────────────────┤
│ id (UUID, PK)                                                   │
│ session_id (UUID, FK → consultation_sessions.id)                │
│ sender_type (VARCHAR: 'user', 'astrologer', 'system')           │
│ content (TEXT)                                                   │
│ metadata (JSONB, DEFAULT '{}')                                  │
│   - ephemeris_snapshot: Planetary positions at time of message  │
│   - pacing_delay: Actual delay applied                          │
│   - chunk_index: For chunked responses                          │
│   - paywall_triggered: Boolean                                  │
│ created_at (TIMESTAMP)                                          │
└───────────────┬─────────────────────────────────────────────────┘
                │
                │ N:1
                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      TRANSACTIONS                                │
├─────────────────────────────────────────────────────────────────┤
│ id (UUID, PK)                                                   │
│ user_id (UUID, FK → users.id)                                   │
│ session_id (UUID, FK → consultation_sessions.id)                │
│ amount (DECIMAL)                                                │
│ currency (VARCHAR, DEFAULT 'INR')                               │
│ gateway (VARCHAR: 'razorpay', 'stripe')                         │
│ gateway_order_id (VARCHAR)                                      │
│ gateway_payment_id (VARCHAR)                                    │
│ status (VARCHAR: 'pending', 'success', 'failed')                │
│ metadata (JSONB)                                                │
│ created_at (TIMESTAMP)                                          │
│ updated_at (TIMESTAMP)                                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. SQL Schema (Supabase Migration)

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- USERS TABLE
-- =====================================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE,
    phone_number VARCHAR(20) UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    avatar_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for quick lookups
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone_number);

-- =====================================================
-- USER BIRTH DETAILS TABLE
-- =====================================================
CREATE TABLE user_birth_details (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    date_of_birth DATE NOT NULL,
    time_of_birth TIME,
    is_time_approximate BOOLEAN DEFAULT FALSE,
    place_of_birth VARCHAR(255) NOT NULL,
    latitude DECIMAL(9, 6) NOT NULL,
    longitude DECIMAL(9, 6) NOT NULL,
    timezone VARCHAR(50) NOT NULL,
    lagna_sign VARCHAR(50),
    moon_sign VARCHAR(50),
    sun_sign VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for user birth details
CREATE INDEX idx_birth_details_user ON user_birth_details(user_id);

-- =====================================================
-- CONSULTATION SESSIONS TABLE
-- =====================================================
CREATE TABLE consultation_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    birth_details_id UUID REFERENCES user_birth_details(id),
    astrologer_alias VARCHAR(100) DEFAULT 'Acharya Dev',
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'paused_paywall', 'completed')),
    free_messages_used INT DEFAULT 0,
    is_paid BOOLEAN DEFAULT FALSE,
    plan_tier VARCHAR(50) CHECK (plan_tier IN ('quick_pass', 'full_consult', 'subscription', NULL)),
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for sessions
CREATE INDEX idx_sessions_user ON consultation_sessions(user_id);
CREATE INDEX idx_sessions_status ON consultation_sessions(status);
CREATE INDEX idx_sessions_active ON consultation_sessions(user_id, status) WHERE status = 'active';

-- =====================================================
-- CHAT MESSAGES TABLE
-- =====================================================
CREATE TABLE chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES consultation_sessions(id) ON DELETE CASCADE,
    sender_type VARCHAR(10) NOT NULL CHECK (sender_type IN ('user', 'astrologer', 'system')),
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for messages
CREATE INDEX idx_messages_session ON chat_messages(session_id);
CREATE INDEX idx_messages_created ON chat_messages(session_id, created_at);

-- Enable Realtime for chat messages
ALTER PUBLICATION supabase_realtime ADD TABLE chat_messages;

-- =====================================================
-- TRANSACTIONS TABLE
-- =====================================================
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    session_id UUID REFERENCES consultation_sessions(id),
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(5) DEFAULT 'INR',
    gateway VARCHAR(50) NOT NULL CHECK (gateway IN ('razorpay', 'stripe')),
    gateway_order_id VARCHAR(255),
    gateway_payment_id VARCHAR(255),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed')),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for transactions
CREATE INDEX idx_transactions_user ON transactions(user_id);
CREATE INDEX idx_transactions_session ON transactions(session_id);
CREATE INDEX idx_transactions_gateway ON transactions(gateway_order_id);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_birth_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Birth details policies
CREATE POLICY "Users can view own birth details" ON user_birth_details
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own birth details" ON user_birth_details
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Session policies
CREATE POLICY "Users can view own sessions" ON consultation_sessions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own sessions" ON consultation_sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Message policies
CREATE POLICY "Users can view own session messages" ON chat_messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM consultation_sessions
            WHERE consultation_sessions.id = chat_messages.session_id
            AND consultation_sessions.user_id = auth.uid()
        )
    );

CREATE POLICY "Service can insert messages" ON chat_messages
    FOR INSERT WITH CHECK (true);

-- Transaction policies
CREATE POLICY "Users can view own transactions" ON transactions
    FOR SELECT USING (auth.uid() = user_id);

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON transactions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to increment free messages used
CREATE OR REPLACE FUNCTION increment_free_messages(session_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE consultation_sessions
    SET free_messages_used = free_messages_used + 1
    WHERE id = session_id;
END;
$$ LANGUAGE plpgsql;

-- Function to check if paywall should be triggered
CREATE OR REPLACE FUNCTION should_trigger_paywall(session_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
    session_record RECORD;
BEGIN
    SELECT free_messages_used, is_paid
    INTO session_record
    FROM consultation_sessions
    WHERE id = session_id;

    RETURN session_record.free_messages_used >= 2
           AND session_record.is_paid = FALSE;
END;
$$ LANGUAGE plpgsql;
```

---

## 4. Redis Schema (Upstash)

### 4.1 Session State Cache
```
Key: session:{session_id}:state
Type: Hash
Fields:
  - user_id: string
  - status: 'active' | 'paused_paywall' | 'completed'
  - free_messages_used: number
  - is_paid: boolean
  - last_activity: timestamp
TTL: 24 hours
```

### 4.2 Rate Limiting
```
Key: rate_limit:{user_id}:messages
Type: String (counter)
TTL: 1 minute
Max: 10 messages per minute
```

### 4.3 Chat Queue
```
Key: chat_queue:{session_id}
Type: List
Messages: JSON strings with pacing metadata
TTL: 1 hour
```

### 4.4 Typing Indicator
```
Key: typing:{session_id}
Type: String (timestamp)
TTL: 5 seconds
Updated on: Each typing event
```

---

## 5. API Routes Schema

### 5.1 Chat API (`/api/chat`)

**Request:**
```typescript
POST /api/chat
{
  sessionId: string;
  message: string;
}
```

**Response:**
```typescript
{
  success: boolean;
  data: {
    messageId: string;
    content: string;
    senderType: 'astrologer' | 'system';
    metadata: {
      pacingDelay: number;
      chunkIndex: number;
      isPaywallTriggered: boolean;
    };
  };
  error?: string;
}
```

### 5.2 Payment API (`/api/payment/razorpay`)

**Request:**
```typescript
POST /api/payment/razorpay
{
  sessionId: string;
  planTier: 'quick_pass' | 'full_consult' | 'subscription';
}
```

**Response:**
```typescript
{
  success: boolean;
  data: {
    orderId: string;
    amount: number;
    currency: string;
    key: string; // Razorpay key ID
  };
}
```

### 5.3 Webhook Payloads

**Razorpay Webhook:**
```typescript
POST /api/webhook/razorpay
{
  event: 'payment.captured';
  payload: {
    payment: {
      entity: {
        id: string;
        amount: number;
        status: string;
        order_id: string;
      };
    };
  };
}
```

**Stripe Webhook:**
```typescript
POST /api/webhook/stripe
{
  type: 'checkout.session.completed';
  data: {
    object: {
      id: string;
      amount_total: number;
      payment_status: string;
      metadata: {
        session_id: string;
        user_id: string;
      };
    };
  };
}
```

---

## 6. Data Flow Diagrams

### 6.1 User Sends Message Flow

```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│  Client  │────▶│  API    │────▶│  Redis  │────▶│ Postgres│
│  (Chat)  │     │ Route   │     │  Cache  │     │   DB    │
└─────────┘     └─────────┘     └─────────┘     └─────────┘
     │               │               │               │
     │ 1. Send msg   │               │               │
     │──────────────▶│               │               │
     │               │ 2. Check rate │               │
     │               │──────────────▶│               │
     │               │               │               │
     │               │ 3. Check session state        │
     │               │──────────────▶│               │
     │               │               │               │
     │               │ 4. Paywall check              │
     │               │──────────────────────────────▶│
     │               │               │               │
     │               │ 5. Generate AI response       │
     │               │──── (LLM API)                │
     │               │               │               │
     │               │ 6. Save message               │
     │               │──────────────────────────────▶│
     │               │               │               │
     │ 7. Stream response (chunked)  │               │
     │◀──────────────│               │               │
     │               │               │               │
```

### 6.2 Payment Flow

```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│  Client  │────▶│  API    │────▶│ Payment │────▶│ Webhook │
│ (Drawer) │     │ Route   │     │ Gateway │     │ Handler │
└─────────┘     └─────────┘     └─────────┘     └─────────┘
     │               │               │               │
     │ 1. Select plan│               │               │
     │──────────────▶│               │               │
     │               │ 2. Create order               │
     │               │──────────────▶│               │
     │               │               │               │
     │ 3. Payment UI │               │               │
     │◀──────────────│               │               │
     │               │               │               │
     │ 4. User pays  │               │               │
     │──────────────────────────────▶│               │
     │               │               │               │
     │               │ 5. Webhook    │               │
     │               │◀──────────────────────────────│
     │               │               │               │
     │               │ 6. Update session              │
     │               │──────────────────────────────▶│
     │               │               │               │
     │ 7. Unlock chat│               │               │
     │◀──────────────│               │               │
```

---

## 7. Backup & Recovery

### 7.1 Supabase Backups
- Automatic daily backups (7 days retention)
- Point-in-time recovery (paid plan)
- Manual backup before major changes

### 7.2 Redis Backup
- Upstash automatic backups
- Export to S3 weekly

### 7.3 Recovery Procedures
1. Database restore from Supabase dashboard
2. Redis restore from Upstash dashboard
3. Re-sync cache from database if needed

---

## 8. Scaling Considerations

| Component | Current | Scale Strategy |
|-----------|---------|----------------|
| PostgreSQL | Supabase free tier | Upgrade to Pro, read replicas |
| Redis | Upstash free tier | Upgrade plan, connection pooling |
| API Routes | Vercel serverless | Edge functions, caching |
| File Storage | Supabase storage | CDN, image optimization |

---

## 9. Migration Strategy

### Development
- Local Supabase with `supabase start`
- Migrations in `supabase/migrations/`
- Seed data for testing

### Production
- Supabase dashboard migrations
- Version-controlled SQL files
- Rollback scripts for each migration
