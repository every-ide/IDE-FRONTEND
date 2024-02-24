import { IoPlanetOutline } from 'react-icons/io5';
import { Link, useLocation } from 'react-router-dom';
import UserMenu from './UserMenu';
import { GoRocket } from 'react-icons/go';
import backgroundImage from '@/src/assets/images/universe.jpg';

const Header = () => {
  const { pathname } = useLocation();

  // Check if the current path includes '/together'
  const linkPath = pathname.includes('/together')
    ? '/together'
    : '/my/dashboard/containers';

  return (
    <header
      className="
      sticky
      top-0
      z-10
      h-16
      border-b
      border-b-ldark
      bg-ldark
      p-4
    "
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
      }}
    >
      <div className="container flex w-full justify-between">
        {/* 임시 로고 */}
        <div className="inline-flex items-center px-4 text-2xl font-black">
          <Link to={linkPath}>EVERYIDE</Link>
        </div>
        {/* 우측 메뉴 */}
        <div className="relative flex flex-row gap-6">
          {/* 커뮤니티 페이지로 이동 */}
          {linkPath !== '/together' ? (
            <Link to={'/together'}>
              <div className="inline-flex items-center gap-2 rounded-xl border-[1px] border-[#414141] bg-mdark p-3 text-sm hover:border-accent hover:text-accent active:scale-95">
                <IoPlanetOutline size={20} />
                {/* <p>Connect with Everyone!</p> */}
                <p>커뮤니티 페이지로 가기</p>
              </div>
            </Link>
          ) : (
            <Link to={'/my/dashboard/containers'}>
              <div className="inline-flex items-center gap-2 rounded-xl border-[1px] border-[#414141] bg-mdark p-3 text-sm hover:border-accent hover:text-accent active:scale-95">
                <GoRocket size={18} />
                {/* <p>My Containers</p> */}
                <p>내 컨테이너로 가기</p>
              </div>
            </Link>
          )}

          {/* 유저 메뉴 */}
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
