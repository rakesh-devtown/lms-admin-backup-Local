import { useState, useEffect } from 'react';
import CertificateModal from '../CertificateModal';
import CertificateAccordion from '../CertificateAccordion';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCertificatesOfCourse } from '../../store/slice/courseReducer';
import Spinner from '../Loader/Spinner';

const Certificate = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {currentCourseCertificates,loading, currentCourse} = useSelector(state => state.course);
  const dispatch = useDispatch();
  const handleClick = () => {
    setIsModalVisible(true);
  }

  const handleCloseModal = () => {
    setIsModalVisible(false);
  }

  useEffect(()=>{
    dispatch(getAllCertificatesOfCourse(currentCourse?.id));
  },[])


  
  return (
    <div className=" h-[80vh] overflow-auto">
      {loading && <Spinner/>}
      <div className='bg-white mt-3 p-4'>
        <div className='mx- rounded-lg pb-2'>
          <CertificateAccordion accordionData={currentCourseCertificates} />
        </div>
        <button className='bg-[#0859DE] w-full py-2 font-poppins text-white text-normal rounded-md transition' onClick={handleClick}>+ Add Certificate</button>
      </div>
      <CertificateModal isVisible={isModalVisible} onClose={handleCloseModal} />
    </div>
  )
}

export default Certificate