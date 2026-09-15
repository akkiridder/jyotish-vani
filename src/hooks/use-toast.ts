import * as React from "react";
import { toast as baseToast } from "@/components/ui/toast";

export interface ToastProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: "default" | "destructive";
  type?: "success" | "info" | "warning" | "error" | "loading";
  timeout?: number;
}

export function toast({
  title,
  description,
  variant,
  type,
  timeout = 5000,
}: ToastProps) {
  const toastType = type ?? (variant === "destructive" ? "error" : "info");

  try {
    return baseToast.add({
      title,
      description,
      type: toastType,
      timeout,
    });
  } catch {
    if (variant === "destructive") {
      console.error(title, description);
    } else {
      console.log(title, description);
    }
    return "";
  }
}

export function useToast() {
  return {
    toast,
    dismiss: (id?: string) => baseToast.close(id),
  };
}
