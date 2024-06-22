import { useState, useRef } from 'react';
import { X, Trash2 } from 'lucide-react';


const CertificateModal = ({ isVisible, onClose }) => {
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
                    <div className="flex flex-col space-y-2 border-b-2 pb-32">
                        <div className='pt-4 flex justify-between items-center'>
                            <span className="text-normal text-[#2F366E] font-poppins pt- mx-4">
                                Certificate Name
                            </span>
                            <span className='font-poppins text-sm px-5'>
                                {moduleDescription.length}/100
                            </span>
                        </div>
                        <input
                            type="text"
                            placeholder="Enter certificate name"
                            value={moduleDescription}
                            onChange={handleDescriptionChange}
                            className="border-2 rounded-md p-2 m-3 text-gray-700 font-poppins focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:font-poppins text-sm"
                        />
                        <span className="flex flex-col pb-1 text-normal text-[#2F366E] font-poppins pt-4 mx-4">
                            Certificate Image
                            <span className='font-poppins text-xs text-slate-400'>Supported File: MP4, MKV, etc.</span>
                        </span>
                        <div className="mx-4 h-28 flex items-center justify-center bg-gray-50 border border-dashed border-blue-500 rounded-lg">
                            <div className="text-center">

                                {selectedFile ? <span className='font-poppins text-sm text-gray-700'>{selectedFile?.name}</span> :
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

                    </div>
                    <div className='flex justify-between mt-1 mx-1'>

                        <button className="border-2 flex items-center border-[#A0B5D7] text-blue-900 font-poppins text-sm font-medium rounded-md p-2 px-4 m-2 hover:bg-slate-200 transition">
                            <Trash2 size={18} className='text-blue-900 mr-2' />
                            <span className=''>Delete</span>
                        </button>
                        <button className="bg-[#0859DE] text-white font-poppins text-sm rounded-md p-2 px-12 m-2 hover:bg-blue-600 transition">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CertificateModal;
