import { useState, useRef } from 'react';
import { X, Trash2 } from 'lucide-react';
import { Tabs, ConfigProvider, notification } from 'antd';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createNewModuleOfCourse, createSubSectionOfSection } from '../../store/slice/courseReducer';
const ModuleModal = ({ isVisible, onClose, subSection,parentSectionId }) => {
    const [activeTab, setActiveTab] = useState("1")
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [moduleDescription, setModuleDescription] = useState("");
    const [numberOfLectures, setNumberOfLectures] = useState(1);
    const dispatch = useDispatch();
    const params = useParams();
    const { uuid } = params;

    //console.log(subSection,parentSectionId)

    const [formData,setFormData] = useState({
        courseId: uuid,
        description:"",
        name:"",
        subSection:false,
        subSectionName:'',
        sectionId:parentSectionId,
        numberOfSectionItems:1
    })

    const handleTextOFSubSectionName = (e) => {
        if(e.target.value.length === 0){
            setFormData({...formData,subSection:false,subSectionName:e.target.value})
        }else{
            setFormData({...formData,subSection:true,subSectionName:e.target.value})
        }
    }

    const handleSubmit = async() => {
        try{
            let sendData = {
                ...formData,
                name:formData.name.trim(),
                subSectionName:formData.subSectionName.trim(),
            }
            sendData.courseId=uuid
            if(!subSection)
            {
                sendData.sectionId = parentSectionId
            }
            else if(sendData.subSection)
            {
                let tmp = sendData.name
                sendData.name = sendData.subSectionName
                sendData.subSectionName = tmp
            }

            if(sendData.name.length === 0) return notification.error({message:'Module Creation Failed',description:'Module name is required'})
           //console.log(sendData)
            let res;
            if(!subSection){
                res = await dispatch(createSubSectionOfSection(sendData));
            }else{
                res = await dispatch(createNewModuleOfCourse(sendData))
            }
            if(res){
                setFormData({
                    ...formData,
                    name:'',
                    subSectionName:'',
                    numberOfSectionItems:1,
                    subSection:false
                })
                onClose();
            }
        }catch{
            console.log("error")
        }
    }

    const onClear = () => {
        setFormData({
            ...formData,
            name:'',
            subSectionName:'',
            numberOfSectionItems:1,
            subSection:subSection
        })
    }

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="p-10 relative">
                <div className="absolute top-2 right-1 mt-12 mr-11">
                    <button
                        onClick={onClose}>
                        <X className='text-white' />
                    </button>
                </div>
                <div className={`flex-1 bg-white mt-12 rounded-lg w-[120vh] ${subSection ? 'h-[78vh]' : 'h-[68vh]'} overflow-auto`}>
                    <div className='border-b-2 p-4 pb-3 text-slate-700 font-poppins'>
                        <span>Add Module</span>
                    </div>
                    <div className={`flex flex-col space-y-4 border-b-2 pb-36`}>
                        {subSection && 
                        <>
                            <span className="text-sm text-gray-700 font-poppins mt-4 mx-4">
                                Course Section <span className='text-blue-500'>(Optional)</span>
                            </span>
                            <input
                                value={formData.subSectionName}
                                onChange={handleTextOFSubSectionName}
                                type="text"
                                placeholder="Add course section"
                                className="border-2 rounded-md p-2 m-3 text-gray-700 font-poppins focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:font-poppins text-sm"

                            />
                        </>
                        }
                        <div className='pt-4 flex justify-between items-center'>
                            <span className="text-sm text-gray-700 font-poppins pt- mx-4">
                                Module Name
                            </span>
                            {/* <span className='font-poppins text-sm px-5'>
                                {moduleDescription.length}/100
                            </span> */}
                        </div>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData,name:e.target.value})}
                            placeholder="Add your module name"
                            className="border-2 rounded-md p-2 m-3 text-gray-700 font-poppins focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:font-poppins text-sm"
                        />
                        <span className="text-sm text-gray-700 font-poppins pt-4 mx-4">
                            Number of Lectures
                        </span>
                        <div className='font-poppins text-sm px-3'>
                            <select
                                id="numberOfLectures"
                                value={formData.numberOfSectionItems}
                                onChange={(e) => setFormData({...formData,numberOfSectionItems:e.target.value})}
                                className="w-1/4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            >
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                                <option value={9}>9</option>
                                <option value={10}>10</option>
                            </select>
                        </div>

                    </div>
                    <div className='flex justify-between mt-3 mx-1'>
                        <button onClick={onClear} className="border-2 flex items-center border-[#A0B5D7] text-blue-900 font-poppins text-sm font-medium rounded-md p-2 px-4 m-2 hover:bg-slate-200 transition">
                            <Trash2 size={18} className='text-blue-900 mr-2' />
                            <span className=''>Clear</span>
                        </button>
                        <button onClick={handleSubmit} className="bg-[#0859DE] text-white font-poppins text-sm rounded-md p-2 px-4 m-2 hover:bg-blue-600 transition">
                            Create Module
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModuleModal;
