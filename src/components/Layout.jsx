import React from 'react';
import Sidenav from './Sidenav';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="h-screen overflow-hidden flex flex-col">
            <div className="sticky top-0 bg-[#001529] z-10">
                <Header />
            </div>
            <div className="flex flex-1 overflow-hidden">
                <div className='h-full'>
                    <Sidenav />
                </div>
                <div className='flex-1 overflow-auto bg-gray-200'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Layout;