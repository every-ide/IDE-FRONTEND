import { FC } from 'react';
import { IoChatbubble } from 'react-icons/io5';

interface NavigationProps {
  isTeamspace: boolean;
  setIsOpenChat?: (isOpenChat: boolean) => void;
  isOpenChat?: boolean;
  isNewChat?: boolean;
}

const Navigation: FC<NavigationProps> = ({
  isTeamspace = false,
  setIsOpenChat,
  isOpenChat,
  isNewChat,
}) => {
  return (
    <nav className="flex h-8  border-b-2 border-mdark bg-ldark px-1">
      <div className="flex grow items-center">
        <h2 className="cursor-pointer text-base">EveryIDE</h2>
        {/* <ul className="ml-4 flex cursor-pointer items-center gap-2">
          <li className="px-2 py-1 hover:bg-gray-700">파일</li>
          <li className="px-2 py-1 hover:bg-gray-700">편집</li>
          <li className="px-2 py-1 hover:bg-gray-700">프로젝트</li>
          <li className="px-2 py-1 hover:bg-gray-700">컨테이너</li>
          <li className="px-2 py-1 hover:bg-gray-700">창</li>
        </ul> */}
      </div>
      {isTeamspace && (
        <div className="relative flex cursor-pointer items-center pr-2">
          {isNewChat && (
            <div className="absolute right-1.5 top-1.5 size-2.5 rounded-full bg-error" />
          )}
          <IoChatbubble
            className="size-5 cursor-pointer transition-all hover:text-gray-400"
            onClick={() => setIsOpenChat?.(!isOpenChat)}
          />
        </div>
      )}
    </nav>
  );
};

export default Navigation;
