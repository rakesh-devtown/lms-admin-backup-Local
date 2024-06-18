import React, { useState } from "react";
import { LayoutDashboard, UserRound, UsersRound, UserRoundPlusIcon, LogOut, Info, Tractor, Home, ChevronRight, ChevronFirst } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import left from "../assets/left.png";
import home from "../assets/home.png";
import cert from "../assets/cert.png";
import feedback from "../assets/feedback.png";
import mp from "../assets/mp.png";
import mentor from "../assets/mentor.png";
import gs from "../assets/gs.png";
const Sidenav = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const [isShrunk, setIsShrunk] = useState(false);
    const toggleShrink = () => {
        setIsShrunk(false);
    };

    const handleLogout = async () => {
        await Cookies.remove("auth")
        toast.success("Logged out")
        navigate("/agribhai/login")
    }

    return (
        <div
            className={`flex-1 text-sm bg-white-800 text-white h-screen relative overflow-hidden ${isShrunk ? "w-16" : "sm:w-60"} pt-14 transition-width duration-300 shadow-md border-r-2`}>
            <div className="space-y-1 h-[75%]">
                <Link
                    to="/admin/home"
                    className={`flex items-center p-3.5 ${location.pathname === "/admin/home" ? "#1890FF bg-[#E6F7FF] text-[#1890FF]" : "text-black"
                        }`}
                >
                    <img src={home} className="w-5 h-5 mr-3" />
                    {!isShrunk && <span className="font-poppins font-medium">Dashboard</span>}
                </Link>
                <Link
                    to="/admin/home/courses"
                    className={`flex items-center p-3.5   ${location.pathname === "/admin/home/courses" ? "text-[#1890FF] bg-[#E6F7FF] " : "text-black"
                        }`}
                >
                    <LayoutDashboard className="mr-3 w-5 h-5" />
                    {!isShrunk && <span className="font-poppins font-medium">Courses</span>}
                </Link>
                <Link
                    to="/admin/home/certificate"
                    className={`flex items-center p-3.5  ${location.pathname === "/admin/home/certificate" ? "bg-[#E6F7FF] text-[#1890FF]" : "text-black"
                        }`}
                >
                    <img src={cert} className="w-5 mr-3 h-5" />
                    {!isShrunk && <span className="font-poppins font-medium">Certitficate</span>}
                </Link>
                <Link
                    to="/admin/home/feedback"
                    className={`flex items-center p-3.5   ${location.pathname === "/admin/home/feedback" ? "bg-[#E6F7FF] text-[#1890FF]" : "text-black"
                        }`}
                >
                    <img src={feedback} className="w-5 h-5 mr-3" />
                    {!isShrunk && <span className="font-poppins font-medium">Feedback</span>}
                </Link>
                <Link
                    to="/admin/home/mentor_profile"
                    className={`flex items-center p-3.5 ${location.pathname === "/admin/home/mentor_profile" ? "bg-[#E6F7FF] text-[#1890FF]" : "text-black"
                        }`}
                >
                    <img src={mp} className="w-5 h-5 mr-3" />
                    {!isShrunk && <span className="font-poppins font-medium">Mentor Profile</span>}
                </Link>
                <Link
                    to="/admin/home/mentor"
                    className={`flex items-center p-3.5   ${location.pathname === "/admin/home/mentor" ? "bg-[#E6F7FF] text-[#1890FF]" : "text-black"}`}
                >
                    <img src={mentor} className="w-5 h-5 mr-3" />
                    {!isShrunk && <span className="font-poppins font-medium">Mentor</span>}
                </Link>
            </div>
            <div className="border-b-2">
                <Link
                    to="/admin/home/mentor"
                    className={`flex items-center p-3.5   ${location.pathname === "/admin/home/mentor" ? "bg-[#E6F7FF] text-[#1890FF]" : "text-black"}`}
                >
                    <img src={gs} className="w-5 h-5 mr-2" />
                    {!isShrunk && <span className="font-poppins font-medium">Getting Started</span>}
                    <ChevronRight className="w-5 h-4 ml-auto" />
                </Link>
            </div>
            <div className="">
                <img src={left} className="w-4 h-4 ml-4 mt-5" />
            </div>
        </div>
    );
};

export default Sidenav;
