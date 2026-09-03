"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteProduct } from "@/app/admin/products/actions";

export function DeleteProductButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!window.confirm(`Delete "${name}"? This can't be undone.`)) return;
    setIsDeleting(true);
    const result = await deleteProduct(id);
    setIsDeleting(false);

    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    toast.success("Product deleted.");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-xs uppercase tracking-[0.08em] text-red-700 underline disabled:opacity-50"
    >
      {isDeleting ? "Deleting…" : "Delete"}
    </button>
  );
}
