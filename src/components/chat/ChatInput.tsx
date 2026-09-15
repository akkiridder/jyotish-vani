"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, Mic, Send, Loader2 } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({
  onSend,
  isLoading,
  disabled = false,
  placeholder = "Ask Acharya Dev about your career, marriage, health...",
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (message.trim() && !isLoading && !disabled) {
      onSend(message.trim());
      setMessage("");
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="space-y-2">
      {/* Quick Prompts */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
        {[
          "What about my finances?",
          "Which gemstone suits me?",
          "Marriage compatibility?",
          "How is my Sade Sati period?",
        ].map((prompt, index) => (
          <button
            key={index}
            onClick={() => setMessage(prompt)}
            className="flex-shrink-0 px-3 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-muted-foreground hover:text-primary transition-all text-xs font-medium"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="flex items-center gap-2 bg-surface-container-low/95 rounded-full p-1.5 pl-4 shadow-2xl focus-within:shadow-[0_0_24px_rgba(212,175,55,0.2)] transition-all">
        <button
          className="flex items-center justify-center text-muted-foreground hover:text-primary transition-colors focus:outline-none"
          title="Attach Janam Kundli"
        >
          <Paperclip className="w-5 h-5" />
        </button>

        <Input
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled || isLoading}
          className="flex-1 bg-transparent border-none focus:ring-0 focus-visible:ring-0 focus:outline-none px-2 text-sm placeholder:text-muted-foreground/60"
        />

        <div className="flex items-center gap-1">
          <button
            className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full text-muted-foreground hover:text-primary hover:bg-surface-container transition-all focus:outline-none"
            title="Speak question"
          >
            <Mic className="w-5 h-5" />
          </button>

          <Button
            onClick={handleSend}
            disabled={!message.trim() || isLoading || disabled}
            size="icon"
            className="w-11 h-11 rounded-full gradient-gold text-background shadow-[0_0_16px_rgba(212,175,55,0.4)] hover:brightness-105 transition-all focus:outline-none active:scale-95 flex-shrink-0"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Privacy Note */}
      <div className="flex items-center justify-center gap-2 py-0.5">
        <span className="text-[10px] text-muted-foreground/70 tracking-wide uppercase">
          🔒 256-bit Vedic privacy • Sacred Sanctuary Protected
        </span>
      </div>
    </div>
  );
}
