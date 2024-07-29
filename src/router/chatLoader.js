import { getData } from '@/utils/firestore';
import useChatStore from '@/stores/chat';

export default async function getChatData({ params }) {
  const chatStore = useChatStore.getState();

  if (chatStore.chat) {
    return null;
  }

  const currentUid = localStorage.getItem('uid');
  const chat = await getData(['chats', params.id]);

  if (!chat) {
    return null;
  }

  chatStore.setChat(chat);

  const user = chat.users[chat.pair.filter(u => u != currentUid)[0]];

  chatStore.setUser(user);

  return null;
}
