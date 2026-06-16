import { create } from "zustand";

interface ScrollState {
  progress: number;
  velocity: number;
  viewMode: "list" | "grid";
  setScroll: (progress: number, velocity: number) => void;
  setViewMode: (mode: "list" | "grid") => void;
}

interface PointerState {
  ndcX: number;
  ndcY: number;
  setPointer: (x: number, y: number) => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
  progress: 0,
  velocity: 0,
  viewMode: "grid",
  setScroll: (progress, velocity) => set({ progress, velocity }),
  setViewMode: (viewMode) => set({ viewMode }),
}));

export const usePointerStore = create<PointerState>((set) => ({
  ndcX: 0,
  ndcY: 0,
  setPointer: (ndcX, ndcY) => set({ ndcX, ndcY }),
}));