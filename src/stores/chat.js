import { create } from 'zustand';
import { watchData } from '@/utils/firestore';
import { orderBy, limit } from 'firebase/firestore';
import useUiStore from './ui';

let firstLoadMessages = false;
const useChatStore = create((set, get) => ({
  chat: null,
  setChat: v => {
    useUiStore.getState().setSidebar(false);
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
          const changes = snapshot.docChanges();

          if (firstLoadMessages) {
            firstLoadMessages = false;
            state.setMessages(
              changes.reverse().map(m => ({ id: m.doc.id, ...m.doc.data() })),
            );
            state.setLastMessageDoc(changes[0] ? changes[0].doc : null);
            return;
          }

          set(state => {
            const newMessages = [...state.messages];
            changes.forEach(message => {
              if (message.type === 'added') {
                newMessages.push({ id: message.doc.id, ...message.doc.data() });
              } else if (message.type === 'modified') {
                const index = newMessages.findIndex(
                  i => i.id === message.doc.id,
                );
                if (index !== -1) {
                  newMessages[index] = {
                    id: message.doc.id,
                    ...message.doc.data(),
                  };
                }
              }
            });
            return { messages: newMessages };
          });
        },
        {
          other: [orderBy('date', 'desc'), limit(30)],
        },
      );

      state.setMessagesWatch(unsubscribe);
      return { chat: v };
    });
  },

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

  lastMessageDoc: null,
  setLastMessageDoc: v => set({ lastMessageDoc: v }),

  messagesWatch: null,
  setMessagesWatch: v => set({ messagesWatch: v }),

  setValue: v => set(v),
}));

export default useChatStore;
