import { create } from "zustand";

interface IAuthStore {
  isUserValid: boolean;
  userId: string | null;
  setIsUserValid: (arg: boolean) => void;
  setUserId: (arg: string) => void;
}

const useAuthStore = create<IAuthStore>((set) => ({
  isUserValid: false,
  userId: null,
  setIsUserValid: (arg) => set({ isUserValid: arg }),
  setUserId: (arg) => set({ userId: arg }),
}));

export default useAuthStore;
