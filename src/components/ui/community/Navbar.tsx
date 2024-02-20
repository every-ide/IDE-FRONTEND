import React, { useState } from 'react';
import { RiDeleteBack2Line } from 'react-icons/ri';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const NavigationBar: React.FC = () => {
  const [searchkey, setSearchKey] = useState<string>('');
  const [activeLink, setActiveLink] = useState<string>('');
  // TODO: a tag 대신에 Link(react-router-dom)사용 해야함
  return (
    <nav className="flex h-16 justify-between bg-ldark px-4">
      <div className="flex items-center">
        <Link
          to={'/together'}
          className={`flex h-full items-center border-b-4  px-6 py-2 text-white ${activeLink === 'home' ? 'border-blue-400' : 'border-transparent'}`}
        >
          전체
        </Link>
        <Link
          to={'/together/memtors'}
          className={`flex h-full items-center border-b-4  px-6 py-2 text-white ${activeLink === 'about' ? 'border-blue-400' : 'border-transparent'}`}
        >
          멘토
        </Link>
        <Link
          to={'/together/memtees'}
          className={`flex h-full items-center border-b-4  px-6 py-2 text-white ${activeLink === 'services' ? 'border-blue-400' : 'border-transparent'}`}
        >
          멘티
        </Link>
        <Link
          to={'/together/my'}
          className={`flex h-full items-center border-b-4  px-6 py-2 text-white ${activeLink === 'contact' ? 'border-blue-400' : 'border-transparent'}`}
        >
          참여 프로젝트
        </Link>
      </div>
      <div className="flex w-1/4 items-center">
        {/* 검색버튼 */}
        <div className="flex flex-1">
          <input
            type="text"
            value={searchkey}
            onChange={(e) => setSearchKey(e.target.value)}
            placeholder="Enter to search..."
            className="flex-1 rounded-xl bg-mdark p-3 pr-16 text-accent caret-accent focus:border-[0.5px] focus:border-accent/65 focus:shadow-sm focus:shadow-accent focus:outline-none"
          />
          <button
            onClick={() => setSearchKey('')}
            className="translate-x-[-65px] text-gray-400 hover:text-gray-500 active:scale-90"
          >
            <RiDeleteBack2Line size={22} />
          </button>
          <button className="translate-x-[-55px] text-accent hover:text-accent/65 active:scale-90">
            <FaSearch size={18} />
          </button>
        </div>

        {/* Other icons */}
        {/* ... */}
      </div>
    </nav>
  );
};

export default NavigationBar;
