import { useState } from 'react';
import { Transition } from '@headlessui/react';
import { ArrowRightLeft, ArrowRight, ArrowDown, EllipsisVertical, Plus, ChevronDown, ChevronRight } from 'lucide-react';
import videologo from '../assets/videologo.png';
import Dropdown from './Dropdown';
import { useSelector } from 'react-redux';
const Accordion = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const [changeCurriculum, setChangeCurriculum] = useState(false);
    const {currentCourse} = useSelector(state => state.course);
    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const accordionData = [
        {
            title: 'Module 1: Untitled',
            days: ['Day 1: Untitled', 'Day 2: Untitled', 'Day 3: Untitled', 'Day 4: Untitled', 'Day 5: Untitled'],
        },
        {
            title: 'Module 2: Untitled',
            days: ['Day 1: Untitled', 'Day 2: Untitled', 'Day 3: Untitled', 'Day 4: Untitled', 'Day 5: Untitled'],
        },
        {
            title: 'Module 2: Untitled',
            days: ['Day 1: Untitled', 'Day 2: Untitled', 'Day 3: Untitled', 'Day 4: Untitled', 'Day 5: Untitled'],
        },

    ];

    return (
        <div className="p-3 mb-2 bg-white rounded-lg">
            {currentCourse?.sections && currentCourse?.sections?.map((module, index) => (
                <div key={index} className={`${index != accordionData.length - 1 ? 'border-b' : ''}`}>
                    <div className='flex justify-between mx- items-center p-2'>
                        <div className='w-full flex pb-2 mt-1'>

                            {openIndex === index ?
                                <ChevronDown size={20} className='text-slate-400 cursor-pointer' onClick={() => handleToggle(index)} />
                                :
                                <ChevronRight size={20} className='text-slate-400 cursor-pointer' onClick={() => handleToggle(index)} />}
                            <span className='font-poppins text-sm font-semibold mx-3'>
                                Module {(index+1) + ': ' + module?.name}
                            </span>
                        </div>
                        <div>
                            <Dropdown sectionId={module?.id}/>
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
                            {module?.sectionItems?.map((item, i) => (
                                <div key={i} className="flex justify-between py-2 px- items-center">
                                    <div className='flex items-center mb-1'>
                                        <img src={videologo} alt="video" className='w-5 h-5 mr-2 rounded-md' />
                                        <span className='font-poppins text-sm'>{`Day ${item?.orderNumber}: ${item?.title}`}</span>
                                    </div>
                                    <div className='group flex'>
                                        <div className=' flex items-center invisible group-hover:visible cursor-pointer'>
                                            <ArrowRightLeft size={18} className='text-blue-600 cursor-pointer mr-2' />
                                            <p className='font-poppins text-sm text-blue-500 mr-6'
                                                onClick={() => setChangeCurriculum(!changeCurriculum)}
                                            >Change Cirriculum</p>
                                        </div>
                                        <Plus size={20} className='text-blue-600 cursor-pointer mr-' />

                                    </div>
                                </div>
                            ))}
                            <button className="mt-4 w-full py-2 bg-[#0859DEBF] font-poppins text-sm text-white font-medium rounded">+ Add Curriculum</button>
                        </div>
                    </Transition>
                </div>
            ))}
        </div>
    );
};

export default Accordion;


