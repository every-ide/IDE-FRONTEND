import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ISideMenuItemProps {
  label: string;
  icon: ReactNode | null;
  link: string;
  selected: boolean;
}

const SideMenuItem = ({ label, icon, link, selected }: ISideMenuItemProps) => {
  return (
    <Link to={link}>
      <div
        className={`
        flex
        flex-row
        gap-3
        rounded-2xl
        bg-ldark
        px-6
        py-4
        active:scale-95
        ${selected ? 'border-[2px] border-accent text-accent' : ''}
        ${!selected ? 'hover:border-[0.5px] hover:border-neutral-500 hover:text-white hover:shadow-md hover:shadow-white/70' : ''}
    `}
      >
        {icon && icon}
        {label}
      </div>
    </Link>
  );
};

export default SideMenuItem;
