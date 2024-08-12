import { Dropdown, notification, Popconfirm } from "antd";
import videologo from "../../assets/videologo.png";
import { useState } from "react";
import { ChevronDown, ChevronRight, Plus, Trash2, X } from "lucide-react";
import EditLectureModal from "../Modal/EditLectureModal";
import ModuleDropdown from "../UI/ModuleDropdown";
import { Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSectionItem,
  deleteSection,
  deleteSectionItems,
  getSectionItemById,
} from "../../store/slice/courseReducer";

const AccordionSecond = ({ accordionData, last, index }) => {
  //console.log(accordionData)

  const [openIndex, setOpenIndex] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { currentCourse } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  const uuid = useSelector((state) => state?.course?.currentCourse?.id);

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleMenuVisibilityChange = (
    flag,
    moduleIndex,
    dayIndex,
    lectureId,
  ) => {
    if (flag) {
      setActiveDropdown({ moduleIndex, dayIndex, lectureId });
    } else if (
      activeDropdown &&
      activeDropdown.moduleIndex === moduleIndex &&
      activeDropdown.dayIndex === dayIndex
    ) {
      setActiveDropdown(null);
    }
  };

  const makeSectionItem = async (sectionItemId) => {
    try {
      if (!uuid || !sectionItemId)
        return notification.error({
          message: "Error",
          description: "please refresh the page and try again",
        });
      const sectionItem = {
        title: "",
        sectionItemType: "LECTURE",
        sectionId: sectionItemId,
        courseId: uuid,
        isLast: true,
      };
      await dispatch(addSectionItem(sectionItem));
    } catch (err) {
      console.log(err);
    }
  };

  const deleteSectionHandler = async () => {
    try {
      await dispatch(deleteSection(accordionData?.id, currentCourse?.id));
    } catch (err) {
      console.log(err);
    }
  };

  const deleteLectureHandler = async (sectionItemId) => {
    try {
      await dispatch(deleteSectionItems(sectionItemId));
      setActiveDropdown(null);
    } catch (err) {
      console.log(err);
    }
  };

  const getLectureData = async (lectureId) => {
    try {
      await dispatch(getSectionItemById(lectureId));
      setIsModalVisible(true);
      setActiveDropdown(null);
    } catch (err) {
      console.log(err);
    }
  };

  const items = [
    {
      label: (
        <button
          className="flex cursor-pointer items-center py-1"
          onClick={getLectureData.bind(this, activeDropdown?.lectureId)}
        >
          <Plus size={15} className="mr-2 cursor-pointer text-[#0859DE]" />
          <span className="font-poppins text-sm text-[#0859DE]">
            Edit Lecture
          </span>
        </button>
      ),
      key: "0",
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
      label: (
        <Popconfirm
          title={"Are you sure to delete this lecture?"}
          onConfirm={deleteLectureHandler.bind(this, activeDropdown?.lectureId)}
          okText="Yes"
          cancelText="No"
        >
          <button className="flex items-center py-1">
            <Trash2 size={15} className="mr-2 cursor-pointer text-[#CD2222]" />
            <span className="font-poppins text-sm text-[#CD2222]">
              Delete Lecture
            </span>
          </button>
        </Popconfirm>
      ),
      key: "4",
    },
  ];

  return (
    <>
      <div className={`${!last ? "border-b" : ""}`}>
        <div className="mx- flex items-center justify-between p-2">
          <div className="mt-1 flex w-full pb-2">
            {openIndex === index ? (
              <ChevronDown
                size={20}
                className="cursor-pointer text-slate-400"
                onClick={() => handleToggle(index)}
              />
            ) : (
              <ChevronRight
                size={20}
                className="cursor-pointer text-slate-400"
                onClick={() => handleToggle(index)}
              />
            )}
            <span className="mx-3 font-poppins text-base font-semibold">
              {accordionData?.name}
            </span>
          </div>
          <div>
            <ModuleDropdown
              onClickDelete={deleteSectionHandler}
              data={accordionData}
            />
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
          <div className="border-t pb-3 pl-1 pr-2 pt-2">
            {accordionData?.sectionItems?.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-1 py-2"
              >
                <div className="mb-1 flex items-center">
                  <img
                    src={videologo}
                    alt="video"
                    className="mr-3 h-5 w-5 rounded-md"
                  />
                  <span className="text-normal font-poppins">{`Day ${item?.orderNumber}: ${item?.title || ""}`}</span>
                </div>
                <Dropdown
                  menu={{
                    items,
                  }}
                  open={activeDropdown?.lectureId === item?.id}
                  trigger={["click"]}
                  onOpenChange={(flag) =>
                    handleMenuVisibilityChange(flag, i, index, item?.id)
                  }
                >
                  <a onClick={(e) => e.preventDefault()}>
                    {activeDropdown &&
                    activeDropdown.moduleIndex === i &&
                    activeDropdown.dayIndex === index ? (
                      <X size={20} className="cursor-pointer text-blue-600" />
                    ) : (
                      <Plus
                        size={20}
                        className="cursor-pointer text-blue-600"
                      />
                    )}
                  </a>
                </Dropdown>
              </div>
            ))}

            <button
              onClick={makeSectionItem.bind(this, accordionData?.id)}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm"
            >
              <Plus size={15} />
            </button>
          </div>
        </Transition>
      </div>

      {isModalVisible && (
        <EditLectureModal
          isVisible={isModalVisible}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default AccordionSecond;
