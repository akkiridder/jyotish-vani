"use client";

import { ChatMessage } from "@/types";
import { formatTime, decodeHTMLEntities } from "@/lib/utils";
import { CheckCheck } from "lucide-react";

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender_type === "user";
  const isSystem = message.sender_type === "system";

  if (isSystem) {
    return (
      <div className="flex justify-center w-full my-4">
        <div className="px-4 py-2 rounded-full bg-surface-container-high/60 backdrop-blur-md shadow-sm max-w-full text-center">
          <span className="text-xs text-muted-foreground inline-flex items-center gap-1.5 flex-wrap justify-center">
            <span className="text-primary">✦</span>
            {message.content}
            <span className="text-primary">✦</span>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col gap-1 max-w-[85%] sm:max-w-[80%] ${
        isUser ? "ml-auto items-end" : "items-start"
      }`}
    >
      {/* Sender Info */}
      <div
        className={`flex items-center gap-2 ${
          isUser ? "pr-1 flex-row-reverse" : "pl-1"
        }`}
      >
        {isUser ? (
          <>
            <span className="text-xs text-muted-foreground">
              {formatTime(message.created_at)}
            </span>
            <span className="text-xs text-muted-foreground/40">•</span>
            <span className="text-xs text-primary font-medium">You</span>
          </>
        ) : (
          <>
            <span className="text-xs text-primary font-semibold uppercase tracking-wider">
              Acharya Dev
            </span>
            <span className="text-xs text-muted-foreground/40">•</span>
            <span className="text-xs text-muted-foreground">
              {formatTime(message.created_at)}
            </span>
          </>
        )}
      </div>

      {/* Message Bubble */}
      <div
        className={`rounded-2xl p-4 shadow-lg leading-relaxed ${
          isUser
            ? "rounded-br-sm bg-gradient-to-br from-surface-container-high via-surface-container to-surface-container-low text-foreground shadow-primary/5"
            : "rounded-bl-sm bg-surface-container-high text-foreground"
        }`}
      >
        <p className="text-sm whitespace-pre-wrap break-words">{decodeHTMLEntities(message.content)}</p>

        {/* Read Receipt for User Messages */}
        {isUser && (
          <div className="flex items-center justify-end gap-1 mt-2 text-primary">
            <span className="text-[10px]">Read</span>
            <CheckCheck className="w-3 h-3" />
          </div>
        )}
      </div>
    </div>
  );
}
