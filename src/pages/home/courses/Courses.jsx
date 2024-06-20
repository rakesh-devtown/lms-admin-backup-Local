import { useState, useEffect } from 'react';
import { ConfigProvider, Tabs, notification } from 'antd';
import { CircleHelp, Settings, Copy } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import CoursesModal from '../../../components/CoursesModal';
import SettingsModal from '../../../components/SettingsModal';
import { useNavigate } from 'react-router-dom';
import { getCourses, getCurriculumOfCourse } from '../../../store/slice/courseReducer';
import Spinner from '../../../components/Loader/Spinner';

const Courses = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("1")
    const [isModalVisible, setIsModalVisible] = useState(false);
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const {loading, courses} = useSelector(state => state.course);
    const [search, setSearch] = useState('');

    const [isSettingsModalVisible, setIsSettingsModalVisible] = useState({
        isVisible: false,
        data:{}
    });

    const [isCopied, setIsCopied] = useState(false);

    // This is the function we wrote earlier
    async function copyTextToClipboard(text) {
      if ('clipboard' in navigator) {
        return await navigator.clipboard.writeText(text);
      } 
    }
  
    // onClick handler function for the copy button
    const handleCopyClick = (text) => {
      copyTextToClipboard(text)
        .then(() => {
          notification.success({ message: 'Copied to clipboard' });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    

    const handleClick = () => {
        setIsModalVisible(true);
    }

    const handleCloseModal = () => {
        setIsModalVisible(false);
    }

    const handleSettingsClick = (data) => {
        setIsSettingsModalVisible({
            isVisible: true,
            data
        });
    }

    const handleCloseSettingsModal = () => {
        setIsSettingsModalVisible({
            isVisible: false,
            data:{}
        });
    }

    const handleClear = () => {
        setSearch('');
        dispatch(getCourses(page,20));
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        dispatch(getCourses(page,20,search));
    }

    const viewCourse = (courseId) => {
       // dispatch(getCurriculumOfCourse(courseId));
        navigate(`/admin/home/courses/view/${courseId}`)
    }

    useEffect(() => {
        dispatch(getCourses(page,20));
    }, [])

    return (
        <div className="flex h-full overflow-hidden relative">
            {loading && <Spinner />}
            <div className="flex-grow h-full">
                <div className="flex-row ml-4 h-full">
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
                                            <p className='px-1.5'>{courses?.length}</p>
                                        </div>
                                    </div>
                                } key="1">
                                </Tabs.TabPane>
                            </Tabs>
                        </ConfigProvider>
                    </div>

                    <div className='bg-white p-5'>
                        <form className='flex justify-end items-center' onSubmit={handleSearchSubmit}>
                            <p className='font-poppins text-sm'>Select Course/Batch</p>
                            <CircleHelp className='text- mx-1' size={12} />
                            <p className='mb-1'>:</p>
                            <input
                                onChange={(e) => { setSearch(e.target.value) }}
                                value={search}
                                type="text"
                                className='border-2 border-gray-300 rounded-sm px-2 py-1.5 mx-2 font-poppins text-sm w-96'
                                placeholder='Please enter'
                            />
                            <button type='submit' className='bg-[#1890FF] text-white px-4 py-1.5 rounded-sm font-poppins text-sm border-2 mx-2'>Search</button>
                            <button type='button' className='bg-white text-black px-4 py-1.5 rounded-sm font-poppins text-sm border-2' onClick={handleClear}>Clear</button>
                        </form>
                    </div>
                    <div className='flex flex-wrap w-full h-[60vh] overflow-auto gap-2'>
                        {(courses && courses?.length>0) ? courses.map((item, index) => {
                            return (
                                <div key={index} className='w-[30%] mt-4 h-[25vh] mr-6 relative bg-white rounded-md mb-1 '>
                                    <div className='flex p-5 pb-3 border-b-2 border-[#59963626]'>
                                        <img src={item.bannerImg} className='w-[7vh] h-[7vh] object-cover mt-3' />
                                        <div className='flex-row justify-between items-center mx-2'>
                                            <p className='font-poppins text-xl font-semibold px-2'>{item.name}</p>
                                            <div className='flex items-center'>
                                                <p className='font-poppins text-xs mx-2 mt-1 text-[#599636]'>{item?.batches?.length>0 ? item?.batches[0]?.id : ''}</p>
                                                <Copy onClick={handleCopyClick.bind(this,item?.batches?.length>0 ? item?.batches[0]?.id : '')} className='text-[#599636] cursor-pointer mt-1' size={12} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='m-3 mr-4 mt-2 mb-3'>
                                        <div className='whitespace-nowrap inline items-center px-2 bg-[#59963626] rounded-xl'>
                                            <span className='text-[#599636] font-poppins text-xs'>{item.numberOfStudents} Students On Board {item?.enrollmentCount}</span>
                                        </div>
                                    </div>
                                    <div className='bg-[#599636] pb-3  pt-3 flex rounded-b-md divide-x-2 items-center text-center'>
                                        <Settings className='text-white w-1/2 cursor-pointer' size={20} onClick={handleSettingsClick.bind(this,item)} />
                                        <p className='text-white w-1/2 font-poppins text-sm cursor-pointer' onClick={viewCourse.bind(this,item?.id)}>View</p>
                                    </div>
                                </div>
                            )
                        }) :
                            <div className='flex justify-center items-center w-full h-full mt-18'>
                                <p className='font-poppins text-md font-md text-gray-400'>No Course</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <CoursesModal isVisible={isModalVisible} onClose={handleCloseModal} />
            { isSettingsModalVisible.isVisible && <SettingsModal data={isSettingsModalVisible.data} isVisible={isSettingsModalVisible.isVisible} onClose={handleCloseSettingsModal} />}
        </div >
    )
}

export default Courses