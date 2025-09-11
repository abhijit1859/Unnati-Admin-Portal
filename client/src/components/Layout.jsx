// Layout.jsx
import React, { useState } from "react";
import { SideBar } from "./SideBar";
import { TopBar } from "./TopBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <SideBar isOpen={isOpen} />

      {/* Main content */}
      <div className="flex-1">
        <TopBar isOpen={isOpen} setIsOpen={setIsOpen} />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
