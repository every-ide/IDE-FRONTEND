import useLogout from '@/src/hooks/useLogout';
import { useState } from 'react';
import { AiOutlineCaretDown } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Avartar from '@/src/assets/images/placeholder.jpg';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const UserMenu = () => {
  const logout = useLogout();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <DropdownMenu onOpenChange={() => setIsOpen((state) => !state)}>
        <div className="inline-flex items-center justify-center gap-3 px-2">
          <div className="size-[40px] overflow-hidden rounded-lg">
            <img src={Avartar} alt="avatar" />
          </div>
          <DropdownMenuTrigger>
            <button
              className={`hover:text-accent  ${isOpen ? 'rotate-180 text-accent transition-transform duration-150' : 'rotate-0 transition-transform duration-150'}`}
            >
              <AiOutlineCaretDown size={18} />
            </button>
          </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent className="translate-x-[-35px] translate-y-4 border-accent/50 bg-mdark text-white shadow-md shadow-accent/50">
          <DropdownMenuItem className="focus:bg-ldark focus:text-accent">
            <Link to={'/my/info'}>
              <p>내 정보 수정</p>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={logout}
            className="focus:bg-ldark focus:text-accent"
          >
            로그아웃
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserMenu;
