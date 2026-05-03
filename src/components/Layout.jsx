import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const Layout = ({ children, setMode, activeMode }) => {
  return (
    <div className="dashboard-layout">
      <Sidebar setMode={setMode} activeMode={activeMode} />
      <div className="main-content">
        <TopBar setMode={setMode} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
