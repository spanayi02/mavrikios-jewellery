"use client";

import { useEffect } from "react";
import { useRecentlyViewedStore } from "@/lib/store/recently-viewed-store";

/** Records a product view once, on mount. Renders nothing. */
export function TrackRecentlyViewed({ productId }: { productId: string }) {
  useEffect(() => {
    useRecentlyViewedStore.getState().addView(productId);
  }, [productId]);

  return null;
}
