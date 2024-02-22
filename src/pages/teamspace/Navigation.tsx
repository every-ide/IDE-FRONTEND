import useUserStore from '@/src/store/useUserStore';
import { IoChatbubble } from 'react-icons/io5';

const Navigation = () => {
  const { name } = { ...useUserStore((state) => state.user) };
  return (
    <nav className="flex h-12 items-center border-b-2 border-mdark bg-ldark px-1">
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
      <div className="ml-auto cursor-pointer">
        <h2>{name} 님</h2>
      </div>
    </nav>
  );
};

export default Navigation;
