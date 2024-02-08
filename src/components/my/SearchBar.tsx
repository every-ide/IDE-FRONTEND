import { useState } from 'react';
import { RiDeleteBack2Line } from 'react-icons/ri';
import { FaSearch } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import backgroundImage from '@/src/assets/images/universe.jpg';
import { FcAddDatabase } from 'react-icons/fc';
import { MdAddCircleOutline } from 'react-icons/md';

const SearchBar = () => {
  const [searchkey, setSearchKey] = useState('');
  const { pathname } = useLocation();

  return (
    <div className="relative">
      <div
        className="
      flex
      w-full
      justify-start
      px-8
      py-4
      md:justify-center
      md:px-0
    "
      >
        <input
          type="text"
          value={searchkey}
          onChange={(e) => setSearchKey(e.target.value)}
          placeholder="Enter to search..."
          className="w-[55%] rounded-xl bg-ldark p-3 pr-16 text-accent caret-accent focus:border-[0.5px] focus:border-accent/65 focus:shadow-md focus:shadow-accent focus:outline-none md:w-[35%]"
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
      {!pathname.includes('/shared') && (
        <Button
          variant="outline"
          size="lg"
          className="absolute right-8 top-[18px] gap-1 rounded-lg px-4 font-semibold active:scale-95"
        >
          <MdAddCircleOutline size={20} className="text-accent" />새 컨테이너
        </Button>
      )}
    </div>
  );
};

export default SearchBar;
