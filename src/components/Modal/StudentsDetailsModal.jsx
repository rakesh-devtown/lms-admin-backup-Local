import { useState, useRef, useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';
import { Tabs, ConfigProvider, notification } from 'antd';
import { useDispatch } from 'react-redux';
import { editSection } from '../../store/slice/courseReducer';
const StudentsDetailsModal = ({ isVisible, onClose }) => {

    const dispatch = useDispatch();
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="p-10 relative">
                <div className="absolute top-2 right-1 mt-12 mr-11">
                    <button
                        onClick={onClose}>
                        <X className='text-white' />
                    </button>
                </div>
                <div className="flex-1 bg-white mt-12 rounded-lg w-[100vh] h-[60vh] overflow-auto">
                    <div className='border-b-2 p-4 pb-3 text-slate-700 font-poppins'>
                        <span>Edit Module Details</span>
                    </div>
                    <div className="flex flex-col space-y-2 border-b-2 pb-20">
                        <div className='pt-4 flex justify-between items-center'>
                            <span className="text-sm text-gray-700 font-poppins pt- mx-4">
                                Edit Module Name
                            </span>
                            <span className='font-poppins text-sm px-5'>
                                {/* {moduleDescription.length}/100 */}
                            </span>
                        </div>
                       

                    </div>

                </div>
            </div>
        </div>
    );
};

export default StudentsDetailsModal;
