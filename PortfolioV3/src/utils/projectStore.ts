import { create } from "zustand";

interface ProjectStore {
  projects: any[];
  thumbnailsLoaded: Set<string>;
  fullLoaded: Set<string>;
  setProjects: (projects: any[]) => void;
  isThumbnailLoaded: (slug: string) => boolean;
  preloadFull: (slug: string) => Promise<void>;
}

export const useProjectsStore = create<ProjectStore>((set, get) => ({
  projects: [],
  thumbnailsLoaded: new Set(),
  fullLoaded: new Set(),
  setProjects: (projects) => set({ projects }),
  isThumbnailLoaded: (slug) => get().thumbnailsLoaded.has(slug),
  preloadFull: async (slug) => {
    // Logic here will interface with your asset preloader
    if (get().fullLoaded.has(slug)) return;
    // ... Preloading logic to cache assets into browser memory
    set((state) => ({ fullLoaded: new Set(state.fullLoaded).add(slug) }));
  },
}));