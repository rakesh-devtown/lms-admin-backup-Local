import { useState, useEffect } from 'react';
import { ConfigProvider, Tabs, Table } from 'antd';
import { ArrowDownToLine } from 'lucide-react';
import DeleteStudentModal from '../../components/Modal/DeleteStudentModal';
const Students = () => {
  const [activeTab, setActiveTab] = useState("1")
  const [searchText, setSearchText] = useState('')
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteStudent, setDeleteStudent] = useState(false)
  const handleClick = () => {
    setIsModalVisible(true);
  }

  const handleCloseModal = () => {
    setIsModalVisible(false);
  }

  const handleDeleteStudent = () => {
    setDeleteStudent(true);
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };


  const columns = [
    {
      title: 'Student Name',
      dataIndex: 'name',
      key: 'name',
      // filteredValue: [searchText],
      // onFilter: (value, record) => {
      //     return String(record?.name).toLowerCase().includes(value.toLowerCase())
      //         ||
      //         String(record?.emailAddress).toLowerCase().includes(value.toLowerCase())
      // },
      // render: (_, record) =>
      //     <div className="flex items-center w-full">

      //     </div>
    },
    {
      title: 'Student Email Address',
      dataIndex: 'address',
      key: 'age',
      render: (text) => (
        <span className='font-poppins text-[#1890FF]'>{text}</span>
      )
    },
    {
      title: 'Joined at',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Courses Enrolled',
      dataIndex: 'address',
      key: 'address',
      render: (_, record) => (
        <div className='flex items-center'>
          <span className='text-[#0859DE]'>Enrolled Courses</span>
          <div className='bg-blue-200 rounded-full px-1.5 py-0.5 text-xs mx-2'>
            <span className='text-[#0859DE]'>{record.courses}</span>
          </div>
        </div>
      )
    },
    {
      title: 'Is Active',
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return String(record?.farmDetails?.name).toLowerCase().includes(value.toLowerCase())
          ||
          String(record?.farmDetails?.address).toLowerCase().includes(value.toLowerCase())
      },
      render: (_, record) => (
        <div className="flex items-center w-full">
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />


            <svg onClick={handleClick} width="46" height="26" viewBox="0 0 46 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="44" height="22" rx="11" fill="#1890FF" />
              <g filter="url(#filter0_d_2097_9963)">
                <g clip-path="url(#clip0_2097_9963)">
                  <rect x="24" y="2" width="18" height="18" rx="9" fill="white" />
                </g>
              </g>
              <defs>
                <filter id="filter0_d_2097_9963" x="20" y="0" width="26" height="26" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset dy="2" />
                  <feGaussianBlur stdDeviation="2" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.137255 0 0 0 0 0.0431373 0 0 0 0.2 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2097_9963" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2097_9963" result="shape" />
                </filter>
                <clipPath id="clip0_2097_9963">
                  <rect x="24" y="2" width="18" height="18" rx="9" fill="white" />
                </clipPath>
              </defs>
            </svg>


          </label>
        </div>
      ),
    },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <a>Delete</a>
    //     </Space>
    //   ),
    // },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      courses: 2,
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      courses: 2,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      courses: 2,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  return (
    <div className="flex-row mx-2">
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
            <p className='font-poppins text-lg font-semibold'>{activeTab === '1' ? 'Add Students' : 'View Students'}</p>
          </div>
          <Tabs defaultActiveKey="1"
            tabPosition="top"
            size="medium"
            onChange={(key) => setActiveTab(key)}
            tabBarStyle={{ fontFamily: "Poppins", marginLeft: 20, marginBottom: 0 }}>
            <Tabs.TabPane tab={
              <div className="flex items-center">
                <p className="">Add Students</p>
              </div>
            } key="1">
            </Tabs.TabPane>
            <Tabs.TabPane tab={
              <div className="flex items-center">
                <p className="">View Students</p>
                <div className={`${activeTab === '2' ? 'bg-blue-100' : 'bg-gray-200'} ml-2 rounded-full`}>
                  <p className={`px-1.5 ${activeTab === '2' ? '' : 'text-slate-400'} text-xs`}>2.5K</p>
                </div>
              </div>
            } key="2">
            </Tabs.TabPane>
          </Tabs>
        </ConfigProvider>
      </div>

      {activeTab === '1' &&
        <div className='bg-white mt-3'>
          <div className='pt-5'>
            <span className='font-poppins mx-7 pt-4 font-semibold'>Add Student</span>
            <div className='flex mx-9 mt-4'>
              <div className='flex flex-col w-1/2'>
                <span className='font-poppins text-sm'>Student First Name<span className='text-blue-500'>*</span></span>
                <input
                  type="text"
                  placeholder="Your name"
                  className="border-2 rounded-md p-2.5 mt-1 mr-5 text-gray-700 font-poppins focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:font-poppins text-sm"
                />
                <span className='font-poppins text-sm mt-4'>Student Last Name<span className='text-blue-500'>*</span></span>
                <input
                  type="text"
                  placeholder="Your name"
                  className="border-2 rounded-md p-2.5 mt-1 mr-5 text-gray-700 font-poppins focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:font-poppins text-sm"
                />
                <span className='font-poppins text-sm mt-4'>Batch ID <span className='text-blue-500'>(Optional)</span></span>
                <input
                  type="text"
                  placeholder="Your name"
                  className="border-2 rounded-md p-2.5 mt-1 mr-5 text-gray-700 font-poppins focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:font-poppins text-sm"
                />
              </div>
              <div className='flex flex-col w-1/2'>
                <span className='font-poppins text-sm'>Student Email Address<span className='text-blue-500'>*</span></span>
                <input
                  type="text"
                  placeholder="Your name"
                  className="border-2 rounded-md p-2.5 mt-1 mr-5 text-gray-700 font-poppins focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:font-poppins text-sm"
                />
                <span className='font-poppins text-sm mt-4'>Student Phone Number<span className='text-blue-500'>*</span></span>
                <input
                  type="text"
                  placeholder="Your name"
                  className="border-2 rounded-md p-2.5 mt-1 mr-5 text-gray-700 font-poppins focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:font-poppins text-sm"
                />
              </div>
            </div>
            <div className='flex justify-end mx-14 mt-4'>
              <button className='bg-[#0859DE] text-white px-14 py-1.5 rounded-md font-poppins text-sm border-2'>Add</button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center p-8">
            <div className="ml-2 border-2 border-dashed border-gray-300 rounded-md p-10 text-center w-[75vh] mb-6 md:mb-0">
              <div className="flex flex-col items-center justify-center h-full">
                <input
                  type="file"
                  id="fileUpload"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <label htmlFor='fileUpload' className='flex w-[78vh] h-[14vh] flex-col items-center justify-center cursor-pointer'>
                  {uploadedFile ? <div>
                    <p className="text-base text-blue-500 font-poppins">{uploadedFile.name}</p>
                  </div>
                    :
                    <>
                      <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M42.2439 20.9114L42.2345 20.8739L36.9752 7.50986C36.7408 6.75518 36.0423 6.23486 35.2502 6.23486H13.9314C13.1345 6.23486 12.4267 6.76455 12.2017 7.52861L7.28453 20.7567L7.27047 20.7895L7.26109 20.827C7.20016 21.0567 7.18141 21.2911 7.21422 21.5208C7.20953 21.5958 7.20484 21.6708 7.20484 21.7458V38.8974C7.20608 39.6528 7.50675 40.377 8.04096 40.9112C8.57517 41.4455 9.29936 41.7461 10.0548 41.7474H39.4548C41.0252 41.7474 42.3048 40.4677 42.3095 38.8974V21.7458C42.3095 21.6849 42.3095 21.6239 42.3048 21.5724C42.3236 21.3427 42.3048 21.1224 42.2439 20.9114ZM28.3783 18.8958L28.3642 19.6317C28.3267 21.7364 26.8736 23.1521 24.7502 23.1521C23.7142 23.1521 22.8236 22.8192 22.1814 22.1864C21.5392 21.5536 21.1877 20.6724 21.1689 19.6317L21.1548 18.8958H11.508L15.2345 9.83486H33.947L37.7767 18.8958H28.3783ZM10.8002 22.4958H18.1736C19.3127 25.1724 21.7361 26.7521 24.7548 26.7521C26.3345 26.7521 27.8017 26.3114 28.9877 25.477C30.0283 24.7458 30.8392 23.7239 31.3642 22.4958H38.7002V38.1474H10.8002V22.4958Z" fill="#1890FF" />
                      </svg>
                      <p className="mb-1 mt-1 text-sm text-gray-500 font-poppins">Click or drag file to this area to upload</p>
                      <p className="text-xs text-gray-400 px-16 font-poppins">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
                    </>
                  }
                </label>


              </div>
            </div>

            <div className="border rounded-md w-[78vh] h-[25vh] mx-5">
              <table className="w-full divide-y divide-gray-200 font-poppins">
                <thead className="bg-gray-50">
                  <tr className='divide-x border-b'>
                    <th className="px-3 py-3 text-left text-xs font-medium text-black tracking-wider">First Name</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-black tracking-wider">Last Name</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-black tracking-wider">Email Address</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-black tracking-wider">Phone Number</th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
              <div className="mt-12 mx-40 text-center">
                <button className="bg-white border-[#0859DE] border-2 flex font-poppins items-center text-sm text-[#0859DE] py-2 px-4 rounded-lg">
                  <ArrowDownToLine size={16} className="mr-2" />
                  Download CSV Format
                </button>
              </div>
            </div>
          </div>
          <div className='flex justify-end mx-14 mb-4 pb-6'>
            <button className='bg-[#8C8C8C80] text-white px-14 py-1.5 rounded-md font-poppins text-sm border-2'>Add</button>
          </div>
        </div>
      }

      {activeTab === '2' &&

        <div>
          <div className='bg-white p-5 mt-3'>
            <div className='flex justify-end items-center'>
              <input
                type="text"
                className='border-2 border-gray-300 rounded-sm px-2 py-1.5 mx-2 font-poppins text-sm w-96'
                placeholder='Search student using email/phone number'
              />
              <button className='bg-[#1890FF] text-white px-4 py-1.5 rounded-sm font-poppins text-sm border-2 mx-2'>Search</button>
            </div>
          </div>
          <div className='p-6 bg-white mt-3'>
            <ConfigProvider
              theme={{
                token: {
                  fontFamily: 'Poppins',
                },
              }}
            >
              <Table columns={columns} className='rounded-md border' dataSource={data} />
            </ConfigProvider>
          </div>
        </div>
      }
      <DeleteStudentModal isVisible={isModalVisible} onClose={handleCloseModal} handleDeleteStudent={handleDeleteStudent} />
    </div>
  )
}

export default Students