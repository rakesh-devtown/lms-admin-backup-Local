import { useState, useEffect } from 'react';
import { CircleHelp, ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Accordion from '../../../components/Accordion';
import ModuleModal from '../../../components/ModuleModal';
import Main from '../../../components/View/Main';
import Students from '../../../components/View/Students';
import Certificate from '../../../components/View/Certificate';
import Activities from '../../../components/View/Activities';
import Discussion from '../../../components/View/Discussion';
import { useSelector } from 'react-redux';
const View = () => {
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const params = useParams();
    const { uuid } = params;

    const [activeTab, setActiveTab] = useState(0);
    const {currentCourse} = useSelector(state => state.course);
    const handleClick = () => {
        setIsModalVisible(true);
    }

    const handleCloseModal = () => {
        setIsModalVisible(false);
    }

    useEffect(()=>{
        //dispatch(getCurriculumOfCourse(uuid));
    },[uuid])

    const data = [
        {
            "title": "Full Stack Web Development",
            "code": "CCJ202403",
            "numberOfStudents": "55",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxe6IR3EKgALq0lEUvpW3GmPH8rpAv1cK0_w&s"
        }
        ,
        {
            "title": "Full Stack Web Development",
            "code": "CCJ202403",
            "numberOfStudents": "55",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxe6IR3EKgALq0lEUvpW3GmPH8rpAv1cK0_w&s"
        }
        ,

    ]
    return (

        <div className="flex">
            <div className="flex-grow">
                <div className="flex-row ml-4 h-full">
                    <div className=" bg-white">
                        <div className='flex p-5 justify-between overflow-auto'>
                            <div className='flex items-center'>
                                <ArrowLeft size={20} className='mr-4 cursor-pointer' onClick={() => navigate('/admin/home/courses')} />
                                <p className='font-poppins text-lg font-semibold'>{currentCourse?.name}</p>
                            </div>
                            <div className=''>
                                <button className='bg-white text-black px-4 py-1 rounded-sm border-2 mr-2 font-poppins text-sm hover:border-blue-400 hover:text-blue-400' onClick={() => setActiveTab(1)} >Certificate</button>
                                <button className='bg-white text-black px-4 py-1 rounded-sm border-2 mr-2 font-poppins text-sm hover:border-blue-400 hover:text-blue-400' onClick={() => setActiveTab(2)} >Activities</button>
                                <button className='bg-white text-black px-4 py-1 rounded-sm border-2 mr-2 font-poppins text-sm hover:border-blue-400 hover:text-blue-400' onClick={() => setActiveTab(3)} >Discussion</button>
                                <button className='bg-white text-black px-4 py-1 rounded-sm border-2 mr-2 font-poppins text-sm hover:border-blue-400 hover:text-blue-400' onClick={() => setActiveTab(4)} >Students</button>
                                <button className='bg-[#1890FF] text-white px-4 py-1 rounded-sm font-poppins text-sm border-2'>Publish</button>
                            </div>
                        </div>
                    </div>
                    <div className='h-full'>
                        {activeTab === 0 && <Main />}
                        {activeTab === 1 && <Certificate />}
                        {activeTab === 2 && <Activities />}
                        {activeTab === 3 && <Discussion />}
                        {activeTab === 4 && <Students />}
                    </div>
                </div>
            </div>
            <ModuleModal isVisible={isModalVisible} onClose={handleCloseModal} />
        </div>
    )
}

export default View