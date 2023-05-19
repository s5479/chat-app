import React, { useState } from "react";
import { Button, Modal, Alert, Spin } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { ChatState } from "../../Context/ChatProvider";
import { Box, FormControl, Input } from "@mui/material";
import UserBedgeItem from "../UserAvatar/UserBedgeItem";
import axios from "axios";
import UserListItem from "../UserAvatar/UserListItem";

function UpdateGroupChatModel({ fetchAgain, setFetchAgain, fetchMessages }) {
  const { selectedChat, setSelectedChat, user } = ChatState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      <Alert message="Only Admin can remove the Group" type="warning" />;
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

      const { data } = await axios.put(
        "/api/chat/groupremove",
        { chatId: selectedChat._id, userId: user1._id },
        config
      );

      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (error) {
      <Alert message="Error Occured" type="error" />;
      setLoading(false);
    }
  };

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      <Alert message="User Already in Group" type="warning" />;
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      <Alert message="Only Admin can Add Someone!" type="warning" />;
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

      const { data } = await axios.put(
        "/api/chat/groupadd",
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      <Alert message="Error Occured" type="error" />;
      setLoading(false);
    }
  };
  const handleRename = async () => {
    if (!groupChatName) return;
    try {
      // renameLoading(true);

      // console.log("hello");
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "/api/chat/rename",
        { chatId: selectedChat._id, chatName: groupChatName },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      <Alert message="Error Occured" type="error" />;
      setRenameLoading(false);
    }

    setGroupChatName("");
  };

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
      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      <Alert message="Failed to load the search results..." type="error" />;
    }
  };
  return (
    <div>
      <EyeOutlined type="primary" onClick={showModal} />

      <Modal
        title=<h3>{selectedChat.chatName}</h3>
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ textAlign: "center" }}
      >
        <Box width="100%" display="flex" flexWrap="wrap" paddingBottom={1}>
          {selectedChat.users.map((u) => (
            <UserBedgeItem
              key={user._id}
              user={u}
              handleFunction={() => handleRemove(u)}
            />
          ))}
        </Box>
        <FormControl style={{ display: "flex" }}>
          <Input
            placeholder="Chat Name"
            value={groupChatName}
            onChange={(e) => setGroupChatName(e.target.value)}
          />

          <Button
            loading={renameLoading}
            onClick={handleRename}
            style={{
              background: "#38B2AC",
              fontWeight: "bold",
              color: "white",
              marginTop: "3px",
            }}
          >
            Update
          </Button>
        </FormControl>
        <FormControl style={{ display: "flex", margin: "10px" }}>
          <Input
            placeholder="Add User To Group"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </FormControl>

        {loading ? (
          <Spin />
        ) : (
          searchResult
            ?.slice(0, 4)
            .map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => handleAddUser(user)}
              />
            ))
        )}
        <Button
          onClick={() => handleRemove(user)}
          style={{
            margin: "5px",
            background: "red",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Leave Group
        </Button>
      </Modal>
    </div>
  );
}

export default UpdateGroupChatModel;
