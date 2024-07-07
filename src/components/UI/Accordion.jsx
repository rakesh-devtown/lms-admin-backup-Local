import { useState } from 'react';
import { Transition } from '@headlessui/react';
import { Plus, ChevronDown, ChevronRight, X, Trash2 } from 'lucide-react';
import videologo from '../../assets/videologo.png';
import { Dropdown, notification } from 'antd';
import ModuleDropdown from "./ModuleDropdown";
import EditLectureModal from '../Modal/EditLectureModal';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addSectionItem, deleteSection, deleteSectionItems, getSectionItemById } from '../../store/slice/courseReducer';

const Accordion = ({ accordionData }) => {
    const [openIndex, setOpenIndex] = useState(null);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { currentCourse } = useSelector(state => state.course);
    const dispatch = useDispatch();

    const params = useParams();
    const { uuid } = params;


    const handleClick = () => {
        setIsModalVisible(true);
        setActiveDropdown(null);
    }

    const handleCloseModal = () => {
        setIsModalVisible(false);
    }
    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };


    const handleMenuVisibilityChange = (flag, moduleIndex, dayIndex, lectureId) => {
        if (flag) {
            setActiveDropdown({ moduleIndex, dayIndex, lectureId });
        } else if (activeDropdown && activeDropdown.moduleIndex === moduleIndex && activeDropdown.dayIndex === dayIndex) {
            setActiveDropdown(null);
        }
    };


    const makeSectionItem = async (sectionItemId) => {
        try {
            if (!uuid || !sectionItemId) return notification.error({ message: 'Error', description: 'please refresh the page and try again' })
            const sectionItem = {
                title: '',
                sectionItemType: "LECTURE",
                sectionId: sectionItemId,
                courseId: uuid,
                isLast: true
            }
            await dispatch(addSectionItem(sectionItem))
        } catch (err) {
            console.log(err)
        }
    }

    const deleteSectionHandler = async (sectionId) => {
        try {
            if (!sectionId || !currentCourse?.id) return notification.error({ message: 'Error', description: 'please refresh the page and try again' })
            await dispatch(deleteSection(sectionId, currentCourse?.id))
        } catch (err) {
            console.log(err)
        }
    }

    const deleteLectureHandler = async (sectionItemId) => {
        try {
            await dispatch(deleteSectionItems(sectionItemId))
            setActiveDropdown(null)
        } catch (err) {
            console.log(err)
        }
    }

    const getLectureData = async (lectureId) => {
        try {
            await dispatch(getSectionItemById(lectureId));
            setIsModalVisible(true);
            setActiveDropdown(null);
        } catch (err) {
            console.log(err)
        }
    }


    const items = [
        {
            label:
                <div className='flex items-center py-1 cursor-pointer' onClick={getLectureData.bind(this, activeDropdown?.lectureId)}>
                    <Plus size={15} className='text-[#0859DE] cursor-pointer mr-2' />
                    <span className='font-poppins text-sm text-[#0859DE]'>Edit Lecture</span>
                </div>,
            key: '0',
        },
        // {
        //     label:
        //         <div className='flex items-center py-1'>
        //             <Plus size={15} className='text-[#0859DE] cursor-pointer mr-2' />
        //             <span className='font-poppins text-sm text-[#0859DE]'>Add Coding Exercise</span>
        //         </div>,
        //     key: '1',
        // },
        // {
        //     label:
        //         <div className='flex items-center py-1'>
        //             <Plus size={15} className='text-[#0859DE] cursor-pointer mr-2' />
        //             <span className='font-poppins text-sm text-[#0859DE]'>Add Quiz</span>
        //         </div>,
        //     key: '2',
        // },
        // {
        //     label:
        //         <div className='flex items-center py-1'>
        //             <Plus size={15} className='text-[#0859DE] cursor-pointer mr-2' />
        //             <span className='font-poppins text-sm text-[#0859DE]'>Add Assignment</span>
        //         </div>,
        //     key: '3',
        // },
        {
            label:
                <div className='flex items-center py-1' onClick={deleteLectureHandler.bind(this, activeDropdown?.lectureId)}>
                    <Trash2 size={15} className='text-[#CD2222] cursor-pointer mr-2' />
                    <span className='font-poppins text-sm text-[#CD2222]'>Delete Lecture</span>
                </div>,
            key: '4',
        },

    ];


    //console.log(accordionData);

    return (
        <div className="p-3 mb-2 bg-white rounded-lg">
            {accordionData && accordionData.map((module, index) => (
                <div key={index} className={`${index != accordionData.length ? 'border-b' : ''}`}>
                    <div className='flex justify-between mx- items-center p-2'>
                        <div className='w-full flex pb-2 mt-1'>

                            {openIndex === index ?
                                <ChevronDown size={20} className='text-slate-400 cursor-pointer' onClick={() => handleToggle(index)} />
                                :
                                <ChevronRight size={20} className='text-slate-400 cursor-pointer' onClick={() => handleToggle(index)} />}
                            <span className='font-poppins text-base font-semibold mx-3'>
                                {module?.name}
                            </span>
                        </div>
                        <div>
                            <ModuleDropdown data={module} onClickDelete={deleteSectionHandler.bind(this, module?.id)} />
                        </div>
                    </div>
                    <Transition
                        show={openIndex === index}
                        enter="transition-opacity duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >


                        <div className="pb-3 pl-1 pr-2 border-t pt-2">
                            {module?.sectionItems?.map((item, i) => (
                                <div key={i} className="flex justify-between py-2 px-1 items-center">
                                    <div className='flex items-center mb-1'>
                                        <img src={videologo} alt="video" className='w-5 h-5 mr-3 rounded-md' />
                                        <span className='font-poppins text-normal'>{`Day ${item?.orderNumber}: ${item?.title || ""}`}</span>
                                    </div>
                                    <Dropdown
                                        menu={{
                                            items,
                                        }}
                                        trigger={['click']}
                                        onVisibleChange={(flag) => handleMenuVisibilityChange(flag, i, index + i, item?.id)}
                                    >
                                        <a onClick={(e) => e.preventDefault()}>
                                            {activeDropdown && activeDropdown.moduleIndex === i && activeDropdown.dayIndex === (index + i) ?
                                                <X size={20} className='text-blue-600 cursor-pointer' /> :
                                                <Plus size={20} className='text-blue-600 cursor-pointer' />
                                            }
                                        </a>
                                    </Dropdown>
                                </div>
                            ))}

                            <button onClick={makeSectionItem.bind(this, module?.id)} className=" bg-blue-600 text-white w-6 h-6 rounded-full flex justify-center items-center shadow-sm">
                                <Plus size={15} />
                            </button>

                        </div>
                    </Transition>

                </div>
            ))}
            {
                isModalVisible &&
                <EditLectureModal isVisible={isModalVisible} onClose={handleCloseModal} />
            }
        </div>
    );
};

export default Accordion;


