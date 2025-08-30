import { create } from 'zustand';

interface UIState {
  darkMode: boolean;
  isOnline: boolean;
  activeTab: string;
}

interface UIActions {
  toggleDarkMode: () => void;
  setOnlineStatus: (isOnline: boolean) => void;
  setActiveTab: (tab: string) => void;
}

type UIStore = UIState & UIActions;

export const useUIStore = create<UIStore>((set) => ({
  // Initial state
  darkMode: false,
  isOnline: true,
  activeTab: 'Dashboard',

  // Actions
  toggleDarkMode: () =>
    set((state) => ({
      darkMode: !state.darkMode,
    })),

  setOnlineStatus: (isOnline: boolean) =>
    set(() => ({
      isOnline,
    })),

  setActiveTab: (activeTab: string) =>
    set(() => ({
      activeTab,
    })),
}));