import { create } from 'zustand';
import { signOut } from '@/utils/auth';

const useUserStore = create(set => ({
  user: undefined,
  setUser: v => set({ user: v }),

  logOut: async () => {
    await signOut();
    set({ user: undefined });
  },
}));
export default useUserStore;
