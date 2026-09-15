"use client";

import { useState, useCallback } from "react";
import { ChatMessage } from "@/types";

interface UseChatOptions {
  sessionId: string;
  initialMessages?: ChatMessage[];
}

interface UseChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  isTyping: boolean;
  typingStatus: "typing" | "calculating_chart" | null;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  clearError: () => void;
}

export function useChat({
  sessionId,
  initialMessages = [],
}: UseChatOptions): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingStatus, setTypingStatus] = useState<
    "typing" | "calculating_chart" | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      setIsLoading(true);
      setError(null);

      // Add user message optimistically
      const userMessage: ChatMessage = {
        id: `temp-${Date.now()}`,
        session_id: sessionId,
        sender_type: "user",
        content: content.trim(),
        metadata: {},
        created_at: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMessage]);

      try {
        // Show typing indicator
        setIsTyping(true);
        setTypingStatus("calculating_chart");

        // Simulate calculating delay
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setTypingStatus("typing");

        // Call API
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sessionId,
            message: content.trim(),
          }),
        });

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || "Failed to send message");
        }

        // Add astrologer response
        if (data.data?.astrologerResponse) {
          const fullResponse = data.data.astrologerResponse;

          // Show typing delay based on response length
          const typingDelay = Math.min(2000 + (fullResponse.content.length / 20), 4000);
          await new Promise((resolve) => setTimeout(resolve, typingDelay));

          const botMessage: ChatMessage = {
            ...fullResponse,
            id: fullResponse.id,
            content: fullResponse.content,
          };

          setMessages((prev) => [...prev, botMessage]);
        }

        // Check if paywall should be shown
        if (data.data?.paywall) {
          // Emit paywall event (parent component will handle)
          window.dispatchEvent(
            new CustomEvent("show-paywall", {
              detail: data.data.paywall,
            })
          );
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to send message";
        setError(errorMessage);

        // Remove optimistic user message on error
        setMessages((prev) => prev.filter((m) => m.id !== userMessage.id));
      } finally {
        setIsLoading(false);
        setIsTyping(false);
        setTypingStatus(null);
      }
    },
    [sessionId, isLoading]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    isTyping,
    typingStatus,
    error,
    sendMessage,
    clearError,
  };
}
