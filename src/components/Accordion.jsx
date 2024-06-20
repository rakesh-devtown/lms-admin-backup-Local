import { useState } from 'react';
import { Transition } from '@headlessui/react';
import { Plus, ChevronDown, ChevronRight, X, Trash2 } from 'lucide-react';
import videologo from '../assets/videologo.png';
import { Dropdown } from 'antd';
import ModuleDropdown from './ModuleDropdown';
import EditLectureModal from './EditLectureModal';

const Accordion = ({accordionData}) => {
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


    const items = [
        {
            label:
                <div className='flex items-center py-1 cursor-pointer' onClick={handleClick}>
                    <Plus size={15} className='text-[#0859DE] cursor-pointer mr-2' />
                    <span className='font-poppins text-sm text-[#0859DE]'>Edit Lecture</span>
                </div>,
            key: '0',
        },
        {
            label:
                <div className='flex items-center py-1'>
                    <Plus size={15} className='text-[#0859DE] cursor-pointer mr-2' />
                    <span className='font-poppins text-sm text-[#0859DE]'>Add Coding Exercise</span>
                </div>,
            key: '1',
        },
        {
            label:
                <div className='flex items-center py-1'>
                    <Plus size={15} className='text-[#0859DE] cursor-pointer mr-2' />
                    <span className='font-poppins text-sm text-[#0859DE]'>Add Quiz</span>
                </div>,
            key: '2',
        },
        {
            label:
                <div className='flex items-center py-1'>
                    <Plus size={15} className='text-[#0859DE] cursor-pointer mr-2' />
                    <span className='font-poppins text-sm text-[#0859DE]'>Add Assignment</span>
                </div>,
            key: '3',
        },
        {
            label:
                <div className='flex items-center py-1'>
                    <Trash2 size={15} className='text-[#CD2222] cursor-pointer mr-2' />
                    <span className='font-poppins text-sm text-[#CD2222]'>Delete Lecture</span>
                </div>,
            key: '4',
        },

    ];

    return (
        <div className="p-3 mb-2 bg-white rounded-lg">
            {accordionData.map((module, index) => (
                <div key={index} className={`${index != accordionData.length ? 'border-b' : ''}`}>
                    <div className='flex justify-between mx- items-center p-2'>
                        <div className='w-full flex pb-2 mt-1'>

                            {openIndex === index ?
                                <ChevronDown size={20} className='text-slate-400 cursor-pointer' onClick={() => handleToggle(index)} />
                                :
                                <ChevronRight size={20} className='text-slate-400 cursor-pointer' onClick={() => handleToggle(index)} />}
                            <span className='font-poppins text-base font-semibold mx-3'>
                                {module.title}
                            </span>
                        </div>
                        <div>
                            <ModuleDropdown />
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


                        <div className="pb-3 pl-1 pr-2 border-t pt-2">
                            {module.days.map((day, i) => (
                                <div key={i} className="flex justify-between py-2 px-1 items-center">
                                    <div className='flex items-center mb-1'>
                                        <img src={videologo} alt="video" className='w-5 h-5 mr-3 rounded-md' />
                                        <span className='font-poppins text-normal'>{day}</span>
                                    </div>
                                    <Dropdown
                                        menu={{
                                            items,
                                        }}
                                        trigger={['click']}
                                        onVisibleChange={(flag) => handleMenuVisibilityChange(flag, i, day)}
                                    >
                                        <a onClick={(e) => e.preventDefault()}>
                                            {activeDropdown && activeDropdown.moduleIndex === i && activeDropdown.dayIndex === day ?
                                                <X size={20} className='text-blue-600 cursor-pointer' /> :
                                                <Plus size={20} className='text-blue-600 cursor-pointer' />
                                            }
                                        </a>
                                    </Dropdown>
                                </div>
                            ))}

                        </div>
                    </Transition>
                </div>
            ))}
            <EditLectureModal isVisible={isModalVisible} onClose={handleCloseModal} />
        </div>
    );
};

export default Accordion;
