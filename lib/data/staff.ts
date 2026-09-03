import "server-only";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export type StaffRole = "owner" | "employee";

/** Returns the signed-in user's staff role, or null if signed out / not staff. */
export const getStaffRole = cache(async (): Promise<StaffRole | null> => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase.from("staff").select("role").eq("user_id", user.id).maybeSingle();
  return (data?.role as StaffRole | undefined) ?? null;
});
