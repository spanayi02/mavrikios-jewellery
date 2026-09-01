import type { Metadata } from "next";
import { SignUpForm } from "@/components/account/sign-up-form";

export const metadata: Metadata = {
  title: "Create Account",
  robots: { index: false, follow: true },
};

export default function SignUpPage() {
  return (
    <div className="container-mavrikios flex min-h-[70vh] items-center justify-center py-20">
      <div className="w-full max-w-sm">
        <p className="mb-3 text-center text-[11px] uppercase tracking-[0.3em] text-stone-500">
          Join Mavrikios
        </p>
        <h1 className="mb-8 text-center font-serif text-3xl italic text-ink-950 sm:text-4xl">
          Create Your Account
        </h1>
        <SignUpForm />
      </div>
    </div>
  );
}
