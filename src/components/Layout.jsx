import React from "react";
import Sidenav from "./Sidenav";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <div className="sticky top-0 z-10 bg-[#001529]">
        <Header />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="h-full">
          <Sidenav />
        </div>
        <div className="w-full overflow-hidden bg-gray-200">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
