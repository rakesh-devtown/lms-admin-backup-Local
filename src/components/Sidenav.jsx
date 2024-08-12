import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { verifyToken, logout } from "../store/slice/authReducer";
import Spinner from "./Loader/Spinner";
import { Spin } from "antd";

const Sidenav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isShrunk, setIsShrunk] = useState(false);
  // const { loading, isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    try {
      dispatch(logout());
      // navigate('/')
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };

  return (
    <div
      className={`bg-white-800 relative h-screen flex-1 overflow-hidden text-sm text-white ${isShrunk ? "w-16" : "sm:w-60"} pt- transition-width border-r-2 shadow-md duration-300`}
    >
      <div className="space-y-">
        {/* <Link
                    to="/admin"
                    className={`flex items-center p-3.5 ${location.pathname === "/admin" ? "#1890FF bg-[#E6F7FF] text-[#1890FF] border-r-2 border-[#0859DE]" : "text-black"
                        }`}
                >

                    {location.pathname === "/admin" ?
                        <svg className="h-6 w-6 mr-2 fill-[#0859DE]" viewBox="0 0 24 24" fill="#0859DE" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.487 11.8717L12.3951 4.78348L11.9197 4.30812C11.8114 4.20052 11.6649 4.14014 11.5122 4.14014C11.3596 4.14014 11.2131 4.20052 11.1048 4.30812L3.53751 11.8717C3.42653 11.9823 3.33881 12.1139 3.27955 12.2589C3.22029 12.4039 3.19067 12.5594 3.19246 12.716C3.1998 13.362 3.73757 13.8778 4.38362 13.8778H5.16366V19.8556H17.8608V13.8778H18.6574C18.9712 13.8778 19.2667 13.7548 19.4888 13.5327C19.5981 13.4237 19.6848 13.2941 19.7437 13.1514C19.8026 13.0087 19.8326 12.8557 19.832 12.7013C19.832 12.3893 19.709 12.0938 19.487 11.8717ZM12.54 18.5341H10.4844V14.79H12.54V18.5341ZM16.5393 12.5563V18.5341H13.7147V14.3495C13.7147 13.9439 13.3862 13.6153 12.9805 13.6153H10.0439C9.63831 13.6153 9.30978 13.9439 9.30978 14.3495V18.5341H6.48513V12.5563H4.72317L11.5141 5.77092L11.938 6.19489L18.3031 12.5563H16.5393Z" fill="#0859DE" fill-opacity="0.85" />
                        </svg>
                        : <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.487 11.8717L12.3951 4.78348L11.9197 4.30812C11.8114 4.20052 11.6649 4.14014 11.5122 4.14014C11.3596 4.14014 11.2131 4.20052 11.1048 4.30812L3.53751 11.8717C3.42653 11.9823 3.33881 12.1139 3.27955 12.2589C3.22029 12.4039 3.19067 12.5594 3.19246 12.716C3.1998 13.362 3.73757 13.8778 4.38362 13.8778H5.16366V19.8556H17.8608V13.8778H18.6574C18.9712 13.8778 19.2667 13.7548 19.4888 13.5327C19.5981 13.4237 19.6848 13.2941 19.7437 13.1514C19.8026 13.0087 19.8326 12.8557 19.832 12.7013C19.832 12.3893 19.709 12.0938 19.487 11.8717ZM12.54 18.5341H10.4844V14.79H12.54V18.5341ZM16.5393 12.5563V18.5341H13.7147V14.3495C13.7147 13.9439 13.3862 13.6153 12.9805 13.6153H10.0439C9.63831 13.6153 9.30978 13.9439 9.30978 14.3495V18.5341H6.48513V12.5563H4.72317L11.5141 5.77092L11.938 6.19489L18.3031 12.5563H16.5393Z" fill="#141414" fill-opacity="0.85" />
                        </svg>

                    }
                    {!isShrunk && <span className="font-poppins font-medium text-base">Dashboard</span>}
                </Link> */}
        <Link
          to="/admin/courses"
          className={`flex items-center p-3.5 ${
            location.pathname.includes("/admin/courses")
              ? "border-r-2 border-[#0859DE] bg-[#E6F7FF] text-[#1890FF]"
              : "text-black"
          }`}
        >
          {location.pathname.includes("/admin/courses") ? (
            <svg
              className="mr-2 h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.85274 20.0221C4.41551 20.0221 4.04542 19.8707 3.74249 19.5677C3.43955 19.2648 3.28809 18.8947 3.28809 18.4575V10.3349C3.28809 9.89771 3.43955 9.52763 3.74249 9.2247C4.04542 8.92176 4.41551 8.77029 4.85274 8.77029H18.1684C18.6057 8.77029 18.9757 8.92176 19.2787 9.2247C19.5816 9.52763 19.7331 9.89771 19.7331 10.3349V18.4575C19.7331 18.8947 19.5816 19.2648 19.2787 19.5677C18.9757 19.8707 18.6057 20.0221 18.1684 20.0221H4.85274ZM4.85274 18.7238H18.1684C18.2351 18.7238 18.2961 18.6961 18.3515 18.6405C18.407 18.5851 18.4348 18.5241 18.4348 18.4575V10.3349C18.4348 10.2683 18.407 10.2073 18.3515 10.1519C18.2961 10.0964 18.2351 10.0686 18.1684 10.0686H4.85274C4.7861 10.0686 4.72508 10.0964 4.66968 10.1519C4.61414 10.2073 4.58638 10.2683 4.58638 10.3349V18.4575C4.58638 18.5241 4.61414 18.5851 4.66968 18.6405C4.72508 18.6961 4.7861 18.7238 4.85274 18.7238ZM9.99591 17.4589L14.5899 14.3962L9.99591 11.3335V17.4589ZM4.80276 7.57197V6.27368H18.2184V7.57197H4.80276ZM7.39934 5.07515V3.77686H15.6218V5.07515H7.39934Z"
                fill="#0859DE"
              />
            </svg>
          ) : (
            <svg
              className="mr-2 h-6 w-6 fill-black"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4.85274 20.0221C4.41551 20.0221 4.04542 19.8707 3.74249 19.5677C3.43955 19.2648 3.28809 18.8947 3.28809 18.4575V10.3349C3.28809 9.89771 3.43955 9.52763 3.74249 9.2247C4.04542 8.92176 4.41551 8.77029 4.85274 8.77029H18.1684C18.6057 8.77029 18.9757 8.92176 19.2787 9.2247C19.5816 9.52763 19.7331 9.89771 19.7331 10.3349V18.4575C19.7331 18.8947 19.5816 19.2648 19.2787 19.5677C18.9757 19.8707 18.6057 20.0221 18.1684 20.0221H4.85274ZM4.85274 18.7238H18.1684C18.2351 18.7238 18.2961 18.6961 18.3515 18.6405C18.407 18.5851 18.4348 18.5241 18.4348 18.4575V10.3349C18.4348 10.2683 18.407 10.2073 18.3515 10.1519C18.2961 10.0964 18.2351 10.0686 18.1684 10.0686H4.85274C4.7861 10.0686 4.72508 10.0964 4.66968 10.1519C4.61414 10.2073 4.58638 10.2683 4.58638 10.3349V18.4575C4.58638 18.5241 4.61414 18.5851 4.66968 18.6405C4.72508 18.6961 4.7861 18.7238 4.85274 18.7238ZM9.99591 17.4589L14.5899 14.3962L9.99591 11.3335V17.4589ZM4.80276 7.57197V6.27368H18.2184V7.57197H4.80276ZM7.39934 5.07515V3.77686H15.6218V5.07515H7.39934Z" />
            </svg>
          )}
          {!isShrunk && (
            <span className="font-poppins text-base font-medium">Courses</span>
          )}
        </Link>
        <Link
          to="/admin/students"
          className={`flex items-center p-3.5 ${
            location.pathname === "/admin/students"
              ? "border-r-2 border-[#0859DE] bg-[#E6F7FF] text-[#1890FF]"
              : "text-black"
          }`}
        >
          {location.pathname === "/admin/students" ? (
            <svg
              className="mr-2 h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.28809 15.2865V14.2073C3.28809 13.7162 3.53933 13.3165 4.04182 13.0081C4.5443 12.6998 5.20667 12.5456 6.02892 12.5456C6.17738 12.5456 6.32013 12.5485 6.45717 12.5542C6.59422 12.5599 6.72555 12.5742 6.85117 12.597C6.69129 12.8368 6.57138 13.0881 6.49143 13.3508C6.41149 13.6134 6.37152 13.8875 6.37152 14.173V15.2865H3.28809ZM7.39934 15.2865V14.173C7.39934 13.8076 7.49926 13.4735 7.69911 13.1709C7.89897 12.8682 8.18162 12.6027 8.54706 12.3743C8.9125 12.1459 9.34932 11.9746 9.85752 11.8604C10.3657 11.7462 10.9167 11.6891 11.5106 11.6891C12.1159 11.6891 12.6726 11.7462 13.1808 11.8604C13.689 11.9746 14.1258 12.1459 14.4912 12.3743C14.8567 12.6027 15.1365 12.8682 15.3306 13.1709C15.5248 13.4735 15.6218 13.8076 15.6218 14.173V15.2865H7.39934ZM16.6496 15.2865V14.173C16.6496 13.8761 16.6125 13.5963 16.5383 13.3336C16.4641 13.071 16.3527 12.8254 16.2043 12.597C16.3299 12.5742 16.4584 12.5599 16.5897 12.5542C16.721 12.5485 16.8552 12.5456 16.9923 12.5456C17.8145 12.5456 18.4769 12.6969 18.9794 12.9996C19.4818 13.3022 19.7331 13.7048 19.7331 14.2073V15.2865H16.6496ZM8.8554 13.916H14.1829C14.0687 13.6876 13.7518 13.4878 13.2322 13.3165C12.7126 13.1452 12.1387 13.0595 11.5106 13.0595C10.8825 13.0595 10.3086 13.1452 9.789 13.3165C9.26938 13.4878 8.95818 13.6876 8.8554 13.916ZM6.02892 11.8604C5.65205 11.8604 5.32944 11.7262 5.06106 11.4579C4.79269 11.1895 4.6585 10.8669 4.6585 10.49C4.6585 10.1017 4.79269 9.77625 5.06106 9.51358C5.32944 9.25092 5.65205 9.11959 6.02892 9.11959C6.4172 9.11959 6.74268 9.25092 7.00534 9.51358C7.268 9.77625 7.39934 10.1017 7.39934 10.49C7.39934 10.8669 7.268 11.1895 7.00534 11.4579C6.74268 11.7262 6.4172 11.8604 6.02892 11.8604ZM16.9923 11.8604C16.6154 11.8604 16.2928 11.7262 16.0244 11.4579C15.756 11.1895 15.6218 10.8669 15.6218 10.49C15.6218 10.1017 15.756 9.77625 16.0244 9.51358C16.2928 9.25092 16.6154 9.11959 16.9923 9.11959C17.3805 9.11959 17.706 9.25092 17.9687 9.51358C18.2313 9.77625 18.3627 10.1017 18.3627 10.49C18.3627 10.8669 18.2313 11.1895 17.9687 11.4579C17.706 11.7262 17.3805 11.8604 16.9923 11.8604ZM11.5106 11.1752C10.9396 11.1752 10.4542 10.9754 10.0545 10.5757C9.65481 10.176 9.45496 9.6906 9.45496 9.11959C9.45496 8.53716 9.65481 8.04895 10.0545 7.65496C10.4542 7.26096 10.9396 7.06396 11.5106 7.06396C12.093 7.06396 12.5812 7.26096 12.9752 7.65496C13.3692 8.04895 13.5662 8.53716 13.5662 9.11959C13.5662 9.6906 13.3692 10.176 12.9752 10.5757C12.5812 10.9754 12.093 11.1752 11.5106 11.1752ZM11.5106 9.8048C11.7047 9.8048 11.8675 9.73913 11.9988 9.6078C12.1301 9.47647 12.1958 9.31373 12.1958 9.11959C12.1958 8.92545 12.1301 8.76271 11.9988 8.63138C11.8675 8.50005 11.7047 8.43438 11.5106 8.43438C11.3164 8.43438 11.1537 8.50005 11.0224 8.63138C10.891 8.76271 10.8254 8.92545 10.8254 9.11959C10.8254 9.31373 10.891 9.47647 11.0224 9.6078C11.1537 9.73913 11.3164 9.8048 11.5106 9.8048Z"
                fill="#0859DE"
                fill-opacity="0.85"
              />
            </svg>
          ) : (
            <svg
              className="mr-2 h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.28809 15.2865V14.2073C3.28809 13.7162 3.53933 13.3165 4.04182 13.0081C4.5443 12.6998 5.20667 12.5456 6.02892 12.5456C6.17738 12.5456 6.32013 12.5485 6.45717 12.5542C6.59422 12.5599 6.72555 12.5742 6.85117 12.597C6.69129 12.8368 6.57138 13.0881 6.49143 13.3508C6.41149 13.6134 6.37152 13.8875 6.37152 14.173V15.2865H3.28809ZM7.39934 15.2865V14.173C7.39934 13.8076 7.49926 13.4735 7.69911 13.1709C7.89897 12.8682 8.18162 12.6027 8.54706 12.3743C8.9125 12.1459 9.34932 11.9746 9.85752 11.8604C10.3657 11.7462 10.9167 11.6891 11.5106 11.6891C12.1159 11.6891 12.6726 11.7462 13.1808 11.8604C13.689 11.9746 14.1258 12.1459 14.4912 12.3743C14.8567 12.6027 15.1365 12.8682 15.3306 13.1709C15.5248 13.4735 15.6218 13.8076 15.6218 14.173V15.2865H7.39934ZM16.6496 15.2865V14.173C16.6496 13.8761 16.6125 13.5963 16.5383 13.3336C16.4641 13.071 16.3527 12.8254 16.2043 12.597C16.3299 12.5742 16.4584 12.5599 16.5897 12.5542C16.721 12.5485 16.8552 12.5456 16.9923 12.5456C17.8145 12.5456 18.4769 12.6969 18.9794 12.9996C19.4818 13.3022 19.7331 13.7048 19.7331 14.2073V15.2865H16.6496ZM8.8554 13.916H14.1829C14.0687 13.6876 13.7518 13.4878 13.2322 13.3165C12.7126 13.1452 12.1387 13.0595 11.5106 13.0595C10.8825 13.0595 10.3086 13.1452 9.789 13.3165C9.26938 13.4878 8.95818 13.6876 8.8554 13.916ZM6.02892 11.8604C5.65205 11.8604 5.32944 11.7262 5.06106 11.4579C4.79269 11.1895 4.6585 10.8669 4.6585 10.49C4.6585 10.1017 4.79269 9.77625 5.06106 9.51358C5.32944 9.25092 5.65205 9.11959 6.02892 9.11959C6.4172 9.11959 6.74268 9.25092 7.00534 9.51358C7.268 9.77625 7.39934 10.1017 7.39934 10.49C7.39934 10.8669 7.268 11.1895 7.00534 11.4579C6.74268 11.7262 6.4172 11.8604 6.02892 11.8604ZM16.9923 11.8604C16.6154 11.8604 16.2928 11.7262 16.0244 11.4579C15.756 11.1895 15.6218 10.8669 15.6218 10.49C15.6218 10.1017 15.756 9.77625 16.0244 9.51358C16.2928 9.25092 16.6154 9.11959 16.9923 9.11959C17.3805 9.11959 17.706 9.25092 17.9687 9.51358C18.2313 9.77625 18.3627 10.1017 18.3627 10.49C18.3627 10.8669 18.2313 11.1895 17.9687 11.4579C17.706 11.7262 17.3805 11.8604 16.9923 11.8604ZM11.5106 11.1752C10.9396 11.1752 10.4542 10.9754 10.0545 10.5757C9.65481 10.176 9.45496 9.6906 9.45496 9.11959C9.45496 8.53716 9.65481 8.04895 10.0545 7.65496C10.4542 7.26096 10.9396 7.06396 11.5106 7.06396C12.093 7.06396 12.5812 7.26096 12.9752 7.65496C13.3692 8.04895 13.5662 8.53716 13.5662 9.11959C13.5662 9.6906 13.3692 10.176 12.9752 10.5757C12.5812 10.9754 12.093 11.1752 11.5106 11.1752ZM11.5106 9.8048C11.7047 9.8048 11.8675 9.73913 11.9988 9.6078C12.1301 9.47647 12.1958 9.31373 12.1958 9.11959C12.1958 8.92545 12.1301 8.76271 11.9988 8.63138C11.8675 8.50005 11.7047 8.43438 11.5106 8.43438C11.3164 8.43438 11.1537 8.50005 11.0224 8.63138C10.891 8.76271 10.8254 8.92545 10.8254 9.11959C10.8254 9.31373 10.891 9.47647 11.0224 9.6078C11.1537 9.73913 11.3164 9.8048 11.5106 9.8048Z"
                fill="#141414"
                fill-opacity="0.85"
              />
            </svg>
          )}{" "}
          {!isShrunk && (
            <span className="font-poppins text-base font-medium">Students</span>
          )}
        </Link>
        {/* <Link
                    to="/admin/mentors"
                    className={`flex items-center p-3.5   ${location.pathname === "/admin/mentors" ? "bg-[#E6F7FF] text-[#1890FF] border-r-2 border-[#0859DE]" : "text-black"
                        }`}
                >

                    {location.pathname === "/admin/mentors" ?
                        <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.6218 14.4661C15.0463 14.4661 14.5598 14.2674 14.1623 13.87C13.7649 13.4726 13.5662 12.9861 13.5662 12.4105C13.5662 11.8349 13.7649 11.3484 14.1623 10.951C14.5598 10.5536 15.0463 10.3549 15.6218 10.3549C16.1974 10.3549 16.6839 10.5536 17.0813 10.951C17.4787 11.3484 17.6775 11.8349 17.6775 12.4105C17.6775 12.9861 17.4787 13.4726 17.0813 13.87C16.6839 14.2674 16.1974 14.4661 15.6218 14.4661ZM11.5106 18.5774V17.4262C11.5106 17.0973 11.5962 16.7924 11.7675 16.5115C11.9388 16.2305 12.1821 16.0284 12.4973 15.9051C12.9906 15.6995 13.5011 15.5453 14.0287 15.4426C14.5563 15.3398 15.0874 15.2884 15.6218 15.2884C16.1563 15.2884 16.6873 15.3398 17.2149 15.4426C17.7426 15.5453 18.253 15.6995 18.7464 15.9051C19.0616 16.0284 19.3048 16.2305 19.4761 16.5115C19.6474 16.7924 19.7331 17.0973 19.7331 17.4262V18.5774H11.5106ZM9.86609 11.9994C8.96161 11.9994 8.18733 11.6773 7.54323 11.0332C6.89913 10.3891 6.57709 9.61486 6.57709 8.71039C6.57709 7.80591 6.89913 7.03163 7.54323 6.38753C8.18733 5.74343 8.96161 5.42139 9.86609 5.42139C10.7706 5.42139 11.5448 5.74343 12.1889 6.38753C12.833 7.03163 13.1551 7.80591 13.1551 8.71039C13.1551 9.61486 12.833 10.3891 12.1889 11.0332C11.5448 11.6773 10.7706 11.9994 9.86609 11.9994ZM3.28809 18.5774V16.2751C3.28809 15.8091 3.40457 15.3809 3.63754 14.9903C3.87051 14.5998 4.19256 14.3017 4.60369 14.0961C5.42594 13.685 6.27902 13.3698 7.16294 13.1505C8.04686 12.9313 8.94791 12.8216 9.86609 12.8216C10.3457 12.8216 10.8254 12.8627 11.305 12.945C11.7847 13.0272 12.2643 13.1231 12.744 13.2328L12.045 13.9317L11.3461 14.6306C11.0995 14.5621 10.8528 14.5175 10.6061 14.497C10.3594 14.4764 10.1128 14.4661 9.86609 14.4661C9.07124 14.4661 8.29353 14.5621 7.53295 14.7539C6.77237 14.9458 6.04262 15.2199 5.34371 15.5762C5.20667 15.6447 5.10389 15.7406 5.03537 15.864C4.96685 15.9873 4.93259 16.1243 4.93259 16.2751V16.9329H9.86609V18.5774H3.28809ZM9.86609 10.3549C10.3183 10.3549 10.7055 10.1939 11.0275 9.87182C11.3496 9.54977 11.5106 9.16262 11.5106 8.71039C11.5106 8.25815 11.3496 7.87101 11.0275 7.54896C10.7055 7.22691 10.3183 7.06589 9.86609 7.06589C9.41385 7.06589 9.02671 7.22691 8.70466 7.54896C8.38261 7.87101 8.22159 8.25815 8.22159 8.71039C8.22159 9.16262 8.38261 9.54977 8.70466 9.87182C9.02671 10.1939 9.41385 10.3549 9.86609 10.3549Z" fill="#0859DE" fill-opacity="0.85" />
                        </svg>



                        : <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.6218 14.4661C15.0463 14.4661 14.5598 14.2674 14.1623 13.87C13.7649 13.4726 13.5662 12.9861 13.5662 12.4105C13.5662 11.8349 13.7649 11.3484 14.1623 10.951C14.5598 10.5536 15.0463 10.3549 15.6218 10.3549C16.1974 10.3549 16.6839 10.5536 17.0813 10.951C17.4787 11.3484 17.6775 11.8349 17.6775 12.4105C17.6775 12.9861 17.4787 13.4726 17.0813 13.87C16.6839 14.2674 16.1974 14.4661 15.6218 14.4661ZM11.5106 18.5774V17.4262C11.5106 17.0973 11.5962 16.7924 11.7675 16.5115C11.9388 16.2305 12.1821 16.0284 12.4973 15.9051C12.9906 15.6995 13.5011 15.5453 14.0287 15.4426C14.5563 15.3398 15.0874 15.2884 15.6218 15.2884C16.1563 15.2884 16.6873 15.3398 17.2149 15.4426C17.7426 15.5453 18.253 15.6995 18.7464 15.9051C19.0616 16.0284 19.3048 16.2305 19.4761 16.5115C19.6474 16.7924 19.7331 17.0973 19.7331 17.4262V18.5774H11.5106ZM9.86609 11.9994C8.96161 11.9994 8.18733 11.6773 7.54323 11.0332C6.89913 10.3891 6.57709 9.61486 6.57709 8.71039C6.57709 7.80591 6.89913 7.03163 7.54323 6.38753C8.18733 5.74343 8.96161 5.42139 9.86609 5.42139C10.7706 5.42139 11.5448 5.74343 12.1889 6.38753C12.833 7.03163 13.1551 7.80591 13.1551 8.71039C13.1551 9.61486 12.833 10.3891 12.1889 11.0332C11.5448 11.6773 10.7706 11.9994 9.86609 11.9994ZM3.28809 18.5774V16.2751C3.28809 15.8091 3.40457 15.3809 3.63754 14.9903C3.87051 14.5998 4.19256 14.3017 4.60369 14.0961C5.42594 13.685 6.27902 13.3698 7.16294 13.1505C8.04686 12.9313 8.94791 12.8216 9.86609 12.8216C10.3457 12.8216 10.8254 12.8627 11.305 12.945C11.7847 13.0272 12.2643 13.1231 12.744 13.2328L12.045 13.9317L11.3461 14.6306C11.0995 14.5621 10.8528 14.5175 10.6061 14.497C10.3594 14.4764 10.1128 14.4661 9.86609 14.4661C9.07124 14.4661 8.29353 14.5621 7.53295 14.7539C6.77237 14.9458 6.04262 15.2199 5.34371 15.5762C5.20667 15.6447 5.10389 15.7406 5.03537 15.864C4.96685 15.9873 4.93259 16.1243 4.93259 16.2751V16.9329H9.86609V18.5774H3.28809ZM9.86609 10.3549C10.3183 10.3549 10.7055 10.1939 11.0275 9.87182C11.3496 9.54977 11.5106 9.16262 11.5106 8.71039C11.5106 8.25815 11.3496 7.87101 11.0275 7.54896C10.7055 7.22691 10.3183 7.06589 9.86609 7.06589C9.41385 7.06589 9.02671 7.22691 8.70466 7.54896C8.38261 7.87101 8.22159 8.25815 8.22159 8.71039C8.22159 9.16262 8.38261 9.54977 8.70466 9.87182C9.02671 10.1939 9.41385 10.3549 9.86609 10.3549Z" fill="#141414" fill-opacity="0.85" />
                        </svg>


                    }                    {!isShrunk && <span className="font-poppins font-medium text-base">Mentors</span>}
                </Link>
                <Link
                    to="/admin/doubts"
                    className={`flex items-center p-3.5 ${location.pathname === "/admin/doubts" ? "bg-[#E6F7FF] text-[#1890FF] border-r-2 border-[#0859DE]" : "text-black"
                        }`}
                >

                    {location.pathname === "/admin/doubts" ?
                        <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.9031 15.5223C12.1772 15.5223 12.4089 15.4277 12.5981 15.2384C12.7874 15.0492 12.882 14.8175 12.882 14.5434C12.882 14.2694 12.7874 14.0377 12.5981 13.8484C12.4089 13.6592 12.1772 13.5646 11.9031 13.5646C11.6291 13.5646 11.3974 13.6592 11.2081 13.8484C11.0189 14.0377 10.9243 14.2694 10.9243 14.5434C10.9243 14.8175 11.0189 15.0492 11.2081 15.2384C11.3974 15.4277 11.6291 15.5223 11.9031 15.5223ZM11.1984 12.5074H12.6471C12.6471 12.2855 12.6569 12.0963 12.6764 11.9396C12.696 11.783 12.7384 11.6329 12.8037 11.4894C12.869 11.3458 12.9505 11.212 13.0484 11.088C13.1463 10.964 13.2866 10.8107 13.4693 10.628C13.9261 10.1712 14.2492 9.7894 14.4384 9.48269C14.6277 9.17597 14.7223 8.82684 14.7223 8.4353C14.7223 7.74356 14.4874 7.18561 14.0175 6.76143C13.5476 6.33725 12.9146 6.12516 12.1185 6.12516C11.4007 6.12516 10.7905 6.30136 10.288 6.65375C9.78552 7.00615 9.43639 7.49558 9.24062 8.12206L10.5327 8.63107C10.6241 8.27868 10.8068 7.9948 11.0809 7.77945C11.355 7.5641 11.6747 7.45643 12.0402 7.45643C12.3926 7.45643 12.6862 7.55105 12.9212 7.7403C13.1561 7.92955 13.2736 8.18079 13.2736 8.49403C13.2736 8.7159 13.2018 8.95083 13.0582 9.19881C12.9146 9.44679 12.6732 9.72088 12.3338 10.0211C12.112 10.2038 11.9325 10.3832 11.7955 10.5594C11.6584 10.7356 11.5442 10.9216 11.4529 11.1174C11.3615 11.3132 11.2962 11.5187 11.2571 11.7341C11.2179 11.9494 11.1984 12.2072 11.1984 12.5074ZM11.9815 20.2209L9.63216 17.8716H6.49978C6.06908 17.8716 5.70037 17.7182 5.39366 17.4115C5.08695 17.1048 4.93359 16.7361 4.93359 16.3054V5.34207C4.93359 4.91137 5.08695 4.54266 5.39366 4.23595C5.70037 3.92924 6.06908 3.77588 6.49978 3.77588H17.4631C17.8938 3.77588 18.2625 3.92924 18.5692 4.23595C18.876 4.54266 19.0293 4.91137 19.0293 5.34207V16.3054C19.0293 16.7361 18.876 17.1048 18.5692 17.4115C18.2625 17.7182 17.8938 17.8716 17.4631 17.8716H14.3307L11.9815 20.2209ZM6.49978 16.3054H10.2586L11.9815 18.0282L13.7043 16.3054H17.4631V5.34207H6.49978V16.3054Z" fill="#0859DE" fill-opacity="0.85" />
                        </svg>
                        : <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.9031 15.5223C12.1772 15.5223 12.4089 15.4277 12.5981 15.2384C12.7874 15.0492 12.882 14.8175 12.882 14.5434C12.882 14.2694 12.7874 14.0377 12.5981 13.8484C12.4089 13.6592 12.1772 13.5646 11.9031 13.5646C11.6291 13.5646 11.3974 13.6592 11.2081 13.8484C11.0189 14.0377 10.9243 14.2694 10.9243 14.5434C10.9243 14.8175 11.0189 15.0492 11.2081 15.2384C11.3974 15.4277 11.6291 15.5223 11.9031 15.5223ZM11.1984 12.5074H12.6471C12.6471 12.2855 12.6569 12.0963 12.6764 11.9396C12.696 11.783 12.7384 11.6329 12.8037 11.4894C12.869 11.3458 12.9505 11.212 13.0484 11.088C13.1463 10.964 13.2866 10.8107 13.4693 10.628C13.9261 10.1712 14.2492 9.7894 14.4384 9.48269C14.6277 9.17597 14.7223 8.82684 14.7223 8.4353C14.7223 7.74356 14.4874 7.18561 14.0175 6.76143C13.5476 6.33725 12.9146 6.12516 12.1185 6.12516C11.4007 6.12516 10.7905 6.30136 10.288 6.65375C9.78552 7.00615 9.43639 7.49558 9.24062 8.12206L10.5327 8.63107C10.6241 8.27868 10.8068 7.9948 11.0809 7.77945C11.355 7.5641 11.6747 7.45643 12.0402 7.45643C12.3926 7.45643 12.6862 7.55105 12.9212 7.7403C13.1561 7.92955 13.2736 8.18079 13.2736 8.49403C13.2736 8.7159 13.2018 8.95083 13.0582 9.19881C12.9146 9.44679 12.6732 9.72088 12.3338 10.0211C12.112 10.2038 11.9325 10.3832 11.7955 10.5594C11.6584 10.7356 11.5442 10.9216 11.4529 11.1174C11.3615 11.3132 11.2962 11.5187 11.2571 11.7341C11.2179 11.9494 11.1984 12.2072 11.1984 12.5074ZM11.9815 20.2209L9.63216 17.8716H6.49978C6.06908 17.8716 5.70037 17.7182 5.39366 17.4115C5.08695 17.1048 4.93359 16.7361 4.93359 16.3054V5.34207C4.93359 4.91137 5.08695 4.54266 5.39366 4.23595C5.70037 3.92924 6.06908 3.77588 6.49978 3.77588H17.4631C17.8938 3.77588 18.2625 3.92924 18.5692 4.23595C18.876 4.54266 19.0293 4.91137 19.0293 5.34207V16.3054C19.0293 16.7361 18.876 17.1048 18.5692 17.4115C18.2625 17.7182 17.8938 17.8716 17.4631 17.8716H14.3307L11.9815 20.2209ZM6.49978 16.3054H10.2586L11.9815 18.0282L13.7043 16.3054H17.4631V5.34207H6.49978V16.3054Z" fill="#141414" fill-opacity="0.85" />
                        </svg>
                    }
                    {!isShrunk && <span className="font-poppins font-medium text-base">Doubts</span>}
                </Link> */}
        <Link
          to="/admin/requests"
          className={`flex items-center p-3.5 ${location.pathname === "/admin/requests" ? "border-r-2 border-[#0859DE] bg-[#E6F7FF] text-[#1890FF]" : "text-black"}`}
        >
          {location.pathname === "/admin/requests" ? (
            <svg
              className="mr-2 h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.28809 20.2228V18.7278H18.2381V20.2228H3.28809ZM4.78309 17.9803V13.4953C4.37196 12.8226 4.05427 12.1093 3.83002 11.3556C3.60577 10.6019 3.49365 9.83258 3.49365 9.04771C3.49365 8.28775 3.5902 7.54025 3.7833 6.80521C3.97641 6.07017 4.20377 5.34758 4.4654 4.63746C4.56507 4.37583 4.72702 4.16715 4.95127 4.01143C5.17552 3.8557 5.42469 3.77783 5.69877 3.77783C6.08498 3.77783 6.41513 3.90864 6.68921 4.17027C6.96329 4.43189 7.07542 4.74335 7.02559 5.10464L6.82002 6.80521C6.74527 7.40321 6.79822 7.97006 6.97887 8.50577C7.15951 9.04148 7.43048 9.51178 7.79177 9.91668C8.15307 10.3216 8.58911 10.6455 9.0999 10.8884C9.61069 11.1314 10.1651 11.2528 10.7631 11.2528C11.5106 11.2528 12.2612 11.3307 13.0149 11.4864C13.7687 11.6422 14.4258 11.8633 14.9865 12.1498C15.5471 12.4364 15.98 12.8008 16.2852 13.2431C16.5905 13.6853 16.7431 14.2304 16.7431 14.8782V17.9803H4.78309ZM6.27809 16.4853H15.2481V14.8782C15.2481 14.5792 15.1733 14.3145 15.0238 14.084C14.8743 13.8535 14.6625 13.6697 14.3885 13.5327C13.8777 13.2835 13.2859 13.0904 12.6131 12.9534C11.9404 12.8164 11.3237 12.7478 10.7631 12.7478C9.94084 12.7478 9.17776 12.5796 8.47387 12.2433C7.76997 11.9069 7.17197 11.4553 6.67987 10.8884C6.18776 10.3216 5.81713 9.66751 5.56796 8.92624C5.31879 8.18497 5.24404 7.41567 5.34371 6.61833C5.21913 6.99208 5.1288 7.39075 5.07274 7.81433C5.01668 8.23792 4.98865 8.64904 4.98865 9.04771C4.98865 9.77029 5.11635 10.4648 5.37174 11.1314C5.62714 11.7979 5.92925 12.4488 6.27809 13.0842V16.4853ZM10.7631 10.5053C9.94084 10.5053 9.23694 10.2126 8.6514 9.62702C8.06586 9.04148 7.77309 8.33758 7.77309 7.51533C7.77309 6.69308 8.06586 5.98919 8.6514 5.40364C9.23694 4.8181 9.94084 4.52533 10.7631 4.52533C11.5853 4.52533 12.2892 4.8181 12.8748 5.40364C13.4603 5.98919 13.7531 6.69308 13.7531 7.51533C13.7531 8.33758 13.4603 9.04148 12.8748 9.62702C12.2892 10.2126 11.5853 10.5053 10.7631 10.5053ZM10.7631 9.01033C11.1742 9.01033 11.5262 8.86395 11.8189 8.57118C12.1117 8.2784 12.2581 7.92646 12.2581 7.51533C12.2581 7.10421 12.1117 6.75226 11.8189 6.45949C11.5262 6.16672 11.1742 6.02033 10.7631 6.02033C10.352 6.02033 10 6.16672 9.70724 6.45949C9.41447 6.75226 9.26809 7.10421 9.26809 7.51533C9.26809 7.92646 9.41447 8.2784 9.70724 8.57118C10 8.86395 10.352 9.01033 10.7631 9.01033ZM7.77309 17.9803V17.2889C7.77309 16.4542 8.06274 15.7378 8.64205 15.1398C9.22137 14.5418 9.92838 14.2428 10.7631 14.2428H13.7531V15.7378H10.7631C10.3395 15.7378 9.98444 15.8904 9.6979 16.1957C9.41136 16.5009 9.26809 16.8653 9.26809 17.2889V17.9803H7.77309Z"
                fill="#0859DE"
                fill-opacity="0.85"
              />
            </svg>
          ) : (
            <svg
              className="mr-2 h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.28809 20.2228V18.7278H18.2381V20.2228H3.28809ZM4.78309 17.9803V13.4953C4.37196 12.8226 4.05427 12.1093 3.83002 11.3556C3.60577 10.6019 3.49365 9.83258 3.49365 9.04771C3.49365 8.28775 3.5902 7.54025 3.7833 6.80521C3.97641 6.07017 4.20377 5.34758 4.4654 4.63746C4.56507 4.37583 4.72702 4.16715 4.95127 4.01143C5.17552 3.8557 5.42469 3.77783 5.69877 3.77783C6.08498 3.77783 6.41513 3.90864 6.68921 4.17027C6.96329 4.43189 7.07542 4.74335 7.02559 5.10464L6.82002 6.80521C6.74527 7.40321 6.79822 7.97006 6.97887 8.50577C7.15951 9.04148 7.43048 9.51178 7.79177 9.91668C8.15307 10.3216 8.58911 10.6455 9.0999 10.8884C9.61069 11.1314 10.1651 11.2528 10.7631 11.2528C11.5106 11.2528 12.2612 11.3307 13.0149 11.4864C13.7687 11.6422 14.4258 11.8633 14.9865 12.1498C15.5471 12.4364 15.98 12.8008 16.2852 13.2431C16.5905 13.6853 16.7431 14.2304 16.7431 14.8782V17.9803H4.78309ZM6.27809 16.4853H15.2481V14.8782C15.2481 14.5792 15.1733 14.3145 15.0238 14.084C14.8743 13.8535 14.6625 13.6697 14.3885 13.5327C13.8777 13.2835 13.2859 13.0904 12.6131 12.9534C11.9404 12.8164 11.3237 12.7478 10.7631 12.7478C9.94084 12.7478 9.17776 12.5796 8.47387 12.2433C7.76997 11.9069 7.17197 11.4553 6.67987 10.8884C6.18776 10.3216 5.81713 9.66751 5.56796 8.92624C5.31879 8.18497 5.24404 7.41567 5.34371 6.61833C5.21913 6.99208 5.1288 7.39075 5.07274 7.81433C5.01668 8.23792 4.98865 8.64904 4.98865 9.04771C4.98865 9.77029 5.11635 10.4648 5.37174 11.1314C5.62714 11.7979 5.92925 12.4488 6.27809 13.0842V16.4853ZM10.7631 10.5053C9.94084 10.5053 9.23694 10.2126 8.6514 9.62702C8.06586 9.04148 7.77309 8.33758 7.77309 7.51533C7.77309 6.69308 8.06586 5.98919 8.6514 5.40364C9.23694 4.8181 9.94084 4.52533 10.7631 4.52533C11.5853 4.52533 12.2892 4.8181 12.8748 5.40364C13.4603 5.98919 13.7531 6.69308 13.7531 7.51533C13.7531 8.33758 13.4603 9.04148 12.8748 9.62702C12.2892 10.2126 11.5853 10.5053 10.7631 10.5053ZM10.7631 9.01033C11.1742 9.01033 11.5262 8.86395 11.8189 8.57118C12.1117 8.2784 12.2581 7.92646 12.2581 7.51533C12.2581 7.10421 12.1117 6.75226 11.8189 6.45949C11.5262 6.16672 11.1742 6.02033 10.7631 6.02033C10.352 6.02033 10 6.16672 9.70724 6.45949C9.41447 6.75226 9.26809 7.10421 9.26809 7.51533C9.26809 7.92646 9.41447 8.2784 9.70724 8.57118C10 8.86395 10.352 9.01033 10.7631 9.01033ZM7.77309 17.9803V17.2889C7.77309 16.4542 8.06274 15.7378 8.64205 15.1398C9.22137 14.5418 9.92838 14.2428 10.7631 14.2428H13.7531V15.7378H10.7631C10.3395 15.7378 9.98444 15.8904 9.6979 16.1957C9.41136 16.5009 9.26809 16.8653 9.26809 17.2889V17.9803H7.77309Z"
                fill="#141414"
                fill-opacity="0.85"
              />
            </svg>
          )}
          {!isShrunk && (
            <span className="font-poppins text-base font-medium">Requests</span>
          )}
        </Link>
        {/* <Link
                    to="/admin/discussion"
                    className={`flex items-center p-3.5   ${location.pathname === "/admin/discussion" ? "bg-[#E6F7FF] text-[#1890FF] border-r-2 border-[#0859DE]" : "text-black"}`}
                >


                    {location.pathname === "/admin/discussion" ?
                        <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.39934 16.9329C7.16636 16.9329 6.97108 16.8541 6.81348 16.6965C6.65588 16.5389 6.57709 16.3436 6.57709 16.1106V14.4661H17.2663V7.06586H18.9108C19.1438 7.06586 19.3391 7.14465 19.4967 7.30225C19.6543 7.45985 19.7331 7.65513 19.7331 7.88811V20.2219L16.4441 16.9329H7.39934ZM3.28809 16.1106V4.59911C3.28809 4.36613 3.36688 4.17085 3.52448 4.01325C3.68208 3.85565 3.87737 3.77686 4.11034 3.77686H14.7996C15.0326 3.77686 15.2278 3.85565 15.3854 4.01325C15.543 4.17085 15.6218 4.36613 15.6218 4.59911V11.9994C15.6218 12.2323 15.543 12.4276 15.3854 12.5852C15.2278 12.7428 15.0326 12.8216 14.7996 12.8216H6.57709L3.28809 16.1106ZM13.9773 11.1771V5.42136H4.93259V11.1771H13.9773Z" fill="#0859DE" fill-opacity="0.85" />
                        </svg> :
                        <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.39934 16.9329C7.16636 16.9329 6.97108 16.8541 6.81348 16.6965C6.65588 16.5389 6.57709 16.3436 6.57709 16.1106V14.4661H17.2663V7.06586H18.9108C19.1438 7.06586 19.3391 7.14465 19.4967 7.30225C19.6543 7.45985 19.7331 7.65513 19.7331 7.88811V20.2219L16.4441 16.9329H7.39934ZM3.28809 16.1106V4.59911C3.28809 4.36613 3.36688 4.17085 3.52448 4.01325C3.68208 3.85565 3.87737 3.77686 4.11034 3.77686H14.7996C15.0326 3.77686 15.2278 3.85565 15.3854 4.01325C15.543 4.17085 15.6218 4.36613 15.6218 4.59911V11.9994C15.6218 12.2323 15.543 12.4276 15.3854 12.5852C15.2278 12.7428 15.0326 12.8216 14.7996 12.8216H6.57709L3.28809 16.1106ZM13.9773 11.1771V5.42136H4.93259V11.1771H13.9773Z" fill="#141414" fill-opacity="0.85" />
                        </svg>}
                    {!isShrunk && <span className="font-poppins font-medium text-base">Discussion</span>}
                </Link> */}
        <Link
          to="/admin/announcement"
          className={`flex items-center p-3.5 ${location.pathname === "/admin/announcement" ? "border-r-2 border-[#0859DE] bg-[#E6F7FF] text-[#1890FF]" : "text-black"}`}
        >
          {location.pathname === "/admin/announcement" ? (
            <svg
              className="mr-1 h-7 w-7"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.4441 12.8187V11.1742H19.7331V12.8187H16.4441ZM17.4308 18.5745L14.7996 16.6011L15.7863 15.2855L18.4175 17.2589L17.4308 18.5745ZM15.7863 8.70746L14.7996 7.39186L17.4308 5.41846L18.4175 6.73406L15.7863 8.70746ZM5.75484 17.7522V14.4632H4.93259C4.48035 14.4632 4.09321 14.3022 3.77116 13.9801C3.44911 13.6581 3.28809 13.2709 3.28809 12.8187V11.1742C3.28809 10.722 3.44911 10.3348 3.77116 10.0128C4.09321 9.69073 4.48035 9.52971 4.93259 9.52971H8.22159L12.3328 7.06296V16.93L8.22159 14.4632H7.39934V17.7522H5.75484ZM10.6883 14.011V9.98194L8.67382 11.1742H4.93259V12.8187H8.67382L10.6883 14.011ZM13.1551 14.751V9.24192C13.5251 9.57082 13.8232 9.97167 14.0493 10.4445C14.2754 10.9173 14.3885 11.4346 14.3885 11.9965C14.3885 12.5583 14.2754 13.0757 14.0493 13.5485C13.8232 14.0212 13.5251 14.4221 13.1551 14.751Z"
                fill="#0859DE"
                fill-opacity="0.85"
              />
            </svg>
          ) : (
            <svg
              className="mr-1 h-7 w-7"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.4441 12.8187V11.1742H19.7331V12.8187H16.4441ZM17.4308 18.5745L14.7996 16.6011L15.7863 15.2855L18.4175 17.2589L17.4308 18.5745ZM15.7863 8.70746L14.7996 7.39186L17.4308 5.41846L18.4175 6.73406L15.7863 8.70746ZM5.75484 17.7522V14.4632H4.93259C4.48035 14.4632 4.09321 14.3022 3.77116 13.9801C3.44911 13.6581 3.28809 13.2709 3.28809 12.8187V11.1742C3.28809 10.722 3.44911 10.3348 3.77116 10.0128C4.09321 9.69073 4.48035 9.52971 4.93259 9.52971H8.22159L12.3328 7.06296V16.93L8.22159 14.4632H7.39934V17.7522H5.75484ZM10.6883 14.011V9.98194L8.67382 11.1742H4.93259V12.8187H8.67382L10.6883 14.011ZM13.1551 14.751V9.24192C13.5251 9.57082 13.8232 9.97167 14.0493 10.4445C14.2754 10.9173 14.3885 11.4346 14.3885 11.9965C14.3885 12.5583 14.2754 13.0757 14.0493 13.5485C13.8232 14.0212 13.5251 14.4221 13.1551 14.751Z"
                fill="#141414"
                fill-opacity="0.85"
              />
            </svg>
          )}
          {!isShrunk && (
            <span className="font-poppins text-base font-medium">
              Announcement
            </span>
          )}
        </Link>
        <button
          onClick={handleLogout}
          className={`flex items-center p-3.5 text-black`}
          disabled
        >
          <LogOut className="mx-1" size={17} />
          <span className="ml-2 cursor-not-allowed font-poppins text-base font-medium">
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidenav;
