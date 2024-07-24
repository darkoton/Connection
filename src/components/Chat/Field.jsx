import styled from '@emotion/styled';
import { css } from '@emotion/react';
import * as mixins from '@/assets/style/modules/mixins.js';
import vars from '@/assets/style/modules/vars.js';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined';
import { useState, useRef } from 'react';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import EmojiPicker from 'emoji-picker-react';
import { scrollbars } from '@/assets/style/modules/mixins';
import TextField from '@mui/material/TextField';
import useChatStore from '@/stores/chat.js';
import useUserStore from '@/stores/user.js';
import { addData, updateData, getData } from '@/utils/firestore.js';
import { uploadFile } from '@/utils/storage.js';
import { Timestamp } from 'firebase/firestore';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CloseIcon from '@mui/icons-material/Close';

export default function Field() {
  const [text, setText] = useState('');
  const [files, setFiles] = useState([]);
  const [previewImg, setPreviewImg] = useState(null);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const { chat, user: chatUser, setChat, scrollDown } = useChatStore();
  const { user } = useUserStore();
  const fileInput = useRef(null);

  function selectEmoji(e) {
    setText(text + e.emoji);
  }

  function selectFiles(e) {
    setFiles(e.target.files);
    getImgLink(e.target.files[0]);
  }

  function resetFiles() {
    fileInput.current.value = '';
    setFiles([]);
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

    if (!text.trim() && !files.length) {
      return;
    }

    if (!chat) {
      id = (
        await addData(['chats'], {
          pair: [user.uid, chatUser.uid],
        })
      ).id;

      await updateData(['chats', id], { id });
      setChat(await getData(['chats', id]));
    }
    const urls = await uploadFile(['chats', chat.id], files);
    await addData(['chats', chat.id || id, 'messages'], {
      text,
      date: Timestamp.fromDate(new Date()),
      check: false,
      userUid: user.uid,
      media: urls,
    });
    setText('');
    setFiles([]);
    scrollDown();
  }

  function getImgLink(file) {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPreviewImg(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }

  return (
    <Body>
      {!!files.length && (
        <Top>
          <FilesOutput>
            <FilesOutputLeft>
              {files[0].type.includes('image') ? (
                <ImgPreview src={previewImg} />
              ) : (
                <FilePreview>
                  <InsertDriveFileIcon />
                  {files[0].name}
                </FilePreview>
              )}
              {!!(files.length - 1) && (
                <OtherFiles>+{files.length - 1} files</OtherFiles>
              )}
            </FilesOutputLeft>

            <ResetFile onClick={resetFiles} />
          </FilesOutput>
        </Top>
      )}

      <Main>
        <FileInput
          ref={fileInput}
          id="files"
          type="file"
          multiple
          onChange={selectFiles}
        />
        <label htmlFor="files">
          <Clip />
        </label>
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

          {text || files.length ? <Send onClick={send} /> : <Mic />}
        </Actions>
      </Main>
    </Body>
  );
}

const Body = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  background: ${vars.$colorChat};
  ${mixins.adaptivIndent('padding', 17, 12, 20, 16, 1)}
`;

const Top = styled.div`
  display: flex;
  align-items: center;
`;

const Main = styled.div`
  display: flex;
  align-items: flex-end;
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

const FileInput = styled.input`
  display: none;
`;

const FilesOutput = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const FilesOutputLeft = styled.div`
  display: flex;
  align-items: center;
  column-gap: 5px;
`;

const OtherFiles = styled.span`
  color: #fff;
`;

const ImgPreview = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
`;

const FilePreview = styled.div`
  display: flex;
  align-items: center;
`;

const ResetFile = styled(CloseIcon)`
  font-size: 30px;
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
