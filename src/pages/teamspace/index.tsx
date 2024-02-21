import useActionWithKeyboard from '@/src/hooks/eventHook/actionWithKeyboard';
import useWebSocketStore from '@/src/store/useWebSocketStore';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../workspace/Navigation';
import Header from '../workspace/Header';
import { cn } from '@/src/utils/style';
import Footer from './Footer';
import WorkInfo from './WorkInfo';
import Editor from './Editor';
import Sidebar from './Sidebar';
import Chat from './Chat';

const TeamSpacePage = () => {
  const { connect, disconnect, webSocketService, isConnected } =
    useWebSocketStore();
  const { containerId } = useParams<{ containerId: string }>();
  const accessToken = localStorage.getItem('accessToken');

  const [isOpenWorkInfo, setIsOpenWorkInfo] = useActionWithKeyboard('j', true);
  const [isOpenChat, setIsOpenChat] = useActionWithKeyboard('c', false);

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
      webSocketService.subscribeToDestination(
        `/topic/room/${containerId}/enter`,
        (message) => {
          console.log('방입장으로 부터의 message', message);
        },
      );
    }
  }, [webSocketService, isConnected]);

  return (
    <div className="flex h-screen text-xs">
      <div className="flex flex-1 flex-col">
        <Navigation
          isTeamspace
          setIsOpenChat={setIsOpenChat}
          isOpenChat={isOpenChat}
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
      {isOpenChat && <Chat setIsOpenChat={setIsOpenChat} />}
    </div>
  );
};

export default TeamSpacePage;
