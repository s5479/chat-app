import React, { useState } from "react";
import { Button, Modal, Input, Alert, Spin } from "antd";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import UserListItem from "../UserAvatar/UserListItem";
import UserBedgeItem from "../UserAvatar/UserBedgeItem";
import { Box } from "@mui/material";

function GroupChatModel({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, chats, setChats } = ChatState();

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
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
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      // console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      <Alert message="Failed to load the search results..." type="error" />;
    }
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      <Alert message="user already added" type="warning" />;
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      <Alert message="Please fill all the fields" type="warning" />;
      return;
    }

    try {
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/chat/group",
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );

      setChats([data], ...chats);
      onclose();
      <Alert message="New Group Chat Created" type="success" />;
    } catch (error) {
      <Alert message="Failed to created the chat" type="warning" />;
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <span type="primary" onClick={showModal}>
        {children}
      </span>
      <Modal
        title="Create Group Chat"
        style={{ textAlign: "center" }}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <form>
          <Input
            placeholder="Chat Name"
            onChange={(e) => setGroupChatName(e.target.value)}
            className="mb-3"
          ></Input>
          <Input
            placeholder="Add Users eg. John "
            onChange={(e) => handleSearch(e.target.value)}
          ></Input>
        </form>
        <Box width="100%" display="flex" flexWrap="wrap">
          {selectedUsers.map((u) => (
            <UserBedgeItem
              key={user._id}
              user={u}
              handleFunction={() => handleDelete(u)}
            />
          ))}
        </Box>
        {loading ? (
          <Spin />
        ) : (
          searchResult
            ?.slice(0, 4)
            .map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => handleGroup(user)}
              />
            ))
        )}
      </Modal>
    </div>
  );
}

export default GroupChatModel;
