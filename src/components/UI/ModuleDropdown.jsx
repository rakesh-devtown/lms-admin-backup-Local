import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import EditModuleModal from "../Modal/EditModuleModal";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Popconfirm, Popover } from "antd";

export default function ModuleDropdown({ onClickDelete, data }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleClick = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const PopoverContent = (
    <div className="flex flex-col">
      <p
        className="block cursor-pointer px-5 py-2 text-sm text-blue-500 hover:bg-gray-100"
        onClick={() => handleClick()}
      >
        <PlusOutlined className="mr-2" /> Edit Module
      </p>
      <Popconfirm
        title={"Are you sure to delete this module?"}
        onConfirm={() => onClickDelete()}
        okText="Yes"
        cancelText="No"
      >
        <p className="block cursor-pointer px-5 py-2 text-sm text-red-400 hover:bg-gray-100">
          <DeleteOutlined className="mr-2" />
          Delete Module
        </p>
      </Popconfirm>
    </div>
  );

  return (
    <div as="div" className="relative inline-block text-left font-poppins">
      <Popover trigger={"click"} placement="leftTop" content={PopoverContent}>
        {/* pass overlayInnerStyle props to remove padding */}
        <EllipsisVertical
          className="h-5 w-5 cursor-pointer text-gray-400"
          aria-hidden="true"
        />
      </Popover>
      {isModalVisible && (
        <EditModuleModal
          data={data}
          isVisible={isModalVisible}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
