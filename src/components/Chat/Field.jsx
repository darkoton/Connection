import styled from '@emotion/styled';
import { css } from '@emotion/react';
import * as mixins from '@/assets/style/modules/mixins.js';
import vars from '@/assets/style/modules/vars.js';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined';
import { useState } from 'react';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import EmojiPicker from 'emoji-picker-react';
import { scrollbars } from '@/assets/style/modules/mixins';
import TextField from '@mui/material/TextField';
import useChatStore from '@/stores/chat.js';
import useUserStore from '@/stores/user.js';
import { addData, updateData, getData } from '@/utils/firestore.js';
import { Timestamp } from 'firebase/firestore';

export default function Field() {
  const [text, setText] = useState('');
  const [emojiOpen, setEmojiOpen] = useState(false);
  const { chat, user: chatUser, setChat } = useChatStore();
  const { user } = useUserStore();

  function selectEmoji(e) {
    setText(text + e.emoji);
  }

  function onEnterPress(e) {
    if (e.keyCode == 13) {
      e.preventDefault();

      if (e.shiftKey == true) {
        setText(text + '\n');
      } else {
        send();
      }
    }
  }

  async function send() {
    let id;
    if (!chat) {
      id = (
        await addData(['chats'], {
          pair: [user.uid, chatUser.uid],
        })
      ).id;

      await updateData(['chats', id], { id });

      setChat(await getData(['chats', id]));
    }

    addData(['chats', chat.id || id, 'messages'], {
      text,
      date: Timestamp.fromDate(new Date()),
      check: false,
      userUid: user.uid,
    });

    setText('');
  }

  return (
    <Body>
      <Clip />
      <Input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Input message..."
        multiline
        maxRows={4}
        onKeyDown={onEnterPress}
      />
      <Actions>
        <EmojiBody onMouseLeave={() => setEmojiOpen(false)}>
          <Emoji
            onClick={() => setEmojiOpen(!emojiOpen)}
            onMouseMove={() => setEmojiOpen(true)}
          />
          <EmojiPickerBody>
            <EmojiPickerStyled
              autoFocusSearch={false}
              lazyLoadEmojis={true}
              open={emojiOpen}
              theme={'light'}
              onEmojiClick={selectEmoji}
              style={{
                '--epr-bg-color': '#212c49',
                '--epr-picker-border-color': '#1a233a',
                '--epr-search-input-bg-color': '#151c2e',
                '--epr-light': '#11192e',
                '--epr-skin-tone-picker-menu-color': 'rgba(17, 25, 46, 0.6)',
                '--epr-category-label-bg-color': 'rgba(17, 25, 46, 0.902)',
                '--epr-hover-bg-color': '#35487c',
                '--epr-focus-bg-color': '#35487c',
              }}
            />
          </EmojiPickerBody>
        </EmojiBody>
        {text ? <Send onClick={send} /> : <Mic />}
      </Actions>
    </Body>
  );
}

const Body = styled.div`
  display: flex;
  align-items: flex-end;
  background: ${vars.$colorChat};
  ${mixins.adaptivIndent('padding', 17, 12, 20, 16, 1)}
`;

const Icon = css`
  ${mixins.adaptivValue('font-size', 30, 25, 1)}

  @media (any-hover:hover) {
    & {
      cursor: pointer;
      transition: all 0.3s ease 0s;
    }
    &:hover {
      color: ${vars.$colorMain};
    }
  }
`;

const Clip = styled(AttachFileOutlinedIcon)`
  ${Icon}
`;

const Emoji = styled(SentimentSatisfiedOutlinedIcon)`
  ${Icon}
`;

const Mic = styled(MicNoneOutlinedIcon)`
  ${Icon}
`;

const Send = styled(SendOutlinedIcon)`
  ${Icon}
`;

const Input = styled(TextField)`
  flex: 1 1 auto;
  background: transparent;
  margin-right: 10px;
  margin-left: 10px;

  & .MuiInputBase-root {
    padding: 0;
  }

  & textarea {
    ${mixins.adaptivValue('font-size', 21, 18, 1)}
    ${scrollbars(5, vars.$colorMain, '#334881', 5)}
  }

  & * {
    border: none;
    border-color: transparent !important;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
`;

const EmojiBody = styled.div`
  position: relative;
`;

const EmojiPickerBody = styled.div`
  position: absolute;
  right: -20px;
  bottom: calc(100% - 5px);
  padding: 10px;
`;

const EmojiPickerStyled = styled(EmojiPicker)`
  & * {
    ${scrollbars(5, vars.$colorMain, '#334881', 5)}
  }
`;
