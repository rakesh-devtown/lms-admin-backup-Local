import { useState, useRef } from "react";
import { X } from "lucide-react";
import { Tabs, ConfigProvider, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Loader/Spinner";
import { uploadFile } from "../../store/slice/uploadReducer";
import { createCourse } from "../../store/slice/courseReducer";
const CoursesModal = ({ isVisible, onClose }) => {
  const [activeTab, setActiveTab] = useState("1");
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const { uploadLoading } = useSelector((state) => state.upload);
  const { loading } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    courseType: "upload",
    description: "",
    bannerImg: "",
  });

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    try {
      const file = event.target.files[0];
      if (
        file.type !== "image/png" &&
        file.type !== "image/jpeg" &&
        file.type !== "image/svg+xml"
      ) {
        return notification.error({
          message: "Error",
          description: "Invalid file format. Please upload a valid image file",
        });
      }
      const url = await dispatch(
        uploadFile(file, "image", "/course/thumbnail"),
      );
      if (url) {
        setSelectedFile(file);
        setFormData({ ...formData, bannerImg: url });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      setFormData({
        ...formData,
        name: formData.name.trim(),
        description: formData.description.trim(),
      });
      if (!formData.name || !formData.description || !formData.bannerImg) {
        return notification.error({
          message: "Error",
          description: "All fields are required",
        });
      }
      const res = await dispatch(createCourse(formData));
      if (res) {
        setFormData({
          name: "",
          courseType: "upload",
          description: "",
          bannerImg: "",
        });
        setSelectedFile(null);
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      {(uploadLoading || loading) && <Spinner />}
      <div className="relative p-10">
        <div className="absolute right-1 top-2 mr-11 mt-12">
          <button onClick={onClose}>
            <X className="text-white" />
          </button>
        </div>
        <div className="mt-12 h-[80vh] w-[800px] flex-1 overflow-auto rounded-lg bg-white">
          <div className="border-2 px-4 pt-2">
            <ConfigProvider
              theme={{
                components: {
                  Tabs: {
                    inkBarColor: "#1890FF",
                    itemHoverColor: "#1890FF",
                    itemSelectedColor: "#1890FF",
                  },
                },
              }}
            >
              <Tabs
                defaultActiveKey="1"
                tabPosition="top"
                size="medium"
                onChange={(key) => setActiveTab(key)}
                tabBarStyle={{
                  fontFamily: "Poppins",
                  marginRight: 1,
                  marginBottom: 0,
                }}
              >
                <Tabs.TabPane
                  tab={
                    <div className="mx-1 flex items-center">
                      <p className="text-md">Video Courses</p>
                    </div>
                  }
                  key="1"
                ></Tabs.TabPane>
              </Tabs>
            </ConfigProvider>
          </div>
          <div className="flex flex-col space-y-1 border-b-2 pb-8">
            <span className="mx-4 mt-4 font-poppins text-sm text-gray-700">
              Course Name <span className="text-blue-500">*</span>
            </span>
            <input
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
              }}
              type="text"
              placeholder="Course name"
              className="m-3 rounded-md border-2 p-2 font-poppins text-sm text-gray-700 placeholder:font-poppins focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="mx-4 pt-4 font-poppins text-sm text-gray-700">
              Description <span className="text-blue-500">*</span>
            </span>
            <textarea
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
              }}
              type="text"
              placeholder="Add Course Description"
              rows={4}
              className="m-3 resize-none rounded-md border-2 p-2 font-poppins text-sm text-gray-700 placeholder:font-poppins focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="mx-4 pt-4 font-poppins text-sm text-gray-700">
              Upload Thumbnail <span className="text-blue-500">*</span>
            </span>
            <div className="mx-4 flex h-28 items-center justify-center rounded-lg border border-dashed border-blue-500 bg-gray-50">
              <div className="text-center">
                {selectedFile ? (
                  <div className="font-poppins text-sm text-gray-700">
                    <div>
                      <img
                        src={formData.bannerImg}
                        alt="thumbnail"
                        className="h-20 w-20 object-contain"
                      />
                    </div>
                    {selectedFile.name}
                    <button
                      className="rounded-md border-0 px-5 font-poppins text-blue-500 transition"
                      onClick={handleButtonClick}
                    >
                      Edit
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                ) : (
                  <>
                    <p className="font-poppins text-sm text-gray-500">
                      Drag Your File(s) Here
                    </p>
                    <button
                      className="mt-4 rounded-md border border-dashed border-blue-500 px-4 py-2 font-poppins text-blue-500 transition hover:bg-blue-500 hover:text-white"
                      onClick={handleButtonClick}
                    >
                      Upload
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </>
                )}
              </div>
            </div>
            <p className="mx-4 mt-2 font-poppins text-xs text-gray-500">
              Supported File: JPG, PNG, SVG
            </p>
          </div>
          <div className="mx-3 mt-1.5 flex justify-end">
            <button
              onClick={handleSubmit}
              className="m-2 rounded-md bg-[#0859DE] p-2 px-4 font-poppins text-sm text-white transition hover:bg-blue-600"
            >
              Create Course
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesModal;
