import styled from '@emotion/styled';
import { ListItem } from '@mui/material';
import * as mixins from '@/assets/style/modules/mixins';
import propTypes from 'prop-types';
import useChatStore from '@/stores/chat';
import useUserStore from '@/stores/user';
import Avatar from '@/components/User/Avatar';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

Message.propTypes = {
  // children: propTypes.oneOfType([
  //   propTypes.string,
  //   propTypes.element,
  //   propTypes.number,
  // ]),
  data: propTypes.object,
  showAvatar: propTypes.bool,
};

export default function Message({ data, showAvatar = true }) {
  const { user: chatUser } = useChatStore();
  const { user } = useUserStore();

  return (
    <Body>
      {showAvatar && (
        <Avatar
          size={45}
          user={user.uid != data.userUid ? chatUser : user}
          alt="avatar"
          adaptiv
        />
      )}
      <MessageMain blue={user.uid == data.userUid} noAvatar={!showAvatar}>
        <MessageContent blue={user.uid == data.userUid}>
          {data.imgs && (
            <PhotoProvider>
              {data.imgs.map(img => {
                return (
                  <PhotoView key={img} src={img}>
                    <MessageImg src={img} />
                  </PhotoView>
                );
              })}
            </PhotoProvider>
          )}

          {data.media &&
            data.media.map(file => (
              <MessageFile key={file}>
                <DownloadLink href={file} download>
                  <InsertDriveFileIcon />
                </DownloadLink>

                {file.split('name')[file.split('name').length - 2]}
              </MessageFile>
            ))}

          {data.text && <MessageText>{data.text}</MessageText>}
        </MessageContent>
        {data.text && showAvatar && (
          <VectorMessage
            className="vector"
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
        )}

        <Time className="time">
          {data.date
            .toDate()
            .toLocaleTimeString()
            .split(':')
            .slice(0, 2)
            .join(':')}
        </Time>
      </MessageMain>
    </Body>
  );
}

const Body = styled(ListItem)`
  display: flex;
  align-items: flex-end;
  width: 100%;
  max-width: 60%;
  ${mixins.adaptivIndent('padding', 4, 4, 16, 4, 1)}
`;

const MessageMain = styled.div`
  /* padding: 9.5px 9px; */
  & .vector path {
    ${props => props.blue && `fill: #85a7fc; stroke: #85a7fc;`}
  }
  position: relative;
  min-height: 40px;
  display: flex;
  align-items: flex-end;
  color: #000;
  ${mixins.adaptivValue('margin-left', 20, 15, 1)}
  ${mixins.adaptivValue('font-size', 17, 14, 1)} /* ${props =>
    props.noAvatar && mixins.adaptivValue('margin-left', 70, 60, 1)} */
    ${props => props.noAvatar && 'margin-left: 60px !important;'}

    @media (any-hover: hover) {
    &:hover {
      & .time {
        opacity: 1;
      }
    }
  }
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 14px;
  overflow: hidden;
  background: #fff;
  ${props => props.blue && 'background: #85a7fc;'}
`;

const VectorMessage = styled.svg`
  position: absolute;
  left: 0;
  bottom: 3px;
  transform: translateX(-50%);
`;
const MessageText = styled.pre`
  font-size: 16px;
  padding: 7px 10px;
  font-family: 'Roboto';
`;

const MessageImg = styled.img`
  max-height: 30vh;
  object-fit: cover;
  cursor: grab;
`;

const MessageFile = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  column-gap: 10px;
  padding: 7px 10px;

  svg {
    font-size: 30px;
    cursor: pointer;
  }
`;

const DownloadLink = styled.a`
  display: inline-block;
`;

const Time = styled.span`
  position: absolute;
  color: #666;
  right: 0%;
  top: 50%;
  transform: translateY(-50%) translateX(calc(100% + 10px));
  font-size: 12px;
  opacity: 0;
  user-select: none;
`;
