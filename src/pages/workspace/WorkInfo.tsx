import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FC } from 'react';
import { FaXmark } from 'react-icons/fa6';
interface WorkInfoProps {
  toggleTerminal: () => void;
}
const WorkInfo: FC<WorkInfoProps> = ({ toggleTerminal }) => {
  // TODO: draggable -> dynamic height
  return (
    <div className="bg-mdark">
      <Tabs
        defaultValue="terminal"
        className="h-52 w-full border-l-2 border-mdark"
      >
        <div className="flex items-center justify-between border-b-2 border-mdark bg-ldark">
          <TabsList>
            <TabsTrigger value="debug">디버그</TabsTrigger>
            <TabsTrigger value="terminal">터미널</TabsTrigger>
            <TabsTrigger value="search">검색</TabsTrigger>
          </TabsList>
          <div className="pr-2">
            <FaXmark
              className="size-4 cursor-pointer"
              onClick={toggleTerminal}
            />
          </div>
        </div>
        <TabsContent value="debug">디버그 탭입니다.</TabsContent>
        <TabsContent value="terminal">터미널 탭입니다.</TabsContent>
        <TabsContent value="search">검색 탭입니다.</TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkInfo;
