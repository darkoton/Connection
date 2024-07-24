import styled from '@emotion/styled';
import { ListItem } from '@mui/material';
import * as mixins from '@/assets/style/modules/mixins.js';
import propTypes from 'prop-types';
import useChatStore from '@/stores/chat';
import useUserStore from '@/stores/user';
import Avatar from '@/components/User/Avatar';

Message.propTypes = {
  // children: propTypes.oneOfType([
  //   propTypes.string,
  //   propTypes.element,
  //   propTypes.number,
  // ]),
  data: propTypes.object,
};

export default function Message({ data }) {
  const { user: chatUser } = useChatStore();
  const { user } = useUserStore();

  return (
    <Body>
      <Avatar
        size={55}
        user={user.uid != data.userUid ? chatUser : user}
        alt="avatar"
      />
      <MessageMain blue={user.uid == data.userUid}>
        {data.media &&
          data.media.map(file => {
            const fileSplit = file.split('type%3D');
            if (fileSplit[fileSplit.length - 1].includes('image')) {
              return <MessageImg key={file} src={file} />;
            }
            return <div key={file}>{file}</div>;
          })}
        {data.text && <MessageText>{data.text}</MessageText>}
        <VectorMessage
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="15"
          viewBox="0 0 28 15"
          fill="none"
        >
          <link
            xmlns=""
            type="text/css"
            rel="stylesheet"
            id="dark-mode-custom-link"
          />
          <link
            xmlns=""
            type="text/css"
            rel="stylesheet"
            id="dark-mode-general-link"
          />
          <style
            xmlns=""
            lang="en"
            type="text/css"
            id="dark-mode-custom-style"
          />
          <style
            xmlns=""
            lang="en"
            type="text/css"
            id="dark-mode-native-style"
          />
          <style
            xmlns=""
            lang="en"
            type="text/css"
            id="dark-mode-native-sheet"
          />
          <script xmlns="" />
          <path
            d="M0.936997 12.2567L14 0.5L27.5 14L1.60596 14C0.689477 14 0.255779 12.8698 0.936997 12.2567Z"
            fill="white"
            stroke="white"
          />
          <script xmlns="" />
          <script xmlns="" />
        </VectorMessage>
      </MessageMain>
    </Body>
  );
}

const Body = styled(ListItem)`
  display: flex;
  align-items: flex-end;
`;

const MessageMain = styled.div`
  display: flex;
  flex-direction: column;
  padding: 9.5px 9px;
  background: #fff;
  ${props => props.blue && 'background: #85a7fc;'}
  & path {
    ${props => props.blue && `fill: #85a7fc; stroke: #85a7fc;`}
  }
  border-radius: 14px;
  position: relative;
  min-height: 40px;
  display: flex;
  align-items: center;
  color: #000;
  ${mixins.adaptivValue('margin-left', 20, 10, 1)}
  ${mixins.adaptivValue('font-size', 17, 14, 1)}
`;

const VectorMessage = styled.svg`
  position: absolute;
  left: 0;
  bottom: 3px;
  transform: translateX(-50%);
`;
const MessageText = styled.p`
  font-size: 16px;
`;

const MessageImg = styled.img``;
