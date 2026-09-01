import type { Metadata } from "next";
import { SignInForm } from "@/components/account/sign-in-form";

export const metadata: Metadata = {
  title: "Sign In",
  robots: { index: false, follow: true },
};

export default function SignInPage() {
  return (
    <div className="container-mavrikios flex min-h-[70vh] items-center justify-center py-20">
      <div className="w-full max-w-sm">
        <p className="mb-3 text-center text-[11px] uppercase tracking-[0.3em] text-stone-500">
          Welcome Back
        </p>
        <h1 className="mb-8 text-center font-serif text-3xl italic text-ink-950 sm:text-4xl">
          Sign In
        </h1>
        <SignInForm />
      </div>
    </div>
  );
}
