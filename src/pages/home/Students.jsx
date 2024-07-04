import { useState, useEffect } from 'react';
import { ConfigProvider, Tabs, Table, notification, Switch } from 'antd';
import { ArrowDownToLine } from 'lucide-react';
import DeleteStudentModal from '../../components/Modal/DeleteStudentModal';
import Papa from 'papaparse';
import Spinner from '../../components/Loader/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { addStudentToBatch, getAllEnrolledStudents } from '../../store/slice/courseReducer';

const Students = () => {
  const [activeTab, setActiveTab] = useState("1")
  const [search, setSearch] = useState('')
  const [uploadedFile, setUploadedFile] = useState(null);
  const [studentLoading, setStudentLoading] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [students, setStudents] = useState([])
  const [archived, setArchived] = useState(false)
  const [page, setpage] = useState(1)

  const { loading, allStudents } = useSelector(state => state.course);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: "",
    phone: "",
    batchId: ""
  })
  const handleClick = () => {
    setIsModalVisible(true);
  }

  const handleCloseModal = () => {
    setIsModalVisible(false);
  }

  const handleDeleteStudent = () => {
    setArchived(true)
    setIsModalVisible(false);
  }

  const handleFileUpload = async (event) => {
    try {
      setStudentLoading(true)
      setUploadedFile(null)

      const file = event.target.files[0];
      if (!file) return notification.error({ message: 'Error', description: 'Please select a file' })
      if (file.type !== 'text/csv') return notification.error({ message: 'Error', description: 'Please select a csv file' })
      //console.log(file)
      if (file) {
        setUploadedFile(file);
      }

      const batchId = formData.batchId
      if (!batchId) {
        return notification.error({ message: 'Error', description: 'No batch to add student to' })
      }

      Papa.parse(file, {
        skipEmptyLines: true,
        complete: function ({ data }) {
          const st = []
          data.forEach(s => {
            const [firstName, lastName, email, phone] = s
            if (email.toLowerCase().trim().match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {

              let data = {
                name: `${firstName.trim()} ${lastName.trim()}`,
                email: email.toLowerCase().trim(),
                phone: phone,
                batchId: batchId
              }
              st.push(data)
            } else {
              console.log('email doesnt match', email)
            }
          })
          setStudents(prev => [...st])
        },
        error: error => {
          console.log(error)
        },
      })

      return true

    } catch (error) {
      console.log(error)
    } finally {
      setStudentLoading(false)
    }
  };


  const handleAddBatchStudent = async () => {
    try {
      const batchId = formData.batchId
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        return notification.error({ message: 'Error', description: 'All fields are required' })
      }
      if (!batchId) {
        return notification.error({ message: 'Error', description: 'No batch to add student to' })
      }
      const data = {
        name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        email: formData.email,
        phone: formData.phone,
        batchId: batchId
      }

      if (data.name.trim().length <= 3) {
        return notification.error({ message: 'Error', description: 'Invalid name' })
      }

      await dispatch(addStudentToBatch([data]))

    } catch (err) {
      console.log(err)
    }
  }

  const addStudentsVisCSV = async () => {
    try {
      if (students.length === 0) return notification.error({ message: 'Error', description: 'No student to add' })

      const res = await dispatch(addStudentToBatch(students))
      if (res) {
        setStudents([])
        setUploadedFile(null)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const columns = [
    {
      title: 'Student Name',
      key: 'userId',
      render: (_, record) => (
        <span>{record?.name}</span>
      )
    },
    {
      title: 'Student Email Address',
      dataIndex: 'address',
      key: 'email',
      render: (_, record) => (
        <span className='font-poppins text-[#1890FF]'>{record?.email}</span>
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
      title: 'Archive',
      render: (_, record) => {
        return (
          <Switch checked={!archived ? true : false} onChange={handleClick} />
        )
      }

    },
  ];



  const handleInputChange = (event) => {
    setSearch(event.target.value);
    // if(event.target.value.l){
    //   dispatch(getAllEnrolledStudents(1, 20))
    // }
  };

  const onClickSearch = async()=>{
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
                  <p className={`px-1.5 ${activeTab === '2' ? '' : 'text-slate-400'} text-xs`}>{allStudents?.totalStudents}</p>
                </div>
              </div>
            } key="2">
            </Tabs.TabPane>
          </Tabs>
        </ConfigProvider>
      </div>

      {activeTab === '1' &&
        <div className='bg-white mt-3 h-[72vh] overflow-auto'>
          {(studentLoading || loading) && <Spinner />}
          <div className='pt-5'>
            <span className='font-poppins mx-7 pt-4 font-semibold'>Add Student</span>
            <div className='flex mx-9 mt-4'>
              <div className='flex flex-col w-1/2'>
                <span className='font-poppins text-sm'>Student First Name<span className='text-blue-500'>*</span></span>
                <input
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  type="text"
                  placeholder="first name"
                  className="border-2 rounded-md p-2.5 mt-1 mr-5 text-gray-700 font-poppins focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:font-poppins text-sm"
                />
                <span className='font-poppins text-sm mt-4'>Student Last Name<span className='text-blue-500'>*</span></span>
                <input
                  type="text"
                  value={formData.lastName}
                  placeholder="last name"
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="border-2 rounded-md p-2.5 mt-1 mr-5 text-gray-700 font-poppins focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:font-poppins text-sm"
                />
                  <span className='font-poppins text-sm mt-4'>Batch ID</span>
                  <input
                    type="text"
                    placeholder="Batch Id"
                    value={formData.batchId}
                    onChange={(e) => setFormData({ ...formData, batchId: e.target.value })}
                    className="border-2 rounded-md p-2.5 mt-1 mr-5 text-gray-700 font-poppins focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:font-poppins text-sm"
                  />
              </div>
              <div className='flex flex-col w-1/2'>
                <span className='font-poppins text-sm'>Student Email Address<span className='text-blue-500'>*</span></span>
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="border-2 rounded-md p-2.5 mt-1 mr-5 text-gray-700 font-poppins focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:font-poppins text-sm"
                />
                <span className='font-poppins text-sm mt-4'>Student Phone Number<span className='text-blue-500'>*</span></span>
                <input
                  type="text"
                  placeholder="phone number"
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  value={formData.phone}
                  className="border-2 rounded-md p-2.5 mt-1 mr-5 text-gray-700 font-poppins focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:font-poppins text-sm"
                />
              </div>
            </div>
            <div className='flex justify-end mx-14 mt-4'>
              <button onClick={handleAddBatchStudent} className='bg-[#0859DE] text-white px-14 py-1.5 rounded-md font-poppins text-sm border-2'>Add</button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center p-8">
            <div className="mx-1 border-2 border-dashed border-gray-300 rounded-md p-10 text-center w-[75vh] mb-6 md:mb-0">
              <div className="flex flex-col items-center justify-center h-full">
                <input
                  type="file"
                  id="fileUpload"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <label htmlFor='fileUpload' className='flex w-[78vh] h-[14vh] flex-col items-center justify-center cursor-pointer'>
                  {uploadedFile ?
                    <div>
                      <p className="text-base text-blue-500 font-poppins">{uploadedFile.name}</p>
                      {<p className=' text-blue-700'>Correct Student Details : {students.length}</p>}
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

            <div className="border rounded-md w-[78vh] h-[25vh] mx-2">
              <table className="w-full divide-y divide-gray-200 font-poppins">
                <thead className="bg-gray-50">
                  <tr className='divide-x border-b'>
                    <th className="px-3 py-3 text-left text-xs font-medium text-black tracking-wider">firstName</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-black tracking-wider">lastName</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-black tracking-wider">email</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-black tracking-wider">phone</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-black tracking-wider">batchId</th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
              <div className="mt-12 px-48 text-center">
                <a target='_blank' href={'https://student-platform-assets.s3.ap-south-1.amazonaws.com/course/e13acf65-862b-4890-8790-c31ac9f602c0/studyMaterial/25248056846550fa72cd20987cb11304.csv'}>
                  <button className="bg-white border-[#0859DE] border-2 flex font-poppins items-center text-sm text-[#0859DE] py-2 px-4 rounded-lg">
                    <ArrowDownToLine size={16} className="mr-2" />
                    Download CSV Format
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div className='flex justify-end mx-14 pb-4'>
            <button onClick={addStudentsVisCSV} className='bg-[#8C8C8C80]  text-white px-14 py-1.5 rounded-md font-poppins text-sm border-2'>Add</button>
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
                placeholder='Search student using email/phone number'
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
                  total: allStudents?.totalStudents || 0,
                  pageSize: 20,
                  onChange: (page) => setpage(page),
                  showSizeChanger: false,
                  showQuickJumper: false,
                  style: { display: 'flex', justifyContent: 'flex-end', marginRight: 40 },
                }}
                dataSource={allStudents?.students || []} />
            </ConfigProvider>
          </div>
        </div>
      }
      <DeleteStudentModal isVisible={isModalVisible} onClose={handleCloseModal} handleDeleteStudent={handleDeleteStudent} />
    </div>
  )
}

export default Students