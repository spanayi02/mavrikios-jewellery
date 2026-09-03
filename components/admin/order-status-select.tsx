"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { updateOrderStatus, type OrderStatus } from "@/app/admin/orders/actions";

const statuses: OrderStatus[] = ["pending", "paid", "fulfilled", "cancelled"];

export function OrderStatusSelect({ orderId, status }: { orderId: string; status: OrderStatus }) {
  const [value, setValue] = useState(status);
  const [isPending, startTransition] = useTransition();

  function handleChange(next: string) {
    const nextStatus = next as OrderStatus;
    const previous = value;
    setValue(nextStatus);
    startTransition(async () => {
      const result = await updateOrderStatus(orderId, nextStatus);
      if (!result.ok) {
        setValue(previous);
        toast.error(result.error);
      }
    });
  }

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger disabled={isPending} className="h-9 w-36">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {statuses.map((s) => (
          <SelectItem key={s} value={s}>
            {s}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
