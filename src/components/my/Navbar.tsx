import { Link, useLocation } from 'react-router-dom';
import { FcDatabase, FcOpenedFolder, FcShare } from 'react-icons/fc';
import SearchBar from './SearchBar';

const NavigationBar: React.FC = () => {
  const location = useLocation(); // 현재 위치 정보를 가져옵니다.

  // 경로가 활성 링크인지 확인하는 함수
  const isActiveLink = (path: string): boolean => {
    return location.pathname === path;
  };

  return (
    <nav className="flex h-16  bg-ldark">
      <div className="container flex justify-between">
        <div className="flex items-center">
          <Link
            to="/my/dashboard/containers"
            className={`flex h-full items-center border-b-4 px-6 py-2 text-white ${isActiveLink('/my/dashboard/containers') ? 'border-blue-400' : 'border-transparent'}`}
          >
            <FcDatabase size={24} className="mr-2" />
            전체 컨테이너
          </Link>
          <Link
            to="/my/dashboard/containers/own"
            className={`flex h-full items-center border-b-4 px-6 py-2 text-white ${isActiveLink('/my/dashboard/containers/own') ? 'border-blue-400' : 'border-transparent'}`}
          >
            <FcOpenedFolder size={24} className="mr-2" />내 컨테이너
          </Link>
          <Link
            to="/my/dashboard/containers/shared"
            className={`flex h-full items-center border-b-4 px-6 py-2 text-white ${isActiveLink('/my/dashboard/containers/shared') ? 'border-blue-400' : 'border-transparent'}`}
          >
            <FcShare size={24} className="mr-2" />
            공유된 컨테이너
          </Link>
        </div>
        <SearchBar />
      </div>
    </nav>
  );
};

export default NavigationBar;
