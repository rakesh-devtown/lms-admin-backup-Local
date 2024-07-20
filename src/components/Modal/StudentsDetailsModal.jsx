import { useState, useRef, useEffect } from 'react';
import { X, Trash2, EllipsisVertical } from 'lucide-react';
import { Tabs, ConfigProvider, notification, Switch, Table } from 'antd';
import { useDispatch,useSelector } from 'react-redux';
import DeleteStudentModal from './DeleteStudentModal';
import { getStudentById } from '../../store/slice/courseReducer';
import PieChart from '../UI/PieChart';

const StudentsDetailsModal = ({ isVisible, onClose, id }) => {
    const [activeTab, setActiveTab] = useState("1")
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [archived, setArchived] = useState(false)
    const [page, setpage] = useState(1)

    const { loading, currentStudent } = useSelector(state => state.course);

    const dispatch = useDispatch();

    const handleDeleteStudent = () => {
        setArchived(true)
        setIsModalVisible(false);
    }

    if (!isVisible) return null;

    const handleClick = () => {
        setIsModalVisible(true);
    }
    const handleCloseModal = () => {
        setIsModalVisible(false);
    }
    const columns = [
        {
            title: 'Course Name',
            key: 'userId',
            render: (_, record) => (
                <span>{record?.batch?.course?.name}</span>
            )
        },
        {
            title: 'Progress',
            dataIndex: 'address',
            key: 'email',
            render: (_, record) => (
                <div className=''>
                        <PieChart progress={Math.round(record?.batch?.course?.totalLectureCompleted / record?.batch?.course?.totalLecture * 100)} />
                </div>
            )
        },

        {
            title: 'Status',
            render: (_, record) => {
                return (
                    <Switch checked={!record?.batch?.course?.isArchived ? true : false} onChange={handleClick} />
                )
            }

        },
        {
            title: 'Action',
            render : (_, record) => {
                return (
                    <button onClick={handleClick}>
                        <EllipsisVertical className='text-gray-400' />
                    </button>
                )
            
            }
        }
    ];


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="p-10 relative">
                <div className="absolute top-2 right-1 mt-12 mr-11">
                    <button
                        onClick={onClose}>
                        <X className='text-white' />
                    </button>
                </div>
                <div className="flex-1 bg-white mt-12 rounded-lg w-[140vh] h-[80vh] overflow-auto">
                    <div className='border-b-2 p-4 pb-6 text-slate-700 bg-[#2F366E] font-poppins flex justify-between items-center px-6'>
                        <div className='flex-1'>
                            <div className='flex mb-1'>
                                <span className='text-white text-lg'>{currentStudent?.name}</span>
                                <div className='bg-[#FFFFFF33] rounded-full flex items-center mx-2 px-2 my-1'>
                                    <svg width="6" height="7" viewBox="0 0 6 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="3" cy="3.5" r="3" fill="#D9D9D9" />
                                    </svg>
                                    <span className='text-xs ml-1 text-[#D9D9D9]'>Active</span>
                                </div>
                            </div>
                            <div className=''>
                                <span className='text-white text-xs'>{currentStudent?.email} | </span>
                                <span className='text-white text-xs'>{currentStudent?.phone ? currentStudent?.phone : 'No mobile number provided'}</span>
                            </div>
                        </div>
                        <div className='flex flex-col items-end'>
                            <span className='text-white text-xs mb-2'>Joined On</span>
                            <span className='text-white text-lg'>{new Date (currentStudent?.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                    <div className='bg-white'>
                        <ConfigProvider
                            theme={{
                                components: {
                                    Tabs: {
                                        inkBarColor: '#1890FF',
                                        itemHoverColor: "#1890FF",
                                        itemSelectedColor: "#1890FF",
                                    },
                                },
                            }}
                        >
                            <Tabs defaultActiveKey="1"
                                tabPosition="top"
                                size="medium"
                                onChange={(key) => setActiveTab(key)}
                                tabBarStyle={{ fontFamily: "Poppins", marginLeft: 20, marginBottom: 0 }}>
                                <Tabs.TabPane tab={
                                    <div className="flex items-center py-1">
                                        <p className="">Courses Enrolled</p>
                                        <div className={`${activeTab === '1' ? 'bg-blue-100' : 'bg-gray-200'} ml-2 rounded-full`}>
                                            <p className={`px-1.5 ${activeTab === '1' ? '' : 'text-slate-400'} text-xs`}>{currentStudent?.enrollments?.length}</p>
                                        </div>
                                    </div>
                                } key="1">
                                </Tabs.TabPane>
                                {/* <Tabs.TabPane tab={
                                    <div className="flex items-center">
                                        <p className="">View Students</p>
                                    </div>
                                } key="2">
                                </Tabs.TabPane> */}
                            </Tabs>
                        </ConfigProvider>
                    </div>
                    <div className='p-4 bg-white mt-3 h-[58vh] overflow-auto'>
                        <ConfigProvider
                            theme={{
                                token: {
                                    fontFamily: 'Poppins',
                                },
                            }}
                        >
                            <Table
                                columns={columns}
                                className='rounded-md border'
                                pagination={{
                                    total: currentStudent?.enrollments?.length || 0,
                                    pageSize: 3,
                                    onChange: (page) => setpage(page),
                                    showSizeChanger: false,
                                    showQuickJumper: false,
                                    style: { display: 'flex', justifyContent: 'flex-end', marginRight: 40 },
                                }}
                                dataSource={currentStudent?.enrollments} />
                        </ConfigProvider>
                    </div>

                </div>
            </div>
            <DeleteStudentModal isVisible={isModalVisible} onClose={handleCloseModal} handleDeleteStudent={handleDeleteStudent} />
        </div>
    );
};

export default StudentsDetailsModal;
