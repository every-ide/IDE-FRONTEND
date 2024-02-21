import useActionWithKeyboard from '@/src/hooks/eventHook/actionWithKeyboard';
import useWebSocketStore from '@/src/store/useWebSocketStore';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../workspace/Navigation';
import Header from '../workspace/Header';
import { cn } from '@/src/utils/style';
import Footer from './Footer';
import WorkInfo from './WorkInfo';
import Editor from './Editor';
import Sidebar from './Sidebar';
import Chat from './Chat';

export interface messageListProps {
  userId: number;
  name: string;
  content: string;
}

const TeamSpacePage = () => {
  const { connect, disconnect, webSocketService, isConnected } =
    useWebSocketStore();
  const { containerId } = useParams<{ containerId: string }>();
  const accessToken = localStorage.getItem('accessToken');

  const [isOpenWorkInfo, setIsOpenWorkInfo] = useActionWithKeyboard('j', true);
  const [isOpenChat, setIsOpenChat] = useActionWithKeyboard('c', false);

  const [messageList, setMessageList] = useState<messageListProps[]>([]);
  const [isNewChat, setIsNewChat] = useState<boolean>(false);

  // websocket connection
  useEffect(() => {
    if (!containerId || !accessToken) {
      console.error('Project ID or Access Token is missing');
      return;
    }

    if (!webSocketService) {
      connect({ token: accessToken, projectId: containerId });
    }

    return () => {
      // TODO: 창을 닫을때 정상적으로 소켓 Disconnect 되는지 확인
      disconnect();
    };
  }, [containerId, accessToken]);

  useEffect(() => {
    if (webSocketService && isConnected) {
      // 유저입장 구독
      webSocketService.subscribeToDestination(
        `/app/container/${containerId}/enter`,
        (message) => {
          console.log('방입장으로 부터의 message', JSON.parse(message.body));
        },
        accessToken!,
        containerId,
      );
      // 유저리스트, 채팅목록
      webSocketService.subscribeToDestination(
        `/topic/container/${containerId}/state`,
        (message) => {
          console.log('현재유저정보 리스트 message', JSON.parse(message.body));
          const { messages } = JSON.parse(message.body);
          // TODO: array server측에서 미리 뒤집기
          setMessageList(messages.reverse());
        },
      );

      // 채팅 구독
      webSocketService.subscribeToDestination(
        `/topic/container/${containerId}/chat`,
        (message) => {
          console.log('채팅으로 부터 구독', JSON.parse(message.body));
          const newChat = JSON.parse(message.body);
          setMessageList((prevMessageList) => [...prevMessageList!, newChat]);
        },
      );
    }
    // unsubscribe 고려
  }, [webSocketService, isConnected]);

  useEffect(() => {
    if (isOpenChat) {
      setIsNewChat(false);
    }
  }, [isOpenChat]);

  useEffect(() => {
    if (!isOpenChat && messageList?.length > 0) {
      setIsNewChat(true);
    }
  }, [messageList]);

  return (
    <div className="flex h-screen text-xs">
      <div className="flex flex-1 flex-col">
        <Navigation
          isTeamspace
          setIsOpenChat={setIsOpenChat}
          isOpenChat={isOpenChat}
          isNewChat={isNewChat}
        />
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div className="no-scrollbar relative flex flex-1 flex-col ">
            <Editor />
            <div className={cn(isOpenWorkInfo ? 'block' : 'hidden')}>
              <WorkInfo setIsOpen={setIsOpenWorkInfo} />
            </div>
          </div>
        </div>
        <Footer setIsOpen={setIsOpenWorkInfo} isOpen={isOpenWorkInfo} />
      </div>
      {isOpenChat && (
        <Chat setIsOpenChat={setIsOpenChat} messageList={messageList} />
      )}
    </div>
  );
};

export default TeamSpacePage;
