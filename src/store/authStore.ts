import { create } from 'zustand';

type SignUpMode = 'google' | 'credentials' | null;

interface AuthStore {
  email: string;
  password: string;
  signUpMode: SignUpMode;
  setAuthData: (data: { email: string; password: string }) => void;
  setSignUpMode: (mode: SignUpMode) => void;
  clearAuthData: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  email: '',
  password: '',
  signUpMode: null,
  setAuthData: ({ email, password }) => set({ email, password }),
  setSignUpMode: (mode) => set({ signUpMode: mode }),
  clearAuthData: () => set({ email: '', password: '', signUpMode: null }),
}));
