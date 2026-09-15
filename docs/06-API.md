# API Documentation
## Jyotish Vani - API Reference

**Version:** 1.0  
**Date:** September 2026

---

## 1. Authentication

### 1.1 Supabase Auth Callback

**Endpoint:** `POST /api/auth/callback`

**Purpose:** Handle OAuth and OTP authentication callbacks

**Request:**
```typescript
{
  code: string;          // Auth code from Supabase
  state?: string;        // OAuth state parameter
}
```

**Response:**
```typescript
{
  success: boolean;
  data: {
    user: {
      id: string;
      email: string;
      phone: string;
      name: string;
    };
    session: {
      access_token: string;
      refresh_token: string;
      expires_at: number;
    };
  };
}
```

---

### 1.2 Get Current Session

**Endpoint:** `GET /api/auth/session`

**Purpose:** Get current authenticated user session

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```typescript
{
  success: boolean;
  data: {
    user: {
      id: string;
      email: string;
      phone: string;
      name: string;
      avatar_url: string;
    } | null;
  };
}
```

---

## 2. Chat API

### 2.1 Send Message

**Endpoint:** `POST /api/chat`

**Purpose:** Send a message and get AI-generated astrologer response

**Headers:**
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request:**
```typescript
{
  sessionId: string;     // Consultation session ID
  message: string;       // User's message content
}
```

**Response (Success):**
```typescript
{
  success: boolean;
  data: {
    userMessage: {
      id: string;
      content: string;
      sender_type: 'user';
      created_at: string;
    };
    astrologerResponse: {
      id: string;
      content: string;
      sender_type: 'astrologer';
      metadata: {
        pacingDelay: number;
        chunks: string[];
        isPaywallTriggered: boolean;
      };
      created_at: string;
    };
  };
}
```

**Response (Paywall Triggered):**
```typescript
{
  success: boolean;
  data: {
    userMessage: {
      id: string;
      content: string;
      sender_type: 'user';
      created_at: string;
    };
    astrologerResponse: {
      id: string;
      content: string;        // Cliffhanger message
      sender_type: 'astrologer';
      metadata: {
        isPaywallTriggered: true;
        teaser: string;
      };
      created_at: string;
    };
    paywall: {
      plans: [
        {
          id: string;
          name: string;
          price: number;
          currency: string;
          features: string[];
        }
      ];
    };
  };
}
```

**Error Response:**
```typescript
{
  success: boolean;
  error: string;
  code: 'UNAUTHORIZED' | 'SESSION_NOT_FOUND' | 'RATE_LIMITED' | 'AI_FAILED';
}
```

---

### 2.2 Get Chat History

**Endpoint:** `GET /api/chat/history`

**Purpose:** Retrieve chat history for a session

**Headers:**
```
Authorization: Bearer <access_token>
```

**Query Parameters:**
```
sessionId: string    // Required - Session ID
limit?: number       // Optional - Default 50, max 100
offset?: number      // Optional - Default 0
```

**Response:**
```typescript
{
  success: boolean;
  data: {
    messages: [
      {
        id: string;
        session_id: string;
        sender_type: 'user' | 'astrologer' | 'system';
        content: string;
        metadata: object;
        created_at: string;
      }
    ];
    total: number;
    hasMore: boolean;
  };
}
```

---

## 3. Payment API

### 3.1 Create Razorpay Order

**Endpoint:** `POST /api/payment/razorpay`

**Purpose:** Create a new Razorpay order for payment

**Headers:**
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request:**
```typescript
{
  sessionId: string;           // Consultation session ID
  planTier: 'quick_pass' | 'full_consult' | 'subscription';
}
```

**Response:**
```typescript
{
  success: boolean;
  data: {
    orderId: string;           // Razorpay order ID
    amount: number;            // Amount in paise (INR)
    currency: string;          // 'INR'
    key: string;               // Razorpay key ID (for frontend)
    plan: {
      name: string;
      price: number;
      features: string[];
    };
  };
}
```

---

### 3.2 Create Stripe Session

**Endpoint:** `POST /api/payment/stripe`

**Purpose:** Create a Stripe checkout session

**Headers:**
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request:**
```typescript
{
  sessionId: string;           // Consultation session ID
  planTier: 'quick_pass' | 'full_consult' | 'subscription';
}
```

**Response:**
```typescript
{
  success: boolean;
  data: {
    sessionId: string;         // Stripe checkout session ID
    url: string;               // Checkout URL to redirect
    plan: {
      name: string;
      price: number;
      features: string[];
    };
  };
}
```

---

### 3.3 Razorpay Webhook

**Endpoint:** `POST /api/webhook/razorpay`

**Purpose:** Handle Razorpay payment events

**Headers:**
```
X-Razorpay-Signature: <webhook_signature>
```

**Request:**
```typescript
{
  event: 'payment.captured' | 'payment.failed';
  payload: {
    payment: {
      entity: {
        id: string;
        amount: number;
        status: string;
        order_id: string;
        method: string;
      };
    };
  };
}
```

**Processing:**
1. Verify webhook signature
2. Extract order_id and payment details
3. Update `transactions` table status
4. Update `consultation_sessions.is_paid = true`
5. Return 200 OK

---

### 3.4 Stripe Webhook

**Endpoint:** `POST /api/webhook/stripe`

**Purpose:** Handle Stripe checkout events

**Headers:**
```
Stripe-Signature: <webhook_signature>
```

**Request:**
```typescript
{
  type: 'checkout.session.completed' | 'checkout.session.expired';
  data: {
    object: {
      id: string;
      amount_total: number;
      payment_status: string;
      metadata: {
        session_id: string;
        user_id: string;
        plan_tier: string;
      };
    };
  };
}
```

**Processing:**
1. Verify webhook signature
2. Extract session metadata
3. Update `transactions` table
4. Update `consultation_sessions.is_paid = true`
5. Return 200 OK

---

## 4. Error Codes

| Code | Description | HTTP Status |
|------|-------------|-------------|
| `UNAUTHORIZED` | Invalid or missing auth token | 401 |
| `FORBIDDEN` | Insufficient permissions | 403 |
| `SESSION_NOT_FOUND` | Chat session not found | 404 |
| `RATE_LIMITED` | Too many requests | 429 |
| `AI_FAILED` | AI provider error | 500 |
| `PAYMENT_FAILED` | Payment processing error | 400 |
| `INVALID_INPUT` | Invalid request body | 400 |
| `INTERNAL_ERROR` | Server error | 500 |

---

## 5. Rate Limits

| Endpoint | Limit | Window | Method |
|----------|-------|--------|--------|
| `/api/chat` | 10 requests | 1 minute | Per user |
| `/api/payment/*` | 5 requests | 1 minute | Per user |
| `/api/auth/*` | 10 requests | 1 minute | Per IP |

**Rate Limit Response:**
```typescript
{
  success: false;
  error: 'Rate limit exceeded. Please try again later.';
  code: 'RATE_LIMITED';
  retryAfter: 60;  // seconds
}
```

---

## 6. Realtime Events (Supabase)

### 6.1 Subscribe to Messages

```typescript
const channel = supabase
  .channel('chat-messages')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'chat_messages',
      filter: `session_id=eq.${sessionId}`
    },
    (payload) => {
      // Handle new message
      console.log('New message:', payload.new);
    }
  )
  .subscribe();
```

### 6.2 Event Payload

```typescript
{
  eventType: 'INSERT';
  new: {
    id: string;
    session_id: string;
    sender_type: 'user' | 'astrologer' | 'system';
    content: string;
    metadata: object;
    created_at: string;
  };
  old: null;
  table: 'chat_messages';
  schema: 'public';
}
```

---

## 7. WebSocket Events (Custom)

For humanization pacing, we use custom WebSocket events:

### 7.1 Status Events

```typescript
// Typing indicator
{
  event: 'status',
  data: {
    type: 'typing' | 'calculating_chart' | 'idle';
    sessionId: string;
  }
}
```

### 7.2 Message Chunk Events

```typescript
// Chunked message delivery
{
  event: 'message_chunk',
  data: {
    messageId: string;
    chunk: string;
    chunkIndex: number;
    totalChunks: number;
    isLast: boolean;
  }
}
```

### 7.3 Paywall Events

```typescript
// Trigger paywall modal
{
  event: 'trigger_paywall_modal',
  data: {
    teaser: string;
    plans: Plan[];
  }
}

// Session unlocked after payment
{
  event: 'session_unlocked',
  data: {
    sessionId: string;
    planTier: string;
  }
}
```

---

## 8. Request/Response Examples

### 8.1 Complete Chat Flow

**Step 1: Send Message**
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Authorization: Bearer eyJhbGciOiJI..." \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "abc-123-def-456",
    "message": "What about my career prospects?"
  }'
```

**Step 2: Response**
```json
{
  "success": true,
  "data": {
    "userMessage": {
      "id": "msg-001",
      "content": "What about my career prospects?",
      "sender_type": "user",
      "created_at": "2026-09-11T10:30:00Z"
    },
    "astrologerResponse": {
      "id": "msg-002",
      "content": "Namaste ji. 🙏 Looking at your 10th house...",
      "sender_type": "astrologer",
      "metadata": {
        "pacingDelay": 3500,
        "chunks": [
          "Namaste ji. 🙏",
          "Looking at your 10th house, I see Saturn's influence..."
        ],
        "isPaywallTriggered": false
      },
      "created_at": "2026-09-11T10:30:04Z"
    }
  }
}
```

---

## 9. SDK Examples

### 9.1 React Hook Usage

```typescript
import { useChat } from '@/hooks/use-chat';

function ChatRoom() {
  const { messages, sendMessage, isLoading } = useChat(sessionId);

  const handleSend = async () => {
    await sendMessage("What about my marriage?");
  };

  return (
    <div>
      {messages.map(msg => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
      <button onClick={handleSend} disabled={isLoading}>
        Send
      </button>
    </div>
  );
}
```

### 9.2 Payment Hook Usage

```typescript
import { usePayment } from '@/hooks/use-payment';

function PaywallDrawer() {
  const { createOrder, processPayment, isProcessing } = usePayment();

  const handlePay = async (planTier: string) => {
    const order = await createOrder(sessionId, planTier);
    await processPayment(order);
  };

  return (
    <div>
      <button onClick={() => handlePay('full_consult')} disabled={isProcessing}>
        Pay ₹299
      </button>
    </div>
  );
}
```

---

## 10. Webhook Verification

### 10.1 Razorpay Signature Verification

```typescript
import crypto from 'crypto';

function verifyRazorpaySignature(
  body: string,
  signature: string,
  secret: string
): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');
  
  return expectedSignature === signature;
}
```

### 10.2 Stripe Signature Verification

```typescript
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

function verifyStripeSignature(
  payload: string,
  signature: string
): Stripe.Event {
  return stripe.webhooks.constructEvent(
    payload,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
  );
}
```
