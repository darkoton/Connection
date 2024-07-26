import { getData } from '@/utils/firestore.js';
import useChatStore from '@/stores/chat.js';

export default async function getChatData({ params }) {
  const chatStore = useChatStore.getState();

  const currentUid = localStorage.getItem('uid');
  const chat = await getData(['chats', params.id]);
  chatStore.setChat(chat);

  const user = await getData([
    'users',
    chat.pair.filter(u => u != currentUid)[0],
  ]);

  chatStore.setUser(user);

  return null;
}
