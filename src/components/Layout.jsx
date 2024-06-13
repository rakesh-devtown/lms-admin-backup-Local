import React from 'react';
import Sidenav from './Sidenav';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="h-screen overflow-hidden">
            <div className="sticky top-0 bg-[#001529]">
                <Header />
            </div>
            <div className="flex">
                <div className=''>
                    <Sidenav />
                </div>
                <div className='w-full overflow-scroll bg-gray-200'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Layout;