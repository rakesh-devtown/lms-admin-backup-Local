import { useState, useRef } from 'react';
import { X, Trash2 } from 'lucide-react';
import { Tabs, ConfigProvider } from 'antd';

const DeleteStudentModal = ({ isVisible, onClose,handleDeleteStudent }) => {
    const [activeTab, setActiveTab] = useState("1")
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [moduleDescription, setModuleDescription] = useState("");
    const [numberOfLectures, setNumberOfLectures] = useState(1);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    }

    const handleDescriptionChange = (event) => {
        const text = event.target.value;
        if (text.length <= 100) {
            setModuleDescription(text);
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="p-10 relative">
                <div className="flex-1 bg-white mt-12 rounded-lg w-[50vh] h-[15vh] overflow-auto">
                    <div className="flex flex-col space-y-2 ">
                        <span className="text-sm flex text-gray-700 font-poppins mt-5 px-2 items-center mb-4">
                            <svg className='w-4 h-4 mr-2 ml-3' viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_2385_6662)">
                                    <path d="M7 0.875C3.61758 0.875 0.875 3.61758 0.875 7C0.875 10.3824 3.61758 13.125 7 13.125C10.3824 13.125 13.125 10.3824 13.125 7C13.125 3.61758 10.3824 0.875 7 0.875ZM6.5625 4.04688C6.5625 3.98672 6.61172 3.9375 6.67188 3.9375H7.32812C7.38828 3.9375 7.4375 3.98672 7.4375 4.04688V7.76562C7.4375 7.82578 7.38828 7.875 7.32812 7.875H6.67188C6.61172 7.875 6.5625 7.82578 6.5625 7.76562V4.04688ZM7 10.0625C6.82827 10.059 6.66476 9.98831 6.54455 9.86562C6.42434 9.74294 6.35701 9.57801 6.35701 9.40625C6.35701 9.23449 6.42434 9.06956 6.54455 8.94688C6.66476 8.82419 6.82827 8.75351 7 8.75C7.17173 8.75351 7.33524 8.82419 7.45545 8.94688C7.57566 9.06956 7.64299 9.23449 7.64299 9.40625C7.64299 9.57801 7.57566 9.74294 7.45545 9.86562C7.33524 9.98831 7.17173 10.059 7 10.0625Z" fill="#FAAD14" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_2385_6662">
                                        <rect width="14" height="14" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            Are you sure you want to Archive this course from student?
                        </span>
                        <div className='px-5 flex justify-end items-center'>
                            <button className='bg-[#F9FAFB] text-black px-7 py-1 mx-3 rounded-md font-poppins text-sm border-2' onClick={onClose}>No</button>
                            <button className='bg-[#1890FF] text-white px-7 py-1 rounded-md font-poppins text-sm border-2' onClick={handleDeleteStudent}>Yes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteStudentModal;
