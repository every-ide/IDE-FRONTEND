import { FC } from 'react';
import { sidebarProps } from './Sidebar';
import { cn } from '@/src/utils/style';
import { getColorForUserId } from '@/src/utils/helper';
import { RiTeamLine } from 'react-icons/ri';
import useUserStore from '@/src/store/useUserStore';
import Avatar from 'boring-avatars';

const UserList: FC<sidebarProps> = ({ userList }) => {
  const { user: me } = useUserStore();
  return (
    <div className="">
      <div className="flex h-12 items-center border-b-2 border-mdark px-4">
        <RiTeamLine className="size-6" />
        <h2 className="pl-2 text-xl">접속중</h2>
      </div>
      <ul className="flex flex-col gap-4 p-4 text-xl">
        {userList?.map((user) => (
          <li key={user.userId} className="flex gap-2">
            <Avatar
              name={user.name}
              size={40}
              variant="beam"
              colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
            />
            <div className="text-base">
              {user.name}
              <span className="ml-2 text-xs text-gray-400">({user.email})</span>
              {user.userId === me?.userId && (
                <span className="ml-2 text-xs font-semibold text-accent">
                  나
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
