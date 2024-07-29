import { create } from 'zustand';

const useUserStore = create(set => ({
  user: undefined,
  setUser: v => set({ user: v }),
}));
export default useUserStore;
