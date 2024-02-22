import Arborist from '@/src/components/ui/IDE/FileTree';
import { FC, useState } from 'react';
import { IoBagSharp } from 'react-icons/io5';
import { FaRegUser } from 'react-icons/fa';
import { cn } from '@/utils/style';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import UserList from './UserList';
import { userListProps } from '.';

export interface sidebarProps {
  userList?: userListProps[];
}

const Sidebar: FC<sidebarProps> = ({ userList }) => {
  const [projectOpen, setProjectOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('project');

  const handleTabSelection = (target: string) => {
    if (activeTab === target) {
      setProjectOpen(!projectOpen);
      if (projectOpen) {
        setActiveTab('');
      }
    } else {
      setActiveTab(target);
      setProjectOpen(true);
    }
  };
  return (
    <div className="flex">
      <aside className="w-10 overflow-y-auto border-r-2 border-mdark">
        <ul className="space-y-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="w-full">
                <li
                  className={cn(
                    'cursor-pointer p-1 hover:bg-gray-600',
                    activeTab === 'project' &&
                      'border-l-2 border-accent text-accent',
                  )}
                  onClick={() => handleTabSelection('project')}
                >
                  <IoBagSharp className="size-6 w-full " />
                </li>
              </TooltipTrigger>
              <TooltipContent side="right" align="start">
                <p>프로젝트</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="w-full">
                <li
                  className={cn(
                    'cursor-pointer p-1 hover:bg-gray-600',
                    activeTab === 'user' &&
                      'border-l-2 border-accent text-accent',
                  )}
                  onClick={() => handleTabSelection('user')}
                >
                  <FaRegUser className="size-6 w-full " />
                </li>
              </TooltipTrigger>
              <TooltipContent side="right" align="start">
                <p>참가인원</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </ul>
      </aside>
      {projectOpen && (
        <aside className="flex w-72 flex-col overflow-hidden pt-2">
          {/* <Arborist /> */}
          {activeTab === 'project' && <Arborist />}
          {activeTab === 'user' && <UserList userList={userList} />}
        </aside>
      )}
    </div>
  );
};

export default Sidebar;
