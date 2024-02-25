import useActionWithKeyboard from '@/src/hooks/eventHook/actionWithKeyboard';
import useWebSocketStore from '@/src/store/useWebSocketStore';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../workspace/Navigation';
import Header from '../workspace/Header';
import { cn } from '@/src/utils/style';
import Footer from './Footer';
import WorkInfo from './WorkInfo';
import Editor from '../workspace/Editor';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { Helmet } from 'react-helmet-async';

export interface messageListProps {
  userId: number;
  name: string;
  content: string;
}

export interface userListProps {
  userId: number;
  name: string;
  email: string;
  containerId: string;
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

  const [userList, setUserList] = useState<userListProps[]>([]);

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
      disconnect();
    };
  }, [containerId, accessToken]);

  useEffect(() => {
    if (webSocketService && isConnected) {
      // 유저입장 구독
      webSocketService.subscribeToDestination(
        `/app/container/${containerId}/enter`,
        (message) => {
          console.log(
            '커뮤니티 입장으로 부터의 message',
            JSON.parse(message.body),
          );
        },
        accessToken!,
        containerId,
      );
      // 유저리스트, 채팅목록
      webSocketService.subscribeToDestination(
        `/topic/container/${containerId}/state`,
        (message) => {
          console.log('현재유저정보 리스트 message', JSON.parse(message.body));
          const { userSessions } = JSON.parse(message.body);
          setUserList(userSessions);
        },
      );

      // 채팅 구독
      webSocketService.subscribeToDestination(
        `/topic/container/${containerId}/chat`,
        (message) => {
          console.log('채팅으로 부터 구독', JSON.parse(message.body));
          const newChat = JSON.parse(message.body);
          setMessageList((prevMessageList) => [...prevMessageList, newChat]);
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
    <>
      <Helmet>
        <title>EVERYIDE - Team Space</title>
      </Helmet>
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
            <Sidebar userList={userList} />
            <div className="no-scrollbar relative flex flex-1 flex-col ">
              <Editor isTeamspace />
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
    </>
  );
};

export default TeamSpacePage;
