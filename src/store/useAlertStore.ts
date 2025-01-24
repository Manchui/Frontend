import { create } from 'zustand';

interface AlertStore {
  closeAlert: () => void;
  closeDateAlert: () => void;
  isAlertOpen: boolean;
  isDateAlertOpen: boolean;
  openAlert: () => void;
  openDateAlert: () => void;
}

export const useAlertStore = create<AlertStore>((set) => ({
  isAlertOpen: false,
  isDateAlertOpen: false,
  openAlert: () => set({ isAlertOpen: true, isDateAlertOpen: false }),
  closeAlert: () => set({ isAlertOpen: false }),
  openDateAlert: () => set({ isDateAlertOpen: true, isAlertOpen: false }),
  closeDateAlert: () => set({ isDateAlertOpen: false }),
}));
