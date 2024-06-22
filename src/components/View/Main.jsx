import { useState, useEffect } from 'react';
import { CircleHelp, ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Accordion from '../UI/Accordion';
import ModuleModal from '../Modal/ModuleModal';
import { useDispatch, useSelector } from 'react-redux';
import { getCurriculumOfCourse } from '../../store/slice/courseReducer';
import AccordionSecond from '../Acoordion/AccordionSecond';
const Main = () => {
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState({
        visible: false,
        subSection: true,
        parentSectionId:''
    });
    const params = useParams();
    const { uuid } = params;
    const dispatch = useDispatch();
    const {currentCourse} = useSelector(state => state.course);

    const handleClick = (subSection,parentSectionId) => {
        //console.log(subSection,parentSectionId)
        setIsModalVisible({
            visible: true,
            subSection: subSection,
            parentSectionId:parentSectionId
        });
    }

    const handleCloseModal = () => {
        setIsModalVisible({
            visible: false,
            subSection: true,
        });
    }


    useEffect(()=>{
        dispatch(getCurriculumOfCourse(uuid));
    },[uuid])

    return (
        <div className='h-full'>
            <div className='bg-white p-5 mt-3'>
                <div className='flex justify-end items-center'>
                    <p className='font-poppins text-sm'>Select Week/Topic</p>
                    <CircleHelp className='text- mx-1' size={12} />
                    <p className='mb-1'>:</p>
                    <input
                        type="text"
                        className='border-2 border-gray-300 rounded-sm px-2 py-1.5 mx-2 font-poppins text-sm w-96'
                        placeholder='Please enter'
                    />
                    <button className='bg-[#1890FF] text-white px-4 py-1.5 rounded-sm font-poppins text-sm border-2 mx-2'>Search</button>
                </div>
            </div>

            <div className='bg-white mt-3 pt-0.5 h-[65vh] overflow-auto'>
                <div className='mx-4 my-3 bg-blue-200 justify-between flex p-5'>
                    <span className='font-poppins mx-4 text-xs font-semibold'>{ currentCourse?.description}</span>
                    <span className='font-poppins text-xs font-semibold'>Action</span>
                </div>
                <div className='mx-4 rounded-lg pb-4'>

                    { currentCourse &&
                        currentCourse?.sections.map((section, index) => (
                            <div key={index} className='mb-0'>
                                {
                                    section?.subsections?.length > 0 ? 
                                    <div>
                                        <div className='mt-4'>
                                            <div className={` whitespace-nowrap inline rounded-full px-2 text-xs py-1 ${index%2 ? "bg-orange-200" : "bg-purple-200"}`}>
                                                <span className={`font-poppins ${index%2 ? "text-orange-700" : "text-purple-700"}`}>{section.name}</span>
                                            </div>
                                        </div>
                                        <Accordion accordionData={section.subsections} />
                                        <div className='mb-2 flex justify-center items-center'>
                                            <button className={`${index%2 ? "bg-orange-600" : "bg-purple-800"} rounded-md p-1.5 mb-3 w-[60%] `}
                                                onClick={handleClick.bind(this, false,section.id)}
                                            >
                                                <span className='font-poppins text-sm text-white'>
                                                    + Add Module
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                    :
                                    <AccordionSecond accordionData={section} index={index} />
                                }
                                {/* <Accordion accordionData={accordionData} />
                                <div className='mx-4 mb-10'>
                                    <button className='bg-[#0859DE] w-full rounded-md p-1.5 mb-3'
                                        onClick={handleClick}
                                    >
                                        <span className='font-poppins text-sm text-white'>
                                            + Add Module
                                        </span>
                                    </button>
                                </div> */}
                            </div>
                        ))
                    
                    }

                    <div className='mx-4 mb-10 my-4'>
                        <button className='bg-[#0859DE] w-full rounded-md p-1.5 mb-3'
                            onClick={handleClick.bind(this, true)}
                        >
                            <span className='font-poppins text-sm text-white'>
                                + Add Module
                            </span>
                        </button>
                    </div>

                </div>

            </div>
            <ModuleModal parentSectionId={isModalVisible.parentSectionId} subSection={isModalVisible.subSection} isVisible={isModalVisible.visible} onClose={handleCloseModal} />
        </div>
    )
}

export default Main