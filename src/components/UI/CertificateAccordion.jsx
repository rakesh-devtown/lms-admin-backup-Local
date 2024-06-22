import { useState } from 'react';
import { Transition } from '@headlessui/react';
import { Plus, ChevronDown, ChevronRight, X, Trash2 } from 'lucide-react';
import bg from '../../assets/bg.png';
import ModuleDropdown from './ModuleDropdown';

const CertificateAccordion = ({ accordionData }) => {
    const [openIndex, setOpenIndex] = useState(null);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);


    const handleClick = () => {
        setIsModalVisible(true);
        setActiveDropdown(null);
    }

    const handleCloseModal = () => {
        setIsModalVisible(false);
    }
    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };


    const handleMenuVisibilityChange = (flag, moduleIndex, dayIndex) => {
        if (flag) {
            setActiveDropdown({ moduleIndex, dayIndex });
        } else if (activeDropdown && activeDropdown.moduleIndex === moduleIndex && activeDropdown.dayIndex === dayIndex) {
            setActiveDropdown(null);
        }
    };

    return (
        <div className="p-2 mb-2 bg-white rounded-lg shadow">
            {accordionData && accordionData?.map((module, index) => (
                <div key={index} className={`${index != accordionData.length - 1 ? 'border-b' : ''}`}>
                    <div className='flex justify-between mx- items-center p-2'>
                        <div className='w-full flex pb-2 mt-1'>

                            {openIndex === index ?
                                <ChevronDown size={20} className='text-slate-400 cursor-pointer' onClick={() => handleToggle(index)} />
                                :
                                <ChevronRight size={20} className='text-slate-400 cursor-pointer' onClick={() => handleToggle(index)} />}
                            <span className='font-poppins text-base font-semibold mx-3'>
                                {module?.name}
                            </span>
                        </div>
                        <div>
                            {/* <ModuleDropdown /> */}
                        </div>
                    </div>
                    <Transition
                        show={openIndex === index}
                        enter="transition-opacity duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >


                        <div className="px-16 pb-3 flex flex-col">
                            <div className='pb-4 w-full'>
                                <div className='pt-1 pb-1 flex justify-between items-center'>
                                    <span className="text-normal text-[#2F366E] font-poppins pt- mx-4">
                                        Certificate Name
                                    </span>
                                </div>
                                <div className='mx-4'>
                                    <input
                                        type="text"
                                        // placeholder="Enter certificate name"
                                        value={`${module?.name}`}
                                        className="border-2 rounded-md p-2 w-full text-gray-700 font-poppins focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:font-poppins text-sm"
                                    />
                                </div>
                            </div>
                            <div className='pb-4 w-full'>
                                <span className="flex flex-col pb-2 text-normal text-[#2F366E] font-poppins mx-4">
                                    Certificate Image
                                    <span className='font-poppins text-xs text-slate-400'>Supported File: MP4, MKV, etc.</span>
                                </span>
                                <div className="mx-4 h-28 flex items-center justify-center bg-gray-50 border border-dashed border-blue-500 rounded-lg">
                                    <div className="text-center">
                                        {/* 
                                {selectedFile ? <span className='font-poppins text-sm text-gray-700'>{selectedFile?.name}</span> :
                                    <>
                                        <p className="text-sm text-gray-500 font-poppins">Drag Your File(s) Here</p>
                                        <button
                                            className="mt-4 px-4 py-2 border font-poppins border-dashed border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition"
                                            onClick={handleButtonClick}
                                        >
                                            Upload
                                        </button>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                    </>
                                } */}

                                        <div className='flex items-center'>
                                            <img src={module?.url} className='w-[20vh] h-[11vh] mx-5 object-cover rounded-md' />
                                            <a target='_blank' href={module?.url} className='font-poppins text-sm text-[#0859DE]'>{String(module?.url).substring(String(module?.url).length - 30)}</a>
                                        </div>                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>

                </div>
            ))}
        </div>
    );
};

export default CertificateAccordion;