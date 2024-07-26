import { create } from 'zustand';
import { watchData } from '@/utils/firestore.js';
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
    set(state => {
      if (!v) {
        return { chat: v };
      }

      if (state.messagesWatch) {
        state.messagesWatch();
      }
      firstLoadMessages = false;

      state.setMessagesWatch(
        watchData(
          ['chats', v.id, 'messages'],
          messages => {
            const data = messages.docChanges().map(m => {
              return { ...m.doc.data(), type: m.type, id: m.doc.id };
            });
            if (!firstLoadMessages) {
              firstLoadMessages = true;
              state.setMessages(data.reverse());
            }
            const newMessages = state.messages;
            data.forEach(message => {
              if (message.type == 'added') {
                newMessages.push(message);
              } else if (message.type == 'edited') {
                // return;
              }
            });

            state.setMessages(newMessages);
          },
          {
            other: [orderBy('date', 'desc'), limit(20)],
          },
        ),
      );
      return {
        chat: v,
      };
    });
  },
  setValue: v => set(v),
}));

export default useChatStore;
