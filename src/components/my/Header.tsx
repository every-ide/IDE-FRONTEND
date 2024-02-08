import { IoPlanetOutline } from 'react-icons/io5';
import { Link, useLocation } from 'react-router-dom';
import UserMenu from './UserMenu';

const Header = () => {
  const location = useLocation();

  // Check if the current path includes '/together'
  const linkPath = location.pathname.includes('/together')
    ? '/together'
    : '/my/dashboard/containers';

  return (
    <header
      className="
      sticky
      top-0
      flex
      flex-row
      justify-between
      bg-ldark
      p-4
      pt-6
    "
    >
      {/* 임시 로고 */}
      <div className="inline-flex items-center px-4 text-2xl font-black">
        <Link to={linkPath}>EVERYIDE</Link>
      </div>
      {/* 우측 메뉴 */}
      <div className="flex flex-row gap-6">
        {/* 커뮤니티 페이지로 이동 */}
        <Link to={'/together'}>
          <div className="inline-flex items-center gap-2 rounded-xl border-[1px] border-[#414141] bg-mdark p-3 text-sm hover:text-accent active:scale-95">
            <IoPlanetOutline size={20} />
            <p>Connect with Everyone!</p>
          </div>
        </Link>
        {/* 유저 메뉴 */}
        <UserMenu />
      </div>
    </header>
  );
};

export default Header;
