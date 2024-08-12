import { useState, useRef } from "react";
import { X, Trash2 } from "lucide-react";
import { Tabs, ConfigProvider, notification } from "antd";
import { useDispatch } from "react-redux";
import {
  createNewModuleOfCourse,
  createSubSectionOfSection,
} from "../../store/slice/courseReducer";
const ModuleModal = ({
  isVisible,
  onClose,
  subSection,
  parentSectionId,
  uuid,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [moduleDescription, setModuleDescription] = useState("");
  const [numberOfLectures, setNumberOfLectures] = useState(1);
  const dispatch = useDispatch();

  //console.log(subSection,parentSectionId)

  const [formData, setFormData] = useState({
    courseId: uuid,
    description: "",
    name: "",
    subSection: false,
    subSectionName: "",
    sectionId: parentSectionId,
    numberOfSectionItems: 1,
  });

  const handleTextOFSubSectionName = (e) => {
    if (e.target.value.length === 0) {
      setFormData({
        ...formData,
        subSection: false,
        subSectionName: e.target.value,
      });
    } else {
      setFormData({
        ...formData,
        subSection: true,
        subSectionName: e.target.value,
      });
    }
  };

  const handleSubmit = async () => {
    try {
      let sendData = {
        ...formData,
        name: formData.name.trim(),
        subSectionName: formData.subSectionName.trim(),
      };
      sendData.courseId = uuid;
      if (!subSection) {
        sendData.sectionId = parentSectionId;
      } else if (sendData.subSection) {
        let tmp = sendData.name;
        sendData.name = sendData.subSectionName;
        sendData.subSectionName = tmp;
      }

      if (sendData.name.length === 0)
        return notification.error({
          message: "Module Creation Failed",
          description: "Module name is required",
        });
      //console.log(sendData)
      let res;
      if (!subSection) {
        res = await dispatch(createSubSectionOfSection(sendData));
      } else {
        res = await dispatch(createNewModuleOfCourse(sendData));
      }
      if (res) {
        setFormData({
          ...formData,
          name: "",
          subSectionName: "",
          numberOfSectionItems: 1,
          subSection: false,
        });
        onClose();
      }
    } catch {
      console.log("error");
    }
  };

  const onClear = () => {
    setFormData({
      ...formData,
      name: "",
      subSectionName: "",
      numberOfSectionItems: 1,
      subSection: subSection,
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative p-10">
        <div className="absolute right-1 top-2 mr-11 mt-12">
          <button onClick={onClose}>
            <X className="text-white" />
          </button>
        </div>
        <div
          className={`mt-12 w-[800px] flex-1 rounded-lg bg-white ${subSection ? "h-[78vh]" : "h-[68vh]"} overflow-auto`}
        >
          <div className="border-b-2 p-4 pb-3 font-poppins text-slate-700">
            <span>Add Module</span>
          </div>
          <div className={`flex flex-col space-y-4 border-b-2 pb-36`}>
            {subSection && (
              <>
                <span className="mx-4 mt-4 font-poppins text-sm text-gray-700">
                  Course Section{" "}
                  <span className="text-blue-500">(Optional)</span>
                </span>
                <input
                  value={formData.subSectionName}
                  onChange={handleTextOFSubSectionName}
                  type="text"
                  placeholder="Add course section"
                  className="m-3 rounded-md border-2 p-2 font-poppins text-sm text-gray-700 placeholder:font-poppins focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </>
            )}
            <div className="flex items-center justify-between pt-4">
              <span className="pt- mx-4 font-poppins text-sm text-gray-700">
                Module Name
              </span>
              {/* <span className='font-poppins text-sm px-5'>
                                {moduleDescription.length}/100
                            </span> */}
            </div>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Add your module name"
              className="m-3 rounded-md border-2 p-2 font-poppins text-sm text-gray-700 placeholder:font-poppins focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="mx-4 pt-4 font-poppins text-sm text-gray-700">
              Number of Lectures
            </span>
            <div className="px-3 font-poppins text-sm">
              <select
                id="numberOfLectures"
                value={formData.numberOfSectionItems}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    numberOfSectionItems: e.target.value,
                  })
                }
                className="w-1/4 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
              </select>
            </div>
          </div>
          <div className="mx-1 mt-3 flex justify-between">
            <button
              onClick={onClear}
              className="m-2 flex items-center rounded-md border-2 border-[#A0B5D7] p-2 px-4 font-poppins text-sm font-medium text-blue-900 transition hover:bg-slate-200"
            >
              <Trash2 size={18} className="mr-2 text-blue-900" />
              <span className="">Clear</span>
            </button>
            <button
              onClick={handleSubmit}
              className="m-2 rounded-md bg-[#0859DE] p-2 px-4 font-poppins text-sm text-white transition hover:bg-blue-600"
            >
              Create Module
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleModal;
