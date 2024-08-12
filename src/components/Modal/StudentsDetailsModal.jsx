import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Tabs, ConfigProvider, Switch, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import PieChart from "../UI/PieChart";
import {
  archiveStudent,
  setBatchId,
  getStudentById,
} from "../../store/slice/courseReducer";
import ArchiveStudentModal from "./ArchiveStudentModal";
import UnarchiveStudentModal from "./UnarchiveStudentModal";

const StudentsDetailsModal = ({ isVisible, onClose, id }) => {
  const [activeTab, setActiveTab] = useState("1");
  const [isArchiveModalVisible, setIsArchiveModalVisible] = useState(false);
  const [isUnarchiveModalVisible, setIsUnarchiveModalVisible] = useState(false);
  const [page, setpage] = useState(1);
  const [checked, setChecked] = useState(false);
  const { loading, currentStudent, currentBatchId } = useSelector(
    (state) => state.course,
  );

  const dispatch = useDispatch();

  if (!isVisible) return null;

  const handleArchiveStudent = async () => {
    const res = await dispatch(
      archiveStudent(currentBatchId, {
        archived: true,
      }),
    );
    if (res) {
      setChecked(!checked);
    }
    setIsArchiveModalVisible(false);
  };

  const handleUnarchiveStudent = async () => {
    const res = await dispatch(
      archiveStudent(currentBatchId, {
        archived: false,
      }),
    );
    if (res) {
      setChecked(!checked);
    }
    setIsUnarchiveModalVisible(false);
  };

  const handleClick = (id, flag) => {
    if (flag) {
      setIsUnarchiveModalVisible(true);
    } else {
      setIsArchiveModalVisible(true);
    }
    dispatch(setBatchId(id));
  };

  const handleCloseModal = () => {
    setIsUnarchiveModalVisible(false);
    setIsArchiveModalVisible(false);
    dispatch(setBatchId(""));
  };

  const columns = [
    {
      title: "Course Name",
      key: "userId",
      render: (_, record) => <span>{record?.batch?.course?.name}</span>,
    },
    {
      title: "Progress",
      dataIndex: "address",
      key: "email",
      render: (_, record) => (
        <div className="">
          <PieChart
            progress={Math.round(
              (record?.batch?.course?.totalLectureCompleted /
                record?.batch?.course?.totalLecture) *
                100,
            )}
          />
        </div>
      ),
    },

    {
      title: "Status",
      render: (_, record) => {
        return (
          <Switch
            checked={!record?.isArchived}
            onChange={() => handleClick(record?.id, record?.isArchived)}
          />
        );
      },
    },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative p-10">
        <div className="absolute right-1 top-2 mr-11 mt-12">
          <button onClick={onClose}>
            <X className="text-white" />
          </button>
        </div>
        <div className="overflow- mt-12 h-[85vh] w-[800px] flex-1 rounded-lg bg-white">
          <div className="flex items-center justify-between border-b-2 bg-[#2F366E] p-4 px-6 pb-6 font-poppins text-slate-700">
            <div className="flex-1">
              <div className="mb-1 flex">
                <span className="text-lg text-white">
                  {currentStudent?.name}
                </span>
                <div className="mx-2 my-1 flex items-center rounded-full bg-[#FFFFFF33] px-2">
                  <svg
                    width="6"
                    height="7"
                    viewBox="0 0 6 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="3" cy="3.5" r="3" fill="#D9D9D9" />
                  </svg>
                  <span className="ml-1 text-xs text-[#D9D9D9]">Active</span>
                </div>
              </div>
              <div className="">
                <span className="text-xs text-white">
                  {currentStudent?.email} |{" "}
                </span>
                <span className="text-xs text-white">
                  {currentStudent?.phone
                    ? currentStudent?.phone
                    : "No mobile number provided"}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="mb-2 text-xs text-white">Joined On</span>
              <span className="text-lg text-white">
                {new Date(currentStudent?.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="bg-white">
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
                  marginLeft: 20,
                  marginBottom: 0,
                }}
              >
                <Tabs.TabPane
                  tab={
                    <div className="flex items-center py-1">
                      <p className="">Courses Enrolled</p>
                      <div
                        className={`${activeTab === "1" ? "bg-blue-100" : "bg-gray-200"} ml-2 rounded-full`}
                      >
                        <p
                          className={`px-1.5 ${activeTab === "1" ? "" : "text-slate-400"} text-xs`}
                        >
                          {currentStudent?.enrollments?.length}
                        </p>
                      </div>
                    </div>
                  }
                  key="1"
                ></Tabs.TabPane>
              </Tabs>
            </ConfigProvider>
          </div>
          <div className="mt-3 h-[58vh] overflow-auto bg-white p-4">
            <ConfigProvider
              theme={{
                token: {
                  fontFamily: "Poppins",
                },
              }}
            >
              <Table
                columns={columns}
                className="rounded-md border"
                loading={loading}
                pagination={{
                  total: currentStudent?.enrollments?.length || 0,
                  pageSize: 10,
                  onChange: (page) => setpage(page),
                  showSizeChanger: false,
                  showQuickJumper: false,
                  style: {
                    display: "flex",
                    justifyContent: "flex-end",
                    marginRight: 40,
                  },
                }}
                dataSource={currentStudent?.enrollments}
                // shouldCellUpdate={(record, prevRecord) => record !== prevRecord}
              />
            </ConfigProvider>
          </div>
        </div>
      </div>
      <ArchiveStudentModal
        isVisible={isArchiveModalVisible}
        onClose={handleCloseModal}
        handleArchiveStudent={handleArchiveStudent}
      />
      <UnarchiveStudentModal
        isVisible={isUnarchiveModalVisible}
        onClose={handleCloseModal}
        handleUnarchiveStudent={handleUnarchiveStudent}
      />
    </div>
  );
};

export default StudentsDetailsModal;
