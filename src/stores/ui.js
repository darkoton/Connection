import { create } from 'zustand';

const useUiStore = create(set => {
  return {
    userSidebar:
      localStorage.getItem('userSidebar') == 'true'
        ? true
        : localStorage.getItem('userSidebar') == 'false'
          ? false
          : true,
    setUserSidebar: v =>
      set(() => {
        localStorage.setItem('userSidebar', v);
        return { userSidebar: v };
      }),
  };
});
export default useUiStore;
