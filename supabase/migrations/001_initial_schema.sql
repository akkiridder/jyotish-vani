-- =====================================================
-- Jyotish Vani - Clean & Complete Supabase Database Schema
-- =====================================================

-- 1. Enable UUID generation extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. PUBLIC PROFILES / USERS TABLE
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255),
    phone_number VARCHAR(20),
    full_name VARCHAR(100) DEFAULT '',
    avatar_url VARCHAR(500),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);

-- 3. USER BIRTH DETAILS TABLE (Supports Intake Form upsert)
CREATE TABLE IF NOT EXISTS public.user_birth_details (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    full_name VARCHAR(100),
    gender VARCHAR(20),
    dob DATE,
    tob VARCHAR(20),
    pob VARCHAR(255),
    latitude DECIMAL(9, 6),
    longitude DECIMAL(9, 6),
    timezone VARCHAR(50) DEFAULT 'Asia/Kolkata',
    lagna_sign VARCHAR(50),
    moon_sign VARCHAR(50),
    sun_sign VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure columns exist if table was already created earlier
ALTER TABLE public.user_birth_details 
ADD COLUMN IF NOT EXISTS full_name VARCHAR(100),
ADD COLUMN IF NOT EXISTS gender VARCHAR(20),
ADD COLUMN IF NOT EXISTS dob DATE,
ADD COLUMN IF NOT EXISTS tob VARCHAR(20),
ADD COLUMN IF NOT EXISTS pob VARCHAR(255);

CREATE INDEX IF NOT EXISTS idx_birth_details_user ON public.user_birth_details(user_id);

-- 4. CONSULTATION SESSIONS TABLE
CREATE TABLE IF NOT EXISTS public.consultation_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    birth_details_id UUID REFERENCES public.user_birth_details(id) ON DELETE SET NULL,
    astrologer_alias VARCHAR(100) DEFAULT 'Acharya Dev',
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'paused_paywall', 'completed')),
    free_messages_used INT DEFAULT 0,
    is_paid BOOLEAN DEFAULT FALSE,
    plan_tier VARCHAR(50) CHECK (plan_tier IS NULL OR plan_tier IN ('quick_pass', 'full_consult', 'subscription')),
    started_at TIMESTAMPTZ DEFAULT NOW(),
    ended_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sessions_user ON public.consultation_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_active ON public.consultation_sessions(user_id, status);

-- 5. CHAT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES public.consultation_sessions(id) ON DELETE CASCADE,
    sender_type VARCHAR(20) NOT NULL CHECK (sender_type IN ('user', 'astrologer', 'system')),
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_messages_session ON public.chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_messages_created ON public.chat_messages(session_id, created_at);

-- 6. TRANSACTIONS TABLE
CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    session_id UUID REFERENCES public.consultation_sessions(id) ON DELETE SET NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(5) DEFAULT 'INR',
    gateway VARCHAR(50) NOT NULL CHECK (gateway IN ('razorpay', 'stripe')),
    gateway_order_id VARCHAR(255),
    gateway_payment_id VARCHAR(255),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed')),
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_transactions_user ON public.transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_session ON public.transactions(session_id);
CREATE INDEX IF NOT EXISTS idx_transactions_order ON public.transactions(gateway_order_id);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_birth_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultation_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Clean existing policies if re-running
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;
DROP POLICY IF EXISTS "Users can view own birth details" ON public.user_birth_details;
DROP POLICY IF EXISTS "Users can insert own birth details" ON public.user_birth_details;
DROP POLICY IF EXISTS "Users can update own birth details" ON public.user_birth_details;
DROP POLICY IF EXISTS "Users can view own sessions" ON public.consultation_sessions;
DROP POLICY IF EXISTS "Users can create own sessions" ON public.consultation_sessions;
DROP POLICY IF EXISTS "Users can update own sessions" ON public.consultation_sessions;
DROP POLICY IF EXISTS "Users can view own session messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Users and service can insert messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Users can view own transactions" ON public.transactions;
DROP POLICY IF EXISTS "Users can create own transactions" ON public.transactions;

-- Users table policies
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Birth details policies (select, insert, update for upsert)
CREATE POLICY "Users can view own birth details" ON public.user_birth_details
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own birth details" ON public.user_birth_details
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own birth details" ON public.user_birth_details
    FOR UPDATE USING (auth.uid() = user_id);

-- Session policies
CREATE POLICY "Users can view own sessions" ON public.consultation_sessions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own sessions" ON public.consultation_sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions" ON public.consultation_sessions
    FOR UPDATE USING (auth.uid() = user_id);

-- Message policies
CREATE POLICY "Users can view own session messages" ON public.chat_messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.consultation_sessions
            WHERE public.consultation_sessions.id = public.chat_messages.session_id
            AND public.consultation_sessions.user_id = auth.uid()
        )
    );

CREATE POLICY "Users and service can insert messages" ON public.chat_messages
    FOR INSERT WITH CHECK (true);

-- Transaction policies
CREATE POLICY "Users can view own transactions" ON public.transactions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own transactions" ON public.transactions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- REALTIME ENABLEMENT
-- =====================================================
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' 
        AND schemaname = 'public' 
        AND tablename = 'chat_messages'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;
    END IF;
END $$;
