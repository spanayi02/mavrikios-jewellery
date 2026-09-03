"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getStaffRole } from "@/lib/data/staff";

export type OrderStatus = "pending" | "paid" | "fulfilled" | "cancelled";

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus
): Promise<{ ok: true } | { ok: false; error: string }> {
  const role = await getStaffRole();
  if (!role) return { ok: false, error: "Not authorized." };

  const supabase = await createClient();
  const { error } = await supabase.from("orders").update({ status }).eq("id", orderId);
  if (error) {
    console.error("Failed to update order status", error);
    return { ok: false, error: "Something went wrong updating the order." };
  }

  revalidatePath("/admin/orders");
  return { ok: true };
}
