import { useEffect, useRef } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Navigation from './Navigation';
import Footer from './Footer';
import Editor from './Editor';
import WorkInfo from './WorkInfo';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const WorkspacePage = () => {
  const { workid: projectId } = useParams<{ workid: string }>();
  const accessToken = localStorage.getItem('accessToken');
  const [isOpenWorkInfo, setIsOpenWorkInfo] = useState<boolean>(true);
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    if (!projectId || !accessToken) {
      console.error('Project ID or Access Token is missing');
      return;
    }
    connect();
    return () => disconnect();
  }, [projectId, accessToken]);

  const connect = () => {
    console.log('connect 실행', clientRef.current);
    clientRef.current = new Client({
      // brokerURL: 'wss://socketsbay.com/wss/v2/1/demo',
      webSocketFactory: () => new SockJS('http://43.203.66.34:8000/ws'),
      connectHeaders: {},
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        // 구독실행
        console.log('연결되었습니다!');
      },
      onStompError: (frame) => {
        console.log('연결실패하엿습니다!');
        console.error(frame);
      },
    });
    console.log('!!', clientRef.current);
    clientRef.current.activate();
  };

  const disconnect = () => {
    clientRef.current?.deactivate();
  };

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
