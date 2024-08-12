import { useState, useEffect } from "react";
import { ConfigProvider, Tabs, notification } from "antd";
import { CircleHelp, Settings, Copy } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CoursesModal from "../../../components/Modal/CoursesModal";
import SettingsModal from "../../../components/Modal/SettingsModal";
import {
  getCourses,
  getCurriculumOfCourse,
} from "../../../store/slice/courseReducer";
import Spinner from "../../../components/Loader/Spinner";

const Courses = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("1");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [page, setPage] = useState(0);
  const { loading, courses } = useSelector((state) => state.course);
  const [search, setSearch] = useState("");
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState({
    isVisible: false,
    data: {},
  });
  const dispatch = useDispatch();

  // This is the function we wrote earlier
  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    }
  }

  // onClick handler function for the copy button
  const handleCopyClick = (text) => {
    copyTextToClipboard(text)
      .then(() => {
        notification.success({ message: "Copied to clipboard" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleSettingsClick = (data) => {
    setIsSettingsModalVisible({
      isVisible: true,
      data,
    });
  };

  const handleCloseSettingsModal = () => {
    setIsSettingsModalVisible({
      isVisible: false,
      data: {},
    });
  };

  //   const handleClear = () => {
  //     setSearch("");
  //     dispatch(getCourses(page, 20));
  //   };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(getCourses(page, 20, search));
  };

  const viewCourse = async (courseId) => {
    await dispatch(getCurriculumOfCourse(courseId));
    navigate(`/admin/courses/view`);
  };

  useEffect(() => {
    dispatch(getCourses(page, 20));
  }, []);

  return (
    <div className="relative flex h-full overflow-hidden">
      {loading && <Spinner />}
      <div className="h-full flex-grow">
        <div className="ml-4 h-full flex-row">
          <div className="mb-3 bg-white">
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
              <div className="flex justify-between px-5 py-4">
                {/* <p className='font-poppins text-lg font-semibold'>Batches</p> */}
                <p className="font-poppins text-lg font-semibold"></p>
                <div className="">
                  <button
                    className="mx-4 rounded-sm border-2 bg-white px-4 py-1 font-poppins text-sm text-black"
                    onClick={handleClick}
                  >
                    + Create Courses
                  </button>
                  {/* <button className='bg-[#1890FF] text-white px-4 py-1 rounded-sm font-poppins text-sm border-2'>Publish</button> */}
                </div>
              </div>
              <Tabs
                defaultActiveKey="1"
                tabPosition="top"
                size="medium"
                onChange={(key) => setActiveTab(key)}
                tabBarStyle={{
                  fontFamily: "Poppins",
                  marginLeft: 20,
                  marginBottom: 0,
                }}
                tabBarExtraContent={{
                  right: (
                    <form className="mr-5" onSubmit={handleSearchSubmit}>
                      <input
                        onChange={(e) => {
                          setSearch(e.target.value);
                        }}
                        value={search}
                        type="text"
                        className="mx-2 w-80 rounded-sm border-2 border-gray-300 px-2 py-1.5 font-poppins text-sm"
                        placeholder="Search course/batch"
                      />
                      <button
                        type="submit"
                        className="ml-2 rounded-sm border-2 bg-[#1890FF] px-4 py-1.5 font-poppins text-sm text-white"
                      >
                        Search
                      </button>
                      {/* <button
                        type="button"
                        className="bg-white text-black px-4 py-1.5 rounded-sm font-poppins text-sm border-2"
                        onClick={handleClear}
                      >
                        Clear
                      </button> */}
                    </form>
                  ),
                }}
              >
                <Tabs.TabPane
                  tab={
                    <div className="flex items-center">
                      <p className="">Video Courses</p>
                      <div className="ml-2 rounded-full bg-[#E6F7FF]">
                        <p className="px-1.5">{courses?.length}</p>
                      </div>
                    </div>
                  }
                  key="1"
                ></Tabs.TabPane>
              </Tabs>
            </ConfigProvider>
          </div>

          <div className="custom-height-course mt-3 grid w-full grid-cols-2 gap-[10px] overflow-auto pr-4 xl:grid-cols-3">
            {courses && courses?.length > 0 ? (
              courses.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="h-fit min-w-80 rounded-md bg-white"
                  >
                    <div className="w-100 flex h-auto border-b-2 border-[#59963626] bg-white p-5">
                      <img
                        src={item.bannerImg}
                        className="h-[56px] w-[56px] object-cover"
                      />
                      <div className="mx-2 flex-1 items-center justify-between">
                        <div className="h-7 overflow-hidden">
                          <p className="inline px-2 font-poppins text-xl font-semibold">
                            {item.name.length > 20
                              ? item.name.slice(0, 20) + "..."
                              : item.name}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <p className="mx-2 mt-1 font-poppins text-sm text-[#599636]">
                            {item?.batches?.length > 0 ? "Batch ID" : ""}
                          </p>
                          <Copy
                            onClick={handleCopyClick.bind(
                              this,
                              item?.batches?.length > 0
                                ? item?.batches[0]?.id
                                : "",
                            )}
                            className="mt-1 cursor-pointer text-[#599636]"
                            size={12}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="m-3 mr-4">
                      <div className="inline items-center whitespace-nowrap rounded-xl bg-[#59963626] px-2 pb-1">
                        <span className="font-poppins text-xs text-[#599636]">
                          {item.numberOfStudents} Students On Board{" "}
                          {item?.enrollmentCount}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center divide-x-2 rounded-b-md bg-[#599636] pb-3 pt-3 text-center">
                      <Settings
                        className="w-1/2 cursor-pointer text-white"
                        size={20}
                        onClick={handleSettingsClick.bind(this, item)}
                      />
                      <p
                        className="w-1/2 cursor-pointer font-poppins text-sm text-white"
                        onClick={viewCourse.bind(this, item?.id)}
                      >
                        View
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="mt-18 flex h-full w-full items-center justify-center">
                <p className="text-md font-md font-poppins text-gray-400">
                  No Course
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <CoursesModal isVisible={isModalVisible} onClose={handleCloseModal} />
      {isSettingsModalVisible.isVisible && (
        <SettingsModal
          data={isSettingsModalVisible.data}
          isVisible={isSettingsModalVisible.isVisible}
          onClose={handleCloseSettingsModal}
        />
      )}
    </div>
  );
};

export default Courses;
