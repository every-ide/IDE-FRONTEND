import useLogout from '@src/hooks/useLogout';
import React, { useState } from 'react';
import { AiOutlineCaretDown } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const UserMenu = () => {
  const logout = useLogout();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="inline-flex items-center justify-center gap-3 px-2">
        <div className="size-[40px] overflow-hidden rounded-lg">
          <img src="/public/images/placeholder.jpg" />
        </div>
        <button
          onClick={() => setIsOpen((state) => !state)}
          className={`hover:text-accent  ${isOpen ? 'rotate-180 text-accent transition-transform duration-150' : 'rotate-0 transition-transform duration-150'}`}
        >
          <AiOutlineCaretDown size={18} />
        </button>
      </div>
      {isOpen && (
        <div className="absolute right-7 top-24 flex w-[130px] flex-col gap-3">
          <Link to={'/my/info'}>
            <button
              className="
                flex
                w-full
                flex-row
                justify-center
                gap-3
                rounded-2xl
                border-[0.5px]
                border-[#414141]
                bg-ldark
                px-4
                py-2
                text-sm
                shadow-md
                shadow-white/70
                hover:text-accent
                hover:shadow-accent
                active:scale-95
            "
            >
              내 정보 수정
            </button>
          </Link>
          <button
            onClick={logout}
            className="
                flex
                w-full
                flex-row
                justify-center
                gap-3
                rounded-2xl
                border-[0.5px]
                border-[#414141]
                bg-ldark
                px-4
                py-2
                text-sm
                shadow-md
                shadow-white/70
                hover:text-accent
                hover:shadow-accent
                active:scale-95
            "
          >
            로그아웃
          </button>
        </div>
      )}
    </>
  );
};

export default UserMenu;
