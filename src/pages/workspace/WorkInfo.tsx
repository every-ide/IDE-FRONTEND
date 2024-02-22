import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FC, useState } from 'react';
import { FaXmark } from 'react-icons/fa6';
import { Resizable } from 're-resizable';
import Terminal from './Terminal';
interface WorkInfoProps {
  toggleTerminal?: () => void;
}
const WorkInfo: FC<WorkInfoProps> = ({ toggleTerminal }) => {
  const [cancelHovered, setCancelHovered] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState('terminal');

  const handleTabClick = (tabValue: string) => {
    setActiveTab(tabValue);
  };

  return (
    <div className="border-l-2 border-mdark bg-mdark">
      <Resizable
        defaultSize={{
          height: '300px',
          width: '100%',
        }}
        enable={{
          top: true, // 위쪽으로만 리사이징 가능
          right: false,
          bottom: false,
          left: false,
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false,
        }}
      >
        <Tabs defaultValue="terminal">
          <div className="flex items-center justify-between border-b-2 border-mdark bg-ldark">
            <TabsList>
              <TabsTrigger value="debug">디버그</TabsTrigger>
              <TabsTrigger value="terminal">터미널</TabsTrigger>
              <TabsTrigger value="search">검색</TabsTrigger>
            </TabsList>
            <div
              className="pr-2"
              onMouseEnter={() => setCancelHovered(true)}
              onMouseLeave={() => setCancelHovered(false)}
            >
              <div className="flex size-3 cursor-pointer items-center justify-center rounded-full bg-[#FF605C]">
                {cancelHovered && (
                  <FaXmark
                    className="size-[0.6rem] text-gray-600"
                    onClick={toggleTerminal}
                  />
                )}
              </div>
            </div>
          </div>
          <TabsContent value="debug">디버그 탭입니다.</TabsContent>
          <TabsContent value="terminal" className="ml-0 mt-0 bg-black">
            <Terminal />
          </TabsContent>
          <TabsContent value="search">검색 탭입니다.</TabsContent>
        </Tabs>
        <div>
          <div>
            <button onClick={() => setActiveTab('debug')}>디버그</button>
            <button onClick={() => setActiveTab('terminal')}>터미널</button>
            <button onClick={() => setActiveTab('search')}>검색</button>
          </div>
          <div style={{ display: activeTab === 'debug' ? 'block' : 'none' }}>
            <div>디버그 탭입니다.</div>
          </div>
          <div style={{ display: activeTab === 'terminal' ? 'block' : 'none' }}>
            <Terminal />
          </div>
          <div style={{ display: activeTab === 'search' ? 'block' : 'none' }}>
            <div>검색 탭입니다.</div>
          </div>
        </div>
      </Resizable>
    </div>
  );
};

export default WorkInfo;
