import React, { useState } from "react";
import { Modal } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

function ProfileModel({ user, children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {children ? (
        <span onClick={showModal}>{children}</span>
      ) : (
        <EyeOutlined onClick={showModal} />
      )}
      <Modal
        title={user.name}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="text-center"
      >
        <Avatar size={70} src={user.pic} icon={<UserOutlined />} />
        <h4>{user.email}</h4>
      </Modal>
    </div>
  );
}

export default ProfileModel;
