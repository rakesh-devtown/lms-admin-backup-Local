import { useState, useEffect } from "react";
import CertificateModal from "../Modal/CertificateModal";
import CertificateAccordion from "../UI/CertificateAccordion";
import { useDispatch, useSelector } from "react-redux";
import { getAllCertificatesOfCourse } from "../../store/slice/courseReducer";
import Spinner from "../Loader/Spinner";

const CertificateView = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { currentCourseCertificates, loading, currentCourse } = useSelector(
    (state) => state.course,
  );
  const dispatch = useDispatch();
  const handleClick = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    dispatch(getAllCertificatesOfCourse(currentCourse?.id));
  }, []);

  return (
    <div className="h-[80vh] overflow-auto">
      {loading && <Spinner />}
      <div className="mt-3 bg-white p-4">
        <div className="mx- rounded-lg pb-2">
          <CertificateAccordion accordionData={currentCourseCertificates} />
        </div>
        <button
          className="text-normal w-full rounded-md bg-[#0859DE] py-2 font-poppins text-white transition"
          onClick={handleClick}
        >
          + Add Certificate
        </button>
      </div>
      <CertificateModal isVisible={isModalVisible} onClose={handleCloseModal} />
    </div>
  );
};

export default CertificateView;
