import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useWebSocketStore from '@/src/store/useWebSocketStore';
import Sidebar from '../teamspace/Sidebar';
import Header from './Header';
import Navigation from './Navigation';
import Footer from '../teamspace/Footer';
import Editor from './Editor';
import WorkInfo from '../teamspace/WorkInfo';
import { cn } from '@/src/utils/style';
import useActionWithKeyboard from '@/src/hooks/eventHook/actionWithKeyboard';

const WorkspacePage = () => {
  const { connect, disconnect, webSocketService } = useWebSocketStore();
  const { containerId: projectId } = useParams<{ containerId: string }>();
  const accessToken = localStorage.getItem('accessToken');

  const [isOpenWorkInfo, setIsOpenWorkInfo] = useActionWithKeyboard('j', true);

  useEffect(() => {
    if (!projectId || !accessToken) {
      console.error('Project ID or Access Token is missing');
      return;
    }

    if (!webSocketService) {
      connect({ token: accessToken, projectId });
    }

    return () => {
      disconnect();
    };
  }, [projectId, accessToken]);

  return (
    <div className="flex h-screen flex-col text-xs">
      <Navigation isTeamspace={false} />
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="no-scrollbar relative flex flex-1 flex-col ">
          <Editor isTeamspace={false} />
          <div className={cn(isOpenWorkInfo ? 'block' : 'hidden')}>
            <WorkInfo setIsOpen={setIsOpenWorkInfo} />
          </div>
        </div>
      </div>
      <Footer setIsOpen={setIsOpenWorkInfo} isOpen={isOpenWorkInfo} />
    </div>
  );
};

export default WorkspacePage;
