import { create } from "zustand";

interface TransitionState {
  isMorphing: boolean;
  clickedRect: DOMRect | null;
  activeProject: string | null;
  startTransition: (projectSlug: string, rect: DOMRect) => void;
  reset: () => void;
}

export const useTransitionStore = create<TransitionState>((set) => ({
  isMorphing: false,
  clickedRect: null,
  activeProject: null,
  startTransition: (projectSlug, rect) => set({ 
    isMorphing: true, 
    activeProject: projectSlug, 
    clickedRect: rect 
  }),
  reset: () => set({ isMorphing: false, clickedRect: null, activeProject: null }),
}));