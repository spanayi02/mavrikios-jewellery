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
            "bg-ink-950! text-marble-50! border-none! rounded-sm! font-sans! shadow-xl!",
          description: "text-marble-50/70!",
          actionButton: "bg-marble-50! text-ink-950!",
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
