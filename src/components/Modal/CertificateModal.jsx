import { useState, useRef } from 'react';
import { X, Trash2, Edit } from 'lucide-react';
import { notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFile } from '../../store/slice/uploadReducer';
import { createCertificateTemplate, deleteCertificateTemplate } from '../../store/slice/courseReducer';
const CertificateModal = ({ isVisible, onClose }) => {
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const { currentCourse } = useSelector(state => state.course);

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        courseId: currentCourse?.id,
        name: '',
        url: '',
    });


    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        try {
            setSelectedFile(null);
            const file = event.target.files[0];
            if (!file) {
                return;
            }
            if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg') {
                return notification.error({ message: 'Invalid File Type', description: 'Please upload a valid image file' });
            }

            const url = await dispatch(uploadFile(file, '', `/course/cert-templates/${currentCourse?.id || 'section'}/certificate`));
            if (url) {
                setSelectedFile(file);
                setFormData({ ...formData, url });
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleDescriptionChange = (event) => {
        const text = event.target.value;
        if (text.length <= 100) {
            setFormData({ ...formData, name: text });
        }
    };

    const handleSubmit = () => {
        try {
            if (!formData.name) {
                return notification.error({ message: 'Invalid Input', description: 'Please enter a valid certificate name' });
            }
            if (!formData.url) {
                return notification.error({ message: 'Invalid Input', description: 'Please upload a valid certificate image' });
            }

            if (!formData.courseId) {
                return notification.error({ message: 'Invalid Input', description: 'Try to reload the page and try again' });
            }

            const data = {
                courseId: formData.courseId,
                name: formData.name.trim(),
                url: formData.url,
            }

            if (data.name.length <= 1) {
                return notification.error({ message: 'Invalid Input', description: 'Please enter a valid certificate name' });
            }

            const res = dispatch(createCertificateTemplate(data));
            if (res) {
                //notification.success({message:'Certificate Template Created',description:'Certificate template has been created successfully'});
                onClose();
            }

            //dispatch(createCertificate(formData));
            //onClose();
        } catch (err) {
            console.log(err);
        }
    }
    
    const handleDelete = () => {
        try {

            const res = dispatch(deleteCertificateTemplate(formData.courseId));
            if (res) {
                //notification.success({message:'Certificate Template Created',description:'Certificate template has been created successfully'});
                onClose();
            }

            //dispatch(createCertificate(formData));
            //onClose();
        } catch (err) {
            console.log(err);
        }
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
                <div className="flex-1 bg-white mt-12 rounded-lg w-[100vh] h-[60vh] overflow-auto">
                    <div className="flex flex-col space-y-2 border-b-2 pb-28">
                        <div className='pt-4 flex justify-between items-center'>
                            <span className="text-normal text-[#2F366E] font-poppins pt- mx-4">
                                Certificate Name
                            </span>
                            <span className='font-poppins text-sm px-5'>
                                {formData?.name.length}/100
                            </span>
                        </div>
                        <input
                            type="text"
                            placeholder="Enter certificate name"
                            value={formData?.name}
                            onChange={handleDescriptionChange}
                            className="border-2 rounded-md p-2 m-3 text-gray-700 font-poppins focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:font-poppins text-sm"
                        />
                        <span className="flex flex-col pb-1 text-normal text-[#2F366E] font-poppins pt-4 mx-4">
                            Certificate Image
                            <span className='font-poppins text-xs text-slate-400'>Supported File: PNG, JPG, JPEG</span>
                        </span>
                        <div className="mx-4 h-28 flex items-center justify-center bg-gray-50 border border-dashed border-blue-500 rounded-lg">
                            <div className="text-center">

                                {selectedFile ?
                                    <div className='mx-4 h-28 flex justify-between items-center '>
                                        <div className='flex items-center'>
                                            <img src={formData?.url} className='h-[10vh] mx-5 object-cover rounded-md' color='blue' />
                                            <a href={formData?.url} target='_blank'><span className='font-poppins text-sm text-[#0859DE]'>{String(formData?.url)?.substring(String(formData?.url).length - 36)}</span></a>
                                        </div>
                                        <button
                                            className="font-poppins text-blue-500 rounded-md transition border-0 px-5"
                                            onClick={handleButtonClick}
                                        >
                                            <Edit size={20} />
                                        </button>
                                        <input
                                            type="file"
                                            accept="image/*"
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
                                            onClick={handleButtonClick}
                                        >
                                            Upload
                                        </button>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            ref={fileInputRef}
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                    </>
                                }
                            </div>
                        </div>

                    </div>
                    <div className='flex mt-2 justify-between mx-1'>

                        <button className="border-2 flex items-center border-[#A0B5D7] text-blue-900 font-poppins text-sm font-medium rounded-md p-2 px-4 m-2 hover:bg-slate-200 transition">
                            <Trash2 size={18} className='text-blue-900 mr-2' />
                            <span className=''>Clear</span>
                        </button>
                        <button onClick={handleSubmit} className="bg-[#0859DE] text-white font-poppins text-sm rounded-md p-2 px-12 m-2 hover:bg-blue-600 transition">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CertificateModal;
