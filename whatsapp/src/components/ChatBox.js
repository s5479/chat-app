import React from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box } from "@mui/material";
import SingleChat from "./SingleChat";

function ChatBox({ fetchAgain, setFetchAgain }) {
  const { selectedChat } = ChatState();
  return (
    <Box
      // display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      bgcolor="white"
      padding={2}
      width="72vw"
      borderRadius={2}
      height="88vh"
      margin="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
}

export default ChatBox;
