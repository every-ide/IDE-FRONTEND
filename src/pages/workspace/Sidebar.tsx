import Arborist from '@/src/components/ui/IDE/FileTree';
import { useState } from 'react';
import { IoBagSharp } from 'react-icons/io5';
import { IoMdGitBranch } from 'react-icons/io';
import { cn } from '@/utils/style';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const Sidebar = () => {
  const [projectOpen, setProjectOpen] = useState(true);
  const toggleProjectOpen = () => {
    setProjectOpen((projectOpen) => !projectOpen);
  };
  return (
    <div className="flex">
      <aside className="w-10 overflow-y-auto border-r-2 border-mdark">
        <ul className="space-y-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <li
                  className={cn(
                    'cursor-pointer  p-1 hover:bg-gray-600',
                    projectOpen ? 'border-l-2 border-accent text-accent' : '',
                  )}
                  onClick={toggleProjectOpen}
                >
                  <IoBagSharp className="size-6 w-full " />
                </li>
              </TooltipTrigger>
              <TooltipContent side="right" align="start">
                <p>프로젝트</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <li className="cursor-pointer p-1 hover:bg-gray-600">
            <IoMdGitBranch className="size-6 w-full " />
          </li>
        </ul>
      </aside>
      {projectOpen && (
        <aside className="flex w-72 flex-col overflow-hidden pt-2">
          <Arborist />
        </aside>
      )}
    </div>
  );
};

export default Sidebar;
