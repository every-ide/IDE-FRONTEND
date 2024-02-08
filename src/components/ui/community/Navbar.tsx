import React, { useState } from 'react';

const NavigationBar: React.FC = () => {
  const [activeLink, setActiveLink] = useState<string>('home');

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <nav className="bg-dark sticky top-20 border-b-0 border-gray-50 pb-1 pt-3">
      <div className="flex items-center justify-between px-6">
        <div className="flex items-center">
          <a
            href="#home"
            onClick={() => handleLinkClick('home')}
            className={`px-6 py-2 text-white ${activeLink === 'home' ? 'z-10 border-b-4 border-blue-400' : ''}`}
          >
            전체
          </a>
          <a
            href="#about"
            onClick={() => handleLinkClick('about')}
            className={`px-6 py-2 text-white ${activeLink === 'about' ? 'z-10 border-b-4 border-blue-400' : ''}`}
          >
            공개
          </a>
          <a
            href="#services"
            onClick={() => handleLinkClick('services')}
            className={`px-6 py-2 text-white ${activeLink === 'services' ? 'z-10 border-b-4 border-blue-400' : ''}`}
          >
            비공개
          </a>
          <a
            href="#contact"
            onClick={() => handleLinkClick('contact')}
            className={`px-6 py-2 text-white ${activeLink === 'contact' ? 'z-10 border-b-4 border-blue-400' : ''}`}
          >
            참여 프로젝트
          </a>
        </div>
        <div className="flex items-center pr-6">
          <div className={`relative`}>
            <input
              type="text"
              placeholder="검색어를 입력해주세요"
              className="border-1 rounded border-white bg-mdark p-2 text-white placeholder:text-white"
            />
            <button
              onClick={() => {
                /* handle search */
              }}
              className="ml-3 rounded-lg bg-blue-400 p-1 px-3 text-gray-200 hover:text-white focus:outline-none"
            >
              상세검색
            </button>
          </div>

          {/* Other icons */}
          {/* ... */}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
