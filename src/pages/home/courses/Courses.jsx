import { useState, useEffect } from 'react';
import { ConfigProvider, Tabs } from 'antd';
import { CircleHelp, Settings, Copy } from 'lucide-react';
import CoursesModal from '../../../components/CoursesModal';
import SettingsModal from '../../../components/SettingsModal';
import { useNavigate } from 'react-router-dom';
const Courses = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("1")
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);

    const handleClick = () => {
        setIsModalVisible(true);
    }

    const handleCloseModal = () => {
        setIsModalVisible(false);
    }

    const handleSettingsClick = () => {
        setIsSettingsModalVisible(true);
    }

    const handleCloseSettingsModal = () => {
        setIsSettingsModalVisible(false);
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
                        <ConfigProvider
                            theme={{
                                components: {
                                    Tabs: {
                                        inkBarColor: '#1890FF',
                                        itemHoverColor: "#1890FF",
                                        itemSelectedColor: "#1890FF",
                                    },
                                },
                            }}>
                            <div className='flex p-5 justify-between'>
                                <p className='font-poppins text-lg font-semibold'>Batches</p>
                                <div className=''>
                                    <button className='bg-white text-black px-4 py-1 rounded-sm border-2 mx-4 font-poppins text-sm' onClick={handleClick} >+ Create Courses</button>
                                    <button className='bg-[#1890FF] text-white px-4 py-1 rounded-sm font-poppins text-sm border-2'>Publish</button>
                                </div>
                            </div>
                            <Tabs defaultActiveKey="1"
                                tabPosition="top"
                                size="medium"
                                onChange={(key) => setActiveTab(key)}
                                tabBarStyle={{ fontFamily: "Poppins", marginLeft: 20, marginBottom: 0 }}>
                                <Tabs.TabPane tab={
                                    <div className="flex items-center">
                                        <p className="">Video Courses</p>
                                        <div className='bg-[#E6F7FF] ml-2 rounded-full'>
                                            <p className='px-1.5'>0</p>
                                        </div>
                                    </div>
                                } key="1">
                                </Tabs.TabPane>
                            </Tabs>
                        </ConfigProvider>
                    </div>

                    <div className='bg-white p-5'>
                        <div className='flex justify-end items-center'>
                            <p className='font-poppins text-sm'>Select Course/Batch</p>
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
                    <div className='flex flex-wrap w-full'>
                        {data ? data.map((item, index) => {
                            return (
                                <div key={index} className='w-[51vh] mt-4 h-[25vh] mr-6 relative bg-white rounded-md mb-1 '>
                                    <div className='flex p-5 pb-3 border-b-2 border-[#59963626]'>
                                        <img src={item.image} className='w-[7vh] h-[7vh] object-cover mt-3' />
                                        <div className='flex-row justify-between items-center mx-2'>
                                            <p className='font-poppins text-xl font-semibold px-2'>{item.title}</p>
                                            <div className='flex items-center'>
                                                <p className='font-poppins text-xs mx-2 mt-1 text-[#599636]'>{item.code}</p>
                                                <Copy className='text-[#599636] cursor-pointer mt-1' size={12} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='m-3 mr-4 mt-2 mb-3'>
                                        <div className='whitespace-nowrap inline items-center px-2 bg-[#59963626] rounded-xl'>
                                            <span className='text-[#599636] font-poppins text-xs'>{item.numberOfStudents} Students On Board</span>
                                        </div>
                                    </div>
                                    <div className='bg-[#599636] pb-3  pt-3 flex rounded-b-md divide-x-2 items-center text-center'>
                                        <Settings className='text-white w-1/2 cursor-pointer' size={20} onClick={handleSettingsClick} />
                                        <p className='text-white w-1/2 font-poppins text-sm cursor-pointer' onClick={() => {
                                            navigate(`/admin/home/courses/view`)
                                        }}>View</p>
                                    </div>
                                </div>
                            )
                        }) :
                            <div className='flex justify-center items-center w-full h-full mt-48'>
                                <p className='font-poppins text-md font-md text-gray-400'>No Course</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <CoursesModal isVisible={isModalVisible} onClose={handleCloseModal} />
            <SettingsModal isVisible={isSettingsModalVisible} onClose={handleCloseSettingsModal} />
        </div >
    )
}

export default Courses