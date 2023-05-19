import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import { Alert, Button } from "antd";
import { Box } from "@mui/material";
import { PlusOutlined } from "@ant-design/icons";
import ChatLoading from "./ChatLoading";
import { getSender } from "../config/ChatLogics";
import GroupChatModel from "./miscelleneous/GroupChatModel";

function MyChats({ fetchAgain }) {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/chat", config);
      console.log(data);
      setChats(data);
    } catch (error) {
      <Alert message="Failed to load the search results..." type="error" />;
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);
  return (
    <Box
      bgcolor="white"
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      alignItems="center"
      flexDirection="column"
      width="350px"
      height="88vh"
      borderRadius={2}
    >
      <Box
        pb={3}
        px={3}
        display="flex"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
        padding={2}
      >
        My Chats
        <GroupChatModel>
          <Button
            display="flex"
            icon=<PlusOutlined />
            alignItems="center"
            justifyContent="center"
          >
            New Group Chat
          </Button>
        </GroupChatModel>
      </Box>

      <Box
        display="flex"
        p={3}
        bgcolor="#F8F8F8"
        width="100%"
        height="70vh"
        style={{ overflowX: "hidden", scrollbarWidth: "none" }}
      >
        {chats ? (
          <div>
            {chats.map((chat) => (
              <Box
                onClick={() => {
                  setSelectedChat(chat);
                }}
                bgcolor={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                key={chat._id}
                margin={1}
                width="280px"
                height="35px"
                borderRadius={2}
                style={{ cursor: "pointer" }}
                display="flex"
                alignItems="center"
                // overflow="scroll"
              >
                <div>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </div>
              </Box>
            ))}
          </div>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
}

export default MyChats;
