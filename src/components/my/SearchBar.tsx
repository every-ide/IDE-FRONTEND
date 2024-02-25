// import { useState } from 'react';
// import { RiDeleteBack2Line } from 'react-icons/ri';
// import { FaSearch } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import CreateContainerForm from './CreateContainerForm';

const SearchBar = () => {
  // const [searchkey, setSearchKey] = useState('');
  const { pathname } = useLocation();

  return (
    <div className="flex h-16 items-center justify-end">
      {/* <div className="flex w-1/3 items-center justify-end">
        <input
          type="text"
          value={searchkey}
          onChange={(e) => setSearchKey(e.target.value)}
          placeholder="검색어를 입력하세요..."
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
      </div> */}
      <div>
        {!pathname.includes('/shared') && (
          <CreateContainerForm
            buttonVariant="outline"
            buttonSize="lg"
            buttonClassName="gap-1 rounded-lg bg-mdark px-4 font-semibold active:scale-95"
          />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
