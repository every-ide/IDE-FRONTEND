import Sidebar from './Sidebar';
import Header from './Header';
import Navigation from './Navigation';
import Footer from './Footer';
import Editor from './Editor';
import WorkInfo from './WorkInfo';
import { useState } from 'react';

const WorkspacePage = () => {
  const [isOpenWorkInfo, setIsOpenWorkInfo] = useState<boolean>(true);
  return (
    <div className="flex h-screen flex-col text-xs">
      <Navigation />
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="relative flex flex-1 flex-col">
          <Editor />
          {isOpenWorkInfo && <WorkInfo />}
        </div>
      </div>
      <Footer
        setIsOpenWorkInfo={setIsOpenWorkInfo}
        isOpenWorkInfo={isOpenWorkInfo}
      />
    </div>
  );
};

export default WorkspacePage;
