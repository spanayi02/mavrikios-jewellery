import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { CheckoutClient } from "./checkout-client";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false, follow: true },
};

export default async function CheckoutPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <CheckoutClient
      defaultEmail={user?.email}
      defaultFullName={user?.user_metadata?.full_name as string | undefined}
    />
  );
}
