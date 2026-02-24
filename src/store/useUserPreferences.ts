import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

// Define ONLY the state variables here
interface PreferencesState {
  theme: 'dark' | 'light';
  isAuthModalOpen: boolean;
}

// Define ONLY the actions here
interface PreferencesActions {
  setTheme: (theme: 'dark' | 'light') => void;
  toggleTheme: () => void;
  resetPreferences: () => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

// Combine them for the Zustand store type
type UserPreferencesStore = PreferencesState & PreferencesActions;

// Now initialState simply uses the pure PreferencesState type! No Omit needed.
const initialState: PreferencesState = {
  theme: 'dark',
  isAuthModalOpen: false,
};

// Pass the combined Store type to create()
export const useUserPreferences = create<UserPreferencesStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        // UI & Chart Actions
        setTheme: (theme) => set({ theme }),
        toggleTheme: () => set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light'
        })),

        openAuthModal: () => set({ isAuthModalOpen: true }),
        closeAuthModal: () => set({ isAuthModalOpen: false }),

        resetPreferences: () => set((state) => ({
          ...state,
          ...initialState
        })),
      }),
      {
        name: 'ls-user-prefs',
        // partialize still uses the combined Store type, which is perfectly fine here
        partialize: (state) => Object.fromEntries(
          Object.entries(state).filter(([key]) => !['isAuthModalOpen'].includes(key))
        ) as UserPreferencesStore, 
      }
    )
  )
);