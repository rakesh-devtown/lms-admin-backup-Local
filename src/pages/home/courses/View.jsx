import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";
import ModuleModal from "../../../components/Modal/ModuleModal";
import { useSelector } from "react-redux";
import Spinner from "../../../components/Loader/Spinner";

const View = () => {
  const navigate = useNavigate();
  const { currentCourse, loading } = useSelector((state) => state.course);

  return (
    <div className="flex">
      {loading && <Spinner large />}
      <div className="flex-grow">
        <div className="ml-4 h-full flex-row">
          <div className="bg-white">
            <div className="flex justify-between overflow-auto p-5">
              <div className="flex items-center">
                <ArrowLeft
                  size={20}
                  className="mr-4 cursor-pointer"
                  onClick={() => navigate("/admin/courses")}
                />
                <p className="font-poppins text-lg font-semibold">
                  {currentCourse?.name}
                </p>
              </div>
              <div className="">
                <button
                  className="mr-2 rounded-sm border-2 bg-white px-4 py-1 font-poppins text-sm text-black hover:border-blue-400 hover:text-blue-400"
                  onClick={() => navigate("certificate")}
                >
                  Certificate
                </button>
                <button
                  className="mr-2 rounded-sm border-2 bg-white px-4 py-1 font-poppins text-sm text-black hover:border-blue-400 hover:text-blue-400"
                  onClick={() => navigate("activities")}
                >
                  Activities
                </button>
                <button
                  className="mr-2 rounded-sm border-2 bg-white px-4 py-1 font-poppins text-sm text-black hover:border-blue-400 hover:text-blue-400"
                  onClick={() => navigate("discussion")}
                >
                  Discussion
                </button>
                <button
                  className="mr-2 rounded-sm border-2 bg-white px-4 py-1 font-poppins text-sm text-black hover:border-blue-400 hover:text-blue-400"
                  onClick={() => navigate("students")}
                >
                  Students
                </button>
                <button className="rounded-sm border-2 bg-[#1890FF] px-4 py-1 font-poppins text-sm text-white">
                  Publish
                </button>
              </div>
            </div>
          </div>
          <div className="h-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
