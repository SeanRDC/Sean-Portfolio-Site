import { create } from "zustand";

interface LoaderState {
  progress: number;
  isComplete: boolean;
  increment: (val: number) => void;
  setComplete: () => void;
}

export const useLoaderStore = create<LoaderState>((set) => ({
  progress: 0,
  isComplete: false,
  increment: (val) => set((state) => ({ progress: Math.min(state.progress + val, 100) })),
  setComplete: () => set({ isComplete: true }),
}));