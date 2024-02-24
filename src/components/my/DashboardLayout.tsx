import Header from './Header';
import React from 'react';
import Navbar from './Navbar';
type TChildProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: TChildProps) => {
  return (
    <div className="h-dvh bg-mdark">
      <Header />
      <Navbar />
      <div className="container">{children}</div>
    </div>
  );
};

export default DashboardLayout;
