import { ChatMessage } from './index'

export interface ChatState {
  messages: ChatMessage[]
  isLoading: boolean
  isTyping: boolean
  typingStatus: string | null
  error: string | null
}

export interface SendMessageParams {
  sessionId: string
  content: string
}

export interface ChatResponse {
  success: boolean
  data?: {
    userMessage: ChatMessage
    astrologerResponse: ChatMessage
    paywall?: {
      plans: Plan[]
    }
  }
  error?: string
  code?: string
}

export interface ChatHistoryResponse {
  success: boolean
  data?: {
    messages: ChatMessage[]
    total: number
    hasMore: boolean
  }
  error?: string
}

export interface TypingEvent {
  type: 'typing' | 'calculating_chart' | 'idle'
  sessionId: string
}

export interface MessageChunkEvent {
  messageId: string
  chunk: string
  chunkIndex: number
  totalChunks: number
  isLast: boolean
}

export interface PaywallEvent {
  teaser: string
  plans: Plan[]
}

export interface SessionUnlockedEvent {
  sessionId: string
  planTier: string
}

// Re-export Plan from index
import { Plan } from './index'
