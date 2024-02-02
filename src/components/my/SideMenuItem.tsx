import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface ISideMenuItemProps {
  label: string;
  icon: ReactNode | null;
  link: string;
}

const SideMenuItem = ({ label, icon, link }: ISideMenuItemProps) => {
  return (
    <Link to={link}>
      <div
        className="
        flex
        flex-row
        gap-3
        px-6
        py-4
        bg-ldark
        rounded-xl
        hover:shadow-md
        hover:shadow-white
    "
      >
        {icon && icon}
        {label}
      </div>
    </Link>
  );
};

export default SideMenuItem;
