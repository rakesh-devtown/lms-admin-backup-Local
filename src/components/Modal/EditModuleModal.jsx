import { useState, useRef, useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';
import { Tabs, ConfigProvider, notification } from 'antd';
import { useDispatch } from 'react-redux';
import { editSection } from '../../store/slice/courseReducer';
const EditModuleModal = ({ isVisible, onClose, data }) => {

    const fileInputRef = useRef(null);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: data?.name,
        description: data?.description,
        id: data?.id
    })

    const handleDescriptionChange = (event) => {
        const text = event.target.value;
        if (text.length <= 100) {
            setFormData({ ...formData, name: text });
        }
    };

    const submitForm = async() => {
        try {
            if(!formData.name) return notification.error({message:'Error',description:'Please enter module name'})
            
            const sendData = {
                name: formData.name.trim(),
                description: formData.description,
                id: formData.id
            }
            if(sendData.name === data.name) return notification.error({message:'Error',description:'Change the module name to Update'})
            if(sendData.name.length>100) return notification.error({message:'Error',description:'Module name should be less than 100 characters'})
            if(sendData.name.length===0) return notification.error({message:'Error',description:'Module name should not be empty'})
            const res = await dispatch(editSection(sendData));
            if (res) {
                onClose();
            }
        }catch(err){
            console.log(err)
        }
    }

    if (!isVisible) return null;

    useEffect(()=>{
        setFormData({
            name: data?.name,
            description: data?.description,
            id: data?.id
        })
    },[data])

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
                            value={formData.name}
                            onChange={handleDescriptionChange}
                        />
                        {/* <span className="text-sm text-gray-700 font-poppins pt-4 mx-4">
                            Add More Lectures
                        </span>
                        <div className='font-poppins text-sm px-3'>
                            <select
                                id="numberOfLectures"
                                value={numberOfLectures}
                                onChange={(e) => setNumberOfLectures(e.target.value)}
                                className="w-1/4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            >
                                <option value={1}>0</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                            </select>
                        </div> */}

                    </div>
                    <div className='flex justify-between mt-1 mx-1'>

                        <button 
                            onClick={onClose}
                            className="border-2 flex items-center border-[#A0B5D7] text-blue-900 font-poppins text-sm font-medium rounded-md p-2 px-4 m-2 hover:bg-slate-200 transition">
                            <span className=''>Close</span>
                        </button>
                        <button onClick={submitForm} className="bg-[#0859DE] text-white font-poppins text-sm rounded-md p-2 px-10 m-2 hover:bg-blue-600 transition">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditModuleModal;
