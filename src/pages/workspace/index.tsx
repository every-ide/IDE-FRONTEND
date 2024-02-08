import { useEffect, useRef } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Navigation from './Navigation';
import Footer from './Footer';
import Editor from './Editor';
import WorkInfo from './WorkInfo';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useWebSocketStore from '@/src/store/useWebSocketStore';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const WorkspacePage = () => {
  const { workid: projectId } = useParams<{ workid: string }>();
  const accessToken = localStorage.getItem('accessToken');
  const [isOpenWorkInfo, setIsOpenWorkInfo] = useState<boolean>(true);
  const clientRef = useRef<Client | null>(null);
  const connect = useWebSocketStore((state) => state.connect);
  const webSocketService = useWebSocketStore((state) => state.webSocketService);

  useEffect(() => {
    if (!projectId || !accessToken) {
      console.error('Project ID or Access Token is missing');
      return;
    }

    if (!webSocketService) {
      const webSocketOptions = {
        token: accessToken,
        projectId: projectId,
      };
      connect(webSocketOptions);
    }

    return () => {
      useWebSocketStore.getState().disconnect();
    };
  }, [connect]);
  // useEffect(() => {
  //   if (!projectId || !accessToken) {
  //     console.error('Project ID or Access Token is missing');
  //     return;
  //   }

  //   // Client 인스턴스 생성 및 설정
  //   const client = new Client({
  //     webSocketFactory: () => new SockJS('http://localhost:8000/ws'),
  //     connectHeaders: {
  //       // 인증 토큰 등 필요한 헤더 정보
  //     },
  //     debug: (str) => {
  //       console.log(str);
  //     },
  //     reconnectDelay: 5000,
  //     heartbeatIncoming: 4000,
  //     heartbeatOutgoing: 4000,
  //   });

  //   client.onConnect = (frame) => {
  //     console.log('Connected: ' + frame);
  //     // 연결 성공 시 로직, 예: 구독 설정
  //   };

  //   client.onStompError = (frame) => {
  //     console.log('Broker reported error: ' + frame.headers['message']);
  //     console.log('Additional details: ' + frame.body);
  //   };

  //   client.onWebSocketError = (evt) => {
  //     console.error('WebSocket connection error: ', evt);
  //   };

  //   client.activate();
  //   clientRef.current = client;
  //   return () => {
  //     // 컴포넌트 언마운트 시 연결 해제
  //     client.deactivate();
  //   };
  // }, [projectId, accessToken]);

  useEffect(() => {
    const toggleWorkInfo = (event: KeyboardEvent) => {
      if (event.key === 'j' && (event.metaKey || event.ctrlKey)) {
        // Mac의 Cmd 키 또는 Windows/Linux의 Ctrl 키와 J 키를 체크
        event.preventDefault();
        setIsOpenWorkInfo((prevState) => !prevState);
      }
    };

    window.addEventListener('keydown', toggleWorkInfo);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거
    return () => {
      window.removeEventListener('keydown', toggleWorkInfo);
    };
  }, []);

  const toggleTerminal = () => {
    setIsOpenWorkInfo((prevState) => !prevState);
  };

  return (
    <div className="flex h-screen flex-col text-xs">
      <Navigation />
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="no-scrollbar relative flex flex-1 flex-col ">
          {/* <Editor /> */}
          {/* {isOpenWorkInfo && <WorkInfo toggleTerminal={toggleTerminal} />} */}
        </div>
      </div>
      <Footer toggleTerminal={toggleTerminal} isOpenWorkInfo={isOpenWorkInfo} />
    </div>
  );
};

export default WorkspacePage;
