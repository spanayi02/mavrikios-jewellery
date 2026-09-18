"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      theme="light"
      position="bottom-center"
      toastOptions={{
        classNames: {
          toast:
            "bg-ink-950! text-bone-50! border-none! rounded-sm! font-sans! shadow-xl!",
          description: "text-bone-50/70!",
          actionButton: "bg-bone-50! text-ink-950!",
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
