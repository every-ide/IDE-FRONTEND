import { FC } from 'react';
import { IoChatbubble } from 'react-icons/io5';

interface NavigationProps {
  isTeamspace: boolean;
  setIsOpenChat?: (isOpenChat: boolean) => void;
  isOpenChat?: boolean;
}

const Navigation: FC<NavigationProps> = ({
  isTeamspace = false,
  setIsOpenChat,
  isOpenChat,
}) => {
  return (
    <nav className="flex h-8  border-b-2 border-mdark bg-ldark px-1">
      <div className="flex grow items-center">
        <h2 className="cursor-pointer text-base">EveryIDE</h2>
        <ul className="ml-4 flex cursor-pointer items-center gap-2">
          <li className="px-2 py-1 hover:bg-gray-700">파일</li>
          <li className="px-2 py-1 hover:bg-gray-700">편집</li>
          <li className="px-2 py-1 hover:bg-gray-700">프로젝트</li>
          <li className="px-2 py-1 hover:bg-gray-700">컨테이너</li>
          <li className="px-2 py-1 hover:bg-gray-700">창</li>
        </ul>
      </div>
      {isTeamspace && (
        <div className="flex cursor-pointer items-center">
          {/* TODO: message 오면 red label */}
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
