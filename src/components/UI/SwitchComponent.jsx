import { Switch } from "antd";
import React, { useState } from "react";
import DeleteStudentModal from "../../components/Modal/DeleteStudentModal";

const SwitchComponent = ({ data }) => {
  const [access, setAccess] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleClick = () => {
    setIsModalVisible(true);
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  const handleConfirm = () => {
    setAccess(!access);
    setIsModalVisible(false);
  };
  return (
    <>
      <DeleteStudentModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        handleDeleteStudent={handleConfirm}
        access={access}
      />
      <Switch checked={access ? true : false} onChange={handleClick} />
    </>
  );
};

export default SwitchComponent;
