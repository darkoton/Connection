import { create } from 'zustand';
import { watchData } from '@/utils/firestore.js';
import { orderBy, limit } from 'firebase/firestore';

const useChatStore = create(set => ({
  chat: null,
  user: null,
  messages: [],
  setMessages: v => set({ messages: v }),
  messagesWatch: null,
  setMessagesWatch: v => set({ messagesWatch: v }),
  setChat: v => {
    set(state => {
      if (state.messagesWatch) {
        state.messagesWatch();
      }

      state.setMessagesWatch(
        watchData(
          ['chats', v.id, 'messages'],
          messages => {
            const data = messages.docChanges().map(m => {
              return { ...m.doc.data(), type: m.type, id: m.doc.id };
            });
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
            other: [orderBy('date'), limit(20)],
          },
        ),
      );
      return {
        chat: v,
      };
    });
  },
  setUser: v => set({ user: v }),
  setValue: v => set(v),
}));

export default useChatStore;
