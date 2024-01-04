import { create } from "zustand";

export const useUserStore = create((set, get) => ({
  user: undefined,
  setUser: (user) => set((state) => ({ ...state, user })),
}));
