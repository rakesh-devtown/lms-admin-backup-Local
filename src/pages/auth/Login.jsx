import { useState } from 'react';
import bg from '../../assets/bg.png'
import login1 from '../../assets/login1.png'
import devtownLogo from '../../assets/devtownLogo.png'
import { Mail, LockKeyhole, EyeOff, Eye } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate()
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(EyeOff);
    const handleToggle = () => {
        if (type === 'password') {
            setIcon(Eye);
            setType('text')
        } else {
            setIcon(EyeOff)
            setType('password')
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center"
        >
            <div className="bg-white rounded-2xl drop-shadow-[0_0px_10px_rgba(0,0,0,0.25)] p-8 flex items-center max-w-4xl">
                <div className="flex-1 border-r-2 mx-8 pr-6">
                    <img src={login1} alt="Illustration" className="max-w-full" />
                    <img src={devtownLogo} alt="Illustration" className="w-22 h-6 mx-28 mb-6" />

                </div>
                <div className="flex-1 p-6">
                    <h1 className="text-4xl font-bold mb-1 font-poppins">Hi, Welcome Back</h1>
                    <p className="mb-7 font-poppins text-sm">Login with Email and OTP. It's Simple 😊</p>
                    <label className="block text-sm font-medium text-black font-poppins mb-1">Email Address</label>
                    <div className='flex'>
                        <span className='flex items-center mb-4 text-slate-400'>
                            <Mail size={16} className="absolute m-3 cursor-pointer" />
                        </span>
                        <input
                            type="email"
                            placeholder="mailaddress@example.com"
                            className="w-full px-9 py-2.5 border rounded mb-4 placeholder:text-sm font-poppins"
                        />
                    </div>
                    <label className="block text-sm font-medium text-blalck font-poppins mb-1">One Time Password</label>
                    <div className="flex">
                        <div className='flex'>
                            <span className='flex items-center text-slate-400'>
                                <LockKeyhole size={16} className="absolute m-3 cursor-pointer" />
                            </span>
                            <input
                                type="text"
                                placeholder="Verification Code"
                                className="px-9 py-2.5 border rounded w-full placeholder:text-sm font-poppins"
                            />
                            <span className='flex justify-around items-center text-slate-400' onClick={handleToggle}>
                                {icon === EyeOff ? <EyeOff size={16} className="absolute mr-10 cursor-pointer" /> : <Eye className='absolute mr-10 cursor-pointer' size={16} />}
                            </span>
                        </div>
                        <button className="ml-3 w-1/3 bg-white rounded border">
                            <span className='font-poppins text-sm'>Get Code</span>
                        </button>
                    </div>
                    <button className="mt-6 bg-[#0859DE] text-white w-full py-3 rounded font-poppins font-semibold text-sm"
                        onClick={() => navigate('/admin/home')}
                    >
                        Login In
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
