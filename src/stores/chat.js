import { create } from 'zustand';
import { watchData } from '@/utils/firestore';
import { orderBy, limit } from 'firebase/firestore';

let firstLoadMessages = false;
const useChatStore = create((set, get) => ({
  chat: null,

  user: null,
  setUser: v => set({ user: v }),

  chatList: null,
  setChatList: v => {
    const setChatScroll = get().setChatScroll;
    setChatScroll(v.scrollHeight);

    setTimeout(() => {
      v.scrollTop = v.scrollHeight;
    }, 500);
    set({ chatList: v });
  },

  scrollDown: () => {
    const list = get().chatList;
    list.scrollTop = list.scrollHeight;

    const setChatScroll = get().setChatScroll;
    setChatScroll(list.scrollHeight);
  },

  chatScroll: 0,
  setChatScroll: v => set({ chatScroll: v }),

  messages: [],
  setMessages: v => set({ messages: v }),

  messagesWatch: null,
  setMessagesWatch: v => set({ messagesWatch: v }),

  setChat: v => {
    if (!v) {
      set({ chat: v });
      return;
    }

    set(state => {
      if (state.messagesWatch) {
        state.messagesWatch();
      }
      firstLoadMessages = true;

      const unsubscribe = watchData(
        ['chats', v.id, 'messages'],
        snapshot => {
          const changes = snapshot.docChanges().map(m => ({
            ...m.doc.data(),
            type: m.type,
            id: m.doc.id,
          }));

          if (firstLoadMessages) {
            firstLoadMessages = false;
            state.setMessages(changes.reverse());
            return;
          }

          set(state => {
            const newMessages = [...state.messages];
            changes.forEach(message => {
              if (message.type === 'added') {
                newMessages.push(message);
              } else if (message.type === 'modified') {
                const index = newMessages.findIndex(i => i.id === message.id);
                if (index !== -1) {
                  newMessages[index] = message;
                }
              }
            });
            return { messages: newMessages };
          });
        },
        {
          other: [orderBy('date', 'desc'), limit(20)],
        },
      );

      state.setMessagesWatch(unsubscribe);
      return { chat: v };
    });
  },

  setValue: v => set(v),
}));

export default useChatStore;
