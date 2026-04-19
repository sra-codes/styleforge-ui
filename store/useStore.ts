import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UIComponent } from '@/types';
import initialComponents from '@/data/components.json';

interface StoreState {
  components: UIComponent[];
  favorites: string[];
  searchQuery: string;
  activeCategory: string | null;
  activeTags: string[];
  addComponent: (component: UIComponent) => void;
  updateComponent: (id: string, component: Partial<UIComponent>) => void;
  deleteComponent: (id: string) => void;
  toggleFavorite: (id: string) => void;
  setSearchQuery: (query: string) => void;
  setActiveCategory: (category: string | null) => void;
  toggleTag: (tag: string) => void;
  clearFilters: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      components: initialComponents as UIComponent[],
      favorites: [],
      searchQuery: '',
      activeCategory: null,
      activeTags: [],

      addComponent: (component) =>
        set((state) => ({ components: [...state.components, component] })),

      updateComponent: (id, updatedFields) =>
        set((state) => ({
          components: state.components.map((c) =>
            c.id === id ? { ...c, ...updatedFields, updatedAt: Date.now() } : c
          ),
        })),

      deleteComponent: (id) =>
        set((state) => ({
          components: state.components.filter((c) => c.id !== id),
          favorites: state.favorites.filter((favId) => favId !== id),
        })),

      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((favId) => favId !== id)
            : [...state.favorites, id],
        })),

      setSearchQuery: (query) => set({ searchQuery: query }),

      setActiveCategory: (category) => set({ activeCategory: category }),

      toggleTag: (tag) =>
        set((state) => ({
          activeTags: state.activeTags.includes(tag)
            ? state.activeTags.filter((t) => t !== tag)
            : [...state.activeTags, tag],
        })),

      clearFilters: () => set({ searchQuery: '', activeCategory: null, activeTags: [] }),
    }),
    {
      name: 'styleforge-storage',
      partialize: (state) => ({ components: state.components, favorites: state.favorites }),
      merge: (persistedState: any, currentState) => {
        if (!persistedState) return currentState;

        const mergedComponents = currentState.components.map((initialComp: UIComponent) => {
          const persistedComp = persistedState.components?.find((c: any) => c.id === initialComp.id);
          if (persistedComp) {
            // If the component exists in both, we prefer the initialComp (from JSON) 
            // so that updates to the JSON are reflected, but we keep any user modifications 
            // if we had a way to track them. For now, JSON wins for default components.
            return { 
              ...persistedComp,
              ...initialComp, 
            };
          }
          return initialComp;
        });

        const customComponents = (persistedState.components || []).filter(
          (pc: any) => !currentState.components.some((ic: UIComponent) => ic.id === pc.id)
        );

        return {
          ...currentState,
          ...persistedState,
          components: [...mergedComponents, ...customComponents],
        };
      },
    }
  )
);
