import { create } from 'zustand';

interface IAuthStore {
  isUserValid: boolean;
  userId: string | null;
  accessToken: string | null;
  setIsUserValid: (arg: boolean) => void;
  setAccessToken: (arg: string) => void;
}

const useAuthStore = create<IAuthStore>((set) => ({
  isUserValid: false,
  userId: null,
  accessToken: null,
  setIsUserValid: (arg) => set({ isUserValid: arg }),
  setAccessToken: (arg) => set({ accessToken: arg }),
}));

export default useAuthStore;
