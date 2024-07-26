import styled from '@emotion/styled';
import { List } from '@mui/material';
import ChatsListItem from '@/components/Sidebar/Item';
import { useEffect, useState } from 'react';
import { getDatas } from '@/utils/firestore';
import useUserStore from '@/stores/user.js';
import useChatStore from '@/stores/chat.js';
import { useNavigate } from 'react-router-dom';

export default function Chats() {
  const [chats, setChats] = useState([]);
  const { user } = useUserStore();
  const { setChat, setUser } = useChatStore();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchChats() {
      const newChats = await getDatas(['chats'], {
        wheres: [['pair', 'array-contains', user.uid]],
      });

      const users = await getDatas(['users'], {
        wheres: [
          [
            'uid',
            'in',
            newChats.map(c => c.pair.filter(u => u != user.uid)[0]),
          ],
        ],
      });

      const result = newChats.map((c, i) => {
        c.user = users[i];
        return c;
      });

      setChats([...result]);
    }

    fetchChats();
  }, [user]);

  function selectChat(chat) {
    return () => {
      setChat(chat);
      setUser(chat.user);
      navigate('/chat/' + chat.id);
    };
  }

  return (
    <ListStyled>
      {chats.map(chat => (
        <ChatsListItem onClick={selectChat(chat)} chat={chat} key={chat.id} />
      ))}
    </ListStyled>
  );
}

const ListStyled = styled(List)`
  width: 100%;
`;
