"use client";

import React, { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TypingIndicator } from "./TypingIndicator";
import { MessageBubble } from "./MessageBubble";
import { ChatHeader } from "./ChatHeader";
import { KundliSnapshot } from "./KundliSnapshot";
import { PaywallDrawer } from "@/components/paywall/PaywallDrawer";
import { useToast } from "@/hooks/use-toast";
import { ChatMessage } from "@/types";

interface BirthDetails {
  full_name?: string;
  dob?: string;
  tob?: string;
  pob?: string;
}

export default function ChatRoom() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [showKundli, setShowKundli] = useState(true);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [birthDetails, setBirthDetails] = useState<BirthDetails | null>(null);
  
  const supabase = createClient();
  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    // Initialize user session and data
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!isMounted || !user) return;

      // 1. Fetch user birth details
      const { data: bDetails } = await supabase
        .from("user_birth_details")
        .select("full_name, dob, tob, pob")
        .eq("user_id", user.id)
        .maybeSingle();

      if (isMounted && bDetails) {
        setBirthDetails(bDetails);
      }

      // 2. Fetch or create active consultation session
      const { data: existingSession } = await supabase
        .from("consultation_sessions")
        .select("id, is_paid, free_messages_used")
        .eq("user_id", user.id)
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      let activeSessionId = existingSession?.id;

      if (!activeSessionId) {
        const { data: newSession } = await supabase
          .from("consultation_sessions")
          .insert({
            user_id: user.id,
            status: "active",
            is_paid: false,
            free_messages_used: 0,
          })
          .select("id")
          .single();
        activeSessionId = newSession?.id;
      }

      if (isMounted && activeSessionId) {
        setSessionId(activeSessionId);
        if (existingSession?.is_paid) {
          setIsPaid(true);
        }

        // Fetch messages for this session
        const { data: msgData } = await supabase
          .from("chat_messages")
          .select("*")
          .eq("session_id", activeSessionId)
          .order("created_at", { ascending: true });

        if (isMounted && msgData) {
          setMessages(msgData as ChatMessage[]);
          setMessageCount(msgData.filter((m: ChatMessage) => m.sender_type === "user").length);
        }
      }
    });

    // Real-time chat messages subscription
    const channel = supabase
      .channel("chat_room")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "chat_messages" }, (payload) => {
        const newMsg = payload.new as ChatMessage;
        setMessages((prev) => {
          if (prev.some((m) => m.id === newMsg.id)) return prev;
          return [...prev, newMsg];
        });
      })
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    // Paywall Check
    if (!isPaid && messageCount >= 3) {
      toast({
        title: "Free Limit Reached",
        description: "Please unlock a plan to continue your consultation with Acharya Dev.",
      });
      return;
    }

    const userMsg = input.trim();
    setInput("");

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Authentication required");

      const insertData: Record<string, unknown> = {
        content: userMsg,
        sender_type: "user",
      };
      if (sessionId) {
        insertData.session_id = sessionId;
      }

      await supabase.from("chat_messages").insert(insertData);

      setMessageCount((prev) => prev + 1);
      setIsTyping(true);
      
      const response = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ message: userMsg, sessionId }),
        headers: { "Content-Type": "application/json" },
      });

      const aiData = await response.json();
      
      const aiInsertData: Record<string, unknown> = {
        content: aiData.response,
        sender_type: "astrologer",
      };
      if (sessionId) {
        aiInsertData.session_id = sessionId;
      }

      await supabase.from("chat_messages").insert(aiInsertData);

    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to send message";
      toast({ title: "Error", description: message, variant: "destructive" });
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-background border-x relative">
      <ChatHeader 
        freeMessagesUsed={messageCount} 
        isPaid={isPaid} 
        showKundli={showKundli}
        onToggleKundli={() => setShowKundli((prev) => !prev)}
      />
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 pt-24 space-y-4 scroll-smooth">
        {/* Kundli Snapshot Display */}
        {showKundli && (
          <div className="mb-4">
            <KundliSnapshot 
              fullName={birthDetails?.full_name}
              dob={birthDetails?.dob}
              tob={birthDetails?.tob}
              pob={birthDetails?.pob}
              onClose={() => setShowKundli(false)}
            />
          </div>
        )}

        {messages.length === 0 && (
          <div className="text-center text-muted-foreground mt-8 mb-4">
            <p className="text-lg italic font-heading">&ldquo;The stars align for your consultation...&rdquo;</p>
            <p className="text-xs text-muted-foreground mt-2">
              Acharya Dev is reviewing your Vedic Janam Kundli. Ask any question regarding your life, career, or spiritual path.
            </p>
          </div>
        )}
        {messages.map((msg) => <MessageBubble key={msg.id} message={msg} />)}
        {isTyping && <TypingIndicator status="typing" />}
      </div>

      {/* Floating Paywall Trigger */}
      {!isPaid && messageCount >= 3 && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-50">
          <PaywallDrawer 
            trigger={<Button className="bg-yellow-600 hover:bg-yellow-700 text-white rounded-full px-6 shadow-xl animate-bounce">Unlock Full Reading ✨</Button>}
            sessionId={sessionId || undefined}
            onPaymentSuccess={() => {
              setIsPaid(true);
              if (sessionId) {
                supabase
                  .from("consultation_sessions")
                  .update({ is_paid: true })
                  .eq("id", sessionId);
              }
            }}
          />
        </div>
      )}

      <form onSubmit={sendMessage} className="p-4 border-t bg-card flex gap-2">
        <Input 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder={(!isPaid && messageCount >= 3) ? "Unlock plan to message..." : "Ask your question..."} 
          disabled={!isPaid && messageCount >= 3}
          className="flex-1"
        />
        <Button type="submit" disabled={!input.trim() || (!isPaid && messageCount >= 3)}>Send</Button>
      </form>
    </div>
  );
}
