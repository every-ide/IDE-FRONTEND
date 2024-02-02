import { useState } from 'react';
import { RiDeleteBack2Line } from 'react-icons/ri';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  const [searchkey, setSearchKey] = useState('');

  return (
    <div
      className="
      flex
      w-full
      justify-center
      py-4
    "
    >
      <input
        type="text"
        value={searchkey}
        onChange={(e) => setSearchKey(e.target.value)}
        placeholder="Enter to search..."
        className="w-[35%] rounded-xl bg-ldark p-3 pr-16 text-accent caret-accent focus:border-[0.5px] focus:border-accent/65 focus:shadow-md focus:shadow-accent focus:outline-none"
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
  );
};

export default SearchBar;
