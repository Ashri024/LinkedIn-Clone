import { create } from 'zustand';

interface OtpStore {
  otp: string | null;
  setOtp: (otp: string) => void;
  clearOtp: () => void;
}

export const useOtpStore = create<OtpStore>((set) => ({
  otp: null,
  setOtp: (otp) => set({ otp }),
  clearOtp: () => set({ otp: null }),
}));
