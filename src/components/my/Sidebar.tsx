import { FcDatabase, FcOpenedFolder, FcShare } from 'react-icons/fc';
import SideMenuItem from './SideMenuItem';
import { useLocation } from 'react-router-dom';

const Sidebar = () => {
  const { pathname } = useLocation();
  console.log(pathname);

  return (
    <div
      className="
        flex
        w-[45%]
        flex-col
        gap-5
        border-r-[2px]
        border-ldark
        p-5
        pt-7
        md:w-[40%]
        lg:w-[30%]
        xl:w-[20%]
    "
    >
      <SideMenuItem
        label="전체 컨테이너"
        icon={<FcDatabase size={24} />}
        link="/my/dashboard/containers"
        selected={pathname === '/my/dashboard/containers'}
      />
      <SideMenuItem
        label="내 컨테이너"
        icon={<FcOpenedFolder size={24} />}
        link="/my/dashboard/containers/own"
        selected={pathname === '/my/dashboard/containers/own'}
      />
      <SideMenuItem
        label="공유된 컨테이너"
        icon={<FcShare size={24} />}
        link="/my/dashboard/containers/shared"
        selected={pathname === '/my/dashboard/containers/shared'}
      />
    </div>
  );
};

export default Sidebar;
