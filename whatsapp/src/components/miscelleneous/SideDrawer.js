import React, { useState } from "react";
import { Input, Spin } from "antd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { ChatState } from "../../Context/ChatProvider";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Alert } from "antd";
import ProfileModel from "./ProfileModel";
import { useNavigate } from "react-router-dom";
import { Button, Drawer } from "antd";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

const { Search } = Input;

function SideDrawer() {
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState();
  const [loadingChat, setLoadingChat] = useState();
  const {
    user,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
  } = ChatState();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleSearch = async () => {
    if (!search) {
      <Alert message="Please Enter Something in Search..." type="warning" />;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      // console.log(user.token);
      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      <Alert message="Failed to load the search results..." type="error" />;
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);

      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post("/api/chat", { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      <Alert message="Failed to load the search results..." type="error" />;
    }
  };
  const items = [
    {
      key: "1",
      label: <ProfileModel user={user}>My Profile</ProfileModel>,
    },
    {
      key: "2",
      label: <span onClick={logoutHandler}>Logout</span>,
    },
  ];

  return (
    <div className="d-flex justify-content-between align-item-center bg-white w-100 p-2 bordered ">
      <Search
        placeholder="Search Users to Chat"
        style={{
          width: 200,
          // border: "1px solid grey",
          borderRadius: "7px",
          padding: "5px",
        }}
        onClick={showDrawer}
      />
      <div style={{ fontSize: "25px", textAlign: "center" }}>Chat App</div>
      <div className="p-1 ">
        <NotificationsIcon className="m-1" />

        <span style={{ marginLeft: "15px" }}>{user.name}</span>
        <Dropdown
          menu={{
            items,
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <Avatar size="small" src={user.pic} icon={<UserOutlined />} />
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>

      <Drawer
        title="Search User"
        placement="left"
        onClose={onClose}
        open={open}
        width={350}
      >
        <input
          type="text"
          className="borderd rounded p-1 w-75 m-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={handleSearch}>Go</Button>

        {loading ? (
          <ChatLoading />
        ) : (
          searchResult?.map((user) => {
            {
              /* console.log(user._id); */
            }
            return (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => {
                  accessChat(user._id);
                }}
              />
            );
          })
        )}
        {loadingChat && <Spin />}
      </Drawer>
    </div>
  );
}

export default SideDrawer;
