import { Avatar } from 'antd';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import profile from '../assets/profile.png';
import logo from '../assets/logo.png';
import { CircleHelp, Bell } from 'lucide-react';

const Header = () => {
    return (
        <>
            <div className="flex justify-between items-center pr-10 p-3.5">
                <img src={logo} className="w-17 h-5 mx-5" alt="profile" />
                <div className="flex items-center space-x-14">
                    <CircleHelp className="text-white" size={18} />
                    <Bell className="text-white" size={18} />
                    <div>
                        <Avatar src={profile} size={32} alt="" />
                        <span className='text-white font-poppins mx-3'>Sujith</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header