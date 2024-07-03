import { useState, useEffect } from 'react';
import { ConfigProvider, Tabs, Table, notification, Switch } from 'antd';
import { ArrowDownToLine } from 'lucide-react';
import DeleteStudentModal from '../../components/Modal/DeleteStudentModal';
import Papa from 'papaparse';
import Spinner from '../../components/Loader/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { addStudentToBatch, getAllEnrolledStudents } from '../../store/slice/courseReducer';
import ApproveRejectButton from '../../components/UI/ApproveRejectButton';

const Requests = () => {
  const [activeTab, setActiveTab] = useState("1")
  const [search, setSearch] = useState('')
  const [uploadedFile, setUploadedFile] = useState(null);
  const [studentLoading, setStudentLoading] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [students, setStudents] = useState([])
  const [archived, setArchived] = useState(false)
  const [page, setpage] = useState(1)
  const [status, setStatus] = useState(null);
  const [hover, setHover] = useState(false);
  const { loading, allStudents } = useSelector(state => state.course);

  const dispatch = useDispatch();

  const handleClick = () => {
    setIsModalVisible(true);
  }

  const handleCloseModal = () => {
    setIsModalVisible(false);
  }




  const columns = [
    {
      title: 'Student Email Address',
      dataIndex: 'address',
      key: 'email',
      render: (_, record) => (
        <span className='font-poppins text-[#1890FF]'>{record?.email}</span>
      )
    },
    {
      title: 'Student Name',
      key: 'userId',
      render: (_, record) => (
        <span>{record?.name}</span>
      )
    },

    // {
    //   title: 'Courses Enrolled',
    //   dataIndex: 'address',
    //   key: 'email',
    //   render: (_, record) => (
    //     <span className='font-poppins text-[#1890FF]'>{record?.email}</span>
    //   )
    // },
    {
      title: 'Joined at',
      key: 'createdAt',
      render: (_, record) => (
        <span>{new Date(record?.createdAt).toLocaleDateString()}</span>
      )
    },
    {
      title: 'Action',
      render: (_, record) => {
        return (
          <ApproveRejectButton />
        );
      }

    },
  ];

  const data = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];

  const handleInputChange = (event) => {
    setSearch(event.target.value);
    // if(event.target.value.l){
    //   dispatch(getAllEnrolledStudents(1, 20))
    // }
  };

  const onClickSearch = async () => {
    await dispatch(getAllEnrolledStudents(1, 20, search))
  }

  //console.log(allStudents[0])
  useEffect(() => {
    dispatch(getAllEnrolledStudents(page, 20))
  }, [page])


  return (
    <div className="flex-row mx-2 h-[80vh]">
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
          <div className='flex p-5 justify-between'>
            <p className='font-poppins text-lg font-semibold'>Request</p>
          </div>
          <Tabs defaultActiveKey="1"
            tabPosition="top"
            size="medium"
            onChange={(key) => setActiveTab(key)}
            tabBarStyle={{ fontFamily: "Poppins", marginLeft: 20, marginBottom: 0 }}>
            <Tabs.TabPane tab={
              <div className="flex items-center">
                <p className="">Name</p>
                <div className={`${activeTab === '1' ? 'bg-blue-100' : 'bg-gray-200'} ml-2 rounded-full`}>
                  <p className={`px-1.5 my-1 ${activeTab === '1' ? '' : 'text-slate-400'} text-xs`}>{allStudents[0]?.length || 0} New</p>
                </div>
              </div>
            } key="1">
            </Tabs.TabPane>
            <Tabs.TabPane tab={
              <div className="flex items-center">
                <p className="">Email</p>
                <div className={`${activeTab === '2' ? 'bg-blue-100' : 'bg-gray-200'} ml-2 rounded-full`}>
                  <p className={`px-1.5 my-1 ${activeTab === '2' ? '' : 'text-slate-400'} text-xs`}>{allStudents[0]?.length || 0} New</p>
                </div>
              </div>
            } key="2">
            </Tabs.TabPane>
          </Tabs>
        </ConfigProvider>
      </div>

      {activeTab === '1' &&
        <div className=''>
          {(studentLoading || loading) && <Spinner />}
          <div className='bg-white p-5 mt-3 h-full'>
            <div className='flex justify-end items-center'>
              <input
                type="text"
                onChange={handleInputChange}
                value={search}
                className='border-2 border-gray-300 rounded-sm px-2 py-1.5 mx-2 font-poppins text-sm w-96'
                placeholder='Search via name'
              />
              <button
                className='bg-[#1890FF] text-white px-4 py-1.5 rounded-sm font-poppins text-sm border-2 mx-2' onClick={onClickSearch}>Search</button>
            </div>
          </div>
          <div className='p-6 bg-white mt-3 h-[58vh] overflow-auto'>
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
                  total: allStudents[0] || 0,
                  pageSize: 20,
                  onChange: (page) => setpage(page),
                  showSizeChanger: false,
                  showQuickJumper: false,
                  style: { display: 'flex', justifyContent: 'flex-end', marginRight: 40 },
                }}
                dataSource={allStudents[0] || []} />
            </ConfigProvider>
          </div>
        </div>
      }

      {activeTab === '2' &&
        <div className=''>
          {(studentLoading || loading) && <Spinner />}
          <div className='bg-white p-5 mt-3 h-full'>
            <div className='flex justify-end items-center'>
              <input
                type="text"
                onChange={handleInputChange}
                value={search}
                className='border-2 border-gray-300 rounded-sm px-2 py-1.5 mx-2 font-poppins text-sm w-96'
                placeholder='Search via email'
              />
              <button
                className='bg-[#1890FF] text-white px-4 py-1.5 rounded-sm font-poppins text-sm border-2 mx-2' onClick={onClickSearch}>Search</button>
            </div>
          </div>
          <div className='p-6 bg-white mt-3 h-[58vh] overflow-auto'>
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
                  total: allStudents[0] || 0,
                  pageSize: 20,
                  onChange: (page) => setpage(page),
                  showSizeChanger: false,
                  showQuickJumper: false,
                  style: { display: 'flex', justifyContent: 'flex-end', marginRight: 40 },
                }}
                dataSource={allStudents[0] || []} />
            </ConfigProvider>
          </div>
        </div>

      }
      {/* <DeleteStudentModal isVisible={isModalVisible} onClose={handleCloseModal} handleDeleteStudent={handleDeleteStudent} /> */}
    </div>
  )
}

export default Requests