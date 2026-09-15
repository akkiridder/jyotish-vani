"use client";

import { Loader2 } from "lucide-react";

interface TypingIndicatorProps {
  status?: "typing" | "calculating_chart" | string | null;
}

export function TypingIndicator({ status = "typing" }: TypingIndicatorProps) {
  if (!status) return null;

  const statusText =
    status === "calculating_chart"
      ? "Acharya Ji is calculating planetary transits..."
      : "Acharya Ji is analyzing your chart...";

  return (
    <div className="flex items-center gap-3 pl-2 py-1">
      <div className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-primary">
        <Loader2 className="w-4 h-4 animate-spin" />
      </div>
      <div className="flex items-center gap-2 bg-surface-container-low/90 backdrop-blur px-3.5 py-2 rounded-full shadow-sm">
        <span className="text-xs text-muted-foreground">{statusText}</span>
        <span className="flex items-center gap-1 ml-1">
          <span className="w-1.5 h-1.5 rounded-full bg-primary typing-dot" />
          <span className="w-1.5 h-1.5 rounded-full bg-primary typing-dot" />
          <span className="w-1.5 h-1.5 rounded-full bg-primary typing-dot" />
        </span>
      </div>
    </div>
  );
}
