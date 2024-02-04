import Arborist from '@src/components/ui/IDE/FileTree';
import { useState } from 'react';
import { IoBagSharp } from 'react-icons/io5';
import { IoMdGitBranch } from 'react-icons/io';

const Sidebar = () => {
  const [projectOpen, setProjectOpen] = useState(true);

  return (
    <div className="flex h-full overflow-y-auto bg-ldark">
      <aside className="w-10 border-r-2 border-mdark">
        <ul className="space-y-2">
          <li className="cursor-pointer p-1 hover:bg-gray-600 ">
            <IoBagSharp className="size-6 w-full " />
          </li>
          <li className="cursor-pointer p-1 hover:bg-gray-600 ">
            <IoMdGitBranch className="size-6 w-full " />
          </li>
        </ul>
      </aside>
      <aside className="w-72">
        <Arborist />
      </aside>
    </div>
  );
};

export default Sidebar;
