// /store/dialogStore.ts
import { create } from 'zustand';

interface DialogState {
  isOpen: boolean;
  content: React.ReactNode;
  openDialog: (content: React.ReactNode) => void;
  closeDialog: () => void;
}

export const useDialogStore = create<DialogState>((set) => ({
  isOpen: false,
  content: null,
  openDialog: (content) => set({ isOpen: true, content }),
  closeDialog: () => set({ isOpen: false, content: null }),
}));
