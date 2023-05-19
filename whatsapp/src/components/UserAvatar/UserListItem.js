import React from "react";
import "./UserListItem.css";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <div
      onClick={handleFunction}
      className="avatar m-1 "
      style={{ height: "75px" }}
    >
      <div>
        <Avatar
          className="m-1"
          //   style={{ marginTop: "20px" }}
          size={40}
          src={user.pic}
          icon={<UserOutlined />}
        />
        <h6 className="d-inline m-2">{user.name}</h6>

        <p style={{ marginLeft: "55px" }}>
          <b>Email: </b>
          {user.email}
        </p>
      </div>
    </div>
  );
};

export default UserListItem;
