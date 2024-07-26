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
  };
});
export default useUiStore;
