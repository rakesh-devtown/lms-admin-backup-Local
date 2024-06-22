import { useState, useRef } from 'react';
import { X, Trash2 } from 'lucide-react';
import { Tabs, ConfigProvider } from 'antd';
import RichTextEditor from '../UI/RichTextEditor';
const EditModuleModal = ({ isVisible, onClose }) => {
    const [activeTab, setActiveTab] = useState("1")
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [moduleDescription, setModuleDescription] = useState("");
    const [numberOfLectures, setNumberOfLectures] = useState(1);


    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    }

    const handleDescriptionChange = (event) => {
        const text = event.target.value;
        if (text.length <= 100) {
            setModuleDescription(text);
        }
    };

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
                <div className="flex-1 bg-white mt-12 rounded-lg w-[100vh] h-[60vh] overflow-auto">
                    <div className='border-b-2 p-4 pb-3 text-slate-700 font-poppins'>
                        <span>Edit Module Details</span>
                    </div>
                    <div className="flex flex-col space-y-2 border-b-2 pb-20">
                        <span className="text-sm text-gray-700 font-poppins mt-4 mx-4">
                            Course Section <span className='text-blue-500'>(Optional)</span>
                        </span>
                        <input
                            type="text"
                            placeholder="Add course section"
                            className="border-2 rounded-md p-2 m-3 text-gray-700 font-poppins focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:font-poppins text-sm"
                        />
                        <div className='pt-4 flex justify-between items-center'>
                            <span className="text-sm text-gray-700 font-poppins pt- mx-4">
                                Edit Module Name
                            </span>
                            <span className='font-poppins text-sm px-5'>
                                {/* {moduleDescription.length}/100 */}
                            </span>
                        </div>
                        <input
                            type="text"
                            placeholder="Add your module name"
                            className="border-2 rounded-md p-2 m-3 text-gray-700 font-poppins focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:font-poppins text-sm"
                            value={moduleDescription}
                            onChange={handleDescriptionChange}
                        />
                        <span className="text-sm text-gray-700 font-poppins pt-4 mx-4">
                            Edit number of lectures
                        </span>
                        <div className='font-poppins text-sm px-3'>
                            <select
                                id="numberOfLectures"
                                value={numberOfLectures}
                                onChange={(e) => setNumberOfLectures(e.target.value)}
                                className="w-1/4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            >
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                            </select>
                        </div>

                    </div>
                    <div className='flex justify-between mt-1 mx-1'>

                        <button className="border-2 flex items-center border-[#A0B5D7] text-blue-900 font-poppins text-sm font-medium rounded-md p-2 px-4 m-2 hover:bg-slate-200 transition">
                            <Trash2 size={18} className='text-blue-900 mr-2' />
                            <span className=''>Delete</span>
                        </button>
                        <button className="bg-[#0859DE] text-white font-poppins text-sm rounded-md p-2 px-10 m-2 hover:bg-blue-600 transition">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditModuleModal;
