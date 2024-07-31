import { AppBar, Toolbar } from '@mui/material';
import logo from '@/assets/img/logo.png';
import styled from '@emotion/styled';
import * as mixins from '@/assets/style/modules/mixins';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import vars from '@/assets/style/modules/vars';
import { useRef, useState } from 'react';
import InviteFriendModal from '@/components/InviteFriendModal';
import useUserStore from '@/stores/user';
import useChatStore from '@/stores/chat';
import { getDatas } from '@/utils/firestore';
import Avatar from '@/components/User/Avatar';
import { useNavigate } from 'react-router-dom';

export default function SideHeader() {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchFocus, setSearchFocus] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const searchTimer = useRef(null);
  const { user } = useUserStore();
  const { setUser, setChat, chat: chatData } = useChatStore();
  const navigate = useNavigate();

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  function search(e) {
    if (searchTimer.current) {
      clearTimeout(searchTimer.current);
    }

    searchTimer.current = setTimeout(async () => {
      const { data } = await getDatas(['users'], {
        wheres: [
          ['uid', 'in', user.friends],
          ['displayName', '>=', e.target.value],
        ],
      });

      setSearchResult(data);
    }, 500);
  }

  function selectFriend(friend) {
    return async () => {
      if (
        chatData &&
        chatData.pair.includes(friend.uid) &&
        chatData.pair.includes(user.uid)
      ) {
        return;
      }
      const uids = [friend.uid, user.uid];
      const chat = (
        await getDatas(['chats'], {
          ors: [
            {
              wheres: [
                ['pair', '==', uids],
                ['pair', '==', uids.toReversed()],
              ],
            },
          ],
        })
      ).data[0];
      setChat(chat);
      setUser(friend);

      if (chat) {
        navigate(`/chat/${chat.id}`);
      } else {
        navigate(`/friend/${friend.uid}`);
      }
    };
  }

  return (
    <>
      <AppBarStyled position="sticky">
        <ToolbarStyled>
          <Logo src={logo} alt="Logo" className={searchFocus && 'none'} />
          <InputBody>
            <InputHeader
              placeholder="Search..."
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              onFocus={() => setSearchFocus(true)}
              onBlur={() => setSearchFocus(false)}
              onInput={search}
            />
            <SearchIconStyled />
            <InputResult className={searchFocus && searchResult && 'visible'}>
              {searchResult && (
                <>
                  {searchResult.length ? (
                    searchResult.map(user => (
                      <InputResultItem
                        key={user.uid}
                        onClick={selectFriend(user)}
                      >
                        <Avatar user={user} size={50} />
                        <Username>{user.displayName}</Username>
                      </InputResultItem>
                    ))
                  ) : (
                    <NotFound>Not found</NotFound>
                  )}
                </>
              )}
            </InputResult>
          </InputBody>
          <PersonAddAltIconStyled
            onClick={openModal}
            className={searchFocus && 'none'}
          />
        </ToolbarStyled>
      </AppBarStyled>
      <InviteFriendModal open={open} onClose={closeModal} />
    </>
  );
}

const AppBarStyled = styled(AppBar)`
  background-color: transparent;
  background-image: none;
  box-shadow: none;
`;

const ToolbarStyled = styled(Toolbar)`
  ${mixins.adaptivValue('column-gap', 10, 6, 1)}
  padding: 0 10px !important;
`;

const Logo = styled.img`
  width: 100%;
  max-width: 45px;
  object-fit: cover;
  transition: all 0.2s ease-in-out 0s;

  &.none {
    max-width: 0;
  }
`;

const InputBody = styled.div`
  background-color: #303030;
  border-radius: 999px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mixins.adaptivIndent('padding', 6, 4, 10, 6, 1)}
  flex: 1 1 auto;
  transition: all 0.3s ease 0s;
  position: relative;
`;

const InputHeader = styled.input`
  ${mixins.adaptivValue('font-size', 16, 14, 1)}
  background: transparent;
  width: 100%;
  padding-right: 10px;
`;

const InputResult = styled.ul`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: calc(100% + 5px);
  width: 100%;
  left: 0;
  border-radius: 15px;
  background: #333;
  padding: 5px 0;
  overflow: auto;
  max-height: 40vh;
  opacity: 0;
  transition: all 0.1s ease 0.1s;

  &.visible {
    opacity: 1;
  }
`;

const InputResultItem = styled.li`
  display: flex;
  align-items: center;
  column-gap: 5px;
  padding: 5px 10px;

  @media (any-hover: hover) {
    & {
      cursor: pointer;
      transition: all 0.3s ease 0s;
    }
    &:hover {
      background: #444;
    }
  }
`;

const Username = styled.span`
  font-size: 15px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const SearchIconStyled = styled(SearchIcon)`
  ${mixins.adaptivValue('font-size', 30, 24, 1)}
`;

const PersonAddAltIconStyled = styled(PersonAddAltIcon)`
  ${mixins.adaptivValue('font-size', 30, 28, 1)}
  transition: all 0.2s ease 0s;

  &.none {
    width: 0;
  }
  @media (any-hover: hover) {
    & {
      cursor: pointer;
      transition: all 0.3s ease 0s;
    }
    &:hover {
      color: ${vars.$colorMain};
    }
  }
`;

const NotFound = styled.div`
  font-size: 20px;
  text-align: center;
  padding: 20px 0;
`;
