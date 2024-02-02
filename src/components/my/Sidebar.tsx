import { FcOpenedFolder } from "react-icons/fc";
import SideMenuItem from "./SideMenuItem";

const Sidebar = () => {
  return (
    <div
      className="
        flex
        flex-col
        gap-5
        w-[20%]
        p-5
        pt-7
        border-r-[2px]
        border-ldark
    "
    >
      <SideMenuItem
        label="전체 컨테이너"
        icon={<FcOpenedFolder size={24} />}
        link="/my/dashboard/containers"
      />
      <SideMenuItem
        label="📂 내 컨테이너"
        icon={null}
        link="/my/dashboard/containers/own"
      />
      <SideMenuItem
        label="📂 공유된 컨테이너"
        icon={null}
        link="/my/dashboard/containers/shared"
      />
    </div>
  );
};

export default Sidebar;
