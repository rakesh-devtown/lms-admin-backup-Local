import { useState, useRef, useEffect } from 'react';
import { X, Trash2, Edit, Book, BookA, NotebookTextIcon, Video } from 'lucide-react';
import RichTextEditor from './RichTextEditor';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from './Loader/Spinner';
import { addSectionItemData, getSectionItemById } from '../store/slice/courseReducer';
import { notification } from 'antd';
import { uploadFile } from '../store/slice/uploadReducer';
import VideoUploadModal from './VideoUploader/VideoUploadModal';
import VideoPlayer from './VideoUploader/VideoPlayer';
const EditLectureModal = ({ isVisible, onClose }) => {
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [videoModal,setVideoModal] = useState(false);
    const [videoPlayerModal,setVideoPlayerModal] = useState({
        visible:false,
        url:''
    });
    const [moduleDescription, setModuleDescription] = useState("");
    const {currentSectionItem,loading,currentCourse} = useSelector(state => state.course);
    const dispatch = useDispatch();

    const handleVideoButtonClick = () => {
        videoInputRef.current.click();
    };

    const handleFileChange = async(event) => {
        try{
            const file = event.target.files[0];
            if(!file)
            {
                return;
            }
            const url = await dispatch(uploadFile(file,'',`/course/${currentCourse?.id || 'section'}/studyMaterial`));
            if(url)
            {
                setSelectedFile(file);
                setFormData({...formData, studyMaterial:url});
            }
        }catch(err){
            console.log(err);
        }
    }

    const handleDescriptionChange = (event) => {
        const text = event.target.value;
        if (text.length <= 100) {
            setFormData({ ...formData, title: text });
        }
    };

    const [formData, setFormData] = useState({
        title: "",
        content:"",
        note:"",
        link:"",
        studyMaterial:"",
    })

    const saveLecture = async() => {
        try{
            if(!currentSectionItem?.id) return notification.error({message:'Error',description:'please refresh the page and try again'});
            const data={
                title:String(formData?.title).trim(),
                ...formData,
            }
            //if(data.title.length === 0) return notification.error({message:'Error',description:'Please enter the title'});
            if(data?.title?.length===0 || !data?.title) return notification.error({message:'Error',description:'Please enter the title'});
           const res= await dispatch(addSectionItemData(data,currentSectionItem?.id));
           if(res){
                onClose();
            }
        }catch(err){
            console.log(err)
        }
    }

    const handleVideoUploadClose=async()=>{
        try{
            setVideoModal(false);
            await dispatch(getSectionItemById(currentSectionItem?.id))
        }catch(err){
            console.log(err);
        }
    }

    if (!isVisible) return null;

    useEffect(()=>{
        if(currentSectionItem){
            setFormData({
                title:currentSectionItem?.title,
                content:currentSectionItem?.content,
                note:currentSectionItem?.note,
                link:currentSectionItem?.link,
                studyMaterial:currentSectionItem?.studyMaterial,
                video:currentSectionItem?.videoLink,
            })

            console.log(currentSectionItem)

            if(currentSectionItem?.studyMaterial){
                setSelectedFile({name:String(currentSectionItem?.studyMaterial).substring(String(currentSectionItem?.studyMaterial).length - 36)});
            }
        }
    },[currentSectionItem])

    //console.log(currentSectionItem)

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="p-10 relative">
                {loading && <Spinner/>}
                <div className="absolute top-2 right-1 mt-12 mr-11">
                    <button
                        onClick={onClose}>
                        <X className='text-white' />
                    </button>
                </div>
                <div className="flex-1 bg-white mt-12 rounded-lg w-[100vh] h-[60vh] overflow-auto">
                    <div className='border-b-2 p-4 pb-3 text-slate-700 font-poppins'>
                        <span>Add Class Details</span>
                    </div>
                    <div className="flex flex-col space-y-2 pb-20">
                        <div className='pt-4 flex justify-between items-center'>
                            <span className="text-normal text-[#2F366E] font-poppins pt- mx-4">
                                Lecture Name
                            </span>
                            <span className='font-poppins text-sm px-5'>
                                {moduleDescription.length}/100
                            </span>
                        </div>
                        <input
                            type="text"
                            placeholder="Add your module name"
                            className="border-2 rounded-md p-2 m-3 text-[#2F366E] font-poppins focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:font-poppins text-sm"
                            value={formData?.title}
                            onChange={handleDescriptionChange}
                        />

                        <div className='pt-4 flex justify-between items-center'>
                            <span className="text-noraml text-[#2F366E] font-poppins pt- mx-4">
                                Description
                            </span>

                        </div>
                        <div className="w-full font-poppins">
                            <RichTextEditor flag={1}
                                value={formData.content}
                                setValue={(value) => setFormData({ ...formData, content: value })}
                             />
                        </div>
                        <span className="text-normal text-[#2F366E] font-poppins pt-14 mx-4">
                            Notes
                        </span>
                        <div className="w-full font-poppins">
                            <RichTextEditor flag={2} 
                                value={formData.note}
                                setValue={(value) => setFormData({ ...formData, note: value })}
                            />
                        </div>
                        <span className="flex flex-col pb-1 text-normal text-[#2F366E] font-poppins pt-14 mx-4">
                            Upload Any Study Material
                            <span className='font-poppins text-xs text-slate-400'>Upload any files to help your students complete this module</span>
                        </span>
                        <div className="mx-4 h-28 flex items-center justify-center bg-gray-50 border border-dashed border-blue-500 rounded-lg">
                            <div className="text-center">

                                {selectedFile ? 
                                    <div className='mx-4 h-28 flex justify-between items-center '>
                                        <div className='flex items-center'>
                                            <NotebookTextIcon className='w-[7vh] h-[7vh] mx-5 object-cover rounded-md' color='blue' />
                                            <a href={formData?.studyMaterial} target='_blank'><span className='font-poppins text-sm text-[#0859DE]'>{String(formData?.studyMaterial)?.substring(String(formData?.studyMaterial).length - 36)}</span></a>
                                        </div>
                                        <button
                                                className="font-poppins text-blue-500 rounded-md transition border-0 px-5"
                                                onClick={handleButtonClick}
                                                >
                                                    <Edit size={20} />
                                        </button>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                 :
                                    <>
                                        <p className="text-sm text-gray-500 font-poppins">Drag Your File(s) Here</p>
                                        <button
                                            className="mt-4 px-4 py-2 border font-poppins border-dashed border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition"
                                            onClick={handleThumbnailButtonClick}
                                        >
                                            Upload
                                        </button>
                                        <input
                                            type="file"
                                            ref={thumbnailInputRef}
                                            className="hidden"
                                            onChange={handleThumbnailChange}
                                        />
                                    </>
                                }
                            </div>
                        </div>
                        <span className="text-normal text-[#2F366E] font-poppins pt-4 mx-4">
                            Link
                        </span>
                        <input
                            type="text"
                            placeholder="URL"
                            value={formData.link}
                            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                            className="border-2 rounded-md p-2 m-3 text-gray-700 font-poppins focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:font-poppins text-sm"

                        />
                        <span className="flex flex-col pb-1 text-normal text-[#2F366E] font-poppins pt-4 mx-4">
                            Upload Lecture Video
                            <span className='font-poppins text-xs text-slate-400'>Supported File: MP4, MKV, etc.</span>
                        </span>
                        {
                            formData.video ?
                            <div className='mx-4 h-28 flex justify-between items-center '>
                                        <div className='flex items-center'>
                                            <Video className='w-[7vh] h-[7vh] mx-5 object-cover rounded-md' color='blue' />
                                            <button onClick={()=>{setVideoPlayerModal({visible:true,url:formData?.video})}}><span className='font-poppins text-sm text-[#0859DE]'>{String(formData?.video)?.substring(String(formData?.video).length - 36)}</span></button>
                                        </div>
                                        <button
                                                className="font-poppins text-blue-500 rounded-md transition border-0 px-5"
                                                onClick={()=>setVideoModal(true)}
                                                >
                                                    <Edit size={20} />
                                        </button>
                                        <input
                                            type="file"
                                            ref={videoInputRef}
                                            className="hidden"
                                            onChange={handleVideoChange}
                                        />
                             </div>
                            :
                            <button
                                className="mx-4 mt-4 px-4 py-2 border font-poppins rounded-md bg-blue-500 text-white w-[20%]"
                                onClick={()=>setVideoModal(true)}
                                >
                                Upload
                            </button>
                        }

                    </div>
                    <div className='flex justify-between mt-1 sticky bottom-0 bg-white border-2'>
                        <button className="border-2 flex items-center border-[#A0B5D7] text-blue-900 font-poppins text-sm font-medium rounded-md p-2 px-4 m-2 hover:bg-slate-200 transition">
                            <Trash2 size={18} className='text-blue-900 mr-2' />
                            <span className=''>Clear</span>
                        </button>
                        <button onClick={saveLecture} className="bg-[#0859DE] text-white font-poppins text-sm rounded-md py-1 px-14 m-2 hover:bg-blue-600 transition">
                            Save
                        </button>
                    </div>
                </div>
            </div>
            { videoModal && <VideoUploadModal onClose={handleVideoUploadClose} visible={videoModal}/>}
            { videoPlayerModal.visible && <VideoPlayer open={videoPlayerModal.visible} video={videoPlayerModal.url} onClose={()=>setVideoPlayerModal({visible:false,url:null})}/> }
        </div>
    );
};

export default EditLectureModal;
