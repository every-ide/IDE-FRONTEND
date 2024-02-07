import { useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Navigation from './Navigation';
import Footer from './Footer';
import Editor from './Editor';
import WorkInfo from './WorkInfo';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { WebSocketService } from '@/src/services/webSocketService';

interface ReceivedTerminalType {
  success: boolean;
  path: string;
  content: string;
}

const WorkspacePage = () => {
  // const accessToken = localStorage.getItem('accessToken');
  // const { workid: projectId } = useParams();
  const [isOpenWorkInfo, setIsOpenWorkInfo] = useState<boolean>(true);

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

  useEffect(() => {
    const webSocketClient = new WebSocketService({
      token: 'token-1',
      projectId: 'project-1',
    });

    webSocketClient.subscribeToTerminal(
      `/user/queue/room/project-1/terminal`,
      (ReceivedTerminal) => {
        const { success, path, content } = JSON.parse(
          ReceivedTerminal.body,
        ) as ReceivedTerminalType;
        console.log('received from server-> success', success);
        console.log('received from server-> path', path);
        console.log('received from server-> content', content);
        // if (success && content) {

        // }
        // if (xtermRef.current) {
        //   xtermRef.current.write(path + ': ');
        // }
        // setCurrentPath(path);
      },
    );
    webSocketClient.activate();

    return () => {
      console.log('해당 페이지 unMount');
      webSocketClient.deactivate();
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
          <Editor />
          {isOpenWorkInfo && <WorkInfo toggleTerminal={toggleTerminal} />}
        </div>
      </div>
      <Footer toggleTerminal={toggleTerminal} isOpenWorkInfo={isOpenWorkInfo} />
    </div>
  );
};

export default WorkspacePage;
