import { create } from 'zustand';

const useUserStore = create(set => ({
  user: null,
  setUser: v => set({ user: v }),
}));
export default useUserStore;
