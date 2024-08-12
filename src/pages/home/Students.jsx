import { useState, useEffect } from "react";
import { ConfigProvider, Tabs, Table, notification, Switch } from "antd";
import { ArrowDownToLine } from "lucide-react";
import StudentsDetailsModal from "../../components/Modal/StudentsDetailsModal";
import Papa from "papaparse";
import Spinner from "../../components/Loader/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import {
  addStudentToBatch,
  getAllEnrolledStudents,
  getStudentById,
} from "../../store/slice/courseReducer";
import SwitchComponent from "../../components/UI/SwitchComponent";

const Students = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [search, setSearch] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [studentLoading, setStudentLoading] = useState(false);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [students, setStudents] = useState([]);
  const [id, setId] = useState("");
  const [page, setpage] = useState(1);

  const { loading, allStudents, currentStudent } = useSelector(
    (state) => state.course,
  );

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    batchId: "",
  });

  const handleViewMoreClick = (id) => {
    setId(id);
    setIsDetailsModalVisible(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalVisible(false);
  };

  useEffect(() => {
    dispatch(getStudentById(id));
    // console.log(currentStudent)
  }, [id]);

  const handleFileUpload = async (event) => {
    try {
      setStudentLoading(true);
      setUploadedFile(null);

      const file = event.target.files[0];
      if (!file)
        return notification.error({
          message: "Error",
          description: "Please select a file",
        });
      if (file.type !== "text/csv")
        return notification.error({
          message: "Error",
          description: "Please select a csv file",
        });
      //console.log(file)
      if (file) {
        setUploadedFile(file);
      }

      Papa.parse(file, {
        skipEmptyLines: true,
        complete: function ({ data }) {
          const st = [];
          data.forEach((s) => {
            const [firstName, lastName, email, phone, batchId] = s;
            if (
              email
                .toLowerCase()
                .trim()
                .match(
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                )
            ) {
              const batchIds = batchId.split(",");
              const batchIdMap = batchIds.map((b) => b.trim());

              const uuidRegex =
                /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

              for (let i = 0; i < batchIdMap.length; i++) {
                const validIds = uuidRegex.test(batchIdMap[i]);
                if (validIds) {
                  let data = {
                    name: `${firstName.trim()} ${lastName.trim()}`,
                    email: email.toLowerCase().trim(),
                    phone: phone,
                    batchId: batchIdMap[i],
                  };
                  st.push(data);
                }
              }
            } else {
              console.log("email doesnt match", email);
            }
          });
          setStudents((prev) => [...st]);
        },
        error: (error) => {
          console.log(error);
        },
      });

      return true;
    } catch (error) {
      console.log(error);
    } finally {
      setStudentLoading(false);
    }
  };

  const handleAddBatchStudent = async () => {
    try {
      const batchId = formData.batchId;
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.phone
      ) {
        return notification.error({
          message: "Error",
          description: "All fields are required",
        });
      }
      if (!batchId) {
        return notification.error({
          message: "Error",
          description: "No batch to add student to",
        });
      }

      const batchIds = batchId.split(",");
      const batchIdMap = batchIds.map((b) => b.trim());
      const studentArray = [];
      // Regular expression to validate a UUID
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

      for (let i = 0; i < batchIdMap.length; i++) {
        const validIds = uuidRegex.test(batchIdMap[i]);
        if (validIds) {
          const data = {
            name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
            email: formData.email,
            phone: formData.phone,
            batchId: batchIdMap[i],
          };
          studentArray.push(data);
        }
      }
      console.log(studentArray);
      if (studentArray.length === 0)
        return notification.error({
          message: "Error",
          description: "Invalid Batch Id",
        });
      await dispatch(addStudentToBatch(studentArray));
      notification.success({
        message: "Success",
        description: `${studentArray.length} Enrollments Added Successfully`,
      });

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        batchId: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const addStudentsVisCSV = async () => {
    try {
      if (students.length === 0)
        return notification.error({
          message: "Error",
          description: "No student to add",
        });

      const res = await dispatch(addStudentToBatch(students));
      // console.log(students)
      if (res) {
        setStudents([]);
        setUploadedFile(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    {
      title: "Student Name",
      key: "userId",
      render: (_, record) => <span>{record?.name}</span>,
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
      title: "Joined at",
      key: "createdAt",
      // sorter: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      render: (_, record) => (
        <span>{new Date(record?.createdAt).toLocaleDateString()}</span>
      ),
    },
    {
      title: "Is Active",
      render: (_, record) => {
        return <SwitchComponent data={record} />;
      },
    },
    {
      title: "View More",
      render: (_, record) => {
        return (
          <span
            onClick={() => handleViewMoreClick(record?.id)}
            className="cursor-pointer text-[#1890FF]"
          >
            View More
          </span>
        );
      },
    },
  ];

  const onClickHandleSearch = (e) => {
    e.preventDefault();
    dispatch(getAllEnrolledStudents(page, 20, search));
  };

  const handleInputChange = (event) => {
    setSearch(event.target.value);
    if (event.target.value.trim().length === 0) {
      dispatch(getAllEnrolledStudents(page, 20, ""));
    }
  };

  // console.log(id)

  useEffect(() => {
    dispatch(getAllEnrolledStudents(page, 20));
  }, [page]);

  return (
    <div className="mx-2 flex-row">
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
            <p className='font-poppins text-lg font-semibold'>{activeTab === '1' ? 'Add Students' : 'View Students'}</p>
          </div> */}
          <Tabs
            defaultActiveKey="1"
            tabPosition="top"
            size="medium"
            onChange={(key) => setActiveTab(key)}
            tabBarStyle={{ fontFamily: "Poppins", margin: "20px 20px 0" }}
            tabBarExtraContent={
              activeTab === "2" && {
                right: (
                  <form
                    onSubmit={onClickHandleSearch}
                    className="flex items-center justify-end"
                  >
                    <input
                      type="text"
                      onChange={handleInputChange}
                      value={search}
                      className="mx-2 w-80 rounded-sm border-2 border-gray-300 px-2 py-1.5 font-poppins text-sm"
                      placeholder="Search student using email"
                    />
                    <button className="mx-2 rounded-sm border-2 bg-[#1890FF] px-4 py-1.5 font-poppins text-sm text-white">
                      Search
                    </button>
                  </form>
                ),
              }
            }
          >
            <Tabs.TabPane
              tab={
                <div className="flex items-center">
                  <p className="">Add Students</p>
                </div>
              }
              key="1"
            ></Tabs.TabPane>
            <Tabs.TabPane
              tab={
                <div className="flex items-center">
                  <p className="">View Students</p>
                  <div
                    className={`${activeTab === "2" ? "bg-blue-100" : "bg-gray-200"} ml-2 rounded-full`}
                  >
                    <p
                      className={`px-1.5 ${activeTab === "2" ? "" : "text-slate-400"} text-xs`}
                    >
                      {allStudents?.totalStudents}
                    </p>
                  </div>
                </div>
              }
              key="2"
            ></Tabs.TabPane>
          </Tabs>
        </ConfigProvider>
      </div>

      {activeTab === "1" && (
        <div className="custom-height-body mt-3 overflow-y-auto bg-white">
          {(studentLoading || loading) && <Spinner />}
          <div className="pt-5">
            <span className="mx-7 pt-4 font-poppins font-semibold">
              Add Student
            </span>
            <div className="mx-9 mt-4 flex">
              <div className="flex w-1/2 flex-col">
                <span className="font-poppins text-sm">
                  <span className="text-red-500">*</span>Student First Name
                </span>
                <input
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  type="text"
                  placeholder="first name"
                  className="mr-5 mt-1 rounded-md border-2 p-2.5 font-poppins text-sm text-gray-700 placeholder:font-poppins focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="mt-4 font-poppins text-sm">
                  <span className="text-red-500">*</span>Student Last Name
                </span>
                <input
                  type="text"
                  value={formData.lastName}
                  placeholder="last name"
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  className="mr-5 mt-1 rounded-md border-2 p-2.5 font-poppins text-sm text-gray-700 placeholder:font-poppins focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="mt-4 font-poppins text-sm">Batch ID</span>
                <input
                  type="text"
                  placeholder="Batch Id"
                  value={formData.batchId}
                  onChange={(e) =>
                    setFormData({ ...formData, batchId: e.target.value })
                  }
                  className="mr-5 mt-1 rounded-md border-2 p-2.5 font-poppins text-sm text-gray-700 placeholder:font-poppins focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex w-1/2 flex-col">
                <span className="font-poppins text-sm">
                  <span className="text-red-500">*</span>Student Email Address
                </span>
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="mr-5 mt-1 rounded-md border-2 p-2.5 font-poppins text-sm text-gray-700 placeholder:font-poppins focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="mt-4 font-poppins text-sm">
                  <span className="text-red-500">*</span>Student Phone Number
                </span>
                <input
                  type="text"
                  placeholder="phone number"
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  value={formData.phone}
                  className="mr-5 mt-1 rounded-md border-2 p-2.5 font-poppins text-sm text-gray-700 placeholder:font-poppins focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mx-14 mt-4 flex justify-end">
              <button
                onClick={handleAddBatchStudent}
                className="rounded-md border-2 bg-[#8C8C8C80] px-14 py-1.5 font-poppins text-sm text-white hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between p-8 md:flex-row">
            <div className="mx-1 mb-6 h-[172px] w-1/2 rounded-md border-2 border-dashed border-gray-300 p-10 text-center md:mb-0">
              <div className="flex h-full flex-col items-center justify-center">
                <input
                  type="file"
                  id="fileUpload"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <label
                  htmlFor="fileUpload"
                  className="flex max-w-md cursor-pointer flex-col items-center justify-center"
                >
                  {uploadedFile ? (
                    <div>
                      <p className="font-poppins text-base text-blue-500">
                        {uploadedFile.name}
                      </p>
                      {
                        <p className="text-blue-700">
                          Correct Enrollment Details : {students.length}
                        </p>
                      }
                    </div>
                  ) : (
                    <>
                      <svg
                        width="49"
                        height="48"
                        viewBox="0 0 49 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M42.2439 20.9114L42.2345 20.8739L36.9752 7.50986C36.7408 6.75518 36.0423 6.23486 35.2502 6.23486H13.9314C13.1345 6.23486 12.4267 6.76455 12.2017 7.52861L7.28453 20.7567L7.27047 20.7895L7.26109 20.827C7.20016 21.0567 7.18141 21.2911 7.21422 21.5208C7.20953 21.5958 7.20484 21.6708 7.20484 21.7458V38.8974C7.20608 39.6528 7.50675 40.377 8.04096 40.9112C8.57517 41.4455 9.29936 41.7461 10.0548 41.7474H39.4548C41.0252 41.7474 42.3048 40.4677 42.3095 38.8974V21.7458C42.3095 21.6849 42.3095 21.6239 42.3048 21.5724C42.3236 21.3427 42.3048 21.1224 42.2439 20.9114ZM28.3783 18.8958L28.3642 19.6317C28.3267 21.7364 26.8736 23.1521 24.7502 23.1521C23.7142 23.1521 22.8236 22.8192 22.1814 22.1864C21.5392 21.5536 21.1877 20.6724 21.1689 19.6317L21.1548 18.8958H11.508L15.2345 9.83486H33.947L37.7767 18.8958H28.3783ZM10.8002 22.4958H18.1736C19.3127 25.1724 21.7361 26.7521 24.7548 26.7521C26.3345 26.7521 27.8017 26.3114 28.9877 25.477C30.0283 24.7458 30.8392 23.7239 31.3642 22.4958H38.7002V38.1474H10.8002V22.4958Z"
                          fill="#1890FF"
                        />
                      </svg>
                      <p className="mb-1 mt-1 font-poppins text-sm text-gray-500">
                        Click or drag file to this area to upload
                      </p>
                      <p className="px-5 font-poppins text-xs text-gray-400 xl:px-16">
                        Support for a single or bulk upload. Strictly prohibit
                        from uploading company data or other band files
                      </p>
                    </>
                  )}
                </label>
              </div>
            </div>

            <div className="mx-2 flex h-[172px] w-1/2 flex-col rounded-md border">
              <table className="w-full divide-y divide-gray-200 font-poppins">
                <thead className="bg-gray-50">
                  <tr className="divide-x border-b">
                    <th className="px-3 py-3 text-left text-xs font-medium tracking-wider text-black">
                      firstName
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium tracking-wider text-black">
                      lastName
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium tracking-wider text-black">
                      email
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium tracking-wider text-black">
                      phone
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium tracking-wider text-black">
                      batchId
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* <tr className='divide-x border-b'>
                    <td className="px-3 py-3 text-left text-xs font-medium text-black tracking-wider">firstName</td>
                    <td className="px-3 py-3 text-left text-xs font-medium text-black tracking-wider">lastName</td>
                    <td className="px-3 py-3 text-left text-xs font-medium text-black tracking-wider">email</td>
                    <td className="px-3 py-3 text-left text-xs font-medium text-black tracking-wider">phone</td>
                    <td className="px-3 py-3 text-left text-xs font-medium text-black tracking-wider">batchId</td>
                  </tr> */}
                </tbody>
              </table>
              <div className="flex flex-grow items-center justify-center">
                <a
                  target="_blank"
                  href={
                    "https://student-platform-assets.s3.ap-south-1.amazonaws.com/course/39d202c1-333b-4f8a-8818-65ea257f0c9e/studyMaterial/f17276878cf26b86be92f98fab2a2bce.csv"
                  }
                >
                  <button className="flex items-center rounded-lg border-2 border-[#0859DE] bg-white px-4 py-2 font-poppins text-sm text-[#0859DE]">
                    <ArrowDownToLine size={16} className="mr-2" />
                    Download CSV Format
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div className="mx-14 flex justify-end pb-4">
            <button
              onClick={addStudentsVisCSV}
              className="rounded-md border-2 bg-[#8C8C8C80] px-14 py-1.5 font-poppins text-sm text-white hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </div>
      )}

      {activeTab === "2" && (
        <div className="custom-height-body mt-3 overflow-y-auto bg-white">
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
                  total: allStudents?.totalStudents || 0,
                  pageSize: 20,
                  onChange: (page) => setpage(page),
                  showSizeChanger: false,
                  showQuickJumper: false,
                  sortOrder: "descend",
                  style: {
                    display: "flex",
                    justifyContent: "flex-end",
                    marginRight: 40,
                  },
                }}
                dataSource={allStudents?.students || []}
              />
            </ConfigProvider>
          </div>
        </div>
      )}
      {isDetailsModalVisible && (
        <StudentsDetailsModal
          isVisible={isDetailsModalVisible}
          onClose={handleCloseDetailsModal}
          id={id}
        />
      )}
    </div>
  );
};

export default Students;
