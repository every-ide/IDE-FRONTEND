import SearchBar from './SearchBar';
import Sidebar from './Sidebar';
import Header from './Header';
import React from 'react';

type TChildProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: TChildProps) => {
  return (
    <div className="h-dvh bg-mdark">
      <Header />
      <div className="flex h-[calc(100vh-87px)] flex-row">
        <Sidebar />
        <div className="w-[80%]">
          <SearchBar />
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
