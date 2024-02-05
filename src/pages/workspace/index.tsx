import { useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Navigation from './Navigation';
import Footer from './Footer';
import Editor from './Editor';
import WorkInfo from './WorkInfo';
import { useState } from 'react';

const WorkspacePage = () => {
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
  const toggleTerminal = () => {
    setIsOpenWorkInfo((prevState) => !prevState);
  };

  return (
    <div className="flex h-screen flex-col text-xs">
      <Navigation />
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="relative flex flex-1 flex-col">
          <Editor />
          {isOpenWorkInfo && <WorkInfo toggleTerminal={toggleTerminal} />}
        </div>
      </div>
      <Footer toggleTerminal={toggleTerminal} isOpenWorkInfo={isOpenWorkInfo} />
    </div>
  );
};

export default WorkspacePage;
