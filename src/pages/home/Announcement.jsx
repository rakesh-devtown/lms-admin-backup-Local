import { useState, useEffect, useRef } from 'react';
import { ConfigProvider, notification } from 'antd';
import Papa from 'papaparse';
import Spinner from '../../components/Loader/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { addStudentToBatch } from '../../store/slice/courseReducer';
import RichTextEditor from '../../components/UI/RichTextEditor';
import { uploadFile } from '../../store/slice/uploadReducer';
import { sendBulkEmail } from '../../store/slice/announcementReducer';


const Announcement = () => {
  const [activeTab, setActiveTab] = useState("1")
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [studentLoading, setStudentLoading] = useState(false)
  const [students, setStudents] = useState([])
  const [emails, setEmails] = useState([])

  const { loading } = useSelector(state => state.course);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    emails: [],
    source: '',
    poster: '',
    subject: '',
    description: '',
    url: '',
    text: ''
  })

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    try {
      const file = event.target.files[0];
      if (file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'image/svg+xml') {
        return notification.error({ message: 'Error', description: 'Invalid file format. Please upload a valid image file' });
      }
      const url = await dispatch(uploadFile(file, 'image', '/course/thumbnail'));
      if (url) {
        setSelectedFile(file);
        setFormData({ ...formData, poster: url });
      }
    } catch (error) {
      console.log(error);
    }

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

      // const batchId = formData.batchId
      // if (!batchId) {
      //   return notification.error({ message: 'Error', description: 'No batch to add student to' })
      // }

      Papa.parse(file, {
        skipEmptyLines: true,
        complete: function ({ data }) {
          const st = []
          data.forEach(s => {
            const [email] = s
            if (email.toLowerCase().trim().match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
              st.push(email.toLowerCase().trim())
            } else {
              console.log('email doesnt match', email)
            }
          })
          setEmails(st)
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

  const handleBulkEmailSend = async () => {
    try {
      if (!formData.source || !formData.subject || emails.length === 0) {
        return notification.error({ message: 'Error', description: 'All fields are required' })
      }

      const data = {
        emails: emails,
        source: formData.source,
        poster: formData.poster,
        subject: formData.subject,
        description: formData.description,
        url: [{
          'url' : formData.url,
          'text' : formData.text
        }]
      }

      if (data.emails.length === 0) {
        return notification.error({ message: 'Error', description: 'Invalid email data' })
      }

      const res= await dispatch(sendBulkEmail(data))

      if (res){
        setFormData({
          emails: [],
          source: '',
          poster: '',
          subject: '',
          description: '',
          url: '',
          text: ''
        })
        setEmails([])
      }
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
            <p className='font-poppins text-lg font-semibold'>{activeTab === '1' ? 'Send a new bulk email announcement' : 'View Students'}</p>
          </div>
        </ConfigProvider>
      </div>

      {activeTab === '1' &&
        <div className='bg-white mt- h-[72vh] overflow-auto'>
          {(studentLoading || loading) && <Spinner />}
          <div className="mx-12 border-2 border-dashed border-gray-300 rounded-md p-10 text-center mb-6 md:mb-0">
            <div className="flex items-center justify-center h-full w-full">
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
                    {<p className=' text-blue-700'>Correct Student Details : {emails.length}</p>}
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
          <div className='pt-5'>
            <div className='flex flex-col mx-12'>
              <label className='font-poppins text-sm'><span className='text-red-500'>*</span>Source:</label>
              <select
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                className="border-2 rounded-md p-2 mt-1 text-gray-700 font-poppins focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:font-poppins text-sm"
              >
                <option value="" disabled>Select source email</option>
                <option value="support@devtown.in">support@devtown.in</option>
                <option value="hr@devtown.in">hr@devtown.in</option>
                <option value="certificate@devtown.in">certificate@devtown.in</option>
              </select> 
            </div>
            <div className='flex flex-col mx-12 mt-6'>
              <label className='font-poppins text-sm'><span className='text-red-500'>*</span>Mail Title:</label>
              <input
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                type="text"
                placeholder="Enter title for the mail"
                className="border-2 rounded-md p-2.5 mt-1 mr- text-gray-700 font-poppins focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:font-poppins text-sm"
              />
            </div>
            <div className='flex flex-col mx-8 mt-6'>
              <label className='font-poppins text-sm ml-4 mb-2'><span className='text-red-500'>*</span>Description:</label>
              <div className="w-full font-poppins">
                <RichTextEditor flag={1}
                  value={formData.description}
                  setValue={(value) => setFormData({ ...formData, description: value })}
                />
              </div>
            </div>
            <div className='flex flex-col mx-12 mt-16'>
              <label className='font-poppins text-sm'><span className='text-red-500'></span>URL:</label>
              <input
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                type="text"
                placeholder="Enter URL for any resource required"
                className="border-2 rounded-md p-2.5 mt-1 mr- text-gray-700 font-poppins focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:font-poppins text-sm"
              />
            </div>
            <div className='flex flex-col mx-12 mt-5'>
              <label className='font-poppins text-sm'><span className='text-red-500'></span>URL Button Name:</label>
              <input
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                type="text"
                placeholder="Enter URL Button Name"
                className="border-2 rounded-md p-2.5 mt-1 text-gray-700 font-poppins focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:font-poppins text-sm"
              />
            </div>
            <div className='flex flex-col mx-12'>
              <label className='font-poppins text-sm mx- mt-5'><span className='text-red-500'></span>Image:</label>
              <div className="mt-2 h-28 flex items-center justify-center bg-gray-50 border border-dashed border-blue-500 rounded-lg">
                <div className="text-center">
                  {selectedFile ?
                    <div className='font-poppins text-sm text-gray-700'>
                      <div>
                        <img src={formData.poster} alt="thumbnail" className="h-20 w-20 object-contain" />
                      </div>
                      {selectedFile.name}
                      <button
                        className="font-poppins text-blue-500 rounded-md transition border-0 px-5"
                        onClick={handleButtonClick}
                      >
                        Edit
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div> :
                    <>
                      <p className="text-sm text-gray-500 font-poppins">Drag Your File(s) Here</p>
                      <button
                        className="mt-4 px-4 py-2 border font-poppins border-dashed border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition"
                        onClick={handleButtonClick}
                      >
                        Upload
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </>
                  }
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2 mx- font-poppins">Supported File: JPG, PNG, SVG</p>
            </div>

            <div className='flex justify-end mx-14 mt-6'>
              <button onClick={handleBulkEmailSend} className='bg-[#0859DE] text-white px-14 py-1.5 rounded-md font-poppins text-sm border-2'>Send</button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center p-8">

          </div>
          {/* <div className='flex justify-end mx-14 pb-4'>
            <button onClick={addStudentsVisCSV} className='bg-[#8C8C8C80]  text-white px-14 py-1.5 rounded-md font-poppins text-sm border-2'>Add</button>
          </div> */}
        </div>
      }
    </div>
  )
}

export default Announcement