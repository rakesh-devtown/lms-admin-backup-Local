import { useState } from "react";
import { useSelector } from "react-redux";
import Accordion from "../UI/Accordion";
import ModuleModal from "../Modal/ModuleModal";
import AccordionSecond from "../Acoordion/AccordionSecond";

const MainView = () => {
  const [isModalVisible, setIsModalVisible] = useState({
    visible: false,
    subSection: true,
    parentSectionId: "",
  });
  const { currentCourse } = useSelector((state) => state.course);

  const handleClick = (subSection, parentSectionId) => {
    //console.log(subSection,parentSectionId)
    setIsModalVisible({
      visible: true,
      subSection: subSection,
      parentSectionId: parentSectionId,
    });
  };

  const handleCloseModal = () => {
    setIsModalVisible({
      visible: false,
      subSection: true,
    });
  };

  return (
    <div className="h-full">
      <div className="bg-white px-4 pb-2">
        <div className="flex items-center justify-end">
          <input
            type="text"
            className="mx-2 w-80 rounded-sm border-2 border-gray-300 px-2 py-1.5 font-poppins text-sm"
            placeholder="Select Week/Topic"
          />
          <button className="mx-2 rounded-sm border-2 bg-[#1890FF] px-4 py-1.5 font-poppins text-sm text-white">
            Search
          </button>
        </div>
      </div>
      <div className="custom-height-course-main mt-3 overflow-auto bg-white pt-0.5">
        <div className="mx-4 my-3 flex justify-between bg-blue-200 p-5">
          <span className="mx-4 font-poppins text-xs font-semibold">
            {currentCourse?.description}
          </span>
          <span className="font-poppins text-xs font-semibold">Action</span>
        </div>
        <div className="mx-4 rounded-lg pb-4">
          {currentCourse &&
            currentCourse?.sections.map((section, index) => (
              <div key={index} className="mb-0">
                {section?.subsections?.length > 0 ? (
                  <div>
                    <div className="mt-4">
                      <div
                        className={`inline whitespace-nowrap rounded-full px-2 py-1 text-xs ${
                          index % 2 ? "bg-orange-200" : "bg-purple-200"
                        }`}
                      >
                        <span
                          className={`font-poppins ${index % 2 ? "text-orange-700" : "text-purple-700"}`}
                        >
                          {section.name}
                        </span>
                      </div>
                    </div>
                    <Accordion accordionData={section.subsections} />
                    <div className="mb-2 flex items-center justify-center">
                      <button
                        className={`${index % 2 ? "bg-orange-600" : "bg-purple-800"} mb-3 w-[60%] rounded-md p-1.5`}
                        onClick={handleClick.bind(this, false, section.id)}
                      >
                        <span className="font-poppins text-sm text-white">
                          + Add Module
                        </span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <AccordionSecond accordionData={section} index={index} />
                )}
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
            ))}

          <div className="mx-4 my-4 mb-10">
            <button
              className="mb-3 w-full rounded-md bg-[#0859DE] p-1.5"
              onClick={handleClick.bind(this, true)}
            >
              <span className="font-poppins text-sm text-white">
                + Add Module
              </span>
            </button>
          </div>
        </div>
      </div>
      <ModuleModal
        parentSectionId={isModalVisible.parentSectionId}
        subSection={isModalVisible.subSection}
        isVisible={isModalVisible.visible}
        onClose={handleCloseModal}
        uuid={currentCourse?.id}
      />
    </div>
  );
};

export default MainView;
