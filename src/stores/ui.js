import { create } from 'zustand';

const useUiStore = create(set => {
  return {
    userSidebar: (() => {
      if (window.outerWidth <= 1140) {
        return false;
      } else if (localStorage.getItem('userSidebar') == 'true') {
        return true;
      } else if (localStorage.getItem('userSidebar') == 'false') {
        return false;
      } else {
        true;
      }
    })(),
    setUserSidebar: v =>
      set(() => {
        localStorage.setItem('userSidebar', v);
        return { userSidebar: v };
      }),
    chatList:
      localStorage.getItem('chatList') == 'true'
        ? true
        : localStorage.getItem('chatList') == 'false'
          ? false
          : true,
    setChatList: v =>
      set(() => {
        localStorage.setItem('chatList', v);
        return { chatList: v };
      }),

    sidebar: (() => {
      if (location.pathname.split('/')[1] == 'chat') {
        return false;
      }

      return true;
    })(),
    setSidebar: v => set({ sidebar: v }),
  };
});
export default useUiStore;
