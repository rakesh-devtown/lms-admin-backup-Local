import { useState, useEffect } from 'react';
import { ConfigProvider, Tabs, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../components/Loader/Spinner';
import { debounce } from 'lodash';
import ApproveRejectButton from '../../components/UI/ApproveRejectButton';
import { getRequests ,requestStatus} from '../../store/slice/requestReducer';
import { X, Check } from 'lucide-react';


const Requests = () => {
  const [activeTab, setActiveTab] = useState("1")
  const [search, setSearch] = useState('')
  const [studentLoading, setStudentLoading] = useState(false)
  const [page, setpage] = useState(1)
  const [hover, setHover] = useState(false);
  const { shrunk, setShrunk } = useState(false);
  const dispatch = useDispatch();

  const { loading, requests } = useSelector(state => state.request);

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
      title: 'Previous Name',
      key: 'userId',
      render: (_, record) => (
        <span>{record?.previousName}</span>
      )
    },
    {
      title: 'Requested Name Change',
      key: 'userId',
      render: (_, record) => (
        <span>{record?.updatedName}</span>
      )
    },
    {
      title: 'Action',
      render: (_, record) => {
        if (record?.status==='pending'){
          return (
            <div className="flex space-x-2">
                <button
                    className="text-green-600 flex items-center border border-[#328801] rounded px-2 py-1 hover:bg-[#328801] hover:text-white"
                    onClick={()=>{
                        dispatch(requestStatus(record?.id, {
                            status: 'approved',
                            adminRemark: 'request approved'
                        }))
                    }}
                >
                    <Check size={16} className='' /> {hover ? '' : 'Approve'}
                </button>
                {hover ? (
                    <button
                        className="text-white bg-red-600 border flex items-center border-red-600 rounded px-3 py-1"
                        onClick={() => {
                            dispatch(requestStatus(record?.id, {
                                status: 'rejected',
                                adminRemark: 'request approved'
                            }))
                        }} onMouseLeave={() => {
                            setHover(false)
                            setShrunk(false)
                        }
                        }
                    >
                        <X size={16} className='mr-1 text-white' /> Reject
                    </button>
                ) : (
                    <div
                        className="border items-center flex bg-red-600 border-red-600 rounded px-1 py-1 text-red-600"
                        onMouseEnter={() => {
                            setHover(true)
                            setShrunk(true)
                        }}
                    >
                        <X size={17} className='text-white' />
                    </div>
                )}
            </div>)
        }
        else if(record?.status==='approved'){
          return(
          <span className="text-green-600 font-semibold">Approved</span>
          )
        }
        else{
          return <span className="text-red-600 font-semibold">Rejected</span>;
        }
      }

    },
  ];


  const handleInputChange = (event) => {
    setSearch(event.target.value);
    // if(event.target.value.l){
    //   dispatch(getAllEnrolledStudents(1, 20))
    // }
  };

  const onClickSearch = async () => {
    await dispatch(getRequests(page, 20))
  }


  useEffect(() => {
    dispatch(getRequests(page, 20))
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
                  <p className={`px-1.5 my-1 ${activeTab === '1' ? '' : 'text-slate-400'} text-xs`}>{requests?.total || 0} New</p>
                </div>
              </div>
            } key="1">
            </Tabs.TabPane>
            {/* <Tabs.TabPane tab={
              <div className="flex items-center">
                <p className="">Email</p>
                <div className={`${activeTab === '2' ? 'bg-blue-100' : 'bg-gray-200'} ml-2 rounded-full`}>
                  <p className={`px-1.5 my-1 ${activeTab === '2' ? '' : 'text-slate-400'} text-xs`}>{requests?.total || 0} New</p>
                </div>
              </div>
            } key="2">
            </Tabs.TabPane> */}
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
                  total: requests?.response || 0,
                  pageSize: 20,
                  onChange: (page) => setpage(page),
                  showSizeChanger: false,
                  showQuickJumper: false,
                  style: { display: 'flex', justifyContent: 'flex-end', marginRight: 40 },
                }}
                dataSource={requests?.response || []} />
            </ConfigProvider>
          </div>
        </div>
      }

      {/* {activeTab === '2' &&
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
                  total: requests?.response || 0,
                  pageSize: 20,
                  onChange: (page) => setpage(page),
                  showSizeChanger: false,
                  showQuickJumper: false,
                  style: { display: 'flex', justifyContent: 'flex-end', marginRight: 40 },
                }}
                dataSource={requests?.response || []} />
            </ConfigProvider>
          </div>
        </div>

      } */}
      {/* <DeleteStudentModal isVisible={isModalVisible} onClose={handleCloseModal} handleDeleteStudent={handleDeleteStudent} /> */}
    </div>
  )
}

export default Requests