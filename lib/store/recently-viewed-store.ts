"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const MAX_ITEMS = 8;

interface RecentlyViewedState {
  ids: string[];
  addView: (productId: string) => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set) => ({
      ids: [],
      addView: (productId) =>
        set((state) => ({
          ids: [productId, ...state.ids.filter((id) => id !== productId)].slice(0, MAX_ITEMS),
        })),
    }),
    {
      name: "mavrikios-recently-viewed",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
