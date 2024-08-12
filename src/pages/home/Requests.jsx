import { useState, useEffect } from "react";
import { ConfigProvider, Tabs, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/Loader/Spinner";
import { debounce } from "lodash";
import ApproveRejectButton from "../../components/UI/ApproveRejectButton";
import { getRequests, requestStatus } from "../../store/slice/requestReducer";
import { X, Check } from "lucide-react";
import { render } from "react-dom";

const Requests = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [search, setSearch] = useState("");
  const [studentLoading, setStudentLoading] = useState(false);
  const [page, setpage] = useState(1);
  const [hover, setHover] = useState(false);
  const { shrunk, setShrunk } = useState(false);
  const [currentStatus, setCurrentStatus] = useState("pending");
  const dispatch = useDispatch();

  const { loading, requests } = useSelector((state) => state.request);

  const columns = [
    {
      title: "Timestamp",
      sorter: (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
      render: (_, record) => (
        <span>{new Date(record?.updatedAt).toLocaleString()}</span>
      ),
    },
    {
      title: "Student Email Address",
      dataIndex: "address",
      key: "email",
      render: (_, record) => (
        <span className="font-poppins text-[#1890FF]">{record?.email}</span>
      ),
    },
    {
      title: "Previous Name",
      key: "userId",
      render: (_, record) => <span>{record?.previousName}</span>,
    },
    {
      title: "Requested Name Change",
      key: "userId",
      render: (_, record) => <span>{record?.updatedName}</span>,
    },
    {
      title: "Status",
      render: (_, record) => {
        if (record?.status === "pending") {
          return (
            <div className="rounded-md bg-yellow-300 px-1 text-center">
              <span className="text-xs text-yellow-700">pending</span>
            </div>
          );
        } else if (record?.status === "approved") {
          return (
            <div className="rounded-md bg-green-300 px-1 text-center">
              <span className="text-xs text-green-700">approved</span>
            </div>
          );
        } else {
          return (
            <div className="rounded-md bg-red-300 px-1 text-center">
              <span className="text-xs text-red-700">rejected</span>
            </div>
          );
        }
      },
      filters: [
        {
          text: "Pending",
          value: "pending",
        },
        {
          text: "Approved",
          value: "approved",
        },
        {
          text: "Rejected",
          value: "rejected",
        },
      ],
      filterMultiple: false,
      defaultFilteredValue: ["pending"],
      onFilter: (value, record) => record?.status === value,
      filterResetToDefaultFilteredValue: true,
    },
    {
      title: "Action",
      render: (_, record) => {
        if (record?.status === "pending") {
          return (
            <div className="flex space-x-2">
              <button
                className="flex items-center rounded border border-[#328801] px-2 py-1 text-green-600 hover:bg-[#328801] hover:text-white"
                onClick={() => {
                  dispatch(
                    requestStatus(record?.id, {
                      status: "approved",
                      adminRemark: "request approved",
                    }),
                  );
                }}
              >
                <Check size={16} className="" /> {hover ? "" : "Approve"}
              </button>
              {hover ? (
                <button
                  className="flex items-center rounded border border-red-600 bg-red-600 px-3 py-1 text-white"
                  onClick={() => {
                    dispatch(
                      requestStatus(record?.id, {
                        status: "rejected",
                        adminRemark: "request approved",
                      }),
                    );
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                    setShrunk(false);
                  }}
                >
                  <X size={16} className="mr-1 text-white" /> Reject
                </button>
              ) : (
                <div
                  className="flex items-center rounded border border-red-600 bg-red-600 px-1 py-1 text-red-600"
                  onMouseEnter={() => {
                    setHover(true);
                    setShrunk(true);
                  }}
                >
                  <X size={17} className="text-white" />
                </div>
              )}
            </div>
          );
        } else if (record?.status === "approved") {
          return <span className="font-semibold text-green-600">Approved</span>;
        } else {
          return <span className="font-semibold text-red-600">Rejected</span>;
        }
      },
    },
  ];

  const handleInputChange = (event) => {
    setSearch(event.target.value);
    // if(event.target.value.l){
    //   dispatch(getAllEnrolledStudents(1, 20))
    // }
  };

  const onClickSearch = async () => {
    await dispatch(getRequests(page, 20));
  };

  useEffect(() => {
    dispatch(getRequests(page, 20, currentStatus));
  }, [page, currentStatus]);

  return (
    <div className="mx-2 h-[80vh] flex-row">
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
          {/* <div className='flex p-5 justify-between'>
            <p className='font-poppins text-lg font-semibold'>Request</p>
          </div> */}
          <Tabs
            defaultActiveKey="1"
            tabPosition="top"
            size="medium"
            onChange={(key) => setActiveTab(key)}
            tabBarStyle={{ fontFamily: "Poppins", margin: "20px 20px 0" }}
            tabBarExtraContent={{
              right: (
                <div className="flex items-center justify-end">
                  <input
                    type="text"
                    onChange={handleInputChange}
                    value={search}
                    className="mx-2 w-80 rounded-sm border-2 border-gray-300 px-2 py-1.5 font-poppins text-sm"
                    placeholder="Search via name"
                  />
                  <button
                    className="mx-2 rounded-sm border-2 bg-[#1890FF] px-4 py-1.5 font-poppins text-sm text-white"
                    onClick={onClickSearch}
                  >
                    Search
                  </button>
                </div>
              ),
            }}
          >
            <Tabs.TabPane
              tab={
                <div className="flex items-center">
                  <p className="">Name</p>
                  <div
                    className={`${activeTab === "1" ? "bg-blue-100" : "bg-gray-200"} ml-2 rounded-full`}
                  >
                    <p
                      className={`my-1 px-1.5 ${activeTab === "1" ? "" : "text-slate-400"} text-xs`}
                    >
                      {requests?.total || 0} New
                    </p>
                  </div>
                </div>
              }
              key="1"
            ></Tabs.TabPane>
            {/* <Tabs.TabPane tab={
              <div className="flex items-center">
                <p className="">Email</p>
                <div className={`${activeTab === '2' ? 'bg-blue-100' : 'bg-gray-200'} ml-2 rounded-full`}>
                  <p className={`px-1.5 my-1 ${activeTab === '2' ? '' : 'text-slate-400'} text-xs`}>{requests?.total || 0} New</p>
                </div>
              </div>
            } key="2">
            </Tabs.TabPane> */}
          </Tabs>
        </ConfigProvider>
      </div>

      {activeTab === "1" && (
        <div className="custom-height-body mt-3 overflow-auto bg-white">
          {(studentLoading || loading) && <Spinner />}
          <div className="p-6">
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
                pagination={{
                  total: requests?.response || 0,
                  pageSize: 20,
                  onChange: (page) => setpage(page),
                  showSizeChanger: false,
                  showQuickJumper: false,
                  style: {
                    display: "flex",
                    justifyContent: "flex-end",
                    marginRight: 40,
                  },
                }}
                dataSource={requests?.response || []}
                onChange={(p, filters) => {
                  setCurrentStatus(filters?.[4][0]);
                }}
              />
            </ConfigProvider>
          </div>
        </div>
      )}

      {/* {activeTab === '2' &&
        <div className=''>
          {(studentLoading || loading) && <Spinner />}
          <div className='bg-white p-5 mt-3 h-full'>
            <div className='flex justify-end items-center'>
              <input
                type="text"
                onChange={handleInputChange}
                value={search}
                className='border-2 border-gray-300 rounded-sm px-2 py-1.5 mx-2 font-poppins text-sm w-80'
                placeholder='Search via email'
              />
              <button
                className='bg-[#1890FF] text-white px-4 py-1.5 rounded-sm font-poppins text-sm border-2 mx-2' onClick={onClickSearch}>Search</button>
            </div>
          </div>
          <div className='p-6 bg-white mt-3 h-[58vh] overflow-auto'>
            <ConfigProvider
              theme={{
                token: {
                  fontFamily: 'Poppins',
                },
              }}
            >
              <Table
                columns={columns}
                className='rounded-md border'
                pagination={{
                  total: requests?.response || 0,
                  pageSize: 20,
                  onChange: (page) => setpage(page),
                  showSizeChanger: false,
                  showQuickJumper: false,
                  style: { display: 'flex', justifyContent: 'flex-end', marginRight: 40 },
                }}
                dataSource={requests?.response || []} />
            </ConfigProvider>
          </div>
        </div>

      } */}
      {/* <DeleteStudentModal isVisible={isModalVisible} onClose={handleCloseModal} handleDeleteStudent={handleDeleteStudent} /> */}
    </div>
  );
};

export default Requests;
