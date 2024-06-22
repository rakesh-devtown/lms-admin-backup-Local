import { useState, useEffect } from 'react';
import { CircleHelp} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Accordion from '../Accordion';
import ModuleModal from '../ModuleModal';
const Main = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);


    const handleClick = () => {
        setIsModalVisible(true);
    }

    const handleCloseModal = () => {
        setIsModalVisible(false);
    }
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
        <div>
            <div className='bg-white p-5 mt-3'>
                <div className='flex justify-end items-center'>
                    <p className='font-poppins text-sm'>Select Week/Topic</p>
                    <CircleHelp className='text- mx-1' size={12} />
                    <p className='mb-1'>:</p>
                    <input
                        type="text"
                        className='border-2 border-gray-300 rounded-sm px-2 py-1.5 mx-2 font-poppins text-sm w-96'
                        placeholder='Please enter'
                    />
                    <button className='bg-[#1890FF] text-white px-4 py-1.5 rounded-sm font-poppins text-sm border-2 mx-2'>Search</button>
                </div>
            </div>

            <div className='bg-white mt-3 pt-0.5'>
                <div className='mx-4 my-3 bg-blue-200 justify-between flex p-5'>
                    <span className='font-poppins mx-4 text-xs font-semibold'>Description</span>
                    <span className='font-poppins text-xs font-semibold'>Action</span>
                </div>
                <div className='mx-4 rounded-lg pb-4'>
                    <div className='whitespace-nowrap inline rounded-full bg-orange-200 px-2 text-xs py-1'>
                        <span className='font-poppins text-orange-700'>Frontend Web development</span>
                    </div>
                    <Accordion accordionData={accordionData} />
                    <div className='mx-4 mb-10'>
                        <button className='bg-[#0859DE] w-full rounded-md p-1.5 mb-3'
                            onClick={handleClick}
                        >
                            <span className='font-poppins text-sm text-white'>
                                + Add Module
                            </span>
                        </button>
                    </div>
                    <div className='whitespace-nowrap inline rounded-full bg-purple-200 px-2 text-xs py-1 mb-4'>
                        <span className='font-poppins text-purple-700'>Backend Web development</span>
                    </div>
                    <Accordion accordionData={accordionData} />
                    <div className='mx-4 mb-10'>
                        <button className='bg-[#0859DE] w-full rounded-md p-1.5 mb-3'
                            onClick={handleClick}
                        >
                            <span className='font-poppins text-sm text-white'>
                                + Add Module
                            </span>
                        </button>
                    </div>
                </div>

            </div>
            <ModuleModal isVisible={isModalVisible} onClose={handleCloseModal} />
        </div>
    )
}

export default Main