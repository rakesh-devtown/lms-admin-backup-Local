import { useState, useEffect } from 'react';
import { CircleHelp, Settings, Copy, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Accordion from '../../../components/Accordion';
import ModuleModal from '../../../components/ModuleModal';
const View = () => {
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleClick = () => {
        setIsModalVisible(true);
    }

    const handleCloseModal = () => {
        setIsModalVisible(false);
    }

    const data = [
        {
            "title": "Full Stack Web Development",
            "code": "CCJ202403",
            "numberOfStudents": "55",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxe6IR3EKgALq0lEUvpW3GmPH8rpAv1cK0_w&s"
        }
        ,
        {
            "title": "Full Stack Web Development",
            "code": "CCJ202403",
            "numberOfStudents": "55",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxe6IR3EKgALq0lEUvpW3GmPH8rpAv1cK0_w&s"
        }
        ,
        {
            "title": "Full Stack Web Development",
            "code": "CCJ202403",
            "numberOfStudents": "55",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxe6IR3EKgALq0lEUvpW3GmPH8rpAv1cK0_w&s"
        }
        ,
        {
            "title": "Full Stack Web Development",
            "code": "CCJ202403",
            "numberOfStudents": "55",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxe6IR3EKgALq0lEUvpW3GmPH8rpAv1cK0_w&s"
        }
        ,

    ]
    return (
        <div className="flex">
            <div className="flex-grow">
                <div className="flex-row ml-4">
                    <div className=" bg-white mb-3">
                        <div className='flex p-5 justify-between'>
                            <div className='flex items-center'>
                                <ArrowLeft size={20} className='mr-4' />
                                <p className='font-poppins text-lg font-semibold'>Full Stack Web Development - FS2024031</p>
                            </div>
                            <div className=''>
                                <button className='bg-white text-black px-4 py-1 rounded-sm border-2 mr-2 font-poppins text-sm' onClick={handleClick} >Certificate</button>
                                <button className='bg-white text-black px-4 py-1 rounded-sm border-2 mr-2 font-poppins text-sm' onClick={handleClick} >Activities</button>
                                <button className='bg-white text-black px-4 py-1 rounded-sm border-2 mr-2 font-poppins text-sm' onClick={handleClick} >Students</button>
                                <button className='bg-[#1890FF] text-white px-4 py-1 rounded-sm font-poppins text-sm border-2'>Publish</button>
                            </div>
                        </div>
                    </div>
                    <div className='bg-white p-5'>
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
                            <button className='bg-white text-black px-4 py-1.5 rounded-sm font-poppins text-sm border-2'>Clear</button>
                        </div>
                    </div>

                    <div className='bg-white mt-3 pt-0.5'>
                        <div className='mx-4 my-2 bg-blue-200 justify-between flex p-5'>
                            <span className='font-poppins mx-4 text-xs font-semibold'>Description</span>
                            <span className='font-poppins text-xs font-semibold'>Action</span>
                        </div>
                        <div className='mx-4 border-2 rounded-lg mb-2'>
                            <Accordion />
                        </div>
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
            </div>
            <ModuleModal isVisible={isModalVisible} onClose={handleCloseModal} />
        </div >
    )
}

export default View