import { create } from 'zustand';

interface IAuthStore {
  isUserValid: boolean;
  userId: string | null;
  userEmail: string | null;
  accessToken: string | null;
  setIsUserValid: (arg: boolean) => void;
  setUserInfo: (id: string, email: string) => void;
  setAccessToken: (arg: string) => void;
}

const useAuthStore = create<IAuthStore>((set) => ({
  isUserValid: false,
  userId: null,
  userEmail: null,
  accessToken: null,
  setIsUserValid: (arg) => set({ isUserValid: arg }),
  setUserInfo: (id, email) => set({ userId: id, userEmail: email }),
  setAccessToken: (arg) => set({ accessToken: arg }),
}));

export default useAuthStore;
