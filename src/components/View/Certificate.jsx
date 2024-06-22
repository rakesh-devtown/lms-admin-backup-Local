import { useState, useEffect } from 'react';
import CertificateModal from '../Modal/CertificateModal';
import CertificateAccordion from '../UI/CertificateAccordion';

const Certificate = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleClick = () => {
    setIsModalVisible(true);
  }

  const handleCloseModal = () => {
    setIsModalVisible(false);
  }


  const accordionData = [
    {
      title: 'Certificate 1',
      days: ['Day 1: Untitled', 'Day 2: Untitled', 'Day 3: Untitled', 'Day 4: Untitled', 'Day 5: Untitled'],
    },
    {
      title: 'Certificate 2',
      days: ['Day 1: Untitled', 'Day 2: Untitled', 'Day 3: Untitled', 'Day 4: Untitled', 'Day 5: Untitled'],
    },
    {
      title: 'Certificate 3',
      days: ['Day 1: Untitled', 'Day 2: Untitled', 'Day 3: Untitled', 'Day 4: Untitled', 'Day 5: Untitled'],
    },
    {
      title: 'Certificate 4',
      days: ['Day 1: Untitled', 'Day 2: Untitled', 'Day 3: Untitled', 'Day 4: Untitled', 'Day 5: Untitled'],
    },
    {
      title: 'Certificate 5',
      days: ['Day 1: Untitled', 'Day 2: Untitled', 'Day 3: Untitled', 'Day 4: Untitled', 'Day 5: Untitled'],
    },
  ];
  return (
    <div className="">
      <div className='bg-white mt-3 p-4'>
        <div className='mx- rounded-lg pb-2'>
          <CertificateAccordion accordionData={accordionData} />
        </div>
        <button className='bg-[#0859DE] w-full py-2 font-poppins text-white text-normal rounded-md transition' onClick={handleClick}>+ Add Certificate</button>
      </div>
      <CertificateModal isVisible={isModalVisible} onClose={handleCloseModal} />
    </div>
  )
}

export default Certificate