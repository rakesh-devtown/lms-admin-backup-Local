import { useState, useRef } from 'react';
import { X } from 'lucide-react';
import { Tabs, ConfigProvider, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from './Loader/Spinner';
import { uploadFile } from '../store/slice/uploadReducer';
import { createCourse } from '../store/slice/courseReducer';
const CoursesModal = ({ isVisible, onClose }) => {
    const [activeTab, setActiveTab] = useState("1")
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const {uploadLoading} = useSelector(state => state.upload); 
    const {loading} = useSelector(state => state.course);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name:'',
        courseType:'upload',
        description:'',
        bannerImg:''
    });

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async(event) => {
        try{
            const file = event.target.files[0];
            if(file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'image/svg+xml'){
                return notification.error({message:'Error',description:'Invalid file format. Please upload a valid image file'});
            }
            const url = await dispatch(uploadFile(file,'image','/course/thumbnail'));
            if(url)
            {
                setSelectedFile(file);
                setFormData({...formData, bannerImg:url});
            }
        }catch(error){
            console.log(error);
        }

    }

    const handleSubmit=async()=>{
        try{
            setFormData({
                ...formData,
                name:formData.name.trim(),
                description:formData.description.trim(),
            })
            if(!formData.name || !formData.description || !formData.bannerImg){
                return notification.error({message:'Error',description:'All fields are required'});
            }
            const res = await dispatch(createCourse(formData));
            if(res){
                setFormData({
                    name:'',
                    courseType:'upload',
                    description:'',
                    bannerImg:''
                })
                setSelectedFile(null);
                onClose();
            }
        }catch(error){
            console.log(error);
        }
    }

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            {(uploadLoading || loading) && <Spinner />}
            <div className="p-10 relative">
                <div className="absolute top-2 right-1 mt-12 mr-11">
                    <button
                        onClick={onClose}>
                        <X className='text-white' />
                    </button>
                </div>
                <div className="flex-1 bg-white mt-12 rounded-lg w-[100vh] h-[80vh] overflow-auto">
                    <div className='px-4 pt-2 border-2'>
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

                            <Tabs defaultActiveKey="1"
                                tabPosition="top"
                                size="medium"
                                onChange={(key) => setActiveTab(key)}
                                tabBarStyle={{ fontFamily: "Poppins", marginRight: 1, marginBottom: 0 }}>
                                <Tabs.TabPane tab={
                                    <div className="flex items-center mx-1">
                                        <p className="text-md">Video Courses</p>
                                    </div>
                                } key="1">
                                </Tabs.TabPane>
                            </Tabs>
                        </ConfigProvider>
                    </div>
                    <div className="flex flex-col space-y-1 border-b-2 pb-8">
                        <span className="text-sm text-gray-700 font-poppins mt-4 mx-4">
                            Course Name <span className="text-blue-500">*</span>
                        </span>
                        <input
                            onChange={(e)=>{setFormData({...formData, name:e.target.value})}}
                            type="text"
                            placeholder="Course name"
                            className="border-2 rounded-md p-2 m-3 text-gray-700 font-poppins focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:font-poppins text-sm"
                        />
                        <span className="text-sm text-gray-700 font-poppins pt-4 mx-4">
                            Description <span className="text-blue-500">*</span>
                        </span>
                        <textarea
                            onChange={(e)=>{setFormData({...formData, description:e.target.value})}}
                            type="text"
                            placeholder="Add Course Description"
                            rows={4}
                            className="border-2 resize-none rounded-md p-2 m-3 text-gray-700 font-poppins focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:font-poppins text-sm"
                        />
                        <span className="text-sm text-gray-700 font-poppins pt-4 mx-4">
                            Upload Thumbnail <span className='text-blue-500'>*</span>
                        </span>
                        <div className="mx-4 h-28 flex items-center justify-center bg-gray-50 border border-dashed border-blue-500 rounded-lg">
                            <div className="text-center">

                                {selectedFile ? 
                                <div className='font-poppins text-sm text-gray-700'>
                                <div>
                                        <img src={formData.bannerImg} alt="thumbnail" className="h-20 w-20 object-contain" />
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
                        <p className="text-xs text-gray-500 mt-2 mx-4 font-poppins">Supported File: JPG, PNG, SVG</p>
                    </div>
                    <div className='flex justify-end mt-1.5 mx-3'>
                        <button onClick={handleSubmit} className="bg-[#0859DE] text-white font-poppins text-sm rounded-md p-2 px-4 m-2 hover:bg-blue-600 transition">
                            Create Course
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursesModal;
